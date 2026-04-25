const path=require('path')
const {app}=require('electron')
const fs=require('fs')
const DB_PATH=process.platform==='win32'?'C:\\MediNexus\\data.db':path.join(app.getPath('userData'),'data.db')
const dbDir=path.dirname(DB_PATH)
if(!fs.existsSync(dbDir))fs.mkdirSync(dbDir,{recursive:true})
let db=null
function getDB(){if(!db){const Database=require('better-sqlite3');db=new Database(DB_PATH);db.pragma('journal_mode = WAL');initTables()}return db}
function initTables(){getDB().exec(`CREATE TABLE IF NOT EXISTS bills (id INTEGER PRIMARY KEY AUTOINCREMENT,bill_number TEXT UNIQUE,patient_name TEXT,patient_phone TEXT,date TEXT,items TEXT,total REAL,paid REAL,balance REAL,status TEXT DEFAULT 'pending',synced INTEGER DEFAULT 0,created_at TEXT DEFAULT (datetime('now')));CREATE TABLE IF NOT EXISTS patients (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,phone TEXT UNIQUE,address TEXT,synced INTEGER DEFAULT 0,created_at TEXT DEFAULT (datetime('now')));CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY,value TEXT);`)}
function saveBill(b){return getDB().prepare(`INSERT OR REPLACE INTO bills (bill_number,patient_name,patient_phone,date,items,total,paid,balance,status,synced) VALUES (?,?,?,?,?,?,?,?,?,0)`).run(b.bill_number,b.patient_name,b.patient_phone,b.date,JSON.stringify(b.items||[]),b.total,b.paid,b.balance,b.status)}
function saveBillFromCloud(b){try{getDB().prepare(`INSERT OR IGNORE INTO bills (bill_number,patient_name,patient_phone,date,items,total,paid,balance,status,synced) VALUES (?,?,?,?,?,?,?,?,?,1)`).run(String(b.bill_number),b.patient_name,b.patient_phone,b.date,JSON.stringify(b.items||[]),b.total,b.paid,b.balance,b.status)}catch(e){}}
function getAllBills(){return getDB().prepare('SELECT * FROM bills ORDER BY created_at DESC').all().map(b=>({...b,items:JSON.parse(b.items||'[]')}))}
function getUnsyncedBills(){return getDB().prepare('SELECT * FROM bills WHERE synced=0').all().map(b=>({...b,items:JSON.parse(b.items||'[]')}))}
function markSynced(id){getDB().prepare('UPDATE bills SET synced=1 WHERE id=?').run(id)}
function savePatient(p){try{getDB().prepare('INSERT OR IGNORE INTO patients (name,phone,address,synced) VALUES (?,?,?,0)').run(p.name,p.phone,p.address)}catch(e){}}
function getAllPatients(){return getDB().prepare('SELECT * FROM patients ORDER BY name').all()}
function findPatientByPhone(phone){return getDB().prepare('SELECT * FROM patients WHERE phone LIKE ?').get(`%${phone}%`)}
function searchPatients(q){return getDB().prepare('SELECT * FROM patients WHERE name LIKE ? OR phone LIKE ? LIMIT 10').all(`%${q}%`,`%${q}%`)}
function setSetting(k,v){getDB().prepare('INSERT OR REPLACE INTO settings VALUES (?,?)').run(k,v)}
function getSetting(k){const r=getDB().prepare('SELECT value FROM settings WHERE key=?').get(k);return r?r.value:null}
module.exports={saveBill,saveBillFromCloud,getAllBills,getUnsyncedBills,markSynced,savePatient,getAllPatients,findPatientByPhone,searchPatients,setSetting,getSetting,DB_PATH}
