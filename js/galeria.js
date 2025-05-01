const imgMax = document.getElementById("imgMax");
const imgOpened = document.getElementById("imgOpened");
const imagenes = document.querySelectorAll(".column img");
const divNav = document.getElementById("divNav");

function openImg(imageClicked) {
  imgOpened.src = imageClicked.src;
  imgMax.style.zIndex = 99;
  imgMax.style.display = "flex";
  divNav.style.display = "none";
  setTimeout(() => {
    imgMax.style.opacity = 1;
  }, 1);
}
imagenes.forEach((imagen) => {
  imagen.addEventListener("click", () => {
    openImg(imagen);
  });
});

function closeImg() {
  imgMax.style.opacity = 0;
  divNav.style.display = "flex";
  setTimeout(() => {
    imgMax.style.display = "none";
  }, 200);
}
