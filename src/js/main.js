'use strict';

(() => {
    const translateElm = document.querySelectorAll('.translate');
    const homeTitleElm = document.querySelector('.home-title');
    const shadowElm = document.querySelector('.shadow');
    const aboutSectionElm = document.querySelector('.about');
    const aboutContainerElm = document.querySelector('.about .container');
    const borderElm = document.querySelector('.border');
    let scrollY;
    console.log(document.querySelector('.title::after'));
    function init() {
        window.addEventListener('scroll', () => {
            const top = aboutSectionElm.getBoundingClientRect().top;
            scrollY = pageYOffset;
            translateElm.forEach(element => {
                let speed = element.dataset.speed;
                element.style.transform = `translateY(${scrollY * speed}px)`;
            });
        
            homeTitleElm.style.opacity = `${-scrollY / (innerHeight / 2) + 1}`;
            shadowElm.style.height = `${scrollY * 0.5 + 300}px`;
            aboutContainerElm.style.transform = `translateY(${scrollY / (innerHeight + top) * 50 - 50}px)`;
            aboutContainerElm.style.opacity = `${scrollY / (innerHeight + top)}`;
            borderElm.style.transform = `translateX(-${top / (innerHeight) * 100}%)`;
        })
        
    }

    init();
})();