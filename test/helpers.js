/**
 * Talisman unit tests helpers
 * ============================
 *
 */
import {default as parseCsv} from 'csv-parse/lib/sync';
import path from 'path';
import fs from 'fs';

/**
 * Function used to easily load some resources from the file system.
 */
export function loadResource(location) {
  return fs.readFileSync(path.join(__dirname, '_resources', location), 'utf-8');
}

/**
 * Function used to easily load & parse some CSV file from the file system.
 */
export function loadCSV(location) {
  return parseCsv(loadResource(location));
}
