import {useEffect} from 'react';
import Hammer from 'hammerjs';

const useScrollAndSwipe = (containerRef, outerNavRef, sideNavRef, ctaRef) => {
    useEffect(() => {
        let canScroll = true;
        let scrollController = null;

        const handleScroll = (e) => {
            if (!outerNavRef.current.classList.contains('is-vis')) {
                const delta = e.wheelDelta ? -e.wheelDelta : e.detail * 20;
                if (delta > 50 && canScroll) {
                    canScroll = false;
                    clearTimeout(scrollController);
                    scrollController = setTimeout(() => (canScroll = true), 800);
                    updateHelper(1);
                } else if (delta < -50 && canScroll) {
                    canScroll = false;
                    clearTimeout(scrollController);
                    scrollController = setTimeout(() => (canScroll = true), 800);
                    updateHelper(-1);
                }
            }
        };

        const handleNavItemClick = (e) => {
            const target = e.currentTarget;
            if (!target.classList.contains('is-active')) {
                const curActive = target.parentNode.querySelector('.is-active');
                const curPos = Array.from(target.parentNode.children).indexOf(curActive);
                const nextPos = Array.from(target.parentNode.children).indexOf(target);
                const lastItem = target.parentNode.children.length - 1;
                updateNavs(nextPos);
                updateContent(curPos, nextPos, lastItem);
            }
        };

        const handleCtaClick = () => {
            const curActive = sideNavRef.current.querySelector('.is-active');
            const curPos = Array.from(sideNavRef.current.children).indexOf(curActive);
            const lastItem = sideNavRef.current.children.length - 1;
            const nextPos = lastItem;
            updateNavs(lastItem);
            updateContent(curPos, nextPos, lastItem);
        };

        const handleSwipe = (e) => {
            updateHelper(e);
        };

        const handleKeyUp = (e) => {
            if (!outerNavRef.current.classList.contains('is-vis')) {
                updateHelper(e);
            }
        };

        const updateHelper = (param) => {
            const curActive = sideNavRef.current.querySelector('.is-active');
            const curPos = Array.from(sideNavRef.current.children).indexOf(curActive);
            const lastItem = sideNavRef.current.children.length - 1;

            let nextPos = 0;

            console.log(curPos)
            if (param.type === 'swipeup' || param.keyCode === 40 || param > 0) {
                if (curPos !== lastItem) {
                    nextPos = curPos + 1;
                }
            } else if (param.type === 'swipedown' || param.keyCode === 38 || param < 0) {
                if (curPos !== 0) {
                    nextPos = curPos - 1;
                } else {
                    nextPos = lastItem;
                }
            }

            updateNavs(nextPos);
            updateContent(curPos, nextPos, lastItem);
        };

        const updateNavs = (nextPos) => {
            document.querySelectorAll('.side-nav, .outer-nav').forEach((nav) => {
                nav.querySelectorAll('li').forEach((li) => li.classList.remove('is-active'));
                nav.children[nextPos].classList.add('is-active');
            });
        };

        const updateContent = (curPos, nextPos, lastItem) => {
            const sections = document.querySelectorAll('.main-content .section');
            sections.forEach((section) => {
                section.classList.remove('section--is-active');
                section.classList.remove('section--next');
                section.classList.remove('section--prev');
            });
            sections[nextPos].classList.add('section--is-active');

            if ((curPos === lastItem && nextPos === 0) || (curPos === 0 && nextPos === lastItem)) {
                sections.forEach((section) => {
                    section.classList.remove('section--next');
                    section.classList.remove('section--prev');
                });
            } else if (curPos < nextPos) {
                sections[curPos].classList.add('section--next');
            } else {
                sections[curPos].classList.add('section--prev');
            }
        };

        const outerNav = () => {
            document.querySelector('.header--nav-toggle').addEventListener('click', () => {
                const perspective = document.querySelector('.perspective');
                perspective.classList.add('perspective--modalview');
                setTimeout(() => perspective.classList.add('effect-rotate-left--animate'), 25);
                document.querySelectorAll('.outer-nav, .outer-nav li, .outer-nav--return').forEach((el) =>
                    el.classList.add('is-vis')
                );
            });

            document.querySelectorAll('.outer-nav--return, .outer-nav li').forEach((el) => {
                el.addEventListener('click', () => {
                    const perspective = document.querySelector('.perspective');
                    perspective.classList.remove('effect-rotate-left--animate');
                    setTimeout(() => perspective.classList.remove('perspective--modalview'), 400);
                    document.querySelectorAll('.outer-nav, .outer-nav li, .outer-nav--return').forEach((el) =>
                        el.classList.remove('is-vis')
                    );
                });
            });
        };

        const workSlider = () => {
            document.querySelectorAll('.slider--prev, .slider--next').forEach((button) => {
                button.addEventListener('click', () => {
                    const slider = document.querySelector('.slider');
                    const items = Array.from(slider.children);

                    slider.style.opacity = 0;

                    setTimeout(() => {
                        const left = slider.querySelector('.slider--item-left');
                        const center = slider.querySelector('.slider--item-center');
                        const right = slider.querySelector('.slider--item-right');

                        if (button.classList.contains('slider--next')) {
                            if (left && center && right) {
                                left.classList.remove('slider--item-left');
                                center.classList.remove('slider--item-center');
                                right.classList.remove('slider--item-right');

                                if (right.nextElementSibling) {
                                    right.nextElementSibling.classList.add('slider--item-right');
                                } else {
                                    items[0].classList.add('slider--item-right');
                                }

                                if (center.nextElementSibling) {
                                    center.nextElementSibling.classList.add('slider--item-center');
                                } else {
                                    items[0].classList.add('slider--item-center');
                                }

                                if (left.nextElementSibling) {
                                    left.nextElementSibling.classList.add('slider--item-left');
                                } else {
                                    items[0].classList.add('slider--item-left');
                                }
                            }
                        } else {
                            // Handle previous button logic
                            if (left && center && right) {
                                left.classList.remove('slider--item-left');
                                center.classList.remove('slider--item-center');
                                right.classList.remove('slider--item-right');

                                if (left.previousElementSibling) {
                                    left.previousElementSibling.classList.add('slider--item-left');
                                } else {
                                    items[items.length - 1].classList.add('slider--item-left');
                                }

                                if (center.previousElementSibling) {
                                    center.previousElementSibling.classList.add('slider--item-center');
                                } else {
                                    items[items.length - 1].classList.add('slider--item-center');
                                }

                                if (right.previousElementSibling) {
                                    right.previousElementSibling.classList.add('slider--item-right');
                                } else {
                                    items[items.length - 1].classList.add('slider--item-right');
                                }
                            }
                        }

                        slider.style.opacity = 1;
                    }, 400);
                });
            });
        };

        const transitionLabels = () => {
            document.querySelectorAll('.work-request--information input').forEach((input) => {
                input.addEventListener('focusout', function () {
                    if (this.value === '') {
                        this.classList.remove('has-value');
                    } else {
                        this.classList.add('has-value');
                    }
                    window.scrollTo(0, 0);
                });
            });
        };

        const initHammer = () => {
            const targetElement = containerRef.current;
            if (targetElement) {
                const mc = new Hammer(targetElement);
                mc.get('swipe').set({direction: Hammer.DIRECTION_VERTICAL});
                mc.on('swipeup swipedown', handleSwipe);
            }
        };

        outerNav();
        workSlider();
        transitionLabels();
        initHammer();

        document.addEventListener('mousewheel', handleScroll);
        document.addEventListener('DOMMouseScroll', handleScroll);
        document.querySelectorAll('.side-nav li, .outer-nav li').forEach((li) =>
            li.addEventListener('click', handleNavItemClick)
        );
        ctaRef.current?.addEventListener('click', handleCtaClick);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('mousewheel', handleScroll);
            document.removeEventListener('DOMMouseScroll', handleScroll);
            document.removeEventListener('keyup', handleKeyUp);

            // eslint-disable-next-line
            const targetElement = containerRef.current;
            if (targetElement) {
                targetElement.removeEventListener('click', handleCtaClick);

                const mc = new Hammer(targetElement);
                mc.off('swipeup swipedown', handleSwipe);
            }
        };
    }, [containerRef, outerNavRef, sideNavRef, ctaRef]);

    return {};
};

export default useScrollAndSwipe;
