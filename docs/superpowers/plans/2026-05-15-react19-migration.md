# React 19 Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade to React 19 by removing the dead react-ga dependency and bumping react, react-dom, @react-three/fiber, and @react-three/drei to their latest major versions.

**Architecture:** Two sequential tasks — first strip react-ga from source and package manifest, then bump all React-ecosystem packages together and verify the build. Class components (About, Portfolio, Badges, Footer, Testimonials) require no changes; they are render-only and use no deprecated React 19 APIs.

**Tech Stack:** React 19, @react-three/fiber 9, @react-three/drei 10, @testing-library/react 16, TypeScript 5.9.3, Vite 6

---

## File Map

| File | Action |
|------|--------|
| `src/App.jsx` | Remove `react-ga` import and two ReactGA calls |
| `package.json` | Remove `react-ga`; bump react, react-dom, r3f, drei, @types/react, @types/react-dom, @testing-library/react |

---

### Task 1: Remove react-ga

**Files:**
- Modify: `src/App.jsx:2,24-25`
- Modify: `package.json`

- [ ] **Step 1: Update src/App.jsx**

Replace the entire contents of `src/App.jsx` with:

```jsx
import { useState, useEffect } from "react";
import $ from "jquery";
import "./App.css";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from '@vercel/analytics/react';
import Header from './Components/Header';
import About from './Components/About';
import Resume from './Components/Resume';
import Badges from './Components/Badges';
import Portfolio from './Components/Portfolio';
import Testimonials from './Components/Testimonials';
import Footer from './Components/Footer';

import axios from "axios";


function App() {
    const [resumeData, setResumeData] = useState({});

    const [vertex, setVertex] = useState("");
    const [fragment, setFragment] = useState("");

    useEffect(() => {
        axios.get("/shaders/vertexShader.glsl").then((res) => setVertex(res.data));
        axios.get("/shaders/fragmentShader.glsl").then((res) => setFragment(res.data));
        getResumeData();
    }, []);


    const getResumeData = () => {
        $.ajax({
            url: "/resumeData.json",
            dataType: "json",
            cache: false,
            success: function (data) {
                setResumeData(data);
            },
            error: function (xhr, status, err) {
                console.log(err);
                alert(err);
            },
        });
    };

    return (
        <div className="App">
            <Header data={resumeData.main} vertex={vertex} fragment={fragment} />
            <About props={resumeData.main} />
            <Resume props={resumeData.resume} />
            <Badges data={resumeData.badges} />
            <Portfolio data={resumeData.portfolio} />
            <Testimonials data={resumeData.testimonials} />
            <Footer data={resumeData.main} />
            <SpeedInsights/>
            <Analytics />
        </div>
    );
}

export default App;
```

Three lines removed from the original: `import ReactGA from "react-ga"` (line 2), `ReactGA.initialize("UA-110570651-1")` (line 24), and `ReactGA.pageview(window.location.pathname)` (line 25).

- [ ] **Step 2: Remove react-ga from package.json**

In `/Users/derrekgass/Documents/GitHub/portfolio/package.json`, delete this line from `dependencies`:

```
"react-ga": "^3.3.1",
```

- [ ] **Step 3: Run npm install to remove from node_modules**

```bash
npm install
```

Verify it's gone:

```bash
ls node_modules | grep react-ga
```

Expected: no output.

- [ ] **Step 4: Run tests — expect cleaner output**

```bash
npm test -- --run
```

Expected: 1 test passed, 0 unhandled errors. Previously the test produced a `TypeError: Cannot read properties of undefined (reading 'parentNode')` from react-ga trying to inject a script tag into jsdom. That noise should now be gone.

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx package.json package-lock.json
git commit -m "remove react-ga — UA tracking shut down in 2023, calls were no-ops"
```

---

### Task 2: Upgrade to React 19 ecosystem

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Update package.json with React 19 versions**

Replace the `dependencies` and `devDependencies` sections in `/Users/derrekgass/Documents/GitHub/portfolio/package.json` so the file reads:

```json
{
    "name": "portfolio",
    "version": "0.2.0",
    "private": true,
    "engines": {
        "node": "22.x"
    },
    "dependencies": {
        "@react-three/drei": "^10.0.0",
        "@react-three/fiber": "^9.0.0",
        "@vercel/analytics": "^2.0.1",
        "@vercel/speed-insights": "^2.0.0",
        "axios": "^1.16.1",
        "jquery": "^3.7.1",
        "react": "^19.0.0",
        "react-dom": "^19.0.0",
        "react-router-dom": "^6.30.3",
        "three": "^0.184.0"
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
        "@testing-library/jest-dom": "^6.9.1",
        "@testing-library/react": "^16.3.2",
        "@testing-library/user-event": "^14.6.1",
        "@types/jquery": "^3.5.34",
        "@types/lodash": "^4.17.24",
        "@types/react": "^19.0.0",
        "@types/react-dom": "^19.0.0",
        "@vitejs/plugin-react": "^4.0.0",
        "caniuse-lite": "^1.0.30001792",
        "jsdom": "^25.0.0",
        "nodemon": "^3.1.14",
        "serve": "^14.2.6",
        "typescript": "^5.9.3",
        "vite": "^6.0.0",
        "vitest": "^2.0.0"
    }
}
```

Key changes from current:
- `react`: `^18.3.1` → `^19.0.0`
- `react-dom`: `^18.3.1` → `^19.0.0`
- `@react-three/fiber`: `^8.18.0` → `^9.0.0`
- `@react-three/drei`: `^9.122.0` → `^10.0.0`
- `@types/react`: `^18.3.28` → `^19.0.0`
- `@types/react-dom`: `^18.3.7` → `^19.0.0`
- `@testing-library/react`: `^14.3.1` → `^16.3.2` (v14 targets React 18; v16 targets React 18+19)

- [ ] **Step 2: Install**

```bash
npm install
```

Expected: packages added/changed, no peer dependency errors.

If npm prints peer dependency warnings about `@react-three/fiber` requiring `react: >=19 <19.3` and the installed React version is `19.1.x`, that is fine — 19.1.x satisfies the constraint.

- [ ] **Step 3: Verify installed versions**

```bash
npm ls react @react-three/fiber @react-three/drei 2>/dev/null | grep -E "react@|fiber@|drei@" | head -6
```

Expected output contains:
```
react@19.x.x
@react-three/fiber@9.x.x
@react-three/drei@10.x.x
```

- [ ] **Step 4: Run the production build**

```bash
npm run build
```

Expected: Vite builds successfully and prints a file size summary. If the build fails:

- `Cannot find module '@react-three/drei'` or similar — run `npm install` again
- Type errors from drei or fiber — `skipLibCheck: true` is in tsconfig.json and should suppress these; if they still appear check that tsconfig.json hasn't been modified
- `Uncaught ReferenceError` for a React API — check if any component uses a React API removed in v19 (the class components in this project don't, but double-check any file that imports from `react` directly)

- [ ] **Step 5: Run tests**

```bash
npm test -- --run
```

Expected:

```
✓ src/App.test.jsx (1)
  ✓ renders without crashing

Test Files  1 passed (1)
Tests       1 passed (1)
```

With react-ga removed (Task 1) and React 19 installed, the test should run with zero unhandled errors or warnings about GA script injection.

- [ ] **Step 6: Commit and push**

```bash
git add package.json package-lock.json
git commit -m "upgrade to React 19, r3f v9, drei v10, @testing-library/react v16"
git push origin master
```
