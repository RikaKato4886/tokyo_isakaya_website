import Polyglot from 'node-polyglot';

///////////////////  LP Animation  //////////////////
ScrollReveal({ reset: true }).reveal('.top-text',{delay: 200});
ScrollReveal({ reset: true }).reveal('.top-message-box',{delay: 200});
ScrollReveal({ reset: true }).reveal('.foodmenu-title', {delay: 200});
ScrollReveal({ reset: true }).reveal('.wrap', {delay: 200});


///////////////////  Modal  //////////////////

// Get the modal
const modals = document.querySelectorAll(".modal");
// Get the button that opens the modal
const openModalBtns = document.querySelectorAll(".modal-open");
// Get btn-close
const closeBtns = document.querySelectorAll(".btn-close");
//Get modal cover
const modalCovers = document.querySelectorAll('.modal-cover')

//モーダルを閉じる処理
const closeModal = () => {
  modals.forEach((modal)=>{
  modal.classList.add('is-close')
  modal.classList.remove('is-open')
  modal.classList.remove('is-close')
  })
};

// 外の範囲クリックでmodalを閉じる
window.onclick = (e) => {
  modalCovers.forEach((modalCover) => {
    if(e.target === modalCover){
      closeModal();
    }
  });
};

// モーダル開くボタンクリックでmodalを開く
openModalBtns.forEach((openModalBtn) => {
  openModalBtn.addEventListener('click', () => {
    const clikedOpenBtn = openModalBtn.getAttribute('data-modal-open');
    modals.forEach((modal) => { //もしも同じNumの場合
      const modalDataNum = modal.getAttribute('data-modal');
      if(modalDataNum === clikedOpenBtn){
        modal.classList.add('is-open')
      }
    })
  })
});

// グレーのcloseボタンクリックでmodalを閉じる
closeBtns.forEach((closeBtn) => {
  closeBtn.addEventListener('click', () => {
    closeModal();
  });
});

/////////////  Multilingual Setting  //////////

class TranslationApp {
  constructor() {
    this.polyglot = new Polyglot();
    this.currentLocale = localStorage.getItem("locale" || "ja");
    this.updateLocale = this.updateLocale.bind(this);
  }

  setup() {
    //現在のLocaleに合わせて、polyglotにメッセージをセットします。メッセージのセットにはpolyglot.extend()を利用します。
    if (this.currentLocale === "ja"){
      this.polyglot.extend({
        "otsukare":"今日もお疲れ様でした",
        "otsukare_p":"裏赤羽で今日は一杯、いかがですか？",
        "corona1":"新型コロナ[COVID-19]への対策について",
      });
    } else {
      this.polyglot.extend({
        "otsukare":"Hi, Welcome to Bikki",
        "otsukare_p":"we are a small Isakaya at Akabane in Tokyo",
        "corona1":"Measures against COVID-19",
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
  }
};

{
  const app = new TranslationApp();
  app.showMessage();
  const button1 = document.getElementById('button1');
  button1.addEventListener("click", app.updateLocale);

  const button2 = document.getElementById('button2');
  button2.addEventListener("click", app.updateLocale);
}

















