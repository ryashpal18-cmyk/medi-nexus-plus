const {getUnsyncedBills,markSynced}=require('./database')
let supabaseUrl=null,supabaseKey=null
function setSupabaseConfig(url,key){supabaseUrl=url;supabaseKey=key}
async function checkInternet(){try{const r=await fetch('https://www.google.com',{method:'HEAD',signal:AbortSignal.timeout(3000)});return r.ok}catch{return false}}
async function syncToCloud(){
if(!supabaseUrl||!supabaseKey)return{synced:0,message:'Not configured'}
if(!await checkInternet())return{synced:0,message:'No internet'}
const bills=getUnsyncedBills();let synced=0
for(const b of bills){try{const r=await fetch(`${supabaseUrl}/rest/v1/bills`,{method:'POST',headers:{'Content-Type':'application/json','apikey':supabaseKey,'Authorization':`Bearer ${supabaseKey}`,'Prefer':'resolution=merge-duplicates'},body:JSON.stringify(b)});if(r.ok){markSynced(b.id);synced++}}catch(e){}}
return{synced,message:`${synced} bills synced!`}}
module.exports={syncToCloud,checkInternet,setSupabaseConfig}
