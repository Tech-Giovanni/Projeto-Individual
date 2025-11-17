
window.onload = function() {

    var header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        
        var scrollPos = window.scrollY;

        if (scrollPos > 50) {
            header.classList.add('header-transparente');
        } else {
            header.classList.remove('header-transparente');
        }
    });
};
AOS.init();