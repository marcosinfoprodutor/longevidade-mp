// ═══════════════════════════════════════════════════════
// FINANCE MODULE
// ═══════════════════════════════════════════════════════
let financeAssets = [];
let financeHistChart = null;

const CAT_COLORS = {
  acoes:      '#4F46E5',
  fiis:       '#059669',
  renda_fixa: '#2563EB',
  crypto:     '#D97706',
  outros:     '#6B7280',
};

const CAT_LABELS = {
  acoes:      'Ações',
  fiis:       'FIIs',
  renda_fixa: 'Renda Fixa',
  crypto:     'Crypto',
  outros:     'Outros',
};

// ── Helpers ───────────────────────────────────────────
function fmtBRL(v) {
  if (v == null || isNaN(v)) return '—';
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function fmtPct(v) {
  if (v == null || isNaN(v)) return '—';
  const sign = v >= 0 ? '+' : '';
  return sign + v.toFixed(2).replace('.', ',') + '%';
}

function assetCurrentValue(a) {
  if (a.category === 'renda_fixa') {
    // For fixed income, current_value is stored directly
    return a.current_value ?? a.invested ?? 0;
  }
  return (a.qty ?? 0) * (a.current_price ?? 0);
}

function assetReturnPct(a) {
  const invested = a.invested ?? 0;
  if (!invested) return null;
  const current = assetCurrentValue(a);
  return ((current - invested) / invested) * 100;
}

// ── Firestore CRUD ────────────────────────────────────
async function loadFinanceAssets() {
  try {
    const snap = await db.collection('finance_assets').orderBy('created_at', 'desc').get();
    financeAssets = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch(e) {
    // Collection may not exist yet — start empty
    financeAssets = [];
  }
}

async function saveAsset(data) {
  if (data.id) {
    const id = data.id;
    const payload = { ...data }; delete payload.id;
    await db.collection('finance_assets').doc(id).set(payload, { merge: true });
    const idx = financeAssets.findIndex(a => a.id === id);
    if (idx >= 0) financeAssets[idx] = { id, ...payload };
    else financeAssets.unshift({ id, ...payload });
  } else {
    const payload = { ...data, created_at: firebase.firestore.FieldValue.serverTimestamp() };
    const ref = await db.collection('finance_assets').add(payload);
    financeAssets.unshift({ id: ref.id, ...payload });
  }
  await saveFinanceSnapshot();
  renderFinance();
}

async function deleteAsset(id) {
  if (!confirm('Remover este ativo da carteira?')) return;
  await db.collection('finance_assets').doc(id).delete();
  financeAssets = financeAssets.filter(a => a.id !== id);
  await saveFinanceSnapshot();
  renderFinance();
}

async function saveFinanceSnapshot() {
  const total = financeAssets.reduce((s, a) => s + assetCurrentValue(a), 0);
  const breakdown = computeBreakdown();
  const snap = {
    date: new Date().toISOString().slice(0, 10),
    total,
    breakdown,
    saved_at: firebase.firestore.FieldValue.serverTimestamp(),
  };
  try {
    await db.collection('finance_snapshots').add(snap);
  } catch(e) {}
}

// ── Breakdown ─────────────────────────────────────────
function computeBreakdown() {
  const bd = {};
  financeAssets.forEach(a => {
    const cat = a.category || 'outros';
    bd[cat] = (bd[cat] || 0) + assetCurrentValue(a);
  });
  return bd;
}

// ── Render ────────────────────────────────────────────
async function renderFinance() {
  await loadFinanceAssets();
  renderPortfolioView();
}

function renderPortfolioView() {
  const el = document.getElementById('finance-portfolio-view');
  if (!el) return;
  const total = financeAssets.reduce((s, a) => s + assetCurrentValue(a), 0);
  const bd = computeBreakdown();

  let html = renderPatrimonioCard(total, bd);

  // Group assets by category
  const catOrder = ['acoes', 'fiis', 'renda_fixa', 'crypto', 'outros'];
  catOrder.forEach(cat => {
    const assets = financeAssets.filter(a => (a.category || 'outros') === cat);
    if (!assets.length) return;
    html += `<div class="fin-assets-section-head">${CAT_LABELS[cat] || cat}</div>`;
    html += `<div class="fin-assets-grid">`;
    assets.forEach(a => { html += renderAssetCard(a); });
    html += `</div>`;
  });

  if (!financeAssets.length) {
    html += `<div class="fin-empty">
      <div class="fin-empty-icon">💼</div>
      <div class="fin-empty-text">Nenhum ativo cadastrado</div>
      <div class="fin-empty-sub">Adicione seus investimentos para visualizar a carteira</div>
      <button class="fin-empty-btn" onclick="openAssetModal()">+ Adicionar ativo</button>
    </div>`;
  }

  el.innerHTML = html;
}

function renderPatrimonioCard(total, bd) {
  const cats = Object.keys(bd).filter(c => bd[c] > 0);
  const barSegs = cats.map(c => {
    const pct = total ? (bd[c] / total) * 100 : 0;
    return `<div class="fin-cat-segment" style="flex:${pct};background:${CAT_COLORS[c]||'#6B7280'}"></div>`;
  }).join('');

  const legendItems = cats.map(c => {
    const pct = total ? (bd[c] / total) * 100 : 0;
    return `<div class="fin-cat-item">
      <div class="fin-cat-dot" style="background:${CAT_COLORS[c]||'#6B7280'}"></div>
      <span>${CAT_LABELS[c]||c}</span>
      <span class="fin-cat-pct">${pct.toFixed(1)}%</span>
    </div>`;
  }).join('');

  return `<div class="fin-patrimonio-card">
    <div class="fin-patrimonio-label">Patrimônio Total</div>
    <div class="fin-patrimonio-total">${fmtBRL(total)}</div>
    ${cats.length ? `<div class="fin-cat-bar">${barSegs}</div><div class="fin-cat-legend">${legendItems}</div>` : ''}
  </div>`;
}

function renderAssetCard(a) {
  const cat = a.category || 'outros';
  const current = assetCurrentValue(a);
  const retPct = assetReturnPct(a);
  const retClass = retPct == null ? '' : (retPct >= 0 ? 'pos' : 'neg');
  const retStr = retPct != null ? fmtPct(retPct) : '—';
  const invested = a.invested ?? 0;
  const gain = current - invested;
  const isEditor = currentUserRole === 'admin' || currentUserRole === 'editor';

  let detailLine = '';
  if (cat === 'renda_fixa') {
    detailLine = `<div class="fin-asset-qty">Aplicado: ${fmtBRL(invested)}</div>`;
    if (a.rate) detailLine += `<div class="fin-asset-pm">Taxa: ${a.rate}</div>`;
  } else {
    detailLine = `<div class="fin-asset-qty">${a.qty ?? 0} cotas · PM ${fmtBRL(a.avg_price)}</div>`;
    detailLine += `<div class="fin-asset-pm">Preço atual: ${fmtBRL(a.current_price)}</div>`;
  }

  return `<div class="fin-asset-card cat-${cat}">
    <div class="fin-asset-header">
      <div class="fin-asset-ticker">${a.ticker || '—'}</div>
      <div class="fin-asset-badge cat-${cat}">${CAT_LABELS[cat]||cat}</div>
    </div>
    <div class="fin-asset-name" title="${a.name||''}">${a.name||'—'}</div>
    ${detailLine}
    <div class="fin-asset-divider"></div>
    <div class="fin-asset-current">${fmtBRL(current)}</div>
    <div class="fin-asset-return ${retClass}">${retStr} · ${gain >= 0 ? '+' : ''}${fmtBRL(gain)}</div>
    <div class="fin-asset-total">Investido: <strong>${fmtBRL(invested)}</strong></div>
    ${isEditor ? `<div class="fin-asset-actions">
      <button class="fin-asset-btn" onclick="openAssetModal('${a.id}')">Editar</button>
      <button class="fin-asset-btn danger" onclick="deleteAsset('${a.id}')">Remover</button>
    </div>` : ''}
  </div>`;
}

async function renderHistoryView() {
  const wrap = document.getElementById('finance-history-view');
  if (!wrap) return;

  let snaps = [];
  try {
    const snap = await db.collection('finance_snapshots')
      .orderBy('saved_at', 'asc').limit(60).get();
    snaps = snap.docs.map(d => d.data());
  } catch(e) {}

  if (!snaps.length) {
    wrap.innerHTML = `<div class="fin-hist-wrap"><div class="fin-hist-empty">Nenhum histórico disponível ainda. Os snapshots são salvos automaticamente ao adicionar ou editar ativos.</div></div>`;
    return;
  }

  // Keep one per date
  const byDate = {};
  snaps.forEach(s => { byDate[s.date] = s; });
  const dates = Object.keys(byDate).sort();
  const totals = dates.map(d => byDate[d].total || 0);

  wrap.innerHTML = `<div class="fin-hist-wrap"><canvas id="finance-hist-chart" height="120"></canvas></div>`;

  if (financeHistChart) { financeHistChart.destroy(); financeHistChart = null; }
  const ctx = document.getElementById('finance-hist-chart');
  if (!ctx) return;

  financeHistChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'Patrimônio Total',
        data: totals,
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79,70,229,0.08)',
        fill: true,
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 5,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => fmtBRL(ctx.parsed.y),
          }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { maxTicksLimit: 8, font: { size: 11 } } },
        y: {
          grid: { color: 'rgba(0,0,0,0.04)' },
          ticks: { callback: v => fmtBRL(v), font: { size: 11 }, maxTicksLimit: 6 }
        }
      }
    }
  });
}

// ── Asset Modal ───────────────────────────────────────
function openAssetModal(editId) {
  const modal = document.getElementById('asset-modal');
  if (!modal) return;

  const asset = editId ? financeAssets.find(a => a.id === editId) : null;
  const cat = asset?.category || 'acoes';

  document.getElementById('am-asset-id').value = editId || '';
  document.getElementById('am-asset-ticker').value = asset?.ticker || '';
  document.getElementById('am-asset-name').value = asset?.name || '';
  document.getElementById('am-asset-category').value = cat;
  document.getElementById('am-asset-invested').value = asset?.invested || '';

  // Show/hide fields based on category
  updateAssetModalFields(cat);

  if (cat !== 'renda_fixa') {
    document.getElementById('am-asset-qty').value = asset?.qty || '';
    document.getElementById('am-asset-avg-price').value = asset?.avg_price || '';
    document.getElementById('am-asset-current-price').value = asset?.current_price || '';
  } else {
    document.getElementById('am-asset-current-value').value = asset?.current_value || '';
    document.getElementById('am-asset-rate').value = asset?.rate || '';
  }

  document.getElementById('am-asset-title').textContent = editId ? 'Editar Ativo' : 'Novo Ativo';
  document.getElementById('am-asset-err').style.display = 'none';
  modal.classList.add('open');
}

function updateAssetModalFields(cat) {
  const isFixed = cat === 'renda_fixa';
  const varFields = document.getElementById('am-asset-var-fields');
  const fixedFields = document.getElementById('am-asset-fixed-fields');
  if (varFields) varFields.style.display = isFixed ? 'none' : '';
  if (fixedFields) fixedFields.style.display = isFixed ? '' : 'none';
}

function closeAssetModal() {
  const modal = document.getElementById('asset-modal');
  if (modal) modal.classList.remove('open');
}

async function submitAssetModal() {
  const btn = document.getElementById('am-asset-submit');
  const err = document.getElementById('am-asset-err');
  err.style.display = 'none';

  const id = document.getElementById('am-asset-id').value.trim() || null;
  const ticker = document.getElementById('am-asset-ticker').value.trim().toUpperCase();
  const name = document.getElementById('am-asset-name').value.trim();
  const category = document.getElementById('am-asset-category').value;
  const invested = parseFloat(document.getElementById('am-asset-invested').value) || 0;

  if (!ticker) { err.textContent = 'Digite o ticker do ativo.'; err.style.display = 'block'; return; }

  let data = { ticker, name, category, invested };
  if (id) data.id = id;

  if (category === 'renda_fixa') {
    const cv = parseFloat(document.getElementById('am-asset-current-value').value);
    const rate = document.getElementById('am-asset-rate').value.trim();
    data.current_value = isNaN(cv) ? invested : cv;
    if (rate) data.rate = rate;
  } else {
    const qty = parseFloat(document.getElementById('am-asset-qty').value) || 0;
    const avg_price = parseFloat(document.getElementById('am-asset-avg-price').value) || 0;
    const current_price = parseFloat(document.getElementById('am-asset-current-price').value) || 0;
    data.qty = qty;
    data.avg_price = avg_price;
    data.current_price = current_price;
    if (!data.invested && qty && avg_price) data.invested = qty * avg_price;
  }

  btn.disabled = true; btn.textContent = 'Salvando...';
  try {
    await saveAsset(data);
    closeAssetModal();
  } catch(e) {
    err.textContent = 'Erro ao salvar: ' + e.message;
    err.style.display = 'block';
  } finally {
    btn.disabled = false; btn.textContent = 'Salvar';
  }
}
