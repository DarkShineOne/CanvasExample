const speed    = 0.2;
const follower = document.querySelector('.cursor-follower');

let pos = {
    x: 0,
    y: 0
}

let mouse = {
    x: 0,
    y: 0
};

document.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function animate() {
    pos.x += (mouse.x - pos.x) * speed;
    pos.y += (mouse.y - pos.y) * speed;
    
    follower.style.left = pos.x - 45 + 'px';
    follower.style.top  = pos.y - 45 + 'px';
    
    requestAnimationFrame(animate);
}

animate();