# Memory Span Task v1

Apps Script web app for the Memory Span Task assignment.

## Files

- `index.html`: Experiment UI and client-side logic.
- `Code.gs`: Apps Script server code that renders the web app and saves rows to Google Sheets.
- `appsscript.json`: Apps Script manifest.
- `.clasp.json`: Local/GitHub Actions connection to the Apps Script project.
- `.github/workflows/deploy.yml`: Push-to-main automatic deployment workflow.

## One-time Setup

1. In Apps Script, open **Project Settings** and copy the **Script ID**.
2. Paste that value into `.clasp.json`:

```json
{
  "scriptId": "YOUR_SCRIPT_ID",
  "rootDir": "."
}
```

3. In Apps Script, open **Deploy > Manage deployments**.
4. Copy the web app **Deployment ID**.
5. In GitHub, open the repository and go to **Settings > Secrets and variables > Actions**.
6. Add these repository secrets:

| Secret name | Value |
| --- | --- |
| `APPS_SCRIPT_DEPLOYMENT_ID` | The Apps Script web app Deployment ID |
| `CLASPRC_JSON` | The full contents of your local clasp credential file |

## Getting `CLASPRC_JSON`

On your computer, install and log in to clasp once:

```bash
npm install -g @google/clasp
clasp login
```

Then copy the contents of your clasp credential file:

- Windows: `C:\Users\<your-name>\.clasprc.json`
- macOS/Linux: `~/.clasprc.json`

Put that whole JSON text into the GitHub secret named `CLASPRC_JSON`.

## Daily Workflow

1. Edit `index.html` or `Code.gs`.
2. Commit and push to the `main` branch.
3. GitHub Actions runs automatically.
4. The same Apps Script web app URL is updated.

The participant URL remains the Apps Script `/exec` web app URL. Do not use GitHub Pages for this experiment, because Google Sheets saving depends on `google.script.run`.
