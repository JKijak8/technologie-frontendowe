let kontener = document.getElementById("kontener-galerii");
let obrazy = document.querySelectorAll("img");

obrazy.forEach((obraz, i) => {
  obraz.setAttribute("data-id", `${i}`);
});

function zmienTytul(nowyTytul) {
  let header = document.querySelector("h1");

  header.textContent = nowyTytul;
}

function zmienKolorTytulu(kolor) {
  let header = document.querySelector("h1");

  header.style.color = kolor;
}

function wyswietlOverlay(overlay) {
  if (overlay === null) return;
  overlay.classList.add("visible");
}

function schowajOverlay(overlay) {
  overlay.classList.remove("visible");
}

function wyswietlLightbox(overlay) {
  let img = overlay.closest("div:not(.overlay)").querySelector("img");
  let lightbox = document.getElementById("lightbox");
  let title = img.getAttribute("data-title");

  lightbox.appendChild(img.cloneNode());
  lightbox.querySelector("h2").textContent = title;

  document.body.style.overflow = "hidden";
  lightbox.style.display = "flex";
}

function schowajLightbox() {
  let lightbox = document.getElementById("lightbox");

  lightbox.querySelector("img").remove();
  document.body.style.overflow = "scroll";
  lightbox.style.display = "none";
}

function zmienZdjecie(target) {
  let lightbox = target.closest("#lightbox");
  let img = lightbox.querySelector("img");
  let index = parseInt(img.getAttribute("data-id"));

  if (target.id === "left") {
    index--;
  } else {
    index++;
  }

  let newImg = document.querySelector(`[data-id="${index}"]`);
  if (newImg === null) return;

  img.remove();

  lightbox.querySelector("h2").textContent = newImg.getAttribute("data-title");
  lightbox.appendChild(newImg.cloneNode());
}

kontener.addEventListener("mouseover", (e) => {
  if (e.target.nodeName === "IMG") {
    wyswietlOverlay(e.target.closest("div").querySelector("div.overlay"));
  }
});

kontener.addEventListener("mouseout", (e) => {
  if (e.target.classList.contains("overlay")) {
    schowajOverlay(e.target);
  }
});

kontener.addEventListener("click", (e) => {
  if (e.target.classList.contains("overlay")) {
    wyswietlLightbox(e.target);
  } else if (e.target.id === "lightbox" || e.target.id === "exit") {
    schowajLightbox();
  } else if (e.target.id === "left" || e.target.id === "right") {
    zmienZdjecie(e.target);
  }
});

document.addEventListener("keyup", (e) => {
  if (document.getElementById("lightbox").style.display === "flex") {
    switch (e.key) {
      case "ArrowRight":
        document.getElementById("right").click();
        break;
      case "ArrowLeft":
        document.getElementById("left").click();
        break;
      case "Escape":
        document.getElementById("exit").click();
    }
  }
});
