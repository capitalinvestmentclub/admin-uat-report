const data = window.ADMIN_UAT;
const severityRank = {critical:0,high:1,medium:2,low:3};
let state = {severity:'all',scenario:'all',query:'',sort:'severity'};
const $ = (id) => document.getElementById(id);

function esc(value){return String(value).replace(/[&<>"']/g,(c)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function filtered(){
  const q=state.query.trim().toLowerCase();
  return data.findings.filter(f=>(state.severity==='all'||f.severity===state.severity)&&(state.scenario==='all'||f.scenario===state.scenario)&&(!q||Object.values(f).join(' ').toLowerCase().includes(q))).sort((a,b)=>state.sort==='severity'?(severityRank[a.severity]-severityRank[b.severity]||a.id.localeCompare(b.id)):a[state.sort].localeCompare(b[state.sort]));
}
function renderFilters(){
  const severities=['all','critical','high','medium'];
  $('severity-filters').innerHTML=severities.map(v=>`<button class="filter-pill ${state.severity===v?'active':''}" data-severity="${v}">${v==='all'?'All severities':v}</button>`).join('');
  const scenarios=['all',...data.scenarios.map(s=>s[0])];
  $('scenario-filters').innerHTML=scenarios.map(v=>`<button class="filter-pill ${state.scenario===v?'active':''}" data-scenario="${v}">${v==='all'?'All scenarios':v}</button>`).join('');
}
function render(){
  renderFilters(); const rows=filtered(); $('result-count').textContent=rows.length;
  $('active-filter-copy').textContent=state.scenario==='all'?'Full Admin record':state.scenario;
  $('findings-list').innerHTML=rows.map(f=>`<button class="finding-row" data-id="${f.id}"><span><small>${f.id} · ${f.scenario}</small><strong>${esc(f.title)}</strong><em>${esc(f.summary)}</em></span><span>${esc(f.area)}</span><span class="badge ${f.severity}">${f.severity}</span></button>`).join('');
  $('empty-state').hidden=rows.length>0;
}
function openFinding(id){
  const f=data.findings.find(x=>x.id===id); if(!f)return;
  $('dialog-kicker').textContent=`${f.id} · ${f.scenario} · ${f.severity}`; $('dialog-title').textContent=f.title;
  $('dialog-content').innerHTML=`<section><h3>Observed</h3><p>${esc(f.summary)}</p></section><section><h3>Expected</h3><p>${esc(f.expected)}</p></section><section><h3>Retest</h3><p>${esc(f.retest)}</p></section><p class="evidence-note">Detailed evidence remains in the private webapp test record; this public drawer is sanitized.</p>`;
  $('finding-dialog').showModal(); history.replaceState(null,'',`#${id}`);
}
function exportCsv(){
  const values=[['ID','Scenario','Severity','Area','Title','Summary'],...filtered().map(f=>[f.id,f.scenario,f.severity,f.area,f.title,f.summary])];
  const csv=values.map(r=>r.map(v=>`"${String(v).replaceAll('"','""')}"`).join(',')).join('\n');
  const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'})); a.download='admin-uat-findings.csv'; a.click(); URL.revokeObjectURL(a.href);
}
$('metric-total').textContent=data.findings.length;
$('metric-urgent').textContent=data.findings.filter(f=>['critical','high'].includes(f.severity)).length;
$('metric-open').textContent=data.findings.length;
$('scenarios').innerHTML=data.scenarios.map(s=>`<tr><td><strong>${s[0]}</strong></td><td><span class="badge critical">${s[1]}</span></td><td>${esc(s[2])}</td><td>${esc(s[3])}</td></tr>`).join('');
document.addEventListener('click',e=>{const sev=e.target.closest('[data-severity]');const sc=e.target.closest('[data-scenario]');const row=e.target.closest('[data-id]');if(sev){state.severity=sev.dataset.severity;render();}if(sc){state.scenario=sc.dataset.scenario;render();}if(row)openFinding(row.dataset.id);});
$('search').addEventListener('input',e=>{state.query=e.target.value;render();});
$('sort').addEventListener('change',e=>{state.sort=e.target.value;render();});
$('dialog-close').addEventListener('click',()=>{$('finding-dialog').close();history.replaceState(null,'',location.pathname);});
$('clear-filters').addEventListener('click',()=>{state={severity:'all',scenario:'all',query:'',sort:'severity'};$('search').value='';render();});
$('export-button').addEventListener('click',exportCsv);
$('share-button').addEventListener('click',async()=>{await navigator.clipboard.writeText(location.href);$('toast').textContent='View link copied';$('toast').classList.add('show');setTimeout(()=>$('toast').classList.remove('show'),1800);});
document.addEventListener('keydown',e=>{if(e.key==='/'&&!/input|select|textarea/i.test(e.target.tagName)){e.preventDefault();$('search').focus();}if(e.key==='Escape'&&$('finding-dialog').open)$('finding-dialog').close();});
render(); if(location.hash)openFinding(location.hash.slice(1));
