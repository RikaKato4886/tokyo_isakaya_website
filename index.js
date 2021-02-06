import TranslationApp from "./translation.js";

///////////////////  LP Animation  //////////////////
ScrollReveal({ reset: true }).reveal('.top-text',{delay: 200});
ScrollReveal({ reset: true }).reveal('.corona-detail',{delay: 400});
ScrollReveal({ reset: true }).reveal('.top-message-box',{delay: 200});
ScrollReveal({ reset: true }).reveal('.foodmenu-title', {delay: 200});
ScrollReveal({ reset: true }).reveal('.wrap', {delay: 200});

/////////////  Multilingual Setting  //////////
{
  const app = new TranslationApp();
  app.showMessage();
  const button1 = document.getElementById('button1');
  button1.addEventListener("click", app.updateLocale);

  const button2 = document.getElementById('button2');
  button2.addEventListener("click", app.updateLocale);
}















