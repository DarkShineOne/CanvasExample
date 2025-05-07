const firstCanvas = document.getElementById('first');
const firstContext = firstCanvas.getContext('2d');

const secondCanvas = document.getElementById('second');
const secondContext = secondCanvas.getContext('2d');

const spacing = 20;
const holes = [];

function resizeCanvas() {
    firstCanvas.width = window.innerWidth;
    firstCanvas.height = window.innerHeight;
    secondCanvas.width = window.innerWidth;
    secondCanvas.height = window.innerHeight;
    generateHoles();
    drawBackground();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let mouse = {
    x: 0,
    y: 0
};

firstCanvas.addEventListener('mousemove', function (e) {
    const rect = firstCanvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});


function generateHoles() {
    holes.length = 0;

    for (let y = spacing; y < firstCanvas.height; y += spacing) {
        for (let x = spacing; x < firstCanvas.width; x += spacing) {
            holes.push({ x: x, y: y, r: 0.8 });
        }
    }
}

function drawBackground() {

    const gradient = firstContext.createLinearGradient(0, 0, 0, firstCanvas.height);
    gradient.addColorStop(0, '#1b1830');
    gradient.addColorStop(1, "#554190");

    firstContext.fillStyle = gradient;
    firstContext.fillRect(0, 0, firstCanvas.width, firstCanvas.height);

    firstContext.globalCompositeOperation = 'destination-out';
    for (let hole of holes) {
        firstContext.beginPath();
        firstContext.arc(hole.x, hole.y, hole.r, 0, Math.PI * 2);
        firstContext.fill();
    }
}

function animate() {
    secondContext.clearRect(0, 0, secondCanvas.width, secondCanvas.height);
    secondContext.beginPath();
    secondContext.arc(mouse.x, mouse.y, 80, 0, Math.PI * 2);
    secondContext.fillStyle = '#a7e3ff';
    secondContext.fill();
    secondContext.closePath();

    requestAnimationFrame(animate);
}

animate();