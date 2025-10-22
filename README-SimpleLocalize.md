# SimpleLocalize Integration Setup

This document explains how to integrate SimpleLocalize with your Next.js application for automated translation management.

## 🔧 Configuration Files

### Environment Variables (`.env.local`)
```bash
# SimpleLocalize Configuration
SIMPLELOCALIZE_API_KEY=c2D30Db26f602db08EAf59CbA7fff53d3Eaaf0B5eB53BC82
SIMPLELOCALIZE_PROJECT_TOKEN=71818d4851ac4240aafdf94e8c320aff
```

### GitHub App Configuration (`simplelocalize.yml`)
```yaml
# SimpleLocalize GitHub App Configuration
pull-request:
  title: "🌐 Update translations"
  body: |
    This PR contains updated translations from SimpleLocalize.
    Please review the changes before merging.
  labels:
    - "translations"
    - "i18n"

upload:
  when:
    push:
      branches:
        - "main"
        - "develop" 
        - "feature/*"
  files:
    - path: "public/locales/en/common.json"
      format: "single-language-json"
      language-key: "en"
      options:
        - REPLACE_TRANSLATION_IF_FOUND
        - TRIM_LEADING_AND_TRAILING_WHITESPACES

download:
  files:
    - path: "public/locales/{lang}/common.json"
      format: "single-language-json"
      language-keys:
        - "en"
        - "de"
        - "es"
        - "fr"
        - "it"
```

## 📜 Available Scripts

### Upload Source Translations
```bash
npm run translations:upload
```
Uploads English source translations to SimpleLocalize for translation.

### Fetch Translated Files
```bash
npm run translations:fetch
```
Downloads all translated files from SimpleLocalize hosting.

### Sync All Translations
```bash
npm run translations:sync
```
Uploads source files and then fetches all translations in one command.

## 🚀 Setup Instructions

### 1. SimpleLocalize Project Setup
1. Create a project in [SimpleLocalize](https://simplelocalize.io)
2. Get your **API Key** and **Project Token** from project settings
3. Add your API credentials to `.env.local`

### 2. GitHub App Integration (Recommended)
1. Navigate to Project Settings in SimpleLocalize
2. Click "GitHub App" in the sidebar
3. Install the SimpleLocalize GitHub App to your repository
4. The `simplelocalize.yml` file will automatically configure the integration

### 3. Manual API Usage
If you prefer manual control, use the npm scripts:
- `npm run translations:upload` - Upload source translations
- `npm run translations:fetch` - Download translated files
- `npm run translations:sync` - Full synchronization

## 📁 Project Structure

```
public/locales/
├── en/common.json    # English (source)
├── de/common.json    # German
├── es/common.json    # Spanish
├── fr/common.json    # French
└── it/common.json    # Italian
```

## 🔒 Security Notes

- **API Key**: Used for managing translations (keep private)
- **Project Token**: Used for fetching translations from hosting
- Both credentials are stored in `.env.local` (excluded from git)
- Never commit API credentials to version control

## 🛠️ Troubleshooting

### 404 Errors
If you receive 404 errors when fetching translations:
1. Verify your Project Token is correct
2. Ensure translations exist in your SimpleLocalize project
3. Check that language keys match your project configuration

### Permission Issues with CLI
The custom Node.js scripts in `/scripts/` folder provide an alternative to the CLI tool if you encounter permission issues on Windows.

## 📚 Resources

- [SimpleLocalize Documentation](https://simplelocalize.io/docs/)
- [GitHub App Integration](https://simplelocalize.io/docs/integrations/github-app/)
- [REST API Documentation](https://simplelocalize.io/docs/api/)