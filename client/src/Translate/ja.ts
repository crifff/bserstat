const dictionary_ja = new Map<string, string>([
  ["", ""],
  ["character(all)", "キャラクター(全体)"],
  ["character(high tier)", "キャラクター(上位)"],
  ["weapon(all)", "武器(全体)"],
  ["weapon(high tier)", "武器(上位)"],
  ["armor(all)", "防具(全体)"],
  ["armor(high tier)", "防具(上位)"],
  ["updated", "更新日"],
  ["period", "期間"],
  ["solo", "ソロ"],
  ["duo", "デュオ"],
  ["squad", "スクアッド"],
  ["character", "キャラクター"],
  ["weapon", "武器"],
  ["weapon type", "武器種"],
  ["win rate", "勝率"],
  ["pick rate", "ピック率"],
  ["player kill", "キル数"],
  ["average rank", "平均順位"],
  ["mmr efficiency", "mmr効率"],
  ["adriana", "アドリアナ"],
  ["aya", "アヤ"],
  ["chiara", "キアラ"],
  ["emma", "エマ"],
  ["fiora", "フィオラ"],
  ["hart", "ハート"],
  ["hyejin", "ヘジン"],
  ["hyunwoo", "ヒョヌ"],
  ["isol", "アイソル"],
  ["jackie", "ジャッキー"],
  ["lenox", "レノックス"],
  ["li dailin", "ダイリン"],
  ["magnus", "マグヌス"],
  ["nadine", "ナディン"],
  ["rozzi", "ロッジ"],
  ["shoichi", "彰一"],
  ["silvia", "シルヴィア"],
  ["sissela", "シセラ"],
  ["xiukai", "シウカイ"],
  ["yuki", "雪"],
  ["zahir", "ザヒル"],
  ["luke", "ルク"],
  ["cathy", "キャッシー"],
  ["adela", "アデラ"],
  ["bernice", "バニス"],
  ["barbara", "バーバラ"],
  ["alex", "アレックス"],
  ["sua", "スア"],
  ["leon", "レオン"],
  ["eleven", "eleven"],
  ["rio", "リオ"],
  ["all melee", "近距離全体"],
  ["all ranged", "遠距離全体"],
  ["base win rate", "基準勝率"],
  ["throw", "投擲"],
  ["pistol", "拳銃"],
  ["assault rifle", "突撃銃"],
  ["sniper", "狙撃銃"],
  ["sniper rifle", "狙撃銃"],
  ["rapier", "レイピア"],
  ["shuriken", "暗器"],
  ["spear", "槍"],
  ["two-handed sword", "両手剣"],
  ["two handed sword", "両手剣"],
  ["guitar", "ギター"],
  ["bow", "弓"],
  ["tonfa", "トンファー"],
  ["glove", "拳"],
  ["axe", "斧"],
  ["dual sword", "デュアルソード"],
  ["dual swords", "デュアルソード"],
  ["dagger", "短剣"],
  ["whip", "鞭"],
  ["nunchaku", "ヌンチャク"],
  ["bat", "バット"],
  ["hammer", "ハンマー"],
  ["4 types", "4種"],
  ["crossbow", "石弓"],
  ["smoke bomb", "煙幕弾"],
  ["incendiary bomb", "焼夷弾"],
  ["david's sling", "ダビデのスリング"],
  ["grenade of antioch", "アンティオキアの手榴弾"],
  ["ruthenium marble", "ルテニウムの玉"],
  ["ak-12", "AK-12"],
  ["xcr", "XCR"],
  ["gatling gun", "ガトリングガン"],
  ["type 95", "95式自動小銃"],
  ["agni", "アグニ"],
  ["devil's marksman", "魔弾の射手"],
  ["elegance", "エレガンス"],
  ["electron blaster", "エレクトロンブラスター"],
  ["magnum-boa", "マグナム・ボア"],
  ["kelte", "アクケルテ"],
  ["tac-50", "TAC-50"],
  ["intervention", "インターベンション"],
  ["ntw-20", "NTW-20"],
  ["polaris", "ポラリス"],
  ["the deadly ray", "斜射星光"],
  ["durendal mk2", "デュランダルmk2"],
  ["mistilteinn", "ミスティルテイン"],
  ["volticletto", "ボルティックレット"],
  ["red panther", "レッドパンサー"],
  ["meteor claymore", "流星剣"],
  ["joyeuse", "ジョワユーズ"],
  ["cards of tyranny", "狂気王のカード"],
  ["mystic jade charm", "玉篆訣"],
  ["fuhma shuriken", "風魔手裏剣"],
  ["frost venom dart", "氷魄銀針"],
  ["azure dagger", "青色の短刀"],
  ["flechette", "フレシェット弾"],
  ["wind and fire wheels", "乾坤圈"],
  ["death rune", "生死符"],
  ["sudarsana", "スダルサナ"],
  ["petal torrent", "滿天花雨"],
  ["gentian silver gun", "涯角槍"],
  ["eighteen foot spear", "丈八蛇矛"],
  ["cosmic bident", "コスミックバイデント"],
  ["lance of poseidon", "トリアイナ"],
  ["blazing lance", "火尖槍"],
  ["fangtian huaji", "方天畫戟"],
  ["dragon guandao", "青龍偃月刀"],
  ["spear of longinus", "ロンギヌスの槍"],
  ["thuận thiên", "タンキエム"],
  ["arondight", "アロンダイト"],
  ["excalibur", "エクスカリバー"],
  ["plasma sword", "プラズマソード"],
  ["aurora longsword", "光の剣"],
  ["laevateinn", "レーヴァテイン"],
  ["monohoshizao", "物干し竿"],
  ["hovud", "ホヴズ"],
  ["dáinsleif", "ダインスレイヴ"],
  ["bohemian", "ボヘミアン"],
  ["stairway to heaven", "天国への階段"],
  ["purple haze", "パープル・ヘイズ"],
  ["satisfaction", "サティスファクション"],
  ["wonderful tonight", "ワンダフルトゥナイト"],
  ["the wall", "ザ・ウォール"],
  ["teen spirit", "ティーンスピリット"],
  ["ancient bolt", "片箭"],
  ["golden-ratio bow", "黄金比率の弓"],
  ["twinbow", "ツインボウ"],
  ["elemental bow", "エレメンタルボウ"],
  ["failnaught", "無駄なしの弓"],
  ["argyrotoxus", "アリュギュロトクソス	"],
  ["jebe's altered bow", "ジェベの矢"],
  ["tactical tonfa", "戦術トンファー"],
  ["mai sok", "マイソック"],
  ["plasma tonfa", "プラズマトンファー"],
  ["windrunner", "ウインドランナー"],
  ["one inch punch", "単零寸千闘"],
  ["divine fist", "聖なる拳"],
  ["bloodwing knuckles", "ウィングナックル"],
  ["frost petal hand", "氷花現玉手"],
  ["buddha's palm", "如来手闘"],
  ["brasil gauntlet", "B・ガントレット"],
  ["white claw punch", "素手"],
  ["imperial silk gloves", "天蚕手袋"],
  ["beam axe", "ビームアックス"],
  ["santa muerte", "サンタムエルテ"],
  ["scythe", "大釜"],
  ["parashu", "パラシュ"],
  ["harpe", "ハルペー"],
  ["the juggernaut", "ジャガンナート"],
  ["divine dual swords", "二天一流"],
  ["starsteel dual swords", "雌雄一対の剣"],
  ["starsteel twin swords", "雌雄一対の剣"],
  ["dioscuri", "ディオスクロイ"],
  ["lloigor & zahr", "ロイガーツァール"],
  ["carnwennan", "カルンウェナン"],
  ["mount slicer", "破山剣"],
  ["vibroblade", "超振動ナイフ"],
  ["damascus steel thorn", "ダマスカス鋼の棘"],
  ["fragarach", "フラガラック"],
  ["thunder whip", "雷龍鞭"],
  ["gleipnir", "グレイプニル"],
  ["plasma whip", "プラズマ鞭"],
  ["bloody nine tails", "血花九節鞭"],
  ["the smiting dragon", "大小盤龍棍"],
  ["vibro nunchaku", "超振動ヌンチャク"],
  ["cerberus", "ケルベロス"],
  ["statue of soteria", "救援の女神像"],
  ["mallet", "打狗棒"],
  ["spy umbrella", "スパイの傘"],
  ["monkey king bar", "如意棒"],
  ["fang mace", "狼牙棒"],
  ["hammer of dagda", "ダグダのハンマー"],
  ["hammer of thor", "トールハンマー"],
  ["peacebringer", "ピースブリンガー"],
  ["forged destiny", "運命のハンマー"],
  ["weight of the world", "千斤錘"],
  ["evening star", "金星剣"],
  ["magic stick", "魔法ステッキ"],
  ["the legend of the general", "李広の弩"],
  ["ballista", "バリスタ"],
  ["sniper crossbow", "狙撃クロスボウ"],
  ["the golden ghost", "靈光金亀神機弩"],
  ["sharanga", "シャランガ"],
  ["type", "タイプ"],
  ["head", "頭"],
  ["chest", "服"],
  ["arm", "腕"],
  ["leg", "脚"],
  ["accessory", "装具"],
  ["armor", "防具"],
  ["mithril helm", "ミスリルヘルム"],
  ["crystal tiara", "水晶ティアラ"],
  ["motorcycle helmet", "バイクヘルメット"],
  ["tactical ops helmet", "戦術OPSヘルメット"],
  ["helm of banneret", "騎士団長の兜"],
  ["laurel wreath", "月桂冠"],
  ["imperial crown", "帝国王冠"],
  ["imperial burgonet", "皇室ブルゴネット"],
  ["chinese opera mask", "臉譜"],
  ["elysian halo", "エンジェルヘイロー"],
  ["covert agent uniform", "御史衣"],
  ["sunset armor", "黄昏の鎧"],
  ["optical camouflage suit", "光学迷彩スーツ"],
  ["rocker's jacket", "ロッカージャケット"],
  ["mithril armor", "ミスリル鎧"],
  ["crusader armor", "聖騎士の鎧"],
  ["amazoness armor", "アマゾネスアーマー"],
  ["dragon dobok", "龍の道服"],
  ["butler's suit", "執事服"],
  ["battle suit", "バトルスーツ"],
  ["blazing dress", "炎のドレス"],
  ["eod suit", "EODスーツ"],
  ["commander's armor", "指揮官の鎧"],
  ["kabana", "カバナ"],
  ["queen of hearts", "クイーンオブハート"],
  ["tuxedo", "タキシード"],
  ["high priest robes", "祭司長の礼服"],
  ["sword stopper", "ソードストッパー"],
  ["draupnir", "ドラウプニル"],
  ["creed of the knight", "騎士の信条"],
  ["sheath of shah jahan", "シャージャハーン鞘"],
  ["cube watch", "キューブウォッチ"],
  ["vital sign sensor", "バイタルセンサー"],
  ["burnished aegis", "アイギス"],
  ["radar", "レーダー"],
  ["mithril shield", "ミスリル盾"],
  ["auto arms", "オートアームズ"],
  ["auto-arms", "オートアームズ"],
  ["bracelet of skadi", "スカディのブレスレット"],
  ["feather boots", "軽量化ブーツ"],
  ["maverick runner", "マベリックランナー"],
  ["straitjacket sneakers", "風火輪"],
  ["mithril boots", "ミスリルブーツ"],
  ["bucephalus", "ブケパロス"],
  ["eod boots", "EODシューズ"],
  ["white rhinos", "クリングオンブーツ"],
  ["tachyon brace", "タキオンブレイス"],
  ["glacial shoes", "グレイシャルシューズ"],
  ["boots of hermes", "エルメスのブーツ"],
  ["red shoes", "赤い靴"],
  ["laced quiver", "矢筒"],
  ["uchiwa", "うちわ"],
  ["schrodinger's box", "博士の箱"],
  ["schrödinger's box", "博士の箱"],
  ["veritas lux mea", "真理は我が光"],
  ["emerald tablet", "エメラルドタブレット"],
  ["glacial ice", "万年氷"],
  ["true samadhi fire", "三昧真火"],
  ["moonlight pendant", "月光ペンダント"],
  ["white crane fan", "白羽扇"],
  ["magazine", "弾倉"],
  ["flower of fate", "運命の花"],
  ["revenge of goujian", "戉王鳩淺"],
  ["revenge of goujin", "戉王鳩淺"],
  ["feather duster", "埃払い"],
  ["tindalos band", "ティンダロスの腕輪"],
  ["sniper scope", "狙撃スコープ"],
  ["buccaneer doubloon", "海賊の証票"],
  ["buccaneer doubloon", "海賊の証票"],
  ["lunar embrace", "邀明月"],
  ["hawkeye", "ホークアイ"],
]);

export { dictionary_ja }
