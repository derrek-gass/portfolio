# React 19 Migration Design

**Date:** 2026-05-15
**Goal:** Upgrade to React 19, removing the dead react-ga dependency and unlocking @react-three/fiber v9 and @react-three/drei v10.

---

## Scope

Two things change: source code (remove react-ga from App.jsx) and package versions. No class component conversion is needed — all five class components (About, Portfolio, Badges, Footer, Testimonials) are pure render components with no deprecated lifecycle methods, string refs, or other React 19-removed APIs.

---

## File Changes

### 1. `src/App.jsx`

Remove three lines:

```diff
- import ReactGA from "react-ga";
  ...
- ReactGA.initialize("UA-110570651-1");
- ReactGA.pageview(window.location.pathname);
```

The UA-110570651-1 tracking ID is Universal Analytics, which Google shut down in 2023. These calls are silent no-ops in production. Removing them also eliminates the jsdom crash in `App.test.jsx` (react-ga tries to inject a `<script>` tag which jsdom rejects).

### 2. `package.json`

**Remove from `dependencies`:**
- `react-ga`

**Bump in `dependencies`:**
- `react`: `^18.3.1` → `^19.0.0`
- `react-dom`: `^18.3.1` → `^19.0.0`
- `@react-three/fiber`: `^8.18.0` → `^9.0.0`
- `@react-three/drei`: `^9.122.0` → `^10.0.0`

**Bump in `devDependencies`:**
- `@types/react`: `^18.3.28` → `^19.0.0`
- `@types/react-dom`: `^18.3.7` → `^19.0.0`

---

## Risk Areas

| Area | Assessment |
|------|-----------|
| Class components | Safe — React 19 keeps class components (deprecated, not removed). None of the five use removed APIs. |
| `Header.jsx` r3f usage | Uses `Canvas`, `useFrame`, `useLoader` from r3f and `THREE` directly — no drei imports. Core r3f v9 APIs are unchanged. |
| `@react-three/fiber` v9 | Peer requires `react: >=19 <19.3`. Pinning to React `^19.0.0` satisfies this. |
| `@react-three/drei` v10 | Peer requires `react: ^19` and `@react-three/fiber: ^9`. Both satisfied. |
| `@vitejs/plugin-react` v4 | Handles JSX transform only — React version-agnostic. No upgrade needed. |
| Test noise | Removing react-ga eliminates the jsdom script-injection crash in App.test.jsx. Tests should get cleaner. |

---

## Success Criteria

- `npm run build` completes without errors
- `npm test -- --run` passes with 0 errors (not just 0 failures — the unhandled rejections should also clear)
- `react` and `react-dom` resolve to `^19.x` in node_modules
- `@react-three/fiber` resolves to `^9.x` in node_modules
- `@react-three/drei` resolves to `^10.x` in node_modules
- `react-ga` is absent from node_modules
