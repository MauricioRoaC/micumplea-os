// Mostrar mensaje al abrir sobre
const abrirBtn = document.getElementById("abrir-btn");
const sobreImg = document.getElementById("sobre-img");
const mensaje = document.getElementById("mensaje"); // Asegúrate de que tenga la clase "mensaje-sobre"
const musica = document.getElementById("bg-music");

// Iniciar música al primer clic en cualquier parte
document.addEventListener("click", () => {
  if (musica && musica.paused) {
    musica.play().catch(err => {
      console.warn("No se pudo reproducir la música aún:", err);
    });
  }
}, { once: true });


let yaAbierto = false;

abrirBtn.addEventListener("click", () => {
  if (yaAbierto) return; // evitar múltiples clics

  yaAbierto = true;
  abrirBtn.disabled = true; // deshabilita el botón
  abrirBtn.innerText = "❤️"; // cambia texto del botón (opcional)
  sobreImg.src = "img/2.webp";

  const aleatoria = frases[Math.floor(Math.random() * frases.length)];
  mensaje.innerText = aleatoria;
  mensaje.style.display = "block";

  if (musica) {
    musica.play().catch(err => {
      console.log("Autoplay bloqueado, intenta hacer clic:", err);
    });
  }
});
// Canvas de corazones
const canvas = document.querySelector(".corazones");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Corazon {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.size = Math.random() * 15 + 10;
    this.speedY = Math.random() * 1.5 + 1;
    this.opacity = Math.random() * 0.5 + 0.3;
    this.color = `rgba(255, 0, 100, ${this.opacity})`;
  }

  update() {
    this.y += this.speedY;
    if (this.y > canvas.height) this.reset();
  }

  draw() {
    ctx.beginPath();
    const x = this.x, y = this.y, s = this.size;
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x + s / 2, y - s / 2, x + s * 1.5, y + s / 2, x, y + s);
    ctx.bezierCurveTo(x - s * 1.5, y + s / 2, x - s / 2, y - s / 2, x, y);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

const corazones = [];
for (let i = 0; i < 50; i++) {
  corazones.push(new Corazon());
}

function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  corazones.forEach(corazon => {
    corazon.update();
    corazon.draw();
  });
  requestAnimationFrame(animar);
}

animar();

