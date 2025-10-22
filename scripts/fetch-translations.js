#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load configuration
const config = require('../simplelocalize-config.json');

const PROJECT_TOKEN = config.projectToken;
const LANGUAGES = config.downloadOptions.languageKeys;

/**
 * Fetch translations for a specific language
 */
function fetchTranslations(language) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.simplelocalize.io',
      port: 443,
      path: `/api/v1/translations/download?projectToken=${PROJECT_TOKEN}&languageKey=${language}&format=single-language-json`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

/**
 * Save translations to file
 */
function saveTranslations(language, translations) {
  const filePath = path.join(__dirname, '..', 'public', 'locales', language, 'common.json');
  const dirPath = path.dirname(filePath);

  // Create directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Format JSON with proper indentation
  const formattedJson = JSON.stringify(JSON.parse(translations), null, 2);
  
  fs.writeFileSync(filePath, formattedJson, 'utf8');
  console.log(`✅ Translations saved for ${language}: ${filePath}`);
}

/**
 * Main function to fetch all translations
 */
async function fetchAllTranslations() {
  console.log('🌐 Fetching translations from SimpleLocalize...');
  console.log(`📋 Languages: ${LANGUAGES.join(', ')}`);

  for (const language of LANGUAGES) {
    try {
      console.log(`📥 Fetching ${language}...`);
      const translations = await fetchTranslations(language);
      saveTranslations(language, translations);
    } catch (error) {
      console.error(`❌ Error fetching ${language}:`, error.message);
    }
  }

  console.log('🎉 Translation fetch completed!');
}

// Run the script
if (require.main === module) {
  fetchAllTranslations().catch(console.error);
}

module.exports = { fetchAllTranslations, fetchTranslations, saveTranslations };