# CRA → Vite Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `react-scripts` with Vite as the bundler/dev server and Vitest as the test runner, with zero changes to component source files.

**Architecture:** Install Vite + `@vitejs/plugin-react` in place of `react-scripts`. Move `index.html` to the project root (Vite's convention) and strip CRA's `%PUBLIC_URL%` tokens. Configure Vitest inside `vite.config.js`. The `public/` folder, all components, and all static assets are untouched.

**Tech Stack:** Vite 6, @vitejs/plugin-react 4, Vitest 2, jsdom 25, TypeScript 4.9.5

---

## File Map

| File | Action |
|------|--------|
| `package.json` | Modify — remove `react-scripts`, update scripts, add vite/vitest to devDeps |
| `vite.config.js` | Create — Vite + Vitest config |
| `index.html` | Create at root (replaces `public/index.html`) |
| `public/index.html` | Delete — moved to root |
| `tsconfig.json` | Modify — `"jsx": "preserve"` → `"jsx": "react-jsx"` |
| `src/react-app-env.d.ts` | Modify — swap CRA type reference for Vite client |
| `src/setupTests.js` | Create — import jest-dom matchers for Vitest |
| `src/App.test.js` | Modify — replace `ReactDOM.render` with `@testing-library/react` |

---

### Task 1: Update package.json and install

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Write the new package.json**

Replace the entire contents of `package.json` with:

```json
{
    "name": "portfolio",
    "version": "0.2.0",
    "private": true,
    "engines": {
        "node": "22.x"
    },
    "dependencies": {
        "@react-three/drei": "^9.122.0",
        "@react-three/fiber": "^8.18.0",
        "@testing-library/jest-dom": "^6.9.1",
        "@testing-library/react": "^14.3.1",
        "@testing-library/user-event": "^14.6.1",
        "@types/jquery": "^3.5.19",
        "@types/lodash": "^4.14.198",
        "@vercel/analytics": "^2.0.1",
        "@vercel/speed-insights": "^2.0.0",
        "axios": "^1.16.1",
        "caniuse-lite": "^1.0.30001792",
        "jquery": "^3.7.1",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-ga": "^3.3.1",
        "react-router-dom": "^6.16.0",
        "serve": "^14.2.0",
        "three": "^0.184.0",
        "typescript": "^4.9.5"
    },
    "scripts": {
        "start": "vite",
        "build": "vite build",
        "preview": "vite preview",
        "test": "vitest",
        "serve": "nodemon server.js"
    },
    "browserslist": {
        "production": [
            ">0.2%",
            "not dead",
            "not op_mini all"
        ],
        "development": [
            "last 1 chrome version",
            "last 1 firefox version",
            "last 1 safari version"
        ]
    },
    "devDependencies": {
        "@babel/plugin-proposal-private-property-in-object": "^7.21.11",
        "@types/lodash": "^4.14.198",
        "@vitejs/plugin-react": "^4.0.0",
        "eslint-plugin-flowtype": "^8.0.3",
        "jsdom": "^25.0.0",
        "nodemon": "^3.1.14",
        "vite": "^6.0.0",
        "vitest": "^2.0.0"
    },
    "overrides": {
        "@types/three": "0.162.0"
    }
}
```

What changed from the previous version:
- `react-scripts` removed from `dependencies`
- `eslintConfig` block removed — its `extends: "react-app"` depends on react-scripts internals; ESLint can be configured separately later
- `eject` script removed (CRA-only)
- `eslint-plugin-flowtype` and `nodemon` moved from `dependencies` to `devDependencies`
- `vite`, `@vitejs/plugin-react`, `vitest`, `jsdom` added to `devDependencies`
- `engines.node` updated to `22.x` to match the running Node version
- New `preview` script added

- [ ] **Step 2: Install dependencies**

```bash
npm install
```

Expected: completes without error.

- [ ] **Step 3: Verify react-scripts is gone**

```bash
ls node_modules | grep react-scripts
```

Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "migrate: replace react-scripts with vite and vitest"
```

---

### Task 2: Create vite.config.js

**Files:**
- Create: `vite.config.js`

- [ ] **Step 1: Create the config**

Create `vite.config.js` at the project root:

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

`globals: true` makes `describe`, `it`, `expect` etc. available without imports — matching the style of the existing `App.test.js`.
`publicDir: 'public'` serves `public/` files at `/`, identical to CRA behaviour.
`environment: 'jsdom'` provides a browser-like DOM for React component tests.

- [ ] **Step 2: Commit**

```bash
git add vite.config.js
git commit -m "migrate: add vite.config.js with react plugin and vitest config"
```

---

### Task 3: Move index.html to root

**Files:**
- Create: `index.html`
- Delete: `public/index.html`

- [ ] **Step 1: Create root index.html**

Create `index.html` at the project root with this exact content:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta name="theme-color" content="#000000" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="stylesheet" href="/css/default.css" />
    <link rel="stylesheet" href="/css/layout.css" />
    <link rel="stylesheet" href="/css/media-queries.css" />
    <link rel="stylesheet" href="/css/magnific-popup.css" />

    <title>Derrek Gass - Software Developer</title>
  </head>

  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js" type="text/javascript"></script>
    <script>
      if (!window.jQuery) {
        var s = document.createElement('script');
        s.src = '/js/jquery-3.7.1.min.js';
        document.head.appendChild(s);
      }
    </script>
    <script
      type="text/javascript"
      src="https://code.jquery.com/jquery-migrate-3.4.1.js"
    ></script>
    <script src="/js/jquery.flexslider.js"></script>
    <script src="/js/waypoints.js"></script>
    <script src="/js/jquery.fittext.js"></script>
    <script src="/js/magnific-popup.js"></script>
    <script src="/js/init.js"></script>

    <script type="module" src="/src/index.js"></script>
  </body>
</html>
```

What changed from `public/index.html`:
- All `%PUBLIC_URL%/` prefixes stripped (Vite serves `public/` assets at `/` automatically)
- jQuery CDN fallback replaced: old `document.write(...)` → `createElement('script')` pattern (safer, no XSS surface)
- All local script `src` paths updated to use leading `/` (e.g. `js/init.js` → `/js/init.js`)
- `<script type="module" src="/src/index.js"></script>` added before `</body>` — Vite's entry point into the React app

- [ ] **Step 2: Delete public/index.html**

```bash
rm public/index.html
```

If left in place, Vite copies it to the build output as a static asset and it would overwrite the generated `index.html`.

- [ ] **Step 3: Commit**

```bash
git add index.html
git rm public/index.html
git commit -m "migrate: move index.html to root, strip %PUBLIC_URL% tokens"
```

---

### Task 4: Update tsconfig.json

**Files:**
- Modify: `tsconfig.json`

- [ ] **Step 1: Change jsx mode**

Replace the full contents of `tsconfig.json` with:

```json
{
  "compilerOptions": {
    "target": "es2016",
    "jsx": "react-jsx",
    "module": "esnext",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "strictNullChecks": true,
    "skipLibCheck": true,
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": [
    "src"
  ]
}
```

The only change is `"jsx": "preserve"` → `"jsx": "react-jsx"`. The `react-jsx` mode uses the automatic JSX runtime which doesn't require `import React` at the top of every file — matching how the existing components are already written. CRA handled this silently via Babel; Vite + `@vitejs/plugin-react` handles it at the bundler level, and `react-jsx` keeps TypeScript's checker aligned with that.

- [ ] **Step 2: Commit**

```bash
git add tsconfig.json
git commit -m "migrate: update tsconfig jsx to react-jsx for Vite"
```

---

### Task 5: Update react-app-env.d.ts

**Files:**
- Modify: `src/react-app-env.d.ts`

- [ ] **Step 1: Replace the type reference**

Replace the entire contents of `src/react-app-env.d.ts` with:

```ts
/// <reference types="vite/client" />
```

The old reference (`/// <reference types="react-scripts" />`) provided CRA-specific type augmentations. The Vite equivalent provides `import.meta.env`, `import.meta.hot`, and static asset import types.

- [ ] **Step 2: Commit**

```bash
git add src/react-app-env.d.ts
git commit -m "migrate: swap react-scripts type reference for vite/client"
```

---

### Task 6: Set up Vitest

**Files:**
- Create: `src/setupTests.js`
- Modify: `src/App.test.js`

- [ ] **Step 1: Create setupTests.js**

Create `src/setupTests.js`:

```js
import '@testing-library/jest-dom';
```

CRA automatically injected `@testing-library/jest-dom` matchers into every test run. Vitest does not — the `setupFiles` entry in `vite.config.js` points at this file and loads it before each test suite.

- [ ] **Step 2: Update App.test.js**

The current `src/App.test.js` uses `ReactDOM.render`, which was removed in React 18. Replace the entire file:

```js
import { render } from '@testing-library/react';
import App from './App';

it('renders without crashing', () => {
  render(<App />);
});
```

- [ ] **Step 3: Run the test suite**

```bash
npm test
```

Expected output:

```
✓ src/App.test.js (1)
  ✓ renders without crashing

Test Files  1 passed (1)
Tests       1 passed (1)
```

If Vitest prompts to install `@vitest/ui`, press `n` — it is optional.

- [ ] **Step 4: Commit**

```bash
git add src/setupTests.js src/App.test.js
git commit -m "migrate: configure Vitest setup and update smoke test for React 18"
```

---

### Task 7: Verify production build and push

- [ ] **Step 1: Run the production build**

```bash
npm run build
```

Expected: Vite prints a bundle summary:

```
✓ built in Xs
dist/index.html                   0.69 kB
dist/assets/index-[hash].css      0.XX kB
dist/assets/index-[hash].js     XXX.XX kB │ gzip: XX.XX kB
```

Common errors and fixes:
- `Cannot find module 'X'` — package `X` is missing from `dependencies` in `package.json`; add it and re-run `npm install`
- `Pre-transform error` on a `.glsl` import — shaders are fetched via `axios` at runtime in this project, not statically imported, so this should not occur; if it does, verify `Header.jsx` isn't importing shader files directly

- [ ] **Step 2: Smoke-check the dev server**

```bash
npm start
```

Vite prints a local URL (default: `http://localhost:5173`). Open it in a browser and confirm:
- The portfolio loads
- The Three.js shader animation plays in the header
- No errors in the browser console

Press `Ctrl+C` to stop.

- [ ] **Step 3: Push**

```bash
git push origin master
```
