const {app,BrowserWindow,Menu,ipcMain,dialog}=require('electron')
const path=require('path')
const fs=require('fs')
const db=require('./database')
const sync=require('./sync')
const {downloadAllFromSupabase}=require('./syncDown')
let mainWindow,syncInterval=null,SURL=null,SKEY=null
function createWindow(){
mainWindow=new BrowserWindow({width:1280,height:800,minWidth:900,minHeight:600,title:'MediNexus Billing',webPreferences:{nodeIntegration:false,contextIsolation:true,preload:path.join(__dirname,'preload.js')},show:false,backgroundColor:'#f8fafc'})
const idx=path.join(__dirname,'../dist/index.html')
if(fs.existsSync(idx))mainWindow.loadFile(idx)
else mainWindow.loadURL('http://localhost:5173')
mainWindow.once('ready-to-show',()=>{
mainWindow.show()
mainWindow.maximize()
setTimeout(async()=>{
SURL=db.getSetting('supabase_url')
SKEY=db.getSetting('supabase_key')
if(SURL&&SKEY){
mainWindow.webContents.send('sync-status',{message:'🔄 Sync ho raha hai...'})
await downloadAllFromSupabase(SURL,SKEY)
sync.setSupabaseConfig(SURL,SKEY)
mainWindow.webContents.send('sync-status',{message:'✅ Sync complete!'})
}},3000)})
syncInterval=setInterval(async()=>{if(SURL&&SKEY){await downloadAllFromSupabase(SURL,SKEY);await sync.syncToCloud()}},5*60*1000)
Menu.setApplicationMenu(Menu.buildFromTemplate([
{label:'File',submenu:[{label:'🖨️ Print',accelerator:'CmdOrCtrl+P',role:'print'},{type:'separator'},{label:'❌ Exit',click:()=>app.quit()}]},
{label:'Data',submenu:[{label:'🔄 Sync Karo',click:async()=>{const r=await downloadAllFromSupabase(SURL,SKEY);dialog.showMessageBox(mainWindow,{title:'Sync',message:r?'✅ Done!':'❌ Internet nahi'})}},{label:'📁 Data Folder',click:()=>require('electron').shell.openPath(path.dirname(db.DB_PATH))}]},
{label:'View',submenu:[{role:'reload'},{role:'zoomIn'},{role:'zoomOut'},{role:'resetZoom'},{role:'togglefullscreen'}]}]))}
ipcMain.handle('save-bill',(_,b)=>db.saveBill(b))
ipcMain.handle('get-bills',()=>db.getAllBills())
ipcMain.handle('save-patient',(_,p)=>db.savePatient(p))
ipcMain.handle('get-patients',()=>db.getAllPatients())
ipcMain.handle('find-patient',(_,ph)=>db.findPatientByPhone(ph))
ipcMain.handle('search-patients',(_,q)=>db.searchPatients(q))
ipcMain.handle('set-setting',(_,k,v)=>{db.setSetting(k,v);if(k==='supabase_url')SURL=v;if(k==='supabase_key'){SKEY=v;sync.setSupabaseConfig(SURL,SKEY)}})
ipcMain.handle('get-setting',(_,k)=>db.getSetting(k))
ipcMain.handle('sync-now',async()=>{await downloadAllFromSupabase(SURL,SKEY);return sync.syncToCloud()})
ipcMain.handle('check-internet',async()=>sync.checkInternet())
ipcMain.handle('get-db-path',()=>db.DB_PATH)
app.whenReady().then(createWindow)
app.on('window-all-closed',()=>{if(syncInterval)clearInterval(syncInterval);if(process.platform!=='darwin')app.quit()})
