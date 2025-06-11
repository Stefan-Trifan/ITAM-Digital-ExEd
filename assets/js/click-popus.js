addEventListener("DOMContentLoaded", () => {
    /*=======================================================*/
    /* CLICK PARA POPUP DESCUENTOS
    /*=======================================================*/
    if (document.querySelector('.popup')) {
        /** se añade evento abrir popup  */
        document.querySelector('.popup').addEventListener('click', e => {
            let idPopup = '#' + document.querySelector('.popup').dataset.popup
            document.querySelector(idPopup).classList.remove('oculto')
            document.querySelector(idPopup).classList.add('d-flex')
            document.querySelector(idPopup).classList.add('visible')
        })
        /** se añade evento cerrar popup al elemento "X" dentro 
         * del cuadro del popup
        */
        document.querySelector('.close-popup').addEventListener('click', e => {
            let idPopup = '#' + document.querySelector('.popup').dataset.popup
            document.querySelector(idPopup).classList.add('oculto')
            setTimeout(() => {
                document.querySelector(idPopup).classList.remove('d-flex')
                document.querySelector(idPopup).classList.remove('visible')
            }, 300);
        })
        //cierra el popup con la tecla ESC
        $(document).keyup(function (e) {
            let idPopup = '#' + document.querySelector('.popup').dataset.popup
            document.querySelector(idPopup).classList.add('oculto')
            setTimeout(() => {
                document.querySelector(idPopup).classList.remove('d-flex')
                document.querySelector(idPopup).classList.remove('visible')
            }, 300);
        })
    }
});