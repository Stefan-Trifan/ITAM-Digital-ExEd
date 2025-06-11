// function lazyLoad(){
//     let lazyImages = [].slice.call(document.querySelectorAll("img.lazyload[data-src]"));
//     let lazyBackground = [].slice.call(document.querySelectorAll(".bg-lazyload[data-src]"));
//     console.log(lazyBackground)
//     if ("IntersectionObserver" in window) {
//         let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
//             entries.forEach(function (entry) {
//                 if (entry.isIntersecting) {
//                     let lazyImage = entry.target;
//                     lazyImage.src = lazyImage.dataset.src;
//                     lazyImage.classList.remove("lazyload");
//                     lazyImageObserver.unobserve(lazyImage);
//                 }
//             });
//         });
//         lazyImages.forEach(function (lazyImage) {
//             lazyImageObserver.observe(lazyImage);
//         });
//     } else {
//         // Si el navegador no es compatible con Intersection Observer, carga todas las imágenes.
//         lazyImages.forEach(function (lazyImage) {
//             lazyImage.src = lazyImage.dataset.src;
//             lazyImage.classList.remove("lazyload");
//         });
//     }
// }


function lazyLoad(){
    let t = document.querySelectorAll(".bg-lazyload"),
    e = document.querySelectorAll("img[data-src]");
    // e = document.querySelectorAll("img.lazyload[data-src]");
    function a(t, e) {
        t.forEach(t => {
            t.isIntersecting && (t.target.classList.contains("bg-lazyload") ?
            t.target.dataset.gradient ? 
            t.target.style.backgroundImage = "linear-gradient(" + t.target.dataset.gradient + "),url(" + t.target.dataset.src + ")" : 
            t.target.style.backgroundImage = "url(" + t.target.dataset.src + ")" : 
            t.target.src = t.target.dataset.src, e.unobserve(t.target))
        })
    }
    let r = {
        root: null,
        rootMargin: "0px",
        threshold: 0
    },
    g = new IntersectionObserver(a, r);
    t.forEach(t => {
        g.observe(t)
    }),
    e.forEach(t => {
        g.observe(t)
    })
}