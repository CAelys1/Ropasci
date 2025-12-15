let mode = "pve";
let turn = 1;
let round = 0;
const maxRound = 5;

let p1Pick = "";
let p2Pick = "";
let p1Score = 0;
let p2Score = 0;

const choices = ["batu","gunting","kertas"];

function setMode(m) {
  mode = m;
  document.querySelectorAll(".mode-btn").forEach(b=>b.classList.remove("active"));
  event.target.classList.add("active");

  document.getElementById("p2Name").value = m==="pve" ? "Computer" : "";
  resetGame();
}

function pick(choice) {
  if (round >= maxRound) return;

  if (turn === 1) {
    p1Pick = choice;
    if (mode === "pve") {
      p2Pick = choices[Math.floor(Math.random()*3)];
      runGame();
    } else {
      turn = 2;
      document.getElementById("turn").innerText = "Giliran: Player 2";
    }
  } else {
    p2Pick = choice;
  }
}

function runGame() {
  if (!p1Pick || !p2Pick) return;

  const p1 = document.getElementById("p1Name").value || "Player 1";
  const p2 = document.getElementById("p2Name").value || "Player 2";

  document.getElementById("n1").innerText = p1;
  document.getElementById("n2").innerText = p2;

  let text = "";

  if (p1Pick === p2Pick) {
    text = "Seri 😐";
  } else if (
    (p1Pick==="batu" && p2Pick==="gunting") ||
    (p1Pick==="gunting" && p2Pick==="kertas") ||
    (p1Pick==="kertas" && p2Pick==="batu")
  ) {
    p1Score++;
    text = `${p1} Menang 🎉`;
  } else {
    p2Score++;
    text = `${p2} Menang 🎉`;
  }

  round++;
  updateUI(text);

  if (round === maxRound) showWinner();
  p1Pick = p2Pick = "";
  turn = 1;
}

function updateUI(text) {
  document.getElementById("result").innerText = text;
  document.getElementById("s1").innerText = p1Score;
  document.getElementById("s2").innerText = p2Score;
  document.getElementById("round").innerText = `Round: ${round} / ${maxRound}`;
  document.getElementById("turn").innerText = "Giliran: Player 1";
}

function showWinner() {
  let winner = p1Score > p2Score ? document.getElementById("n1").innerText :
               p2Score > p1Score ? document.getElementById("n2").innerText :
               "SERI";

  showPopup(winner === "SERI" ? "🤝 HASIL SERI" : `🏆 ${winner} JUARA!`);
  startConfetti();
}

function resetGame() {
  round = 0;
  p1Score = p2Score = 0;
  document.getElementById("result").innerText = "Pilih dulu";
  document.getElementById("s1").innerText = 0;
  document.getElementById("s2").innerText = 0;
  document.getElementById("round").innerText = "Round: 0 / 5";
  document.getElementById("turn").innerText = "Giliran: Player 1";
}

function toggleDark() {
  document.body.classList.toggle("dark");
}

/* POPUP */
function showPopup(text) {
  document.getElementById("popupText").innerText = text;
  document.getElementById("popup").classList.add("show");
}

function closePopup() {
  document.getElementById("popup").classList.remove("show");
}

/* CONFETTI */
function startConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = 300;
  canvas.height = 200;

  let pieces = Array.from({length:100},()=>({
    x:Math.random()*300,
    y:Math.random()*200,
    r:Math.random()*6,
    d:Math.random()*5
  }));

  function draw() {
    ctx.clearRect(0,0,300,200);
    pieces.forEach(p=>{
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = ["#c7f000","#22c55e","#facc15"][Math.floor(Math.random()*3)];
      ctx.fill();
      p.y += p.d;
      if (p.y>200) p.y=0;
    });
    requestAnimationFrame(draw);
  }
  draw();
}