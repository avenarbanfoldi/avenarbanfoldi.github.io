// --- CANVAS POHÁLÓ ---
const canvas = document.getElementById('backgroundCanvas');
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

// --- SCROLL HIDE LANDING ---
window.addEventListener('scroll', () => {
    const landing = document.getElementById('landing');
    if(window.scrollY > window.innerHeight - 1) {
        landing.style.display = 'none';
    } else {
        landing.style.display = 'block';
    }
});

// --- TABS ---
const tabButtons = document.querySelectorAll('.tabButton');
const tabContents = document.querySelectorAll('.tabContent');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = document.getElementById(btn.dataset.tab);
        tabContents.forEach(tc => tc.style.display = 'none');
        target.style.display = 'block';
    });
});
