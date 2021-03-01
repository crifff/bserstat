const dictionary_ja = new Map<string, string>([
  ["", ""],
  ["Character(All)", "キャラクター(全体)"],
  ["Character(High Tier)", "キャラクター(上位)"],
  ["Weapon(All)", "武器(全体)"],
  ["Weapon(High Tier)", "武器(上位)"],
  ["Armor(All)", "防具(全体)"],
  ["Armor(High Tier)", "防具(上位)"],
  ["updated", "更新日"],
  ["period", "期間"],
  ["Solo", "ソロ"],
  ["Duo", "デュオ"],
  ["Squad", "スクアッド"],
  ["Character", "キャラクター"],
  ["Weapon", "武器"],
  ["Weapon Type", "武器種"],
  ["Win Rate", "勝率"],
  ["Pick Rate", "ピック率"],
  ["Player Kill", "キル数"],
  ["Average Rank", "平均順位"],
  ["MMR Efficiency", "MMR効率"],
  ["Adriana", "アドリアナ"],
  ["Aya", "アヤ"],
  ["Chiara", "キアラ"],
  ["Emma", "エマ"],
  ["Fiora", "フィオラ"],
  ["Hart", "ハート"],
  ["Hyejin", "ヘジン"],
  ["Hyunwoo", "ヒョヌ"],
  ["Isol", "アイソル"],
  ["Jackie", "ジャッキー"],
  ["Lenox", "レノックス"],
  ["Li Dailin", "ダイリン"],
  ["Magnus", "マグヌス"],
  ["Nadine", "ナディン"],
  ["Rozzi", "ロッジ"],
  ["Shoichi", "彰一"],
  ["Silvia", "シルヴィア"],
  ["Sissela", "シセラ"],
  ["Xiukai", "シウカイ"],
  ["Yuki", "雪"],
  ["Zahir", "ザヒル"],
  ["Luke", "ルク"],
  ["Cathy", "キャッシー"],
  ["All Melee", "近距離全体"],
  ["All Ranged", "遠距離全体"],
  ["Base Win Rate", "基準勝率"],
  ["Throw", "投擲"],
  ["Pistol", "拳銃"],
  ["Assault Rifle", "突撃銃"],
  ["Sniper", "狙撃銃"],
  ["Sniper Rifle", "狙撃銃"],
  ["Rapier", "レイピア"],
  ["Shuriken", "暗器"],
  ["Spear", "槍"],
  ["Two-Handed Sword", "両手剣"],
  ["Two Handed Sword", "両手剣"],
  ["Guitar", "ギター"],
  ["Bow", "弓"],
  ["Tonfa", "トンファー"],
  ["Glove", "拳"],
  ["Axe", "斧"],
  ["Dual Sword", "デュアルソード"],
  ["Dual Swords", "デュアルソード"],
  ["Dagger", "短剣"],
  ["Whip", "鞭"],
  ["Nunchaku", "ヌンチャク"],
  ["Bat", "バット"],
  ["Hammer", "ハンマー"],
  ["Crossbow", "石弓"],
  ["Smoke Bomb", "煙幕弾"],
  ["Incendiary Bomb", "焼夷弾"],
  ["David's Sling", "ダビデのスリング"],
  ["Grenade of Antioch", "アンティオキアの手榴弾"],
  ["Ruthenium Marble", "ルテニウムの玉"],
  ["AK-12", "AK-12"],
  ["XCR", "XCR"],
  ["Gatling Gun", "ガトリングガン"],
  ["Devil's Marksman", "魔弾の射手"],
  ["Elegance", "エレガンス"],
  ["Electron Blaster", "エレクトロンブラスター"],
  ["Magnum-Boa", "マグナム・ボア"],
  ["Kelte", "アクケルテ"],
  ["Tac-50", "Tac-50"],
  ["Intervention", "インターベンション"],
  ["NTW-20", "NTW-20"],
  ["Polaris", "ポラリス"],
  ["The Deadly Ray", "斜射星光"],
  ["Durendal Mk2", "デュランダルmk2"],
  ["Mistilteinn", "ミスティルテイン"],
  ["Volticletto", "ボルティックレット"],
  ["Meteor Claymore", "流星剣"],
  ["Joyeuse", "ジョワユーズ"],
  ["Cards of Tyranny", "狂気王のカード"],
  ["Mystic Jade Charm", "玉篆訣"],
  ["Fuhma Shuriken", "風魔手裏剣"],
  ["Frost Venom Dart", "氷魄銀針"],
  ["Azure Dagger", "青色の短刀"],
  ["Flechette", "フレシェット弾"],
  ["Wind and Fire Wheels", "乾坤圈"],
  ["Death Rune", "生死符"],
  ["Sudarsana", "スダルサナ"],
  ["Petal Torrent", "滿天花雨"],
  ["Gentian Silver Gun", "涯角槍"],
  ["Eighteen Foot Spear", "丈八蛇矛"],
  ["Cosmic Bident", "コスミックバイデント"],
  ["Lance of Poseidon", "トリアイナ"],
  ["Blazing Lance", "火尖槍"],
  ["Fangtian Huaji", "方天畫戟"],
  ["Dragon Guandao", "青龍偃月刀"],
  ["Spear of Longinus", "ロンギヌスの槍"],
  ["Thuận Thiên", "タンキエム"],
  ["Arondight", "アロンダイト"],
  ["Excalibur", "エクスカリバー"],
  ["Plasma Sword", "プラズマソード"],
  ["Laevateinn", "レーヴァテイン"],
  ["Monohoshizao", "物干し竿"],
  ["Hovud", "ホヴズ"],
  ["Dáinsleif", "ダインスレイヴ"],
  ["Bohemian", "ボヘミアン"],
  ["Stairway to Heaven", "天国への階段"],
  ["Purple Haze", "パープル・ヘイズ"],
  ["Satisfaction", "サティスファクション"],
  ["Wonderful Tonight", "ワンダフルトゥナイト"],
  ["The Wall", "ザ・ウォール"],
  ["Teen Spirit", "ティーンスピリット"],
  ["Ancient bolt", "片箭"],
  ["Golden-Ratio Bow", "黄金比率の弓"],
  ["Twinbow", "ツインボウ"],
  ["Elemental Bow", "エレメンタルボウ"],
  ["Failnaught", "無駄なしの弓"],
  ["Tactical Tonfa", "戦術トンファー"],
  ["Mai Sok", "マイソック"],
  ["Plasma Tonfa", "プラズマトンファー"],
  ["One Inch Punch", "単零寸千闘"],
  ["Divine Fist", "聖なる拳"],
  ["Bloodwing Knuckles", "ウィングナックル"],
  ["Frost Petal Hand", "氷花現玉手"],
  ["Buddha's Palm", "如来手闘"],
  ["Brasil Gauntlet", "B・ガントレット"],
  ["White Claw Punch", "素手"],
  ["Imperial Silk Gloves", "天蚕手袋"],
  ["Beam Axe", "ビームアックス"],
  ["Santa Muerte", "サンタムエルテ"],
  ["Scythe", "大釜"],
  ["Parashu", "パラシュ"],
  ["Harpe", "ハルペー"],
  ["Divine Dual Swords", "二天一流"],
  ["Starsteel Dual Swords", "雌雄一対の剣"],
  ["Dioscuri", "ディオスクロイ"],
  ["Lloigor & Zahr", "ロイガーツァール"],
  ["Carnwennan", "カルンウェナン"],
  ["Mount Slicer", "破山剣"],
  ["Vibroblade", "超振動ナイフ"],
  ["Fragarach", "フラガラック"],
  ["Thunder Whip", "雷龍鞭"],
  ["Gleipnir", "グレイプニル"],
  ["Plasma Whip", "プラズマ鞭"],
  ["Bloody Nine Tails", "血花九節鞭"],
  ["The Smiting Dragon", "大小盤龍棍"],
  ["Vibro Nunchaku", "超振動ヌンチャク"],
  ["Statue of Soteria", "救援の女神像"],
  ["Mallet", "打狗棒"],
  ["Spy Umbrella", "スパイの傘"],
  ["Monkey King Bar", "如意棒"],
  ["Fang Mace", "狼牙棒"],
  ["Hammer of Dagda", "ダグダのハンマー"],
  ["Hammer of Thor", "トールハンマー"],
  ["Evening Star", "金星剣"],
  ["Magic Stick", "魔法ステッキ"],
  ["The Legend of The General", "李広の弩"],
  ["Ballista", "バリスタ"],
  ["Sniper Crossbow", "狙撃クロスボウ"],
  ["The Golden Ghost", "靈光金亀神機弩"],
  ["Sharanga", "シャランガ"],
  ["Type", "タイプ"],
  ["Head", "頭"],
  ["Chest", "服"],
  ["Arm", "腕"],
  ["Leg", "脚"],
  ["Accessory", "装具"],
  ["Armor", "防具"],
  ["Mithril Helm", "ミスリルヘルム"],
  ["Crystal Tiara", "水晶ティアラ"],
  ["Motorcycle Helmet", "バイクヘルメット"],
  ["Tactical OPS Helmet", "戦術OPSヘルメット"],
  ["Helm of Banneret", "騎士団長の兜"],
  ["Laurel Wreath", "月桂冠"],
  ["Imperial Crown", "帝国王冠"],
  ["Imperial Burgonet", "皇室ブルゴネット"],
  ["Chinese Opera Mask", "臉譜"],
  ["Covert Agent Uniform", "御史衣"],
  ["Sunset Armor", "黄昏の鎧"],
  ["Optical Camouflage Suit", "光学迷彩スーツ"],
  ["Rocker's Jacket", "ロッカージャケット"],
  ["Mithril Armor", "ミスリル鎧"],
  ["Crusader Armor", "聖騎士の鎧"],
  ["Amazoness Armor", "アマゾネスアーマー"],
  ["Dragon Dobok", "龍の道服"],
  ["Butler's Suit", "執事服"],
  ["Battle Suit", "バトルスーツ"],
  ["Blazing Dress", "炎のドレス"],
  ["EOD Suit", "EODスーツ"],
  ["Commander's Armor", "指揮官の鎧"],
  ["Kabana", "カバナ"],
  ["Queen of Hearts", "クイーンオブハート"],
  ["Sword Stopper", "ソードストッパー"],
  ["Draupnir", "ドラウプニル"],
  ["Creed of the Knight", "騎士の信条"],
  ["Sheath of Shah Jahan", "シャージャハーン鞘"],
  ["Cube Watch", "キューブウォッチ"],
  ["Vital Sign Sensor", "バイタルセンサー"],
  ["Burnished Aegis", "アイギス"],
  ["Radar", "レーダー"],
  ["Mithril Shield", "ミスリル盾"],
  ["Auto Arms", "オートアームズ"],
  ["Bracelet of Skadi", "スカディのブレスレット"],
  ["Feather Boots", "軽量化ブーツ"],
  ["Maverick Runner", "マベリックランナー"],
  ["Straitjacket Sneakers", "風火輪"],
  ["Mithril Boots", "ミスリルブーツ"],
  ["Bucephalus", "ブケパロス"],
  ["EOD Boots", "EODシューズ"],
  ["White Rhinos", "クリングオンブーツ"],
  ["Glacial Shoes", "グレイシャルシューズ"],
  ["Boots of Hermes", "エルメスのブーツ"],
  ["Red Shoes", "赤い靴"],
  ["Laced Quiver", "矢筒"],
  ["Uchiwa", "うちわ"],
  ["Schrodinger's Box", "博士の箱"],
  ["Veritas Lux Mea", "真理は我が光"],
  ["Emerald Tablet", "エメラルドタブレット"],
  ["Glacial Ice", "万年氷"],
  ["True Samadhi Fire", "三昧真火"],
  ["Moonlight Pendant", "月光ペンダント"],
  ["White Crane Fan", "白羽扇"],
  ["Magazine", "弾倉"],
  ["Flower of Fate", "運命の花"],
  ["Revenge of Goujin", "戉王鳩淺"],
  ["Feather Duster", "埃払い"],
  ["Tindalos Band", "ティンダロスの腕輪"],
  ["Sniper Scope", "狙撃スコープ"],
  ["Buccaneer Doubloon", "海賊の証票"],
])

export { dictionary_ja }
