#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load configuration
const config = require('../simplelocalize-config.json');

const API_KEY = config.apiKey;
const UPLOAD_PATH = config.uploadOptions.uploadPath;
const LANGUAGE_KEY = config.uploadOptions.languageKey;

/**
 * Upload translations to SimpleLocalize
 */
function uploadTranslations(translations) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      content: translations,
      languageKey: LANGUAGE_KEY,
      format: 'single-language-json',
      replace: true
    });

    const options = {
      hostname: 'api.simplelocalize.io',
      port: 443,
      path: '/api/v1/translations/upload',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-SimpleLocalize-Token': API_KEY,
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

/**
 * Main function to upload translations
 */
async function uploadSourceTranslations() {
  console.log('📤 Uploading source translations to SimpleLocalize...');
  
  const filePath = path.join(__dirname, '..', UPLOAD_PATH);
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Source file not found: ${filePath}`);
    process.exit(1);
  }

  try {
    const translations = fs.readFileSync(filePath, 'utf8');
    console.log(`📁 Reading from: ${filePath}`);
    
    const result = await uploadTranslations(translations);
    console.log('✅ Upload successful!');
    console.log(`📊 Result:`, result);
  } catch (error) {
    console.error('❌ Upload failed:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  uploadSourceTranslations().catch(console.error);
}

module.exports = { uploadSourceTranslations, uploadTranslations };