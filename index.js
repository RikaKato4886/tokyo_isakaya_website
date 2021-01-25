// import Polyglot from 'node-polyglot';

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

//define lang reload anchors
const dataReload = document.querySelectorAll("[data-reload]");

//language translation
const language = {
  en: {
    otsukare: "Hi, Welcome to Bikki.",
    otsukare_p: "we are a small Isakaya at Akabane in Tokyo",
    corona_h4: "Measures against COVID-19",
    corona_mask: "Mask / Face-guard",
  }
};

//define language via hash..
// const textContents = () => {
  if(window.location.hash){
    if(window.location.hash === "#en"){
      otsukare.textContent = language.en.otsukare;
      otsukare_p.textContent = language.en.otsukare_p;
      corona_h4.textContent = language.en.corona_h4;
      corona_mask.textContent = language.en.corona_mask;
    }
  }


//change language - when clicked
dataReload.forEach((lang) => {
  lang.addEventListener('clock', ()=> {
    location.reload();
  })
})