/**
 * Modulo Extra Jobs v1.11.0 - Foundry VTT v13 (ApplicationV2)
 */

// Elenco Abilità D&D 5e
const DND5E_SKILLS = {
  acro: "Acrobazia",
  anim: "Addestrare Animali",
  arca: "Arcana",
  athl: "Atletica",
  dece: "Inganno",
  hist: "Storia",
  insi: "Intuizione",
  inti: "Intimidire",
  inve: "Indagare",
  medi: "Medicina",
  natu: "Natura",
  perc: "Percezione",
  perf: "Intrattenere",
  pers: "Persuasione",
  reli: "Religione",
  slei: "Rapidità di Mano",
  stea: "Furtività",
  surv: "Sopravvivenza"
};

const DND5E_ABILITIES = {
  str: "Forza (FOR)",
  dex: "Destrezza (DES)",
  con: "Costituzione (COS)",
  int: "Intelligenza (INT)",
  wis: "Saggezza (SAG)",
  cha: "Carisma (CAR)"
};

// Soglie EXP e Prestigio di Default per Mestieri Normali (Livelli 1-10)
const DEFAULT_NORMAL_THRESHOLDS = {
  1: { expReq: 0, prestigeReq: 0 },
  2: { expReq: 100, prestigeReq: 0 },
  3: { expReq: 300, prestigeReq: 0 },
  4: { expReq: 600, prestigeReq: 5 },
  5: { expReq: 800, prestigeReq: 0 },
  6: { expReq: 1000, prestigeReq: 0 },
  7: { expReq: 1500, prestigeReq: 10 },
  8: { expReq: 2000, prestigeReq: 0 },
  9: { expReq: 3000, prestigeReq: 0 },
  10: { expReq: 6000, prestigeReq: 50 }
};

// Soglie Prestigio di Default per Job Speciali (Livelli 1-5)
const DEFAULT_SPECIAL_THRESHOLDS = {
  1: { prestigeReq: 0 },
  2: { prestigeReq: 20 },
  3: { prestigeReq: 40 },
  4: { prestigeReq: 80 },
  5: { prestigeReq: 160 }
};

// Configurazione Iniziale Mestieri
const DEFAULT_EXTRA_JOBS_CONFIG = {
  // ================================================================
  // JOB PRINCIPALI - Livelli 1-10, EXP + Prestigio
  // ================================================================
  fabbro: {
    id: "fabbro",
    name: "Fabbro",
    icon: "fa-hammer",
    color: "#f59e0b",
    desc: "Forgia armi, armature e metalli preziosi.",
    progressionType: "exp_prestige",
    specialJob: false,
    masterJob: false,
    maxLevel: 10,
    unlockText: "Richiede 10 Forza e 12 Costituzione.",
    specUnlockLevel: 7,
    levelRequirements: {
      1: { stats: { str: 10, con: 12 }, proficiencies: [] },
      4: { stats: { str: 13, con: 15 }, proficiencies: [] },
      7: { stats: { str: 15, con: 16 }, proficiencies: [{ type: "save", key: "str", label: "TS Forza" }, { type: "save", key: "con", label: "TS Costituzione" }] },
      10: { stats: {}, proficiencies: [], requiredSpecialization: "chimico_metallurgico" }
    }
  },
  alchimista: {
    id: "alchimista",
    name: "Alchimista",
    icon: "fa-flask-vial",
    color: "#38bdf8",
    desc: "Mixa pozioni, reagenti ed elisir arcani.",
    progressionType: "exp_prestige",
    specialJob: false,
    masterJob: false,
    maxLevel: 10,
    unlockText: "Richiede 12 Intelligenza, 10 Saggezza e Arcana.",
    specUnlockLevel: 7,
    levelRequirements: {
      1: { stats: { int: 12, wis: 10 }, proficiencies: [{ type: "skill", key: "arca", label: "Arcana" }] },
      4: { stats: { int: 14, wis: 12 }, proficiencies: [] },
      7: { stats: { int: 16, wis: 14 }, proficiencies: [{ type: "skill", key: "hist", label: "Storia" }, { type: "skill", key: "natu", label: "Natura" }] },
      10: { stats: {}, proficiencies: [], requiredSpecialization: "chimico_metallurgico" }
    }
  },
  gemmologo: {
    id: "gemmologo",
    name: "Gemmologo",
    icon: "fa-gem",
    color: "#a855f7",
    desc: "Studio, taglio e lavorazione delle gemme e pietre preziose.",
    progressionType: "exp_prestige",
    specialJob: false,
    masterJob: false,
    maxLevel: 10,
    unlockText: "Richiede 10 Intelligenza.",
    specUnlockLevel: 7,
    levelRequirements: {
      1: { stats: { int: 10 }, proficiencies: [] },
      10: { stats: {}, proficiencies: [], requiredSpecialization: "forgiacristalli" }
    }
  },
  erudito: {
    id: "erudito",
    name: "Erudito",
    icon: "fa-book-open-reader",
    color: "#60a5fa",
    desc: "Studioso delle arti, delle scienze e delle conoscenze perdute.",
    progressionType: "exp_prestige",
    specialJob: false,
    masterJob: false,
    maxLevel: 10,
    unlockText: "Richiede 12 Intelligenza e competenza in Storia.",
    specUnlockLevel: 7,
    levelRequirements: {
      1: { stats: { int: 12 }, proficiencies: [{ type: "skill", key: "hist", label: "Storia" }] },
      10: { stats: {}, proficiencies: [], requiredSpecialization: "pansofista" }
    }
  },
  medico: {
    id: "medico",
    name: "Medico",
    icon: "fa-kit-medical",
    color: "#34d399",
    desc: "Diagnosi, cura, chirurgia e trattamento delle ferite.",
    progressionType: "exp_prestige",
    specialJob: false,
    masterJob: false,
    maxLevel: 10,
    unlockText: "Richiede 12 Saggezza e competenza in Medicina.",
    specUnlockLevel: 7,
    levelRequirements: {
      1: { stats: { wis: 12 }, proficiencies: [{ type: "skill", key: "medi", label: "Medicina" }] },
      10: { stats: {}, proficiencies: [], requiredSpecialization: "archiatra" }
    }
  },
  diplomatico: {
    id: "diplomatico",
    name: "Diplomatico",
    icon: "fa-handshake",
    color: "#fbbf24",
    desc: "Negozia accordi, media conflitti e padroneggia il protocollo.",
    progressionType: "exp_prestige",
    specialJob: false,
    masterJob: false,
    maxLevel: 10,
    unlockText: "Richiede 12 Carisma e competenza in Persuasione.",
    specUnlockLevel: 7,
    levelRequirements: {
      1: { stats: { cha: 12 }, proficiencies: [{ type: "skill", key: "pers", label: "Persuasione" }] },
      10: { stats: {}, proficiencies: [], requiredSpecialization: "pansofista" }
    }
  },
  sarto: {
    id: "sarto",
    name: "Sarto",
    icon: "fa-scissors",
    color: "#fb7185",
    desc: "Lavorazione di tessuti, stoffe, abiti e cuciture alchemiche.",
    progressionType: "exp_prestige",
    specialJob: false,
    masterJob: false,
    maxLevel: 10,
    unlockText: "Richiede 10 Destrezza.",
    specUnlockLevel: 7,
    levelRequirements: {
      1: { stats: { dex: 10 }, proficiencies: [] }
    }
  },
  pellettiere: {
    id: "pellettiere",
    name: "Pellettiere",
    icon: "fa-cow",
    color: "#c08457",
    desc: "Concia e lavora pelli, cuoio e materiali organici resistenti.",
    progressionType: "exp_prestige",
    specialJob: false,
    masterJob: false,
    maxLevel: 10,
    unlockText: "Richiede 10 Destrezza e competenza in Sopravvivenza.",
    specUnlockLevel: 7,
    levelRequirements: {
      1: { stats: { dex: 10 }, proficiencies: [{ type: "skill", key: "surv", label: "Sopravvivenza" }] },
      10: { stats: {}, proficiencies: [], requiredSpecialization: "cuoco" }
    }
  },

  // ================================================================
  // JOB SPECIALI - Livelli 1-5, solo Prestigio
  // ================================================================
  chimico_metallurgico: {
    id: "chimico_metallurgico",
    name: "Chimico Metallurgico",
    icon: "fa-flask-vial",
    color: "#06b6d4",
    desc: "Job speciale: unisce alchimia e metallurgia. Sale solo con Punti Prestigio.",
    progressionType: "prestige_only",
    specialJob: true,
    masterJob: false,
    baseUnlocked: false,
    maxLevel: 5,
    requiredJobs: { alchimista: 7, fabbro: 7 },
    unlockText: "Sbloccato da Alchimista 7 + Fabbro 7",
    levelRequirements: {}
  },
  forgiacristalli: {
    id: "forgiacristalli",
    name: "Forgiacristalli",
    icon: "fa-gem",
    color: "#22c55e",
    desc: "Job speciale: forgiatura incantata di cristalli e gemme. Sale solo con Punti Prestigio.",
    progressionType: "prestige_only",
    specialJob: true,
    masterJob: false,
    baseUnlocked: false,
    maxLevel: 5,
    requiredJobs: { fabbro: 7, gemmologo: 7 },
    unlockText: "Sbloccato da Fabbro 7 + Gemmologo 7",
    levelRequirements: {}
  },
  cuoco: {
    id: "cuoco",
    name: "Cuoco",
    icon: "fa-utensils",
    color: "#f97316",
    desc: "Job speciale dedicato alla trasformazione di ingredienti, preparazioni e ricette complesse.",
    progressionType: "prestige_only",
    specialJob: true,
    masterJob: false,
    baseUnlocked: false,
    maxLevel: 5,
    requiredJobs: { alchimista: 7, pellettiere: 7 },
    unlockText: "Sbloccato da Alchimista 7 + Pellettiere 7",
    levelRequirements: {}
  },
  pansofista: {
    id: "pansofista",
    name: "Pansofista",
    icon: "fa-brain",
    color: "#818cf8",
    desc: "Job speciale: sintesi superiore di sapere, retorica e comprensione interdisciplinare.",
    progressionType: "prestige_only",
    specialJob: true,
    masterJob: false,
    baseUnlocked: false,
    maxLevel: 5,
    requiredJobs: { erudito: 7, diplomatico: 7 },
    unlockText: "Sbloccato da Erudito 7 + Diplomatico 7",
    levelRequirements: {}
  },
  archiatra: {
    id: "archiatra",
    name: "Archiatra",
    icon: "fa-staff-snake",
    color: "#10b981",
    desc: "Job speciale: medicina d'eccellenza, chirurgia avanzata e dottrina clinica.",
    progressionType: "prestige_only",
    specialJob: true,
    masterJob: false,
    baseUnlocked: false,
    maxLevel: 5,
    requiredJobs: { medico: 7, erudito: 7 },
    unlockText: "Sbloccato da Medico 7 + Erudito 7",
    levelRequirements: {}
  },
  chimico_biomedico: {
    id: "chimico_biomedico",
    name: "Chimico Biomedico",
    icon: "fa-dna",
    color: "#2dd4bf",
    desc: "Job speciale: unisce chimica, medicina e ricerca sui processi biologici.",
    progressionType: "prestige_only",
    specialJob: true,
    masterJob: false,
    baseUnlocked: false,
    maxLevel: 5,
    requiredJobs: { alchimista: 7, medico: 7 },
    unlockText: "Sbloccato da Alchimista 7 + Medico 7",
    levelRequirements: {}
  },
  mercante: {
    id: "mercante",
    name: "Mercante",
    icon: "fa-coins",
    color: "#eab308",
    desc: "Job speciale: commercio, valutazione, negoziazione e gestione di beni rari. Sale solo con Punti Prestigio.",
    progressionType: "prestige_only",
    specialJob: true,
    masterJob: false,
    baseUnlocked: false,
    maxLevel: 5,
    requiredJobs: { diplomatico: 7 },
    unlockText: "Sbloccato da Diplomatico 7 (requisiti modificabili nelle impostazioni)",
    levelRequirements: {}
  },

  // ================================================================
  // MASTER JOB - Stessa progressione dei Job Speciali: 5 stelle, solo Prestigio.
  // Interfaccia rossa, massimo 3 per personaggio, richiede "Attestato da master".
  // ================================================================
  forgia_rune: {
    id: "forgia_rune", name: "Forgia Rune", icon: "fa-hammer", color: "#ef4444",
    desc: "Master Job: incide, stabilizza e fonde rune direttamente nei materiali lavorati.", progressionType: "prestige_only", specialJob: false, masterJob: true,
    maxLevel: 5, requiredSpecialJobs: {}, requiredSpecialMode: "any", unlockText: "Richiede Attestato da master, un Job Speciale collegato a 5 stelle e uno slot Master libero.", levelRequirements: {}
  },
  tecnomante: {
    id: "tecnomante", name: "Tecnomante", icon: "fa-microchip", color: "#dc2626",
    desc: "Master Job: integra tecnologia, circuiti e flussi arcani in sistemi complessi.", progressionType: "prestige_only", specialJob: false, masterJob: true,
    maxLevel: 5, requiredSpecialJobs: {}, requiredSpecialMode: "any", unlockText: "Richiede Attestato da master, un Job Speciale collegato a 5 stelle e uno slot Master libero.", levelRequirements: {}
  },
  archivista_della_genesi: {
    id: "archivista_della_genesi", name: "Archivista della Genesi", icon: "fa-book-skull", color: "#dc2626",
    desc: "Master Job: custodisce, ricostruisce e interpreta le origini della conoscenza.", progressionType: "prestige_only", specialJob: false, masterJob: true,
    maxLevel: 5, requiredSpecialJobs: {}, requiredSpecialMode: "any", unlockText: "Richiede Attestato da master, un Job Speciale collegato a 5 stelle e uno slot Master libero.", levelRequirements: {}
  },
  cronomante_della_materia: {
    id: "cronomante_della_materia", name: "Cronomante della Materia", icon: "fa-hourglass-half", color: "#b91c1c",
    desc: "Master Job: studia e manipola il rapporto tra tempo, struttura e materia.", progressionType: "prestige_only", specialJob: false, masterJob: true,
    maxLevel: 5, requiredSpecialJobs: {}, requiredSpecialMode: "any", unlockText: "Richiede Attestato da master, un Job Speciale collegato a 5 stelle e uno slot Master libero.", levelRequirements: {}
  },
  tossicologo: {
    id: "tossicologo", name: "Tossicologo", icon: "fa-skull-crossbones", color: "#f43f5e",
    desc: "Master Job: studio, raffinazione e controllo di tossine e antidoti.", progressionType: "prestige_only", specialJob: false, masterJob: true,
    maxLevel: 5, requiredSpecialJobs: {}, requiredSpecialMode: "any", unlockText: "Richiede Attestato da master, un Job Speciale collegato a 5 stelle e uno slot Master libero.", levelRequirements: {}
  },
  patologo: {
    id: "patologo", name: "Patologo", icon: "fa-lungs", color: "#fb7185",
    desc: "Master Job: analizza alterazioni, malattie e anomalie dei tessuti viventi.", progressionType: "prestige_only", specialJob: false, masterJob: true,
    maxLevel: 5, requiredSpecialJobs: {}, requiredSpecialMode: "any", unlockText: "Richiede Attestato da master, un Job Speciale collegato a 5 stelle e uno slot Master libero.", levelRequirements: {}
  },
  estrattore_di_purezza: {
    id: "estrattore_di_purezza", name: "Estrattore di Purezza", icon: "fa-filter-circle-dollar", color: "#e11d48",
    desc: "Master Job: separa impurità e isola componenti di estrema purezza.", progressionType: "prestige_only", specialJob: false, masterJob: true,
    maxLevel: 5, requiredSpecialJobs: {}, requiredSpecialMode: "any", unlockText: "Richiede Attestato da master, un Job Speciale collegato a 5 stelle e uno slot Master libero.", levelRequirements: {}
  },
  maestor_delle_leghe_sintetiche: {
    id: "maestor_delle_leghe_sintetiche", name: "Maestor delle Leghe Sintetiche", icon: "fa-atom", color: "#be123c",
    desc: "Master Job: progetta leghe artificiali e materiali compositi fuori standard.", progressionType: "prestige_only", specialJob: false, masterJob: true,
    maxLevel: 5, requiredSpecialJobs: {}, requiredSpecialMode: "any", unlockText: "Richiede Attestato da master, un Job Speciale collegato a 5 stelle e uno slot Master libero.", levelRequirements: {}
  },
  vettori_arcani: {
    id: "vettori_arcani", name: "Vettori Arcani", icon: "fa-bolt", color: "#f87171",
    desc: "Master Job: canalizza, stabilizza e trasferisce flussi di energia arcana.", progressionType: "prestige_only", specialJob: false, masterJob: true,
    maxLevel: 5, requiredSpecialJobs: {}, requiredSpecialMode: "any", unlockText: "Richiede Attestato da master, un Job Speciale collegato a 5 stelle e uno slot Master libero.", levelRequirements: {}
  },
  ingegnere_dei_mutageni: {
    id: "ingegnere_dei_mutageni", name: "Ingegnere dei Mutageni", icon: "fa-vial-circle-check", color: "#991b1b",
    desc: "Master Job: progetta mutageni e processi di trasformazione biologica controllata.", progressionType: "prestige_only", specialJob: false, masterJob: true,
    maxLevel: 5, requiredSpecialJobs: {}, requiredSpecialMode: "any", unlockText: "Richiede Attestato da master, un Job Speciale collegato a 5 stelle e uno slot Master libero.", levelRequirements: {}
  }
};

function getJobsConfig() {
  try {
    const saved = game.settings.get("extra-jobs", "jobsConfigJson");
    const merged = foundry.utils.mergeObject(foundry.utils.deepClone(DEFAULT_EXTRA_JOBS_CONFIG), saved || {});

    // V9: il vecchio Master Job combinato non deve più comparire.
    delete merged.forgia_rune_tecnomante;

    // I Master Job usano la stessa progressione dei Job Speciali: 5 stelle, solo Prestigio.
    // Lo forziamo anche sui mondi che hanno già salvato la configurazione V8.
    for (const cfg of Object.values(merged)) {
      if (!cfg?.masterJob) continue;
      cfg.specialJob = false;
      cfg.progressionType = "prestige_only";
      cfg.maxLevel = 5;
      cfg.levelRequirements = cfg.levelRequirements || {};
      cfg.requiredSpecialJobs = cfg.requiredSpecialJobs || {};
      cfg.requiredSpecialMode = cfg.requiredSpecialMode === "all" ? "all" : "any";
    }
    return merged;
  } catch (e) {
    const fallback = foundry.utils.deepClone(DEFAULT_EXTRA_JOBS_CONFIG);
    delete fallback.forgia_rune_tecnomante;
    return fallback;
  }
}

// Esposto al modulo crafting: consente di applicare il layout speciale senza duplicare la configurazione.
window.extraJobsIsSpecialJob = function(jobKey) {
  try {
    const cfg = getJobsConfig()?.[jobKey];
    return !!(cfg && (cfg.specialJob || cfg.progressionType === "prestige_only"));
  } catch (_) {
    return false;
  }
};


function isMasterJobConfig(jobCfg) {
  return !!(jobCfg && jobCfg.masterJob === true);
}

window.extraJobsIsMasterJob = function(jobKey) {
  try {
    return isMasterJobConfig(getJobsConfig()?.[jobKey]);
  } catch (_) {
    return false;
  }
};

function actorHasMasterCertificate(actor) {
  if (!actor?.items) return false;
  return Array.from(actor.items).some(item => {
    const name = String(item?.name || "").trim().toLowerCase();
    const qty = Number(item?.system?.quantity ?? 1);
    return name === "attestato da master" && qty > 0;
  });
}

async function checkMasterSpecialRequirements(actor, masterCfg) {
  if (!masterCfg?.masterJob) return { ok: true, errors: [], matched: [], required: [] };

  const jobsConfig = getJobsConfig();
  const required = Object.entries(masterCfg.requiredSpecialJobs || {})
    .filter(([key, stars]) => jobsConfig[key]?.specialJob && Number(stars || 5) > 0)
    .map(([key]) => key);

  if (!required.length) {
    return {
      ok: false,
      errors: ["Nessun Job Speciale a 5 stelle configurato per questo Master Job"],
      matched: [],
      required: []
    };
  }

  const matched = [];
  const missing = [];
  for (const key of required) {
    const stats = (await actor.getFlag("world", `craftingStats_${key}`)) || { level: 1 };
    if (Number(stats.level || 1) >= 5) matched.push(key);
    else missing.push(key);
  }

  const mode = masterCfg.requiredSpecialMode === "all" ? "all" : "any";
  const ok = mode === "all" ? missing.length === 0 : matched.length > 0;
  if (ok) return { ok: true, errors: [], matched, required };

  const label = (key) => jobsConfig[key]?.name || key;
  const errors = mode === "all"
    ? [`Servono 5★ in tutti i Job Speciali richiesti: ${missing.map(label).join(", ")}`]
    : [`Serve almeno un Job Speciale a 5★ tra: ${required.map(label).join(", ")}`];

  return { ok: false, errors, matched, required };
}

async function removeMasterJobForActor(actor, jobKey, { resetStats = true } = {}) {
  if (!actor || !jobKey) return { ok: false, reason: "Dati Master Job non validi." };
  const selected = await getSelectedMasterJobs(actor);
  if (!selected.includes(jobKey)) return { ok: false, reason: "Questo Master Job non è assegnato al personaggio." };

  const next = selected.filter(k => k !== jobKey);
  await actor.setFlag("world", "craftingMasterJobs", next);

  const stats = (await actor.getFlag("world", `craftingStats_${jobKey}`)) || { level: 1, exp: 0, prestige: 0 };
  stats.masterUnlocked = false;
  if (resetStats) {
    stats.level = 1;
    stats.exp = 0;
    stats.prestige = 0;
  }
  await actor.setFlag("world", `craftingStats_${jobKey}`, stats);

  return { ok: true, selected: next, refunded: 1, available: 3 - next.length };
}

async function resetMasterJobsForActor(actor) {
  if (!actor) return { ok: false, reason: "Personaggio non valido." };
  const selected = await getSelectedMasterJobs(actor);
  for (const key of selected) {
    const stats = (await actor.getFlag("world", `craftingStats_${key}`)) || { level: 1, exp: 0, prestige: 0 };
    stats.masterUnlocked = false;
    stats.level = 1;
    stats.exp = 0;
    stats.prestige = 0;
    await actor.setFlag("world", `craftingStats_${key}`, stats);
  }
  await actor.setFlag("world", "craftingMasterJobs", []);
  return { ok: true, refunded: selected.length, selected: [], available: 3 };
}

async function getSelectedMasterJobs(actor) {
  const raw = (await actor?.getFlag?.("world", "craftingMasterJobs")) || [];
  const list = Array.isArray(raw) ? raw : Object.entries(raw).filter(([, v]) => !!v).map(([k]) => k);
  const jobsConfig = getJobsConfig();
  return [...new Set(list.map(String))]
    .filter(key => key !== "forgia_rune_tecnomante" && isMasterJobConfig(jobsConfig?.[key]))
    .slice(0, 3);
}

async function selectMasterJobForActor(actor, jobKey) {
  if (!actor || !jobKey) return { ok: false, reason: "Dati Master Job non validi." };
  if (!actorHasMasterCertificate(actor)) return { ok: false, reason: 'Serve l’oggetto "Attestato da master" nell’inventario.' };

  const cfg = getJobsConfig()?.[jobKey];
  if (!isMasterJobConfig(cfg)) return { ok: false, reason: "Il job selezionato non è un Master Job." };

  const specialCheck = await checkMasterSpecialRequirements(actor, cfg);
  if (!specialCheck.ok) return { ok: false, reason: specialCheck.errors.join(" • ") };

  const selected = await getSelectedMasterJobs(actor);
  if (selected.includes(jobKey)) return { ok: true, selected };
  if (selected.length >= 3) return { ok: false, reason: "Hai già raggiunto il limite di 3 Master Job." };

  selected.push(jobKey);
  await actor.setFlag("world", "craftingMasterJobs", selected);

  const stats = (await actor.getFlag("world", `craftingStats_${jobKey}`)) || { level: 1, exp: 0, prestige: 0 };
  stats.masterUnlocked = true;
  stats.level = Math.clamp(Number(stats.level || 1), 1, 5);
  stats.exp = 0;
  stats.prestige = Math.max(0, Number(stats.prestige || 0));
  await actor.setFlag("world", `craftingStats_${jobKey}`, stats);

  return { ok: true, selected };
}

async function saveJobsConfig(config) {
  await game.settings.set("extra-jobs", "jobsConfigJson", config);
}

function getThresholdsConfig() {
  try {
    const normal = game.settings.get("extra-jobs", "normalThresholdsJson") || DEFAULT_NORMAL_THRESHOLDS;
    const special = game.settings.get("extra-jobs", "specialThresholdsJson") || DEFAULT_SPECIAL_THRESHOLDS;
    return { normal, special };
  } catch (e) {
    return { normal: DEFAULT_NORMAL_THRESHOLDS, special: DEFAULT_SPECIAL_THRESHOLDS };
  }
}

async function saveThresholdsConfig(normal, special) {
  await game.settings.set("extra-jobs", "normalThresholdsJson", normal);
  await game.settings.set("extra-jobs", "specialThresholdsJson", special);
}

function injectExtraJobsCSS() {
  if (document.getElementById("extra-jobs-v13-css")) return;
  const style = document.createElement("style");
  style.id = "extra-jobs-v13-css";
  style.textContent = `
    .extra-jobs-v2-container {
      box-sizing: border-box !important;
      max-height: 85vh !important;
      overflow: hidden !important;
    }
    .extra-jobs-section-title {
      font-size: 12px;
      font-weight: bold;
      color: #f59e0b;
      margin: 8px 0 4px 0;
      border-bottom: 1px solid #334155;
      padding-bottom: 3px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .extra-jobs-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      padding-right: 2px;
    }
    .fvtt-job-card:hover {
      border-color: #f59e0b !important;
      transform: translateY(-2px);
      background: #27354f !important;
      box-shadow: 0 4px 12px rgba(245,158,11,0.3);
    }
    .app.window-app.extra-jobs-window {
      max-width: 740px !important;
      max-height: 660px !important;
    }
    .extra-special-workbench-base {
      border-color:#7c3aed !important;
      background:linear-gradient(180deg, rgba(30,18,58,.98), rgba(15,23,42,.98)) !important;
      box-shadow:inset 0 0 38px rgba(124,58,237,.10), 0 0 0 1px rgba(192,132,252,.08) !important;
      overflow:hidden;
    }
    .extra-special-workbench-base > * { position:relative; z-index:2; }
    .extra-special-crafting-mask-bg {
      position:absolute !important; inset:0; z-index:1 !important; pointer-events:none;
      background:radial-gradient(circle at 50% 10%, rgba(168,85,247,.16), transparent 42%);
      border-radius:10px;
    }

    #extra-special-crafting-overlay::-webkit-scrollbar { width:6px; }
    #extra-special-crafting-overlay::-webkit-scrollbar-track { background:#020617; border-radius:5px; }
    #extra-special-crafting-overlay::-webkit-scrollbar-thumb { background:#6d28d9; border-radius:5px; }
    #extra-special-crafting-overlay #fvtt-reagents-container,
    #extra-special-crafting-overlay #fvtt-catalysts-container,
    #extra-special-crafting-overlay #fvtt-arcane-container,
    #extra-special-crafting-overlay #fvtt-dark-container { margin-bottom:0 !important; }
    #extra-special-crafting-overlay #fvtt-btn-do-craft { flex:0 0 auto; }
    .extra-special-workbench-title {
      width:100%; box-sizing:border-box; padding:6px 10px; margin:0 0 8px 0;
      border:1px solid #6d28d9; border-radius:8px; background:rgba(76,29,149,.22);
      color:#d8b4fe; font-weight:800; font-size:11px; letter-spacing:.35px;
      display:flex; align-items:center; justify-content:space-between; gap:8px;
    }

    .extra-master-job-card {
      background:linear-gradient(160deg,#2b0b10 0%,#1b1015 56%,#111827 100%) !important;
      border-color:#7f1d1d !important;
      box-shadow:inset 0 0 22px rgba(239,68,68,.08);
    }
    .extra-master-job-card:hover {
      border-color:#ef4444 !important;
      background:linear-gradient(160deg,#3b0d14 0%,#241116 58%,#111827 100%) !important;
      box-shadow:0 5px 16px rgba(239,68,68,.28), inset 0 0 26px rgba(239,68,68,.08) !important;
    }
    #fvtt-craft-root.extra-master-job-theme {
      background:linear-gradient(180deg,#16090d 0%,#0f172a 32%,#12080c 100%) !important;
      box-shadow:inset 0 0 54px rgba(127,29,29,.14);
    }
    #fvtt-craft-root.extra-master-job-theme .fvtt-panel {
      background:linear-gradient(180deg,rgba(43,14,20,.94),rgba(30,20,27,.96)) !important;
      border-color:#7f1d1d !important;
      box-shadow:inset 0 0 22px rgba(239,68,68,.045);
    }
    #fvtt-craft-root.extra-master-job-theme #fvtt-exp-bar {
      background:linear-gradient(90deg,#7f1d1d 0%,#dc2626 60%,#fb7185 100%) !important;
      box-shadow:0 0 10px rgba(220,38,38,.35);
    }
    #fvtt-craft-root.extra-master-job-theme #extra-job-progress-requirements .extra-job-all-requirements {
      border-color:#7f1d1d !important;
      background:#14090d !important;
    }
    .extra-master-banner {
      margin:0 0 10px 0; padding:8px 11px; border:1px solid #991b1b; border-radius:9px;
      background:linear-gradient(135deg,rgba(127,29,29,.38),rgba(24,10,15,.94));
      box-shadow:inset 0 0 20px rgba(239,68,68,.08); color:#fecaca;
      display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap;
      font-size:10px; font-weight:700;
    }
    .extra-master-banner strong { color:#f87171; letter-spacing:.5px; text-transform:uppercase; }
  `;
  document.head.appendChild(style);
}

/**
 * Controllo Requisiti per Personaggio su uno specifico livello target
 */
async function checkJobRequirementsForActor(actor, jobCfg, targetLevel = 1) {
  const errors = [];
  if (!actor || !jobCfg) return { ok: true, errors: [] };

  // 1. Mestieri richiesti (per Job Speciali)
  if (jobCfg.requiredJobs) {
    for (const [reqJKey, reqJLv] of Object.entries(jobCfg.requiredJobs)) {
      if (reqJLv <= 0) continue;
      const rStats = (await actor.getFlag("world", `craftingStats_${reqJKey}`)) || { level: 1 };
      if ((rStats.level || 1) < reqJLv) {
        const reqJName = DEFAULT_EXTRA_JOBS_CONFIG[reqJKey]?.name || reqJKey;
        errors.push(`Serve ${reqJName} Livello ${reqJLv}`);
      }
    }
  }

  // 1B. Requisiti Job Speciali a 5 stelle per i Master Job
  if (jobCfg.masterJob) {
    const masterReqCheck = await checkMasterSpecialRequirements(actor, jobCfg);
    if (!masterReqCheck.ok) errors.push(...masterReqCheck.errors);
  }

  // 2. Controllo Statistiche e Competenze configurate per il livello specifico
  const lvlReqs = jobCfg.levelRequirements || {};
  
  // Controlla tutti i requisiti fino al livello target
  for (let lv = 1; lv <= targetLevel; lv++) {
    const reqData = lvlReqs[lv];
    if (!reqData) continue;

    // Controllo Statistiche
    if (reqData.stats) {
      const labels = { str: "FOR", dex: "DES", con: "COS", int: "INT", wis: "SAG", cha: "CAR" };
      for (const [sKey, minV] of Object.entries(reqData.stats)) {
        if (!minV || minV <= 0) continue;
        const val = typeof getActorStat === "function" ? getActorStat(actor, sKey) : Number(actor?.system?.abilities?.[sKey]?.value || 0);
        if (val < minV) {
          errors.push(`${minV} in ${labels[sKey] || sKey.toUpperCase()} (ora: ${val})`);
        }
      }
    }

    // Controllo Specializzazione richiesta (tipicamente per il Livello 10)
    if (reqData.requiredSpecialization) {
      const specKey = reqData.requiredSpecialization;
      const jobsConfig = getJobsConfig();
      const specCfg = jobsConfig[specKey];
      const specStats = (await actor.getFlag("world", `craftingStats_${specKey}`)) || { level: 1 };
      const specLevel = Number(specStats.level || 1);
      if (specLevel < 5) {
        errors.push(`Porta la specializzazione ${specCfg?.name || specKey} al Livello 5 (ora: ${specLevel})`);
      }
    }

    // Controllo Competenze / TS / Maestrie
    if (Array.isArray(reqData.proficiencies)) {
      for (const prof of reqData.proficiencies) {
        if (prof.type === "skill") {
          const sk = actor?.system?.skills?.[prof.key];
          const isProf = sk && Number(sk.proficient || sk.value || 0) > 0;
          if (!isProf) errors.push(`Competenza in ${prof.label || DND5E_SKILLS[prof.key] || prof.key}`);
        } else if (prof.type === "save") {
          const ab = actor?.system?.abilities?.[prof.key];
          const isProf = ab && Number(ab.proficient || ab.saveProficient || 0) > 0;
          if (!isProf) errors.push(`Competenza TS ${prof.key.toUpperCase()}`);
        } else if (prof.type === "mastery") {
          // Maestria = expertise/mastery su una abilità D&D5e (proficient >= 2),
          // mantenendo compatibilità con eventuali vecchie flag craftingMasteries.
          const sk = actor?.system?.skills?.[prof.key];
          const skillMastery = sk && Number(sk.proficient ?? sk.value ?? 0) >= 2;
          const masteriesWorld = (await actor.getFlag("world", "craftingMasteries")) || [];
          const masteriesCacca = (await actor.getFlag("cacca", "craftingMasteries")) || [];
          const legacyMastery = masteriesWorld.includes(prof.key) || masteriesCacca.includes(prof.key);
          if (!skillMastery && !legacyMastery) errors.push(`Maestria in ${prof.label || DND5E_SKILLS[prof.key] || prof.key}`);
        }
      }
    }
  }

  return { ok: errors.length === 0, errors };
}

/**
 * Stelle guadagnate per i Job Speciali sbloccati
 */
async function getAwardedStarsForJob(actor, parentJobKey) {
  const jobsConfig = getJobsConfig();
  const unlockedJobsWorld = (await actor.getFlag("world", "craftingUnlockedJobs")) || {};
  const unlockedJobsCacca = (await actor.getFlag("cacca", "craftingUnlockedJobs")) || {};

  let stars = 0;
  for (const [sKey, sCfg] of Object.entries(jobsConfig)) {
    if (!sCfg.specialJob) continue;
    const isUnlocked = !!(unlockedJobsWorld[sKey] || unlockedJobsCacca[sKey]);
    if (isUnlocked && sCfg.requiredJobs && sCfg.requiredJobs[parentJobKey]) {
      stars++;
    }
  }
  return stars;
}


async function buildJobRequirementsSummaryHtml(actor, jobKey, jobCfg, currentStats) {
  const thresholds = getThresholdsConfig();
  const isMaster = isMasterJobConfig(jobCfg);
  const isSpecial = !!(jobCfg.specialJob || jobCfg.progressionType === "prestige_only");
  const rows = [];
  const statNames = { str:"FOR", dex:"DES", con:"COS", int:"INT", wis:"SAG", cha:"CAR" };

  const formatLevelExtras = (req = {}) => {
    const parts = [];
    for (const [k, v] of Object.entries(req.stats || {})) {
      if (Number(v) > 0) parts.push(`${statNames[k] || k.toUpperCase()} ${v}`);
    }
    for (const prof of (req.proficiencies || [])) {
      if (prof.type === "save") parts.push(`TS ${DND5E_ABILITIES[prof.key] || String(prof.key).toUpperCase()}`);
      else if (prof.type === "mastery") parts.push(`Maestria ${prof.label || DND5E_SKILLS[prof.key] || prof.key}`);
      else parts.push(`Competenza ${prof.label || DND5E_SKILLS[prof.key] || prof.key}`);
    }
    if (req.requiredSpecialization) {
      const sp = getJobsConfig()?.[req.requiredSpecialization];
      parts.push(`${sp?.name || req.requiredSpecialization} ⭐⭐⭐⭐⭐`);
    }
    return parts;
  };

  if (isSpecial) {
    if (isMaster) {
      const linked = Object.keys(jobCfg.requiredSpecialJobs || {}).filter(k => getJobsConfig()?.[k]?.specialJob);
      const mode = jobCfg.requiredSpecialMode === "all" ? "all" : "any";
      if (linked.length) {
        const names = linked.map(k => `${getJobsConfig()?.[k]?.name || k} 5★`);
        rows.push(`<div><b style="color:#f87171;">Sblocco Master:</b> ${mode === 'all' ? 'TUTTI' : 'ALMENO UNO'} • ${names.join(" • ")}</div>`);
      } else {
        rows.push(`<div style="color:#fca5a5;"><b>Sblocco Master:</b> nessun Job Speciale configurato dal DM</div>`);
      }
    } else {
      const unlock = [];
      for (const [parentKey, lv] of Object.entries(jobCfg.requiredJobs || {})) {
        if (Number(lv) <= 0) continue;
        const parent = getJobsConfig()?.[parentKey];
        unlock.push(`${parent?.name || parentKey} Lv ${lv}`);
      }
      if (unlock.length) rows.push(`<div><b style="color:#67e8f9;">Sblocco:</b> ${unlock.join(" + ")}</div>`);
    }
    for (let lv = 1; lv <= 5; lv++) {
      const reqP = lv > 1 ? Number(thresholds.special?.[lv]?.prestigeReq || 0) : 0;
      const extras = formatLevelExtras(jobCfg.levelRequirements?.[lv] || {});
      const pieces = [];
      if (lv > 1) pieces.push(`${reqP} Prestigio`);
      pieces.push(...extras);
      if (!pieces.length) pieces.push(lv === 1 ? "Nessun requisito aggiuntivo" : "Solo Prestigio");
      const done = Number(currentStats?.level || 1) >= lv;
      rows.push(`<div style="color:${done ? '#86efac' : '#cbd5e1'};"><b>${done ? '✓' : '☆'} Stella ${lv}:</b> ${pieces.join(" • ")}</div>`);
    }
  } else {
    for (let lv = 1; lv <= Math.min(10, Number(jobCfg.maxLevel || 10)); lv++) {
      const req = jobCfg.levelRequirements?.[lv] || {};
      const t = thresholds.normal?.[lv] || { expReq:0, prestigeReq:0 };
      const pieces = [];
      if (lv > 1) pieces.push(`${Number(t.expReq || 0)} EXP`);
      if (Number(t.prestigeReq || 0) > 0) pieces.push(`${Number(t.prestigeReq)} Prestigio`);
      pieces.push(...formatLevelExtras(req));
      if (lv === 1 && pieces.length === 0) pieces.push("Nessun requisito");
      if (lv > 1 && pieces.length === 0) pieces.push("Solo progressione");
      const done = Number(currentStats?.level || 1) >= lv;
      rows.push(`<div style="color:${done ? '#86efac' : '#cbd5e1'};"><b>${done ? '✓' : '•'} Lv ${lv}:</b> ${pieces.join(" • ")}</div>`);
    }
  }

  return `<div class="extra-job-all-requirements" style="margin-top:7px; padding:6px 7px; background:#020617; border:1px solid #334155; border-radius:6px; text-align:left; font-size:8.5px; line-height:1.45; max-height:112px; overflow-y:auto;">
    <div style="font-size:9px; color:#facc15; font-weight:800; margin-bottom:3px;"><i class="fa-solid fa-list-check"></i> Requisiti progressione</div>
    ${rows.join("")}
  </div>`;
}

/**
 * 1. SOVRASCRITTURA PROGRESSIONE E LIVELLAMENTO
 */
function patchAddActorJobExp() {
  if (window._extraJobsExpPatched) return;
  window._extraJobsExpPatched = true;

  const origAdd = window.addActorJobExp;

  window.addActorJobExp = async function(actor, jobKey, jobTitle, expGained, prestigeGained = 0) {
    const jobsConfig = getJobsConfig();
    const jobCfg = jobsConfig[jobKey];
    const thresholds = getThresholdsConfig();

    if (jobCfg && (jobCfg.progressionType === "prestige_only" || jobCfg.specialJob)) {
      const isMaster = isMasterJobConfig(jobCfg);
      let stats = await getActorJobStats(actor, jobKey);
      const maxLvl = Math.min(5, jobCfg.maxLevel || 5);

      stats.exp = 0; // EXP forzata a 0
      stats.prestige = Math.max(0, Number(stats.prestige || 0) + Number(prestigeGained || 0));

      let leveledUp = false;
      while (stats.level < maxLvl) {
        const nextLv = stats.level + 1;
        const reqP = thresholds.special[nextLv]?.prestigeReq ?? (nextLv * 30);
        const reqCheck = await checkJobRequirementsForActor(actor, jobCfg, nextLv);
        if (!reqCheck.ok) break;
        if (stats.prestige >= reqP) {
          stats.level = nextLv;
          leveledUp = true;
        } else {
          break;
        }
      }

      stats.level = Math.clamp(stats.level, 1, maxLvl);
      await actor.setFlag("world", `craftingStats_${jobKey}`, stats);

      if (leveledUp) {
        ui.notifications.info(`${isMaster ? '👑' : '🎉'} ${actor.name} ha raggiunto la ${stats.level}ª stella in ${jobTitle}!`);
        ChatMessage.create({
          speaker: ChatMessage.getSpeaker({ actor }),
          content: `${isMaster ? '👑' : '🎉'} <b>${actor.name}</b> ha raggiunto <b>${stats.level}/5 ★</b> nel ${isMaster ? 'Master Job' : 'Job Speciale'} <span style="color:${isMaster ? '#ef4444' : (jobCfg.color || '#22c55e')};">${jobTitle}</span>!`
        });
      }
      return stats;
    }

    // Job Normali
    let stats = await getActorJobStats(actor, jobKey);
    stats.prestige = Math.max(0, Number(stats.prestige || 0) + Number(prestigeGained || 0));
    let targetExp = Number(stats.exp || 0) + Number(expGained || 25);
    let leveledUp = false;

    while (stats.level < 10) {
      const nextLv = stats.level + 1;
      const req = thresholds.normal[nextLv];
      if (!req) break;

      const reqCheck = await checkJobRequirementsForActor(actor, jobCfg, nextLv);
      if (!reqCheck.ok) {
        if (targetExp >= req.expReq) targetExp = req.expReq;
        break;
      }

      const hasExp = targetExp >= req.expReq;
      const hasPrestige = stats.prestige >= req.prestigeReq;

      if (hasExp && hasPrestige) {
        stats.level = nextLv;
        leveledUp = true;
      } else {
        if (hasExp && !hasPrestige) targetExp = req.expReq;
        break;
      }
    }

    stats.exp = targetExp;
    await actor.setFlag("world", `craftingStats_${jobKey}`, stats);

    if (leveledUp) {
      ui.notifications.info(`🎉 Congratulazioni! ${actor.name} è salito al Livello ${stats.level} in ${jobTitle}!`);
      ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor }),
        content: `🎉 <b>${actor.name}</b> ha raggiunto il <b>Livello ${stats.level}</b> nella professione di <span style="color:#f59e0b;">${jobTitle}</span>!`
      });
    }
    return stats;
  };
}

/**
 * 2. PATCH BANCO DA LAVORO (Barra Prestigio Pura & Pulizia EXP)
 */
function patchOpenCraftingWorkbench() {
  if (window._extraJobsWorkbenchPatched) return;
  window._extraJobsWorkbenchPatched = true;

  const origWorkbench = window.openCraftingWorkbench;

  function getWorkbenchRoot(actor, jobKey, jobTitle, jobCfg) {
    const roots = Array.from(document.querySelectorAll('#fvtt-craft-root'));
    if (!roots.length) return null;

    const actorNeedle = String(actor?.name || '').toLowerCase();
    const jobNeedle = String(jobTitle || jobCfg?.name || jobKey || '').toLowerCase();

    // Prende l'ultimo banco aperto che contiene personaggio e job.
    for (const root of roots.slice().reverse()) {
      const txt = String(root.textContent || '').toLowerCase();
      if ((!actorNeedle || txt.includes(actorNeedle)) && (!jobNeedle || txt.includes(jobNeedle))) return root;
    }
    return roots[roots.length - 1];
  }

  async function applyProgressRequirements(craftRoot, actor, jobKey, jobCfg, isSpecial) {
    if (!craftRoot || !actor || !jobCfg) return;
    const stats = (await actor.getFlag("world", `craftingStats_${jobKey}`)) || { level: 1, exp: 0, prestige: 0 };
    const summary = await buildJobRequirementsSummaryHtml(actor, jobKey, jobCfg, stats);

    let host = null;
    if (isSpecial) {
      host = craftRoot.querySelector('#extra-jobs-special-interface .extra-special-progress-requirements-anchor');
    } else {
      const warning = craftRoot.querySelector('#fvtt-prestige-warning');
      if (warning) {
        host = craftRoot.querySelector('#extra-job-progress-requirements');
        if (!host) {
          host = document.createElement('div');
          host.id = 'extra-job-progress-requirements';
          host.style.cssText = 'margin-top:6px;';
          warning.insertAdjacentElement('afterend', host);
        }
      }
    }

    if (host) {
      host.innerHTML = summary;
      const box = host.querySelector('.extra-job-all-requirements');
      if (box) {
        box.style.marginTop = '0';
        box.style.maxHeight = isSpecial ? '92px' : '118px';
        box.style.fontSize = '9px';
      }
    }
  }

  function ensureSpecialCraftingOverlay(craftRoot, currentLvl) {
    if (!craftRoot) return;
    const view = craftRoot.querySelector('#fvtt-view-workbench');
    if (!view) return;

    const panel = craftRoot.querySelector('#fvtt-crafting-main-panel') ||
      Array.from(view.children).find((el, idx) => idx === 1 && el.classList?.contains('fvtt-panel')) ||
      view.querySelector('.fvtt-panel:nth-of-type(2)');
    if (!panel) return;

    panel.classList.add('extra-special-workbench-base');
    panel.dataset.specialJob = 'true';
    panel.style.setProperty('position', 'relative', 'important');
    panel.style.setProperty('min-height', '590px', 'important');
    panel.style.setProperty('height', 'auto', 'important');
    panel.style.setProperty('max-height', '650px', 'important');
    panel.style.setProperty('overflow-y', 'auto', 'important');
    panel.style.setProperty('overflow-x', 'hidden', 'important');

    // V5: niente più overlay sopra ai controlli. La "maschera" è SOLO uno sfondo
    // decorativo sotto alla UI originale, così tutti gli elementi reali restano visibili
    // e mantengono i loro listener, drag&drop e logica di crafting.
    const oldOverlay = panel.querySelector('#extra-special-crafting-overlay');
    if (oldOverlay) {
      const body = oldOverlay.querySelector('#extra-special-overlay-body');
      if (body) {
        const order = [
          '#fvtt-crafting-controls-bar', '#fvtt-main-slots-row', '#fvtt-risk-warning-container',
          '#fvtt-reagents-container', '#fvtt-catalysts-container', '#fvtt-arcane-container',
          '#fvtt-dark-container', '#fvtt-btn-do-craft'
        ];
        for (const sel of order) {
          const node = body.querySelector(sel);
          if (node) panel.insertBefore(node, oldOverlay);
        }
      }
      oldOverlay.remove();
    }

    let mask = panel.querySelector('.extra-special-crafting-mask-bg');
    if (!mask) {
      mask = document.createElement('div');
      mask.className = 'extra-special-crafting-mask-bg';
      panel.prepend(mask);
    }

    let title = panel.querySelector('.extra-special-workbench-title');
    if (!title) {
      title = document.createElement('div');
      title.className = 'extra-special-workbench-title';
      title.innerHTML = `
        <span><i class="fa-solid fa-wand-magic-sparkles"></i> BANCO CRAFTING SPECIALE</span>
        <span style="font-size:9px;color:#c4b5fd;font-weight:600;">3 Slot • 2 Strumenti/Slot • 5 Reagenti • 3 Catalizzatori • 1 Energia Arcana</span>
      `;
      mask.insertAdjacentElement('afterend', title);
    }
    title.style.setProperty('display', 'flex', 'important');

    // Tutta la UI originale deve stare DAVANTI alla maschera.
    for (const child of Array.from(panel.children)) {
      if (child === mask) continue;
      child.style.setProperty('position', 'relative', 'important');
      child.style.setProperty('z-index', '2', 'important');
    }

    const controls = craftRoot.querySelector('#fvtt-crafting-controls-bar');
    if (controls) {
      controls.style.setProperty('display', 'flex', 'important');
      controls.style.setProperty('visibility', 'visible', 'important');
      controls.style.setProperty('opacity', '1', 'important');
      controls.style.setProperty('width', '100%', 'important');
      controls.style.setProperty('background', 'rgba(2,6,23,.68)', 'important');
      controls.style.setProperty('border', '1px solid #6d28d9', 'important');
      controls.style.setProperty('border-radius', '8px', 'important');
      controls.style.setProperty('padding', '7px', 'important');
      controls.style.setProperty('margin-bottom', '7px', 'important');
      controls.style.setProperty('box-sizing', 'border-box', 'important');
      const left = controls.firstElementChild;
      if (left) {
        left.style.setProperty('display', 'flex', 'important');
        left.style.setProperty('flex-wrap', 'wrap', 'important');
        left.style.setProperty('gap', '4px', 'important');
      }
    }

    // Tasti Standard/Avanzato/Professionale/Master sbloccati dalle stelle.
    const buttonData = [
      ['#fvtt-subtab-std', 1, 'fa-cubes', 'Standard'],
      ['#fvtt-subtab-adv', 2, 'fa-flask-vial', 'Avanzato'],
      ['#fvtt-subtab-pro', 3, 'fa-crown', 'Professionale'],
      ['#fvtt-subtab-mst', 5, 'fa-wand-magic-sparkles', 'Master']
    ];
    for (const [sel, req, icon, label] of buttonData) {
      const btn = craftRoot.querySelector(sel);
      if (!btn) continue;
      btn.dataset.specialStarReq = String(req);
      const unlocked = currentLvl >= req;
      btn.style.setProperty('display', unlocked ? 'inline-flex' : 'none', 'important');
      btn.style.setProperty('visibility', unlocked ? 'visible' : 'hidden', 'important');
      btn.style.setProperty('opacity', unlocked ? '1' : '0', 'important');
      btn.title = `${label} • Richiede ${req} ${req === 1 ? 'stella' : 'stelle'}`;
      btn.innerHTML = `<i class="fa-solid ${icon}"></i> ${label} (⭐ ${req}+)`;
    }

    // I menu speciali che devono restare identici al crafting base rimangono sempre visibili.
    for (const sel of ['#fvtt-subtab-coating','#fvtt-subtab-gem','#fvtt-subtab-repair']) {
      const btn = craftRoot.querySelector(sel);
      if (!btn) continue;
      btn.style.setProperty('display', 'inline-flex', 'important');
      btn.style.setProperty('visibility', 'visible', 'important');
      btn.style.setProperty('opacity', '1', 'important');
    }
    const darkBtn = craftRoot.querySelector('#fvtt-subtab-dark');
    if (darkBtn) {
      darkBtn.style.setProperty('display', 'inline-flex', 'important');
      darkBtn.style.setProperty('visibility', 'visible', 'important');
      darkBtn.style.setProperty('opacity', '1', 'important');
    }

    // Slot 1/2/3 e RISULTATO devono essere sempre visibili nella maschera speciale.
    const slotsRow = craftRoot.querySelector('#fvtt-main-slots-row');
    if (slotsRow) {
      slotsRow.style.setProperty('display', 'flex', 'important');
      slotsRow.style.setProperty('visibility', 'visible', 'important');
      slotsRow.style.setProperty('opacity', '1', 'important');
      slotsRow.style.setProperty('width', '100%', 'important');
      slotsRow.style.setProperty('background', 'rgba(2,6,23,.48)', 'important');
      slotsRow.style.setProperty('border', '1px solid rgba(124,58,237,.55)', 'important');
      slotsRow.style.setProperty('border-radius', '9px', 'important');
      slotsRow.style.setProperty('padding', '10px 8px', 'important');
      slotsRow.style.setProperty('margin', '0 0 7px 0', 'important');
      slotsRow.style.setProperty('box-sizing', 'border-box', 'important');
    }
    for (const sel of ['#fvtt-slot-0','#fvtt-slot-1','#fvtt-slot-res']) {
      const el = craftRoot.querySelector(sel);
      if (!el) continue;
      el.style.setProperty('display', 'flex', 'important');
      el.style.setProperty('visibility', 'visible', 'important');
      el.style.setProperty('opacity', '1', 'important');
      el.parentElement?.style.setProperty('display', 'flex', 'important');
      el.parentElement?.style.setProperty('visibility', 'visible', 'important');
      el.parentElement?.style.setProperty('opacity', '1', 'important');
    }

    const syncModeLayout = () => {
      const active = [
        ['std', '#fvtt-subtab-std'], ['adv', '#fvtt-subtab-adv'], ['pro', '#fvtt-subtab-pro'],
        ['mst', '#fvtt-subtab-mst'], ['dark_art', '#fvtt-subtab-dark'],
        ['coating', '#fvtt-subtab-coating'], ['weapon_gem', '#fvtt-subtab-gem'], ['repair', '#fvtt-subtab-repair']
      ].find(([, sel]) => craftRoot.querySelector(sel)?.classList.contains('active'))?.[0] || 'std';

      const preserveOriginal = ['weapon_gem', 'coating', 'repair'].includes(active);
      if (!preserveOriginal) {
        craftRoot.querySelector('#fvtt-slot-2-container')?.style.setProperty('display', 'flex', 'important');
        craftRoot.querySelector('#fvtt-reagents-container')?.style.setProperty('display', 'block', 'important');
        craftRoot.querySelector('#fvtt-catalysts-container')?.style.setProperty('display', 'block', 'important');
        craftRoot.querySelector('#fvtt-arcane-container')?.style.setProperty('display', 'block', 'important');
        const arc2Wrap = craftRoot.querySelector('#fvtt-arcane-1')?.parentElement;
        if (arc2Wrap) arc2Wrap.style.setProperty('display', 'none', 'important');
      } else if (active === 'weapon_gem') {
        const arc2Wrap = craftRoot.querySelector('#fvtt-arcane-1')?.parentElement;
        if (arc2Wrap) arc2Wrap.style.setProperty('display', 'flex', 'important');
      }

      // La riga principale e il risultato non spariscono mai.
      craftRoot.querySelector('#fvtt-main-slots-row')?.style.setProperty('display', 'flex', 'important');
      craftRoot.querySelector('#fvtt-slot-res')?.style.setProperty('display', 'flex', 'important');
      craftRoot.querySelector('#fvtt-slot-res-lbl')?.style.setProperty('display', 'block', 'important');
      craftRoot.querySelector('#fvtt-success-rate-badge')?.style.setProperty('display', 'block', 'important');
    };

    for (const sel of ['#fvtt-subtab-std','#fvtt-subtab-adv','#fvtt-subtab-pro','#fvtt-subtab-mst','#fvtt-subtab-dark','#fvtt-subtab-coating','#fvtt-subtab-gem','#fvtt-subtab-repair']) {
      const btn = craftRoot.querySelector(sel);
      if (btn && !btn._extraSpecialMaskSyncV5) {
        btn.addEventListener('click', () => setTimeout(syncModeLayout, 10));
        btn._extraSpecialMaskSyncV5 = true;
      }
    }
    setTimeout(syncModeLayout, 10);
  }

  async function applySpecialJobInterface(craftRoot, actor, jobKey, jobCfg) {
    if (!craftRoot || !actor || !jobCfg) return;

    const thresholds = getThresholdsConfig();
    const stats = (await actor.getFlag("world", `craftingStats_${jobKey}`)) || { level: 1, exp: 0, prestige: 0 };
    const currentLvl = Math.clamp(Number(stats.level || 1), 1, 5);
    const currentPrestige = Math.max(0, Number(stats.prestige || 0));
    const nextLvl = Math.min(5, currentLvl + 1);
    const prevReq = Number(thresholds.special[currentLvl]?.prestigeReq || 0);
    const nextReq = currentLvl >= 5 ? prevReq : Number(thresholds.special[nextLvl]?.prestigeReq ?? prevReq);
    const range = Math.max(1, nextReq - prevReq);
    const progress = currentLvl >= 5 ? 100 : Math.clamp(((currentPrestige - prevReq) / range) * 100, 0, 100);

    // Vecchia progressione del crafting completamente coperta/nascosta.
    craftRoot.querySelector('#fvtt-display-level')?.style.setProperty('display', 'none', 'important');
    craftRoot.querySelector('#fvtt-display-prestige')?.style.setProperty('display', 'none', 'important');
    const oldExpText = craftRoot.querySelector('#fvtt-exp-text');
    const oldProgressBox = oldExpText?.parentElement?.parentElement;
    if (oldProgressBox) oldProgressBox.style.setProperty('display', 'none', 'important');
    craftRoot.querySelector('#fvtt-prestige-warning')?.style.setProperty('display', 'none', 'important');

    let ui = craftRoot.querySelector('#extra-jobs-special-interface');
    if (!ui) {
      ui = document.createElement('section');
      ui.id = 'extra-jobs-special-interface';
      ui.style.cssText = `
        margin:0 0 12px 0; padding:11px 13px;
        background:linear-gradient(135deg,rgba(76,29,149,.27),rgba(15,23,42,.98));
        border:1px solid #7c3aed; border-radius:10px;
        box-shadow:inset 0 0 24px rgba(124,58,237,.08),0 4px 14px rgba(0,0,0,.25);
      `;
      const header = craftRoot.firstElementChild;
      if (header?.nextSibling) craftRoot.insertBefore(ui, header.nextSibling);
      else craftRoot.prepend(ui);
    }

    let stars = '';
    for (let i = 1; i <= 5; i++) {
      const active = i <= currentLvl;
      stars += `<i class="${active ? 'fa-solid' : 'fa-regular'} fa-star" style="font-size:20px;color:${active ? '#c084fc' : '#475569'};filter:${active ? 'drop-shadow(0 0 5px rgba(192,132,252,.65))' : 'none'};" title="Stella ${i}"></i>`;
    }

    ui.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:8px;">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
          <div style="font-size:11px;font-weight:900;color:#c084fc;text-transform:uppercase;letter-spacing:.7px;"><i class="fa-solid fa-gem"></i> Job Speciale</div>
          <div style="display:flex;align-items:center;gap:5px;padding:4px 8px;background:#020617;border:1px solid #4c1d95;border-radius:7px;">${stars}</div>
        </div>
        <div style="font-size:12px;color:#f3e8ff;font-weight:bold;"><i class="fa-solid fa-star" style="color:#c084fc;"></i> Prestigio: <span style="color:#e9d5ff;">${currentPrestige}</span></div>
      </div>
      <div style="display:flex;justify-content:space-between;gap:10px;margin-bottom:4px;font-size:10px;">
        <span style="color:#c084fc;font-weight:bold;">Punti Prestigio</span>
        <span style="color:#d8b4fe;font-weight:bold;">${currentLvl >= 5 ? `${currentPrestige} • MASSIMO RAGGIUNTO` : `${currentPrestige} / ${nextReq} per la stella ${nextLvl}`}</span>
      </div>
      <div style="height:10px;width:100%;background:#111827;border:1px solid #4c1d95;border-radius:999px;overflow:hidden;">
        <div style="height:100%;width:${progress}%;background:linear-gradient(90deg,#6d28d9,#a855f7 60%,#d8b4fe);box-shadow:0 0 10px rgba(168,85,247,.6);transition:width .25s ease;"></div>
      </div>
      <div class="extra-special-progress-requirements-anchor" style="margin-top:7px;"></div>
    `;

    await applyProgressRequirements(craftRoot, actor, jobKey, jobCfg, true);
    ensureSpecialCraftingOverlay(craftRoot, currentLvl);

    // Nei job speciali l'EXP non deve mai accumularsi.
    if (Number(stats.exp || 0) !== 0) {
      stats.exp = 0;
      await actor.setFlag("world", `craftingStats_${jobKey}`, stats);
    }

    const craftBtn = craftRoot.querySelector('#fvtt-btn-do-craft');
    if (craftBtn) {
      const cleanCraftButton = () => {
        const cleaned = craftBtn.innerHTML.replace(/\(\+?\d+\s*EXP\)/gi, '').replace(/\+?\d+\s*EXP/gi, '').replace(/\s{2,}/g, ' ');
        if (cleaned !== craftBtn.innerHTML) craftBtn.innerHTML = cleaned;
      };
      cleanCraftButton();
      if (!craftBtn._extraJobsSpecialObserver) {
        const buttonObserver = new MutationObserver(cleanCraftButton);
        buttonObserver.observe(craftBtn, { childList:true, subtree:true, characterData:true });
        craftBtn._extraJobsSpecialObserver = buttonObserver;
      }
    }
  }

  async function applyMasterJobInterface(craftRoot, actor, jobKey, jobCfg) {
    if (!craftRoot || !actor || !isMasterJobConfig(jobCfg)) return;

    // Usa esattamente la stessa struttura funzionale dei Job Speciali,
    // poi la trasforma nel tema Master rosso senza duplicare listener o logica crafting.
    await applySpecialJobInterface(craftRoot, actor, jobKey, jobCfg);
    craftRoot.classList.add('extra-master-job-theme');

    const stats = (await actor.getFlag("world", `craftingStats_${jobKey}`)) || { level: 1, exp: 0, prestige: 0 };
    const currentLvl = Math.clamp(Number(stats.level || 1), 1, 5);
    const currentPrestige = Math.max(0, Number(stats.prestige || 0));
    const thresholds = getThresholdsConfig();
    const nextLvl = Math.min(5, currentLvl + 1);
    const prevReq = Number(thresholds.special[currentLvl]?.prestigeReq || 0);
    const nextReq = currentLvl >= 5 ? prevReq : Number(thresholds.special[nextLvl]?.prestigeReq ?? prevReq);
    const range = Math.max(1, nextReq - prevReq);
    const progress = currentLvl >= 5 ? 100 : Math.clamp(((currentPrestige - prevReq) / range) * 100, 0, 100);
    const selected = await getSelectedMasterJobs(actor);

    const ui = craftRoot.querySelector('#extra-jobs-special-interface');
    if (ui) {
      ui.dataset.masterJob = 'true';
      ui.style.setProperty('background', 'linear-gradient(135deg,rgba(127,29,29,.35),rgba(15,23,42,.98))', 'important');
      ui.style.setProperty('border-color', '#dc2626', 'important');
      ui.style.setProperty('box-shadow', 'inset 0 0 28px rgba(220,38,38,.10),0 4px 14px rgba(0,0,0,.28)', 'important');

      let stars = '';
      for (let i = 1; i <= 5; i++) {
        const active = i <= currentLvl;
        stars += `<i class="${active ? 'fa-solid' : 'fa-regular'} fa-star" style="font-size:20px;color:${active ? '#ef4444' : '#4b252b'};filter:${active ? 'drop-shadow(0 0 5px rgba(239,68,68,.65))' : 'none'};" title="Stella ${i}"></i>`;
      }

      ui.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:8px;">
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <div style="font-size:11px;font-weight:900;color:#f87171;text-transform:uppercase;letter-spacing:.7px;"><i class="fa-solid fa-crown"></i> Master Job</div>
            <div style="display:flex;align-items:center;gap:5px;padding:4px 8px;background:#12070a;border:1px solid #7f1d1d;border-radius:7px;">${stars}</div>
          </div>
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <div style="font-size:12px;color:#fee2e2;font-weight:bold;"><i class="fa-solid fa-star" style="color:#ef4444;"></i> Prestigio: <span style="color:#fecaca;">${currentPrestige}</span></div>
            <div style="font-size:9px;color:#fca5a5;border:1px solid #7f1d1d;background:rgba(127,29,29,.18);padding:2px 7px;border-radius:10px;"><i class="fa-solid fa-certificate"></i> ${selected.length}/3 Master</div>
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;gap:10px;margin-bottom:4px;font-size:10px;">
          <span style="color:#f87171;font-weight:bold;">Punti Prestigio</span>
          <span style="color:#fecaca;font-weight:bold;">${currentLvl >= 5 ? `${currentPrestige} • MASSIMO RAGGIUNTO` : `${currentPrestige} / ${nextReq} per la stella ${nextLvl}`}</span>
        </div>
        <div style="height:10px;width:100%;background:#16090d;border:1px solid #7f1d1d;border-radius:999px;overflow:hidden;">
          <div style="height:100%;width:${progress}%;background:linear-gradient(90deg,#7f1d1d,#dc2626 60%,#fb7185);box-shadow:0 0 10px rgba(220,38,38,.60);transition:width .25s ease;"></div>
        </div>
        <div class="extra-special-progress-requirements-anchor" style="margin-top:7px;"></div>
      `;
      await applyProgressRequirements(craftRoot, actor, jobKey, jobCfg, true);
    }

    // Stesso banco dei Job Speciali, ma maschera e cornici rosse.
    const panel = craftRoot.querySelector('#fvtt-crafting-main-panel') || craftRoot.querySelector('#fvtt-view-workbench .fvtt-panel:nth-of-type(2)');
    const mask = panel?.querySelector('.extra-special-crafting-mask-bg');
    if (mask) mask.style.setProperty('background', 'radial-gradient(circle at 50% 10%, rgba(239,68,68,.18), transparent 42%)', 'important');

    const title = panel?.querySelector('.extra-special-workbench-title');
    if (title) {
      title.style.setProperty('border-color', '#dc2626', 'important');
      title.style.setProperty('background', 'rgba(127,29,29,.24)', 'important');
      title.style.setProperty('color', '#fecaca', 'important');
      const first = title.firstElementChild;
      if (first) first.innerHTML = '<i class="fa-solid fa-crown"></i> BANCO CRAFTING MASTER';
      const second = title.lastElementChild;
      if (second && second !== first) second.style.setProperty('color', '#fca5a5', 'important');
    }

    const controls = craftRoot.querySelector('#fvtt-crafting-controls-bar');
    if (controls) controls.style.setProperty('border-color', '#dc2626', 'important');
    const slotsRow = craftRoot.querySelector('#fvtt-main-slots-row');
    if (slotsRow) slotsRow.style.setProperty('border-color', 'rgba(220,38,38,.62)', 'important');

    // EXP sempre azzerata anche per dati provenienti dalla vecchia V8.
    const cleanLevel = Math.clamp(Number(stats.level || 1), 1, 5);
    if (Number(stats.exp || 0) !== 0 || Number(stats.level || 1) !== cleanLevel) {
      stats.exp = 0;
      stats.level = cleanLevel;
      await actor.setFlag("world", `craftingStats_${jobKey}`, stats);
    }
  }

  async function applyMasterJobTheme(craftRoot, actor, jobKey, jobCfg) {
    if (!craftRoot || !actor || !isMasterJobConfig(jobCfg)) return;

    craftRoot.classList.add('extra-master-job-theme');
    const selected = await getSelectedMasterJobs(actor);

    let banner = craftRoot.querySelector('#extra-master-job-banner');
    if (!banner) {
      banner = document.createElement('section');
      banner.id = 'extra-master-job-banner';
      banner.className = 'extra-master-banner';
      const header = craftRoot.firstElementChild;
      if (header?.nextSibling) craftRoot.insertBefore(banner, header.nextSibling);
      else craftRoot.prepend(banner);
    }

    banner.innerHTML = `
      <span><strong><i class="fa-solid fa-crown"></i> Master Job</strong> &nbsp; ${jobCfg.name || jobKey}</span>
      <span style="color:#fca5a5;"><i class="fa-solid fa-certificate"></i> Attestato da master • Selezionati ${selected.length}/3</span>
    `;

    const title = craftRoot.querySelector('h2');
    if (title) title.style.setProperty('color', '#f87171', 'important');

    const expBox = craftRoot.querySelector('#fvtt-exp-text')?.parentElement?.parentElement;
    if (expBox) {
      expBox.style.setProperty('border-color', '#7f1d1d', 'important');
      expBox.style.setProperty('background', 'rgba(20,9,13,.88)', 'important');
    }

    const expBar = craftRoot.querySelector('#fvtt-exp-bar');
    if (expBar) expBar.style.setProperty('background', 'linear-gradient(90deg,#7f1d1d,#dc2626 60%,#fb7185)', 'important');
  }

  window.openCraftingWorkbench = async function(actor, jobKey = 'fabbro', jobTitle = 'Fabbro') {
    const jobsConfig = getJobsConfig();
    const jobCfg = jobsConfig[jobKey] || {};
    const isSpecial = !!(jobCfg.specialJob || jobCfg.progressionType === "prestige_only");
    const isMaster = isMasterJobConfig(jobCfg);

    if (isMaster) {
      if (!actorHasMasterCertificate(actor)) {
        ui.notifications.warn('⚠️ I Master Job sono disponibili solo mentre possiedi "Attestato da master" nell’inventario.');
        return null;
      }
      const selectedMasterJobs = await getSelectedMasterJobs(actor);
      if (!selectedMasterJobs.includes(jobKey)) {
        ui.notifications.warn('⚠️ Questo Master Job non è stato selezionato. Puoi possederne al massimo 3.');
        return null;
      }
    }

    const res = await origWorkbench.call(this, actor, jobKey, jobTitle);

    const decorate = async () => {
      try {
        const craftRoot = getWorkbenchRoot(actor, jobKey, jobTitle, jobCfg);
        if (!craftRoot) return false;
        const target = craftRoot.closest('.window-app, .dialog-v2, .application') || craftRoot;

        if (isMaster) {
          await applyMasterJobInterface(craftRoot, actor, jobKey, jobCfg);
        } else if (isSpecial) {
          await applySpecialJobInterface(craftRoot, actor, jobKey, jobCfg);
        } else {
          await applyProgressRequirements(craftRoot, actor, jobKey, jobCfg, false);
        }

        // Aggiorna requisiti e maschera quando il crafting base cambia barra/modalità,
        // ignorando le mutazioni generate dalla nostra stessa interfaccia.
        if (!craftRoot._extraJobsProgressObserver) {
          let scheduled = false;
          const observer = new MutationObserver((mutations) => {
            const external = mutations.some(m => {
              const el = m.target?.nodeType === 1 ? m.target : m.target?.parentElement;
              return !el?.closest?.('#extra-job-progress-requirements, #extra-jobs-special-interface, #extra-special-crafting-overlay');
            });
            if (!external || scheduled) return;
            scheduled = true;
            setTimeout(async () => {
              scheduled = false;
              if (isMaster) {
                await applyMasterJobInterface(craftRoot, actor, jobKey, jobCfg);
              } else if (isSpecial) {
                await applySpecialJobInterface(craftRoot, actor, jobKey, jobCfg);
              } else {
                await applyProgressRequirements(craftRoot, actor, jobKey, jobCfg, false);
              }
            }, 35);
          });
          observer.observe(craftRoot, { childList:true, subtree:true, characterData:true, attributes:true, attributeFilter:['class','style'] });
          craftRoot._extraJobsProgressObserver = observer;
        }

        // Rimuove i vecchi tasti di specializzazione del crafting base.
        target.querySelector('#fvtt-btn-spec-1')?.remove();
        target.querySelector('#fvtt-btn-spec-2')?.remove();

        // I tasti per sbloccare nuove classi speciali servono solo sui job normali.
        if (!isSpecial && !isMaster) {
          let specContainer = target.querySelector('#extra-jobs-spec-buttons-container');
          if (!specContainer) {
            const headerInfoBox = target.querySelector('#fvtt-display-prestige')?.parentElement;
            if (headerInfoBox) {
              specContainer = document.createElement('div');
              specContainer.id = "extra-jobs-spec-buttons-container";
              specContainer.style.cssText = "display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-top:4px;";
              headerInfoBox.appendChild(specContainer);
            }
          }

          if (specContainer) {
            specContainer.innerHTML = "";
            const stats = (await actor.getFlag("world", `craftingStats_${jobKey}`)) || { level: 1, exp: 0, prestige: 0 };
            const specUnlockLvl = jobCfg.specUnlockLevel || 7;

            if (stats.level >= specUnlockLvl) {
              const unlockedJobsWorld = (await actor.getFlag("world", "craftingUnlockedJobs")) || {};
              const unlockedJobsCacca = (await actor.getFlag("cacca", "craftingUnlockedJobs")) || {};

              for (const [specSlug, specCfg] of Object.entries(jobsConfig)) {
                if (!specCfg.specialJob || !specCfg.requiredJobs || !specCfg.requiredJobs[jobKey]) continue;
                const isUnlocked = !!(unlockedJobsWorld[specSlug] || unlockedJobsCacca[specSlug]);
                if (isUnlocked) continue;

                const reqCheck = await checkJobRequirementsForActor(actor, specCfg, 1);
                const specBtn = document.createElement('button');
                specBtn.type = 'button';
                specBtn.className = 'fvtt-btn';
                specBtn.style.cssText = `padding:4px 10px; font-size:10px; background:linear-gradient(180deg,#7c3aed 0%,#5b21b6 100%) !important; border-color:#c084fc !important;`;
                specBtn.textContent = `Sblocca ${specCfg.name}`;
                if (!reqCheck.ok) specBtn.title = `Requisiti Mancanti: ${reqCheck.errors.join(' • ')}`;

                specBtn.onclick = async (e) => {
                  e.preventDefault();
                  if (!reqCheck.ok) {
                    ui.notifications.warn(`⚠️ Impossibile sbloccare ${specCfg.name}: ${reqCheck.errors.join(' • ')}!`);
                    return;
                  }

                  unlockedJobsWorld[specSlug] = true;
                  unlockedJobsCacca[specSlug] = true;
                  await actor.setFlag("world", "craftingUnlockedJobs", unlockedJobsWorld);
                  await actor.setFlag("cacca", "craftingUnlockedJobs", unlockedJobsCacca);

                  const currentSpecStats = (await actor.getFlag("world", `craftingStats_${specSlug}`)) || { level: 1, exp: 0, prestige: 0 };
                  currentSpecStats.unlocked = true;
                  currentSpecStats.exp = 0;
                  await actor.setFlag("world", `craftingStats_${specSlug}`, currentSpecStats);

                  ui.notifications.info(`🎉 ${actor.name} ha sbloccato il job speciale "${specCfg.name}"!`);
                  ChatMessage.create({
                    speaker: ChatMessage.getSpeaker({ actor }),
                    content: `🌟 <b>${actor.name}</b> ha ottenuto il Job Speciale <b style="color:#06b6d4;">${specCfg.name}</b>!`
                  });

                  openCraftingWorkbench(actor, jobKey, jobCfg.name);
                };
                specContainer.appendChild(specBtn);
              }
            }
          }
        } else {
          target.querySelector('#extra-jobs-spec-buttons-container')?.remove();
        }

        return true;
      } catch (err) {
        console.error("Extra Jobs | Errore interfaccia banco:", err);
        return false;
      }
    };

    // DialogV2 non è sempre disponibile al primo tick: più tentativi, senza dipendere da un solo setTimeout.
    for (const delay of [0, 40, 100, 220, 450]) {
      setTimeout(decorate, delay);
    }

    return res;
  };
}

/**
 * 3. MENU SELEZIONE MESTIERI
 */
function patchJobSelectionDialog() {
  const customOpenJobSelectionDialog = async function(actor) {
    if (!actor) {
      ui.notifications.error("Nessun personaggio associato trovato.");
      return;
    }

    injectExtraJobsCSS();
    patchAddActorJobExp();
    patchOpenCraftingWorkbench();
    const jobsConfig = getJobsConfig();

    const unlockedJobsWorld = (await actor.getFlag("world", "craftingUnlockedJobs")) || {};
    const unlockedJobsCacca = (await actor.getFlag("cacca", "craftingUnlockedJobs")) || {};
    const hasMasterCertificate = actorHasMasterCertificate(actor);
    const selectedMasterJobs = await getSelectedMasterJobs(actor);

    const getJobPreviewStats = async (jId) => {
      return (await actor.getFlag("world", `craftingStats_${jId}`)) || { level: 1, exp: 0, prestige: 0 };
    };

    let normalCardsHtml = "";
    let specialCardsHtml = "";
    let masterCardsHtml = "";

    for (const [jId, j] of Object.entries(jobsConfig)) {
      const st = await getJobPreviewStats(jId);
      const isSpecial = !!(j.specialJob || j.progressionType === "prestige_only");
      const isMaster = isMasterJobConfig(j);
      const isSpecUnlocked = !!(unlockedJobsWorld[jId] || unlockedJobsCacca[jId]);
      const isMasterSelected = selectedMasterJobs.includes(jId);

      // I Master Job non vengono neppure mostrati senza Attestato da master.
      if (isMaster && !hasMasterCertificate) continue;

      const reqCheck = await checkJobRequirementsForActor(actor, j, 1);
      let isLocked = false;
      let lockReason = "";

      if (isMaster) {
        if (!reqCheck.ok) {
          isLocked = true;
          lockReason = reqCheck.errors.join(' • ');
        } else if (!isMasterSelected) {
          isLocked = true;
          lockReason = selectedMasterJobs.length >= 3
            ? "Limite di 3 Master Job raggiunto"
            : "Master Job non ancora selezionato";
        }
      } else if (isSpecial) {
        if (!isSpecUnlocked) {
          isLocked = true;
          lockReason = j.unlockText || "Richiede sblocco specializzazione";
        }
      } else if (!reqCheck.ok) {
        isLocked = true;
        lockReason = j.unlockText || reqCheck.errors.join(' • ');
      }

      const maxLvl = (isSpecial || isMaster) ? 5 : (j.maxLevel || 10);
      const currentLv = Math.clamp(Number(st.level || 1), 1, maxLvl);

      let levelDisplayHtml = "";
      if (isMaster) {
        let masterStarsHtml = "";
        for (let i = 1; i <= 5; i++) {
          masterStarsHtml += `<i class="${i <= currentLv ? 'fa-solid' : 'fa-regular'} fa-star" style="color:${i <= currentLv ? '#ef4444' : '#4b252b'}; font-size:11px; margin:0 1px;"></i>`;
        }
        levelDisplayHtml = `
          <div style="margin-bottom:4px;">
            <div style="display:inline-flex;gap:1px;background:#12070a;padding:2px 6px;border-radius:6px;border:1px solid #7f1d1d;box-shadow:inset 0 0 10px rgba(220,38,38,.08);">${masterStarsHtml}</div>
          </div>
          <div style="font-size:10px;color:#f87171;font-weight:bold;">★ ${st.prestige || 0} Prestigio</div>
          <div style="margin-top:3px;display:inline-flex;align-items:center;gap:4px;padding:2px 7px;border-radius:10px;border:1px solid ${isMasterSelected ? '#dc2626' : '#7f1d1d'};background:rgba(127,29,29,.18);color:${isMasterSelected ? '#fecaca' : '#94a3b8'};font-size:9px;font-weight:800;">
            <i class="fa-solid ${isMasterSelected ? 'fa-crown' : 'fa-lock'}"></i> ${isMasterSelected ? 'MASTER SELEZIONATO' : `MASTER ${selectedMasterJobs.length}/3`}
          </div>
        `;
      } else if (isSpecial) {
        let starsHtml = "";
        for (let i = 1; i <= 5; i++) {
          starsHtml += `<i class="${i <= currentLv ? 'fa-solid' : 'fa-regular'} fa-star" style="color:${i <= currentLv ? '#facc15' : '#475569'}; font-size:11px; margin:0 1px;"></i>`;
        }
        levelDisplayHtml = `
          <div style="margin-bottom:4px;">
            <div style="display:inline-flex; gap:1px; background:#020617; padding:2px 6px; border-radius:6px; border:1px solid #334155;">${starsHtml}</div>
          </div>
          <div style="font-size:10px; color:#facc15; font-weight:bold;">⭐ ${st.prestige || 0} Prestigio</div>
        `;
      } else {
        const awardedStars = await getAwardedStarsForJob(actor, jId);
        let parentStarsHtml = "";
        if (awardedStars > 0) {
          let starIcons = "";
          for (let s = 0; s < awardedStars; s++) {
            starIcons += `<i class="fa-solid fa-star" style="color:#facc15; font-size:10px; margin:0 1px;"></i>`;
          }
          parentStarsHtml = `
            <div style="margin-top:3px; display:inline-flex; align-items:center; gap:3px; background:rgba(250,204,21,0.1); border:1px solid rgba(250,204,21,0.3); padding:2px 6px; border-radius:12px;" title="${awardedStars} Job Speciali Sbloccati">
              ${starIcons}
            </div>
          `;
        }
        levelDisplayHtml = `
          <div style="font-size:10px; color:#38bdf8; font-weight:bold; margin-bottom:2px;">Livello ${currentLv} / ${maxLvl} | ⭐ ${st.prestige || 0} Prestige</div>
          ${parentStarsHtml}
        `;
      }

      let actionBtnHtml = "";
      if (isSpecial && !isMaster && !isSpecUnlocked && reqCheck.ok) {
        actionBtnHtml = `
          <button type="button" class="fvtt-btn btn-direct-unlock" data-job="${jId}" style="margin-top:6px; font-size:9px; padding:2px 8px; background:linear-gradient(180deg,#7c3aed 0%,#5b21b6 100%) !important; border-color:#c084fc !important;">
            <i class="fa-solid fa-star" style="color:#facc15;"></i> Sblocca Ora
          </button>
        `;
      }

      if (isMaster && !isMasterSelected && selectedMasterJobs.length < 3 && reqCheck.ok) {
        actionBtnHtml = `
          <button type="button" class="fvtt-btn btn-master-select" data-job="${jId}" style="margin-top:7px; font-size:9px; padding:4px 9px; background:linear-gradient(180deg,#b91c1c 0%,#7f1d1d 100%) !important; border-color:#f87171 !important;">
            <i class="fa-solid fa-crown"></i> Scegli Master Job
          </button>
        `;
      }

      const lockBadge = isLocked && !actionBtnHtml
        ? `<div style="margin-top:6px; font-size:9px; color:${isMaster ? '#fca5a5' : '#f87171'}; background:${isMaster ? 'rgba(127,29,29,.16)' : 'rgba(248,113,113,.1)'}; border:1px solid ${isMaster ? '#7f1d1d' : 'rgba(248,113,113,.3)'}; padding:3px 6px; border-radius:4px;"><i class="fa-solid fa-lock"></i> ${lockReason}</div>`
        : actionBtnHtml;

      const cardClasses = `fvtt-job-card${isMaster ? ' extra-master-job-card' : ''}`;
      const borderColor = isMaster
        ? (isMasterSelected ? '#dc2626' : '#7f1d1d')
        : (isLocked && !actionBtnHtml ? '#475569' : '#334155');
      const cardBg = isMaster ? '#220d12' : '#1e293b';
      const clickable = !isLocked || !!actionBtnHtml;

      const cardHtml = `
        <div class="${cardClasses}" data-job="${jId}" data-name="${j.name}" data-master="${isMaster ? '1' : '0'}" style="background:${cardBg}; border:2px solid ${borderColor}; border-radius:10px; padding:12px 8px; text-align:center; cursor:${clickable ? 'pointer' : 'not-allowed'}; opacity:${isLocked && !actionBtnHtml ? '0.72' : '1'}; transition:all .2s;">
          <i class="fa-solid ${j.icon || 'fa-briefcase'}" style="font-size:24px; color:${isMaster ? '#f87171' : (j.color || '#f59e0b')}; margin-bottom:6px;"></i>
          <div style="font-weight:bold; font-size:14px; color:${isMaster ? '#fecaca' : '#f3f4f6'}; margin-bottom:2px;">${j.name}</div>
          ${levelDisplayHtml}
          <div style="font-size:10px; color:${isMaster ? '#d1a3aa' : '#94a3b8'}; line-height:1.3; margin-top:4px;">${j.desc || ''}</div>
          ${lockBadge}
        </div>
      `;

      if (isMaster) masterCardsHtml += cardHtml;
      else if (isSpecial) specialCardsHtml += cardHtml;
      else normalCardsHtml += cardHtml;
    }

    const masterSection = hasMasterCertificate ? `
      <div class="extra-jobs-section-title" style="color:#f87171; margin-top:11px; border-bottom-color:#7f1d1d;">
        <i class="fa-solid fa-crown"></i> Master Job
        <span style="margin-left:auto;font-size:9px;color:#fca5a5;background:rgba(127,29,29,.18);border:1px solid #7f1d1d;padding:2px 7px;border-radius:10px;">${selectedMasterJobs.length}/3 selezionati</span>
      </div>
      <div style="font-size:9px;color:#94a3b8;margin:-2px 0 3px 0;">Visibili grazie a <b style="color:#fca5a5;">Attestato da master</b>. Puoi possedere al massimo 3 Master Job.</div>
      <div class="extra-jobs-grid">${masterCardsHtml || '<div style="color:#64748b;font-size:11px;">Nessun Master Job configurato.</div>'}</div>
    ` : '';

    const htmlContent = `
      <div style="padding:12px; background:#0f172a; color:#f3f4f6; font-family:'Inter',sans-serif; display:flex; flex-direction:column; gap:8px; max-height:75vh; overflow-y:auto;">
        <h3 style="margin:0; font-size:15px; color:#f59e0b; text-align:center; display:flex; align-items:center; justify-content:center; gap:6px;">
          <i class="fa-solid fa-briefcase"></i> Scegli Mestiere: ${actor.name}
        </h3>

        <div class="extra-jobs-section-title"><i class="fa-solid fa-hammer"></i> Mestieri Principali</div>
        <div class="extra-jobs-grid">${normalCardsHtml || '<div style="color:#64748b;font-size:11px;">Nessun mestiere principale.</div>'}</div>

        <div class="extra-jobs-section-title" style="color:#06b6d4;margin-top:10px;"><i class="fa-solid fa-star"></i> Job Speciali & Specializzazioni (Max 5 Stelle)</div>
        <div class="extra-jobs-grid">${specialCardsHtml || '<div style="color:#64748b;font-size:11px;">Nessun job speciale.</div>'}</div>

        ${masterSection}
      </div>
    `;

    const renderFn = typeof renderUniversalDialog === "function"
      ? renderUniversalDialog
      : (opts) => new Dialog({ title: opts.title, content: opts.content, buttons: {} }).render(true);

    renderFn({
      title: `Mestieri - ${actor.name}`,
      content: htmlContent,
      width: 620,
      height: 620,
      renderCB: (root, dialogInst) => {
        root.querySelectorAll('.btn-direct-unlock').forEach(btn => {
          btn.onclick = async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const specSlug = btn.getAttribute('data-job');
            const specCfg = jobsConfig[specSlug];
            if (!specCfg) return;

            const check = await checkJobRequirementsForActor(actor, specCfg, 1);
            if (!check.ok) {
              ui.notifications.warn(`⚠️ Impossibile sbloccare ${specCfg.name}: ${check.errors.join(' • ')}`);
              return;
            }

            unlockedJobsWorld[specSlug] = true;
            unlockedJobsCacca[specSlug] = true;
            await actor.setFlag("world", "craftingUnlockedJobs", unlockedJobsWorld);
            await actor.setFlag("cacca", "craftingUnlockedJobs", unlockedJobsCacca);

            const specStats = (await actor.getFlag("world", `craftingStats_${specSlug}`)) || { level: 1, exp: 0, prestige: 0 };
            specStats.unlocked = true;
            specStats.exp = 0;
            await actor.setFlag("world", `craftingStats_${specSlug}`, specStats);

            ui.notifications.info(`🎉 ${actor.name} ha sbloccato ${specCfg.name}!`);
            if (dialogInst && typeof dialogInst.close === "function") dialogInst.close();
            openJobSelectionDialog(actor);
          };
        });

        root.querySelectorAll('.btn-master-select').forEach(btn => {
          btn.onclick = async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const masterSlug = btn.getAttribute('data-job');
            const masterCfg = jobsConfig[masterSlug];
            if (!masterCfg) return;

            const check = await checkJobRequirementsForActor(actor, masterCfg, 1);
            if (!check.ok) {
              ui.notifications.warn(`⚠️ Requisiti non soddisfatti: ${check.errors.join(' • ')}`);
              return;
            }

            const result = await selectMasterJobForActor(actor, masterSlug);
            if (!result.ok) {
              ui.notifications.warn(`⚠️ ${result.reason}`);
              return;
            }

            ui.notifications.info(`👑 ${actor.name} ha scelto il Master Job "${masterCfg.name}" (${result.selected.length}/3).`);
            ChatMessage.create({
              speaker: ChatMessage.getSpeaker({ actor }),
              content: `👑 <b>${actor.name}</b> ha ottenuto il Master Job <b style="color:#ef4444;">${masterCfg.name}</b>. <span style="color:#94a3b8;">(${result.selected.length}/3 Master Job)</span>`
            });

            if (dialogInst && typeof dialogInst.close === "function") dialogInst.close();
            openJobSelectionDialog(actor);
          };
        });

        root.querySelectorAll('.fvtt-job-card').forEach(card => {
          card.onclick = async (e) => {
            if (e.target.closest('.btn-direct-unlock, .btn-master-select')) return;

            const jobId = card.getAttribute('data-job');
            const jobConfig = jobsConfig[jobId];
            if (!jobConfig) return;

            const isSpecial = !!(jobConfig.specialJob || jobConfig.progressionType === "prestige_only");
            const isMaster = isMasterJobConfig(jobConfig);
            const isSpecUnlocked = !!(unlockedJobsWorld[jobId] || unlockedJobsCacca[jobId]);

            if (isMaster) {
              if (!actorHasMasterCertificate(actor)) {
                ui.notifications.warn('⚠️ Serve "Attestato da master" nell’inventario.');
                return;
              }
              const currentMasters = await getSelectedMasterJobs(actor);
              if (!currentMasters.includes(jobId)) {
                ui.notifications.warn(currentMasters.length >= 3
                  ? "⚠️ Hai già raggiunto il limite di 3 Master Job."
                  : "⚠️ Prima devi scegliere questo Master Job con il pulsante dedicato.");
                return;
              }
            }

            if (isSpecial && !isMaster && !isSpecUnlocked) {
              ui.notifications.warn(`⚠️ Questo job è bloccato: ${jobConfig.unlockText || "Richiede sblocco specializzazione!"}`);
              return;
            }

            const reqCheck = await checkJobRequirementsForActor(actor, jobConfig, 1);
            if (!reqCheck.ok) {
              ui.notifications.warn(`⚠️ Requisiti non soddisfatti: ${reqCheck.errors.join(' • ')}`);
              return;
            }

            if (dialogInst && typeof dialogInst.close === 'function') dialogInst.close();
            if (typeof openCraftingWorkbench === "function") await openCraftingWorkbench(actor, jobId, jobConfig.name);
            else ui.notifications.error("Errore: Impossibile aprire il banco da lavoro.");
          };
        });
      }
    });
  };

  window.openJobSelectionDialog = customOpenJobSelectionDialog;
  if (game.craftingModule) game.craftingModule.openJobSelectionDialog = customOpenJobSelectionDialog;
}

/**
 * 4. PANNELLO IMPOSTAZIONI AVANZATO (ApplicationV2)
 */
const { ApplicationV2 } = foundry.applications?.api || {};

class ExtraJobsSettingsApp extends (ApplicationV2 || FormApplication) {
  static DEFAULT_OPTIONS = {
    id: "extra-jobs-settings-v2",
    classes: ["extra-jobs-window"],
    window: {
      title: "⚙️ Pannello di Configurazione Extra Jobs",
      resizable: true,
      icon: "fas fa-cogs"
    },
    position: {
      width: 740,
      height: 640
    }
  };

  static get defaultOptions() {
    if (super.defaultOptions) {
      return foundry.utils.mergeObject(super.defaultOptions, {
        id: "extra-jobs-settings-v2",
        title: "⚙️ Pannello di Configurazione Extra Jobs",
        width: 740,
        height: 640,
        resizable: true,
        closeOnSubmit: true
      });
    }
    return {};
  }

  constructor(options = {}) {
    super(options);
    this.currentTab = "tab-requirements";
    this.jobsConfig = getJobsConfig();
    this.thresholdsConfig = getThresholdsConfig();
    const actors = game.actors ? game.actors.filter(a => a.type === "character" || a.hasPlayerOwner) : [];
    this.selectedActorId = actors.length > 0 ? actors[0].id : null;
    this.selectedJobKey = Object.keys(this.jobsConfig)[0] || "fabbro";
    this.selectedLevelTab = 1; // Selettore Livello 1-10 per i requisiti
  }

  async _renderHTML(context, options) {
    injectExtraJobsCSS();
    this.jobsConfig = getJobsConfig();
    this.thresholdsConfig = getThresholdsConfig();
    const div = document.createElement("div");
    div.className = "extra-jobs-v2-container";
    div.style.cssText = "padding:12px; background:#0f172a; color:#f3f4f6; font-family:'Inter', sans-serif; box-sizing:border-box; display:flex; flex-direction:column; gap:10px; height:100%; overflow:hidden;";
    div.innerHTML = this._buildContentHTML();
    return div;
  }

  _replaceHTML(result, content, options) {
    content.replaceChildren(...result.children);
    this._activateListeners(content);
  }

  render(force, options) {
    if (!ApplicationV2) return this;
    return super.render(force, options);
  }

  _buildContentHTML() {
    const actors = game.actors ? game.actors.filter(a => a.type === "character" || a.hasPlayerOwner) : [];
    
    let tabButtonsHtml = `
      <div style="display:flex; gap:4px; border-bottom:1px solid #334155; padding-bottom:8px; margin-bottom:6px; flex-wrap:wrap;">
        <button type="button" class="fvtt-btn ${this.currentTab === 'tab-requirements' ? 'active' : ''}" id="btn-tab-req"><i class="fa-solid fa-list-check"></i> Requisiti & Competenze per Livello</button>
        <button type="button" class="fvtt-btn ${this.currentTab === 'tab-thresholds' ? 'active' : ''}" id="btn-tab-thresh"><i class="fa-solid fa-chart-line"></i> Soglie Livelli (EXP/Pres)</button>
        <button type="button" class="fvtt-btn ${this.currentTab === 'tab-actors' ? 'active' : ''}" id="btn-tab-actors"><i class="fa-solid fa-user-gear"></i> Statistiche Personaggi</button>
        <button type="button" class="fvtt-btn ${this.currentTab === 'tab-import-export' ? 'active' : ''}" id="btn-tab-io"><i class="fa-solid fa-file-import"></i> Import / Export</button>
      </div>
    `;

    let mainBodyHtml = "";

    // TAB 1: REQUISITI PER OGNI SINGOLO LIVELLO
    if (this.currentTab === "tab-requirements") {
      const job = this.jobsConfig[this.selectedJobKey] || {};
      const reqJobs = job.requiredJobs || {};
      const isMasterSettingsJob = !!job.masterJob;
      const isSpecialSettingsJob = !!job.specialJob && !isMasterSettingsJob;
      const masterJobsForSettings = Object.entries(this.jobsConfig).filter(([, v]) => v.masterJob);
      const specialJobsForSettings = Object.entries(this.jobsConfig).filter(([, v]) => v.specialJob && !v.masterJob);

      job.levelRequirements = job.levelRequirements || {};
      const currentLevelData = job.levelRequirements[this.selectedLevelTab] || { stats: {}, proficiencies: [] };
      const reqStats = currentLevelData.stats || {};
      const profs = currentLevelData.proficiencies || [];
      const availableSpecializations = Object.entries(this.jobsConfig).filter(([k, v]) =>
        v.specialJob && v.requiredJobs && Number(v.requiredJobs[this.selectedJobKey] || 0) > 0
      );
      const isFiveStarSettingsJob = isSpecialSettingsJob || isMasterSettingsJob;
      const starRequirementsEditorHtml = isFiveStarSettingsJob ? `
        <div style="background:#020617;padding:7px;border-radius:6px;border:1px solid ${isMasterSettingsJob ? '#991b1b' : '#334155'};">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;">
            <label style="font-size:10px;font-weight:bold;color:${isMasterSettingsJob ? '#f87171' : '#38bdf8'};">Configura requisiti della Stella:</label>
            <select id="select-edit-level" class="fvtt-input" style="padding:2px 6px;font-size:10px;font-weight:bold;">
              ${[1,2,3,4,5].map(l => `<option value="${l}" ${l === this.selectedLevelTab ? 'selected' : ''}>${l}★ ${l === 1 ? '(Base)' : ''}</option>`).join('')}
            </select>
          </div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;">
            <div><label style="font-size:9px;color:#94a3b8;">FOR:</label><input type="number" id="req-str" min="0" value="${reqStats.str || 0}" class="fvtt-input" style="width:100%;padding:1px;"></div>
            <div><label style="font-size:9px;color:#94a3b8;">DES:</label><input type="number" id="req-dex" min="0" value="${reqStats.dex || 0}" class="fvtt-input" style="width:100%;padding:1px;"></div>
            <div><label style="font-size:9px;color:#94a3b8;">COS:</label><input type="number" id="req-con" min="0" value="${reqStats.con || 0}" class="fvtt-input" style="width:100%;padding:1px;"></div>
            <div><label style="font-size:9px;color:#94a3b8;">INT:</label><input type="number" id="req-int" min="0" value="${reqStats.int || 0}" class="fvtt-input" style="width:100%;padding:1px;"></div>
            <div><label style="font-size:9px;color:#94a3b8;">SAG:</label><input type="number" id="req-wis" min="0" value="${reqStats.wis || 0}" class="fvtt-input" style="width:100%;padding:1px;"></div>
            <div><label style="font-size:9px;color:#94a3b8;">CAR:</label><input type="number" id="req-cha" min="0" value="${reqStats.cha || 0}" class="fvtt-input" style="width:100%;padding:1px;"></div>
          </div>
        </div>
        <div style="background:#020617;padding:7px;border-radius:6px;border:1px solid ${isMasterSettingsJob ? '#991b1b' : '#334155'};">
          <label style="font-size:10px;font-weight:bold;color:${isMasterSettingsJob ? '#fb7185' : '#a855f7'};display:block;margin-bottom:5px;">Competenze / TS / Maestrie per ${this.selectedLevelTab}★:</label>
          <div style="display:grid;grid-template-columns:150px minmax(0,1fr) 110px;gap:8px;align-items:center;margin-bottom:7px;">
            <select id="add-prof-type" class="fvtt-input" style="padding:6px 8px;font-size:11px;min-height:32px;">
              <option value="skill">Competenza Abilità</option><option value="save">Competenza TS</option><option value="mastery">Maestria Abilità</option>
            </select>
            <select id="add-prof-key" class="fvtt-input" style="width:100%;padding:6px 8px;font-size:11px;min-height:32px;">${Object.entries(DND5E_SKILLS).map(([k,v]) => `<option value="${k}">${v}</option>`).join('')}</select>
            <button type="button" id="btn-add-prof" class="fvtt-btn" style="padding:7px 12px;min-height:34px;min-width:110px;font-size:11px;"><i class="fa-solid fa-plus"></i> Aggiungi</button>
          </div>
          <div style="display:flex;flex-direction:column;gap:5px;max-height:100px;overflow-y:auto;">
            ${profs.length ? profs.map((p,i) => `<div style="font-size:10px;background:#1e293b;border:1px solid ${isMasterSettingsJob ? '#991b1b' : '#a855f7'};border-radius:5px;padding:5px 7px;display:flex;align-items:center;justify-content:space-between;gap:8px;"><span>${p.type === 'skill' ? '🎯 Competenza' : (p.type === 'save' ? '🛡️ Tiro Salvezza' : '⭐ Maestria')}: <b>${p.label || p.key}</b></span><button type="button" class="rem-prof-btn fvtt-btn" data-idx="${i}" style="background:#7f1d1d !important;border-color:#ef4444 !important;padding:4px 8px;min-width:78px;font-size:9px;"><i class="fa-solid fa-trash"></i> Rimuovi</button></div>`).join('') : '<div style="font-size:10px;color:#64748b;">Nessun requisito configurato per questa stella.</div>'}
          </div>
        </div>` : "";

      mainBodyHtml = `
        <div style="display:flex; gap:12px; height:470px;">
          <!-- Lista Mestieri -->
          <div style="width:180px; background:#111827; border:1px solid #334155; border-radius:8px; padding:6px; overflow-y:auto; display:flex; flex-direction:column; gap:4px;">
            <label style="font-size:10px; font-weight:bold; color:#f59e0b; margin-bottom:4px;">Mestieri Configurate:</label>
            ${Object.entries(this.jobsConfig).map(([k, v]) => `
              <button type="button" class="fvtt-btn select-job-btn ${k === this.selectedJobKey ? 'active' : ''}" data-key="${k}" style="text-align:left; justify-content:flex-start; padding:6px 8px; font-size:11px;">
                <i class="fa-solid ${v.icon || 'fa-briefcase'}" style="color:${v.color || '#f59e0b'};"></i> ${v.name}
              </button>
            `).join('')}
          </div>

          <!-- Dettaglio Mestiere Selezionato -->
          <div style="flex:1; background:#1e293b; border:1px solid #334155; border-radius:8px; padding:12px; overflow-y:auto; display:flex; flex-direction:column; gap:8px;">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; padding-bottom:4px;">
              <span style="font-size:14px; font-weight:bold; color:${job.color || '#f59e0b'};"><i class="fa-solid ${job.icon || 'fa-briefcase'}"></i> ${job.name}</span>
              <span style="font-size:10px; color:#94a3b8;">ID: ${this.selectedJobKey}</span>
            </div>

            <div style="display:flex; gap:10px; align-items:center; background:#020617; padding:6px 8px; border-radius:6px; border:1px solid #334155;">
              <label style="font-size:10px; font-weight:bold; color:#f59e0b;">Tipo Progressione:</label>
              <select id="job-progression-type" class="fvtt-input" style="flex:1; padding:2px;" ${isMasterSettingsJob ? 'disabled' : ''}>
                <option value="exp_prestige" ${job.progressionType === 'exp_prestige' ? 'selected' : ''}>EXP + Prestigio (Normale - Max 10)</option>
                <option value="prestige_only" ${job.progressionType === 'prestige_only' || job.specialJob || isMasterSettingsJob ? 'selected' : ''}>${isMasterSettingsJob ? 'Master Job - Solo Prestigio (5 Stelle)' : 'Solo Prestigio (Job Speciale - Max 5 Stelle)'}</option>
              </select>
            </div>

            ${isMasterSettingsJob ? `
              <!-- CONFIGURAZIONE SBLOCCO MASTER JOB -->
              <div style="background:#16080b; padding:9px; border-radius:6px; border:1px solid #991b1b;">
                <label style="font-size:10px; font-weight:bold; color:#f87171; display:block; margin-bottom:5px;"><i class="fa-solid fa-crown"></i> Job Speciali richiesti a 5 stelle</label>
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:7px; background:#0f0507; border:1px solid #7f1d1d; border-radius:5px; padding:5px 7px;">
                  <label style="font-size:9px;color:#fca5a5;font-weight:bold;">Modalità requisito:</label>
                  <select id="master-special-mode" class="fvtt-input" style="flex:1;padding:3px 6px;font-size:10px;">
                    <option value="any" ${(job.requiredSpecialMode || 'any') === 'any' ? 'selected' : ''}>Basta UNO dei Job Speciali selezionati a 5★</option>
                    <option value="all" ${job.requiredSpecialMode === 'all' ? 'selected' : ''}>Servono TUTTI i Job Speciali selezionati a 5★</option>
                  </select>
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
                  ${specialJobsForSettings.map(([k, v]) => `
                    <label style="display:flex;align-items:center;gap:6px;background:#1e1114;border:1px solid #5f1c24;border-radius:5px;padding:5px 7px;font-size:10px;color:#fecaca;cursor:pointer;">
                      <input type="checkbox" class="master-req-special" data-key="${k}" ${(job.requiredSpecialJobs || {})[k] ? 'checked' : ''}>
                      <i class="fa-solid ${v.icon || 'fa-star'}" style="color:${v.color || '#f87171'}"></i> ${v.name} <b style="margin-left:auto;color:#f87171;">5★</b>
                    </label>
                  `).join('')}
                </div>
                <div style="font-size:9px;color:#fca5a5;margin-top:6px;">Il personaggio deve inoltre possedere <b>Attestato da master</b> e avere un Punto Master libero.</div>
              </div>
              ${starRequirementsEditorHtml}
            ` : isSpecialSettingsJob ? `
              <!-- SBLOCCO PER JOB SPECIALE -->
              <div style="background:#020617; padding:8px; border-radius:6px; border:1px solid #06b6d4;">
                <label style="font-size:10px; font-weight:bold; color:#06b6d4; display:block; margin-bottom:4px;">Mestieri Richiesti per Sbloccare Questo Job Speciale:</label>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:6px;">
                  ${Object.entries(this.jobsConfig).filter(([k, v]) => !v.specialJob && !v.masterJob).map(([k, v]) => `
                    <div style="display:flex; align-items:center; justify-content:space-between; background:#1e293b; padding:4px 6px; border-radius:4px;">
                      <span style="font-size:10px; color:#f3f4f6;">${v.name}:</span>
                      <input type="number" id="req-job-${k}" min="0" max="10" value="${reqJobs[k] || 0}" class="fvtt-input" style="width:40px; text-align:center; padding:1px;" placeholder="Lv">
                    </div>
                  `).join('')}
                </div>
              </div>

              <div style="background:#111827; padding:8px; border-radius:6px; border:1px solid #ef4444;">
                <label style="font-size:10px;font-weight:bold;color:#f87171;display:block;margin-bottom:5px;"><i class="fa-solid fa-crown"></i> Master Job collegati a ${job.name} quando raggiunge 5★</label>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
                  ${masterJobsForSettings.map(([mk, mv]) => `
                    <label style="display:flex;align-items:center;gap:6px;background:#220d12;border:1px solid #7f1d1d;border-radius:5px;padding:5px 7px;font-size:9px;color:#fecaca;cursor:pointer;">
                      <input type="checkbox" class="special-unlocks-master" data-key="${mk}" ${(mv.requiredSpecialJobs || {})[this.selectedJobKey] ? 'checked' : ''}>
                      <i class="fa-solid ${mv.icon || 'fa-crown'}" style="color:#f87171;"></i> ${mv.name}
                    </label>
                  `).join('')}
                </div>
                <div style="font-size:9px;color:#94a3b8;margin-top:5px;">Spuntando un Master Job, questa specializzazione diventa uno dei suoi requisiti a <b style="color:#facc15;">5 stelle</b>.</div>
              </div>
              ${starRequirementsEditorHtml}
            ` : `
              <!-- SELETTORE LIVELLO DA EDITARE (1 - 10) -->
              <div style="background:#020617; padding:6px; border-radius:6px; border:1px solid #334155;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                  <label style="font-size:10px; font-weight:bold; color:#38bdf8;">Seleziona Livello da Configurare:</label>
                  <select id="select-edit-level" class="fvtt-input" style="padding:2px; font-size:10px; font-weight:bold;">
                    ${[1,2,3,4,5,6,7,8,9,10].map(l => `<option value="${l}" ${l === this.selectedLevelTab ? 'selected' : ''}>Livello ${l} ${l === 1 ? '(Base Sblocco)' : ''}</option>`).join('')}
                  </select>
                </div>

                <!-- STATISTICHE MINIME PER IL LIVELLO SELEZIONATO -->
                <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:4px; margin-top:6px;">
                  <div><label style="font-size:9px; color:#94a3b8;">FOR:</label> <input type="number" id="req-str" min="0" value="${reqStats.str || 0}" class="fvtt-input" style="width:100%; padding:1px;"></div>
                  <div><label style="font-size:9px; color:#94a3b8;">DES:</label> <input type="number" id="req-dex" min="0" value="${reqStats.dex || 0}" class="fvtt-input" style="width:100%; padding:1px;"></div>
                  <div><label style="font-size:9px; color:#94a3b8;">COS:</label> <input type="number" id="req-con" min="0" value="${reqStats.con || 0}" class="fvtt-input" style="width:100%; padding:1px;"></div>
                  <div><label style="font-size:9px; color:#94a3b8;">INT:</label> <input type="number" id="req-int" min="0" value="${reqStats.int || 0}" class="fvtt-input" style="width:100%; padding:1px;"></div>
                  <div><label style="font-size:9px; color:#94a3b8;">SAG:</label> <input type="number" id="req-wis" min="0" value="${reqStats.wis || 0}" class="fvtt-input" style="width:100%; padding:1px;"></div>
                  <div><label style="font-size:9px; color:#94a3b8;">CAR:</label> <input type="number" id="req-cha" min="0" value="${reqStats.cha || 0}" class="fvtt-input" style="width:100%; padding:1px;"></div>
                </div>
              </div>

              <!-- COMPETENZE & MAESTRIE PER IL LIVELLO SELEZIONATO -->
              <div style="background:#020617; padding:6px; border-radius:6px; border:1px solid #334155;">
                <label style="font-size:10px; font-weight:bold; color:#a855f7; display:block; margin-bottom:4px;">Competenze/Maestrie Richieste per Livello ${this.selectedLevelTab}:</label>
                <div style="display:grid; grid-template-columns: 150px minmax(0, 1fr) 110px; gap:8px; align-items:center; margin-bottom:8px;">
                  <select id="add-prof-type" class="fvtt-input" style="padding:6px 8px; font-size:11px; min-height:32px;">
                    <option value="skill">Competenza Abilità</option>
                    <option value="save">Competenza TS</option>
                    <option value="mastery">Maestria Abilità</option>
                  </select>
                  <select id="add-prof-key" class="fvtt-input" style="width:100%; padding:6px 8px; font-size:11px; min-height:32px;">
                    ${Object.entries(DND5E_SKILLS).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}
                  </select>
                  <button type="button" id="btn-add-prof" class="fvtt-btn" style="padding:7px 12px; min-height:34px; min-width:110px; font-size:11px;"><i class="fa-solid fa-plus"></i> Aggiungi</button>
                </div>

                <div id="prof-list-container" style="display:flex; flex-direction:column; gap:5px; max-height:120px; overflow-y:auto;">
                  ${profs.length ? profs.map((p, i) => `
                    <div style="font-size:10px; background:#1e293b; border:1px solid #a855f7; border-radius:5px; padding:5px 7px; display:flex; align-items:center; justify-content:space-between; gap:8px;">
                      <span>${p.type === 'skill' ? '🎯 Competenza' : (p.type === 'save' ? '🛡️ Tiro Salvezza' : '⭐ Maestria')}: <b>${p.label || p.key}</b></span>
                      <button type="button" class="rem-prof-btn fvtt-btn" data-idx="${i}" style="background:#7f1d1d !important; border-color:#ef4444 !important; padding:4px 8px; min-width:78px; font-size:9px;"><i class="fa-solid fa-trash"></i> Rimuovi</button>
                    </div>
                  `).join('') : '<div style="font-size:10px; color:#64748b; padding:5px 2px;">Nessun requisito di competenza configurato per questo livello.</div>'}
                </div>
              </div>

              ${this.selectedLevelTab === 10 ? `
                <div style="background:#111827; padding:8px; border-radius:6px; border:1px solid #facc15;">
                  <label style="font-size:10px; font-weight:bold; color:#facc15; display:block; margin-bottom:5px;">⭐ Requisito Livello 10: specializzazione al Livello 5</label>
                  ${availableSpecializations.length ? `
                    <select id="req-specialization-lv5" class="fvtt-input" style="width:100%; padding:6px 8px; font-size:11px;">
                      <option value="">-- Scegli una specializzazione disponibile --</option>
                      ${availableSpecializations.map(([k, v]) => `<option value="${k}" ${currentLevelData.requiredSpecialization === k ? 'selected' : ''}>${v.name}</option>`).join('')}
                    </select>
                    <div style="font-size:9px; color:#94a3b8; margin-top:4px;">Per raggiungere il Livello 10, il personaggio dovrà portare la specializzazione scelta al Livello 5.</div>
                  ` : `<div style="font-size:10px; color:#f87171;">Nessuna specializzazione collegata a ${job.name}. Creane/collegane una nei Job Speciali.</div>`}
                </div>
              ` : ''}

              <div style="display:flex; justify-content:space-between; align-items:center; background:#020617; padding:6px 8px; border-radius:6px; border:1px solid #334155;">
                <label style="font-size:10px; font-weight:bold; color:#a855f7;">Livello Sblocco Tasti Job Speciali:</label>
                <input type="number" id="job-spec-level" min="1" max="10" value="${job.specUnlockLevel || 7}" class="fvtt-input" style="width:50px; text-align:center; padding:1px;">
              </div>
            `}

            <div>
              <label style="font-size:10px; font-weight:bold; color:#facc15; display:block; margin-bottom:2px;">Testo Informativo Sblocco:</label>
              <input type="text" id="job-unlock-text" value="${job.unlockText || ''}" class="fvtt-input" style="width:100%; padding:3px;">
            </div>

            <button type="button" id="btn-save-job-config" class="fvtt-btn" style="margin-top:auto; background:#10b981 !important; border-color:#34d399 !important;"><i class="fa-solid fa-floppy-disk"></i> Salva Modifiche Mestiere</button>
          </div>
        </div>
      `;
    }

    else if (this.currentTab === "tab-thresholds") {
      let normalRowsHtml = "";
      for (let lv = 2; lv <= 10; lv++) {
        const t = this.thresholdsConfig.normal[lv] || { expReq: 0, prestigeReq: 0 };
        normalRowsHtml += `
          <div style="display:flex; align-items:center; justify-content:space-between; background:#1e293b; padding:4px 8px; border-radius:4px; font-size:11px;">
            <span style="font-weight:bold; color:#38bdf8;">Livello ${lv}:</span>
            <div style="display:flex; gap:8px; align-items:center;">
              <label style="font-size:9px; color:#f59e0b;">EXP Req:</label>
              <input type="number" class="fvtt-input norm-thresh-exp" data-lv="${lv}" min="0" value="${t.expReq || 0}" style="width:65px; text-align:center; padding:1px;">
              <label style="font-size:9px; color:#facc15;">⭐ Pres Req:</label>
              <input type="number" class="fvtt-input norm-thresh-pres" data-lv="${lv}" min="0" value="${t.prestigeReq || 0}" style="width:50px; text-align:center; padding:1px;">
            </div>
          </div>
        `;
      }

      let specialRowsHtml = "";
      for (let lv = 2; lv <= 5; lv++) {
        const t = this.thresholdsConfig.special[lv] || { prestigeReq: 0 };
        specialRowsHtml += `
          <div style="display:flex; align-items:center; justify-content:space-between; background:#1e293b; padding:4px 8px; border-radius:4px; font-size:11px;">
            <span style="font-weight:bold; color:#facc15;">Livello ${lv} (⭐ ${lv} Stelle):</span>
            <div style="display:flex; gap:8px; align-items:center;">
              <label style="font-size:9px; color:#facc15;">⭐ Pres Req:</label>
              <input type="number" class="fvtt-input spec-thresh-pres" data-lv="${lv}" min="0" value="${t.prestigeReq || 0}" style="width:60px; text-align:center; padding:1px;">
            </div>
          </div>
        `;
      }

      mainBodyHtml = `
        <div style="display:flex; gap:12px; height:460px;">
          <div style="flex:1; background:#020617; border:1px solid #334155; border-radius:8px; padding:8px; display:flex; flex-direction:column; gap:6px; overflow-y:auto;">
            <label style="font-size:11px; font-weight:bold; color:#38bdf8; border-bottom:1px solid #334155; padding-bottom:3px;">Mestieri Principali (Livelli 2-10)</label>
            ${normalRowsHtml}
          </div>

          <div style="flex:1; background:#020617; border:1px solid #334155; border-radius:8px; padding:8px; display:flex; flex-direction:column; gap:6px; overflow-y:auto;">
            <label style="font-size:11px; font-weight:bold; color:#facc15; border-bottom:1px solid #334155; padding-bottom:3px;">Job Speciali (Stelle 2-5)</label>
            ${specialRowsHtml}
            <button type="button" id="btn-save-thresholds" class="fvtt-btn" style="margin-top:auto; background:#10b981 !important; border-color:#34d399 !important;"><i class="fa-solid fa-floppy-disk"></i> Salva Soglie Livelli</button>
          </div>
        </div>
      `;
    }

    else if (this.currentTab === "tab-actors") {
      if (!this.selectedActorId && actors.length > 0) this.selectedActorId = actors[0].id;
      const targetActor = game.actors ? game.actors.get(this.selectedActorId) : null;

      let rowsHtml = "";
      let masterManagementHtml = "";
      if (targetActor) {
        const rawMasters = targetActor.getFlag("world", "craftingMasterJobs") || [];
        const selectedMasters = (Array.isArray(rawMasters) ? rawMasters : Object.entries(rawMasters).filter(([,v]) => !!v).map(([k]) => k))
          .filter(k => this.jobsConfig[k]?.masterJob)
          .slice(0, 3);
        const masterPointsUsed = selectedMasters.length;
        const masterPointsAvailable = Math.max(0, 3 - masterPointsUsed);
        if (game.user.isGM) {
          masterManagementHtml = `
            <div style="background:#18090c;border:1px solid #991b1b;border-radius:7px;padding:8px;display:flex;flex-direction:column;gap:6px;">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
                <div style="font-size:11px;font-weight:900;color:#f87171;"><i class="fa-solid fa-crown"></i> Gestione Maestrie Master (solo DM)</div>
                <div style="font-size:9px;color:#fecaca;background:#2a0d12;border:1px solid #7f1d1d;border-radius:10px;padding:2px 7px;">Punti Master: <b>${masterPointsAvailable}</b> liberi • ${masterPointsUsed}/3 usati</div>
              </div>
              ${selectedMasters.length ? selectedMasters.map(k => { const cfg=this.jobsConfig[k]; return `
                <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;background:#220d12;border:1px solid #5f1c24;border-radius:5px;padding:5px 7px;">
                  <span style="font-size:10px;color:#fecaca;font-weight:bold;"><i class="fa-solid ${cfg?.icon || 'fa-crown'}" style="color:#f87171;"></i> ${cfg?.name || k}</span>
                  <button type="button" class="fvtt-btn btn-remove-master-job" data-job="${k}" style="background:#7f1d1d !important;border-color:#ef4444 !important;padding:4px 8px;font-size:9px;"><i class="fa-solid fa-rotate-left"></i> Togli e restituisci 1 punto</button>
                </div>`; }).join('') : '<div style="font-size:9px;color:#94a3b8;">Nessuna Maestria Master assegnata.</div>'}
              ${selectedMasters.length ? `<button type="button" id="btn-reset-master-jobs" class="fvtt-btn" style="background:#991b1b !important;border-color:#f87171 !important;font-size:9px;padding:5px 8px;"><i class="fa-solid fa-trash-arrow-up"></i> Rimuovi tutte le Maestrie e restituisci ${selectedMasters.length} Punti Master</button>` : ''}
            </div>`;
        }
        for (const [jId, j] of Object.entries(this.jobsConfig)) {
          const stats = targetActor.getFlag("world", `craftingStats_${jId}`) || { level: 1, exp: 0, prestige: 0 };
          const isSpecial = j.specialJob || j.progressionType === "prestige_only";

          rowsHtml += `
            <div style="background:#1e293b; border:1px solid #334155; border-radius:6px; padding:6px 10px; display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:bold; color:${j.color || '#f3f4f6'}; font-size:12px;"><i class="fa-solid ${j.icon || 'fa-briefcase'}"></i> ${j.name} ${isSpecial ? '(5 ⭐)' : ''}</span>
              <div style="display:flex; gap:8px; align-items:center;">
                <label style="font-size:9px; color:#38bdf8;">Lv:</label>
                <input type="number" id="actor-lv-${jId}" min="1" max="${isSpecial ? 5 : 10}" value="${Math.clamp(stats.level || 1, 1, isSpecial ? 5 : 10)}" class="fvtt-input" style="width:45px; text-align:center; padding:2px;">
                ${!isSpecial ? `
                  <label style="font-size:9px; color:#f59e0b;">EXP:</label>
                  <input type="number" id="actor-exp-${jId}" min="0" value="${stats.exp || 0}" class="fvtt-input" style="width:60px; text-align:center; padding:2px;">
                ` : ''}
                <label style="font-size:9px; color:#facc15;">⭐ Pres:</label>
                <input type="number" id="actor-pres-${jId}" min="0" value="${stats.prestige || 0}" class="fvtt-input" style="width:55px; text-align:center; padding:2px;">
              </div>
            </div>
          `;
        }
      }

      mainBodyHtml = `
        <div style="display:flex; flex-direction:column; gap:10px; height:460px;">
          <div style="display:flex; justify-content:space-between; align-items:center; background:#111827; padding:8px; border-radius:6px; border:1px solid #334155;">
            <label style="font-weight:bold; color:#f59e0b; font-size:11px;"><i class="fa-solid fa-user"></i> Seleziona Personaggio:</label>
            <select id="actor-select-dropdown" class="fvtt-input" style="min-width:200px; padding:3px;">
              ${actors.map(a => `<option value="${a.id}" ${a.id === this.selectedActorId ? 'selected' : ''}>${a.name}</option>`).join('')}
            </select>
          </div>

          ${masterManagementHtml}

          <div style="display:flex; flex-direction:column; gap:6px; overflow-y:auto; flex:1; padding-right:4px;">
            ${rowsHtml || '<div style="color:#64748b; text-align:center;">Nessun personaggio trovato.</div>'}
          </div>

          <button type="button" id="btn-save-actor-stats" class="fvtt-btn" style="background:#10b981 !important; border-color:#34d399 !important;"><i class="fa-solid fa-user-check"></i> Salva Statistiche Personaggio</button>
        </div>
      `;
    }

    else if (this.currentTab === "tab-import-export") {
      const fullExportData = { jobs: this.jobsConfig, thresholds: this.thresholdsConfig };

      mainBodyHtml = `
        <div style="display:flex; flex-direction:column; gap:10px; height:460px;">
          <p style="font-size:11px; color:#cbd5e1; margin:0;">
            Esporta o incolla la configurazione completa dei mestieri, requisiti, competenze e soglie di livello in formato JSON.
          </p>
          <textarea id="json-config-area" style="width:100%; flex:1; background:#020617; color:#f3f4f6; border:1px solid #334155; border-radius:6px; padding:8px; font-family:monospace; font-size:11px; resize:none;">${JSON.stringify(fullExportData, null, 2)}</textarea>
          
          <div style="display:flex; justify-content:space-between; gap:8px;">
            <button type="button" id="btn-reset-default-json" class="fvtt-btn" style="background:#ef4444 !important; border-color:#f87171 !important;"><i class="fa-solid fa-rotate-left"></i> Ripristina Default</button>
            <div style="display:flex; gap:6px;">
              <button type="button" id="btn-export-file-json" class="fvtt-btn" style="background:#0284c7 !important; border-color:#38bdf8 !important;"><i class="fa-solid fa-download"></i> Esporta File JSON</button>
              <button type="button" id="btn-import-apply-json" class="fvtt-btn" style="background:#10b981 !important; border-color:#34d399 !important;"><i class="fa-solid fa-upload"></i> Applica JSON</button>
            </div>
          </div>
        </div>
      `;
    }

    return `
      ${tabButtonsHtml}
      ${mainBodyHtml}
    `;
  }

  _activateListeners(root) {
    root.querySelector('#btn-tab-req')?.addEventListener('click', () => { this.currentTab = "tab-requirements"; this.render(true); });
    root.querySelector('#btn-tab-thresh')?.addEventListener('click', () => { this.currentTab = "tab-thresholds"; this.render(true); });
    root.querySelector('#btn-tab-actors')?.addEventListener('click', () => { this.currentTab = "tab-actors"; this.render(true); });
    root.querySelector('#btn-tab-io')?.addEventListener('click', () => { this.currentTab = "tab-import-export"; this.render(true); });

    root.querySelectorAll('.select-job-btn').forEach(btn => {
      btn.onclick = () => {
        this.selectedJobKey = btn.getAttribute('data-key');
        this.selectedLevelTab = 1;
        this.render(true);
      };
    });

    const levelSelect = root.querySelector('#select-edit-level');
    if (levelSelect) {
      levelSelect.onchange = (e) => {
        this.selectedLevelTab = parseInt(e.target.value) || 1;
        this.render(true);
      };
    }

    // Selettore Tipo Competenza
    const profTypeSelect = root.querySelector('#add-prof-type');
    const profKeySelect = root.querySelector('#add-prof-key');

    if (profTypeSelect && profKeySelect) {
      profTypeSelect.onchange = () => {
        const val = profTypeSelect.value;
        profKeySelect.innerHTML = "";
        if (val === "skill") {
          Object.entries(DND5E_SKILLS).forEach(([k, v]) => { profKeySelect.innerHTML += `<option value="${k}">${v}</option>`; });
        } else if (val === "save") {
          Object.entries(DND5E_ABILITIES).forEach(([k, v]) => { profKeySelect.innerHTML += `<option value="${k}">TS ${v}</option>`; });
        } else {
          Object.entries(DND5E_SKILLS).forEach(([k, v]) => { profKeySelect.innerHTML += `<option value="${k}">${v}</option>`; });
        }
      };
    }

    // Aggiungi Competenza al Livello Selezionato
    root.querySelector('#btn-add-prof')?.addEventListener('click', async () => {
      const job = this.jobsConfig[this.selectedJobKey];
      if (!job) return;

      job.levelRequirements = job.levelRequirements || {};
      job.levelRequirements[this.selectedLevelTab] = job.levelRequirements[this.selectedLevelTab] || { stats: {}, proficiencies: [] };
      const currentLevelProfs = job.levelRequirements[this.selectedLevelTab].proficiencies;

      const type = profTypeSelect?.value || "skill";
      const key = profKeySelect?.value || "arca";
      const label = profKeySelect?.options[profKeySelect.selectedIndex]?.text || key;

      if (!currentLevelProfs.some(p => p.type === type && p.key === key)) {
        currentLevelProfs.push({ type, key, label });
        await saveJobsConfig(this.jobsConfig);
        this.render(true);
      }
    });

    // Rimuovi Competenza dal Livello Selezionato
    root.querySelectorAll('.rem-prof-btn').forEach(btn => {
      btn.onclick = async () => {
        const idx = parseInt(btn.getAttribute('data-idx'));
        const job = this.jobsConfig[this.selectedJobKey];
        if (job && job.levelRequirements && job.levelRequirements[this.selectedLevelTab]) {
          job.levelRequirements[this.selectedLevelTab].proficiencies.splice(idx, 1);
          await saveJobsConfig(this.jobsConfig);
          this.render(true);
        }
      };
    });

    root.querySelector('#btn-save-job-config')?.addEventListener('click', async () => {
      const job = this.jobsConfig[this.selectedJobKey];
      if (!job) return;

      const isMasterJob = !!job.masterJob;
      const progType = root.querySelector('#job-progression-type')?.value || (isMasterJob ? "prestige_only" : "exp_prestige");

      if (isMasterJob) {
        job.progressionType = "prestige_only";
        job.specialJob = false;
        job.masterJob = true;
        job.maxLevel = 5;
        job.requiredSpecialJobs = {};
        root.querySelectorAll('.master-req-special').forEach(inp => {
          if (inp.checked) job.requiredSpecialJobs[inp.getAttribute('data-key')] = 5;
        });
        job.requiredSpecialMode = root.querySelector('#master-special-mode')?.value === 'all' ? 'all' : 'any';
      } else {
        job.progressionType = progType;
        job.specialJob = (progType === "prestige_only");
        job.masterJob = false;
        job.maxLevel = job.specialJob ? 5 : 10;
      }

      if (!isMasterJob && job.specialJob) {
        job.requiredJobs = job.requiredJobs || {};
        Object.keys(this.jobsConfig).forEach(k => {
          if (!this.jobsConfig[k].specialJob && !this.jobsConfig[k].masterJob) {
            const inp = root.querySelector(`#req-job-${k}`);
            if (inp) {
              const val = parseInt(inp.value) || 0;
              if (val > 0) job.requiredJobs[k] = val;
              else delete job.requiredJobs[k];
            }
          }
        });

        // Collegamenti Job Speciale -> Master Job a 5 stelle.
        for (const [masterKey, masterCfg] of Object.entries(this.jobsConfig)) {
          if (!masterCfg.masterJob) continue;
          masterCfg.requiredSpecialJobs = masterCfg.requiredSpecialJobs || {};
          const checkbox = root.querySelector(`.special-unlocks-master[data-key="${masterKey}"]`);
          if (checkbox?.checked) masterCfg.requiredSpecialJobs[this.selectedJobKey] = 5;
          else delete masterCfg.requiredSpecialJobs[this.selectedJobKey];
          masterCfg.requiredSpecialMode = masterCfg.requiredSpecialMode === "all" ? "all" : "any";
        }
      } else if (!isMasterJob) {
        job.levelRequirements = job.levelRequirements || {};
        job.levelRequirements[this.selectedLevelTab] = job.levelRequirements[this.selectedLevelTab] || { stats: {}, proficiencies: [] };
        
        job.levelRequirements[this.selectedLevelTab].stats = {
          str: parseInt(root.querySelector('#req-str')?.value) || 0,
          dex: parseInt(root.querySelector('#req-dex')?.value) || 0,
          con: parseInt(root.querySelector('#req-con')?.value) || 0,
          int: parseInt(root.querySelector('#req-int')?.value) || 0,
          wis: parseInt(root.querySelector('#req-wis')?.value) || 0,
          cha: parseInt(root.querySelector('#req-cha')?.value) || 0
        };

        if (this.selectedLevelTab === 1) {
          job.reqStats = foundry.utils.deepClone(job.levelRequirements[1].stats);
        }

        if (this.selectedLevelTab === 10) {
          const specSelect = root.querySelector('#req-specialization-lv5');
          if (specSelect?.value) job.levelRequirements[10].requiredSpecialization = specSelect.value;
          else delete job.levelRequirements[10].requiredSpecialization;
        }

        job.specUnlockLevel = parseInt(root.querySelector('#job-spec-level')?.value) || 7;
      }

      if (isMasterJob || job.specialJob) {
        job.levelRequirements = job.levelRequirements || {};
        job.levelRequirements[this.selectedLevelTab] = job.levelRequirements[this.selectedLevelTab] || { stats: {}, proficiencies: [] };
        job.levelRequirements[this.selectedLevelTab].stats = {
          str: parseInt(root.querySelector('#req-str')?.value) || 0,
          dex: parseInt(root.querySelector('#req-dex')?.value) || 0,
          con: parseInt(root.querySelector('#req-con')?.value) || 0,
          int: parseInt(root.querySelector('#req-int')?.value) || 0,
          wis: parseInt(root.querySelector('#req-wis')?.value) || 0,
          cha: parseInt(root.querySelector('#req-cha')?.value) || 0
        };
      }

      job.unlockText = root.querySelector('#job-unlock-text')?.value || "";

      await saveJobsConfig(this.jobsConfig);
      ui.notifications.info(`✨ Configurazione per ${job.name} (Livello ${this.selectedLevelTab}) salvata!`);
      patchJobSelectionDialog();
      this.render(true);
    });

    root.querySelector('#btn-save-thresholds')?.addEventListener('click', async () => {
      const normInpsExp = root.querySelectorAll('.norm-thresh-exp');
      const normInpsPres = root.querySelectorAll('.norm-thresh-pres');
      const specInpsPres = root.querySelectorAll('.spec-thresh-pres');

      normInpsExp.forEach(inp => {
        const lv = inp.getAttribute('data-lv');
        if (!this.thresholdsConfig.normal[lv]) this.thresholdsConfig.normal[lv] = {};
        this.thresholdsConfig.normal[lv].expReq = Math.max(0, parseInt(inp.value) || 0);
      });

      normInpsPres.forEach(inp => {
        const lv = inp.getAttribute('data-lv');
        if (!this.thresholdsConfig.normal[lv]) this.thresholdsConfig.normal[lv] = {};
        this.thresholdsConfig.normal[lv].prestigeReq = Math.max(0, parseInt(inp.value) || 0);
      });

      specInpsPres.forEach(inp => {
        const lv = inp.getAttribute('data-lv');
        if (!this.thresholdsConfig.special[lv]) this.thresholdsConfig.special[lv] = {};
        this.thresholdsConfig.special[lv].prestigeReq = Math.max(0, parseInt(inp.value) || 0);
      });

      await saveThresholdsConfig(this.thresholdsConfig.normal, this.thresholdsConfig.special);
      ui.notifications.info("✨ Soglie di livello salvate con successo!");
    });

    const actorSelect = root.querySelector('#actor-select-dropdown');
    if (actorSelect) {
      actorSelect.onchange = (e) => {
        this.selectedActorId = e.target.value;
        this.render(true);
      };
    }

    root.querySelectorAll('.btn-remove-master-job').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!game.user.isGM) return ui.notifications.warn("Solo il DM può modificare le Maestrie Master.");
        const targetActor = game.actors.get(this.selectedActorId);
        if (!targetActor) return;
        const jobKey = btn.getAttribute('data-job');
        const cfg = this.jobsConfig[jobKey];
        const result = await removeMasterJobForActor(targetActor, jobKey, { resetStats: true });
        if (!result.ok) return ui.notifications.warn(result.reason || "Impossibile rimuovere il Master Job.");
        ui.notifications.info(`👑 Rimossa ${cfg?.name || jobKey}. 1 Punto Master restituito (${result.available}/3 liberi).`);
        this.render(true);
      });
    });

    root.querySelector('#btn-reset-master-jobs')?.addEventListener('click', async () => {
      if (!game.user.isGM) return ui.notifications.warn("Solo il DM può modificare le Maestrie Master.");
      const targetActor = game.actors.get(this.selectedActorId);
      if (!targetActor) return;
      const result = await resetMasterJobsForActor(targetActor);
      if (!result.ok) return ui.notifications.warn(result.reason || "Impossibile resettare i Master Job.");
      ui.notifications.info(`👑 Maestrie Master rimosse. Restituiti ${result.refunded} Punti Master: 3/3 disponibili.`);
      this.render(true);
    });

    root.querySelector('#btn-save-actor-stats')?.addEventListener('click', async () => {
      const targetActor = game.actors.get(this.selectedActorId);
      if (!targetActor) return;

      for (const [jId, j] of Object.entries(this.jobsConfig)) {
        const isSpecial = j.specialJob || j.progressionType === "prestige_only";
        const lvInp = root.querySelector(`#actor-lv-${jId}`);
        const expInp = root.querySelector(`#actor-exp-${jId}`);
        const presInp = root.querySelector(`#actor-pres-${jId}`);

        if (lvInp && presInp) {
          const maxLvl = isSpecial ? 5 : 10;
          const newStats = {
            level: Math.clamp(parseInt(lvInp.value) || 1, 1, maxLvl),
            exp: isSpecial ? 0 : Math.max(0, parseInt(expInp?.value || 0)),
            prestige: Math.max(0, parseInt(presInp.value) || 0)
          };
          await targetActor.setFlag("world", `craftingStats_${jId}`, newStats);
        }
      }

      ui.notifications.info(`✨ Statistiche salvate per ${targetActor.name}!`);
    });

    root.querySelector('#btn-export-file-json')?.addEventListener('click', () => {
      const fullExportData = { jobs: this.jobsConfig, thresholds: this.thresholdsConfig };
      const content = JSON.stringify(fullExportData, null, 2);
      const blob = new Blob([content], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "extra-jobs-config.json";
      a.click();
      URL.revokeObjectURL(url);
      ui.notifications.info("Esportazione JSON completata!");
    });

    root.querySelector('#btn-import-apply-json')?.addEventListener('click', async () => {
      try {
        const areaVal = root.querySelector('#json-config-area')?.value;
        const parsed = JSON.parse(areaVal);
        
        if (parsed.jobs) {
          this.jobsConfig = parsed.jobs;
          await saveJobsConfig(this.jobsConfig);
        } else {
          this.jobsConfig = parsed;
          await saveJobsConfig(this.jobsConfig);
        }

        if (parsed.thresholds) {
          this.thresholdsConfig = parsed.thresholds;
          await saveThresholdsConfig(this.thresholdsConfig.normal, this.thresholdsConfig.special);
        }

        patchJobSelectionDialog();
        ui.notifications.info("✨ Configurazione JSON applicata!");
        this.render(true);
      } catch (err) {
        ui.notifications.error("Errore: Il testo incollato non è un JSON valido.");
      }
    });

    root.querySelector('#btn-reset-default-json')?.addEventListener('click', async () => {
      this.jobsConfig = foundry.utils.deepClone(DEFAULT_EXTRA_JOBS_CONFIG);
      this.thresholdsConfig = { normal: DEFAULT_NORMAL_THRESHOLDS, special: DEFAULT_SPECIAL_THRESHOLDS };
      await saveJobsConfig(this.jobsConfig);
      await saveThresholdsConfig(this.thresholdsConfig.normal, this.thresholdsConfig.special);
      patchJobSelectionDialog();
      ui.notifications.info("Ripristinata configurazione iniziale!");
      this.render(true);
    });
  }
}

/**
 * 5. HOOKS E AVVIO
 */
Hooks.once("init", () => {
  console.log("Extra Jobs | Inizializzazione V13...");

  game.settings.register("extra-jobs", "jobsConfigJson", {
    name: "Configurazione JSON Mestieri",
    scope: "world",
    config: false,
    type: Object,
    default: DEFAULT_EXTRA_JOBS_CONFIG
  });

  game.settings.register("extra-jobs", "normalThresholdsJson", {
    name: "Soglie Livelli Mestieri Normali",
    scope: "world",
    config: false,
    type: Object,
    default: DEFAULT_NORMAL_THRESHOLDS
  });

  game.settings.register("extra-jobs", "specialThresholdsJson", {
    name: "Soglie Livelli Job Speciali",
    scope: "world",
    config: false,
    type: Object,
    default: DEFAULT_SPECIAL_THRESHOLDS
  });

  game.settings.registerMenu("extra-jobs", "extraJobsManagementMenu", {
    name: "Pannello Extra Jobs",
    label: "Configura Requisiti e Specializzazioni",
    hint: "Gestione avanzata dei mestieri, requisiti per livello, competenze, livelli di sblocco e import/export JSON.",
    icon: "fas fa-cogs",
    type: ExtraJobsSettingsApp,
    restricted: true
  });
});

Hooks.once("ready", () => {
  patchJobSelectionDialog();
  patchAddActorJobExp();
  patchOpenCraftingWorkbench();
  ui.notifications.info("🚀 Extra Jobs V18 Attivo: Gestione Livello per Livello e Barra Prestigio Pura pronti!");
});