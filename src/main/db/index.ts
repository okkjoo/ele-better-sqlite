import { join } from 'node:path';
import { app } from 'electron';
import db from 'better-sqlite3';
import { updateSchema } from './migrations';

import type { Database } from 'better-sqlite3';

let globalInstance: Database | undefined;

export function dbInitialize() {
  if (globalInstance) throw new Error('Cannot initialize more than once!');

  // let db: Database | undefined;
  console.log(app.getPath('userData'));
  try {
    globalInstance = db(join(app.getPath('userData'), 'db', 'app.db'));

    updateSchema(globalInstance);
  } catch (err) {
    if (globalInstance) globalInstance.close();

    throw err;
  }
}
