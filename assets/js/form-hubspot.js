//Recoge el id del formulario que ira en el data-form del meta con id data-programs
const form_Id = document.querySelector('#data-programs').dataset.form

/*======================================================= 
 * Funcion para crear el formulario de HS
=======================================================*/
function formHs() {
    hbspt.forms.create({
        region: "na1", portalId: "3391024", formId: form_Id,
        onFormSubmit: function ($form) {
            try {
                var codigo_pais = $form.find('select[id*="phone_ext-"]').val()
                var prefijo = $form.find('input[id*="phone-"]').val().split(' ')[0].trim();
                var pais = $form.find('select[id*="phone_ext-"] option:selected').text()
                if (pais.includes('(')) {
                    pais = pais.split('(')[0].trim();
                }
                $form.find('input[name="iso_codigo_pais"]').val(codigo_pais);
                $form.find('input[name="iso_prefijo"]').val(prefijo);
                $form.find('input[name="iso_pais"]').val(pais);
            } catch (error) {
                console.log('');
            }
        }
    });
}

/*=======================================================  
 * Añade a los botones de los formularion una clase
=======================================================*/
window.addEventListener('message', event => {
    if(event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormReady') {
        let submitInfo = document.querySelectorAll('.contact-form form input[type="submit"]');
        for (let i=0; i < submitInfo.length; i++){
            submitInfo[i].classList.add('submitinfo');
            submitInfo[i].setAttribute('id', 'submitinfo')
        }
    }
 });

/*======================================================= 
 * Funcion para el POPUP
=======================================================*/
if (window.matchMedia('(min-width: 992px)').matches) {
    //Selecciona todos los botones con el id clickinfo y les añade la clase popup
    window.addEventListener('DOMContentLoaded', () => {
        const clickinfoBtn = document.querySelectorAll('#clickinfo')
        clickinfoBtn.forEach(e => {
            e.classList.add('popup')
        })
    })

    //Funcion que llama a la funcion para crear el popup
    function formHsButton() {
        window.addEventListener('load', () => {
            //La funcion se crea en click-and-popup.js
            clickPopUp()
        })
    }
}