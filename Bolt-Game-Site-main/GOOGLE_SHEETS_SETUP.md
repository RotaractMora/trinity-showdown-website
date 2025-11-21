# Google Forms & Sheets Integration Setup

This document explains how to complete the integration of Google Forms for registration and Google Sheets for team approval/display.

## Step 1: Set Up Your Google Form

1. Create a new Google Form for team registration at [Google Forms](https://forms.google.com)
2. Add the following form fields:
   - **Team Name** (Text)
   - **Game Category** (Multiple choice: PUBG MOBILE, COD MOBILE, MOBILE LEGENDS)
   - Captain name, email, phone (as needed)
   - Player information fields

3. After creating the form, copy the form URL (it will look like: `https://docs.google.com/forms/d/YOUR_FORM_ID/viewform`)

## Step 2: Update GoogleFormRedirect Component

Update `/src/components/GoogleFormRedirect.tsx` with your Google Form URL:

```typescript
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/YOUR_FORM_ID/viewform";
```

Replace `YOUR_FORM_ID` with your actual Google Form ID.

## Step 3: Create Google Sheet for Approved Teams

1. Create a new Google Sheet
2. Create a sheet tab named "approved_teams"
3. Set up two columns:
   - Column A: `team_name`
   - Column B: `game`

4. Add your approved teams to this sheet with team names in column A and game categories in column B

Example:
```
team_name          | game
Dragon Squad       | PUBG MOBILE
Phoenix Rising     | COD MOBILE
Legend Warriors    | MOBILE LEGENDS
```

## Step 4: Make the Sheet Publicly Readable

1. Open your Google Sheet
2. Click "Share" in the top right
3. Set the sharing to "Anyone with the link" or make it public
4. Copy the sheet URL (it will look like: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`)

## Step 5: Update GoogleSheetsTeams Component

Update `/src/components/GoogleSheetsTeams.tsx` with your sheet URL:

```typescript
const GOOGLE_SHEETS_URL = "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/gviz/tq?tqx=out:json";
```

To find YOUR_SHEET_ID:
- Your sheet URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`
- Extract the ID between `/d/` and `/edit`

## Workflow

1. **Users register**: Click "Register Your Team" button → Opens your Google Form in a new tab
2. **You manage responses**:
   - Review Google Form responses (Forms will automatically create a linked Google Sheet)
   - For approved teams, add them to your "approved_teams" sheet
3. **Website displays teams**:
   - The website automatically fetches from your "approved_teams" sheet every 30 seconds
   - Approved teams appear in the "Competing Teams" section organized by game category

## Data Structure

### Google Sheets Format
Your approved teams sheet should have:
- **Header row**: `team_name | game`
- **Data rows**: One team per row with team name and game category

Game category values must match exactly:
- `PUBG MOBILE`
- `COD MOBILE`
- `MOBILE LEGENDS`

## Testing

1. Add a few test teams to your "approved_teams" sheet
2. Run the local dev server: `npm run dev`
3. Navigate to the "Teams" section - it should load your test data
4. Verify teams are displayed organized by game category

## Notes

- The website refreshes team data every 30 seconds
- Only teams in the "approved_teams" sheet will be displayed publicly
- The Google Form URL opens in a new tab to avoid navigation away from the site
- No database is used - everything is managed through Google Forms and Sheets
