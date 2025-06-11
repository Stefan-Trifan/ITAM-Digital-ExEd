const lang_html = document.querySelector('html').lang
const langDom = lang_html.toLowerCase().trim().slice(0, 2);

/*************************************************************
 * @const utmAux, contiene la url de inicio de la navegación
 ************************************************************/
const utmAux = window.location.href

/************************************************************
 * @var documentProduct, contendrá el documento JSON-BBDD
 * según el idioma de la landing
 * @const docJob, cntendrá el valor de @var documentProduct
 * después de gestionarla según el idioma
 ***********************************************************/
var documentProduct;
switch (langDom) {
    case 'en':
        documentProduct = '/assets/bbdd/bbdd-itam-eng.json'
        break;
    case 'es':
        documentProduct = '../../assets/bbdd/bbdd-itam-esp.json'
        break;
    case 'fr':
        documentProduct = '../assets/js/bbdd-mitpe-esp.json'
        break;
    case 'it':
        documentProduct = '../assets/js/bbdd-mitpe-esp.json'
        break;
    case 'pt':
        documentProduct = '../assets/js/bbdd-mitpe-esp.json'
        break;
}
const docJob = documentProduct;

/*************************************************************************
 * @const fechaSistema
 * @returns la fecha del sistema ne formato año-mes-día para poder
 * usarla en la comparativa de fechas de ronda de los CXO
 ************************************************************************/
const fechaSistema = () => {
    const fecha_hoy = new Date()
    var ano = fecha_hoy.getFullYear().toString()
    var mes = (fecha_hoy.getMonth() + 1).toString()
    if (mes.length <= 1) {
        mes = '0' + mes;
    }
    var dia = fecha_hoy.getDate().toString()
    if (dia.length <= 1) {
        dia = '0' + dia;
    }
    // var fechaSistema = ano + '-' + mes + '-' + dia
    return (ano + '-' + mes + '-' + dia)

}

/************************************************************************************
 * @const codga, recoge el CODIGO GA de la etiqueta meta#data-programs
 *************************************************************************************/
const dataProgram = document.querySelector('#data-programs')
const codga = dataProgram.dataset.codga.toLowerCase().trim()

/*************************************************************************************
 * declaración de constantes según su ID para rellenar con los datos
 * del archivo JSON filtrado. Constantes genéricas que tienen todos
 * los productos y de la cual será el punto de partida 
 ************************************************************************************/
const programInfo = document.querySelector('#data-program')
const subtitleInfo = document.querySelector('#data-subtitle')
const claimInfo = document.querySelector('#data-claim')
const startInfo = document.querySelectorAll('#data-start')
const formatInfo = document.querySelectorAll('#data-format')
const durationInfo = document.querySelectorAll('#data-duration')
const hoursInfo = document.querySelectorAll('#data-hours')
const priceInfo = document.querySelectorAll('#data-price')
const price2Info = document.querySelectorAll('#data-price2')
const feeInfo = document.querySelectorAll('#data-fee')
const dsctoHeader = document.querySelectorAll('#data-dscto-header')
const dsctoFooter = document.querySelectorAll('#data-dscto-footer')
// const holidayInfo = document.querySelectorAll('#data-holiday')
const clickadmiInfo = document.querySelectorAll('.clickadmi')
const clickinfoInfo = document.querySelectorAll('#section-banner-typ .clickinfo')
const clickbrochureInfo = document.querySelectorAll('.clickbrochure')
const clickcallInfo = document.querySelectorAll('.clickcall')

/*********************************************************************************** 
 * @function infoProduct, función que se encargará del rellenado de los datos
 * una vez filtrado el archivo JSON
 * @param objetoProducto es el arreglo de objetos ya filtrados 
 ********************************************************************************** */
function infoProduct(objetoProducto) {
    /**recorrido de arreglo de objetos filtrados */

    objetoProducto.then(obj => {

        obj.forEach(element => {
            programInfo.innerText = element.program
            subtitleInfo.innerText = element.subtitle
            claimInfo.innerText = element.claim
            startInfo.forEach(e => {
                e.innerText = fechaString(element.start)
            });
            formatInfo.forEach(e => {
                e.innerText = element.format
            });
            durationInfo.forEach(e => {
                e.innerText = element.duration
            });
            hoursInfo.forEach(e => {
                e.innerText = element.hours
            });
            priceInfo.forEach(e => {
                e.innerText = element.price
            });
            price2Info.forEach(e => {
                e.innerText = element.price_2
            });
            feeInfo.forEach(e => {
                e.innerText = element.cand_fee
            });
            /*holidayInfo.forEach(e => {
                e.innerText = element.holiday
            });*/
            dsctoHeader.forEach(e => {
                if (element.dscto_header.includes('XXX')) {
                    e.innerText = element.dscto_header.replace('XXX', fechaString(element.end_dscto))
                } else {
                    e.innerText = element.dscto_header
                }
            });
            dsctoFooter.forEach(e => {
                if (element.dscto_footer.includes('XXX')) {
                    e.innerText = element.dscto_footer.replace('XXX', fechaString(element.end_dscto))
                } else {
                    e.innerText = element.dscto_footer
                }
            });
            /** seguimiento de UTMs */
            if (utmAux.includes('?utm')) {
                var utmAdded = utmAux.split('?utm_')[1]
                clickadmiInfo.forEach(e => {
                    e.href = element.url_pay + '?utm_' + utmAdded
                });
            } else {
                clickadmiInfo.forEach(e => {
                    e.href = element.url_pay
                });
            }
            /** solo si es un TYP */
            if (dataProgram.dataset.typ) {
                if (dataProgram.dataset.typ.includes('typ')) {
                    clickinfoInfo.forEach(e => {
                        e.href = element.brochure
                    });
                    clickbrochureInfo.forEach(e => {
                        e.href = element.brochure
                    });
                }
            }
            clickcallInfo.forEach(e => {
                e.href = element.call
            });
            /** solo si es un CXO */
            /*if (element.type_course.toLowerCase() == 'cxo') {
                infoProduct_Cxo(element)
            }*/
        });
    })
}

/**
 * @function infoProduct_Cxo, funcion que se ejecuta para rellenar solo los CXO
 * si se cumplen sus caracterñisticas
 * @param {*lleva el objeto diltrado} producto 
 */

function infoProduct_Cxo(producto) {
    /** declaración  de constantes */
    const roundsFee = document.querySelector('#rounds-fee').dataset.roundfinished
    const dateRound_1 = document.querySelector('#data-round-date-1')
    const dateRound_2 = document.querySelector('#data-round-date-2')
    const dateRound_3 = document.querySelector('#data-round-date-3')
    const priceRound_1 = document.querySelector('#data-round-price-1')
    const priceRound_2 = document.querySelector('#data-round-price-2')
    const priceRound_3 = document.querySelector('#data-round-price-3')
    /** rellenos de datos paea las rondas */
    dateRound_1.innerText = fechaString(producto.round_1)
    dateRound_2.innerText = fechaString(producto.round_2)
    dateRound_3.innerText = fechaString(producto.round_3)
    priceRound_1.innerText = producto.price_r1
    priceRound_2.innerText = producto.price_r2
    priceRound_3.innerText = producto.price_r3

    /** remplazo de las barras inclidas de la fecha de ronda para uso en una funcion */
    var date_r1 = convertDateEsToEn(producto.round_1, 1).replace('/', '-').replace('/', '-')
    var date_r2 = convertDateEsToEn(producto.round_2, 1).replace('/', '-').replace('/', '-')
    // var date_r3 = convertDateEsToEn(producto.round_3, 1).replace('/', '-').replace('/', '-')

    /**********************************************************************************
     * comparación de fechas de ronda con fecha de sistema para poder determinar 
     * cuándo una ronda ha pasado de fecha
     *********************************************************************************/
    if (fechaSistema() <= date_r1) {
        feeInfo.forEach(element => {
            element.innerText = producto.price_r1
        });
        /**activa el elemento y pone background en CSS */
        document.querySelector('#round-1').classList.add('active-fee')

    } else if ((fechaSistema() > date_r1) && (fechaSistema() <= date_r2)) {
        feeInfo.forEach(element => {
            element.innerText = producto.price_r2
        });
        /*********************************************************
         * inhabilita el PRIMER elemento cuando pasó de fecha,
         * activa el SEGUNDO elemento y pone background en CSS,
         ******************************************************** */
        document.querySelector('#round-1').classList.add('inactive-fee')
        document.querySelector('#round-2').classList.add('active-fee')
        priceRound_1.innerText = roundsFee

    } else if (fechaSistema() > date_r2) {
        feeInfo.forEach(element => {
            element.innerText = producto.price_r3
        });
        /***********************************************************
         * inhabilita el PRIMER y SEGUNDO elemento cuando han 
         * pasado de fecha
         **********************************************************/
        document.querySelector('#round-1').classList.add('inactive-fee')
        document.querySelector('#round-2').classList.add('inactive-fee')
        document.querySelector('#round-3').classList.add('active-fee')
        priceRound_1.innerText = roundsFee
        priceRound_2.innerText = roundsFee
    }

}

/*****************************************************************************************
 * Se inicializa la pantalla con la @function infoProduct para mostrar los datos del
 * producto
 * @param docJob  / se pasa documento a trabajar para su filtrado (JSON) con la
 * @function resultadoIdJson
 * 
 ****************************************************************************************/


infoProduct(resultadoIdJson(docJob, codga))

lazyLoad()


