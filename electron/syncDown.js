const db=require('./database')
async function downloadAllFromSupabase(url,key){
if(!url||!key)return false
try{
const pRes=await fetch(`${url}/rest/v1/patients?select=*`,{headers:{'apikey':key,'Authorization':`Bearer ${key}`}})
if(pRes.ok){const patients=await pRes.json();for(const p of patients)db.savePatient({name:p.name||'',phone:p.phone||'',address:p.address||''})}
const bRes=await fetch(`${url}/rest/v1/bills?select=*`,{headers:{'apikey':key,'Authorization':`Bearer ${key}`}})
if(bRes.ok){const bills=await bRes.json();for(const b of bills)db.saveBillFromCloud({bill_number:b.bill_number||b.id,patient_name:b.patient_name||'',patient_phone:b.patient_phone||'',date:b.date||b.created_at||new Date().toISOString(),items:b.items||[],total:b.total||0,paid:b.paid||0,balance:b.balance||0,status:b.status||'paid'})}
return true}catch(e){return false}}
module.exports={downloadAllFromSupabase}
