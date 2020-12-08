const menuBtn = document.querySelector('.menuButton');
const drinkBtn = document.querySelector('.drink-Button');

const showMenu = () => {
  const menuDivs = document.querySelectorAll('.menu-container');

  menuDivs.forEach((div) => {
    // div.style.display = "block"
    if(div.style.display === "none"){
      div.style.display = "block";
    } else{
      div.style.display = "none";
    }

  })
}

const drinkMenu = () =>  {
  const drinkDivs = document.querySelectorAll('.drink-menu-container');

  drinkDivs.forEach((div) => {

    if(div.style.display === "none"){
      div.style.display = "block";
    } else{
      div.style.display = "none";
    }

  })
}

menuBtn.addEventListener('click', showMenu);
drinkBtn.addEventListener('click', drinkMenu);
