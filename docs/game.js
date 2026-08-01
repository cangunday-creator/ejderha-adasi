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

const AVATARS = {
  bice: '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#2c5f7c"/><polygon points="32,8 42,20 22,20" fill="#e8eef2"/><polygon points="32,12 38,20 26,20" fill="#4db1ff"/><circle cx="32" cy="34" r="16" fill="#ffdca0"/><circle cx="26" cy="32" r="2" fill="#3a2b1a"/><circle cx="38" cy="32" r="2" fill="#3a2b1a"/><path d="M25 40q7 6 14 0" stroke="#3a2b1a" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
  emine: '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#3d7a5c"/><rect x="29" y="4" width="6" height="16" fill="#ff6b6b"/><rect x="23" y="10" width="18" height="6" fill="#ff6b6b"/><circle cx="32" cy="36" r="16" fill="#ffdca0"/><circle cx="26" cy="34" r="2" fill="#3a2b1a"/><circle cx="38" cy="34" r="2" fill="#3a2b1a"/><path d="M25 42q7 6 14 0" stroke="#3a2b1a" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
  denge: '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#b5722c"/><path d="M32 4l3.5 7.6L44 13l-6 6.2L39.4 28 32 23.8 24.6 28 26 19.2 20 13l8.5-1.4z" fill="#ffdca0"/><circle cx="32" cy="38" r="16" fill="#ffdca0"/><circle cx="26" cy="36" r="2" fill="#3a2b1a"/><circle cx="38" cy="36" r="2" fill="#3a2b1a"/><path d="M25 44q7 6 14 0" stroke="#3a2b1a" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
  nuri: '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#5c4b8a"/><path d="M32 6a8 8 0 0 0-4 15v3h8v-3a8 8 0 0 0-4-15z" fill="#ffd54f"/><circle cx="32" cy="38" r="16" fill="#ffdca0"/><circle cx="26" cy="36" r="4" fill="none" stroke="#2a2a2a" stroke-width="2"/><circle cx="38" cy="36" r="4" fill="none" stroke="#2a2a2a" stroke-width="2"/><line x1="30" y1="36" x2="34" y2="36" stroke="#2a2a2a" stroke-width="2"/><path d="M25 44q7 6 14 0" stroke="#3a2b1a" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
};

const CHARACTERS = [
  {
    key: "bice",
    displayName: "Biçe gibi Dağcı",
    description: "Zirvelere tırmanan güçlü bir kaşif. Saldırısı yüksek, cesaret dolu.",
    avatar: AVATARS.bice,
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
    avatar: AVATARS.emine,
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
    avatar: AVATARS.denge,
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
    avatar: AVATARS.nuri,
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
  { name: "Yılanlı Yaratık", hp: 12, attack: 4, defense: 1, description: "Sisli adanın derinliklerinden çıkan tehlike.", icon: "battle" },
  { name: "Harabe Bekçisi", hp: 14, attack: 5, defense: 2, description: "Harabeleri koruyan yırtıcı bir bekçi.", icon: "battle" },
  { name: "Liman Hırsızı", hp: 10, attack: 3, defense: 1, description: "Sinsi bir saldırgan, dikkatli ol.", icon: "battle" },
  { name: "Lavcan", hp: 16, attack: 6, defense: 2, description: "Volkanik gücüyle sizi sınayan canavar.", icon: "battle" },
  { name: "Deniz Canavarı", hp: 15, attack: 5, defense: 1, description: "Dalgaların arasından çıkıp kıyıya saldıran kocaman bir yaratık.", icon: "seaMonster" },
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
  { english: "lion", turkish: "aslan" },
  { english: "bear", turkish: "ayı" },
  { english: "wolf", turkish: "kurt" },
  { english: "dragon", turkish: "ejderha" },
  { english: "snake", turkish: "yılan" },
  { english: "turtle", turkish: "kaplumbağa" },
  { english: "frog", turkish: "kurbağa" },
  { english: "owl", turkish: "baykuş" },
  { english: "spider", turkish: "örümcek" },
  { english: "red", turkish: "kırmızı" },
  { english: "blue", turkish: "mavi" },
  { english: "green", turkish: "yeşil" },
  { english: "yellow", turkish: "sarı" },
  { english: "black", turkish: "siyah" },
  { english: "white", turkish: "beyaz" },
  { english: "orange", turkish: "turuncu" },
  { english: "purple", turkish: "mor" },
  { english: "pink", turkish: "pembe" },
  { english: "brown", turkish: "kahverengi" },
  { english: "one", turkish: "bir" },
  { english: "two", turkish: "iki" },
  { english: "three", turkish: "üç" },
  { english: "four", turkish: "dört" },
  { english: "five", turkish: "beş" },
  { english: "six", turkish: "altı" },
  { english: "seven", turkish: "yedi" },
  { english: "eight", turkish: "sekiz" },
  { english: "nine", turkish: "dokuz" },
  { english: "ten", turkish: "on" },
  { english: "tree", turkish: "ağaç" },
  { english: "water", turkish: "su" },
  { english: "fire", turkish: "ateş" },
  { english: "stone", turkish: "taş" },
  { english: "mountain", turkish: "dağ" },
  { english: "forest", turkish: "orman" },
  { english: "sea", turkish: "deniz" },
  { english: "sun", turkish: "güneş" },
  { english: "moon", turkish: "ay" },
  { english: "star", turkish: "yıldız" },
  { english: "cloud", turkish: "bulut" },
  { english: "rain", turkish: "yağmur" },
  { english: "wind", turkish: "rüzgar" },
  { english: "snow", turkish: "kar" },
  { english: "island", turkish: "ada" },
  { english: "cave", turkish: "mağara" },
  { english: "sword", turkish: "kılıç" },
  { english: "shield", turkish: "kalkan" },
  { english: "key", turkish: "anahtar" },
  { english: "map", turkish: "harita" },
  { english: "treasure", turkish: "hazine" },
  { english: "gold", turkish: "altın" },
  { english: "ship", turkish: "gemi" },
  { english: "boat", turkish: "tekne" },
  { english: "castle", turkish: "kale" },
  { english: "door", turkish: "kapı" },
  { english: "bridge", turkish: "köprü" },
  { english: "book", turkish: "kitap" },
  { english: "lamp", turkish: "lamba" },
  { english: "hat", turkish: "şapka" },
  { english: "boot", turkish: "çizme" },
];

const WORD_EMOJI = {
  cat: "🐱", dog: "🐶", bird: "🐦", fish: "🐟", rabbit: "🐰", horse: "🐴",
  lion: "🦁", bear: "🐻", wolf: "🐺", dragon: "🐉", snake: "🐍", turtle: "🐢",
  frog: "🐸", owl: "🦉", spider: "🕷️",
  red: "🔴", blue: "🔵", green: "🟢", yellow: "🟡", black: "⚫", white: "⚪",
  orange: "🟠", purple: "🟣", pink: "🩷", brown: "🟤",
  one: "1️⃣", two: "2️⃣", three: "3️⃣", four: "4️⃣", five: "5️⃣",
  six: "6️⃣", seven: "7️⃣", eight: "8️⃣", nine: "9️⃣", ten: "🔟",
  tree: "🌳", water: "💧", fire: "🔥", stone: "🪨", mountain: "⛰️",
  forest: "🌲", sea: "🌊", sun: "☀️", moon: "🌙", star: "⭐",
  cloud: "☁️", rain: "🌧️", wind: "🌬️", snow: "❄️", island: "🏝️", cave: "🕳️",
  sword: "⚔️", shield: "🛡️", key: "🔑", map: "🗺️", treasure: "💰", gold: "🪙",
  ship: "🚢", boat: "⛵", castle: "🏰", door: "🚪", bridge: "🌉",
  book: "📖", lamp: "🪔", hat: "🎩", boot: "👢",
};

function emojiForEnglish(word) {
  return WORD_EMOJI[word] || "";
}

function emojiForTurkish(word) {
  const entry = ENGLISH_WORDS.find(w => w.turkish === word);
  return entry ? WORD_EMOJI[entry.english] || "" : "";
}

const SHOP = [
  { name: "Yara Bandı", price: 8 },
  { name: "Duman Bombası", price: 12 },
  { name: "Güç İksiri", price: 15 },
];

const SAVE_KEY = "ejderhaAdasiSave";
const TUTORIAL_SEEN_KEY = "ejderhaAdasiTutorialSeen";

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
  wave: '<svg viewBox="0 0 24 24"><path d="M2 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0v4c-2 2-4 2-6 0s-4-2-6 0-4 2-6 0z" fill="#7fd8ff"/></svg>',
  seaMonster: '<svg viewBox="0 0 24 24"><path d="M4 16c0-5 4-9 8-9s8 4 8 9c-2-1-3-2-4-1-1 1-2 2-4 2s-3-1-4-2c-1-1-2 0-4 1z" fill="#4caf7d"/><circle cx="9" cy="10" r="1.2" fill="#0b1c14"/><circle cx="15" cy="10" r="1.2" fill="#0b1c14"/></svg>',
  cave: '<svg viewBox="0 0 24 24"><path d="M2 20a10 8 0 0 1 20 0z" fill="#8d6748"/><ellipse cx="12" cy="20" rx="4" ry="5" fill="#1a120b"/></svg>',
  ruins: '<svg viewBox="0 0 24 24"><rect x="4" y="8" width="3" height="12" fill="#c9c2b3"/><rect x="10" y="4" width="3" height="16" fill="#c9c2b3"/><rect x="17" y="10" width="3" height="10" fill="#c9c2b3"/></svg>',
  volcano: '<svg viewBox="0 0 24 24"><polygon points="12,3 20,20 4,20" fill="#5a3a2a"/><circle cx="12" cy="8" r="2.5" fill="#ff5722"/></svg>',
};

const STATE = {
  scene: "menu",
  player: JSON.parse(JSON.stringify(INITIAL_PLAYER)),
  characterKey: null,
  currentEnemy: null,
  message: "",
  islandLocation: null,
  englishMode: "menu",
  englishQuestion: null,
  worldPosition: { x: 50, y: 80 },
  enemyHit: false,
  playerHit: false,
  playerAttacking: false,
  enemyAttacking: false,
};

const VILLAGE_DOORS = [
  { x: 18, y: 55, label: "Pazar Yeri", icon: ICONS.shop, action: "shop" },
  { x: 38, y: 30, label: "Tamamon", icon: ICONS.tamamon, action: "tamamon" },
  { x: 62, y: 32, label: "İngilizce", icon: ICONS.english, action: "english" },
  { x: 82, y: 55, label: "Başak", icon: ICONS.basak, action: "basak" },
  { x: 50, y: 88, label: "Ejderha Adası", icon: ICONS.island, action: "island" },
];

const ISLAND_DOORS = [
  { x: 22, y: 26, label: "Mağara", icon: ICONS.cave, location: "Mağara" },
  { x: 55, y: 18, label: "Volkan", icon: ICONS.volcano, location: "Volkan" },
  { x: 82, y: 30, label: "Harabe", icon: ICONS.ruins, location: "Harabe" },
  { x: 50, y: 80, label: "Kıyı", icon: ICONS.wave, location: "Kıyı" },
];

function walkTo(x, y, onArrive) {
  STATE.worldPosition = { x, y };
  const player = document.getElementById("world-player");
  if (player) {
    player.style.left = `${x}%`;
    player.style.top = `${y}%`;
  }
  if (onArrive) {
    setTimeout(onArrive, 420);
  }
}

function onWorldMapClick(event, mapId) {
  const mapEl = document.getElementById(mapId);
  if (!mapEl) return;
  const rect = mapEl.getBoundingClientRect();
  const x = Math.min(96, Math.max(4, ((event.clientX - rect.left) / rect.width) * 100));
  const y = Math.min(94, Math.max(10, ((event.clientY - rect.top) / rect.height) * 100));
  walkTo(x, y);
}

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
  {
    sentence: "The knight hides behind his big ____.",
    answer: "shield",
    options: ["shield", "cloud", "boot"],
  },
  {
    sentence: "We sail across the sea in a wooden ____.",
    answer: "ship",
    options: ["ship", "cave", "key"],
  },
  {
    sentence: "The wizard opens the old door with a golden ____.",
    answer: "key",
    options: ["key", "wolf", "moon"],
  },
  {
    sentence: "A scary ____ lives deep inside the dark cave.",
    answer: "bear",
    options: ["bear", "rain", "hat"],
  },
  {
    sentence: "The princess wears a beautiful ____ dress.",
    answer: "pink",
    options: ["pink", "ten", "bridge"],
  },
  {
    sentence: "You need a ____ to cross the river safely.",
    answer: "bridge",
    options: ["bridge", "snow", "lion"],
  },
  {
    sentence: "The wizard reads an old magic ____ every night.",
    answer: "book",
    options: ["book", "frog", "castle"],
  },
  {
    sentence: "On top of the ____, the air is very cold.",
    answer: "mountain",
    options: ["mountain", "spider", "lamp"],
  },
  {
    sentence: "The castle has a tall stone ____.",
    answer: "door",
    options: ["door", "turtle", "orange"],
  },
  {
    sentence: "In winter, white ____ covers the whole forest.",
    answer: "snow",
    options: ["snow", "owl", "sword"],
  },
  {
    sentence: "The pirate map shows a hidden ____ on the island.",
    answer: "treasure",
    options: ["treasure", "wind", "snake"],
  },
];

const scenes = {
  menu: renderMenu,
  character: renderCharacterSelection,
  tutorial: renderTutorial,
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
        <button class="secondary" onclick="gotoScene('tutorial')">Nasıl Oynanır?</button>
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
  const character = CHARACTERS.find(c => c.key === STATE.characterKey);
  const attack = player.attack + (player.hasTalisman ? 1 : 0) + player.tamamonlar.length + (player.companion ? 2 : 0);
  const defense = player.defense + (player.companion ? 1 : 0);
  const hpPercent = Math.max(0, (player.hp / player.maxHp) * 100);
  return `
    <div class="panel">
      <div class="status-row">
        <div class="status-identity">
          ${character ? `<div class="avatar-circle avatar-circle-small">${character.avatar}</div>` : ""}
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
        </div>
        <div class="status-bar"><div class="status-fill ${hpBarClass(hpPercent)}" style="width: ${hpPercent}%;"></div></div>
      </div>
    </div>
  `;
}

function renderVillage(app) {
  const character = CHARACTERS.find(c => c.key === STATE.characterKey);
  const avatar = character ? character.avatar : ICONS.hero;
  const pos = STATE.worldPosition;

  app.innerHTML = `
    ${renderStatus()}
    <div class="panel">
      ${renderSceneBanner("Sahil Kasabası", "Bir yere gitmek için haritada üzerine dokun ya da yürüyerek yaklaş.", ICONS.village)}
      <p class="objective-hint">${getObjectiveHint(STATE.player)}</p>
      <div class="world-map" id="village-map" onclick="onWorldMapClick(event, 'village-map')">
        <div class="world-cloud" style="left: 8%; top: 6%; width: 70px; height: 24px; animation-duration: 20s;"></div>
        <div class="world-cloud" style="left: 62%; top: 10%; width: 50px; height: 18px; animation-duration: 15s;"></div>
        ${VILLAGE_DOORS.map(door => `
          <div class="world-door" style="left: ${door.x}%; top: ${door.y}%;" onclick="event.stopPropagation(); walkTo(${door.x}, ${door.y}, () => gotoScene('${door.action}'))">
            <div class="world-door-icon">${door.icon}</div>
            <span class="world-door-label">${door.label}</span>
          </div>
        `).join("")}
        <div class="world-player" id="world-player" style="left: ${pos.x}%; top: ${pos.y}%;">${avatar}</div>
      </div>
      <div class="button-grid">
        <button class="secondary" onclick="healAtVillage()">Dinlen (+10 HP)</button>
        <button class="secondary" onclick="saveGame()">Oyunu Kaydet</button>
        <button class="secondary" onclick="gotoScene('menu')">Ana Menü</button>
      </div>
    </div>
    <div class="panel">
      <p>${STATE.message}</p>
    </div>
  `;
}

function renderIsland(app) {
  const location = STATE.islandLocation || "Adaya ayak bastın. Bir bölgeye doğru yürü.";
  const character = CHARACTERS.find(c => c.key === STATE.characterKey);
  const avatar = character ? character.avatar : ICONS.hero;
  const pos = STATE.worldPosition;

  app.innerHTML = `
    ${renderStatus()}
    <div class="panel">
      ${renderSceneBanner("Ejderha Adası", "Bir bölgeye gitmek için haritada üzerine dokun. Kıyıya yaklaşırken dikkatli ol!", ICONS.island)}
      <p class="objective-hint">${getObjectiveHint(STATE.player)}</p>
      <p>${location}</p>
      <div class="world-map island-map" id="island-map" onclick="onWorldMapClick(event, 'island-map')">
        <div class="world-cloud" style="left: 15%; top: 5%; width: 60px; height: 20px; animation-duration: 18s;"></div>
        <div class="world-cloud" style="left: 70%; top: 8%; width: 45px; height: 16px; animation-duration: 13s;"></div>
        <div class="world-sea">
          <div class="world-wave" style="left: 12%;">${ICONS.wave}</div>
          <div class="world-wave" style="left: 68%;">${ICONS.wave}</div>
          <div class="world-sea-monster">${ICONS.seaMonster}</div>
        </div>
        ${ISLAND_DOORS.map(door => `
          <div class="world-door" style="left: ${door.x}%; top: ${door.y}%;" onclick="event.stopPropagation(); walkTo(${door.x}, ${door.y}, () => searchIsland('${door.location}'))">
            <div class="world-door-icon">${door.icon}</div>
            <span class="world-door-label">${door.label}</span>
          </div>
        `).join("")}
        <div class="world-player" id="world-player" style="left: ${pos.x}%; top: ${pos.y}%;">${avatar}</div>
      </div>
      <div class="button-grid">
        <button class="secondary" onclick="gotoScene('village')">Köye Dön</button>
      </div>
    </div>
    <div class="panel">
      <p>${STATE.message}</p>
    </div>
  `;
}

function hpBarClass(percent) {
  if (percent <= 25) return "hp-low";
  if (percent <= 55) return "hp-mid";
  return "";
}

function combatFxClass(hit, attacking, side) {
  if (hit && attacking) return `fx-both-${side}`;
  if (hit) return "fx-shake";
  if (attacking) return `fx-lunge-${side}`;
  return "";
}

function renderBattle(app) {
  const enemy = STATE.currentEnemy;
  const player = STATE.player;
  const character = CHARACTERS.find(c => c.key === STATE.characterKey);
  const playerAvatar = character ? character.avatar : ICONS.hero;
  const battleIcon = ICONS[enemy.icon] || ICONS.battle;

  const playerClasses = combatFxClass(STATE.playerHit, STATE.playerAttacking, "right");
  const enemyClasses = combatFxClass(STATE.enemyHit, STATE.enemyAttacking, "left");
  STATE.playerHit = false;
  STATE.enemyHit = false;
  STATE.playerAttacking = false;
  STATE.enemyAttacking = false;

  const playerHpPercent = Math.max(0, (player.hp / player.maxHp) * 100);
  const enemyHpPercent = Math.max(0, (enemy.hp / (enemy.maxHp || enemy.hp)) * 100);

  app.innerHTML = `
    ${renderStatus()}
    <div class="panel">
      ${renderSceneBanner("Savaş Alanı", "Düşmanla göz göze geldiğin an: cesaretini topla.", battleIcon)}
      <div class="battle-arena">
        <div class="battle-combatant ${playerClasses}">
          <div class="battle-avatar">${playerAvatar}</div>
          <span class="battle-name">${player.name}</span>
          <div class="battle-hp-bar"><div class="battle-hp-fill ${hpBarClass(playerHpPercent)}" style="width: ${playerHpPercent}%;"></div></div>
        </div>
        <div class="battle-vs">⚔️</div>
        <div class="battle-combatant ${enemyClasses}">
          <div class="battle-avatar">${battleIcon}</div>
          <span class="battle-name">${enemy.name}</span>
          <div class="battle-hp-bar"><div class="battle-hp-fill enemy" style="width: ${enemyHpPercent}%;"></div></div>
        </div>
      </div>
      <div class="card">
        <p>${enemy.description}</p>
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
                  <p class="option-emoji">${emojiForTurkish(option)}</p>
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
                `<button class="secondary" onclick="answerEnglish(${index})">${emojiForEnglish(option)} ${option}</button>`
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
  const correct = guess === question.answer;
  if (correct) {
    STATE.player.gold += reward;
    STATE.message = `Doğru! ${question.answer} cevabını seçtin. ${reward} altın kazandın.`;
  } else {
    STATE.message = `Yanlış. Doğru cevap ${question.answer} idi.`;
  }
  STATE.englishQuestion = null;
  renderApp();
  if (correct) showFloatingText(`+${reward}`, "gold");
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
    chip.style.pointerEvents = "none";
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
    chip.style.pointerEvents = "";
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
  const correct = guess === question.answer;
  if (correct) {
    STATE.player.gold += reward;
    STATE.message = `Doğru! ${question.answer} kartına bıraktın. ${reward} altın kazandın.`;
  } else {
    STATE.message = `Yanlış kart. Doğru cevap ${question.answer} idi.`;
  }
  STATE.englishQuestion = null;
  renderApp();
  if (correct) showFloatingText(`+${reward}`, "gold");
}

function showFloatingText(text, type) {
  const app = document.getElementById("app");
  if (!app) return;
  const el = document.createElement("div");
  el.className = `floating-text floating-${type || "gold"}`;
  el.textContent = text;
  el.style.left = `${40 + Math.random() * 20}%`;
  el.style.top = "26%";
  app.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}

function showEventPopup(icon, title, subtitle, duration) {
  const app = document.getElementById("app");
  if (!app) return;
  const backdrop = document.createElement("div");
  backdrop.className = "event-popup-backdrop";
  backdrop.innerHTML = `
    <div class="event-popup">
      <div class="event-popup-icon">${icon}</div>
      <p class="event-popup-title">${title}</p>
      ${subtitle ? `<p class="event-popup-subtitle">${subtitle}</p>` : ""}
    </div>
  `;

  let dismissed = false;
  const dismiss = () => {
    if (dismissed) return;
    dismissed = true;
    const popup = backdrop.querySelector(".event-popup");
    popup.classList.add("event-popup-exit");
    setTimeout(() => backdrop.remove(), 250);
  };

  backdrop.addEventListener("click", dismiss);
  app.appendChild(backdrop);
  setTimeout(dismiss, duration || 1700);
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
  if (scene === "village" && STATE.scene !== "village") {
    STATE.worldPosition = { x: 50, y: 80 };
  }
  if (scene === "island" && STATE.scene !== "island") {
    STATE.worldPosition = { x: 50, y: 92 };
  }
  STATE.scene = scene;
  STATE.message = "";
  if (scene === "english") {
    STATE.englishMode = "menu";
    STATE.englishQuestion = null;
  }
  renderApp();
}

function renderCharacterSelection(app) {
  const saves = loadAllSaves();
  const cards = CHARACTERS.map(character => {
    const save = saves[character.key];
    return `
    <div class="card avatar-card">
      <div class="avatar-circle avatar-circle-large">${character.avatar}</div>
      <h3>${character.displayName}</h3>
      <p>${character.description}</p>
      <p><strong>HP:</strong> ${character.hp} / <strong>Saldırı:</strong> ${character.attack} / <strong>Savunma:</strong> ${character.defense}</p>
      ${save ? `<p class="save-badge">💾 Kayıtlı ilerleme: ${save.gold} altın</p>` : ""}
      <button class="secondary" onclick="selectCharacter('${character.key}')">${save ? "Kaldığın Yerden Devam Et" : "Bu karakterle devam et"}</button>
    </div>
  `;
  }).join("");

  app.innerHTML = `
    <div class="panel">
      ${renderSceneBanner("Karakter Seçimi", "Ejderha Adası için bir kahraman seç.", ICONS.hero)}
      <p>Her karakter kendi ilerlemesini ayrı ayrı kaydeder — istediğin karakterle devam edebilirsin.</p>
      <div class="cards">${cards}</div>
      <div class="button-grid">
        <button class="primary" onclick="gotoScene('menu')">Ana Menüye Dön</button>
      </div>
    </div>
  `;
}

function renderTutorial(app) {
  app.innerHTML = `
    <div class="panel">
      ${renderSceneBanner("Nasıl Oynanır?", "Maceraya başlamadan önce kısa bir rehber.", ICONS.scroll)}
      <div class="cards">
        <div class="card">
          <h3>🗺️ Haritada Yürüme</h3>
          <p>Köyde ve adada haritanın üzerine dokun ya da tıkla — karakterin oraya yürür. Yuvarlak ikonlar birer <strong>kapı</strong>: üzerine dokununca o aktivite açılır (Pazar, Tamamon, İngilizce, Başak, Ada geçişi, Mağara/Harabe/Volkan/Kıyı).</p>
        </div>
        <div class="card">
          <h3>🎯 Amacın Ne?</h3>
          <p>Ejderha Adası'nda gizli bir <strong>Tılsım</strong> var. Bölgeleri keşfederek onu bul, yolda <strong>Tamamon</strong>lar topla, <strong>İngilizce</strong> oynayarak altın kazan ve sonunda karşına çıkan Ejderha ile savaş!</p>
        </div>
        <div class="card">
          <h3>🌊 Dikkat</h3>
          <p>Kıyıya yaklaşırsan dalgaların arasından bir <strong>Deniz Canavarı</strong> çıkabilir — hazırlıklı ol! Savaşta HP'n biterse köye geri dönersin, kaybetmiş sayılmazsın.</p>
        </div>
        <div class="card">
          <h3>💾 Kaydet</h3>
          <p>Köydeki "Oyunu Kaydet" butonuyla ilerlemeni kaydedebilirsin. Her karakterin kaydı ayrıdır — karakter seçim ekranına döndüğünde, kayıtlı olan karakterlerde "Kaldığın Yerden Devam Et" yazar.</p>
        </div>
      </div>
      <div class="button-grid">
        <button class="primary" onclick="dismissTutorial()">Anladım, Maceraya Başla!</button>
      </div>
    </div>
  `;
}

function dismissTutorial() {
  localStorage.setItem(TUTORIAL_SEEN_KEY, "1");
  gotoScene(STATE.characterKey ? "village" : "menu");
}

function getObjectiveHint(player) {
  if (!player.hasTalisman && player.tamamonlar.length === 0) {
    return "🎯 Görev: Ejderha Adası'na git, bölgeleri keşfet ve kayıp Tılsımı ara!";
  }
  if (!player.hasTalisman) {
    return "🎯 Görev: Tılsım hâlâ kayıp — adadaki bölgeleri keşfetmeye devam et.";
  }
  if (player.tamamonlar.length < TAMAMONLAR.length) {
    return `🎯 Görev: Tamamon topla (${player.tamamonlar.length}/${TAMAMONLAR.length}) ve İngilizce oynayarak altın kazan.`;
  }
  return "🎯 Tebrikler! Tılsımı buldun ve tüm Tamamonları topladın — artık gerçek bir Ejderha Adası kahramanısın!";
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
        <li><strong>Haritada yürü</strong>: Kasabada ve adada haritanın üzerine dokun/tıkla — karakterin oraya yürür. Yuvarlak ikonlar birer <strong>kapı</strong>dır; üzerine gidince o aktivite açılır.</li>
        <li><strong>Kasabadaki kapılar</strong>: Pazar Yeri, Tamamon Koleksiyonu, İngilizce Kartları, Başak (yol arkadaşın) ve Ejderha Adası'na geçiş.</li>
        <li><strong>Adayı keşfet</strong>: Mağara, Harabe, Volkan ve Kıyı bölgelerine yürüyerek keşif yap. Hazine bulabilir, Tamamon yakalayabilir ya da düşmanla karşılaşabilirsin — kıyıya yaklaşırsan dalgalardan bir Deniz Canavarı çıkabilir!</li>
        <li><strong>Görev ipucu</strong>: Kasaba ve ada ekranlarının üstünde sarı bir kutuda o an ne yapman gerektiğini söyleyen bir ipucu belirir.</li>
        <li><strong>Savaş</strong> sırasında normal saldırı, güçlü darbe, eşya kullanma veya kaçma seçeneklerini kullanabilirsin.</li>
        <li><strong>Altın kazan</strong> için sadece İngilizce oynaman gerekmez. Keşifler, savaşlar ve İngilizce mini oyunları seni ödüllendirir.</li>
        <li><strong>Tamamonlar</strong> topladıkça koleksiyonun büyür ve her biri sana avantaj sağlar.</li>
        <li>Ana menüden istediğin zaman <strong>"Nasıl Oynanır?"</strong> rehberini tekrar açabilirsin.</li>
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
  const saves = loadAllSaves();
  const existingSave = saves[key];
  STATE.player = existingSave || createPlayerFromCharacter(character);
  STATE.characterKey = key;
  STATE.scene = localStorage.getItem(TUTORIAL_SEEN_KEY) ? "village" : "tutorial";
  STATE.worldPosition = { x: 50, y: 80 };
  STATE.englishMode = "menu";
  STATE.englishQuestion = null;
  STATE.currentEnemy = null;
  STATE.message = existingSave
    ? `${character.displayName} olarak kaldığın yerden devam ediyorsun!`
    : `${character.displayName} olarak macerana başlıyorsun.`;
  renderApp();
}

function resetGame() {
  STATE.player = JSON.parse(JSON.stringify(INITIAL_PLAYER));
  STATE.characterKey = null;
  STATE.scene = "menu";
  STATE.message = "";
  STATE.currentEnemy = null;
  STATE.englishMode = "menu";
  STATE.englishQuestion = null;
  renderApp();
}

function loadAllSaves() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (e) {
    return {};
  }
}

function saveGame() {
  if (!STATE.characterKey) {
    STATE.message = "Kaydetmek için önce bir karakter seçmelisin.";
    renderApp();
    return;
  }
  const saves = loadAllSaves();
  saves[STATE.characterKey] = STATE.player;
  localStorage.setItem(SAVE_KEY, JSON.stringify(saves));
  STATE.message = "Oyun kaydedildi! Bu karakterle kaldığın yerden devam edebilirsin.";
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
  let goldFloatingText = null;
  let popup = null;

  if (!player.hasTalisman && Math.random() < 0.2) {
    player.hasTalisman = true;
    player.maxHp += 5;
    player.hp = Math.min(player.maxHp, player.hp + 5);
    message = ` ${location} içinde kayıp tılsımı buldun! Canın ve gücün arttı.`;
    popup = { icon: "✨", title: "Kayıp Tılsımı Buldun!", subtitle: "Canın ve gücün arttı." };
  } else if (Math.random() < 0.2) {
    const goldFound = Math.floor(Math.random() * 6 + 5);
    player.gold += goldFound;
    message = ` ${location} içinde parlayan bir hazine buldun ve ${goldFound} altın kazandın.`;
    goldFloatingText = `+${goldFound}`;
    popup = { icon: "💰", title: "Hazine Bulundu!", subtitle: `${goldFound} altın kazandın.` };
  } else if (Math.random() < 0.3) {
    const tamamon = TAMAMONLAR[Math.floor(Math.random() * TAMAMONLAR.length)];
    if (!player.tamamonlar.some(t => t.name === tamamon.name)) {
      player.tamamonlar.push(tamamon);
      message = ` ${tamamon.emoji} ${tamamon.name} ile karşılaştın ve onu topladın.`;
      popup = { icon: tamamon.emoji, title: "Yeni Tamamon!", subtitle: `${tamamon.name} koleksiyonuna katıldı.` };
    } else {
      message = ` ${tamamon.emoji} ${tamamon.name} zaten koleksiyonunda var.`;
    }
  } else if (Math.random() < 0.7) {
    let enemy = ENEMIES[Math.floor(Math.random() * ENEMIES.length)];
    if (location === "Volkan") {
      enemy = ENEMIES.find(e => e.name === "Lavcan") || enemy;
    } else if (location === "Kıyı") {
      enemy = ENEMIES.find(e => e.name === "Deniz Canavarı") || enemy;
    }
    STATE.currentEnemy = JSON.parse(JSON.stringify(enemy));
    STATE.currentEnemy.maxHp = STATE.currentEnemy.hp;
    STATE.scene = "battle";
    STATE.message = location === "Kıyı"
      ? " Dalgalar arasından bir Deniz Canavarı fırladı!"
      : ` ${message} Düşman ortaya çıktı!`;
    renderApp();
    return;
  } else {
    message = ` ${location} içinde sessiz bir keşif yaptın, bir şey bulamadın.`;
  }

  STATE.message = message;
  renderApp();
  if (goldFloatingText) showFloatingText(goldFloatingText, "gold");
  if (popup) showEventPopup(popup.icon, popup.title, popup.subtitle);
}

function attackEnemy(strong) {
  const player = STATE.player;
  const enemy = STATE.currentEnemy;
  const attackValue = player.attack + (player.hasTalisman ? 1 : 0) + player.tamamonlar.length + (player.companion ? 2 : 0);
  let damage = attackValue + (strong ? Math.floor(Math.random() * 3 + 2) : Math.floor(Math.random() * 3));
  let enemyDamage = null;
  if (strong && Math.random() > 0.85) {
    STATE.message = "Güçlü darbe başarısız oldu.";
  } else {
    damage = Math.max(1, damage - enemy.defense);
    enemy.hp -= damage;
    STATE.message = ` ${strong ? "Güçlü darbe" : "Saldırı"} ile ${damage} hasar verdin.`;
    enemyDamage = damage;
    STATE.enemyHit = true;
    STATE.playerAttacking = true;
  }

  if (enemy.hp <= 0) {
    const goldGain = Math.floor(Math.random() * 8 + 6);
    STATE.message += ` ${enemy.name} yenildi! Altın ve övgü kazandın.`;
    STATE.player.gold += goldGain;
    STATE.scene = "village";
    STATE.currentEnemy = null;
    renderApp();
    if (enemyDamage) showFloatingText(`-${enemyDamage}`, "damage");
    showFloatingText(`+${goldGain}`, "gold");
    showEventPopup("🏆", `${enemy.name} Yenildi!`, `${goldGain} altın kazandın.`);
    return;
  }

  const playerDamage = enemyAttack();
  renderApp();
  if (enemyDamage) showFloatingText(`-${enemyDamage}`, "damage");
  showFloatingText(`-${playerDamage}`, "damage");
}

function enemyAttack() {
  const player = STATE.player;
  const enemy = STATE.currentEnemy;
  const attackValue = enemy.attack + Math.floor(Math.random() * 3);
  const defenseValue = player.defense + (player.companion ? 1 : 0);
  const damage = Math.max(1, attackValue - defenseValue);
  player.hp -= damage;
  STATE.message += ` Düşman ${damage} hasar verdi.`;
  STATE.playerHit = true;
  STATE.enemyAttacking = true;

  if (player.hp <= 0) {
    STATE.message += " Maceran sona erdi.";
    STATE.scene = "end";
  }
  return damage;
}

function useItem() {
  const player = STATE.player;
  if (!player.inventory.length) {
    STATE.message = "Envanterinde kullanabileceğin bir eşya yok.";
    renderApp();
    return;
  }
  const item = player.inventory.shift();
  const itemType = ITEMS[item].type;
  let healAmount = 0;
  if (itemType === "heal") {
    healAmount = ITEMS[item].value;
    player.hp = Math.min(player.maxHp, player.hp + healAmount);
    STATE.message = `${item} kullandın. ${healAmount} can yeniledin.`;
  } else if (itemType === "escape") {
    if (Math.random() < 0.7) {
      STATE.scene = "village";
      STATE.currentEnemy = null;
      STATE.message = `${item} kullanarak savaştan kaçtın.`;
    } else {
      STATE.message = `${item} başarısız oldu.`;
    }
  } else if (itemType === "boost") {
    player.attack += ITEMS[item].value;
    STATE.message = `${item} kullandın. Saldırın geçici olarak arttı.`;
  }
  renderApp();
  if (itemType === "heal") showFloatingText(`+${healAmount}`, "heal");
}

function fleeBattle() {
  if (Math.random() < 0.5) {
    STATE.scene = "village";
    STATE.currentEnemy = null;
    STATE.message = "Kaçmayı başardın.";
    renderApp();
    return;
  }
  STATE.message = "Kaçamadın!";
  const damage = enemyAttack();
  renderApp();
  showFloatingText(`-${damage}`, "damage");
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
