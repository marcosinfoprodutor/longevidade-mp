// ═══════════════════════════════════════════════════════
// FIREBASE INIT
// ═══════════════════════════════════════════════════════
firebase.initializeApp({
  apiKey:"AIzaSyBwqg8f9-fo9iQK18zfpBcq7SYi029LZvA",
  authDomain:"longevidade-mp.firebaseapp.com",
  projectId:"longevidade-mp",
  storageBucket:"longevidade-mp.firebasestorage.app",
  messagingSenderId:"587700286166",
  appId:"1:587700286166:web:451d0671ec7de0c6b5cf77"
});
const auth    = firebase.auth();
const db      = firebase.firestore();
const storage = firebase.storage();

// ═══════════════════════════════════════════════════════
// ACCESS CONTROL CONSTANTS
// ═══════════════════════════════════════════════════════
const ADMIN_EMAIL = 'marcosinfoprodutor@gmail.com';
const ALLOWED_EMAILS = [
  'marcosinfoprodutor@gmail.com',  // Admin — Marcos Paulo
  'ycarocouto@gmail.com',          // Dr. Ycaro Couto
];
let currentUser = null;
let isAdmin = false;
let currentUserRole    = 'viewer'; // 'admin' | 'editor' | 'viewer'
let currentUserModules = 'all';    // 'all' | 'health' | 'finance'
let dashInited = false;

// ═══════════════════════════════════════════════════════
// BIOMARKER DEFINITIONS
// ═══════════════════════════════════════════════════════
const DEFS = {
  glicose:      {name:"Glicose",             unit:"mg/dL",  cat:"metabolismo",    rMin:70,  rMax:99,  oMin:72,  oMax:90 },
  hba1c:        {name:"HbA1c",               unit:"%",      cat:"metabolismo",    rMin:0,   rMax:5.7, oMin:0,   oMax:5.4},
  insulina:     {name:"Insulina (jejum)",     unit:"µUI/mL", cat:"metabolismo",    rMin:2,   rMax:25,  oMin:2,   oMax:9  },
  creatinina:   {name:"Creatinina",          unit:"mg/dL",  cat:"metabolismo",    rMin:0.7, rMax:1.3, oMin:0.8, oMax:1.2},
  ureia:        {name:"Ureia",               unit:"mg/dL",  cat:"metabolismo",    rMin:13,  rMax:43                     },
  ggt:          {name:"GGT",                 unit:"U/L",    cat:"metabolismo",    rMin:0,   rMax:55,  oMin:0,   oMax:25 },
  alt:          {name:"ALT (TGP)",           unit:"U/L",    cat:"metabolismo",    rMin:0,   rMax:45,  oMin:0,   oMax:25 },
  ast:          {name:"AST (TGO)",           unit:"U/L",    cat:"metabolismo",    rMin:0,   rMax:40,  oMin:0,   oMax:25 },
  albumina:     {name:"Albumina",            unit:"g/dL",   cat:"metabolismo",    rMin:3.5, rMax:5.2, oMin:4.3, oMax:5.0},
  pcr:          {name:"PCR Ultrassensível",  unit:"mg/L",   cat:"inflamacao",     rMin:0,   rMax:3.0, oMin:0,   oMax:0.5},
  ferritina:    {name:"Ferritina",           unit:"ng/mL",  cat:"inflamacao",     rMin:30,  rMax:300, oMin:50,  oMax:150},
  ferro:        {name:"Ferro Sérico",        unit:"µg/dL",  cat:"inflamacao",     rMin:65,  rMax:175, oMin:80,  oMax:150},
  sat_transf:   {name:"Sat. Transferrina",   unit:"%",      cat:"inflamacao",     rMin:20,  rMax:50,  oMin:25,  oMax:40 },
  col_total:    {name:"Colesterol Total",    unit:"mg/dL",  cat:"cardiovascular", rMin:0,   rMax:200, oMin:0,   oMax:180},
  hdl:          {name:"HDL",                 unit:"mg/dL",  cat:"cardiovascular", rMin:40,  rMax:999, oMin:60,  oMax:999},
  ldl:          {name:"LDL",                 unit:"mg/dL",  cat:"cardiovascular", rMin:0,   rMax:130, oMin:0,   oMax:100},
  test_total:   {name:"Testosterona Total",  unit:"ng/dL",  cat:"hormonios",      rMin:249, rMax:836, oMin:550, oMax:900},
  shbg:         {name:"SHBG",               unit:"nmol/L", cat:"hormonios",      rMin:16.5,rMax:55.9,oMin:20,  oMax:45 },
  tsh:          {name:"TSH",                unit:"µUI/mL", cat:"hormonios",      rMin:0.4, rMax:4.0, oMin:1.0, oMax:2.5},
  vitD:         {name:"Vitamina D",         unit:"ng/mL",  cat:"vitaminas",      rMin:20,  rMax:100, oMin:40,  oMax:80 },
  vitB12:       {name:"Vitamina B12",       unit:"pg/mL",  cat:"vitaminas",      rMin:197, rMax:771, oMin:400, oMax:700},
  acido_folico: {name:"Ácido Fólico",       unit:"ng/mL",  cat:"vitaminas",      rMin:3.9, rMax:999, oMin:10,  oMax:25 },
  zinco:        {name:"Zinco",              unit:"µg/L",   cat:"vitaminas",      rMin:600, rMax:1200,oMin:800, oMax:1100},
  selenio:      {name:"Selênio",            unit:"µg/L",   cat:"vitaminas",      rMin:63,  rMax:160, oMin:100, oMax:140},
  vitA:         {name:"Vitamina A",         unit:"mg/L",   cat:"vitaminas",      rMin:0.3, rMax:0.7, oMin:0.3, oMax:0.6},
  vitE:         {name:"Vitamina E",         unit:"mg/L",   cat:"vitaminas",      rMin:5.0, rMax:20.0,oMin:12,  oMax:18 },
  hemoglobina:  {name:"Hemoglobina",        unit:"g/dL",   cat:"hematologia",    rMin:13.5,rMax:17.5,oMin:14.5,oMax:16.5},
  hematocrito:  {name:"Hematócrito",        unit:"%",      cat:"hematologia",    rMin:39,  rMax:50,  oMin:42,  oMax:48 },
  leucocitos:   {name:"Leucócitos",         unit:"×10³/µL",cat:"hematologia",    rMin:3.5, rMax:10.5,oMin:4.0, oMax:8.0},
  plaquetas:    {name:"Plaquetas",          unit:"×10³/µL",cat:"hematologia",    rMin:150, rMax:450, oMin:180, oMax:350},
  rdw:          {name:"RDW",               unit:"%",      cat:"hematologia",    rMin:11.5,rMax:16.5,oMin:11.5,oMax:13.5},
  potassio:     {name:"Potássio",           unit:"mEq/L",  cat:"eletrólitos",    rMin:3.5, rMax:5.1, oMin:4.0, oMax:4.7},
  sodio:        {name:"Sódio",             unit:"mEq/L",  cat:"eletrólitos",    rMin:136, rMax:145, oMin:138, oMax:143},
  calcio_ion:   {name:"Cálcio Ionizado",   unit:"mmol/L", cat:"eletrólitos",    rMin:1.14,rMax:1.31,oMin:1.16,oMax:1.28},
  ck:           {name:"CK (Creatina Quinase)",unit:"U/L", cat:"músculo",        rMin:35,  rMax:232, oMin:50,  oMax:400},
};

const CAT_META = {
  metabolismo:    {label:"Metabolismo",          icon:"🔬"},
  inflamacao:     {label:"Inflamação",            icon:"🔥"},
  cardiovascular: {label:"Cardiovascular",        icon:"❤️"},
  hormonios:      {label:"Hormônios",             icon:"⚡"},
  vitaminas:      {label:"Vitaminas & Minerais",  icon:"💊"},
  hematologia:    {label:"Hematologia",           icon:"🩸"},
  "eletrólitos":  {label:"Eletrólitos",           icon:"⚗️"},
  "músculo":      {label:"Músculo",               icon:"💪"},
};
const CAT_ORDER = ["metabolismo","inflamacao","cardiovascular","hormonios","vitaminas","hematologia","eletrólitos","músculo"];

// ═══════════════════════════════════════════════════════
// VACCINE DEFINITIONS
// ═══════════════════════════════════════════════════════
const VACCINES = [
  {id:'influenza',    name:'Influenza (Gripe)',                  freq:'Anual · Campanha out–nov · ⚠️ Última dose 2019 — desatualizada', priority:'rec',    age:0},
  {id:'covid',        name:'COVID-19',                           freq:'Dose de reforço anual recomendada',                             priority:'rec',    age:0},
  {id:'hepB',         name:'Hepatite B',                         freq:'3 doses (0, 1, 6 meses) — série completa ✓',                   priority:'must',   age:0},
  {id:'hepA',         name:'Hepatite A',                         freq:'2 doses (0, 6–12 meses)',                                      priority:'must',   age:0},
  {id:'mmr',          name:'Tríplice Viral (SCR)',                freq:'2 doses — série completa ✓',                                   priority:'must',   age:0},
  {id:'dtpa',         name:'dTpa — Difteria/Tétano/Coqueluche', freq:'Reforço a cada 10 anos · ⚠️ Possui dT (Dupla), mas não dTpa', priority:'must',   age:0},
  {id:'varicela',     name:'Varicela (Catapora)',                freq:'2 doses se sem histórico de doença',                           priority:'must',   age:0},
  {id:'hpv',          name:'HPV (Gardasil 9)',                   freq:'3 doses — série completa ✓ (jul/19–jan/20)',                   priority:'rec',    age:0},
  {id:'febreAmarela', name:'Febre Amarela',                      freq:'Dose única vitalícia ✓',                                       priority:'must',   age:0},
  {id:'pneumo',       name:'Pneumocócica (PCV13/PCV20)',         freq:'1 dose tomada (PCV13) · reforço PCV20 recomendado',            priority:'rec',    age:0},
  {id:'meningo',      name:'Meningocócica ACWY',                 freq:'1–2 doses',                                                    priority:'rec',    age:0},
  {id:'dengue',       name:'Dengue (Qdenga)',                    freq:'2 doses · intervalo de 3 meses',                               priority:'rec',    age:0},
  {id:'zoster',       name:'Herpes Zóster (Shingrix)',           freq:'2 doses · a partir dos 50 anos',                              priority:'future', age:50},
  {id:'rsv',          name:'RSV (Abrysvo)',                      freq:'1 dose · a partir dos 60 anos',                               priority:'future', age:60},
];

const BIRTH_YEAR = 1997; // 30/04/1997
const CHRON_AGE = 28;
