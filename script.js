
document.addEventListener('scroll', ()=>{
    let navBar = document.querySelector('.navBar');
    
    navBar.classList.toggle('stycky', window.scrollY > 60 )
    console.log(navBar.className);
});







        const circleContainers = document.querySelectorAll('.progress-container');
        const lineContainers = document.querySelectorAll('.line-bar-container');
        
        const radius = 90;
        const circumference = 2 * Math.PI * radius;
        
        // Setup circles
        circleContainers.forEach(container => {
            const circle = container.querySelector('.circle-bar');
            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = circumference;
        });
        
        const animateCircle = (container) => {
            const circle = container.querySelector('.circle-bar');
            const text = container.querySelector('.percentage');
            const target = parseInt(container.getAttribute('data-percent'), 10);
            let current = 0;
            
            const update = (p) => {
                const offset = circumference - (p / 100) * circumference;
                circle.style.strokeDashoffset = offset;
                text.textContent = `${p}%`;
            };
            
            const run = setInterval(() => {
                if (current >= target) {
                    clearInterval(run);
                } else {
                    current++;
                    update(current);
                }
            }, 15);
        };
        
        const animateLine = (container) => {
            const fill = container.querySelector('.line-fill');
            const count = container.querySelector('.line-count');
            const target = parseInt(container.getAttribute('data-percent'), 10);
            let current = 0;
            
            const run = setInterval(() => {
                if (current >= target) {
                    clearInterval(run);
                } else {
                    current++;
                    fill.style.width = `${current}%`;
                    count.textContent = `${current}%`;
                }
            }, 15);
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('progress-container')) {
                        animateCircle(entry.target);
                    } else if (entry.target.classList.contains('line-bar-container')) {
                        animateLine(entry.target);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        circleContainers.forEach(container => observer.observe(container));
        lineContainers.forEach(container => observer.observe(container));
