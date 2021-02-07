import Polyglot from 'node-polyglot';

class TranslationApp {
  constructor() {
    this.polyglot = new Polyglot();
    this.currentLocale = localStorage.getItem("locale" || "ja");
    this.updateLocale = this.updateLocale.bind(this);
  }

  setup() {
    if (this.currentLocale === "ja"){
      this.polyglot.extend({
        "otsukare":"今日もお疲れ様でした",
        "otsukare_p":`裏赤羽で今日は一杯、いかがですか？`,
        "corona1":"新型コロナ[COVID-19]への対策について",
        "corona_mask":`マスク・フェイスガード着用の徹底`,
        "corona_space":"客席間隔1メートルの確保",
        "corona_air":"店内における定期的な換気",
        "corona_clean":"定期的な店内設備の除菌徹底",
        "youkoso_h2":"裏赤羽の隠れ家へようこそ",
        "youkoso_one":"赤羽にどんなイメージをお持ちでしょうか？",
        "youkoso_two":"赤羽のお店は一人では入りにくい・・そんな経験のある方も多いと思います。",
        "youkoso_three":"当店は赤羽の喧騒から少し離れた場所にある、赤羽らしくも落ち着いたお店です。",
        "youkoso_four":"どこか懐かしく、ここでしか味わえない料理をおもてなし致します。",
        "osusume":"びっきぃのおすすめ",
        "recommend1":"びっきぃ名物 赤手羽揚げ",
        "recommend1_detail":"みりん、砂糖を一切使わず、醤油と厳選した調味料で5時間漬け込んだ絶品手羽揚げです。",
        "recommend2":"自家製ピクルス",
        "recommend2_detail":"お代わり続出！さわやかな自家製のピクルスです。",
        "menu_link":"その他のメニューはこちらから",
        "information":"店舗情報",
        "photo_detail":"内観:カウンター8席 / 掘り炬燵のお座敷7席（4席、3席）",
        "movie":"Youtubeでも紹介されました！",
        "footer_name1":"■店名: ",
        "footer_name2":"食楽びっきぃ",
        "footer_address1":"■住所:",
        "footer_address2":"東京都北区赤羽1-42-15",
        "footer_phone1":"■電話番号:",
        "footer_time1":"■営業時間:",
        "footer_time2":"[月-日] 17時-0時",
        "footer_card1":"■カード利用: ",
<<<<<<< HEAD
        "footer_card2":"可（VISA,Master,AMEX,JCB）",
=======
        "footer_card2":"可（VISA,Master,AMEX,JCB,Diners）",
        "home":"ホーム",
        "oshinagaki": "お品書き",
        "tempo": "店舗情報",
>>>>>>> develop
      });
    } else {
      this.polyglot.extend({
        "otsukare":"Hi, Welcome to Bikki",
        "otsukare_p":"we are a small Isakaya in Akabane, Tokyo",
        "corona1":"Measures against COVID-19",
        "corona_mask":" Wear Mask or Face-guard",
        "corona_space":"Create Social Distance",
        "corona_air":"Exchange Air Frequently",
        "corona_clean":"Clean Equipments Frequently",
        "youkoso_h2":"What is Bikki..?",
        "youkoso_one":"Have you ever been to Akabane?",
        "youkoso_two":"You might think that it is awkward to enter Izakaya in Akabane.",
        "youkoso_three":"We are located a little bit away from Akabane main road",
        "youkoso_four":"We are going to welcome you with warm service and Japanese style food!",
        "osusume":"Bikki's Recommendation",
        "recommend1":"Red Chicken Wings",
        "recommend1_detail":"Marinated with Special Soysource for more than 5 hours without Mirin and Sugar.",
        "recommend2":"Handmade Pickles",
        "recommend2_detail":"Handmade Pickles! one of our popular menus. you can enjoy fresh taste of local vegitable",
        "menu_link":"Other menu",
        "information":"Information",
        "photo_detail":" 8 Counter Seats / 7 Japanese Style Tatami Seats(No chair)",
        "movie":"We are introduced by Japanese Youtbe Channel",
        "footer_name1":"■Name: ",
        "footer_name2":"Bikki (Shokuraku Bikki)",
        "footer_address1":"■Address:",
        "footer_address2":"1-42-15 Akabane, Kita-ku, Tokyo",
        "footer_phone1":"■Phone Number:",
        "footer_time1":"■Open hour:",
        "footer_time2":"[Mon-Sun] 5PM-0AM",
        "footer_card1":"■Credit Card: ",
        "footer_card2":"OK（VISA,Master,AMEX,JCB,Diners）",
        "home":"TOP",
        "oshinagaki": "Menu",
        "tempo": "Information",
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
    const text1 = document.getElementById('otsukare');
    text1.textContent = this.polyglot.t('otsukare');
    const text2 = document.getElementById('otsukare_p');
    text2.textContent = this.polyglot.t('otsukare_p');
    const text3 = document.getElementById('corona1');
    text3.textContent = this.polyglot.t('corona1');
    const text4 = document.getElementById('corona_mask');
    text4.textContent = this.polyglot.t(`corona_mask`);
    const text5 = document.getElementById('corona_space');
    text5.textContent = this.polyglot.t(`corona_space`);
    const text55 = document.getElementById('corona_air');
    text55.textContent = this.polyglot.t(`corona_air`);
    const text6 = document.getElementById('corona_clean');
    text6.textContent = this.polyglot.t('corona_clean');
    const text7 = document.getElementById('youkoso_h2');
    text7.textContent = this.polyglot.t('youkoso_h2');
    const text8 = document.getElementById('youkoso_one');
    text8.textContent = this.polyglot.t('youkoso_one');
    const text9 = document.getElementById('youkoso_two');
    text9.textContent = this.polyglot.t('youkoso_two');
    const text10 = document.getElementById('youkoso_three');
    text10.textContent = this.polyglot.t('youkoso_three');
    const text11 = document.getElementById('youkoso_four');
    text11.textContent = this.polyglot.t('youkoso_four');
    const text12 = document.getElementById('osusume');
    text12.textContent = this.polyglot.t('osusume');
    const text13 = document.getElementById('recommend1');
    text13.textContent = this.polyglot.t('recommend1');
    const text14 = document.getElementById('recommend1_detail');
    text14.textContent = this.polyglot.t('recommend1_detail');
    const text15 = document.getElementById('recommend2');
    text15.textContent = this.polyglot.t('recommend2');
    const text16 = document.getElementById('recommend2_detail');
    text16.textContent = this.polyglot.t('recommend2_detail');
    const text17 = document.getElementById('menu_link');
    text17.textContent = this.polyglot.t('menu_link');
    const text18 = document.getElementById('information');
    text18.textContent = this.polyglot.t('information');
    const text19 = document.getElementById('photo_detail');
    text19.textContent = this.polyglot.t('photo_detail');
    const text20 = document.getElementById('movie');
    text20.textContent = this.polyglot.t('movie');
    const text21 = document.getElementById('footer_name1');
    text21.textContent = this.polyglot.t('footer_name1');
    const text22 = document.getElementById('footer_name2');
    text22.textContent = this.polyglot.t('footer_name2');
    const text23 = document.getElementById('footer_address1');
    text23.textContent = this.polyglot.t('footer_address1');
    const text24 = document.getElementById('footer_address2');
    text24.textContent = this.polyglot.t('footer_address2');
    const text25 = document.getElementById('footer_phone1');
    text25.textContent = this.polyglot.t('footer_phone1');
    const text26 = document.getElementById('footer_time1');
    text26.textContent = this.polyglot.t('footer_time1');
    const text27 = document.getElementById('footer_time2');
    text27.textContent = this.polyglot.t('footer_time2');
    const text28 = document.getElementById('footer_card1');
    text28.textContent = this.polyglot.t('footer_card1');
    const text29 = document.getElementById('footer_card2');
    text29.textContent = this.polyglot.t('footer_card2');
    const text30 = document.getElementById('home');
    text30.textContent = this.polyglot.t('home');
    const text31 = document.getElementById('oshinagaki');
    text31.textContent = this.polyglot.t('oshinagaki');
    const text32 = document.getElementById('tempo');
    text32.textContent = this.polyglot.t('tempo');
  }
};

export default TranslationApp;
