// ═══════════════════════════════════════════════════════
// APP — TOP-LEVEL MODULE ORCHESTRATION
// ═══════════════════════════════════════════════════════
let currentModule = 'health';       // 'health' | 'finance'
let currentFinanceView = 'portfolio'; // 'portfolio' | 'history'

// ── Module switching ──────────────────────────────────
function switchModule(mod) {
  currentModule = mod;

  // Sidebar module buttons
  document.querySelectorAll('.sb-mod-btn').forEach(b => b.classList.toggle('active', b.dataset.mod === mod));

  // Panels
  document.getElementById('health-panel').style.display   = mod === 'health'   ? '' : 'none';
  document.getElementById('finance-panel').style.display  = mod === 'finance'  ? '' : 'none';

  // Topbar areas
  document.getElementById('health-tabs').style.display    = mod === 'health'   ? '' : 'none';
  document.getElementById('finance-actions').style.display = mod === 'finance' ? '' : 'none';

  // Content panes
  document.getElementById('health-content').style.display   = mod === 'health'   ? '' : 'none';
  document.getElementById('finance-content').style.display  = mod === 'finance'  ? '' : 'none';

  // Title
  const titles = { health: 'Saúde', finance: 'Family Office' };
  const titleEl = document.getElementById('topbar-title');
  if (titleEl) titleEl.textContent = titles[mod] || '';

  // Topbar action buttons
  const importBtn = document.getElementById('health-import-btn');
  const addBtn    = document.getElementById('finance-add-btn');
  if (importBtn) importBtn.style.display = mod === 'health'   ? '' : 'none';
  if (addBtn)    addBtn.style.display    = mod === 'finance'  ? '' : 'none';

  // Render the activated module
  if (mod === 'finance') {
    renderFinance();
  }

  closeSidebar();
}

// ── Finance sub-views ─────────────────────────────────
function switchFinanceView(view) {
  currentFinanceView = view;
  // topbar buttons
  document.querySelectorAll('.fin-view-btn').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  // sidebar sub-buttons (match by onclick text approximation — use data-view if present, else text)
  document.querySelectorAll('.sb-sub-btn').forEach(b => {
    const onclick = b.getAttribute('onclick') || '';
    if (onclick.includes("'portfolio'") || onclick.includes('"portfolio"')) b.classList.toggle('active', view === 'portfolio');
    if (onclick.includes("'history'")   || onclick.includes('"history"'))   b.classList.toggle('active', view === 'history');
  });
  document.getElementById('finance-portfolio-view').style.display = view === 'portfolio' ? '' : 'none';
  document.getElementById('finance-history-view').style.display   = view === 'history'   ? '' : 'none';
  if (view === 'history') renderHistoryView();
}

// ── Sidebar drawer (mobile) ───────────────────────────
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebar-overlay').classList.toggle('visible');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('visible');
}

// ── Main init ─────────────────────────────────────────
function init(reason) {
  if (dashInited && !reason) return;

  // Pre-render health sidebar and overview (so it's ready when user switches)
  initVaccineDefaults();
  renderHealthSidebar();
  renderOverview();

  // Default: Family Office module
  switchModule('finance');
}

// ── DOMContentLoaded wiring ───────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Sidebar overlay click closes drawer
  const overlay = document.getElementById('sidebar-overlay');
  if (overlay) overlay.addEventListener('click', closeSidebar);

  // Drag-and-drop for PDF import (health module)
  const dropZone = document.getElementById('drop-zone');
  if (dropZone) {
    dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('dz-over'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dz-over'));
    dropZone.addEventListener('drop', e => {
      e.preventDefault();
      dropZone.classList.remove('dz-over');
      handleFiles(e.dataTransfer.files);
    });
  }

  // File input in upload modal
  const fileInput = document.getElementById('file-input');
  if (fileInput) {
    fileInput.addEventListener('change', e => handleFiles(e.target.files));
  }

  // Asset modal category change
  const catSel = document.getElementById('am-asset-category');
  if (catSel) {
    catSel.addEventListener('change', () => updateAssetModalFields(catSel.value));
  }

  // Admin modal close on backdrop click
  const adminModal = document.getElementById('admin-modal');
  if (adminModal) {
    adminModal.addEventListener('click', e => { if (e.target === adminModal) closeAdmin(); });
  }

  // Asset modal close on backdrop click
  const assetModal = document.getElementById('asset-modal');
  if (assetModal) {
    assetModal.addEventListener('click', e => { if (e.target === assetModal) closeAssetModal(); });
  }

  // Modal overlay (upload) close on click
  const modalOverlay = document.getElementById('modal-overlay');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
  }

  // Keyboard: Escape closes modals
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal();
      closeAssetModal();
      closeAdmin();
      closeSidebar();
    }
  });
});
