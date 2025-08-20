// ----- Pókháló animáció -----
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const lines = [];
const NUM_LINES = 500; // sűrű pókháló
const MAX_LENGTH = 80;

function random(min, max) { return Math.random() * (max - min) + min; }

class Line {
    constructor() {
        this.x = random(0, width);
        this.y = random(0, height);
        this.angle = random(0, 2*Math.PI);
        this.speed = random(0.05, 0.15);
        this.length = random(20, MAX_LENGTH);
        this.color = 'rgba(255,255,255,' + random(0.2, 0.5) + ')';
    }
    move() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        if (this.x < 0 || this.x > width) this.angle = Math.PI - this.angle;
        if (this.y < 0 || this.y > height) this.angle = -this.angle;
    }
    draw() {
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + Math.cos(this.angle) * this.length, this.y + Math.sin(this.angle) * this.length);
        ctx.stroke();
    }
}

for (let i = 0; i < NUM_LINES; i++) lines.push(new Line());

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

// ----- Landing scroll -----
const landing = document.getElementById('landing');
window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight * 0.7) { 
        landing.style.display = 'none';
    } else {
        landing.style.display = 'flex';
    }
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
