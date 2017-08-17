gost
===

A minimalistic Ghost blog theme for [goLance blog](https://golance.com).

Features
---

- clean UI based on [goui](https://github.com/goLance-LLC/goui)
- Medium-like post images preview
- small css and js bundles. Only required stuff is included.

Structure
---
- `assets/source` — source assets like Stylus and JS files
- `assets/build` — generated CSS and JS bundles
- `assets/static` — static files served as-is

Installation
---
Installation is manual for now.

```bash
git clone --depth=1 https://github.com/goLance-LLC/gost.git YOUR_GHOST_FOLDER/assets/themes
cd YOUR_GHOST_FOLDER/assets/themes/gost
npm i
npm run build
# ready for use in Ghost
```
Now you can switch to `gost` theme in Ghost admin.

Development
---
Running theme in development mode includes live-reloading of all assets and templates.

```bash
npm start # navigate to localhost:3100
npm run build # build assets for production. Builds are stored in assets/build.

```
