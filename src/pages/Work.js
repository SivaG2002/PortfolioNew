import React, { useEffect, useRef } from 'react';
import './MovingDots.css'; // CSS for full-screen canvas and dark background

const MovingDots = () => {
  const canvasRef = useRef(null);
  const dots = useRef([]);
  const mouse = useRef({ x: 0, y: 0, active: false }); // Track mouse position

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size to full window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Handle mouse movement
    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true; // Mouse is on canvas
    };

    // Handle mouse leaving canvas
    const onMouseLeave = () => {
      mouse.current.active = false; // Disable mouse interaction
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    // Dot class for galaxy-like stars with repulsion
    class Dot {
      constructor() {
        this.x = Math.random() * canvas.width * 0.2; // Start near top-left (0–20% of width)
        this.y = Math.random() * canvas.height * 0.2; // Start near top (0–20% of height)
        // Spread to bottom-left, bottom-middle, bottom-right
        this.speedX = (Math.random() - 1) * 1.0; // Random X speed: -0.5 to 0.5
        this.speedY = 0.2 + Math.random() * 1; // Move down (positive speed)
        this.radius = 0.5 + Math.random() * 0.5; // Tiny dots (0.5–1px)
        this.color = 'hsl(0, 0%, 100%)'; // White
        this.opacity = 0.3 + Math.random() * 0.7; // Twinkling effect
      }

      update() {
        // Normal movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse repulsion
        if (mouse.current.active) {
          const dx = this.x - mouse.current.x;
          const dy = this.y - mouse.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const repelRadius = 100; // Distance within which dots react
          const repelStrength = 5; // How strongly dots move away

          if (distance < repelRadius) {
            // Calculate repulsion direction and scale it
            const angle = Math.atan2(dy, dx);
            const repelForce = (repelRadius - distance) / repelRadius; // Stronger when closer
            this.x += Math.cos(angle) * repelForce * repelStrength;
            this.y += Math.sin(angle) * repelForce * repelStrength;
          }
        }

        // Reset to top-left if it goes off-screen
        if (
          this.x > canvas.width ||
          this.y > canvas.height ||
          this.x < 0 ||
          this.y < 0
        ) {
          this.x = Math.random() * canvas.width * 0.2; // Reset to top-left
          this.y = Math.random() * canvas.height * 0.2; // Reset to top
          this.speedX = (Math.random() - 0.5) * 1.0; // Re-randomize X speed
          this.opacity = 0.3 + Math.random() * 0.7; // New opacity on reset
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity; // Apply twinkling opacity
        ctx.fill();
        ctx.globalAlpha = 1.0; // Reset global alpha
      }
    }

    // Initialize dots (5000 for sparse galaxy effect)
    const dotCount = 20000;
    for (let i = 0; i < dotCount; i++) {
      dots.current.push(new Dot());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.current.forEach((dot) => {
        dot.update();
        dot.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="dot-canvas" />;
};

export default MovingDots;