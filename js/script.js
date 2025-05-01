//HISTORIA
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelector("div").classList.add("visibleImg");
        entry.target.querySelector("p").classList.add("visibleText");
        entry.target.querySelector("h3").classList.add("visibleText");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document
  .querySelectorAll("#historyDiv > div")
  .forEach((e) => observer.observe(e));

//NOTICIAS
fetch("../JSON/noticias.json")
  .then((response) => response.json())
  .then((data) => {
    const contenedorNoticias = document.getElementById("contenedorNoticias");
    data.forEach((noticia) => {
      const imgDiv = document.createElement("div");
      imgDiv.classList.add("imgNewsDiv");

      const img = document.createElement("img");
      img.src = noticia.imagen;
      img.alt = noticia.tema;

      imgDiv.appendChild(img);

      const textDiv = document.createElement("div");
      textDiv.classList.add("textNewsDiv");

      const p = document.createElement("p");
      p.innerHTML = noticia.titulo;

      const h3 = document.createElement("h3");
      h3.innerHTML = noticia.tema;

      textDiv.append(h3, p);

      const noticiaDiv = document.createElement("div");
      noticiaDiv.append(imgDiv, textDiv);
      contenedorNoticias.appendChild(noticiaDiv);
    });
  });
