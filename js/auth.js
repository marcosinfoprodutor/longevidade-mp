// ═══════════════════════════════════════════════════════
// AUTH STATE
// ═══════════════════════════════════════════════════════
auth.onAuthStateChanged(async user => {
  if (user) {
    const allowed = ALLOWED_EMAILS.includes(user.email) || await checkAllowed(user.uid);
    if (!allowed) {
      await auth.signOut();
      lcErr('Acesso não autorizado. Solicite permissão ao administrador.');
      return;
    }
    currentUser = user;
    isAdmin = user.email === ADMIN_EMAIL;
    currentUserRole    = isAdmin ? 'admin' : 'viewer';
    currentUserModules = 'all';
    // Fetch role + modules from Firestore
    try {
      const rdoc = await db.collection('allowed_users').doc(user.uid).get();
      if(rdoc.exists) {
        currentUserRole    = rdoc.data().role    || 'viewer';
        currentUserModules = rdoc.data().modules || 'all';
      }
    } catch(e){}
    // Log this login session (fire and forget)
    logLogin(user.uid);
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('sidebar').style.display = '';
    document.getElementById('main').style.display = '';
    // Update sidebar user info
    const av = document.getElementById('tb-avatar');
    if(av) av.textContent = user.email[0].toUpperCase();
    const em = document.getElementById('tb-email');
    if(em) em.textContent = user.email;
    const adminSection = document.getElementById('sb-admin-section');
    if(adminSection) adminSection.style.display = isAdmin ? '' : 'none';
    if (!dashInited) {
      dashInited = true;
      document.getElementById('data-loading').style.display = 'flex';
      document.getElementById('dl-msg').textContent = 'Carregando seus dados de saúde...';
      try {
        await loadAllData();
      } catch(e) {
        console.error('Firestore load failed:', e);
        TL = buildTimeline(RAW_EXAMS);
        if (isAdmin) {
          document.getElementById('dl-msg').textContent = '⚠️ Erro ao conectar ao Firebase: ' + (e.code || e.message || e);
          document.getElementById('dl-msg').style.color = '#ef4444';
          await new Promise(r => setTimeout(r, 4000));
          document.getElementById('dl-msg').style.color = '';
        }
      }
      document.getElementById('data-loading').style.display = 'none';
      init('loaded');
    }
  } else {
    currentUser = null; isAdmin = false;
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('sidebar').style.display = 'none';
    document.getElementById('main').style.display = 'none';
  }
});

// ─── Login logging ────────────────────────────────────
function parseUserAgent(ua) {
  let browser = 'Navegador', os = 'Dispositivo';
  if (/Edg/i.test(ua))             browser = 'Edge';
  else if (/Chrome/i.test(ua))     browser = 'Chrome';
  else if (/Firefox/i.test(ua))    browser = 'Firefox';
  else if (/Safari/i.test(ua))     browser = 'Safari';
  if (/iPhone|iPad/i.test(ua))     os = 'iOS';
  else if (/Android/i.test(ua))    os = 'Android';
  else if (/Mac OS X/i.test(ua))   os = 'macOS';
  else if (/Windows/i.test(ua))    os = 'Windows';
  else if (/Linux/i.test(ua))      os = 'Linux';
  return `${browser} · ${os}`;
}

async function logLogin(uid) {
  const device = parseUserAgent(navigator.userAgent);
  const ref = db.collection('login_logs').doc(uid);
  try {
    const snap = await ref.get();
    const prev = snap.exists ? (snap.data().entries || []) : [];
    const newEntry = { ts: new Date().toISOString(), device };
    const entries = [newEntry, ...prev].slice(0, 20);
    await ref.set({
      total: firebase.firestore.FieldValue.increment(1),
      last_login: firebase.firestore.FieldValue.serverTimestamp(),
      entries
    }, { merge: true });
  } catch(e) { console.warn('logLogin failed:', e); }
}

async function checkAllowed(uid) {
  try {
    const d = await db.collection('allowed_users').doc(uid).get();
    return d.exists;
  } catch(e) { return false; }
}

function lcErr(msg) {
  const e=document.getElementById('lc-err'); e.textContent=msg; e.style.display='block';
  document.getElementById('lc-ok').style.display='none';
}
function lcOk(msg) {
  const e=document.getElementById('lc-ok'); e.textContent=msg; e.style.display='block';
  document.getElementById('lc-err').style.display='none';
}

async function doLogin() {
  const email=document.getElementById('lc-email').value.trim();
  const pass=document.getElementById('lc-pass').value;
  const btn=document.getElementById('lc-btn');
  if(!email||!pass){lcErr('Preencha email e senha.');return;}
  btn.disabled=true; btn.textContent='Entrando...';
  document.getElementById('lc-err').style.display='none';
  document.getElementById('lc-ok').style.display='none';
  try {
    await auth.signInWithEmailAndPassword(email, pass);
  } catch(e) {
    const m={'auth/user-not-found':'Email não encontrado.','auth/wrong-password':'Senha incorreta.',
      'auth/invalid-credential':'Email ou senha incorretos.','auth/invalid-email':'Email inválido.',
      'auth/too-many-requests':'Muitas tentativas. Aguarde alguns minutos e tente novamente.'};
    lcErr(m[e.code]||'Erro: '+e.message);
    btn.disabled=false; btn.textContent='Entrar';
  }
}

async function doReset() {
  const email=document.getElementById('lc-email').value.trim();
  if(!email){lcErr('Digite seu email para recuperar a senha.');return;}
  try {
    await auth.sendPasswordResetEmail(email);
    lcOk('Email de recuperação enviado para '+email+'. Verifique sua caixa de entrada (e spam).');
  } catch(e) { lcErr('Erro: '+e.message); }
}

function doLogout() { if(confirm('Sair do dashboard?')) auth.signOut(); }

function openAdmin() {
  document.getElementById('admin-modal').classList.add('open');
  switchAmTab('users', document.querySelector('.am-tab'));
}
function closeAdmin() { document.getElementById('admin-modal').classList.remove('open'); }

function switchAmTab(tab, btn) {
  document.querySelectorAll('.am-tab').forEach(t=>t.classList.remove('active'));
  if(btn) btn.classList.add('active');
  document.getElementById('am-tab-users').style.display = tab==='users'?'':'none';
  document.getElementById('am-tab-add').style.display   = tab==='add'?'':'none';
  if(tab==='users') loadUsers();
  if(tab==='add') { document.getElementById('am-err').style.display='none'; document.getElementById('am-success').style.display='none'; }
}

function toggleStorageRules(){
  const b=document.getElementById('am-storage-rules-box');
  b.style.display=b.style.display==='none'?'block':'none';
}

function toggleRules() {
  const box = document.getElementById('am-rules-box');
  box.style.display = box.style.display==='block'?'none':'block';
}

const ROLE_LABELS = {admin:'Administrador', editor:'Editor', viewer:'Visualizador'};
const ROLE_CLASS  = {admin:'admin', editor:'editor', viewer:'viewer'};

async function loadUsers() {
  const list = document.getElementById('am-users-list');
  list.innerHTML = '<div class="am-empty">Carregando...</div>';
  const users = [];
  users.push({uid:'__admin__', email:ADMIN_EMAIL, name:'Marcos Paulo (você)', role:'admin', fixed:true});
  const knownEmails = new Set([ADMIN_EMAIL]);
  let firestoreOk = false;
  try {
    const snap = await db.collection('allowed_users').get();
    snap.forEach(doc => {
      const u = doc.data();
      if(!knownEmails.has(u.email)) {
        users.push({uid:doc.id, email:u.email, name:u.name||u.email, role:u.role||'viewer', modules:u.modules||'all', fixed:false});
        knownEmails.add(u.email);
      }
    });
    firestoreOk = true;
  } catch(e) {}
  ALLOWED_EMAILS.forEach(em => {
    if(!knownEmails.has(em)) {
      users.push({uid:'__email__'+em, email:em, name:em, role:'viewer', fixed:true, fromCode:true});
      knownEmails.add(em);
    }
  });
  if(users.length===0){ list.innerHTML='<div class="am-empty">Nenhum usuário com acesso.</div>'; return; }
  const MOD_LABELS = {all:'🔓 Tudo', health:'🧬 Saúde', finance:'💼 Finance'};
  let html = '';
  users.forEach(u => {
    const initial = (u.name||u.email||'?')[0].toUpperCase();
    const roleCls   = ROLE_CLASS[u.role]||'viewer';
    const roleLabel = ROLE_LABELS[u.role]||'Visualizador';
    const modVal    = u.modules || 'all';
    const isMe = u.email === currentUser?.email;
    html += `<div class="u-row">
      <div class="u-av role-${roleCls}">${initial}</div>
      <div class="u-info">
        <div class="u-name">${u.name||u.email}</div>
        <div class="u-email">${u.name!==u.email?u.email:''}</div>
      </div>
      <div class="u-badges">
        ${isMe ? '<span class="role-badge you">Você</span>' : ''}
        ${u.fromCode ? '<span class="role-badge you" title="Definido no código">Fixo</span>' : ''}
        ${firestoreOk&&!u.fixed ? `<select class="u-select-role" onchange="updateRole('${u.uid}',this.value)">
          <option value="viewer"${u.role==='viewer'?' selected':''}>👁️ Visualizador</option>
          <option value="editor"${u.role==='editor'?' selected':''}>✏️ Editor</option>
          <option value="admin"${u.role==='admin'?' selected':''}>⚙️ Admin</option>
        </select>` : `<span class="role-badge ${roleCls}">${roleLabel}</span>`}
        ${firestoreOk&&!u.fixed ? `<select class="u-select-modules" onchange="updateModules('${u.uid}',this.value)" title="Módulos acessíveis">
          <option value="all"${modVal==='all'?' selected':''}>🔓 Tudo</option>
          <option value="health"${modVal==='health'?' selected':''}>🧬 Saúde</option>
          <option value="finance"${modVal==='finance'?' selected':''}>💼 Finance</option>
        </select>` : `<span class="role-badge">${MOD_LABELS[modVal]||'🔓 Tudo'}</span>`}
      </div>
      <div class="u-actions">
        <button class="u-act-btn" onclick="toggleLoginHistory('${u.uid}',this)" title="Ver histórico de acessos">📋 Histórico</button>
        ${!isMe ? `<button class="u-act-btn" onclick="resendInvite('${u.email}',this)" title="Reenviar email de acesso">↺ Reenviar</button>` : ''}
        ${!isMe&&!u.fixed ? `<button class="u-act-btn danger" onclick="removeUser('${u.uid}','${u.email}')">Remover</button>` : ''}
      </div>
    </div>
    <div class="u-history" id="hist-${u.uid}" style="display:none"></div>`;
  });
  if(!firestoreOk) html += `<div style="margin-top:12px;padding:10px 12px;background:var(--amber-l);border:1px solid var(--amber-m);border-radius:8px;font-size:11px;color:var(--amber)">
    ⚠️ Atualize as regras do Firestore (ver abaixo) para salvar e gerenciar usuários dinamicamente.
  </div>`;
  list.innerHTML = html;
}

async function addUser() {
  const name    = document.getElementById('am-name').value.trim();
  const email   = document.getElementById('am-email').value.trim();
  const role    = document.querySelector('input[name="am-role"]:checked')?.value    || 'viewer';
  const modules = document.querySelector('input[name="am-modules"]:checked')?.value || 'all';
  const err   = document.getElementById('am-err');
  const succ  = document.getElementById('am-success');
  const btn   = document.getElementById('am-submit-btn');
  err.style.display='none'; succ.style.display='none';
  if(!email){err.textContent='Digite o email do usuário.';err.style.display='block';return;}
  if(!name) {err.textContent='Digite o nome do usuário.';err.style.display='block';return;}
  btn.disabled=true; btn.textContent='Criando conta...';
  try {
    const tempPass = 'Tmp_' + Math.random().toString(36).slice(2,10) + '!9';
    const sec = firebase.initializeApp(firebase.app().options, 'sec_'+Date.now());
    const cred = await sec.auth().createUserWithEmailAndPassword(email, tempPass);
    const uid = cred.user.uid;
    await sec.auth().signOut(); await sec.delete();
    try {
      await db.collection('allowed_users').doc(uid).set({
        email, name, role, modules, createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    } catch(fe) {}
    await auth.sendPasswordResetEmail(email);
    document.getElementById('am-name').value='';
    document.getElementById('am-email').value='';
    succ.innerHTML = `✓ Convite enviado para <strong>${email}</strong>!<br>O usuário receberá um email para definir a senha e acessar o dashboard.`;
    succ.style.display='block';
  } catch(e) {
    const msgs = {'auth/email-already-in-use':'Este email já tem uma conta — envie o link de redefinição de senha para o usuário.',
      'auth/invalid-email':'Email inválido.','auth/weak-password':'Senha muito fraca.'};
    err.textContent = msgs[e.code]||e.message; err.style.display='block';
  } finally {
    btn.disabled=false; btn.textContent='Criar conta e enviar convite por email →';
  }
}

async function updateRole(uid, newRole) {
  try {
    await db.collection('allowed_users').doc(uid).update({role: newRole});
  } catch(e) { alert('Erro ao atualizar função: '+e.message); }
}

async function updateModules(uid, modules) {
  try {
    await db.collection('allowed_users').doc(uid).update({modules});
  } catch(e) { alert('Erro ao atualizar acesso: '+e.message); }
}

async function toggleLoginHistory(uid, btn) {
  const el = document.getElementById('hist-' + uid);
  if (!el) return;
  if (el.style.display !== 'none') {
    el.style.display = 'none';
    btn.textContent = '📋 Histórico';
    return;
  }
  btn.textContent = '⏳ Carregando...';
  el.innerHTML = '';
  el.style.display = 'block';
  try {
    const snap = await db.collection('login_logs').doc(uid).get();
    if (!snap.exists || !snap.data().entries?.length) {
      el.innerHTML = '<div class="u-hist-empty">Nenhum acesso registrado ainda.</div>';
    } else {
      const { total, entries } = snap.data();
      el.innerHTML = `
        <div class="u-hist-head">${total} sess${total===1?'ão':'ões'} registradas · exibindo últimas ${entries.length}</div>
        <table class="u-hist-table">
          <thead><tr><th>#</th><th>Data / Hora</th><th>Dispositivo</th></tr></thead>
          <tbody>${entries.map((e, i) => `
            <tr>
              <td class="u-hist-num">${total - i}</td>
              <td>${new Date(e.ts).toLocaleString('pt-BR')}</td>
              <td>${e.device}</td>
            </tr>`).join('')}
          </tbody>
        </table>`;
    }
    btn.textContent = '▲ Fechar';
  } catch(err) {
    el.innerHTML = `<div class="u-hist-empty">Erro ao carregar: ${err.message}</div>`;
    btn.textContent = '📋 Histórico';
  }
}

async function removeUser(uid, email) {
  if(!confirm(`Remover acesso de ${email}?\n\nO usuário não poderá mais fazer login.`)) return;
  try {
    await db.collection('allowed_users').doc(uid).delete();
    loadUsers();
  } catch(e) { alert('Erro ao remover: '+e.message); }
}

async function resendInvite(email, btn) {
  const orig = btn.textContent;
  btn.disabled = true; btn.textContent = 'Enviando...';
  try {
    await auth.sendPasswordResetEmail(email);
    btn.textContent = '✓ Enviado!';
    btn.style.color = 'var(--green)';
    btn.style.borderColor = 'var(--green)';
    setTimeout(() => { btn.textContent=orig; btn.style.color=''; btn.style.borderColor=''; btn.disabled=false; }, 3000);
  } catch(e) {
    btn.textContent = 'Erro';
    btn.style.color = 'var(--red)';
    setTimeout(() => { btn.textContent=orig; btn.style.color=''; btn.disabled=false; }, 3000);
  }
}
