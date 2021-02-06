import TranslationApp from "./translation.js";
import TranslationApp2 from "./menuTranslation.js";

///////////////////  LP Animation  //////////////////
ScrollReveal({ reset: true }).reveal('.top-text',{delay: 200});
ScrollReveal({ reset: true }).reveal('.corona-detail',{delay: 400});
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

{
  const app = new TranslationApp();
  app.showMessage();
  const button1 = document.getElementById('button1');
  button1.addEventListener("click", app.updateLocale);

  const button2 = document.getElementById('button2');
  button2.addEventListener("click", app.updateLocale);
}

{
  const app1 = new TranslationApp2();
  app1.showMessage();
  const button3 = document.getElementById('button3');
  button3.addEventListener("click", app1.updateLocale);

  const button4 = document.getElementById('button4');
  button4.addEventListener("click", app1.updateLocale);
}

















