# System Builder Prototype

This repository contains a lightweight, front-end-only prototype for exploring system layouts. It mirrors the Python prototype data model with plain JavaScript classes for `Port`, `Equipment`, and `SystemModel`, then layers a drag-and-drop user interface on top so you can manually place components and test port compatibility.

## Project structure

| File | Description |
| --- | --- |
| `index.html` | Defines the three-panel layout (component library, canvas, inspector) and loads the bundles. |
| `styles.css` | Provides the grid layout, component cards, canvas visuals, and port/inspector styling. |
| `data.js` | Contains sample component definitions and their port metadata used for manual testing. |
| `app.js` | Implements the models, renders the UI, handles drag/drop placement, and checks port compatibility. |

## Running the prototype locally

No build tooling is required—any static file server will work. Two simple options are shown below:

```bash
# Option 1: use Python's built-in server
python -m http.server 8000

# Option 2: use http-server (requires Node.js)
npx http-server . -p 8000
```

After starting a server, visit `http://localhost:8000` (or your selected port). You should see the system builder interface:

1. Drag components from the **Component Library** into the **Canvas**.
2. Click two ports to create a connection. The **Connection Inspector** reports whether the link is valid based on media type and direction.
3. Re-run the steps as needed to explore different combinations.

## Verification

The prototype was validated locally by serving the repository root with `python -m http.server 8000` and loading the page in a browser to ensure the bundles load correctly.
