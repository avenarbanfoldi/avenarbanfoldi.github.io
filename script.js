const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
let w, h;

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Több pont a sűrű pókhálóhoz
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
                ctx.strokeStyle = 'rgba(255,255,255,0.18)'; // kicsit sötétebb vonal
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

// Accordion működés – videók helyesen nyílnak
const accordions = document.querySelectorAll('.accordion-btn');

accordions.forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        if (content.style.maxHeight && content.style.maxHeight !== "0px") {
            content.style.maxHeight = "0px"; // bezárás
        } else {
            content.style.maxHeight = content.scrollHeight + "px"; // megnyitás
        }
    });
});
