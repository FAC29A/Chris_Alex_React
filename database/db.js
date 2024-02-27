import fs from 'fs';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database('taskdb');



const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');
db.exec(schema);

export default db;

