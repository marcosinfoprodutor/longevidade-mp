// ═══════════════════════════════════════════════════════
// EXAM DATA
// ═══════════════════════════════════════════════════════
const RAW_EXAMS = [
  {date:"2020-05-19",src:"Fleury",dr:"Dr. Paulo H. Miranda",
   m:{glicose:117,creatinina:0.87,hemoglobina:14.7,hematocrito:45.0,leucocitos:10.08,plaquetas:410,rdw:12.5,albumina:4.5}},

  {date:"2021-02-25",src:"Lázaro",dr:"Dr. Lázaro",
   m:{alt:32,ast:20,ggt:26,ck:212,pcr:0.63,creatinina:1.02,ureia:39,potassio:4.5,sodio:139,calcio_ion:1.21,
      ferritina:158.7,test_total:453.97,col_total:166,hdl:32,ldl:114,hba1c:5.7,insulina:7.0,tsh:2.52,vitB12:274,vitD:25.1,plaquetas:361,glicose:92}},

  {date:"2021-08-24",src:"Lázaro",dr:"Dr. Lázaro",
   m:{alt:32,ast:23,ggt:21,ck:285,ferro:63,pcr:1.36,creatinina:1.01,ureia:38,potassio:4.3,sodio:140,calcio_ion:1.23,
      ferritina:164.8,test_total:474.62,col_total:174,hdl:37,ldl:115,hba1c:5.5,insulina:11.1,tsh:1.94,vitB12:367,vitD:24.4,plaquetas:381}},

  {date:"2021-10-27",src:"Lázaro",dr:"Dr. Lázaro",
   m:{alt:31,ast:16,ggt:13,ck:157,ferro:57,pcr:3.63,creatinina:1.08,ureia:43,potassio:4.2,sodio:139,
      ferritina:149.3,test_total:589.55,col_total:157,hdl:40,ldl:99,insulina:5.8,vitD:24.6,plaquetas:378}},

  {date:"2022-01-07",src:"Lázaro",dr:"Dr. Lázaro",
   m:{alt:67,ast:35,ggt:15,ck:469,ferro:74,pcr:2.05,creatinina:1.05,ureia:38,potassio:3.9,sodio:140,
      ferritina:193.2,test_total:865,col_total:179,hdl:33,ldl:120,insulina:36.8,plaquetas:421}},

  {date:"2022-02-14",src:"Lázaro",dr:"Dr. Lázaro",
   m:{alt:49,ferro:79,ureia:26,potassio:4.3,sodio:141,
      ferritina:170.6,test_total:212.5,col_total:156,hdl:36,ldl:99,insulina:36.7,vitB12:357,vitD:25.4,plaquetas:398}},

  {date:"2022-04-27",src:"Lázaro",dr:"Dr. Lázaro",
   m:{alt:39,ferro:139,ck:422,pcr:1.59,ureia:25,potassio:4.4,sodio:141,
      ferritina:172.5,test_total:241.8,col_total:153,hdl:26,ldl:107,insulina:13.1,vitB12:318,vitD:49.0,plaquetas:429}},

  {date:"2022-06-14",src:"Lázaro",dr:"Dr. Lázaro",
   m:{alt:70,ast:95,ggt:24,ck:5757,pcr:1.08,creatinina:1.14,ureia:35,potassio:4.3,sodio:138,
      test_total:263.8,vitB12:898,vitD:37.0,plaquetas:384,insulina:18.9}},

  {date:"2022-09-09",src:"Lázaro",dr:"Dr. Lázaro",
   m:{alt:105,ast:37,ggt:29,ck:281,ferro:134,pcr:0.23,creatinina:1.05,ureia:42,potassio:4.3,sodio:140,
      ferritina:190.8,test_total:335.4,col_total:195,hdl:36,ldl:127,insulina:31.8,vitB12:468,vitD:32.8,plaquetas:350}},

  {date:"2022-11-07",src:"Lázaro",dr:"Dr. Lázaro",
   m:{alt:55,ast:25,ggt:25,ck:375,ferro:144,pcr:0.27,creatinina:1.02,ureia:36,potassio:4.2,sodio:141,
      ferritina:216.9,test_total:741.1,shbg:18.7,col_total:168,hdl:31,ldl:111,insulina:18.8,hba1c:5.5,tsh:1.94,plaquetas:339}},

  {date:"2023-01-04",src:"Lázaro",dr:"Dr. Lázaro",
   m:{alt:40,ast:25,ggt:23,ck:291,ferro:113,pcr:0.88,creatinina:1.14,ureia:40,potassio:4.4,sodio:138,
      ferritina:252.6,test_total:344.9,col_total:196,hdl:30,ldl:132,insulina:42.3,vitB12:328,vitD:66.3,plaquetas:419}},

  {date:"2023-04-06",src:"Lázaro",dr:"Dr. Lázaro",
   m:{alt:121,ast:39,ggt:27,ck:161,ferro:182,pcr:0.4,creatinina:0.91,ureia:41,potassio:4.6,sodio:140,
      ferritina:170.8,test_total:385.3,col_total:212,hdl:41,ldl:149,insulina:28.5,hba1c:5.6,tsh:1.58,vitB12:379,vitD:52.1,plaquetas:369}},

  {date:"2024-01-31",src:"Einstein",dr:"Dra. Mithra Cherici",
   m:{glicose:86,creatinina:1.06,ureia:41,alt:30,ast:22,ggt:14,ferritina:186,vitD:43,vitB12:777,acido_folico:15.2,
      zinco:809,test_total:632,shbg:16.4,col_total:173,hdl:33,ldl:125,hemoglobina:15.5,hematocrito:46.4,
      leucocitos:7.28,rdw:12.7,albumina:4.3,insulina:7.5,hba1c:5.4,tsh:1.9,calcio_ion:1.33,pcr:0.6}},

  {date:"2025-01-22",src:"Einstein",dr:"Dra. Mithra Cherici",
   m:{glicose:91,creatinina:1.17,ureia:43,alt:42,ast:26,ggt:15,ferritina:298,vitD:39,vitB12:897,acido_folico:17.4,
      zinco:865,test_total:698,shbg:22.8,col_total:178,hdl:38,ldl:123,hemoglobina:15.2,hematocrito:43.1,
      leucocitos:8.94,rdw:12.3,albumina:4.6,insulina:6.0,hba1c:5.7,tsh:2.34,calcio_ion:1.33,pcr:0.6}},

  {date:"2025-01-23",src:"Fleury",dr:"Dra. Graciela B. Costa",
   m:{glicose:92,creatinina:1.18,alt:40,ast:21,ferro:199,sat_transf:67,col_total:180,hdl:35,ldl:130,
      hemoglobina:15.2,hematocrito:46.0,leucocitos:8.31,plaquetas:372,rdw:12.7,hba1c:5.6,tsh:1.4}},

  {date:"2026-02-03",src:"Fleury",dr:"Dr. Ycaro Barros / Dra. Thaysa Santos",
   m:{vitA:0.8,vitE:11.8,acido_folico:7.5,vitD:37,vitB12:651,zinco:800,selenio:106,
      hemoglobina:15.1,hematocrito:45.3,leucocitos:8.19,plaquetas:352,rdw:13.6,
      ferro:155,sat_transf:51,alt:36,ast:25,creatinina:1.20,col_total:216,hdl:42,ldl:149,hba1c:5.3,tsh:1.5}},

  {date:"2026-02-24",src:"Fleury",dr:"Dr. José H. Santiago",
   note:"RM Abdome: angiomiolipomas rim esquerdo (≤0.8cm, benignos). Fígado normal — gordura hepática 3%.",
   m:{glicose:95,ureia:33,vitD:40,vitB12:931,acido_folico:6.8,zinco:700,col_total:215,hdl:43,ldl:150,hba1c:5.3}},
];

// ═══════════════════════════════════════════════════════
// TIMELINE BUILDER
// ═══════════════════════════════════════════════════════
function buildTimeline(rawExams) {
  const map = {};
  for (const e of rawExams) {
    if (!map[e.date]) map[e.date]={date:e.date,sources:[],doctors:[],markers:{},notes:[]};
    const t = map[e.date];
    if (!t.sources.includes(e.src)) t.sources.push(e.src);
    if (!t.doctors.includes(e.dr)) t.doctors.push(e.dr);
    if (e.note) t.notes.push(e.note);
    for (const [k,v] of Object.entries(e.m)) { if (v!=null) t.markers[k]=v; }
  }
  return Object.values(map).sort((a,b)=>a.date.localeCompare(b.date));
}
let TL = [];

function series(id) {
  return TL.filter(t=>t.markers[id]!=null).map(t=>({date:t.date,v:t.markers[id],src:t.sources.join('/')}));
}

function status(id, v) {
  const d=DEFS[id]; if(!d||v==null) return 'normal';
  if(v<(d.rMin??0)||v>(d.rMax??Infinity)) return 'red';
  if(d.oMin!=null&&d.oMax!=null&&(v<d.oMin||v>d.oMax)) return 'amber';
  return 'green';
}

function latest(id) { const s=series(id); return s.length?s[s.length-1]:null; }

function trend(id) {
  const s=series(id); if(s.length<2) return '→';
  const delta=s[s.length-1].v - s[s.length-2].v;
  const pct=Math.abs(delta/s[s.length-2].v)*100;
  if(pct<3) return '→';
  return delta>0?'↑':'↓';
}

function fmt(v) {
  if(v==null) return '—';
  return v>=10000?Math.round(v).toLocaleString('pt-BR'):v>=100?v.toFixed(0):v>=10?v.toFixed(1):v.toFixed(2);
}

// ═══════════════════════════════════════════════════════
// HEALTH SIDEBAR
// ═══════════════════════════════════════════════════════
function renderHealthSidebar(filter='') {
  const f = filter.toLowerCase();
  let html = '';
  for (const cat of CAT_ORDER) {
    const items = Object.entries(DEFS).filter(([id,d])=>d.cat===cat && (!f||d.name.toLowerCase().includes(f)));
    const withData = items.filter(([id])=>series(id).length>0);
    if (!withData.length) continue;
    const {label,icon} = CAT_META[cat]||{label:cat,icon:'·'};
    html += `<div class="cat-label">${icon} ${label}</div>`;
    for (const [id,d] of withData) {
      const l=latest(id); const st=l?status(id,l.v):'normal';
      const dotC=st==='green'?'var(--green)':st==='red'?'var(--red)':'var(--amber)';
      const valC=st==='green'?'var(--green)':st==='red'?'var(--red)':'var(--amber)';
      const val=l?fmt(l.v):'—';
      html+=`<button class="mk-btn" id="mkb-${id}" onclick="showChart('${id}')">
        <span class="mk-dot" style="background:${dotC}"></span>
        <span>${d.name}</span>
        <span class="mk-val" style="color:${valC}">${val}</span>
      </button>`;
    }
  }
  document.getElementById('sb-cats').innerHTML = html || '<div style="padding:20px;color:var(--muted);font-size:12px;">Nenhum resultado</div>';
}

// ═══════════════════════════════════════════════════════
// OVERVIEW
// ═══════════════════════════════════════════════════════
let sparkCharts = {};

function renderOverview() {
  let html = '';
  for (const cat of CAT_ORDER) {
    const items = Object.entries(DEFS).filter(([id,d])=>d.cat===cat && series(id).length>0);
    if (!items.length) continue;
    const {label,icon}=CAT_META[cat]||{label:cat,icon:''};
    html+=`<div class="section-head">${icon} ${label}</div><div class="cards-grid">`;
    for (const [id,d] of items) {
      const l=latest(id); if(!l) continue;
      const st=status(id,l.v);
      const cnt=series(id).length;
      const tr=trend(id);
      const refTxt=d.rMax&&d.rMax<9999?`${d.rMin??0}–${d.rMax} ${d.unit}`:d.oMin?`Ideal: ${d.oMin}–${d.oMax}`:d.unit;
      const sparkId='spark-'+id;
      html+=`<div class="bio-card s-${st}" onclick="showChart('${id}')">
        <div class="bc-header">
          <div class="bc-name">${d.name}</div>
          <div class="bc-unit">${d.unit}</div>
        </div>
        <div class="bc-val s-${st}">${fmt(l.v)} <span class="bc-trend-icon">${tr==='↑'?'↑':tr==='↓'?'↓':'→'}</span></div>
        <div class="bc-spark"><canvas id="${sparkId}" width="120" height="32"></canvas></div>
        <div class="bc-footer">
          <span class="pill pill-${st==='green'?'green':st==='red'?'red':'amber'}">${st==='green'?'Ótimo':st==='red'?'Crítico':'Atenção'}</span>
          <span class="bc-count">${cnt} medições</span>
        </div>
      </div>`;
    }
    html+='</div>';
  }
  document.getElementById('overview-view').innerHTML=html;
  Object.values(sparkCharts).forEach(c=>c.destroy());
  sparkCharts={};
  for(const [id,d] of Object.entries(DEFS)){
    const s=series(id); if(s.length<2) continue;
    const canvas=document.getElementById('spark-'+id); if(!canvas) continue;
    const vals=s.slice(-8).map(p=>p.v);
    const st=status(id,vals[vals.length-1]);
    const col=st==='green'?'#059669':st==='red'?'#DC2626':'#D97706';
    sparkCharts[id]=new Chart(canvas,{
      type:'line',
      data:{labels:vals.map((_,i)=>i),datasets:[{data:vals,borderColor:col,borderWidth:1.5,
        pointRadius:0,tension:0.4,fill:false}]},
      options:{responsive:false,animation:false,plugins:{legend:{display:false},tooltip:{enabled:false}},
        scales:{x:{display:false},y:{display:false}}}
    });
  }
}

// ═══════════════════════════════════════════════════════
// CHART
// ═══════════════════════════════════════════════════════
let chartInst = null;
let compareId = null;

function showChart(id) {
  closeSidebar();
  const d=DEFS[id]; const s=series(id);
  document.querySelectorAll('.mk-btn').forEach(b=>b.classList.remove('active'));
  const mbtn=document.getElementById('mkb-'+id);
  if(mbtn){mbtn.classList.add('active');mbtn.scrollIntoView({block:'nearest'});}
  document.getElementById('overview-view').style.display='none';
  document.getElementById('chart-view').classList.add('show');
  document.getElementById('diag-view').className='';
  document.getElementById('alerts-view').className='';
  document.getElementById('timeline-view').className='';
  document.querySelectorAll('#health-tabs .nav-tab').forEach(t=>t.classList.remove('active'));
  const firstTab = document.querySelector('#health-tabs .nav-tab');
  if(firstTab) firstTab.classList.add('active');
  currentHealthTab='chart';
  document.getElementById('topbar-title').textContent=d.name;
  document.getElementById('topbar-meta').textContent=d.unit+' · '+CAT_META[d.cat]?.label;

  if(!s.length){
    document.getElementById('cv-stats').innerHTML='';
    document.getElementById('chart-view').querySelector('.chart-wrap').innerHTML='<div class="empty-state"><div class="es-icon">📊</div><p>Sem dados para este biomarcador</p></div>';
    document.getElementById('history-table').innerHTML='';
    return;
  }
  const vals=s.map(p=>p.v);
  const last=vals[vals.length-1],minV=Math.min(...vals),maxV=Math.max(...vals),avg=vals.reduce((a,b)=>a+b)/vals.length;
  const st=status(id,last);
  const statCol=st==='green'?'var(--green)':st==='red'?'var(--red)':'var(--amber)';

  document.getElementById('cv-title').textContent=d.name;
  document.getElementById('cv-sub').textContent=`${d.unit} · ${s.length} medições · ${s[0].date} → ${s[s.length-1].date}`;
  document.getElementById('cv-stats').innerHTML=`
    <div class="cv-stat"><div class="sv" style="color:${statCol}">${fmt(last)}</div><div class="sl">Atual</div></div>
    <div class="cv-stat"><div class="sv">${fmt(avg)}</div><div class="sl">Média</div></div>
    <div class="cv-stat"><div class="sv">${fmt(minV)}</div><div class="sl">Mínimo</div></div>
    <div class="cv-stat"><div class="sv">${fmt(maxV)}</div><div class="sl">Máximo</div></div>
  `;
  const compareOpts=Object.entries(DEFS).filter(([k])=>k!==id&&series(k).length>1)
    .map(([k,v])=>`<option value="${k}" ${compareId===k?'selected':''}>${v.name}</option>`).join('');
  document.getElementById('compare-wrap').innerHTML=
    `<select class="compare-sel" onchange="setCompare('${id}',this.value)">
      <option value="">＋ Comparar com...</option>${compareOpts}
    </select>`;

  if(chartInst){chartInst.destroy();chartInst=null;}
  document.getElementById('chart-view').querySelector('.chart-wrap').innerHTML='<canvas id="main-chart"></canvas>';
  const ptColors=s.map(p=>{const st2=status(id,p.v);return st2==='green'?'#059669':st2==='red'?'#DC2626':'#D97706';});

  const refBandPlugin={id:'refBands',beforeDraw(chart){
    const {ctx,chartArea:{top,bottom,left,right},scales:{y}}=chart;
    if(!y) return;
    const drawBand=(yMin,yMax,color)=>{
      if(yMin==null||yMax==null) return;
      const yTop=Math.max(top,y.getPixelForValue(yMax));
      const yBot=Math.min(bottom,y.getPixelForValue(yMin));
      if(yBot<=yTop) return;
      ctx.save(); ctx.fillStyle=color;
      ctx.fillRect(left,yTop,right-left,yBot-yTop); ctx.restore();
    };
    if(d.rMin!=null) drawBand(0,d.rMin,'rgba(220,38,38,0.06)');
    if(d.rMax!=null&&d.rMax<9999) drawBand(d.rMax,d.rMax*2,'rgba(220,38,38,0.06)');
    if(d.oMin!=null&&d.oMax!=null) drawBand(d.oMin,d.oMax,'rgba(5,150,105,0.08)');
    if(d.rMin!=null&&d.oMin!=null&&d.oMin>d.rMin) drawBand(d.rMin,d.oMin,'rgba(217,119,6,0.06)');
    if(d.rMax!=null&&d.oMax!=null&&d.oMax<d.rMax&&d.rMax<9999) drawBand(d.oMax,d.rMax,'rgba(217,119,6,0.06)');
  }};

  const datasets=[{
    label:d.name, data:vals, yAxisID:'y',
    borderColor:'#4F46E5', backgroundColor:'rgba(79,70,229,.06)',
    pointBackgroundColor:ptColors, pointBorderColor:'#fff',
    pointBorderWidth:2, pointRadius:6, pointHoverRadius:9,
    tension:0.4, fill:true, borderWidth:2
  }];
  const allScales={
    x:{grid:{color:'#F3F4F6'},ticks:{color:'#9CA3AF',font:{size:11}}},
    y:{grid:{color:'#F3F4F6'},ticks:{color:'#9CA3AF',font:{size:11}},
      afterDataLimits:sc=>{const pad=(sc.max-sc.min)*.18||.5;sc.min=Math.max(0,sc.min-pad);sc.max+=pad;}}
  };
  if(compareId&&compareId!==id){
    const cDef=DEFS[compareId]; const cSeries=series(compareId);
    if(cSeries.length>0){
      const cVals=s.map(p=>{const cp=cSeries.find(c=>c.date===p.date);return cp?cp.v:null;});
      datasets.push({label:cDef.name,data:cVals,yAxisID:'y2',
        borderColor:'#D97706',backgroundColor:'transparent',
        borderDash:[5,3],pointBackgroundColor:'#D97706',pointBorderColor:'#fff',
        pointBorderWidth:2,pointRadius:5,tension:0.4,fill:false,borderWidth:2});
      allScales.y2={position:'right',grid:{display:false},ticks:{color:'#D97706',font:{size:11}},
        title:{display:true,text:cDef.unit,color:'#D97706',font:{size:10}}};
    }
  }

  chartInst=new Chart(document.getElementById('main-chart'),{
    type:'line', data:{labels:s.map(p=>p.date.substring(0,7)),datasets},
    plugins:[refBandPlugin],
    options:{
      responsive:true, maintainAspectRatio:true, animation:{duration:350},
      plugins:{
        legend:{display:compareId?true:false,position:'top',labels:{boxWidth:12,font:{size:11}}},
        tooltip:{
          backgroundColor:'#fff', borderColor:'#E5E8EF', borderWidth:1,
          titleColor:'#111827', bodyColor:'#6B7280', padding:10,
          titleFont:{size:12,weight:'600'}, bodyFont:{size:12},
          callbacks:{
            title:ctx=>s[ctx[0].dataIndex].date,
            label:ctx=>`${ctx.dataset.label}: ${fmt(ctx.parsed.y)} ${ctx.datasetIndex===0?d.unit:(DEFS[compareId]?.unit||'')}`,
            afterLabel:ctx=>{if(ctx.datasetIndex!==0)return '';const st2=status(id,ctx.parsed.y);return st2==='green'?'✓ Dentro do ideal':st2==='red'?'⚠ Fora da referência':'△ Atenção';}
          }
        }
      },
      scales:allScales
    }
  });

  renderAnnotationMarkers(id, s);

  let th=`<div class="history-table"><table>
    <thead><tr><th>Data</th><th>Valor</th><th>Status</th><th>Laboratório</th></tr></thead><tbody>`;
  for(let i=s.length-1;i>=0;i--){
    const p=s[i],st2=status(id,p.v);
    const pill=st2==='green'?'pill-green':st2==='red'?'pill-red':'pill-amber';
    const lbl=st2==='green'?'Ideal':st2==='red'?'Fora da ref.':'Atenção';
    th+=`<tr><td style="color:var(--muted);font-weight:500">${p.date}</td>
      <td style="font-weight:700;font-size:14px">${fmt(p.v)} <span style="font-size:11px;color:var(--muted);font-weight:400">${d.unit}</span></td>
      <td><span class="pill ${pill}">${lbl}</span></td>
      <td style="color:var(--muted)">${p.src}</td></tr>`;
  }
  th+='</tbody></table></div>';
  document.getElementById('history-table').innerHTML=th;
}

// ═══════════════════════════════════════════════════════
// ALERTS ENGINE
// ═══════════════════════════════════════════════════════
function computeAlerts() {
  const alerts = [];
  for (const [id,d] of Object.entries(DEFS)) {
    const l=latest(id); if(!l) continue;
    const st=status(id,l.v);
    if(st==='red'||st==='amber') {
      const s=series(id); let trendNote='';
      if(s.length>=3){
        const last3=s.slice(-3).map(p=>p.v);
        const improving=(d.rMax&&last3[2]<last3[0])||(d.rMin&&last3[2]>last3[0]);
        trendNote=improving?' — Tendência de melhora':'— Tendência de piora';
      }
      alerts.push({type:st,id,val:l.v,date:l.date,trendNote});
    }
  }
  const recs = [];
  const ferSeries=series('ferritina');
  if(ferSeries.length>=3){
    const ferVals=ferSeries.map(p=>p.v);
    const lastFer=ferVals[ferVals.length-1];
    const maxFer=Math.max(...ferVals);
    if(lastFer>150||maxFer>250){
      recs.push({sev:'amber',icon:'🩸',title:'Ferritina progressivamente elevada',
        desc:`Máximo histórico de ${Math.round(maxFer)} ng/mL (jan/2023). Valor atual: ${fmt(lastFer)} ng/mL. Ferritina cronicamente >150 é marcador inflamatório e de risco cardiovascular.`,
        rec:'Avaliar doação de sangue regular (reduz ferritina de forma segura), reduzir consumo de carne vermelha e álcool, investigar hemocromatose hereditária (mutação HFE), solicitar hepcidina e saturação de transferrina em série.',
        mks:'ferritina,sat_transf,ferro'});
    }
  }
  const hdlSeries=series('hdl');
  if(hdlSeries.length>=3){
    const belowOpt=hdlSeries.filter(p=>p.v<50).length;
    const lastHdl=hdlSeries[hdlSeries.length-1].v;
    if(belowOpt>=3||lastHdl<45){
      recs.push({sev:'amber',icon:'❤️',title:'HDL cronicamente baixo',
        desc:`HDL esteve abaixo de 50 mg/dL em ${belowOpt} de ${hdlSeries.length} coletas. Valor atual: ${fmt(lastHdl)} mg/dL. HDL baixo é fator de risco cardiovascular independente.`,
        rec:'Aumentar exercício aeróbico (>150 min/semana de moderado ou >75 min de intenso). Suplementar ômega-3 (2–4g/dia EPA+DHA). Avaliar inclusão de gorduras monoinsaturadas (azeite, abacate). Reduzir carboidratos simples.',
        mks:'hdl,col_total,ldl'});
    }
  }
  const testSeries=series('test_total');
  if(testSeries.length>=4){
    const testVals=testSeries.map(p=>p.v);
    const minT=Math.min(...testVals), maxT=Math.max(...testVals);
    if(maxT-minT>400){
      recs.push({sev:'amber',icon:'⚡',title:'Variação extrema de testosterona',
        desc:`Testosterona oscilou de ${fmt(minT)} a ${fmt(maxT)} ng/dL ao longo do histórico (variação de ${Math.round(maxT-minT)} ng/dL). Isso sugere interferência por fatores externos (suplementação, ciclos) ou condição endocrinológica.`,
        rec:'Confirmar coletas em condições padronizadas (manhã, jejum, sem treino nas 24h anteriores). Verificar histórico de uso de testosterona exógena, esteroides ou SARMs. Solicitar LH, FSH e prolactina para avaliar eixo hipotálamo-hipófise-gonadal.',
        mks:'test_total,shbg'});
    }
  }
  const ckSeries=series('ck');
  const ckMax=ckSeries.length?Math.max(...ckSeries.map(p=>p.v)):0;
  if(ckMax>2000){
    recs.push({sev:'red',icon:'💪',title:'Episódio de rabdomiólise detectado (jun/2022)',
      desc:`CK atingiu ${ckMax.toLocaleString('pt-BR')} U/L em jun/2022 (referência: <232 U/L). Valor consistente com rabdomiólise por exercício extremo ou trauma muscular. AST elevada no mesmo período (95 U/L) confirma lesão muscular sistêmica.`,
      rec:'Registrar contexto clínico daquela data (treino excessivo, calor extremo, medicações). Monitorar função renal durante episódios similares futuros. Evitar exercício extenuante com restrição hídrica. Checar hipotireoidismo (TSH normal). Avaliar carnitina e CoQ10.',
      mks:'ck,ast,creatinina'});
  }
  const insSeries=series('insulina');
  if(insSeries.length>=3){
    const insVals=insSeries.map(p=>p.v);
    const highIns=insVals.filter(v=>v>15).length;
    const maxIns=Math.max(...insVals);
    if(highIns>=3||maxIns>35){
      recs.push({sev:'red',icon:'🔬',title:'Resistência insulínica — padrão recorrente',
        desc:`Insulina de jejum esteve acima de 15 µUI/mL em ${highIns} coletas (máx: ${fmt(maxIns)} µUI/mL). Calculando HOMA-IR estimado: ${fmt(maxIns*100/18/22.5)} no pico. Valores elevados são preditor de DM2 e doença cardiovascular.`,
        rec:'Priorizar protocolo de jejum intermitente (16:8 mínimo). Reduzir carga glicêmica total — eliminar açúcares adicionados e ultra-processados. Solicitar teste oral de tolerância à glicose e curva insulínica. Considerar metformina low-dose ou berberina. Treino de força com progressão é essencial.',
        mks:'insulina,glicose,hba1c'});
    }
  }
  const b12Series=series('vitB12');
  if(b12Series.length>=2){
    const lastB12=b12Series[b12Series.length-1].v;
    if(lastB12>900){
      recs.push({sev:'amber',icon:'💊',title:'Vitamina B12 acima do limite superior',
        desc:`B12 atual: ${fmt(lastB12)} pg/mL (referência: 197–771 pg/mL). B12 persistentemente elevada sem suplementação pode indicar hepatopatia, mieloproliferação ou autoanticorpos. Com suplementação, reconsiderar dose.`,
        rec:'Revisar dose e forma de suplementação de B12. Se não estiver suplementando, investigar: função hepática completa, hemograma com diferencial de leucócitos (excluir neoplasia mieloide), solicitar holotranscobalamina (B12 ativa).',
        mks:'vitB12,alt,ast'});
    }
  }
  const vitASeries=series('vitA');
  if(vitASeries.length>=1){
    const lastVitA=vitASeries[vitASeries.length-1].v;
    if(lastVitA>0.7){
      recs.push({sev:'amber',icon:'💊',title:'Vitamina A acima da referência',
        desc:`Vitamina A (retinol): ${fmt(lastVitA)} mg/L (referência Fleury: 0.3–0.7 mg/L). Hipervitaminose A crônica pode causar hepatotoxicidade, dor óssea e teratogenicidade.`,
        rec:'Suspender ou reduzir suplementação de vitamina A pré-formada (retinol). Preferir betacaroteno de fontes alimentares. Repetir dosagem após 4–6 semanas sem suplementação. Avaliar função hepática.',
        mks:'vitA,alt,ast'});
    }
  }
  const vitDSeries=series('vitD');
  if(vitDSeries.length>=3){
    const lowEarly=vitDSeries.slice(0,4).filter(p=>p.v<30).length;
    const lastVitD=vitDSeries[vitDSeries.length-1].v;
    if(lowEarly>=2&&lastVitD<40){
      recs.push({sev:'amber',icon:'☀️',title:'Vitamina D historicamente abaixo do ideal',
        desc:`Vitamina D ficou abaixo de 30 ng/mL em ${lowEarly} das primeiras 4 coletas (mínimo ~24 ng/mL). Valor atual: ${fmt(lastVitD)} ng/mL. Para longevidade, alvo recomendado é 40–80 ng/mL.`,
        rec:'Manter suplementação de vitamina D3 (5.000–10.000 UI/dia com vitamina K2-MK7). Dosar em 3 meses. Otimizar exposição solar matinal (15–30 min sem protetor). Avaliar PTH e cálcio ionizado para excluir hiperparatireoidismo secundário.',
        mks:'vitD,calcio_ion'});
    }
  }
  const colSeries=series('col_total');
  if(colSeries.length>=3){
    const lastCol=colSeries[colSeries.length-1].v;
    const prevCol=colSeries[colSeries.length-3].v;
    const ldlLast=latest('ldl');
    if(lastCol>200||(ldlLast&&ldlLast.v>140)){
      recs.push({sev:'amber',icon:'❤️',title:'Colesterol e LDL em ascensão',
        desc:`Colesterol total: ${fmt(lastCol)} mg/dL. LDL: ${ldlLast?fmt(ldlLast.v):'—'} mg/dL. Tendência de alta desde 2023 (${fmt(prevCol)} → ${fmt(lastCol)} mg/dL). Para longevidade cardiovascular, LDL ideal <100 mg/dL.`,
        rec:'Priorizar fibras solúveis (aveia, psyllium). Reduzir gorduras saturadas e trans. Considerar berberina (1g 2x/dia). Avaliar ApoB, Lp(a) e LDL-P (partículas LDL) para estimar risco real. Avaliar statin de baixa dose com médico.',
        mks:'col_total,ldl,hdl'});
    }
  }
  const altSeries=series('alt');
  if(altSeries.length>=3){
    const elevAlt=altSeries.filter(p=>p.v>45).length;
    const lastAlt=altSeries[altSeries.length-1].v;
    if(elevAlt>=3){
      recs.push({sev:'amber',icon:'🔬',title:'ALT elevada em múltiplas coletas',
        desc:`ALT esteve acima de 45 U/L em ${elevAlt} de ${altSeries.length} coletas. Valores variaram muito (possivelmente correlacionados com CK alto — exercício intenso). Valor atual: ${fmt(lastAlt)} U/L.`,
        rec:'Correlacionar com CK — se CK também elevado no mesmo período, origem muscular (não hepática). Solicitar GGT e AST/ALT ratio. Realizar USG hepática com quantificação de gordura (já realizado: 3% — normal). Evitar hepatotóxicos (acetaminofeno, suplementos em excesso) antes de nova coleta.',
        mks:'alt,ast,ggt,ck'});
    }
  }
  const lastGlucose=latest('glicose');
  if(lastGlucose&&lastGlucose.v<92){
    recs.push({sev:'good',icon:'✅',title:'Glicemia de jejum em range ótimo',
      desc:`Glicose atual: ${fmt(lastGlucose.v)} mg/dL — dentro da faixa ideal para longevidade (<90 mg/dL). Desde 2024 houve melhora consistente versus 117 mg/dL em 2020.`,
      rec:'Manter controle glicêmico. Monitorar HbA1c semestralmente. Considerar CGM (monitor contínuo de glicose) para identificar picos pós-prandiais.',
      mks:'glicose,hba1c,insulina'});
  }
  const lastTest=latest('test_total');
  if(lastTest&&lastTest.v>=550&&lastTest.v<=836){
    recs.push({sev:'good',icon:'✅',title:'Testosterona total no range ótimo',
      desc:`Testosterona atual: ${fmt(lastTest.v)} ng/dL — dentro da faixa ótima para longevidade (550–836 ng/dL). Boa sinalização anabólica, cardiometabólica e neuroprotetora.`,
      rec:'Manter rotina de exercício resistido (principal estimulador natural de testosterona). Dormir 7–9h. Controlar estresse/cortisol. Monitorar SHBG semestralmente para avaliar biodisponibilidade.',
      mks:'test_total,shbg'});
  }
  return {outOfRange:alerts, recommendations:recs};
}

function renderAlerts() {
  const {outOfRange,recommendations}=computeAlerts();
  const reds=outOfRange.filter(a=>a.type==='red');
  const ambers=outOfRange.filter(a=>a.type==='amber');
  const positives=Object.keys(DEFS).filter(id=>{const l=latest(id);return l&&status(id,l.v)==='green';}).length;
  const total=Object.keys(DEFS).filter(id=>latest(id)!=null).length;
  let html=`<div class="alerts-summary">
    <div class="alert-kpi"><div class="ak-num" style="color:var(--red)">${reds.length}</div><div class="ak-lbl">Fora da Referência</div></div>
    <div class="alert-kpi"><div class="ak-num" style="color:var(--amber)">${ambers.length}</div><div class="ak-lbl">Atenção</div></div>
    <div class="alert-kpi"><div class="ak-num" style="color:var(--green)">${positives}</div><div class="ak-lbl">Dentro do Ideal</div></div>
    <div class="alert-kpi"><div class="ak-num" style="color:var(--indigo)">${total}</div><div class="ak-lbl">Biomarcadores Totais</div></div>
  </div>`;
  if(reds.length){
    html+=`<div class="alert-section"><div class="alert-section-title"><span></span> Fora da Referência Clínica <span></span></div>`;
    for(const a of reds){
      const d=DEFS[a.id];
      html+=`<div class="alert-card" onclick="showChart('${a.id}')">
        <div class="alert-icon red">🔴</div>
        <div class="alert-body">
          <div class="alert-title">${d.name} — ${fmt(a.val)} ${d.unit}</div>
          <div class="alert-desc">Valor fora do intervalo de referência (${d.rMin??0}–${d.rMax} ${d.unit}) em ${a.date}${a.trendNote}.</div>
          <div class="alert-meta">Clique para ver o histórico completo</div>
        </div>
        <span class="severity-badge"><span class="pill pill-red">Crítico</span></span>
      </div>`;
    }
    html+='</div>';
  }
  if(ambers.length){
    html+=`<div class="alert-section"><div class="alert-section-title"><span></span> Fora do Range Ótimo (Longevidade) <span></span></div>`;
    for(const a of ambers){
      const d=DEFS[a.id];
      html+=`<div class="alert-card" onclick="showChart('${a.id}')">
        <div class="alert-icon amber">⚠️</div>
        <div class="alert-body">
          <div class="alert-title">${d.name} — ${fmt(a.val)} ${d.unit}</div>
          <div class="alert-desc">Dentro da referência laboratorial, mas fora da faixa ideal para longevidade (${d.oMin}–${d.oMax} ${d.unit}) em ${a.date}${a.trendNote}.</div>
          <div class="alert-meta">Clique para ver o histórico completo</div>
        </div>
        <span class="severity-badge"><span class="pill pill-amber">Atenção</span></span>
      </div>`;
    }
    html+='</div>';
  }
  const critRecs=recommendations.filter(r=>r.sev==='red');
  const warnRecs=recommendations.filter(r=>r.sev==='amber');
  const goodRecs=recommendations.filter(r=>r.sev==='good');
  const renderRecSection=(title,items,pillClass,pillLabel)=>{
    if(!items.length) return '';
    let s=`<div class="alert-section"><div class="alert-section-title"><span></span>${title}<span></span></div>`;
    for(const r of items){
      const mks=r.mks?r.mks.split(',').map(id=>`<span class="pill ${pillClass}" style="cursor:pointer;font-size:10px" onclick="showChart('${id.trim()}')">${DEFS[id.trim()]?.name||id}</span>`).join(' '):'';
      s+=`<div class="alert-card">
        <div class="alert-icon ${r.sev==='red'?'red':r.sev==='good'?'green':'amber'}">${r.icon}</div>
        <div class="alert-body">
          <div class="alert-title">${r.title}</div>
          <div class="alert-desc">${r.desc}</div>
          <div class="alert-rec">💡 ${r.rec}</div>
          ${mks?`<div class="alert-meta" style="margin-top:8px;display:flex;gap:4px;flex-wrap:wrap">Biomarcadores relacionados: ${mks}</div>`:''}
        </div>
        <span class="severity-badge"><span class="pill ${pillClass}">${pillLabel}</span></span>
      </div>`;
    }
    s+='</div>';
    return s;
  };
  html+=renderRecSection('Achados Clínicos — Prioridade Alta',critRecs,'pill-red','Prioritário');
  html+=renderRecSection('Oportunidades de Otimização',warnRecs,'pill-amber','Otimizar');
  html+=renderRecSection('Pontos Positivos — Manter',goodRecs,'pill-green','Ótimo');
  const nextRecs = computeNextExamRecs();
  html += '<div class="alert-section"><div class="alert-section-title"><span></span> Sugestões para a Próxima Coleta <span></span></div>';
  for(const r of nextRecs) {
    html += `<div class="next-exam-card">
      <div class="next-exam-icon">${r.icon}</div>
      <div class="next-exam-body">
        <div class="next-exam-title">${r.title}</div>
        <div class="next-exam-desc">${r.desc}</div>
      </div>
    </div>`;
  }
  html += '</div>';
  document.getElementById('alerts-view').innerHTML=html;
}

// ═══════════════════════════════════════════════════════
// TIMELINE
// ═══════════════════════════════════════════════════════
function renderTimeline() {
  const srcColors={Einstein:'#4F46E5',Fleury:'#059669',Lázaro:'#D97706'};
  let html=`<div style="margin-bottom:24px;font-size:13px;color:var(--muted)">${TL.length} coletas registradas — ${TL[0].date} a ${TL[TL.length-1].date}</div>
  <div class="tl-wrapper">`;
  for(let i=TL.length-1;i>=0;i--){
    const t=TL[i];
    const src=t.sources[0]||'—';
    const clr=srcColors[src]||'#9CA3AF';
    const mks=Object.entries(t.markers);
    const reds=mks.filter(([id,v])=>status(id,v)==='red');
    const ambs=mks.filter(([id,v])=>status(id,v)==='amber');
    const greens=mks.filter(([id,v])=>status(id,v)==='green');
    html+=`<div class="tl-item">
      <div class="tl-date-col">
        <div class="tl-date-txt">${t.date}</div>
        <div class="tl-src-txt" style="color:${clr}">${t.sources.join('/')}</div>
        <div class="tl-src-txt">${mks.length} exames</div>
      </div>
      <div class="tl-node" style="background:${clr}"></div>
      <div class="tl-card">
        <div class="tl-card-head">
          <span class="tl-card-doctor">${t.doctors.join(', ')}</span>
          <span class="tl-card-count">
            ${reds.length?`<span style="color:var(--red);font-weight:600">${reds.length} fora ref.</span> `:''}
            ${ambs.length?`<span style="color:var(--amber);font-weight:600">${ambs.length} atenção</span>`:''}
          </span>
        </div>
        ${t.notes.map(n=>`<div class="tl-note">📋 ${n}</div>`).join('')}
        <div class="tl-tags">`;
    for(const [id,v] of reds){
      const d=DEFS[id]; if(!d) continue;
      html+=`<span class="tl-tag" style="background:var(--red-l);color:var(--red)" onclick="showChart('${id}')">🔴 ${d.name}: ${fmt(v)}</span>`;
    }
    for(const [id,v] of ambs){
      const d=DEFS[id]; if(!d) continue;
      html+=`<span class="tl-tag" style="background:var(--amber-l);color:var(--amber)" onclick="showChart('${id}')">△ ${d.name}: ${fmt(v)}</span>`;
    }
    for(const [id,v] of greens.slice(0,5)){
      const d=DEFS[id]; if(!d) continue;
      html+=`<span class="tl-tag" style="background:var(--surface2);color:var(--muted2)" onclick="showChart('${id}')">${d.name}: ${fmt(v)}</span>`;
    }
    if(greens.length>5) html+=`<span class="tl-tag" style="background:var(--surface2);color:var(--muted2)">+${greens.length-5} normais</span>`;
    html+='</div></div></div>';
  }
  html+='</div>';
  document.getElementById('timeline-view').innerHTML=html;
}

// ═══════════════════════════════════════════════════════
// DIAGNOSTICO
// ═══════════════════════════════════════════════════════
function renderDiag() {
  const fmt2 = v => v==null?'—':(Number.isInteger(v)?v:parseFloat(v.toFixed(1)));
  const trendIcon = id => {
    const s=series(id); if(s.length<2) return '';
    const d=s[s.length-1].v - s[s.length-2].v;
    return d>0?'↑':d<0?'↓':'→';
  };
  const tracked = Object.keys(DEFS).filter(id=>latest(id)!=null);
  const optimal = tracked.filter(id=>{const l=latest(id);return status(id,l.v)==='green';});
  const attn    = tracked.filter(id=>{const l=latest(id);return status(id,l.v)==='amber';});
  const crit    = tracked.filter(id=>{const l=latest(id);return status(id,l.v)==='red';});
  const score   = Math.round((optimal.length/tracked.length)*100);
  const scoreColor = score>=75?'#059669':score>=55?'#D97706':'#DC2626';
  const circ = 2*Math.PI*38;
  const dash = (circ*(score/100)).toFixed(1);
  const dashRem = (circ - parseFloat(dash)).toFixed(1);
  const SYSTEMS = [
    {id:'metabolismo_glicidico', icon:'🩸', label:'Metabolismo Glicídico',
      markers:['glicose','hba1c','insulina'],
      diagnose(ms) {
        const g=ms.glicose, ins=ms.insulina;
        const insSeries=series('insulina').map(p=>p.v);
        const highIns=insSeries.filter(v=>v>15).length;
        if(g&&g.v>100){ return {sev:'red',  text:'Glicemia de jejum de '+fmt2(g.v)+' mg/dL acima do ideal (<100). Insulina historicamente elevada (>15 em '+highIns+' coletas). Padrão compatível com resistência insulínica. HOMA-IR estimado no pico: '+(ins?fmt2(ins.v*(g.v)/405):'-')+'.'} }
        if(ins&&ins.v>9){ return {sev:'amber',text:'Glicose controlada ('+fmt2(g&&g.v)+' mg/dL), mas insulina de jejum ainda acima do ideal ('+fmt2(ins.v)+' µUI/mL). Sinal precoce de resistência periférica à insulina.'} }
        return {sev:'green', text:'Metabolismo glicídico bem controlado. Glicose '+fmt2(g&&g.v)+' mg/dL, insulina '+fmt2(ins&&ins.v)+' µUI/mL — ambas no range ótimo para longevidade.'};
      }},
    {id:'perfil_lipidico', icon:'❤️', label:'Risco Cardiovascular',
      markers:['col_total','ldl','hdl','tg'],
      diagnose(ms) {
        const l=ms.ldl, h=ms.hdl, t=ms.tg, c=ms.col_total;
        const hdlSeries=series('hdl'); const lowHdl=hdlSeries.filter(p=>p.v<50).length;
        if(l&&l.v>160){ return {sev:'red',  text:'LDL de '+fmt2(l.v)+' mg/dL acima do limite clínico. Colesterol total '+fmt2(c&&c.v)+' mg/dL. HDL abaixo de 50 em '+lowHdl+'/'+hdlSeries.length+' coletas. Risco cardiovascular elevado.'} }
        if((l&&l.v>130)||(h&&h.v<45)||(t&&t.v>150)){ return {sev:'amber',text:'Perfil lipídico fora do ideal: LDL '+fmt2(l&&l.v)+' mg/dL (ideal <100), HDL '+fmt2(h&&h.v)+' mg/dL (ideal >55), TG '+fmt2(t&&t.v)+' mg/dL. Risco cardiovascular moderado.'} }
        return {sev:'green', text:'Perfil lipídico aceitável. LDL '+fmt2(l&&l.v)+' mg/dL, HDL '+fmt2(h&&h.v)+' mg/dL, TG '+fmt2(t&&t.v)+' mg/dL. Monitorar tendência de LDL (elevação desde 2023).'};
      }},
    {id:'funcao_hepatica', icon:'🫁', label:'Função Hepática',
      markers:['alt','ast','ggt','albumina'],
      diagnose(ms) {
        const a=ms.alt, s=ms.ast, g=ms.ggt, al=ms.albumina;
        const altSer=series('alt'); const elevAlt=altSer.filter(p=>p.v>45).length;
        if(a&&a.v>45){ return {sev:'amber',text:'ALT de '+fmt2(a.v)+' U/L acima do limite (>45). Elevada em '+elevAlt+'/'+altSer.length+' coletas. Correlacionar com CK — se CK também elevado, origem pode ser muscular (exercício) e não hepática. GGT '+fmt2(g&&g.v)+' U/L.'} }
        if(g&&g.v>25){ return {sev:'amber',text:'GGT de '+fmt2(g.v)+' U/L acima do ideal (<25 U/L), sugestivo de sobrecarga hepática ou uso de álcool. ALT '+fmt2(a&&a.v)+', AST '+fmt2(s&&s.v)+' — dentro do limite.'} }
        return {sev:'green', text:'Função hepática preservada. ALT '+fmt2(a&&a.v)+', AST '+fmt2(s&&s.v)+', GGT '+fmt2(g&&g.v)+'. Albumina '+fmt2(al&&al.v)+' g/dL — síntese proteica adequada.'};
      }},
    {id:'inflamacao', icon:'🔥', label:'Status Inflamatório',
      markers:['pcr','ferritina','vhs'],
      diagnose(ms) {
        const p=ms.pcr, f=ms.ferritina;
        const ferSer=series('ferritina'); const maxFer=ferSer.length?Math.max(...ferSer.map(x=>x.v)):0;
        if(p&&p.v>3){ return {sev:'red',  text:'PCR de '+fmt2(p.v)+' mg/L — marcador inflamatório agudamente elevado (ref. <3 mg/L). Ferritina máx histórica '+Math.round(maxFer)+' ng/mL. Avaliar foco inflamatório ativo.'} }
        if(f&&f.v>150){ return {sev:'amber',text:'PCR controlada ('+fmt2(p&&p.v)+' mg/L). Ferritina '+fmt2(f.v)+' ng/mL — acima do ideal ótimo (50–150). Ferritina elevada é marcador de inflamação crônica de baixo grau e risco cardiovascular.'} }
        return {sev:'green', text:'Status inflamatório controlado. PCR '+fmt2(p&&p.v)+' mg/L, Ferritina '+fmt2(f&&f.v)+' ng/mL — dentro do range ótimo. Bom indicador antiaging.'};
      }},
    {id:'hormonios', icon:'⚡', label:'Eixo Hormonal Masculino',
      markers:['test_total','shbg','tsh'],
      diagnose(ms) {
        const t=ms.test_total, s=ms.shbg, ts=ms.tsh;
        const testSer=series('test_total'); const vals=testSer.map(p=>p.v);
        const minT=vals.length?Math.min(...vals):0, maxT=vals.length?Math.max(...vals):0;
        const variation=vals.length>2?maxT-minT:0;
        if(t&&(t.v<400||t.v>1200)){ return {sev:'red',text:'Testosterona de '+fmt2(t.v)+' ng/dL fora da faixa de segurança. Avaliar eixo hipotálamo-hipófise-gonadal com LH, FSH e prolactina.'} }
        if(variation>400){ return {sev:'amber',text:'Testosterona atual '+fmt2(t&&t.v)+' ng/dL (ótima), mas variação histórica extrema ('+Math.round(minT)+'–'+Math.round(maxT)+' ng/dL, Δ'+Math.round(variation)+'). Sugere interferência exógena ou instabilidade do eixo. SHBG '+fmt2(s&&s.v)+' nmol/L.'} }
        return {sev:'green', text:'Eixo hormonal otimizado. Testosterona '+fmt2(t&&t.v)+' ng/dL no range ótimo (550–836 ng/dL). SHBG '+fmt2(s&&s.v)+' nmol/L. TSH '+fmt2(ts&&ts.v)+' µUI/mL — tireoide adequada.'};
      }},
    {id:'micronutrientes', icon:'💊', label:'Micronutrientes & Vitaminas',
      markers:['vitD','vitB12','vitA','zinco','magnesio','selenio'],
      diagnose(ms) {
        const d=ms.vitD, b=ms.vitB12, a=ms.vitA;
        const issues=[];
        if(d&&d.v<40)  issues.push('VitD '+fmt2(d.v)+' ng/mL (ideal 40–80)');
        if(b&&b.v>900) issues.push('B12 '+fmt2(b.v)+' pg/mL (acima do limite)');
        if(a&&a.v>0.7) issues.push('VitA '+fmt2(a.v)+' mg/L (acima do limite)');
        if(issues.length>=2){ return {sev:'amber',text:'Múltiplos micronutrientes fora do ideal: '+issues.join('; ')+'. Revisar protocolo de suplementação para evitar hipervitaminoses.'} }
        if(issues.length===1){ return {sev:'amber',text:issues[0]+'. Demais micronutrientes dentro do esperado.'} }
        return {sev:'green', text:'Micronutrientes bem calibrados. VitD '+fmt2(d&&d.v)+' ng/mL, B12 '+fmt2(b&&b.v)+' pg/mL. Manter protocolo atual com reavaliação semestral.'};
      }},
    {id:'hematologia', icon:'🩺', label:'Hematologia',
      markers:['hb','htc','ferritina'],
      diagnose(ms) {
        const h=ms.hb, ht=ms.htc;
        if(h&&h.v<12){ return {sev:'red',  text:'Hemoglobina de '+fmt2(h.v)+' g/dL — anemia. Investigar causa (ferropriva, inflamatória, B12).'} }
        if(h&&h.v<14){ return {sev:'amber',text:'Hemoglobina de '+fmt2(h.v)+' g/dL limítrofe (ideal 14–18 g/dL em homem adulto). Hematócrito '+fmt2(ht&&ht.v)+'%. Monitorar.'} }
        return {sev:'green', text:'Hematologia dentro da normalidade. Hemoglobina '+fmt2(h&&h.v)+' g/dL, Hematócrito '+fmt2(ht&&ht.v)+'%. Boa capacidade de transporte de oxigênio.'};
      }},
    {id:'musculo_renal', icon:'💪', label:'Saúde Muscular & Renal',
      markers:['ck','creatinina','ureia'],
      diagnose(ms) {
        const ck=ms.ck, cr=ms.creatinina, ur=ms.ureia;
        const ckMax=series('ck').length?Math.max(...series('ck').map(p=>p.v)):0;
        if(ck&&ck.v>500){ return {sev:'red',  text:'CK atual '+fmt2(ck.v)+' U/L — lesão muscular ativa. Histórico: pico de '+ckMax.toLocaleString('pt-BR')+' U/L em jun/2022 (rabdomiólise). Monitorar função renal urgente.'} }
        if(ckMax>2000){   return {sev:'amber',text:'CK atual normalizada ('+fmt2(ck&&ck.v)+' U/L), mas histórico de rabdomiólise em jun/2022 ('+ckMax.toLocaleString('pt-BR')+' U/L). Creatinina '+fmt2(cr&&cr.v)+' mg/dL — função renal preservada.'} }
        return {sev:'green', text:'Saúde muscular e renal adequadas. CK '+fmt2(ck&&ck.v)+' U/L, Creatinina '+fmt2(cr&&cr.v)+' mg/dL, Ureia '+fmt2(ur&&ur.v)+' mg/dL — dentro do ideal.'};
      }},
  ];
  const ACTIONS = [
    {sev:'red',   title:'Investigar resistência insulínica', desc:'Solicitar curva insulínica (0–30–60–120 min) + HOMA-IR + HbA1c. Iniciar protocolo de jejum 16:8 e treino de força progressivo.'},
    {sev:'red',   title:'Documentar episódio de rabdomiólise (jun/2022)', desc:'Registrar contexto clínico. Monitorar creatinina e TFG após exercícios intensos futuros. Avaliar TSH, carnitina e CoQ10.'},
    {sev:'amber', title:'Controlar ferritina e inflamação crônica', desc:'Considerar doação de sangue semestral. Reduzir carne vermelha e álcool. Solicitar hepcidina e saturação de transferrina para excluir hemocromatose.'},
    {sev:'amber', title:'Otimizar perfil lipídico — LDL e HDL', desc:'Psyllium 10g/dia, ômega-3 3g/dia (EPA+DHA). Revisar gorduras saturadas na dieta. Avaliar ApoB, Lp(a) e partículas LDL-P.'},
    {sev:'amber', title:'Revisar e ajustar suplementação', desc:'VitA e B12 acima do limite indicam excesso. Pausa de 4–6 semanas e re-dosagem. VitD: manter D3 5.000 UI com K2-MK7 100 mcg.'},
    {sev:'amber', title:'Investigar variação de testosterona', desc:'Padronizar coleta (manhã, 8–10h, sem treino nas 24h anteriores). Solicitar LH, FSH, prolactina e testosterona livre + biodisponível.'},
    {sev:'amber', title:'Elevar HDL com exercício aeróbico', desc:'Meta: ≥150 min/semana de aeróbico moderado ou ≥75 min de intenso. Ômega-3 EPA+DHA ≥2g/dia. Reduzir carboidratos refinados.'},
    {sev:'green', title:'Manter controle glicêmico', desc:'Glicose no range ótimo desde 2024. Continuar protocolo atual. Monitorar HbA1c e insulina semestralmente.'},
    {sev:'green', title:'Manter testosterona no range ótimo', desc:'Exercício resistido regular, sono 7–9h, gestão de estresse. Monitorar SHBG e testosterona livre anualmente.'},
  ];
  let html = '<div style="padding:20px">';
  html += '<div class="diag-score-card">'
    + '<div class="score-ring">'
    + '<svg width="96" height="96" viewBox="0 0 96 96">'
    + '<circle cx="48" cy="48" r="38" fill="none" stroke="#E5E8EF" stroke-width="8"/>'
    + '<circle cx="48" cy="48" r="38" fill="none" stroke="'+scoreColor+'" stroke-width="8"'
    + ' stroke-dasharray="'+dash+' '+dashRem+'" stroke-linecap="round"/>'
    + '</svg>'
    + '<div class="score-num" style="color:'+scoreColor+'">'+score+'<div class="score-lbl">Score</div></div>'
    + '</div>'
    + '<div class="score-meta">'
    + '<h2>Score de Longevidade — '+(score>=75?'Bom':score>=55?'Moderado':'Atenção')+'</h2>'
    + '<p>'+optimal.length+' de '+tracked.length+' biomarcadores no range ótimo &middot; '+attn.length+' em atenção &middot; '+crit.length+' críticos</p>'
    + '<div class="score-bars">'
    + '<div class="score-bar-item"><label><span>Ótimo</span><span style="color:var(--green)">'+optimal.length+'</span></label><div class="score-bar-track"><div class="score-bar-fill" style="width:'+Math.round(optimal.length/tracked.length*100)+'%;background:var(--green)"></div></div></div>'
    + '<div class="score-bar-item"><label><span>Atenção</span><span style="color:var(--amber)">'+attn.length+'</span></label><div class="score-bar-track"><div class="score-bar-fill" style="width:'+Math.round(attn.length/tracked.length*100)+'%;background:var(--amber)"></div></div></div>'
    + '<div class="score-bar-item"><label><span>Crítico</span><span style="color:var(--red)">'+crit.length+'</span></label><div class="score-bar-track"><div class="score-bar-fill" style="width:'+Math.round(crit.length/tracked.length*100)+'%;background:var(--red)"></div></div></div>'
    + '</div></div></div>';
  html += '<div class="sys-grid">';
  for (const sys of SYSTEMS) {
    const markerData = {};
    for (const mk of sys.markers) { const l=latest(mk); if(l) markerData[mk]=l; }
    const {sev, text} = sys.diagnose(markerData);
    const statusLabel = sev==='red'?'Crítico':sev==='amber'?'Atenção':'Ótimo';
    const iconBg = sev==='red'?'var(--red-l)':sev==='amber'?'var(--amber-l)':'var(--green-l)';
    html += '<div class="sys-card">'
      + '<div class="sys-card-head">'
      + '<div class="sys-icon" style="background:'+iconBg+'">'+sys.icon+'</div>'
      + '<div class="sys-title">'+sys.label+'</div>'
      + '<div class="sys-status '+sev+'">'+statusLabel+'</div>'
      + '</div>'
      + '<div class="sys-card-body">'
      + '<div class="sys-markers">';
    for (const mk of sys.markers) {
      const l=latest(mk); if(!l) continue;
      const d=DEFS[mk]; const st=status(mk,l.v);
      const dotColor=st==='red'?'var(--red)':st==='amber'?'var(--amber)':'var(--green)';
      html += '<div class="sys-marker-row" onclick="showChart(\''+mk+'\')">'
        + '<div class="smr-dot" style="background:'+dotColor+'"></div>'
        + '<div class="smr-name">'+d.name+'</div>'
        + '<div class="smr-val" style="color:'+dotColor+'">'+fmt2(l.v)+' '+d.unit+'</div>'
        + '<div class="smr-trend">'+trendIcon(mk)+'</div>'
        + '</div>';
    }
    html += '</div><div class="sys-diag '+sev+'">'+text+'</div></div></div>';
  }
  html += '</div>';
  html += '<div class="action-plan"><div class="action-plan-head">📋 Plano de Ação Prioritizado</div>';
  let n=1;
  for (const a of ACTIONS) {
    html += '<div class="action-item">'
      + '<div class="action-num '+a.sev+'">'+n+'</div>'
      + '<div class="action-body">'
      + '<div class="action-title">'+a.title+'</div>'
      + '<div class="action-desc">'+a.desc+'</div>'
      + '</div></div>';
    n++;
  }
  html += '</div>';
  html += '<div class="section-head" style="margin-top:24px">📈 Evolução do Score de Longevidade</div>';
  html += '<div class="chart-wrap" style="padding:16px 20px"><canvas id="score-evo-chart" style="max-height:200px"></canvas></div>';
  const {bioAge, offset, factors} = calcBioAge();
  const bioColor = offset<0?'var(--green)':offset<=3?'var(--amber)':'var(--red)';
  const bioLabel = offset<0?'Mais jovem biologicamente':'Mais velho biologicamente';
  html += '<div class="section-head" style="margin-top:4px">🧬 Idade Biológica Estimada</div>';
  html += `<div class="bio-age-card">
    <div class="bio-age-ring">
      <div class="bar" style="color:${bioColor}">${bioAge}</div>
      <div class="lbl">anos biológicos</div>
      <div style="margin-top:8px;font-size:11px;color:var(--muted)">Crono: ${CHRON_AGE} anos</div>
      <div style="font-size:11px;font-weight:600;color:${bioColor};margin-top:4px">${offset>=0?'+':''}${offset} anos</div>
    </div>
    <div class="bio-age-factors">
      <h3>${bioLabel}</h3>
      ${factors.map(f=>`<div class="baf-row">
        <div class="baf-dot" style="background:${f.bad?'var(--red)':'var(--green)'}"></div>
        <div class="baf-name">${f.name}: ${fmt(f.val)} ${f.unit}</div>
        <div class="baf-val" style="color:${f.bad?'var(--red)':'var(--green)'}">${f.delta>=0?'+':''}${f.delta} anos</div>
      </div>`).join('')}
      <div style="margin-top:10px;font-size:11px;color:var(--muted);background:var(--surface2);border-radius:6px;padding:8px 10px">
        ⚠️ Estimativa educacional baseada em marcadores mensuráveis. Não substitui avaliação médica clínica.
      </div>
    </div>
  </div>`;
  const corrs = computeCorrelations();
  if(corrs.length) {
    html += '<div class="section-head" style="margin-top:4px">🔗 Padrões de Correlação</div>';
    html += '<div class="corr-grid">';
    for(const c of corrs) {
      const da=DEFS[c.a], db=DEFS[c.b];
      const col=Math.abs(c.r)>0.8?'var(--red)':Math.abs(c.r)>0.65?'var(--amber)':'var(--indigo)';
      const dir=c.r>0?'Correlação positiva — sobem juntos':'Correlação negativa — se opõem';
      html+=`<div class="corr-card" onclick="showChart('${c.a}')">
        <div class="corr-r" style="color:${col}">${c.r>0?'+':''}${c.r}</div>
        <div class="corr-names">${da.name} × ${db.name}</div>
        <div class="corr-dir">${dir} · ${c.n} pontos</div>
      </div>`;
    }
    html += '</div>';
  }
  html += '</div>';
  document.getElementById('diag-view').innerHTML = html;
  requestAnimationFrame(() => {
    const sh = buildScoreHistory();
    const sCanvas = document.getElementById('score-evo-chart');
    if(!sCanvas||sh.length<2) return;
    new Chart(sCanvas, {
      type:'line',
      data:{
        labels: sh.map(x=>x.date.substring(0,7)),
        datasets:[{
          label:'Score Longevidade %',
          data: sh.map(x=>x.score),
          borderColor:'#4F46E5', backgroundColor:'rgba(79,70,229,.08)',
          pointBackgroundColor: sh.map(x=>x.score>=75?'#059669':x.score>=55?'#D97706':'#DC2626'),
          pointBorderColor:'#fff', pointBorderWidth:2, pointRadius:6,
          tension:0.35, fill:true, borderWidth:2
        }]
      },
      options:{
        responsive:true, maintainAspectRatio:true, animation:{duration:400},
        plugins:{legend:{display:false},tooltip:{
          backgroundColor:'#fff',borderColor:'#E5E8EF',borderWidth:1,
          titleColor:'#111827',bodyColor:'#6B7280',padding:10,
          callbacks:{label:ctx=>`Score: ${ctx.parsed.y}% (${sh[ctx.dataIndex].n} biomarcadores)`}
        }},
        scales:{
          x:{grid:{color:'#F3F4F6'},ticks:{color:'#9CA3AF',font:{size:11}}},
          y:{min:0,max:100,grid:{color:'#F3F4F6'},ticks:{color:'#9CA3AF',font:{size:11},callback:v=>v+'%'}}
        }
      }
    });
  });
}

// ═══════════════════════════════════════════════════════
// COMPARE & ANNOTATIONS
// ═══════════════════════════════════════════════════════
function setCompare(baseId, cmpId) {
  compareId = cmpId || null;
  showChart(baseId);
}
function getAnnotations() {
  try { return JSON.parse(localStorage.getItem('dash_annotations')||'{}'); } catch(e){return {};}
}
function saveAnnotation(markerId, date, text) {
  const ann=getAnnotations();
  if(!ann[markerId]) ann[markerId]={};
  if(text) ann[markerId][date]=text; else delete ann[markerId][date];
  localStorage.setItem('dash_annotations',JSON.stringify(ann));
  showSync(true);
  db.collection('config').doc('annotations').set({ data: ann })
    .then(() => showSync(false)).catch(() => showSync(false));
}
function renderAnnotationMarkers(id, s) {
  const ann=getAnnotations()[id]||{};
  const rows=document.querySelectorAll('#history-table tbody tr');
  rows.forEach((row,i)=>{
    const ri=s.length-1-i; if(ri<0) return;
    const date=s[ri].date;
    const pin=ann[date]?`<span class="ann-pin" title="${ann[date]}" onclick="editAnnotation('${id}','${date}')">📌</span>`
      :`<span class="ann-add" onclick="editAnnotation('${id}','${date}')">＋</span>`;
    const td=row.cells[3]; if(td) td.innerHTML+=` ${pin}`;
  });
}
function editAnnotation(markerId, date) {
  const ann=getAnnotations()[markerId]||{};
  const existing=ann[date]||'';
  const text=prompt(`Anotação para ${date}:`, existing);
  if(text===null) return;
  saveAnnotation(markerId, date, text.trim());
  const activeMarkerEl=document.querySelector('.mk-btn.active');
  if(activeMarkerEl) showChart(markerId);
}

// ═══════════════════════════════════════════════════════
// HEALTH TAB SWITCHING
// ═══════════════════════════════════════════════════════
let currentHealthTab='overview';

function switchHealthTab(tab, btn) {
  if(btn){
    document.querySelectorAll('#health-tabs .nav-tab').forEach(t=>t.classList.remove('active'));
    btn.classList.add('active');
  }
  currentHealthTab=tab;
  if(tab!=='chart'){
    document.querySelectorAll('.mk-btn').forEach(b=>b.classList.remove('active'));
  }
  document.getElementById('overview-view').style.display  = (tab==='overview')?'':'none';
  document.getElementById('chart-view').className         = (tab==='chart')    ?'show':'';
  document.getElementById('diag-view').className          = (tab==='diag')     ?'show':'';
  document.getElementById('alerts-view').className        = (tab==='alerts')   ?'show':'';
  document.getElementById('timeline-view').className      = (tab==='timeline') ?'show':'';
  document.getElementById('vaccine-view').className       = (tab==='vaccine')  ?'show':'';
  const titles={overview:'Saúde',diag:'Diagnóstico',alerts:'Alertas & Recomendações',timeline:'Linha do Tempo',vaccine:'Cartão de Vacinação'};
  document.getElementById('topbar-title').textContent=titles[tab]||'Saúde';
  if(tab==='overview'){
    document.getElementById('topbar-meta').textContent=`${TL.length} coletas · ${Object.keys(DEFS).filter(id=>latest(id)!=null).length} biomarcadores · Último: ${TL[TL.length-1].date}`;
  } else {
    document.getElementById('topbar-meta').textContent='';
  }
  if(tab==='diag'){renderDiag();}
  if(tab==='alerts'){renderAlerts();}
  if(tab==='timeline'){renderTimeline();}
  if(tab==='vaccine'){renderVaccine();}
}

// ═══════════════════════════════════════════════════════
// UPLOAD
// ═══════════════════════════════════════════════════════
pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

async function extractPDFText(file){
  const ab=await file.arrayBuffer();
  const pdf=await pdfjsLib.getDocument({data:ab}).promise;
  let text='';
  for(let i=1;i<=pdf.numPages;i++){
    const pg=await pdf.getPage(i);
    const ct=await pg.getTextContent();
    text+=ct.items.map(it=>it.str).join(' ')+'\n';
  }
  return text;
}

function parseExamText(text){
  const markers={};
  const pairs=[
    ['glicose',/GLICOSE[^0-9]*(\d+(?:[.,]\d+)?)\s*mg\/dL/i],
    ['creatinina',/CREATININA[^0-9]*(\d+[.,]\d+)\s*mg\/dL/i],
    ['ureia',/UREIA[^0-9]*(\d+)\s*mg\/dL/i],
    ['alt',/(?:TGP|ALT|ALANINA)[^0-9]*(\d+)\s*U\/L/i],
    ['ast',/(?:TGO|AST|ASPARTATO)[^0-9]*(\d+)\s*U\/L/i],
    ['ggt',/GGT[^0-9]*(\d+)\s*U\/L/i],
    ['ck',/CREATINA QUINASE[^0-9]*(\d+)\s*U\/L/i],
    ['pcr',/C REATIVA[^0-9]*(\d+[.,]\d+)\s*mg\/L/i],
    ['ferritina',/FERRITINA[^0-9]*(\d+[.,]\d+)\s*ng\/mL/i],
    ['ferro',/FERRO[^0-9]*(\d+)\s*(?:µg|mcg)\/dL/i],
    ['sat_transf',/SATURA[CÇ][AÃ]O[^0-9]*(\d+)\s*%/i],
    ['test_total',/TESTOSTERONA TOTAL[^0-9]*(\d+[.,]?\d*)\s*ng\/dL/i],
    ['shbg',/SHBG[^0-9]*(\d+[.,]\d+)\s*nmol/i],
    ['tsh',/TSH[^0-9]*(\d+[.,]\d+)\s*[µu]UI/i],
    ['vitD',/(?:25 HIDROXI|VITAMINA D)[^0-9]*(\d+)\s*ng\/mL/i],
    ['vitB12',/VITAMINA B.?12[^0-9]*(\d+)\s*(?:pg|ng)\/(?:mL|L)/i],
    ['acido_folico',/ACIDO FOLICO[^0-9]*(\d+[.,]\d+)/i],
    ['zinco',/ZINCO[^0-9]*(\d+)\s*[µu]g\/L/i],
    ['hba1c',/HEMOGLOBINA GLICADA[^0-9]*(\d+[.,]\d+)\s*%/i],
    ['insulina',/INSULINA[^0-9]*(\d+[.,]\d+)\s*[µu]UI/i],
    ['col_total',/COLESTEROL TOTAL[^0-9]*(\d+)\s*mg/i],
    ['hdl',/HDL[^0-9]*(\d+)\s*mg/i],
    ['ldl',/LDL[^0-9]*(\d+)\s*mg/i],
    ['hemoglobina',/HEMOGLOBINA\s*:\s*(\d+[.,]\d+)\s*g\/dL/i],
    ['hematocrito',/HEMAT[OÓ]CRITO\s*:\s*(\d+[.,]\d+)\s*%/i],
    ['leucocitos',/LEUC[OÓ]CITOS[^0-9]*(\d+[.,]\d+)\s*x10/i],
    ['plaquetas',/PLAQUETAS[^0-9]*(\d+[.,]\d+)\s*x10/i],
    ['rdw',/RDW[^0-9]*(\d+[.,]\d+)\s*%/i],
    ['potassio',/POT[AÁ]SSIO[^0-9]*(\d+[.,]\d+)/i],
    ['sodio',/S[OÓ]DIO[^0-9]*(\d+)\s*mEq/i],
    ['calcio_ion',/C[AÁ]LCIO IONIZADO[^0-9]*(\d+[.,]\d+)/i],
    ['albumina',/ALBUMINA[^0-9]*(\d+[.,]\d+)\s*g\/dL/i],
    ['vitA',/VITAMINA A[^0-9]*(\d+[.,]\d+)\s*mg\/L/i],
    ['vitE',/VITAMINA E[^0-9]*(\d+[.,]\d+)\s*mg\/L/i],
    ['selenio',/SELEN[IÍ]O[^0-9]*(\d+)\s*[µu]g\/L/i],
  ];
  for(const [key,pat] of pairs){
    const m=text.match(pat);
    if(m) markers[key]=parseFloat(m[1].replace(',','.'));
  }
  const dateM=text.match(/(?:Coletado em|Data da Ficha|Dt\. Cadastro)[:\s]*(\d{2}\/\d{2}\/\d{4})/i);
  const dateStr=dateM?dateM[1].split('/').reverse().join('-'):null;
  const src=text.includes('EINSTEIN')?'Einstein':text.includes('Fleury')?'Fleury':'Externo';
  return {date:dateStr,src,markers};
}

function log(msg){
  const el=document.getElementById('upload-log');
  el.style.display='block';
  el.innerHTML+=`<div>${msg}</div>`;
  el.scrollTop=el.scrollHeight;
}

async function handleFiles(files){
  document.getElementById('upload-log').innerHTML='';
  for(const f of files){
    if(!f.name.endsWith('.pdf')){log(`⚠️ ${f.name}: não é PDF`);continue;}
    log(`Processando ${f.name}...`);
    try{
      const text=await extractPDFText(f);
      const result=parseExamText(text);
      if(!result.date){log(`⚠️ ${f.name}: data não detectada`);continue;}
      const cnt=Object.keys(result.markers).length;
      if(!cnt){log(`⚠️ ${f.name}: nenhum biomarcador detectado`);continue;}
      let examEntry;
      const ex=TL.find(t=>t.date===result.date);
      if(ex){
        for(const [k,v] of Object.entries(result.markers)) ex.markers[k]=v;
        if(!ex.sources.includes(result.src)) ex.sources.push(result.src);
        examEntry = ex;
        log(`✓ ${f.name}: ${cnt} valores adicionados em ${result.date}`);
      }else{
        examEntry={date:result.date,sources:[result.src],doctors:['Importado'],markers:result.markers,notes:[]};
        TL.push(examEntry);
        TL.sort((a,b)=>a.date.localeCompare(b.date));
        log(`✓ ${f.name}: nova coleta ${result.date} com ${cnt} valores`);
      }
      log(`💾 Salvando no banco de dados...`);
      const pdfUrl = await uploadPDFToStorage(f, result.date);
      if(pdfUrl) examEntry.pdfUrl = pdfUrl;
      await saveExamToFirestore(examEntry);
      log(`✅ ${f.name}: salvo permanentemente`);
    }catch(e){log(`✗ ${f.name}: ${e.message}`);}
  }
  renderHealthSidebar();renderOverview();
}

// ═══════════════════════════════════════════════════════
// FIREBASE PERSISTENCE
// ═══════════════════════════════════════════════════════
function showSync(saving) {
  const d = document.getElementById('sync-dot');
  if (!d) return;
  if (saving) { d.style.display = 'block'; d.className = 'saving'; }
  else { d.className = ''; setTimeout(() => { d.style.display = 'none'; }, 1200); }
}

async function loadAllData() {
  const snap = await db.collection('exams').orderBy('date').get();
  if (snap.empty) {
    await seedExamsToFirestore();
  } else {
    TL = snap.docs.map(d => {
      const data = d.data();
      if (!data.sources) data.sources = [];
      if (!data.doctors) data.doctors = [];
      if (!data.notes) data.notes = [];
      return data;
    });
  }
  try {
    const vDoc = await db.collection('config').doc('vaccines').get();
    if (vDoc.exists && vDoc.data().data) {
      localStorage.setItem('vacc_data', JSON.stringify(vDoc.data().data));
    }
  } catch(e) {}
  try {
    const aDoc = await db.collection('config').doc('annotations').get();
    if (aDoc.exists && aDoc.data().data) {
      localStorage.setItem('dash_annotations', JSON.stringify(aDoc.data().data));
    }
  } catch(e) {}
}

async function seedExamsToFirestore() {
  const seedTL = buildTimeline(RAW_EXAMS);
  const dlMsg = document.getElementById('dl-msg');
  dlMsg.textContent = `Salvando ${seedTL.length} exames no banco de dados...`;
  try {
    const batch = db.batch();
    for (const exam of seedTL) {
      batch.set(db.collection('exams').doc(exam.date), exam);
    }
    await batch.commit();
    TL = seedTL;
    dlMsg.textContent = '✓ Dados salvos com sucesso!';
    dlMsg.style.color = '#22c55e';
    setTimeout(() => { dlMsg.style.color = ''; }, 2000);
    await syncVaccinesToFirestore();
  } catch(batchErr) {
    console.error('Batch failed, trying one by one:', batchErr);
    dlMsg.textContent = 'Salvando... (modo alternativo)';
    let saved = 0;
    for (const exam of seedTL) {
      try {
        await db.collection('exams').doc(exam.date).set(exam);
        saved++;
        dlMsg.textContent = `Salvando exame ${saved}/${seedTL.length}...`;
      } catch(e) {
        console.error('Failed to save exam', exam.date, e);
        throw new Error('Permissão negada ao salvar exame ' + exam.date + ': ' + (e.code || e.message));
      }
    }
    TL = seedTL;
    dlMsg.textContent = `✓ ${saved} exames salvos!`;
  }
}

async function syncVaccinesToFirestore() {
  try {
    const vacc = JSON.parse(localStorage.getItem('vacc_data') || '{}');
    if (Object.keys(vacc).length > 0) {
      await db.collection('config').doc('vaccines').set({ data: vacc });
    }
  } catch(e) { console.warn('Vaccine sync failed:', e); }
}

async function saveExamToFirestore(exam) {
  showSync(true);
  try {
    await db.collection('exams').doc(exam.date).set(exam, { merge: true });
    showSync(false);
  } catch(e) {
    showSync(false);
    console.error('Error saving exam:', e);
  }
}

async function uploadPDFToStorage(file, date) {
  try {
    const path = `pdfs/${date}_${file.name.replace(/[^a-zA-Z0-9._-]/g,'_')}`;
    const ref = storage.ref(path);
    await ref.put(file);
    return await ref.getDownloadURL();
  } catch(e) {
    console.warn('PDF upload to Storage failed:', e);
    return null;
  }
}

function openModal(){document.getElementById('modal-overlay').classList.add('open');}
function closeModal(){document.getElementById('modal-overlay').classList.remove('open');}

// ═══════════════════════════════════════════════════════
// BIOLOGICAL AGE
// ═══════════════════════════════════════════════════════
function calcBioAge() {
  let offset = 0;
  const factors = [];
  const chk = (id, fn) => { const l=latest(id); if(l) fn(l.v); };
  chk('glicose', v => {
    if(v>105){offset+=3;factors.push({name:'Glicose',val:v,unit:'mg/dL',delta:+3,bad:true});}
    else if(v>90){offset+=1;factors.push({name:'Glicose',val:v,unit:'mg/dL',delta:+1,bad:true});}
    else{offset-=1;factors.push({name:'Glicose',val:v,unit:'mg/dL',delta:-1,bad:false});}
  });
  chk('hba1c', v => {
    if(v>5.7){offset+=3;factors.push({name:'HbA1c',val:v,unit:'%',delta:+3,bad:true});}
    else if(v>5.4){offset+=1;factors.push({name:'HbA1c',val:v,unit:'%',delta:+1,bad:true});}
    else{offset-=1;factors.push({name:'HbA1c',val:v,unit:'%',delta:-1,bad:false});}
  });
  chk('insulina', v => {
    if(v>15){offset+=3;factors.push({name:'Insulina',val:v,unit:'µUI/mL',delta:+3,bad:true});}
    else if(v>9){offset+=1;factors.push({name:'Insulina',val:v,unit:'µUI/mL',delta:+1,bad:true});}
    else{offset-=1;factors.push({name:'Insulina',val:v,unit:'µUI/mL',delta:-1,bad:false});}
  });
  chk('pcr', v => {
    if(v>3){offset+=4;factors.push({name:'PCR-us',val:v,unit:'mg/L',delta:+4,bad:true});}
    else if(v>0.5){offset+=2;factors.push({name:'PCR-us',val:v,unit:'mg/L',delta:+2,bad:true});}
    else{offset-=1;factors.push({name:'PCR-us',val:v,unit:'mg/L',delta:-1,bad:false});}
  });
  chk('ferritina', v => {
    if(v>200){offset+=2;factors.push({name:'Ferritina',val:v,unit:'ng/mL',delta:+2,bad:true});}
    else if(v>150){offset+=1;factors.push({name:'Ferritina',val:v,unit:'ng/mL',delta:+1,bad:true});}
  });
  chk('hdl', v => {
    if(v<40){offset+=3;factors.push({name:'HDL',val:v,unit:'mg/dL',delta:+3,bad:true});}
    else if(v<55){offset+=1;factors.push({name:'HDL',val:v,unit:'mg/dL',delta:+1,bad:true});}
    else if(v>=65){offset-=1;factors.push({name:'HDL',val:v,unit:'mg/dL',delta:-1,bad:false});}
  });
  chk('ldl', v => {
    if(v>160){offset+=3;factors.push({name:'LDL',val:v,unit:'mg/dL',delta:+3,bad:true});}
    else if(v>130){offset+=2;factors.push({name:'LDL',val:v,unit:'mg/dL',delta:+2,bad:true});}
    else if(v>100){offset+=1;factors.push({name:'LDL',val:v,unit:'mg/dL',delta:+1,bad:true});}
    else{offset-=0.5;factors.push({name:'LDL',val:v,unit:'mg/dL',delta:-0.5,bad:false});}
  });
  chk('vitD', v => {
    if(v<20){offset+=3;factors.push({name:'Vit D',val:v,unit:'ng/mL',delta:+3,bad:true});}
    else if(v<40){offset+=1;factors.push({name:'Vit D',val:v,unit:'ng/mL',delta:+1,bad:true});}
    else if(v>=50&&v<=70){offset-=1;factors.push({name:'Vit D',val:v,unit:'ng/mL',delta:-1,bad:false});}
  });
  chk('test_total', v => {
    if(v>=600){offset-=1;factors.push({name:'Testosterona',val:v,unit:'ng/dL',delta:-1,bad:false});}
    else if(v<400){offset+=2;factors.push({name:'Testosterona',val:v,unit:'ng/dL',delta:+2,bad:true});}
  });
  chk('albumina', v => {
    if(v>=4.5){offset-=0.5;factors.push({name:'Albumina',val:v,unit:'g/dL',delta:-0.5,bad:false});}
  });
  return {bioAge: Math.round(CHRON_AGE + offset), offset: Math.round(offset), factors};
}

// ═══════════════════════════════════════════════════════
// SCORE EVOLUTION
// ═══════════════════════════════════════════════════════
function buildScoreHistory() {
  return TL.map(t => {
    const mks = Object.keys(t.markers).filter(id=>DEFS[id]);
    const opt = mks.filter(id=>status(id,t.markers[id])==='green').length;
    return {date:t.date, score: mks.length?Math.round(opt/mks.length*100):null, n:mks.length};
  }).filter(x=>x.score!==null&&x.n>=3);
}

// ═══════════════════════════════════════════════════════
// CORRELATIONS
// ═══════════════════════════════════════════════════════
function pearson(xs, ys) {
  const n=xs.length; if(n<4) return null;
  const mx=xs.reduce((a,b)=>a+b)/n, my=ys.reduce((a,b)=>a+b)/n;
  let num=0,dx2=0,dy2=0;
  for(let i=0;i<n;i++){const dx=xs[i]-mx,dy=ys[i]-my;num+=dx*dy;dx2+=dx*dx;dy2+=dy*dy;}
  const den=Math.sqrt(dx2*dy2);
  return den===0?null:+(num/den).toFixed(2);
}
function computeCorrelations() {
  const ids = Object.keys(DEFS).filter(id=>series(id).length>=4);
  const results = [];
  for(let i=0;i<ids.length;i++) for(let j=i+1;j<ids.length;j++) {
    const a=ids[i],b=ids[j];
    const sa=series(a),sb=series(b);
    const paired=sa.map(p=>{const q=sb.find(x=>x.date===p.date);return q?[p.v,q.v]:null}).filter(Boolean);
    if(paired.length<4) continue;
    const r=pearson(paired.map(p=>p[0]),paired.map(p=>p[1]));
    if(r!==null&&Math.abs(r)>0.5) results.push({a,b,r,n:paired.length});
  }
  return results.sort((x,y)=>Math.abs(y.r)-Math.abs(x.r)).slice(0,8);
}

// ═══════════════════════════════════════════════════════
// NEXT EXAM RECOMMENDATIONS
// ═══════════════════════════════════════════════════════
function computeNextExamRecs() {
  const recs = [];
  const ldl=latest('ldl'); if(ldl&&ldl.v>130)
    recs.push({icon:'🧪',title:'Solicitar ApoB e Lp(a)',desc:'LDL elevado ('+fmt(ldl.v)+' mg/dL). ApoB mede partículas aterogênicas reais; Lp(a) é risco cardiovascular independente. Ambos são mais precisos que LDL calculado.'});
  const fer=latest('ferritina'); if(fer&&fer.v>150)
    recs.push({icon:'🩸',title:'Solicitar Hepcidina e Saturação de Transferrina em série',desc:'Ferritina '+fmt(fer.v)+' ng/mL. Hepcidina é o regulador central do ferro — identifica se a elevação é inflamatória ou de sobrecarga real. Saturação >45% sugere hemocromatose.'});
  const hdl=latest('hdl'); if(hdl&&hdl.v<50)
    recs.push({icon:'❤️',title:'Solicitar Apo A-I e LDL-P (partículas LDL)',desc:'HDL baixo ('+fmt(hdl.v)+' mg/dL). ApoA-I mede capacidade funcional do HDL; LDL-P quantifica partículas pequenas densas (mais aterogênicas que LDL total).'});
  const ts=series('test_total'); if(ts.length>=3&&(Math.max(...ts.map(p=>p.v))-Math.min(...ts.map(p=>p.v)))>400)
    recs.push({icon:'⚡',title:'Solicitar LH, FSH, Prolactina e Testosterona Livre+Biodisponível',desc:'Variação extrema de testosterona. LH/FSH avaliam eixo hipotálamo-hipófise. Testar pela manhã (8–10h), sem treino 24h antes.'});
  const ins=series('insulina'); const maxIns=ins.length?Math.max(...ins.map(p=>p.v)):0;
  if(maxIns>20)
    recs.push({icon:'🔬',title:'Curva Insulínica (0–30–60–120 min) + HOMA-IR',desc:'Insulina máx histórica: '+fmt(maxIns)+' µUI/mL. A curva insulínica detecta resistência periférica precocemente, antes que a glicemia se altere. HOMA-IR >2.5 confirma RI.'});
  const b12=latest('vitB12'); if(b12&&b12.v>900)
    recs.push({icon:'💊',title:'Solicitar Holotranscobalamina (B12 ativa) e Metilmalônico',desc:'B12 total '+fmt(b12.v)+' pg/mL. A fração ativa (holotranscobalamina) é mais clinicamente relevante; B12 elevada sem suplementação pode mascarar deficiência funcional.'});
  const pcr=latest('pcr'); if(pcr&&pcr.v>1)
    recs.push({icon:'🔥',title:'Solicitar IL-6 e Fibrinogênio',desc:'PCR '+fmt(pcr.v)+' mg/L. IL-6 é o principal indutor de CRP — sua elevação crônica está associada a sarcopenia e aceleração do envelhecimento. Fibrinogênio eleva risco trombótico.'});
  recs.push({icon:'🫀',title:'Ecocardiograma + Escore de Cálcio Coronário (CAC)',desc:'Homens a partir de 30 anos com histórico de LDL ou PCR elevados devem considerar escore de cálcio coronário. CAC=0 praticamente exclui eventos cardiovasculares nos próximos 10 anos.'});
  recs.push({icon:'🧬',title:'Testes de Longevidade Avançados',desc:'Considerar: GlycanAge (idade inflamatória), TruAge (relógio epigenético), telômeros, microbioma intestinal e painel hormonal completo (DHEA-S, IGF-1, cortisol salivar 4 pontos).'});
  return recs;
}

// ═══════════════════════════════════════════════════════
// VACCINE TAB
// ═══════════════════════════════════════════════════════
function getVaccineData() {
  try { return JSON.parse(localStorage.getItem('vacc_data')||'{}'); } catch(e){return {};}
}
function saveVaccineData(id, field, val) {
  const d=getVaccineData();
  if(!d[id]) d[id]={};
  d[id][field]=val;
  localStorage.setItem('vacc_data',JSON.stringify(d));
  showSync(true);
  db.collection('config').doc('vaccines').set({ data: d })
    .then(() => showSync(false)).catch(() => showSync(false));
}
function initVaccineDefaults() {
  if(localStorage.getItem('vacc_data')) return;
  const defaults = {
    hepB:         {done:true,  date:'2020-01-23', note:'3 doses: 22/07/19, 05/09/19, 23/01/20'},
    mmr:          {done:true,  date:'2019-09-03', note:'2 doses: 22/07/19, 03/09/19'},
    hpv:          {done:true,  date:'2020-01-25', note:'3 doses: 22/07/19, 23/09/19, 25/01/20'},
    febreAmarela: {done:true,  date:'2019-09-22', note:'Dose única — Fiocruz'},
    pneumo:       {done:true,  date:'2019-07-22', note:'PCV13 (Pneumo 13) — Laboratório Padrão SA'},
    influenza:    {done:true,  date:'2019-06-03', note:'Última dose 2019 — desatualizada, renovar anualmente'},
    dtpa:         {done:false,                    note:'Possui Dupla Adulto (dT) — 3 doses: jul/set/nov 2019. Solicitar dTpa com coqueluche no próximo reforço'},
    covid:        {done:false},
    hepA:         {done:false},
    varicela:     {done:false},
    meningo:      {done:false},
    dengue:       {done:false},
  };
  localStorage.setItem('vacc_data', JSON.stringify(defaults));
}
function renderVaccine() {
  const data = getVaccineData();
  let taken=0, missing=0, future=0, outdated=0;
  for(const v of VACCINES) {
    const vd = data[v.id]||{};
    const done = !!vd.done;
    const isAnnualOutdated = v.id==='influenza' && done && vd.date && (new Date()-new Date(vd.date))>365*24*3600*1e3;
    if(v.priority==='future') future++;
    else if(isAnnualOutdated){ outdated++; missing++; }
    else if(done) taken++;
    else missing++;
  }
  let html = `<div class="vacc-summary">
    <div class="vacc-kpi"><div class="vk-num" style="color:var(--green)">${taken}</div><div class="vk-lbl">Em Dia</div></div>
    <div class="vacc-kpi"><div class="vk-num" style="color:var(--red)">${missing}</div><div class="vk-lbl">Pendentes${outdated?` (${outdated} desatualizada${outdated>1?'s':''})`:''}</div></div>
    <div class="vacc-kpi"><div class="vk-num" style="color:var(--muted)">${future}</div><div class="vk-lbl">Para o Futuro</div></div>
    <div class="vacc-kpi"><div class="vk-num" style="color:var(--indigo)">${VACCINES.length}</div><div class="vk-lbl">No Protocolo</div></div>
  </div>`;
  const notice = missing > 0
    ? `<div style="background:var(--amber-l);border:1px solid var(--amber-m);border-radius:10px;padding:12px 16px;font-size:12px;color:var(--amber);margin-bottom:20px;display:flex;gap:8px"><span>⚠️</span><span>${missing} vacina${missing>1?'s':''} pendente${missing>1?'s':''} no protocolo de longevidade. Consulte seu médico para atualizar o cartão.</span></div>`
    : `<div style="background:var(--green-l);border:1px solid var(--green-m);border-radius:10px;padding:12px 16px;font-size:12px;color:var(--green);margin-bottom:20px;display:flex;gap:8px"><span>✅</span><span>Todas as vacinas do protocolo atual estão em dia!</span></div>`;
  html += notice;
  html += `<div class="vacc-list">
    <div class="vacc-list-head">
      <span>📋 Cartão de Vacinação — Protocolo de Longevidade</span>
      <button class="tb-btn" onclick="openVaccModal()" style="font-size:11px;padding:5px 10px">↑ Importar Cartão PDF</button>
    </div>`;
  for(const v of VACCINES) {
    const vd = data[v.id]||{};
    const isDone = !!vd.done;
    const isFuture = v.priority==='future';
    const date = vd.date||'';
    const note = vd.note||'';
    const isInfluenzaOutdated = v.id==='influenza' && isDone && date && (new Date()-new Date(date))>365*24*3600*1e3;
    const badgeClass = isFuture?'fut': isInfluenzaOutdated?'miss': isDone?'done':'miss';
    const badgeLabel = isFuture?`A partir dos ${v.age} anos`: isInfluenzaOutdated?'⚠️ Desatualizada': isDone?'✓ Tomada':'Pendente';
    const checkClass = isDone?'done':'';
    const checkMark = isDone?'✓':'';
    html += `<div class="vacc-row">
      <div class="vacc-check ${checkClass}" onclick="toggleVacc('${v.id}')" title="Marcar como tomada">${checkMark}</div>
      <div class="vacc-info">
        <div class="vacc-name">${v.name}</div>
        <div class="vacc-meta">${v.freq}</div>
        ${note?`<div class="vacc-note">📋 ${note}</div>`:''}
      </div>
      ${!isFuture?`<input class="vacc-date-input" type="date" value="${date}" onchange="saveVaccineData('${v.id}','date',this.value);renderVaccine()" title="Data da última dose" placeholder="dd/mm/aaaa">`:'<span></span>'}
      <span class="vacc-badge ${badgeClass}">${badgeLabel}</span>
    </div>`;
  }
  html += `</div>`;
  html += `<div id="vacc-modal-overlay" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:100;align-items:center;justify-content:center;backdrop-filter:blur(2px)">
    <div class="modal">
      <div class="modal-head"><h3>Importar Cartão de Vacinação</h3><button class="modal-close" onclick="closeVaccModal()">✕</button></div>
      <div class="modal-body">
        <div class="drop-zone" id="vacc-drop-zone" onclick="document.getElementById('vacc-file-input').click()">
          <div class="dz-icon">💉</div>
          <div class="dz-title">Solte o PDF ou imagem do cartão de vacinação</div>
          <div class="dz-sub">Suporta PDF e imagens (JPG, PNG)</div>
        </div>
        <input type="file" id="vacc-file-input" accept=".pdf,.jpg,.jpeg,.png" onchange="handleVaccFile(this.files)">
        <div id="vacc-log" style="margin-top:10px;font-size:12px;color:var(--muted);background:var(--surface2);border-radius:7px;padding:10px;display:none;line-height:1.7"></div>
      </div>
      <div class="modal-foot"><button class="btn-close" onclick="closeVaccModal()">Fechar</button></div>
    </div>
  </div>`;
  document.getElementById('vaccine-view').innerHTML = html;
  const vdz = document.getElementById('vacc-drop-zone');
  if(vdz){
    vdz.addEventListener('dragover', e=>{e.preventDefault();vdz.classList.add('drag');});
    vdz.addEventListener('dragleave', ()=>vdz.classList.remove('drag'));
    vdz.addEventListener('drop', e=>{e.preventDefault();vdz.classList.remove('drag');handleVaccFile(e.dataTransfer.files);});
  }
}
function toggleVacc(id) {
  const d=getVaccineData();
  const cur = d[id]?.done;
  saveVaccineData(id,'done',!cur);
  if(!cur) saveVaccineData(id,'date', new Date().toISOString().slice(0,10));
  renderVaccine();
}
function openVaccModal(){document.getElementById('vacc-modal-overlay').style.display='flex';}
function closeVaccModal(){document.getElementById('vacc-modal-overlay').style.display='none';}
async function handleVaccFile(files){
  const logEl=document.getElementById('vacc-log');
  logEl.style.display='block';logEl.innerHTML='';
  const logV=msg=>{logEl.innerHTML+=`<div>${msg}</div>`;logEl.scrollTop=logEl.scrollHeight;};
  for(const f of files){
    logV(`Processando ${f.name}...`);
    try{
      let text='';
      if(f.name.endsWith('.pdf')){
        text=await extractPDFText(f);
      } else {
        logV('⚠️ Para imagens, detecte as vacinas manualmente e marque-as na lista.');
        continue;
      }
      const lower=text.toLowerCase();
      let found=0;
      for(const v of VACCINES){
        const names={
          influenza:['influenza','gripe'],covid:['covid','sars-cov','coronavac'],
          hepB:['hepatite b'],hepA:['hepatite a'],mmr:['triplice viral','sarampo','scr'],
          dtpa:['dtpa','tetano','difteria'],varicela:['varicela','catapora'],
          hpv:['hpv','papiloma'],pneumo:['pneumococ'],meningo:['meningococ'],
          dengue:['dengue','qdenga'],zoster:['zoster','shingrix','herpes zoster'],
          febreAmarela:['febre amarela','amarela','fiocruz'],
        };
        const keywords=names[v.id]||[];
        if(keywords.some(k=>lower.includes(k))){
          saveVaccineData(v.id,'done',true);
          found++;
          logV(`✓ Detectada: ${v.name}`);
        }
      }
      if(!found) logV('Nenhuma vacina detectada automaticamente. Marque manualmente na lista.');
      else{ renderVaccine(); logV(`✓ ${found} vacina(s) marcada(s)!`); }
    }catch(e){logV(`✗ Erro: ${e.message}`);}
  }
}
