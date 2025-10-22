# Configuration Folder

This folder is designated for custom configuration files that are specific to this project.

## Purpose

- Store custom configuration files that don't need to be in the project root
- Keep project-specific settings organized and separate from standard configuration files
- Maintain clean project structure while preserving functionality

## Standard Configuration Files

The following files **must remain in the project root** and should not be moved here:

- `package.json` - Required by npm/yarn in project root
- `package-lock.json` - Must be alongside package.json
- `eslint.config.mjs` - Expected in root by ESLint
- `postcss.config.mjs` - Expected in root by PostCSS
- `next.config.ts` - Required by Next.js in project root
- `next-i18next.config.js` - Expected in root by next-i18next
- `tsconfig.json` - Required by TypeScript in project root
- `vercel.json` - Required by Vercel in project root
- `simplelocalize-config.json` - Expected in root by SimpleLocalize
- `simplelocalize.yml` - Expected in root by SimpleLocalize

## Usage

Place any new custom configuration files in this folder to maintain project organization while keeping standard configuration files in their expected locations.