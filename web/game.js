const BASAK = {
  name: "Başak",
  description: "Sevimli ve cesur bir yol arkadaşı. Yanındayken saldırın ve savunman güçlenir.",
};

const INITIAL_PLAYER = {
  name: "Maceracı",
  hp: 24,
  maxHp: 24,
  attack: 5,
  defense: 2,
  gold: 14,
  inventory: ["Yara Bandı", "Duman Bombası"],
  tamamonlar: [],
  hasTalisman: false,
  companion: null,
};

const CHARACTERS = [
  {
    key: "bice",
    displayName: "Biçe gibi Dağcı",
    description: "Zirvelere tırmanan güçlü bir kaşif. Saldırısı yüksek, cesaret dolu.",
    hp: 20,
    maxHp: 20,
    attack: 7,
    defense: 2,
    gold: 12,
    inventory: ["Yara Bandı", "Duman Bombası"],
    tamamonlar: [],
    hasTalisman: false,
  },
  {
    key: "emine",
    displayName: "Emine gibi Doktor",
    description: "Becerikli bir şifacı. Sağlık ve savunma yetenekleri yüksek.",
    hp: 26,
    maxHp: 26,
    attack: 4,
    defense: 3,
    gold: 10,
    inventory: ["Yara Bandı", "Yara Bandı"],
    tamamonlar: [],
    hasTalisman: false,
  },
  {
    key: "denge",
    displayName: "Denge gibi Kahraman",
    description: "Meraklı küçük maceracı. Hızı ve çevikliğiyle fark yaratır.",
    hp: 18,
    maxHp: 18,
    attack: 6,
    defense: 3,
    gold: 14,
    inventory: ["Duman Bombası"],
    tamamonlar: [],
    hasTalisman: false,
  },
  {
    key: "nuri",
    displayName: "Zekası ile öne çıkan Nur",
    description: "Aklıyla bulmacaları çözen bir stratejist. İngilizce öğrenme ve hazine keşiflerinde avantajlı.",
    hp: 22,
    maxHp: 22,
    attack: 5,
    defense: 3,
    gold: 16,
    inventory: ["Yara Bandı", "Güç İksiri"],
    tamamonlar: [],
    hasTalisman: false,
  },
];

function createPlayerFromCharacter(character) {
  return {
    name: character.displayName,
    hp: character.hp,
    maxHp: character.maxHp,
    attack: character.attack,
    defense: character.defense,
    gold: character.gold,
    inventory: [...character.inventory],
    tamamonlar: JSON.parse(JSON.stringify(character.tamamonlar)),
    hasTalisman: character.hasTalisman,
    companion: null,
  };
}

const TAMAMONLAR = [
  { name: "Alevkan", type: "Ateş", emoji: "🔥", power: 3, description: "Alevli bir kanatlı Tamamon." },
  { name: "Denizpati", type: "Su", emoji: "🌊", power: 2, description: "Kıyı dalgalarından gelen dost." },
  { name: "Toprakç", type: "Toprak", emoji: "🌿", power: 2, description: "Dağların gücünü taşıyan Tamamon." },
  { name: "Rüzgarus", type: "Hava", emoji: "🍃", power: 2, description: "Hafif ve hızlı, her maceraya uyar." },
  { name: "Kıvılcım", type: "Yıldırım", emoji: "⚡", power: 3, description: "Enerjisi yüksek, heyecanlı bir Tamamon." },
  { name: "Kristal", type: "Buz", emoji: "❄️", power: 3, description: "Soğuk, keskin ve kararlı." },
];

const ENEMIES = [
  { name: "Yılanlı Yaratık", hp: 12, attack: 4, defense: 1, description: "Sisli adanın derinliklerinden çıkan tehlike." },
  { name: "Harabe Bekçisi", hp: 14, attack: 5, defense: 2, description: "Harabeleri koruyan yırtıcı bir bekçi." },
  { name: "Liman Hırsızı", hp: 10, attack: 3, defense: 1, description: "Sinsi bir saldırgan, dikkatli ol." },
  { name: "Lavcan", hp: 16, attack: 6, defense: 2, description: "Volkanik gücüyle sizi sınayan canavar." },
];

const ITEMS = {
  "Yara Bandı": { type: "heal", value: 12, description: "Canını yenilemek için kullan." },
  "Duman Bombası": { type: "escape", value: 0, description: "Savaştan hızlıca kaçmana yardım eder." },
  "Güç İksiri": { type: "boost", value: 3, description: "Bir sonraki saldırına güç katar." },
};

const ENGLISH_WORDS = [
  { english: "cat", turkish: "kedi" },
  { english: "dog", turkish: "köpek" },
  { english: "bird", turkish: "kuş" },
  { english: "fish", turkish: "balık" },
  { english: "rabbit", turkish: "tavşan" },
  { english: "horse", turkish: "at" },
  { english: "tree", turkish: "ağaç" },
  { english: "water", turkish: "su" },
  { english: "fire", turkish: "ateş" },
  { english: "stone", turkish: "taş" },
];

const SHOP = [
  { name: "Yara Bandı", price: 8 },
  { name: "Duman Bombası", price: 12 },
  { name: "Güç İksiri", price: 15 },
];

const STATE = {
  scene: "menu",
  player: JSON.parse(JSON.stringify(INITIAL_PLAYER)),
  currentEnemy: null,
  message: "",
  islandLocation: null,
  englishMode: "menu",
  englishQuestion: null,
};

const ENGLISH_SENTENCES = [
  {
    sentence: "The dragon guards the ____ treasure.",
    answer: "gold",
    options: ["water", "gold", "stone"],
  },
  {
    sentence: "She drinks cold ____ after battle.",
    answer: "water",
    options: ["fire", "water", "tree"],
  },
  {
    sentence: "The brave hero carries a sharp ____.",
    answer: "sword",
    options: ["sword", "bird", "horse"],
  },
  {
    sentence: "Night falls and the sky becomes full of ____.",
    answer: "stars",
    options: ["stones", "stars", "trees"],
  },
];

const scenes = {
  menu: renderMenu,
  character: renderCharacterSelection,
  village: renderVillage,
  island: renderIsland,
  battle: renderBattle,
  tamamon: renderTamamon,
  shop: renderShop,
  english: renderEnglishPractice,
  about: renderAbout,
  basak: renderBasak,
  end: renderEnd,
};

const ICONS = {
  dragon: '<svg viewBox="0 0 24 24"><path d="M2 20c4-2 6-8 10-8 3 0 3 3 6 3 2 0 3-2 4-5-1 6-5 12-11 12-4 0-7-1-9-2z" fill="#ffdca0"/></svg>',
  village: '<svg viewBox="0 0 24 24"><path d="M12 3 2 12h3v8h6v-5h2v5h6v-8h3z" fill="#ffdca0"/></svg>',
  island: '<svg viewBox="0 0 24 24"><path d="M3 18l5-8 3 4 4-7 6 11z" fill="#ffdca0"/></svg>',
  battle: '<svg viewBox="0 0 24 24"><path d="M4 20L20 4M4 4l16 16" stroke="#ffdca0" stroke-width="2.5" stroke-linecap="round"/></svg>',
  shop: '<svg viewBox="0 0 24 24"><path d="M7 8h10l1 12H6z" fill="#ffdca0"/><path d="M9 8a3 3 0 0 1 6 0" stroke="#ffdca0" stroke-width="2" fill="none"/></svg>',
  tamamon: '<svg viewBox="0 0 24 24"><path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.2 21 12 17.27 5.8 21 7 14.14l-5-4.87 7.1-1.01z" fill="#ffdca0"/></svg>',
  english: '<svg viewBox="0 0 24 24"><path d="M4 4h7v16H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM13 4h7a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-7V4z" fill="#ffdca0"/></svg>',
  basak: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-4.35-9.5-8.36C.7 9.7 2 6 5.5 6c2 0 3.3 1.2 4 2.3.7-1.1 2-2.3 4-2.3 3.5 0 4.8 3.7 3 6.64C19 16.65 12 21 12 21z" fill="#ffdca0"/></svg>',
  hero: '<svg viewBox="0 0 24 24"><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z" fill="#ffdca0"/></svg>',
  scroll: '<svg viewBox="0 0 24 24"><path d="M5 4h14v3H5zM5 17h14v3H5zM6 7h12v10H6z" fill="#ffdca0"/></svg>',
};

function renderApp() {
  const app = document.getElementById("app");
  app.classList.remove("scene-enter");
  void app.offsetWidth;
  app.innerHTML = "";
  scenes[STATE.scene](app);
  app.classList.add("scene-enter");
}

function renderMenu(app) {
  app.innerHTML = `
    <div class="panel">
      ${renderSceneBanner("Ejderha Adası'na hoş geldin", "Işıl Dengenin yolunu seç ve maceranın ritmini hisset.", ICONS.dragon)}
      <h2 class="section-title">Ana Menü</h2>
      <div class="button-grid">
        <button class="primary" onclick="gotoScene('character')">Karakter Seç ve Maceraya Başla</button>
        <button class="secondary" onclick="gotoScene('about')">Oyun Hakkında</button>
        <button class="secondary" onclick="gotoScene('tamamon')">Tamamon Koleksiyonu</button>
        <button class="secondary" onclick="resetGame()">Sıfırla</button>
      </div>
    </div>
  `;
}

function renderSceneBanner(title, subtitle, icon) {
  return `
    <div class="scene-banner">
      ${icon ? `<div class="scene-icon">${icon}</div>` : ""}
      <div class="scene-banner-text">
        <h3>${title}</h3>
        <p>${subtitle}</p>
      </div>
    </div>
  `;
}

function renderStatus() {
  const player = STATE.player;
  const attack = player.attack + (player.hasTalisman ? 1 : 0) + player.tamamonlar.length + (player.companion ? 2 : 0);
  const defense = player.defense + (player.companion ? 1 : 0);
  const hpPercent = Math.max(0, (player.hp / player.maxHp) * 100);
  return `
    <div class="panel">
      <div class="status-row">
        <div>
          <h2 class="section-title">${player.name}</h2>
          <ul class="stats-list">
            <li>HP: ${player.hp}/${player.maxHp}</li>
            <li>Saldırı: ${attack}</li>
            <li>Savunma: ${defense}</li>
            <li>Altın: ${player.gold}</li>
            <li>Tamamonlar: ${player.tamamonlar.length}</li>
            <li>Tılsım: ${player.hasTalisman ? "Evet" : "Hayır"}</li>
            ${player.companion ? `<li>Yoldaş: ${player.companion.name}</li>` : ""}
          </ul>
        </div>
        <div class="status-bar"><div class="status-fill" style="width: ${hpPercent}%;"></div></div>
      </div>
    </div>
  `;
}

function renderVillage(app) {
  app.innerHTML = `
    ${renderStatus()}
    <div class="panel">
      ${renderSceneBanner("Sahil Kasabası", "Denizin tuz kokusu, köyün sıcak ateşiyle karışıyor.", ICONS.village)}
      <h2 class="section-title">Kasaba</h2>
      <p>Kasabada dinlen, pazarda alışveriş yap veya İngilizce ve Tamamon yeteneklerini geliştir. Seçtiğin karakterin yeteneklerini kullanarak keşifler, savaşlar ve mini oyunlarla maceran ilerleyecek.</p>
      <div class="button-grid">
        <button class="primary" onclick="gotoScene('shop')">Pazar Yeri</button>
        <button class="secondary" onclick="gotoScene('tamamon')">Tamamon Koleksiyonu</button>
        <button class="secondary" onclick="gotoScene('english')">İngilizce Kartları</button>
        <button class="secondary" onclick="gotoScene('basak')">Başak ile Tanış</button>
        <button class="secondary" onclick="gotoScene('island')">Ejderha Adası'na Git</button>
        <button class="secondary" onclick="healAtVillage()">Dinlen (+10 HP)</button>
        <button class="secondary" onclick="gotoScene('menu')">Ana Menü</button>
      </div>
    </div>
    <div class="panel">
      <p>${STATE.message}</p>
    </div>
  `;
}

function renderIsland(app) {
  const location = STATE.islandLocation || "Adanın merkezine doğru ilerliyorsun.";
  app.innerHTML = `
    ${renderStatus()}
    <div class="panel">
      ${renderSceneBanner("Ejderha Adası", "Sisler ve fırtına bulutları arasında gerçek bir macera seni bekliyor.", ICONS.island)}
      <h2 class="section-title">Keşif</h2>
      <p>${location}</p>
      <div class="button-grid">
        <button class="primary" onclick="searchIsland('Mağara')">Mağara</button>
        <button class="secondary" onclick="searchIsland('Harabe')">Harabe</button>
        <button class="secondary" onclick="searchIsland('Kıyı')">Kıyı</button>
        <button class="secondary" onclick="searchIsland('Volkan')">Volkan</button>
        <button class="secondary" onclick="gotoScene('village')">Köye Dön</button>
      </div>
    </div>
    <div class="panel">
      <p>${STATE.message}</p>
    </div>
  `;
}

function renderBattle(app) {
  const enemy = STATE.currentEnemy;
  const player = STATE.player;
  app.innerHTML = `
    ${renderStatus()}
    <div class="panel">
      ${renderSceneBanner("Savaş Alanı", "Düşmanla göz göze geldiğin an: cesaretini topla.", ICONS.battle)}
      <div class="card">
        <h3>${enemy.name}</h3>
        <p>${enemy.description}</p>
        <p>HP: ${enemy.hp}</p>
        <p>Saldırı: ${enemy.attack} / Savunma: ${enemy.defense}</p>
      </div>
      <div class="button-grid">
        <button class="primary" onclick="attackEnemy(false)">Normal Saldırı</button>
        <button class="secondary" onclick="attackEnemy(true)">Güçlü Darbe</button>
        <button class="secondary" onclick="useItem()">Eşya Kullan</button>
        <button class="secondary" onclick="fleeBattle()">Kaç</button>
      </div>
    </div>
    <div class="panel">
      <p>${STATE.message}</p>
    </div>
  `;
}

const TYPE_COLORS = {
  "Ateş": "#ff7043",
  "Su": "#4db1ff",
  "Toprak": "#8bc34a",
  "Hava": "#80cbc4",
  "Yıldırım": "#ffd54f",
  "Buz": "#81d4fa",
};

function renderTamamon(app) {
  const cards = STATE.player.tamamonlar
    .map(t => `
      <div class="card" style="border-left: 4px solid ${TYPE_COLORS[t.type] || "#f8b84c"};">
        <h3>${t.emoji} ${t.name}</h3>
        <p><strong>Tip:</strong> <span style="color: ${TYPE_COLORS[t.type] || "#f8b84c"};">${t.type}</span></p>
        <p>${t.description}</p>
      </div>
    `)
    .join("");

  app.innerHTML = `
    ${renderStatus()}
    <div class="panel">
      ${renderSceneBanner("Tamamon Koleksiyonun", "Adada bulduğun sadık dostlarının hepsi burada.", ICONS.tamamon)}
      ${cards || '<p>Henüz hiçbir Tamamon toplamadın. Adayı keşfetmeye başla!</p>'}
      <div class="button-grid">
        <button class="primary" onclick="gotoScene('village')">Kasabaya Geri Dön</button>
        <button class="secondary" onclick="gotoScene('island')">Adayı Keşfet</button>
      </div>
    </div>
    <div class="panel">
      <p>${STATE.message}</p>
    </div>
  `;
}

function renderEnglishPractice(app) {
  if (STATE.englishMode === "menu") {
    app.innerHTML = `
      ${renderStatus()}
      <div class="panel">
        ${renderSceneBanner("İngilizce Ustası Ol", "Farklı oyunlarla öğren, altın kazan ve maceranın gücünü artır.", ICONS.english)}
        <p>İngilizce çalışırken altın da kazanabilirsin. Bu bölümde üç farklı mini oyun var:</p>
        <ul>
          <li>Kelime eşleştirme (sürükle-bırak): İngilizce kelimeyi doğru karta sürükle.</li>
          <li>Cümle tamamlama: bağlam içinde doğru kelimeyi seç.</li>
          <li>Türkçe'den İngilizce'ye: kelimeyi ters yönde seç.</li>
        </ul>
        <div class="button-grid">
          <button class="primary" onclick="setEnglishMode('match')">Kelime Eşleştirme</button>
          <button class="secondary" onclick="setEnglishMode('fill')">Cümle Tamamlama</button>
          <button class="secondary" onclick="setEnglishMode('reverse')">Türkçe'den İngilizce'ye</button>
          <button class="secondary" onclick="gotoScene('village')">Kasabaya Dön</button>
        </div>
      </div>
      <div class="panel">
        <p>${STATE.message}</p>
      </div>
    `;
    return;
  }

  const question = STATE.englishQuestion || generateEnglishQuestion(STATE.englishMode);
  STATE.englishQuestion = question;
  const modeLabel = STATE.englishMode === "match"
    ? "Kelime Eşleştirme"
    : STATE.englishMode === "fill"
      ? "Cümle Tamamlama"
      : "Türkçe'den İngilizce'ye";

  if (STATE.englishMode === "match") {
    app.innerHTML = `
      ${renderStatus()}
      <div class="panel">
        ${renderSceneBanner(modeLabel, "Kelimeyi doğru karta sürükleyip bırak.", ICONS.english)}
        <div class="drag-source-row">
          <div class="drag-chip" id="drag-chip">${question.sourceWord}</div>
        </div>
        <div class="cards">
          ${question.options
            .map(
              option => `
                <div class="card drop-zone" data-option="${option}">
                  <p>${option}</p>
                </div>
              `
            )
            .join("")}
        </div>
        <div class="button-grid">
          <button class="primary" onclick="setEnglishMode('menu')">Diğer İngilizce Oyunlarına Dön</button>
          <button class="secondary" onclick="gotoScene('village')">Kasabaya Dön</button>
        </div>
      </div>
      <div class="panel">
        <p>${STATE.message}</p>
      </div>
    `;
    setupMatchDrag(question);
    return;
  }

  app.innerHTML = `
    ${renderStatus()}
    <div class="panel">
      ${renderSceneBanner(modeLabel, "Doğru cevabı seç ve altınla ödüllendirileceksin.", ICONS.english)}
      <p>${question.prompt}</p>
      <div class="card">
        <div class="button-grid">
          ${question.options
            .map(
              (option, index) =>
                `<button class="secondary" onclick="answerEnglish(${index})">${option}</button>`
            )
            .join("")}
        </div>
      </div>
      <div class="button-grid">
        <button class="primary" onclick="setEnglishMode('menu')">Diğer İngilizce Oyunlarına Dön</button>
        <button class="secondary" onclick="gotoScene('village')">Kasabaya Dön</button>
      </div>
    </div>
    <div class="panel">
      <p>${STATE.message}</p>
    </div>
  `;
}

function generateEnglishQuestion(mode) {
  if (mode === "fill") {
    const sentence = ENGLISH_SENTENCES[Math.floor(Math.random() * ENGLISH_SENTENCES.length)];
    return {
      prompt: `Aşağıdaki cümleyi tamamla: ${sentence.sentence}`,
      answer: sentence.answer,
      options: shuffleArray(sentence.options),
      reward: 7,
    };
  }

  const word = ENGLISH_WORDS[Math.floor(Math.random() * ENGLISH_WORDS.length)];
  if (mode === "reverse") {
    const allOptions = [...new Set([word.english])];
    while (allOptions.length < 3) {
      const randomWord = ENGLISH_WORDS[Math.floor(Math.random() * ENGLISH_WORDS.length)];
      if (!allOptions.includes(randomWord.english)) {
        allOptions.push(randomWord.english);
      }
    }
    return {
      prompt: `Türkçe anlamı "${word.turkish}" olan İngilizce kelime hangisidir?`,
      answer: word.english,
      options: shuffleArray(allOptions),
      reward: 6,
    };
  }

  const allOptions = [...new Set([word.turkish])];
  while (allOptions.length < 3) {
    const randomWord = ENGLISH_WORDS[Math.floor(Math.random() * ENGLISH_WORDS.length)];
    if (!allOptions.includes(randomWord.turkish)) {
      allOptions.push(randomWord.turkish);
    }
  }
  return {
    prompt: `"${word.english}" kelimesinin anlamı nedir?`,
    answer: word.turkish,
    options: shuffleArray(allOptions),
    reward: 5,
    sourceWord: word.english,
  };
}

function setEnglishMode(mode) {
  STATE.englishMode = mode;
  STATE.englishQuestion = null;
  const modeName = mode === "match"
    ? "kelime eşleştirme"
    : mode === "fill"
      ? "cümle tamamlama"
      : "Türkçe'den İngilizce'ye";
  STATE.message = `Şimdi ${modeName} oyunundayız.`;
  renderApp();
}

function answerEnglish(index) {
  const question = STATE.englishQuestion;
  if (!question) return;
  const guess = question.options[index];
  const reward = question.reward || 5;
  if (guess === question.answer) {
    STATE.player.gold += reward;
    STATE.message = `Doğru! ${question.answer} cevabını seçtin. ${reward} altın kazandın.`;
  } else {
    STATE.message = `Yanlış. Doğru cevap ${question.answer} idi.`;
  }
  STATE.englishQuestion = null;
  renderApp();
}

function setupMatchDrag(question) {
  const chip = document.getElementById("drag-chip");
  if (!chip) return;

  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;

  chip.style.touchAction = "none";

  chip.addEventListener("pointerdown", e => {
    dragging = true;
    chip.setPointerCapture(e.pointerId);
    const rect = chip.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    chip.style.position = "fixed";
    chip.style.left = `${rect.left}px`;
    chip.style.top = `${rect.top}px`;
    chip.style.width = `${rect.width}px`;
    chip.style.zIndex = "1000";
    chip.classList.add("dragging");
  });

  chip.addEventListener("pointermove", e => {
    if (!dragging) return;
    chip.style.left = `${e.clientX - offsetX}px`;
    chip.style.top = `${e.clientY - offsetY}px`;
  });

  chip.addEventListener("pointerup", e => {
    if (!dragging) return;
    dragging = false;
    chip.classList.remove("dragging");
    const target = document.elementFromPoint(e.clientX, e.clientY);
    const zone = target ? target.closest(".drop-zone") : null;
    if (zone) {
      resolveMatchDrop(zone.dataset.option, question);
    } else {
      chip.style.position = "";
      chip.style.left = "";
      chip.style.top = "";
      chip.style.width = "";
    }
  });
}

function resolveMatchDrop(guess, question) {
  const reward = question.reward || 5;
  if (guess === question.answer) {
    STATE.player.gold += reward;
    STATE.message = `Doğru! ${question.answer} kartına bıraktın. ${reward} altın kazandın.`;
  } else {
    STATE.message = `Yanlış kart. Doğru cevap ${question.answer} idi.`;
  }
  STATE.englishQuestion = null;
  renderApp();
}

function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function renderBasak(app) {
  const player = STATE.player;
  const already = Boolean(player.companion);
  app.innerHTML = `
    ${renderStatus()}
    <div class="panel">
      ${renderSceneBanner("Sevimli Kız Başak", "Kasabanın kenarında duran neşeli bir kız seni fark ediyor.", ICONS.basak)}
      <div class="card">
        <h3>Başak</h3>
        <p>${BASAK.description}</p>
        <p>"Merhaba! Ben Başak. Ejderha Adası'na gidiyorsan sana katılabilirim, birlikte daha güçlü oluruz!"</p>
      </div>
      <div class="button-grid">
        ${already
          ? '<p>Başak zaten yol arkadaşın!</p>'
          : '<button class="primary" onclick="recruitBasak()">Evet, yol arkadaşım olsun</button><button class="secondary" onclick="gotoScene(\'village\')">Belki daha sonra</button>'}
        <button class="secondary" onclick="gotoScene('village')">Kasabaya Dön</button>
      </div>
    </div>
    <div class="panel">
      <p>${STATE.message}</p>
    </div>
  `;
}

function recruitBasak() {
  STATE.player.companion = { ...BASAK };
  STATE.message = "Başak artık senin yol arkadaşın! Maceranda saldırın ve savunman güçlendi.";
  gotoScene("village");
}

function renderShop(app) {
  const list = SHOP.map(item => `
    <div class="card">
      <h3>${item.name}</h3>
      <p>Fiyat: ${item.price} altın</p>
      <p>${ITEMS[item.name].description}</p>
      <button class="secondary" onclick="buyItem('${item.name}')">Satın Al</button>
    </div>
  `).join("");

  app.innerHTML = `
    ${renderStatus()}
    <div class="panel">
      ${renderSceneBanner("Kasaba Pazarı", "Takas tezgâhları ve esrarengiz satıcılar seni bekliyor.", ICONS.shop)}
      <h2 class="section-title">Alışveriş</h2>
      <div class="cards">${list}</div>
      <div class="button-grid">
        <button class="primary" onclick="gotoScene('village')">Kasabaya Dön</button>
        <button class="secondary" onclick="gotoScene('tamamon')">Tamamon Koleksiyonu</button>
      </div>
    </div>
    <div class="panel">
      <p>${STATE.message}</p>
    </div>
  `;
}

function renderEnd(app) {
  app.innerHTML = `
    <div class="panel">
      <h2 class="section-title">Efsane Tamamlandı!</h2>
      <p>${STATE.message}</p>
      <button class="primary" onclick="resetGame()">Yeniden Başla</button>
    </div>
  `;
}

function gotoScene(scene) {
  STATE.scene = scene;
  STATE.message = "";
  if (scene === "english") {
    STATE.englishMode = "menu";
    STATE.englishQuestion = null;
  }
  renderApp();
}

function renderCharacterSelection(app) {
  const cards = CHARACTERS.map(character => `
    <div class="card">
      <h3>${character.displayName}</h3>
      <p>${character.description}</p>
      <p><strong>HP:</strong> ${character.hp} / <strong>Saldırı:</strong> ${character.attack} / <strong>Savunma:</strong> ${character.defense}</p>
      <button class="secondary" onclick="selectCharacter('${character.key}')">Bu karakterle devam et</button>
    </div>
  `).join("");

  app.innerHTML = `
    <div class="panel">
      ${renderSceneBanner("Karakter Seçimi", "Ejderha Adası için bir kahraman seç.", ICONS.hero)}
      <p>Her karakter farklı bir oyun tarzına sahiptir. Seçim, macerana güçlü bir başlangıç sağlar.</p>
      <div class="cards">${cards}</div>
      <div class="button-grid">
        <button class="primary" onclick="gotoScene('menu')">Ana Menüye Dön</button>
      </div>
    </div>
  `;
}

function renderAbout(app) {
  app.innerHTML = `
    <div class="panel">
      ${renderSceneBanner("Oyun Hakkında", "Ejderha Adası macerasının tüm yönlerini keşfet.", ICONS.scroll)}
      <h2 class="section-title">Oyun Açıklaması</h2>
      <p>"Işıl Dengenin oyunu Ejderha Adası" seni büyülü bir adada geçen hikâyeye davet ediyor. Bu oyunda dört farklı karakterden birini seçerek macerana başlarsın:</p>
      <ul>
        <li><strong>Biçe gibi Dağcı</strong>: Güçlü ve cesur bir kaşif, daha yüksek saldırı gücüne sahip.</li>
        <li><strong>Emine gibi Doktor</strong>: Şifacı yetenekleriyle daha fazla can ve dayanıklılık sağlar.</li>
        <li><strong>Denge gibi Kahraman</strong>: Çevik ve meraklı, farklı keşiflere uygun.</li>
        <li><strong>Zekası ile öne çıkan Nur</strong>: Strateji ve bulmaca çözme konusunda avantajlı.</li>
      </ul>
      <h2 class="section-title">Nasıl Oynanır?</h2>
      <ul>
        <li><strong>Karakter seçimi</strong> ile oyuna başla. Her karakter farklı başlangıç istatistiklerine sahiptir.</li>
        <li><strong>Kasabada</strong> dinlenebilir, pazar yerine gidebilir, Tamamon koleksiyonuna bakabilir, İngilizce oyunlarına geçebilir veya Başak ile tanışıp onu yol arkadaşın yapabilirsin.</li>
        <li><strong>Adayı keşfet</strong>: Mağara, harabe, kıyı ve volkan bölgelerinde farklı olaylar yaşanır. Hazine bulabilir, Tamamon yakalayabilir veya düşmanlarla karşılaşabilirsin.</li>
        <li><strong>Savaş</strong> sırasında normal saldırı, güçlü darbe, eşya kullanma veya kaçma seçeneklerini kullanabilirsin.</li>
        <li><strong>Altın kazan</strong> için sadece İngilizce oynaman gerekmez. Keşifler, savaşlar ve İngilizce mini oyunları seni ödüllendirir.</li>
        <li><strong>Tamamonlar</strong> topladıkça koleksiyonun büyür ve her biri sana avantaj sağlar.</li>
      </ul>
      <h2 class="section-title">İngilizce Mini Oyunları</h2>
      <p>İngilizce menüsünde üç farklı oyun türü bulunur:</p>
      <ul>
        <li><strong>Kelime Eşleştirme</strong>: İngilizce kelime için doğru Türkçe anlamı seç.</li>
        <li><strong>Cümle Tamamlama</strong>: Eksik kelimeyi bağlama göre doldur.</li>
        <li><strong>Türkçe'den İngilizce'ye</strong>: Türkçe kelimenin doğru İngilizcesini seç.</li>
      </ul>
      <h2 class="section-title">Altın ve Eşyalar</h2>
      <p>Topladığın altınları pazarda yeni eşyalar almak için kullanabilirsin. Eşyalar savaşta ve keşifte faydalı olabilir.</p>
      <div class="button-grid">
        <button class="primary" onclick="gotoScene('menu')">Ana Menüye Dön</button>
        <button class="secondary" onclick="gotoScene('character')">Karakter Seçimine Git</button>
      </div>
    </div>
  `;
}

function selectCharacter(key) {
  const character = CHARACTERS.find(c => c.key === key);
  if (!character) return;
  STATE.player = createPlayerFromCharacter(character);
  STATE.scene = "village";
  STATE.englishMode = "menu";
  STATE.englishQuestion = null;
  STATE.currentEnemy = null;
  STATE.message = `${character.displayName} olarak macerana başlıyorsun.`;
  renderApp();
}

function resetGame() {
  STATE.player = JSON.parse(JSON.stringify(INITIAL_PLAYER));
  STATE.scene = "menu";
  STATE.message = "";
  STATE.currentEnemy = null;
  STATE.englishMode = "menu";
  STATE.englishQuestion = null;
  renderApp();
}

function healAtVillage() {
  STATE.player.hp = Math.min(STATE.player.maxHp, STATE.player.hp + 10);
  STATE.message = "Dinlendin ve canının bir kısmını geri kazandın.";
  renderApp();
}

function searchIsland(location) {
  STATE.islandLocation = `${location} bölgesindesin.`;
  const player = STATE.player;
  let message = ` ${location} aranmaya başlandı.`;

  if (!player.hasTalisman && Math.random() < 0.2) {
    player.hasTalisman = true;
    player.maxHp += 5;
    player.hp = Math.min(player.maxHp, player.hp + 5);
    message = ` ${location} içinde kayıp tılsımı buldun! Canın ve gücün arttı.`;
  } else if (Math.random() < 0.2) {
    const goldFound = Math.floor(Math.random() * 6 + 5);
    player.gold += goldFound;
    message = ` ${location} içinde parlayan bir hazine buldun ve ${goldFound} altın kazandın.`;
  } else if (Math.random() < 0.3) {
    const tamamon = TAMAMONLAR[Math.floor(Math.random() * TAMAMONLAR.length)];
    if (!player.tamamonlar.some(t => t.name === tamamon.name)) {
      player.tamamonlar.push(tamamon);
      message = ` ${tamamon.emoji} ${tamamon.name} ile karşılaştın ve onu topladın.`;
    } else {
      message = ` ${tamamon.emoji} ${tamamon.name} zaten koleksiyonunda var.`;
    }
  } else if (Math.random() < 0.7) {
    let enemy = ENEMIES[Math.floor(Math.random() * ENEMIES.length)];
    if (location === "Volkan") {
      enemy = ENEMIES.find(e => e.name === "Lavcan") || enemy;
    }
    STATE.currentEnemy = JSON.parse(JSON.stringify(enemy));
    STATE.scene = "battle";
    STATE.message = ` ${message} Düşman ortaya çıktı!`;
    renderApp();
    return;
  } else {
    message = ` ${location} içinde sessiz bir keşif yaptın, bir şey bulamadın.`;
  }

  STATE.message = message;
  renderApp();
}

function attackEnemy(strong) {
  const player = STATE.player;
  const enemy = STATE.currentEnemy;
  const attackValue = player.attack + (player.hasTalisman ? 1 : 0) + player.tamamonlar.length + (player.companion ? 2 : 0);
  let damage = attackValue + (strong ? Math.floor(Math.random() * 3 + 2) : Math.floor(Math.random() * 3));
  if (strong && Math.random() > 0.85) {
    STATE.message = "Güçlü darbe başarısız oldu.";
  } else {
    damage = Math.max(1, damage - enemy.defense);
    enemy.hp -= damage;
    STATE.message = ` ${strong ? "Güçlü darbe" : "Saldırı"} ile ${damage} hasar verdin.`;
  }

  if (enemy.hp <= 0) {
    STATE.message += ` ${enemy.name} yenildi! Altın ve övgü kazandın.`;
    STATE.player.gold += Math.floor(Math.random() * 8 + 6);
    STATE.scene = "village";
    STATE.currentEnemy = null;
    renderApp();
    return;
  }

  enemyAttack();
}

function enemyAttack() {
  const player = STATE.player;
  const enemy = STATE.currentEnemy;
  const attackValue = enemy.attack + Math.floor(Math.random() * 3);
  const defenseValue = player.defense + (player.companion ? 1 : 0);
  const damage = Math.max(1, attackValue - defenseValue);
  player.hp -= damage;
  STATE.message += ` Düşman ${damage} hasar verdi.`;

  if (player.hp <= 0) {
    STATE.message += " Maceran sona erdi.";
    STATE.scene = "end";
  }
  renderApp();
}

function useItem() {
  const player = STATE.player;
  if (!player.inventory.length) {
    STATE.message = "Envanterinde kullanabileceğin bir eşya yok.";
    renderApp();
    return;
  }
  const item = player.inventory.shift();
  if (ITEMS[item].type === "heal") {
    player.hp = Math.min(player.maxHp, player.hp + ITEMS[item].value);
    STATE.message = `${item} kullandın. ${ITEMS[item].value} can yeniledin.`;
  } else if (ITEMS[item].type === "escape") {
    if (Math.random() < 0.7) {
      STATE.scene = "village";
      STATE.currentEnemy = null;
      STATE.message = `${item} kullanarak savaştan kaçtın.`;
    } else {
      STATE.message = `${item} başarısız oldu.`;
    }
  } else if (ITEMS[item].type === "boost") {
    player.attack += ITEMS[item].value;
    STATE.message = `${item} kullandın. Saldırın geçici olarak arttı.`;
  }
  renderApp();
}

function fleeBattle() {
  if (Math.random() < 0.5) {
    STATE.scene = "village";
    STATE.currentEnemy = null;
    STATE.message = "Kaçmayı başardın.";
  } else {
    STATE.message = "Kaçamadın!";
    enemyAttack();
  }
  renderApp();
}

function buyItem(name) {
  const item = SHOP.find(i => i.name === name);
  if (!item) return;
  if (STATE.player.gold < item.price) {
    STATE.message = "Yeterli altın yok.";
    renderApp();
    return;
  }
  STATE.player.gold -= item.price;
  STATE.player.inventory.push(item.name);
  STATE.message = `${item.name} satın aldın.`;
  renderApp();
}

renderApp();
