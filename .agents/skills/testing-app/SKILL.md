# Testing ecsd-tech-test

## Overview
This is a React app (React 16, material-ui 0.20) for an arrays challenge. It displays integer arrays and asks users to find equilibrium pivot indices.

## Running Locally
```bash
npm install
npm start
# App runs on localhost:3000 (or next available port)
```

## Key UI Flows to Test
1. **Welcome page** loads at root URL with "RENDER THE CHALLENGE" button
2. Click button → page scrolls to "Arrays Challenge" section with 3 array rows + submission form
3. Click "SUBMIT ANSWERS" → opens a `DialogBox` component (material-ui Dialog)
4. Dialog can be closed via:
   - CLOSE button inside dialog
   - Pressing Escape (uses `onRequestClose` prop)
   - Clicking outside the dialog (also `onRequestClose`)

## Known Quirks
- **No eslint config**: The project references eslint in package.json scripts but has no `.eslintrc` or similar config file. Lint will fail.
- **Old dependencies**: React 16, material-ui 0.20 (not @mui/material), react-scripts 1.1.1. These are very old and may trigger deprecation warnings.
- **Port conflicts**: If port 3000 is busy, react-scripts will prompt to use another port (e.g., 3001). Accept with `Y`.
- **E2E test requires Selenium**: `src/test/e2e/arrayChallenge.js` needs ChromeDriver + Selenium WebDriver to run. It cannot be tested through the UI alone.
- **AWS endpoint may be down**: The answer verification endpoint (`eqe90bcod2.execute-api.eu-west-1.amazonaws.com`) may no longer be active. Fetch errors are expected.

## Array Challenge Expected Answers
For reference, the equilibrium pivot indices for the 3 arrays are:
- Row 1: `[23, 50, 63, 90, 10, 30, 155, 23, 18]` → pivot index **4** (value 10)
- Row 2: `[133, 60, 23, 92, 6, 7, 168, 16, 19]` → pivot index **3** (value 92)
- Row 3: `[30, 43, 29, 10, 50, 40, 99, 51, 12]` → pivot index **5** (value 40)

## Devin Secrets Needed
None — the app runs fully locally with no authentication.
