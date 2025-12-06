document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Text Scramble Animation (Intro)
    const introOverlay = document.getElementById('intro-overlay');
    const introText = document.querySelector('.intro-text');
    
    if (introOverlay && introText) {
        const finalText = "DAIKI MAYUMI";
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&";
        let iteration = 0;
        
        const interval = setInterval(() => {
            introText.innerText = finalText
                .split("")
                .map((letter, index) => {
                    if(index < iteration) {
                        return finalText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");
            
            if(iteration >= finalText.length) {
                clearInterval(interval);
                // Animation finished, fade out overlay
                setTimeout(() => {
                    introOverlay.style.opacity = '0';
                    setTimeout(() => {
                        introOverlay.style.display = 'none';
                    }, 800);
                }, 500);
            }
            
            iteration += 1 / 3; // Speed of decoding
        }, 30);
    }

    // 2. Scroll Reveal
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // 3. Lightbox (Image Modal)
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);

    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.innerHTML = '';
            const largeImg = document.createElement('img');
            largeImg.src = img.src;
            lightbox.appendChild(largeImg);
            lightbox.classList.add('active');
        });
    });

    lightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    // 4. Particle Background
    const canvas = document.getElementById('canvas-bg');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.size = Math.random() * 1.5 + 1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }
            draw() {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < 50; i++) particles.push(new Particle());

        function animate() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }
        animate();
    }
});