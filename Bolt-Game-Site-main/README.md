# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/39ccbac0-5918-4c75-8e49-493e9d4974fa

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/39ccbac0-5918-4c75-8e49-493e9d4974fa) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/39ccbac0-5918-4c75-8e49-493e9d4974fa) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Deploying on Vercel (Recommended for this Vite + React app)

Follow these steps to deploy the site on Vercel:

1. Ensure the correct project root
   - Your repository has a nested folder structure: a top-level `Bolt-Game-Site-main/` and inside it another `Bolt-Game-Site-main/` that actually contains `package.json`.
   - If you push this whole repo to GitHub, Vercel might look at the top level (which does NOT have `package.json`).
   - Solution A (best): Move all files from the inner folder to the root so there is only one level.
   - Solution B: In Vercel, when importing the repo, open Advanced Settings and set the Root Directory to `Bolt-Game-Site-main` (the inner folder).

2. Import the repository
   - Go to https://vercel.com/new and choose your Git provider (GitHub/GitLab/Bitbucket).
   - Select your repository.
   - If using Solution B above, set Root Directory to the inner `Bolt-Game-Site-main` folder.

3. Framework + Build settings (Vercel usually auto-detects)
   - Framework preset: None / Vite (auto)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. Environment variables
   - In Project Settings > Environment Variables add:
     - `VITE_SUPABASE_URL` = your Supabase project URL (from the Supabase dashboard)
     - `VITE_SUPABASE_PUBLISHABLE_KEY` = your public anon key
   - (Optional) If later you add a service requiring secrets, prefix them with `VITE_` only if they must be exposed to the browser. Otherwise use serverless functions.

5. Google Sheets data fetching
   - Your component `GoogleSheetsTeams.tsx` fetches a public Google Sheet via the gviz JSON endpoint. Make sure the sheet is shared as: Anyone with the link (Viewer).
   - If you hit CORS or privacy limits: Publish the sheet (File > Share > Publish to web) OR proxy the request via a Vercel Serverless Function.

6. Trigger first deployment
   - Click Deploy. Vercel will install dependencies and run `npm run build` creating `dist/`.
   - On success, you get a live URL like `https://your-project.vercel.app`.

7. Add a custom domain (optional)
   - Go to Settings > Domains, add your domain, update DNS by adding the provided CNAME record.

8. Preview vs Production
   - Every push to non-production branches creates a Preview deployment.
   - Merge/push to the main branch creates a Production deployment.

9. Verifying Supabase connectivity
   - Open the deployed site and check the Teams section. If teams fail to load, open DevTools Console.
   - Common issues: wrong keys, missing `VITE_` prefix, environment variables added only for Production but not for Preview.

10. Local reproduction of production build
    - On Windows PowerShell or Command Prompt:
      ```cmd
      cd Bolt-Game-Site-main\Bolt-Game-Site-main
      npm install
      npm run build
      npx serve dist
      ```
    - Or use `npm run preview` after build with Vite: `npm run preview`.

### Optional: Use `vercel.json`
We added a `vercel.json` that:
```json
{
  "version": 2,
  "builds": [{ "src": "index.html", "use": "@vercel/static-build", "config": { "distDir": "dist" } }],
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
This ensures client-side routing works (all paths serve `index.html`).

### Troubleshooting
- Build fails: Check that the correct root directory is used.
- 404 on refresh of internal routes: Confirm `vercel.json` rewrite and that deployment includes it.
- Teams not loading: Verify sheet access and network tab for the gviz request.
- Missing environment variables: Add them for ALL environments (Production + Preview) in Vercel settings.

### Next Steps / Enhancements (Already Prepared or Suggested)
- Team logos: Extend Google Sheet to include a third column with a public image link; adapt the fetcher to parse it and pass `logoUrl` to `TeamCard`.
- Improve accessibility: Add alt text and focus styles consistently.
- Add health check: Simple script hitting the Google Sheets endpoint.

---
If you need help flattening the folder structure or adding logo support, let me know and I can implement those changes.
