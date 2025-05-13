import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ENCODING_FORMAT = 'utf8';
const LOCALES_DIRECTORY_NAME = 'locales';
const MAIN_LOCALE = 'en.json';
const LOCALES_DIR = join(__dirname, LOCALES_DIRECTORY_NAME);

const isObject = value => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

const syncStructure = (main, target, filename, path = '') => {
  console.log(target, 'target');

  const result = {};
  const removedKeys = [];

  // 1. Add/update keys from main to target
  for (const key in main) {
    const currentPath = path ? `${path}.${key}` : key;

    if (isObject(main[key])) {
      // Work with nested objects
      const targetNested = isObject(target[key]) ? target[key] : {};
      const { mergedJson, removedKeys: nestedRemoved } = syncStructure(
        main[key],
        targetNested,
        filename,
        currentPath
      );
      result[key] = mergedJson;
      removedKeys.push(...nestedRemoved);
    } else {
      // Copy the value from main to target
      result[key] = key in target ? target[key] : '';
      if (!(key in target)) {
        console.log(`   + Added key: ${currentPath}`);
      }
    }
  }

  // 2. Удаляем ключи, которых нет в main
  for (const key in target) {
    const currentPath = path ? `${path}.${key}` : key;
    if (!(key in main)) {
      removedKeys.push(currentPath);
    }
  }

  return { mergedJson: result, removedKeys };
};

const syncLocales = () => {
  try {
    console.log('🔍 Starting locales synchronization...');

    // Main file reading
    const mainPath = join(LOCALES_DIR, MAIN_LOCALE);
    const mainContent = readFileSync(mainPath, ENCODING_FORMAT);
    const mainJson = JSON.parse(mainContent);

    // Getting of secondary locale files
    const localeFiles = readdirSync(LOCALES_DIR).filter(
      file => file.endsWith('.json') && file !== MAIN_LOCALE
    );

    // Checking secondary locale file
    localeFiles.forEach(file => {
      const filePath = join(LOCALES_DIR, file);
      let targetJson = {};

      if (existsSync(filePath)) {
        const fileContent = readFileSync(filePath, ENCODING_FORMAT) || '{}';
        targetJson = JSON.parse(fileContent);
      }

      // Full synchronization
      const { mergedJson, removedKeys } = syncStructure(mainJson, targetJson, file);

      // Saving the result
      writeFileSync(filePath, JSON.stringify(mergedJson, null, 2) + '\n', ENCODING_FORMAT);

      console.log(`✅ Updated: ${file}`);
      if (removedKeys.length > 0) {
        console.log(`   - Removed keys: ${removedKeys.join(', ')}`);
      }
    });

    console.log('🎉 All locales synced successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

syncLocales();
