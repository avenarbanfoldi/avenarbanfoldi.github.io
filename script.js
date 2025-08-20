// Canvas háttér
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
let w, h;

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

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
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
    });
    requestAnimationFrame(animate);
}
animate();

// Landing eltűntetés scrollnál
const landing = document.getElementById('landing');
const content = document.getElementById('content');

window.addEventListener('scroll', () => {
    if(window.scrollY > window.innerHeight * 0.1) {
        landing.style.display = 'none';
        content.style.display = 'block';
    } else {
        landing.style.display = 'block';
        content.style.display = 'none';
    }
});

// Tabok kezelése
const buttons = document.querySelectorAll('.tab-button');
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
    });
});
