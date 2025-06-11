var minimo = '(min-width: 992px)'
addEventListener("DOMContentLoaded", () => {
    var clickInfo = document.querySelectorAll('#clickinfo')
    clickInfo.forEach(element => {
        element.addEventListener('click', function () {
            if (window.matchMedia(minimo).matches) {
                $('body, html').animate({
                    scrollTop: $("#section-form").offset().top
                }, 500);
            } else {
                $('body, html').animate({
                    scrollTop: $("#content-form-responsive").offset().top
                }, 500);
            }
        })
    });
});
