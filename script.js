// Landing canvas (pókhálós animáció)
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
let w, h;

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Pontok létrehozása
const points = [];
for (let i = 0; i < 300; i++) {
    points.push({
        x: Math.random() * w,
        y: Math.random() * h,
        dx: (Math.random() - 0.5) * 0.05, // lassabb mozgás
        dy: (Math.random() - 0.5) * 0.05
    });
}

function animate() {
    ctx.clearRect(0, 0, w, h);

    points.forEach((p, i) => {
        points.forEach((q, j) => {
            if (i < j) {
                const dx = p.x - q.x;
                const dy = p.y - q.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 120) {
                    ctx.strokeStyle = 'rgba(255,255,255,0.2)'; // világosabb vonalak
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.stroke();
                }
            }
        });

        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
    });

    requestAnimationFrame(animate);
}

animate();

// Accordion működés
const accordions = document.querySelectorAll('.accordion-btn');

accordions.forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        if (content.style.maxHeight && content.style.maxHeight !== "0px") {
            content.style.maxHeight = "0px";
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});
