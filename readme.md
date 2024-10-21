# Installing the Extension in Chrome and Firefox

---

## Chrome Installation Instructions

1. **Download the Extension Files**
    - Make sure all the files (`manifest.json`, `popup.html`, `popup.js`, `content.js`, and `icon.png`) are placed in a folder (e.g., `my-extension`).

2. **Open Chrome Extensions Page**
    - Open your Chrome browser.
    - Navigate to `chrome://extensions/` by typing it in the address bar.

3. **Enable Developer Mode**
    - In the top right corner, you will see a toggle switch labeled "Developer mode." Turn this on.

4. **Load the Unpacked Extension**
    - Click on the "Load unpacked" button.
    - A file dialog will open. Select the folder where your extension files are located (e.g., `my-extension`).

5. **Test the Extension**
    - Your extension should now appear in the Chrome toolbar.
    - Navigate to `pumpyoursound.com`, click on the extension icon, and upload the CSV file to test.

6. **Updating the Extension**
    - If you make changes to the extension files, go back to the `chrome://extensions/` page and click "Reload" under your extension to apply the updates.

---

## Firefox Installation Instructions

1. **Download the Extension Files**
    - Place all necessary files (`manifest.json`, `popup.html`, `popup.js`, `content.js`, and `icon.png`) in a folder (e.g., `my-extension`).

2. **Open Firefox Add-ons Page**
    - Open your Firefox browser.
    - Navigate to `about:debugging#/runtime/this-firefox` by typing it in the address bar.

3. **Enable Temporary Add-ons**
    - Click on the "Load Temporary Add-on…" button.
    - Select any file from the extension folder (e.g., `manifest.json`). This will load the entire extension.

4. **Test the Extension**
    - Your extension will now be available in the Firefox toolbar.
    - Go to `pumpyoursound.com`, click on the extension icon, and upload your CSV file to test.

5. **Updating the Extension**
    - If you need to update the extension, go back to the `about:debugging#/runtime/this-firefox` page.
    - Click on "Load Temporary Add-on…" and select the updated files to reload the extension.

6. **Note**: Firefox extensions loaded this way are temporary and will be removed once the browser is closed. To make it permanent, you need to package and submit the extension to the [Firefox Add-ons](https://addons.mozilla.org/) store.

---

## Troubleshooting

- **Make sure the extension is enabled**: Sometimes, extensions may be disabled if there are issues. Ensure it's enabled in the extensions/add-ons menu.
- **Check the console**: If something is not working, open the browser's Developer Tools (F12 or right-click and "Inspect") and check the console for errors.

---
