'use strict';

(() => {
    const sceneInfo = [
     {   
            sectionType: "normal",
            scrollHeight: 0,
            objs: {
                translateElm: document.querySelectorAll('.translate'),
                titleElm: document.querySelector('.home-title'),
                shadowElm: document.querySelector('.shadow'),
                sectionElm: document.querySelector('.about'),
                aboutContainerElm: document.querySelector('.about .container'),
                borderElm: document.querySelector('.border'),
            },
            values: {
                title_opacity: [0, 1, {start: 0, end: 0.5}],
                shadow_height: [0, 1, {start: 0, end: 0.5}],
                aboutContainer_opacity: [0, 1, {start: 0.2, end: 0.5}],
                aboutContainer_translateY: [0, 1, {start: 0.2, end: 0.5 }],
                border_translate: [0, 1, {start: 0.3, end: 0.99 }],

            }
    }, {
            sectionType: 'normal',
            scrollHeight: 0,
            objs: {
                lineContainerElm: document.querySelector('.section-line .container'),
            },
            values: {
                lineContainer_opacity: [0, 1, {start: 0.1, end: 0.3}],
            }
            
    }, {
            sectionType: 'line',
            scrollHeight: 0,
            objs: {

            }
    }];
    let scrollY;
    let yOffset;
    let currentScene = 0;
    let prevScrollHeight;
    let enterNewScene;

    function setLayout() {
        for(const section of sceneInfo) {
            
            if(section.sectionType === 'normal') {
                section.scrollHeight = innerHeight;
            }else {
                section.scrollHeight = Math.floor(innerHeight * 0.3);
            }
        }
        let totalScrollHeight = 0;
        yOffset = pageYOffset;
        for(let i=0; i<sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if(totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }

    };

    function scrollLoop() {
        enterNewScene = false;
        prevScrollHeight = 0;
        for(let i=0; i<currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }


        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            enterNewScene = true;

            if(currentScene < sceneInfo.length - 1) {
                currentScene++;
            }
        }

        if(yOffset < prevScrollHeight) {
            enterNewScene = true;
            if(currentScene === 0) return;
            currentScene--;
        }
        
        if(enterNewScene) return;  
        playAnimation();
    }
    function playAnimation() {

        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;
        
        switch(currentScene) {
            case 0:                 
                objs.translateElm.forEach( elm => {
                    let speed = elm.dataset.speed;
                    elm.style.transform = `translateY(${currentYOffset * speed}px)`;
                });
                objs.titleElm.style.opacity = `${1 - calcValues(values.title_opacity, currentYOffset)}`;
                objs.shadowElm.style.height = `${currentYOffset * 0.5 + 300}px`;
                objs.aboutContainerElm.style.transform = `translateY(${calcValues(values.aboutContainer_translateY, currentYOffset) * 50 - 50}px)`;
                objs.aboutContainerElm.style.opacity = `${calcValues(values.aboutContainer_opacity,currentYOffset)}`;
                objs.borderElm.style.transform = `translateX(-${(1 -calcValues(values.border_translate,currentYOffset)) * 100}%)`;
                break;
            case 1:
                objs.lineContainerElm.style.opacity = `${calcValues(values.lineContainer_opacity, currentYOffset)}`;
                break;
            case 2: 
                
                break;
            case 3:
                break;
        }
    }

    function calcValues(values, currentYOffset) {
        let result;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;
        const partScrollStart = values[2].start * scrollHeight;
        const partScrollEnd = values[2].end * scrollHeight;
        const partScrollHeight = partScrollEnd - partScrollStart;
        if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd ) {
            result = ((currentYOffset - partScrollStart) / partScrollHeight);
        } else if(currentYOffset < partScrollStart) {
            result = values[0];
        } else if(currentYOffset > partScrollEnd) {
            result = values[1];
        }

        return result;
    }

    function init() {
        setLayout();
        window.addEventListener('scroll', () => {
            yOffset = pageYOffset;
            scrollLoop();
            console.log(currentScene);
        
    });
    }
    init();
})();
