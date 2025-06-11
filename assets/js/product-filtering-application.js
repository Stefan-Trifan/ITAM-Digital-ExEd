const lang_html = document.querySelector('html').lang
const lang = lang_html.toLowerCase().trim().slice(0, 2);
const utmAux = window.location.href
/************************************************************************************
 * @const docJob es el documento json para empezar la APLICACIÓN (CSV o JSON)
 * @const elementosPorPagina número de tarjetas que se mostrará en pantalla
 * @const hubStart para recoger el primer HUB activo en pantalla / data-hubactivo
 * @const typeBrowser para recoger el tipo de navegador que causa problema con las imágenes WEBP
 * @const scrollElement elemento elegido para hacer scrollTop con boton de páginas o hubs
 * @const allIndicator recoge todos los IDs (hubs de producto)
 * @const imgBtnLeft recoge la imagen para el botón de paginación izquierdo
 * @const imgBtnRight recoge la imagen para el botón de paginación derecho
 *************************************************************************************/
//const docJob = document.querySelector('#productos').dataset.document.trim()
const elementosPorPagina = parseInt(document.querySelector('#productos').dataset.numpagina.trim())
const hubStart = document.querySelector('#productos').dataset.hubactivo.trim()
const typeBrowser = document.querySelector('#productos').dataset.browser.toLowerCase().trim()
const scrollElement = document.querySelector('#column-programs')
const allIndicator = document.querySelectorAll('.hub-prog')
const imgBtnLeft = document.querySelector('#paginacion').dataset.imgbtnleft
const imgBtnRight = document.querySelector('#paginacion').dataset.imgbtnright

/************************************************************
 * @var documentProduct, contendrá el documento JSON-BBDD
 * según el idioma de la landing
 * @const docJob, cntendrá el valor de @var documentProduct
 * después de gestionarla según el idioma
 ***********************************************************/
var documentProduct;
switch (lang) {
    case 'en':
        documentProduct = ''
        break;
    case 'es':
        documentProduct = 'assets/bbdd/bbdd-itam-esp.json'
        break;
    case 'fr':
        documentProduct = ''
        break;
    case 'it':
        documentProduct = ''
        break;
    case 'pt':
        documentProduct = ''
        break;
}
const docJob = documentProduct;

/*********************************************************************************** 
 * @function infoProducts muestra las cards en pantalla de los HUBs 
 * encontrados y acciona los botones de HUBS según filtro
 * @param arrayObjetos es el arreglo de objetos ya filtrados 
 * @param tagProgram es el hubs del programa elegido
 ********************************************************************************** */
function infoProducts(arrayObjetos, tagProgram) {

    /** activación del botón de HUB si se ha clicado en el elemento*/
    // var allIndicator = document.querySelectorAll('.hub-prog')
    allIndicator.forEach(item => {
        if (item.id == tagProgram) {
            item.classList.add('activo');
        } else {
            item.classList.remove('activo');
        }
    })

    /**recorrido de arreglo de objetos filtrados */
    arrayObjetos.then(arrayObj => {
        /** función para construir tarjetas por páginas*/
        paginacionObjetos(arrayObj)
    })
    
}

/*****************************************************************************************
 * Se inicializa la pantalla con la @function infoProducts para mostrar el primer
 * resultado según la @var hubStart y el resultado de la busqueda por HUBs.
 * Se usará una función u otra dependiendo del documento a trabajar:
 *      documento CSV : resultadoHubCsv(documento CSV, [hub a buscar])
 *      documento JSON: resultadoHubJson(documento JSON, [hub a buscar])
 * 
 * @function clicksIdsHubs es la función que añade evento click a todos
 * los IDs de hubs que existan en el DOM - HTML
 * @param docJob  / se pasa documento a trabajar para su filtrado (CSV o JSON) y 
 * dentro de esta función se añadirán eventos click para llamar a @function infoProducts
 ****************************************************************************************/

if (docJob.includes('.json')) {
    infoProducts(resultadoHubJson(docJob, hubStart), hubStart)
} else if (docJob.includes('.csv')) {
    infoProducts(resultadoHubCsv(docJob, hubStart), hubStart)
}
clicksIdsHubs(docJob)

/**
 * Se inicia la aplicación si en la URL se incluye el #[hub de producto], esto hace que la aplicación
 * se active con el hub indicado en la URL y muestre los prooductos de esa categoría.
 */
if(utmAux.includes('#')){
    allIndicator.forEach(element => {
        var anchor = '#' + element.dataset.anchor
        if(utmAux.includes(anchor)) {
            infoProducts(resultadoHubJson(docJob, element.id), element.id)
            clickScrollElelemt(scrollElement)
            return;
        }
    });
}

console.log("8 Funciona product");
