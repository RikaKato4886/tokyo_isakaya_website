// import Polyglot from 'node-polyglot';

// export default class TranslationApp {
//   constructor() {
//     this.polyglot = new Polyglot();
//     this.currentLocale = localStorage.getItem("locale" || "ja");
//     this.updateLocale = this.updateLocale.bind(this);
//   }

//   setup() {
//     //現在のLocaleに合わせて、polyglotにメッセージをセットします。メッセージのセットにはpolyglot.extend()を利用します。
//     if (this.currentLocale === "ja"){
//       this.polyglot.extend({
//         "message":"こんにちは、世界",
//       });
//     } else {
//       this.polyglot.extend({
//         "message":"Hello, World",
//       });
//     }
//   }

//   updateLocale(e) {
//     //ボタンにセットされたdata-localeを元に現在のlocaleを変更します。
//     const clickedlocale = e.target.dataset.locale;
//     localStorage.setItem("locale", clickedlocale);
//     this.currentLocale = clickedlocale;
//     console.log(this.currentLocale)
//     this.showMessage();
//   }

//   showMessage() {
//     this.setup()
//     const mainEl = document.getElementById('main');
//     mainEl.innerHTML = `
//     <h1>
//       ${this.polyglot.t('message')}
//     <h1>
//     `;
//   }

// };

// {
//   const app = new TranslationApp();
//   // console.log(app)
//   // app.setup();
//   app.showMessage();
//   const button1 = document.getElementById('button1');
//   button1.addEventListener("click", app.updateLocale);

//   const button2 = document.getElementById('button2');
//   button2.addEventListener("click", app.updateLocale);
// }
