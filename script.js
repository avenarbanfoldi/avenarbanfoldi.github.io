// --- POHÁLÓS BACKGROUND ---
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
let w, h;

function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const points = [];
for (let i = 0; i < 300; i++) {
    points.push({
        x: Math.random() * w,
        y: Math.random() * h,
        dx: (Math.random() - 0.5) * 0.1,
        dy: (Math.random() - 0.5) * 0.1
    });
}

function animate() {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const dx = points[i].x - points[j].x;
            const dy = points[i].y - points[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 120) {
                ctx.strokeStyle = 'rgba(255,255,255,0.18)';
                ctx.beginPath();
                ctx.moveTo(points[i].x, points[i].y);
                ctx.lineTo(points[j].x, points[j].y);
                ctx.stroke();
            }
        }
    }
    points.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        if(p.x < 0 || p.x > w) p.dx *= -1;
        if(p.y < 0 || p.y > h) p.dy *= -1;
    });
    requestAnimationFrame(animate);
}
animate();

// --- SCROLL HIDE LANDING ---
window.addEventListener('scroll', () => {
    const landing = document.getElementById('landing');
    if(window.scrollY > window.innerHeight) {
        landing.style.display = 'none';
    } else {
        landing.style.display = 'block';
    }
});

// --- PROJECT TAB ---
const tabButton = document.querySelector('.tab-button');
const tabContent = document.querySelector('.tab-content');

tabButton.addEventListener('click', () => {
    tabContent.classList.toggle('tab-active');
});
