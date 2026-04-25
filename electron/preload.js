const {contextBridge,ipcRenderer}=require('electron')
contextBridge.exposeInMainWorld('electronAPI',{
saveBill:(b)=>ipcRenderer.invoke('save-bill',b),
getBills:()=>ipcRenderer.invoke('get-bills'),
savePatient:(p)=>ipcRenderer.invoke('save-patient',p),
getPatients:()=>ipcRenderer.invoke('get-patients'),
findPatient:(ph)=>ipcRenderer.invoke('find-patient',ph),
searchPatients:(q)=>ipcRenderer.invoke('search-patients',q),
setSetting:(k,v)=>ipcRenderer.invoke('set-setting',k,v),
getSetting:(k)=>ipcRenderer.invoke('get-setting',k),
syncNow:()=>ipcRenderer.invoke('sync-now'),
checkInternet:()=>ipcRenderer.invoke('check-internet'),
getDbPath:()=>ipcRenderer.invoke('get-db-path'),
onSyncStatus:(cb)=>ipcRenderer.on('sync-status',(_,d)=>cb(d)),
onOpenSettings:(cb)=>ipcRenderer.on('open-settings',cb),
isElectron:true,platform:process.platform})
