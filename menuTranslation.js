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
      });
    } else {
      this.polyglot.extend({
        "menu_top_link":"menu",
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
    const text30 = document.getElementById('menu_top_link');
    text30.textContent = this.polyglot.t('menu_top_link');
  }
};

export default TranslationApp2;
