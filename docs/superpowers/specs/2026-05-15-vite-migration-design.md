# CRA → Vite Migration Design

**Date:** 2026-05-15  
**Goal:** Replace `react-scripts` with Vite + Vitest. Fast and minimal — no restructuring of source files.

---

## Scope

Remove the `react-scripts` dependency and replace it with:
- **Vite** — bundler and dev server
- **@vitejs/plugin-react** — JSX transform and HMR
- **Vitest** — Jest-compatible test runner native to Vite
- **jsdom** — browser environment for Vitest

Everything in `src/Components/`, all CSS, all public static assets, and the jQuery scripts in the HTML body are out of scope and unchanged.

---

## File Changes

### 1. `vite.config.js` (new)

Minimal config: React plugin, point public dir at `public/`.

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
});
```

### 2. `index.html` (move + modify)

Move `public/index.html` → `index.html` (project root). Vite requires the entry HTML at the root.

Changes:
- Replace all `%PUBLIC_URL%` tokens with an empty string (Vite serves `public/` assets at `/` automatically)
- Add `<script type="module" src="/src/index.js"></script>` before `</body>`

### 3. `package.json`

**Remove:**
- `react-scripts` (dependency)

**Add to `devDependencies`:**
- `vite`
- `@vitejs/plugin-react`
- `vitest`
- `jsdom`

**Move to `devDependencies`:**
- `eslint-plugin-flowtype` (was incorrectly in `dependencies`)
- `nodemon` (was incorrectly in `dependencies`)

**Add to `devDependencies`:**
- `eslint-config-react-app` — the `eslintConfig: { extends: "react-app" }` in `package.json` depends on this package being present; it was previously bundled inside `react-scripts` and will be missing after removal

**Update scripts:**
```json
"scripts": {
  "start": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest",
  "serve": "nodemon server.js"
}
```

### 4. `tsconfig.json` (modify)

- Change `"moduleResolution"` from `"node"` to `"bundler"` (Vite standard)
- Add `"types": ["vitest/globals"]` so test globals (`it`, `expect`, etc.) are recognized without imports

### 5. `src/react-app-env.d.ts` (modify)

Replace:
```ts
/// <reference types="react-scripts" />
```
With:
```ts
/// <reference types="vite/client" />
```

### 6. `src/App.test.js` (modify)

Current test uses `ReactDOM.render` (React 17 API, removed in React 18). Update to use `createRoot` wrapped in `act`.

### 7. `src/setupTests.js` (new)

Import `@testing-library/jest-dom` matchers — previously handled automatically by CRA.

```js
import '@testing-library/jest-dom';
```

---

## Dependencies Removed

| Package | Reason |
|---------|--------|
| `react-scripts` | Replaced by Vite |

---

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| jQuery scripts in `<body>` rely on DOM load order | Unchanged — Vite's `index.html` at root keeps the same script order |
| Shader files fetched via axios at runtime | Not imported — no GLSL plugin needed |
| `@types/three` override still needed | Override stays in `package.json`, unaffected by this migration |
| `registerServiceWorker.js` uses browser APIs | Plain JS, works as-is with Vite |

---

## Success Criteria

- `npm run start` launches the dev server with HMR
- `npm run build` produces a production build without errors
- `npm run test` runs the existing test via Vitest and passes
- No `react-scripts` in `node_modules`
