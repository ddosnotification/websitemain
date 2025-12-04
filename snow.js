// Winter Snow Effect
(function() {
    const snowflakes = [];
    const maxFlakes = 5; // FEWER SNOWFLAKES
    const snowContainer = document.createElement('div');
    snowContainer.id = 'snow-container';
    snowContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
    `;
    document.body.appendChild(snowContainer);

    function createSnowflake() {
        const snowflake = document.createElement('div');
        const size = Math.random() * 4 + 2; // SMALLER SNOWFLAKES (2–6px)
        const startX = Math.random() * window.innerWidth;
        const fallSpeed = Math.random() * 3 + 2;
        const swayAmount = Math.random() * 40 + 15; // slightly smaller sway
        const opacity = Math.random() * 0.4 + 0.4; 
        
        snowflake.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: white;
            border-radius: 50%;
            opacity: ${opacity};
            left: ${startX}px;
            top: -10px;
            pointer-events: none;
            box-shadow: 0 0 ${size * 1.5}px rgba(255, 255, 255, 0.8);
        `;
        
        snowContainer.appendChild(snowflake);
        
        const animation = snowflake.animate([
            { 
                transform: `translate(0, 0) rotate(0deg)`,
                opacity: opacity
            },
            { 
                transform: `translate(${swayAmount}px, ${window.innerHeight + 20}px) rotate(360deg)`,
                opacity: 0
            }
        ], {
            duration: fallSpeed * 1000,
            easing: 'linear',
            iterations: 1
        });
        
        animation.onfinish = () => {
            snowflake.remove();
            createSnowflake();
        };
        
        snowflakes.push(snowflake);
    }

    // Initialize snowflakes
    for (let i = 0; i < maxFlakes; i++) {
        setTimeout(() => {
            createSnowflake();
        }, i * 250);
    }

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            snowflakes.forEach(flake => flake.remove());
            snowflakes.length = 0;
            for (let i = 0; i < maxFlakes; i++) {
                setTimeout(() => {
                    createSnowflake();
                }, i * 250);
            }
        }, 250);
    });
})();
