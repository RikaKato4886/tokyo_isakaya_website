import Polyglot from 'node-polyglot';

class TranslationApp2 {
  constructor() {
    this.polyglot = new Polyglot();
    this.currentLocale = localStorage.getItem("locale" || "ja");
    this.updateLocale = this.updateLocale.bind(this);
  }

  setup() {
    if (this.currentLocale === "ja"){
      this.polyglot.extend({
        "menu_top_link":"メニュー",
        "ippin":"一品料理",
        "otegaru":"お手軽料理",
        "salad":"サラダ",
        "drink":"お飲み物",
        "daily_osusume": "上記以外にも、その日のおすすめ料理がございます。ご来店の際には、お気軽にスタッフまでお声かけ下さい。",
        "atsuage":"厚揚げ焼き",
        "atsuageni":"厚揚げ煮",
        "tofusteak":"豆腐ステーキきのこあんかけ",
        "toritama":"鳥玉きのこあんかけ",
        "torinegi":"鳥と葱の炒め物(タレor塩)",
        "butakim":"豚キムチ炒め",
        "champuru":"漬物チャンプル",
        "butashabu":"豚しゃぶ香味ソース",
        "chips":"ポテトフライ",
        "yakitorigratin":"焼き鳥グラタン",
        "kimchigratin":"キムチグラタン",
        "torikawa":"鶏皮ポン酢",
        "Deepcheese":"チーズの唐揚げ",
        "octopus":"タコぶつ",
        "tofu":"冷奴",
        "tanuki":"たぬきやっこ",
        "slicetomato":"冷やしトマト",
        "edamame":"枝豆",
        "katsuochip":"特製かつお節チップ",
        "shiokobu":"塩こぶキャベツ",
        "tsukemono":"漬物",
        "kimchi":"キムチ",
        "cheesechip":"チーズチップ",
        "hmpickle":"自家製ピクルス",
        "tofucream":"クリームチーズやっこ",
        "shiokara": "函館直送いか塩辛",
        "sobasalad": "そばサラダ",
        "ramensalad": "ラーメンサラダ",
        "potatosalad": "ポテトサラダ",
        "torikawasalad": "鳥皮サラダ",
        "eggsalad": "たまごサラダ",
        "ebisubeer": "エビス生ビール中",
        "sapporokuro": "サッポロ黒ラベル中瓶",
        "hoppikuro": "ホッピー黒",
        "hoppishiro": "ホッピー白",
        "hoppinaka": "ホッピー中身",
        "hoppinakadouble": "ホッピー中身ダブル",
        "highball": "角ハイボール",
        "harperhigh": "ハーパーハイボール",
        "redhigh": "赤ハイボール",
        "umesh": "梅酒",
        "sumiwata": "澄み渡る梅酒",
        "shiroume": "白加賀梅酒",
        "akaume": "赤梅酒",
        "kokutoume": "黒糖梅酒",
        "umegyoku": "梅酒玉露割り",
        "santory": "サントリー角瓶",
        "hakushu": "サントリー白州",
        "johnnie": "ジョニーウォーカー(赤)",
        "IWharper": "I.W ハーパー",
        "shochuhigh": "焼酎ハイボール",
        "bikkihigh": "びっきぃハイボール",
        "freshlemonhigh": "生レモンハイボール",
        "grapefruithigh": "生グレープフルーツハイボール",
        "lemonhigh": "レモンハイボール",
        "shochu": "焼酎",
        "takara": "宝焼酎 純 (甲類)",
        "shirashin": "知心剣 (麦)",
        "waramugi": "和ら麦 (麦)",
        "ikkomon": "一刻者 (芋)",
        "karari": "からり芋 (芋)",
        "kokutoshu": "黒糖酒 (黒糖)",
        "mizuho": "瑞穂 (泡盛)",
        "kikutsuyu": "菊の露40度",
        "citrushigh": "シークワーサーハイボール",
        "winehigh": "ワインハイボール(赤 or 白)",
        "calpishigh": "カルピスハイボール",
        "turmerichigh": "ウコンウーロンハイ",
        "gyokurohigh": "玉露ハイ",
        "jasminehigh": "ジャスミンハイ",
        "footer_name1":"■店名: ",
        "footer_name2":"食楽びっきぃ",
        "footer_address1":"■住所:",
        "footer_address2":"東京都北区赤羽1-42-15",
        "footer_phone1":"■電話番号:",
        "footer_time1":"■営業時間:",
        "footer_time2":"[月-日] 17時-0時",
        "footer_card1":"■カード利用: ",
        "footer_card2":"可（VISA,Master,AMEX,JCB,Diners）",
      });
    } else {
      this.polyglot.extend({
        "menu_top_link":"menu",
        "ippin":"Ala Carte",
        "otegaru":"Appetizer",
        "salad":"Salad",
        "drink":"Drink",
        "daily_osusume": "We have more recommendations other than this menu. Please feel free to ask us when you come here!",
        "atsuage":"Stir Fried Atsuage(deep fried Tofu)",
        "atsuageni":"Atsuage(deep fried Tofu) stew",
        "tofusteak":"Tofu Steak with mushroom source",
        "toritama":"Chicken-Egg with mushroom source",
        "torinegi":"Stir fried chicken and leek(TARE source or Salt)",
        "butakim":"Stir fried pork Kimchi",
        "champuru":"Okinawan stir-fry dish with pickle",
        "butashabu":"Boiled Pork(shabu) with source",
        "chips":"French Fries",
        "yakitorigratin":"Yakitori Gratin",
        "kimchigratin":"Kimchi Gratin",
        "torikawa":"Torikawa Ponzu(Chicken Skin with Ponzu Sauce)",
        "Deepcheese":"Deep fried cheese",
        "octopus":"Octopus",
        "tofu":"Tofu",
        "tanuki":"Tofu with tempura bits",
        "slicetomato":"Sliced Tomato",
        "edamame":"Edamame",
        "katsuochip":"Dried Bonito Chips",
        "shiokobu":"Cabbage with salted konbu(sea weed)",
        "tsukemono":"Pickle",
        "kimchi":"Kimchi",
        "cheesechip":"Cheesechip",
        "hmpickle":"Home-made Pickle",
        "tofucream":"Tofu with CreamCheese",
        "shiokara": "Shiokara(from Hokkaido)",
        "sobasalad": "Soba-salad",
        "ramensalad": "Ramen-salad",
        "potatosalad": "Potato-salad",
        "torikawasalad": "Chicken-skin-salad",
        "eggsalad": "Egg-salad",
        "ebisubeer": "Ebisu draft beer",
        "sapporokuro": "Sapporo black label",
        "hoppikuro": "Hoppi Kuro",
        "hoppishiro": "Hoppi Shiro",
        "hoppinaka": "Hoppi naka(only shochu)",
        "hoppinakadouble": "Hoppi naka double (double shochu)",
        "highball": "HighBall(whisky&Soda)",
        "harperhigh": "Harper High Ball",
        "redhigh": "Red high ball",
        "umesh": "Umeshu(plum wine)",
        "sumiwata": "Sumiwataru Umeshu",
        "shiroume": "Shirokaga Umeshu",
        "akaume": "Red Umeshu",
        "kokutoume": "Blown sugar Umeshu",
        "umegyoku": "Umeshu x green tea",
        "santory": "Santory Whisky",
        "hakushu": "Santory Hakushu",
        "johnnie": "Johnnie Walker RED LABEL",
        "IWharper": "I.W HARPER",
        "shochuhigh": "Shochu x Highball",
        "bikkihigh": "Bikki Highball",
        "freshlemonhigh": "Fresh Lemon Highball",
        "grapefruithigh": "Fresh grapefruit Highball",
        "lemonhigh": "Lemon Highball",
        "shochu": "Shochu",
        "takara": "Takara shochu Jun",
        "shirashin": "Shirashinken (Mugi)",
        "waramugi": "Waramugi (Mugi)",
        "ikkomon": "Ikkomon (Imo)",
        "karari": "Karari Imo (Imo)",
        "kokutoshu": "Blown Sugar Sake",
        "mizuho": "Mizuho (Awamori)",
        "kikutsuyu": "Kiku no Tsuyu (Awamori)",
        "citrushigh": "Citrus Highball",
        "winehigh": "Wine Highball (red or white)",
        "calpishigh": "Calpis Highball",
        "turmerichigh": "Turmerich BlackTea Highball",
        "gyokurohigh": "GreenTea Highball",
        "jasminehigh": "Jasmine Highball",
        "footer_name1":"■Name: ",
        "footer_name2":"Bikki (Shokuraku Bikki)",
        "footer_address1":"■Address:",
        "footer_address2":"1-42-15 Akabane, Kita-ku, Tokyo",
        "footer_phone1":"■Phone Number:",
        "footer_time1":"■Open hour:",
        "footer_time2":"[Mon-Sun] 5PM-0AM",
        "footer_card1":"■Credit Card: ",
        "footer_card2":"OK（VISA,Master,AMEX,JCB,Diners）",
      });
    }
  }

  updateLocale(e) {
    //ボタンにセットされたdata-localeを元に現在のlocaleを変更します。
    const clickedlocale = e.target.dataset.locale;
    localStorage.setItem("locale", clickedlocale);
    this.currentLocale = clickedlocale;
    console.log(this.currentLocale)
    this.showMessage();
  }

  showMessage() {
    this.setup()
    const text1 = document.getElementById('menu_top_link');
    text1.textContent = this.polyglot.t('menu_top_link');
    const text2 = document.getElementById('ippin');
    text2.textContent = this.polyglot.t('ippin');
    const text3 = document.getElementById('otegaru');
    text3.textContent =this.polyglot.t('otegaru');
    const text4 = document.getElementById('salad');
    text4.textContent = this.polyglot.t('salad');
    const text5 = document.getElementById('drink');
    text5.textContent = this.polyglot.t('drink');
    const text6 = document.getElementById('daily_osusume');
    text6.textContent = this.polyglot.t('daily_osusume');
    const text7 = document.getElementById('atsuage');
    text7.textContent = this.polyglot.t('atsuage');
    const text8 = document.getElementById('atsuageni');
    text8.textContent = this.polyglot.t('atsuageni');
    const text9 = document.getElementById('tofusteak');
    text9.textContent = this.polyglot.t('tofusteak');
    const text10 = document.getElementById('toritama');
    text10.textContent = this.polyglot.t('toritama');
    const text11 = document.getElementById('torinegi');
    text11.textContent = this.polyglot.t('torinegi');
    const text12 = document.getElementById('butakim');
    text12.textContent = this.polyglot.t('butakim');
    const text13 = document.getElementById('champuru');
    text13.textContent = this.polyglot.t('champuru');
    const text14 = document.getElementById('butashabu');
    text14.textContent = this.polyglot.t('butashabu');
    const text15 = document.getElementById('chips');
    text15.textContent = this.polyglot.t('chips');
    const text16 = document.getElementById('yakitorigratin');
    text16.textContent =this.polyglot.t('yakitorigratin');
    const text17 = document.getElementById('kimchigratin');
    text17.textContent = this.polyglot.t('kimchigratin');
    const text18 = document.getElementById('torikawa');
    text18.textContent = this.polyglot.t('torikawa');
    const text19 = document.getElementById('Deepcheese');
    text19.textContent = this.polyglot.t('Deepcheese');
    const text20 = document.getElementById('octopus');
    text20.textContent = this.polyglot.t('octopus');
    const text21 = document.getElementById('atsuageni');
    text21.textContent = this.polyglot.t('atsuageni');
    const text22 = document.getElementById('tofu');
    text22.textContent = this.polyglot.t('tofu');
    const text23 = document.getElementById('tanuki');
    text23.textContent = this.polyglot.t('tanuki');
    const text24 = document.getElementById('slicetomato');
    text24.textContent = this.polyglot.t('slicetomato');
    const text25 = document.getElementById('edamame');
    text25.textContent = this.polyglot.t('edamame');
    const text26 = document.getElementById('katsuochip');
    text26.textContent = this.polyglot.t('katsuochip');
    const text27 = document.getElementById('shiokobu');
    text27.textContent = this.polyglot.t('shiokobu');
    const text28 = document.getElementById('tsukemono');
    text28.textContent = this.polyglot.t('tsukemono');
    const text29 = document.getElementById('kimchi');
    text29.textContent = this.polyglot.t('kimchi');
    const text30 = document.getElementById('cheesechip');
    text30.textContent = this.polyglot.t('cheesechip');
    const text31 = document.getElementById('hmpickle');
    text31.textContent = this.polyglot.t('hmpickle');
    const text32 = document.getElementById('tofucream');
    text32.textContent = this.polyglot.t('tofucream');
    const text33 = document.getElementById('shiokara');
    text33.textContent = this.polyglot.t('shiokara');
    const text34 = document.getElementById('sobasalad');
    text34.textContent = this.polyglot.t('sobasalad');
    const text35 = document.getElementById('ramensalad');
    text35.textContent = this.polyglot.t('ramensalad');
    const text36 = document.getElementById('potatosalad');
    text36.textContent =this.polyglot.t('potatosalad');
    const text37 = document.getElementById('torikawasalad');
    text37.textContent = this.polyglot.t('torikawasalad');
    const text38 = document.getElementById('eggsalad');
    text38.textContent = this.polyglot.t('eggsalad');
    const text39 = document.getElementById('ebisubeer');
    text39.textContent = this.polyglot.t('ebisubeer');
    const text40 = document.getElementById('sapporokuro');
    text40.textContent = this.polyglot.t('sapporokuro');

    const text41 = document.getElementById('hoppikuro');
    text41.textContent = this.polyglot.t('hoppikuro');
    const text42 = document.getElementById('hoppishiro');
    text42.textContent = this.polyglot.t('hoppishiro');
    const text43 = document.getElementById('hoppinaka');
    text43.textContent = this.polyglot.t('hoppinaka');
    const text44 = document.getElementById('hoppinakadouble');
    text44.textContent = this.polyglot.t('hoppinakadouble');
    const text45 = document.getElementById('highball');
    text45.textContent = this.polyglot.t('highball');
    const text46 = document.getElementById('harperhigh');
    text46.textContent =this.polyglot.t('harperhigh');
    const text47 = document.getElementById('redhigh');
    text47.textContent = this.polyglot.t('redhigh');
    const text48 = document.getElementById('umesh');
    text48.textContent = this.polyglot.t('umesh');
    const text49 = document.getElementById('sumiwata');
    text49.textContent = this.polyglot.t('sumiwata');
    const text50 = document.getElementById('shiroume');
    text50.textContent = this.polyglot.t('shiroume');

    const text51 = document.getElementById('akaume');
    text51.textContent = this.polyglot.t('akaume');
    const text52 = document.getElementById('kokutoume');
    text52.textContent = this.polyglot.t('kokutoume');
    const text53 = document.getElementById('umegyoku');
    text53.textContent = this.polyglot.t('umegyoku');
    const text54 = document.getElementById('santory');
    text54.textContent = this.polyglot.t('santory');
    const text55 = document.getElementById('hakushu');
    text55.textContent = this.polyglot.t('hakushu');
    const text56 = document.getElementById('johnnie');
    text56.textContent =this.polyglot.t('johnnie');
    const text57 = document.getElementById('IWharper');
    text57.textContent = this.polyglot.t('IWharper');
    const text58 = document.getElementById('shochuhigh');
    text58.textContent = this.polyglot.t('shochuhigh');
    const text59 = document.getElementById('bikkihigh');
    text59.textContent = this.polyglot.t('bikkihigh');
    const text60 = document.getElementById('freshlemonhigh');
    text60.textContent = this.polyglot.t('freshlemonhigh');

    const text61 = document.getElementById('grapefruithigh');
    text61.textContent = this.polyglot.t('grapefruithigh');
    const text62 = document.getElementById('lemonhigh');
    text62.textContent = this.polyglot.t('lemonhigh');
    const text63 = document.getElementById('shochu');
    text63.textContent = this.polyglot.t('shochu');
    const text64 = document.getElementById('takara');
    text64.textContent = this.polyglot.t('takara');
    const text65 = document.getElementById('shirashin');
    text65.textContent = this.polyglot.t('shirashin');
    const text66 = document.getElementById('waramugi');
    text66.textContent =this.polyglot.t('waramugi');
    const text67 = document.getElementById('ikkomon');
    text67.textContent = this.polyglot.t('ikkomon');
    const text68 = document.getElementById('karari');
    text68.textContent = this.polyglot.t('karari');
    const text69 = document.getElementById('kokutoshu');
    text69.textContent = this.polyglot.t('kokutoshu');
    const text70 = document.getElementById('mizuho');
    text70.textContent = this.polyglot.t('mizuho');

    const text71 = document.getElementById('kikutsuyu');
    text71.textContent = this.polyglot.t('kikutsuyu');
    const text72 = document.getElementById('citrushigh');
    text72.textContent = this.polyglot.t('citrushigh');
    const text73 = document.getElementById('winehigh');
    text73.textContent = this.polyglot.t('winehigh');
    const text74 = document.getElementById('calpishigh');
    text74.textContent = this.polyglot.t('calpishigh');
    const text75 = document.getElementById('turmerichigh');
    text75.textContent = this.polyglot.t('turmerichigh');
    const text76 = document.getElementById('gyokurohigh');
    text76.textContent =this.polyglot.t('gyokurohigh');
    const text77 = document.getElementById('jasminehigh');
    text77.textContent = this.polyglot.t('jasminehigh');

    const text78 = document.getElementById('footer_name1');
    text78.textContent = this.polyglot.t('footer_name1');
    const text79 = document.getElementById('footer_name2');
    text79.textContent = this.polyglot.t('footer_name2');
    const text80 = document.getElementById('footer_address1');
    text80.textContent = this.polyglot.t('footer_address1');
    const text81 = document.getElementById('footer_address2');
    text81.textContent = this.polyglot.t('footer_address2');
    const text82 = document.getElementById('footer_phone1');
    text82.textContent = this.polyglot.t('footer_phone1');
    const text83 = document.getElementById('footer_time1');
    text83.textContent = this.polyglot.t('footer_time1');
    const text84 = document.getElementById('footer_time2');
    text84.textContent = this.polyglot.t('footer_time2');
    const text85 = document.getElementById('footer_card1');
    text85.textContent = this.polyglot.t('footer_card1');
    const text86 = document.getElementById('footer_card2');
    text86.textContent = this.polyglot.t('footer_card2');
  }
};

export default TranslationApp2;
