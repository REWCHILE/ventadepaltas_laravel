<canvas id="avocado-particles-canvas" class="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-0"></canvas>

<script>
(function() {
    const canvas = document.getElementById('avocado-particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    function resize() {
        if (!canvas.parentElement) return;
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }

    function createParticles() {
        particles = [];
        const count = Math.floor((canvas.width * canvas.height) / 35000) + 8;
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 12 + 8,
                speedX: (Math.random() - 0.5) * 0.4,
                speedY: (Math.random() - 0.5) * 0.4 - 0.1,
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.01,
                opacity: Math.random() * 0.4 + 0.15
            });
        }
    }

    function drawAvocado(x, y, r, rot, opacity) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rot);
        ctx.globalAlpha = opacity;

        // Outer skin shape (Pear-like avocado)
        ctx.beginPath();
        ctx.fillStyle = '#047857';
        ctx.ellipse(0, 0, r, r * 1.35, 0, 0, Math.PI * 2);
        ctx.fill();

        // Inner light pulp
        ctx.beginPath();
        ctx.fillStyle = '#a7f3d0';
        ctx.ellipse(0, 0, r * 0.78, r * 1.1, 0, 0, Math.PI * 2);
        ctx.fill();

        // Seed (Cuesco)
        ctx.beginPath();
        ctx.fillStyle = '#78350f';
        ctx.ellipse(0, r * 0.2, r * 0.45, r * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let p of particles) {
            p.x += p.speedX;
            p.y += p.speedY;
            p.rotation += p.rotSpeed;

            if (p.x < -30) p.x = canvas.width + 30;
            if (p.x > canvas.width + 30) p.x = -30;
            if (p.y < -30) p.y = canvas.height + 30;
            if (p.y > canvas.height + 30) p.y = -30;

            drawAvocado(p.x, p.y, p.radius, p.rotation, p.opacity);
        }

        animationFrameId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });

    resize();
    createParticles();
    animate();
})();
</script>
