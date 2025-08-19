// ----- Pókháló animáció -----
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
const lines = [];

function random(min, max) { return Math.random() * (max - min) + min; }

class Line {
    constructor() {
        this.x = random(0, width);
        this.y = random(0, height);
        this.vx = random(-0.3, 0.3);
        this.vy = random(-0.3, 0.3);
        this.length = random(20, 100);
    }
    move() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.length, this.y + this.length);
        ctx.stroke();
    }
}

for (let i = 0; i < 100; i++) lines.push(new Line());

function animate() {
    ctx.clearRect(0,0,width,height);
    lines.forEach(line => { line.move(); line.draw(); });
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

// ----- Accordion -----
const accordions = document.querySelectorAll('.accordion');
accordions.forEach(acc => {
    acc.addEventListener('click', () => {
        acc.classList.toggle('active');
        const panel = acc.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
});

// ----- Landing eltűnés -----
window.addEventListener('scroll', () => {
    const landing = document.getElementById('landing');
    if (window.scrollY > window.innerHeight/2) {
        landing.style.opacity = '0';
        landing.style.pointerEvents = 'none';
    } else {
        landing.style.opacity = '1';
        landing.style.pointerEvents = 'all';
    }
});
