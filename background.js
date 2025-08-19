const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Véletlenszerű vonalak generálása
function drawLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 200; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.strokeStyle = 'rgba(0,0,0,0.05)'; // halványabb vonalak
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

// Lassan frissítjük a háttér animációt
setInterval(drawLines, 400); // 0.4 másodpercenként újrarajzol
