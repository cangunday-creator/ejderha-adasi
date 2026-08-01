import json
import os
import random
import sys
import time
from collections import Counter

sys.stdout.reconfigure(encoding="utf-8")

# Mevcut eşleştirme oyunu veri yapısını koruyoruz
KONULAR = {
    "hayvanlar": {
        "isim": "Hayvanlar",
        "kelimeler": [
            {"ingilizce": "cat", "turkce": "kedi", "emoji": "🐱"},
            {"ingilizce": "dog", "turkce": "köpek", "emoji": "🐶"},
            {"ingilizce": "bird", "turkce": "kuş", "emoji": "🐦"},
            {"ingilizce": "fish", "turkce": "balık", "emoji": "🐟"},
            {"ingilizce": "rabbit", "turkce": "tavşan", "emoji": "🐰"},
            {"ingilizce": "horse", "turkce": "at", "emoji": "🐴"},
        ],
    }
}

DUSMAN_TIPLERI = [
    {"isim": "Yılanlı Yaratık", "hp": 12, "attack": 4, "defense": 1},
    {"isim": "Hırsız", "hp": 8, "attack": 3, "defense": 0},
    {"isim": "Harabe Bekçisi", "hp": 10, "attack": 4, "defense": 1},
    {"isim": "Ejderhaçocuk", "hp": 14, "attack": 5, "defense": 2},
]

SHOP_ITEMS = {
    "Yara Bandı": {
        "tip": "heal",
        "deger": 10,
        "fiyat": 8,
        "aciklama": "10 can yeniler.",
    },
    "Duman Bombası": {
        "tip": "escape",
        "basari": 0.7,
        "fiyat": 12,
        "aciklama": "Savaştan kaçmana yardımcı olur.",
    },
    "Güç İksiri": {
        "tip": "boost",
        "deger": 3,
        "fiyat": 15,
        "aciklama": "Bir sonraki dövüşte saldırını artırır.",
    },
}

SAVE_FILE = "savegame.json"

ITEMLER = {isim: {k: v for k, v in veri.items() if k not in ("fiyat", "aciklama")} for isim, veri in SHOP_ITEMS.items()}

TAMAMONLAR = [
    {"name": "Alevkan", "type": "Ateş", "emoji": "🔥", "power": 2, "description": "Gölgeler arasından çıkan ateşli Tamamon."},
    {"name": "Denizpati", "type": "Su", "emoji": "🌊", "power": 2, "description": "Kıyıların serin sularından gelen neşeli Tamamon."},
    {"name": "Toprakç", "type": "Toprak", "emoji": "🌿", "power": 2, "description": "Ormanların derinliklerinde doğan dayanıklı Tamamon."},
    {"name": "Rüzgarus", "type": "Hava", "emoji": "🍃", "power": 2, "description": "Rüzgâr gibi hızlı bir arkadaş."},
    {"name": "Kıvılcım", "type": "Yıldırım", "emoji": "⚡", "power": 3, "description": "Parlak bir kıvılcımla dolu elektriğin gücü."},
    {"name": "Kristal", "type": "Buz", "emoji": "❄️", "power": 3, "description": "Soğuk ve kararlı bir deri Tamamon."},
]


def choose_tamamon_to_discover():
    return random.choice(TAMAMONLAR)


def collect_tamamon(player, tamamon):
    names = [t["name"] for t in player.tamamonlar]
    if tamamon["name"] in names:
        return False
    player.tamamonlar.append(tamamon)
    print(f"Yeni bir Tamamon buldun: {tamamon['emoji']} {tamamon['name']}! {tamamon['description']}")
    return True


def show_tamamonlar(player):
    if not player.tamamonlar:
        print("Henüz hiçbir Tamamon toplamadın.")
        return
    print("\nTopladığın Tamamonlar:")
    for tamamon in player.tamamonlar:
        print(f"  {tamamon['emoji']} {tamamon['name']} ({tamamon['type']}) - {tamamon['description']}")


def save_player(player, path=SAVE_FILE):
    try:
        with open(path, "w", encoding="utf-8") as f:
            json.dump(player.to_dict(), f, ensure_ascii=False, indent=2)
        print(f"Oyun kaydedildi: {path}")
        return True
    except OSError as exc:
        print(f"Kaydetme hatası: {exc}")
        return False


def load_player(path=SAVE_FILE):
    if not os.path.exists(path):
        print("Kaydedilmiş oyun bulunamadı.")
        return None
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        player = Player.from_dict(data)
        print("Kaydedilmiş oyun yüklendi.")
        return player
    except (OSError, json.JSONDecodeError) as exc:
        print(f"Yükleme hatası: {exc}")
        return None


class Player:
    def __init__(self, name):
        self.name = name or "Maceracı"
        self.max_hp = 20
        self.hp = self.max_hp
        self.attack = 5
        self.defense = 1
        self.has_talsim = False
        self.inventory = ["Yara Bandı", "Duman Bombası"]
        self.stars = 0
        self.gold = 12
        self.temp_attack = 0
        self.temp_defense = 0
        self.tamamonlar = []

    def is_alive(self):
        return self.hp > 0

    def heal(self, amount):
        self.hp = min(self.max_hp, self.hp + amount)

    def effective_attack(self):
        bonus = self.temp_attack + (1 if self.has_talsim else 0)
        return self.attack + bonus

    def effective_defense(self):
        return self.defense + self.temp_defense

    def reset_temporary_effects(self):
        self.temp_attack = 0
        self.temp_defense = 0

    def status(self):
        total_attack = self.attack + self.temp_attack + (1 if self.has_talsim else 0) + len(self.tamamonlar)
        total_defense = self.defense + self.temp_defense
        status = (
            f"{self.name} - HP: {self.hp}/{self.max_hp}, "
            f"Saldırı: {total_attack}, Savunma: {total_defense}"
        )
        if self.has_talsim:
            status += ", Tılsım: Evet"
        status += f", Altın: {self.gold}, Eşya: {len(self.inventory)}, Tamamon: {len(self.tamamonlar)}"
        return status

    def item_counts(self):
        return Counter(self.inventory)

    def use_item(self):
        counts = self.item_counts()
        if not counts:
            print("Envanterinde kullanılabilecek bir eşya yok.")
            return None

        print("\nKullanılabilir eşyaların:")
        for i, (item, miktar) in enumerate(counts.items(), start=1):
            print(f"  {i}. {item} x{miktar}")
        print(f"  {len(counts) + 1}. Vazgeç")

        secim = input("Hangi eşyayı kullanmak istersin? ").strip()
        try:
            secim = int(secim)
        except ValueError:
            print("Geçersiz seçim.")
            return None

        if secim < 1 or secim > len(counts) + 1:
            print("Geçersiz seçim.")
            return None

        if secim == len(counts) + 1:
            return None

        item = list(counts.keys())[secim - 1]
        veri = ITEMLER.get(item)
        if not veri:
            print(f"{item} kullanılamıyor.")
            return None

        self.inventory.remove(item)
        if veri["tip"] == "heal":
            self.heal(veri["deger"])
            print(f"{item} kullandın. {veri['deger']} can yeniledin.")
            return "used"
        if veri["tip"] == "escape":
            if random.random() < veri["basari"]:
                print(f"{item} kullanarak savaştan kaçtın.")
                return "escaped"
            print(f"{item} etkisiz kaldı.")
            return "used"
        if veri["tip"] == "boost":
            self.temp_attack += veri["deger"]
            print(f"{item} kullandın. Bir sonraki dövüşte saldırın +{veri['deger']} olacak.")
            return "used"

        return None

    def add_gold(self, amount):
        self.gold += amount

    def can_afford(self, amount):
        return self.gold >= amount

    def buy_item(self, item_name):
        item = SHOP_ITEMS.get(item_name)
        if not item:
            print("Böyle bir eşya yok.")
            return False
        price = item["fiyat"]
        if self.gold < price:
            print("Yeterli altının yok.")
            return False
        self.gold -= price
        self.inventory.append(item_name)
        print(f"{item_name} satın aldın. Kalan altının: {self.gold}.")
        return True

    def show_inventory(self):
        counts = self.item_counts()
        if not counts:
            print("Envanterin boş.")
        else:
            print("\nEnvanterin:")
            for item, miktar in counts.items():
                print(f"  {item} x{miktar}")
        show_tamamonlar(self)

    def to_dict(self):
        return {
            "name": self.name,
            "max_hp": self.max_hp,
            "hp": self.hp,
            "attack": self.attack,
            "defense": self.defense,
            "has_talsim": self.has_talsim,
            "inventory": self.inventory,
            "stars": self.stars,
            "gold": self.gold,
            "temp_attack": self.temp_attack,
            "temp_defense": self.temp_defense,
            "tamamonlar": self.tamamonlar,
        }

    @classmethod
    def from_dict(cls, data):
        player = cls(data.get("name", "Maceracı"))
        player.max_hp = data.get("max_hp", player.max_hp)
        player.hp = data.get("hp", player.hp)
        player.attack = data.get("attack", player.attack)
        player.defense = data.get("defense", player.defense)
        player.has_talsim = data.get("has_talsim", player.has_talsim)
        player.inventory = data.get("inventory", player.inventory)
        player.stars = data.get("stars", player.stars)
        player.gold = data.get("gold", player.gold)
        player.temp_attack = data.get("temp_attack", player.temp_attack)
        player.temp_defense = data.get("temp_defense", player.temp_defense)
        player.tamamonlar = data.get("tamamonlar", player.tamamonlar)
        return player


def print_header(baslik):
    print(f"\n=== {baslik} ===")


def choose_option(prompt, secenekler):
    print(prompt)
    for i, sec in enumerate(secenekler, start=1):
        print(f"  {i}. {sec}")
    secim = input("Seçimin: ").strip()
    return secim


def eslestirme_oyunu(konu_adi, player=None):
    konu = KONULAR[konu_adi]
    kelimeler = konu["kelimeler"]
    yildiz = 0

    print_header(f"{konu['isim']} - Eşleştirme Oyunu")

    for dogru in kelimeler:
        secenekler = random.sample(kelimeler, 3)
        if dogru not in secenekler:
            secenekler[0] = dogru
        random.shuffle(secenekler)

        print(f"'{dogru['ingilizce']}' hangisi?")
        for i, secenek in enumerate(secenekler, start=1):
            print(f"  {i}. {secenek['emoji']} {secenek['turkce']}")

        while True:
            try:
                cevap = input("Seçimin (1-3): ")
                secilen = secenekler[int(cevap) - 1]
                break
            except Exception:
                print("Geçersiz seçim. Lütfen 1 ile 3 arasında bir sayı gir.")

        if secilen == dogru:
            yildiz += 1
            print("Doğru! ⭐\n")
        else:
            print(f"Yanlış, doğrusu: {dogru['emoji']} {dogru['turkce']}\n")

    print(f"Oyun bitti! Kazanılan yıldız: {yildiz}/{len(kelimeler)}")
    if player:
        player.stars += yildiz
        reward = yildiz * 2
        player.gold += reward
        print(f"Mini oyundan {reward} altın kazandın.")
        if yildiz >= 3:
            player.inventory.append("Yara Bandı")
            print("Bilge sana performansın için bir Yara Bandı verdi.")
    return yildiz


def anakaradaki_alan():
    print_header("Anakara - Sahil Kasabası")
    print("Burada küçük bir kasaba, liman ve bir oyun standı var. Eşleştirme oyunu standı hemen köşede!")


def seyahat_menu():
    print("\nSeyahat seçenekleri:")
    print("  1. Ejderha Adası'na git (küçük bir macera)")
    print("  2. Limanda dinlen")
    print("  3. Geri dön")
    return input("Seçimin: ").strip()


def village_shop(player):
    print_header("Kasaba Pazarı")
    while True:
        print(f"Altın: {player.gold}")
        for i, (item, veri) in enumerate(SHOP_ITEMS.items(), start=1):
            print(f"  {i}. {item} - {veri['fiyat']} altın ({veri['aciklama']})")
        print(f"  {len(SHOP_ITEMS) + 1}. Çık")

        sec = input("Hangi eşyayı satın almak istersin? ").strip()
        if sec == str(len(SHOP_ITEMS) + 1):
            break
        try:
            secim = int(sec)
            if secim < 1 or secim > len(SHOP_ITEMS):
                raise ValueError
            item = list(SHOP_ITEMS.keys())[secim - 1]
            player.buy_item(item)
        except ValueError:
            print("Geçersiz seçim. Lütfen tekrar dene.")


def village_tavern(player):
    print_header("Kervan Hanı")
    print("Eski bir kâhin sana adanın gizli patikalarından bahsediyor.")
    if player.stars >= 4:
        print("Bilge kâhinden öğrendiğin bir sır: Tılsım genellikle Harabe ya da Mağara’da saklıdır.")
    else:
        print("Kâhin, tılsımın adanın kalbinde saklı olabileceğini söylüyor.")
    time.sleep(1)


def play_village_games(player):
    print_header("Eğlence Meydanı")
    print("Köy meydanındaki mini oyunda kazanırsan altın ve ödül kazanabilirsiniz.")
    eslestirme_oyunu("hayvanlar", player)
    if player.stars >= 6:
        print("Büyük ödül olarak bir Duman Bombası buldun.")
        player.inventory.append("Duman Bombası")


def show_village_menu(player):
    print_header("Sahil Kasabası")
    print(player.status())
    print("  1. Kasabayı dolaş (mini oyun, pazaryeri ve hikaye ipuçları)")
    print("  2. Limanda dinlen")
    print("  3. Envanteri kontrol et")
    print("  4. Ejderha Adası'na yola çık")
    print("  5. Oyunu kaydet")
    print("  6. Hikaye modunu sonlandır")
    return input("Seçimin: ").strip()


def handle_village_choice(player, sec):
    if sec == "1":
        while True:
            print_header("Kasaba Etkinlikleri")
            print("  1. Mini oyun oyna")
            print("  2. Pazar yeri")
            print("  3. Kâhinin hikayesini dinle")
            print("  4. Geri dön")
            sec2 = input("Seçimin: ").strip()
            if sec2 == "1":
                play_village_games(player)
            elif sec2 == "2":
                village_shop(player)
            elif sec2 == "3":
                village_tavern(player)
            elif sec2 == "4":
                break
            else:
                print("Geçersiz seçim.")
    elif sec == "2":
        print("Dinleniyorsun ve biraz can yeniliyorsun.")
        player.heal(10)
        time.sleep(1)
    elif sec == "3":
        player.show_inventory()
    elif sec == "4":
        return True
    elif sec == "5":
        save_player(player)
        return False
    elif sec == "6":
        print("Hikaye modundan ayrılıyorsun.")
        return "quit"
    else:
        print("Geçersiz seçim. Lütfen tekrar dene.")
    return False


def dusman_uret(zorluk=1):
    dusman = random.choice(DUSMAN_TIPLERI).copy()
    dusman["hp"] += zorluk * 2
    dusman["attack"] += zorluk
    dusman["defense"] += zorluk // 2
    return dusman


def savas(player, enemy):
    print_header(f"Savaş - {enemy['isim']}")
    print(f"Düşman: {enemy['isim']} - HP: {enemy['hp']}, Saldırı: {enemy['attack']}, Savunma: {enemy['defense']}")

    while player.is_alive() and enemy["hp"] > 0:
        print(player.status())
        print(f"Düşman HP: {enemy['hp']}")
        print("  1. Normal Saldırı")
        print("  2. Güçlü Darbe")
        print("  3. Savun")
        print("  4. Eşya kullan")
        print("  5. Kaç")

        tercih = input("Seçimin: ").strip()
        savunma = False
        oyuncu_hareket = ""

        if tercih == "1":
            oyuncu_saldiri = player.effective_attack() + random.randint(0, 3)
            hasar = max(1, oyuncu_saldiri - enemy["defense"])
            enemy["hp"] -= hasar
            oyuncu_hareket = f"Normal saldırı yaptı ve {hasar} hasar verdi."
        elif tercih == "2":
            if random.random() < 0.8:
                oyuncu_saldiri = player.effective_attack() + random.randint(2, 5)
                hasar = max(1, oyuncu_saldiri - enemy["defense"])
                enemy["hp"] -= hasar
                oyuncu_hareket = f"Güçlü Darbe ile {hasar} hasar verdin."
            else:
                oyuncu_hareket = "Güçlü Darbeyle kaçtın. Hasar vermedin."
        elif tercih == "3":
            savunma = True
            oyuncu_hareket = "Savunma yapıyorsun. Gelen hasar azalacak."
        elif tercih == "4":
            sonuc = player.use_item()
            if sonuc == "escaped":
                player.reset_temporary_effects()
                return None
            oyuncu_hareket = "Eşya kullandın."
        elif tercih == "5":
            if random.random() < 0.55:
                print("Kaçmayı başardın!")
                player.reset_temporary_effects()
                return None
            oyuncu_hareket = "Kaçmayı denedin ama başaramadın."
        else:
            print("Geçersiz seçim. Lütfen 1-5 arasında bir sayı gir.")
            continue

        print(oyuncu_hareket)
        if enemy["hp"] <= 0:
            print(f"Düşmanı yendin: {enemy['isim']}!")
            battle_rewards(player, enemy)
            player.reset_temporary_effects()
            return True

        enemy_saldiri = enemy["attack"] + random.randint(0, 2)
        if savunma:
            enemy_saldiri = max(0, enemy_saldiri - 3)
        oyuncuya_hasar = max(1, enemy_saldiri - player.effective_defense())
        player.hp -= oyuncuya_hasar
        print(f"Düşman sana {oyuncuya_hasar} hasar verdi.")

    if not player.is_alive():
        print("Yenildin. Canın tükendi.")
        player.reset_temporary_effects()
        return False

    player.reset_temporary_effects()
    return True


def battle_rewards(player, enemy):
    gold_gain = random.randint(4, 8) + enemy["attack"]
    player.gold += gold_gain
    print(f"Savaştan sonra {gold_gain} altın topladın.")
    if random.random() < 0.25:
        item = random.choice(["Yara Bandı", "Duman Bombası"])
        player.inventory.append(item)
        print(f"Düşman {item} bıraktı. Envanterine ekledin.")


def hikaye_modu(player=None):
    if player is None:
        player = create_player()
    print_header("Hikaye Modu")
    print("Köydeki insanlar seni Ejderha Adası hakkında uyarıyor. Tılsımı bulmak için önce hazırlık yapmalısın.")

    while player.is_alive():
        sec = show_village_menu(player)
        result = handle_village_choice(player, sec)
        if result is True:
            if ejderha_adasi_hikaye(player):
                print("Tılsımı buldun ve efsanevi bir güce kavuştun!")
                return
            print("Taşıdığın hasar yüzünden köye geri döndün. Önce toparlanmalısın.")
        elif result == "quit":
            break

    print("Hikaye modu sona erdi. Yeni bir macera için tekrar gel!")


def ejderha_adasi_hikaye(player):
    print_header("Ejderha Adası")
    print("Sisler içindeki ada seni bekliyor. Kayıp tılsım burada gizli.")
    talsim_yeri = random.choice(["Mağara", "Harabe", "Kıyı", "Volkan"])

    while player.is_alive():
        print("\nAda üzerinde nereye gitmek istersin?")
        print("  1. Mağara")
        print("  2. Harabe")
        print("  3. Kıyı")
        print("  4. Volkan")
        print("  5. Geri dön (Anakara)")
        sec = input("Seçimin: ").strip()

        if sec == "5":
            print("Köye geri dönüyorsun...")
            time.sleep(1)
            return False

        yer = {"1": "Mağara", "2": "Harabe", "3": "Kıyı", "4": "Volkan"}.get(sec)
        if not yer:
            print("Geçersiz seçim.")
            continue

        print(f"{yer} aranıyor...")
        time.sleep(1)

        if random.random() < 0.25:
            tamamon = choose_tamamon_to_discover()
            if collect_tamamon(player, tamamon):
                print("Bu yeni arkadaş maceranda sana yardımcı olacak.")
            else:
                print(f"{tamamon['emoji']} {tamamon['name']} ile tekrar karşılaştın, ama zaten onu kaçırdın.")

        karsi = random.random()
        if karsi < 0.3:
            zorluk = 2 if yer == "Mağara" else 3 if yer == "Volkan" else 1
            dusman = dusman_uret(zorluk=zorluk)
            print(f"{dusman['isim']} seni engelledi!")
            sonuc = savas(player, dusman)
            if sonuc is False:
                return False
        elif karsi < 0.55:
            print("Ufak bir hırsızla karşılaştın, ama hızlı davranıp kaçtın.")
        else:
            print("Sessiz bir keşif yaptın, bir şeyle karşılaşmadın.")

        if yer == talsim_yeri or random.random() < 0.15:
            print(f"Tebrikler! {yer} içinde kayıp tılsımı buldun ✨")
            if not player.has_talsim:
                apply_talsim(player)
            return assert_final_battle(player)

        print(f"{yer} içinde tılsımı bulamadın. Başka bir yere bakmak ister misin?")

    return False


def apply_talsim(player):
    player.has_talsim = True
    player.max_hp += 5
    player.attack += 2
    player.defense += 1
    player.hp = min(player.max_hp, player.hp + 5)
    print("Tılsım gücünü hissediyorsun. Saldırın, savunman ve canın artıyor.")


def assert_final_battle(player):
    print_header("Ejderha ile Karşılaşma")
    print("Kayıp tılsımı bulduğunda hava değişiyor. Uzaktaki gölgeler ejderhaya benziyor...")
    dusman = {"isim": "Ejderha", "hp": 20, "attack": 7, "defense": 3}
    sonuc = savas(player, dusman)
    if sonuc is True:
        print("Ejderhayı yendin! Artık Ejderha Adası'nda gerçek bir efsanesin.")
        return True
    if sonuc is False:
        print("Ejderha seni yenildi ve geri çekilmek zorunda kaldın.")
    return False


def direct_ejderha_adasi(player=None):
    print_header("Kısa Ejderha Adası Macerası")
    print("Ufukta sisli bir ada beliriyor; efsanelere göre burada eski bir tılsım saklı.")
    talsim_yeri = random.choice(["Mağara", "Harabe", "Kıyı", "Volkan"])
    while True:
        print("\nAda üzerinde nereye gitmek istersin?")
        print("  1. Mağara")
        print("  2. Harabe")
        print("  3. Kıyı")
        print("  4. Volkan")
        print("  5. Geri dön (Anakara)")
        sec = input("Seçimin: ").strip()

        if sec == "5":
            print("Tekrar anakaraya dönülüyor...")
            time.sleep(1)
            return False

        yer = {"1": "Mağara", "2": "Harabe", "3": "Kıyı", "4": "Volkan"}.get(sec)
        if not yer:
            print("Geçersiz seçim.")
            continue

        print(f"{yer} aranıyor...")
        time.sleep(1)

        if random.random() < 0.2:
            tamamon = choose_tamamon_to_discover()
            print(f"{tamamon['emoji']} {tamamon['name']} ile karşılaştın! {tamamon['description']}")
            print("Ne yapacaksın?")
            print("  1. Yakalamaya çalış")
            print("  2. Kaç")
            choice = input("Seçimin: ").strip()
            if choice == "1":
                if random.random() < 0.6:
                    if player is not None:
                        if collect_tamamon(player, tamamon):
                            print(f"{tamamon['name']} seni yanına aldı. Artık bir Tamamon'un var!")
                        else:
                            print(f"{tamamon['name']} seni hatırladı, ancak zaten onu topladın.")
                    else:
                        print(f"{tamamon['name']} seni yanına aldı, ama bu kısa macera kayboldu.")
                else:
                    print(f"{tamamon['name']} kaçtı. Yine de macera devam ediyor.")
            else:
                print(f"{tamamon['name']} hızla uzaklaştı.")

        karsi = random.random()
        if karsi < 0.25:
            if yer == "Volkan":
                print("Sıcak lav püskürtücü bir yaratık saldırdı! Savaşmak zorundasın.")
                zorluk = 4
            else:
                print("Büyük bir yılanlı yaratık saldırdı! Savaşmak zorundasın.")
                zorluk = 3
            if combat_simple(difficulty=zorluk):
                print("Yaratığı yendin, yoluna devam ediyorsun.")
            else:
                print("Yenildin ve anakaraya geri sürükleniyorsun.")
                return False
        elif karsi < 0.5:
            print("Ufak bir hırsızla karşılaştın, ama hızlı davranıp kaçtın.")
        else:
            print("Sessiz bir keşif yaptın, bir şeyle karşılaşmadın.")

        if yer == talsim_yeri or random.random() < 0.15:
            print(f"Tebrikler! {yer} içinde kayıp tılsımı buldun ✨")
            print("Tılsımı kullanarak ada üzerindeki düşmanlarla daha kolay baş ediyorsun.")
            return True
        print(f"{yer} içinde tılsımı bulamadın. Başka bir yere bakmak ister misin?")


def combat_simple(difficulty=1):
    # Daha adil ancak zorlu bir basit savaş hesabı.
    oyuncu = random.randint(1, 6) * max(1, difficulty - 1) + difficulty
    dusman = random.randint(1, 6) * difficulty
    print(f"Savaş: Sen {oyuncu} - Düşman {dusman}")
    return oyuncu >= dusman


def main_menu():
    print_header("Ejderha Adası - Ana Menü")
    print("  1. Eşleştirme oyunu oynat")
    print("  2. Anakara'yı keşfet")
    print("  3. Hikaye modu - Ejderha Adası macerası")
    print("  4. Kısa Ejderha Adası macerası")
    print("  5. Kaydedilmiş oyunu yükle")
    print("  6. Çıkış")
    return input("Seçimin: ").strip()


def create_player():
    isim = input("Macera için adın nedir? ").strip()
    return Player(isim)


def main():
    print("Ejderha Adası oyununa hoş geldin! (Basit metin tabanlı macera)")

    while True:
        sec = main_menu()

        if sec == "1":
            eslestirme_oyunu("hayvanlar")
        elif sec == "2":
            anakaradaki_alan()
            while True:
                s = seyahat_menu()
                if s == "1":
                    print("Gemide bir bilet alıp yola koyuluyorsun...")
                    time.sleep(1)
                    found = direct_ejderha_adasi()
                    if found:
                        print("Tılsım artık sende — kullanmak için ek bir tuşa gerek yok, etkisi pasif.")
                    break
                elif s == "2":
                    print("Limanda dinleniyorsun...")
                    time.sleep(1)
                elif s == "3":
                    break
                else:
                    print("Geçersiz seçim.")
        elif sec == "3":
            hikaye_modu()
        elif sec == "4":
            print("Doğrudan Ejderha Adası'na gidiliyor (macera garantili)...")
            time.sleep(1)
            found = direct_ejderha_adasi()
            if found:
                print("Tılsım artık sende — kullanmak için ek bir tuşa gerek yok, etkisi pasif.")
        elif sec == "5":
            player = load_player()
            if player:
                hikaye_modu(player)
        elif sec == "6":
            print("Güle güle! Maceranı kaydettim (hayır kaydetmedim ama iyi yolculuklar)")
            break
        else:
            print("Geçersiz seçim. Lütfen 1-6 arasında bir sayı gir.")


if __name__ == "__main__":
    main()