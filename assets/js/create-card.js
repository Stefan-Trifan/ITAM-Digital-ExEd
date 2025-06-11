function createCard(obj, $template, $fragment) {
    /*================================*/
    /*	SEGUIMIENTO DE LAS UTMS
    /*================================*/
    // var utmAux = window.location.href

    if (utmAux.includes('?utm')) {
        var utmAdded = utmAux.split('?utm_')[1]
        obj.ulr_pay = obj.ulr_pay + '?utm_' + utmAdded
        obj.url_landing = obj.url_landing + '?utm_' + utmAdded
    }
    /*****************************************************
     * Cambia el formato de imágenes de WEBP a JPG si el
     * navegador es SAFARI, debido a que causa problemas
     * en la visualización de imaágenes WEBP
     ****************************************************/
    obj.img_home = navegador.includes(typeBrowser) && obj.img_home.includes('.webp') ? obj.img_home.replace('.webp', '.jpg') : obj.img_home;

    /*================================*/
    /*	DECLARAR ETIQUETA NUEVO AL ITEM
    /*================================*/
    // var nuevo_programa;
    if (obj.hubs.includes('new_prog')) {
        $template.querySelector('.new-pgr').classList.remove('display-none')
        // $template.querySelector('.new-pgr').innerHTML = newProgram
    } else {
        $template.querySelector('.new-pgr').classList.add('display-none')
        // $template.querySelector('.new-pgr').innerHTML = ''
    }
    // $template.querySelector('img').dataset.src = obj.img_home
    $template.querySelector('#item').className = obj.type_course
    $template.querySelector('img').dataset.src = obj.img_home
    $template.querySelector('img').alt = obj.name_type_course + ' | ' + obj.program + ' ' + obj.subtitle
    $template.querySelector('#title-product').innerText = obj.program
    $template.querySelector('#subtitle-product').innerText = obj.subtitle
    $template.querySelector('#type-course').innerText = obj.name_type_course
    // $template.querySelector('.type-course').className = 'type-course bg-' + obj.type_course
    $template.querySelector('#duration').innerText = obj.duration
    $template.querySelector('#format').innerText = obj.format
    $template.querySelector('.btn-item-pgr').href = obj.url_landing
    $template.querySelector('.clickadmi').href = obj.url_pay

    let $clone = document.importNode($template, true);
    $fragment.appendChild($clone);
}