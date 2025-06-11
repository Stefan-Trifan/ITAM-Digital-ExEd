/******************************************************************
 * @function convertirCsvAJson / convierte un doc CSV a JSON
 * @param csv = documento a convertir
 * @return 'resultado' con el array de objetos convertido en JSON
 ******************************************************************/
function convertirCsvAJson(csv) {
    const lineas = csv.split('\n');
    const encabezados = lineas[0].split(',');
    const resultado = [];
    for (let i = 1; i < lineas.length; i++) {
        const fila = lineas[i].split(',');
        if (fila.length === encabezados.length) {
            const objeto = {};
            for (let j = 0; j < encabezados.length; j++) {
                objeto[encabezados[j]] = fila[j];
            }
            /**rellena el JSON con los objetos */
            resultado.push(objeto);
        }
    }
    return resultado;
}

/***********************************************************************
 * función para retornar el JSON del HUB buscado
 * @param docCSV = documento CSV para convertir a JSON
 * con la función convertirCsvAJson()
 * @param hubProduct = HUB a buscar
 * @returns 'resultadoHubsPrograma' = JSON de HUB buscado  
 ***********************************************************************/
async function resultadoHubCsv(docCSV, hubProduct) {
    const resultadoHubsPrograma = [];
    resultadoHubsPrograma.length = 0;
    try {
        const response = await fetch(docCSV);
        const csv = await response.text();
        /*******************************************************************************
         * pasar @param csv para retornar JSON en @const arrayDeObjetos, recorrerla
         * para almacenar nuevo JSON con los HUBS buscados con el @param hubProduct
         * y determinando el estado del objeto, si es que se encuentra activo
         * según la BBDD de los productos
         ******************************************************************************/
        const arrayDeObjetos = convertirCsvAJson(csv);
        arrayDeObjetos.forEach(unidadDeObjeto => {
            if (unidadDeObjeto.hubs.includes(hubProduct) && (unidadDeObjeto.state.toLowerCase() == 'a')) {
                resultadoHubsPrograma.push(unidadDeObjeto);
            }
        });
        return resultadoHubsPrograma;
    } catch (error) {
        return console.error(error);
    }
}

/**********************************************************************
 * @function resultadoHubJson función para buscar los Objetos según HUB
 * @param {*documento json} docJSON 
 * @param {*hub a buscar} hubProduct 
 * @returns retorna array de objetos encontrados
 **********************************************************************/
async function resultadoHubJson(docJSON, hubProduct) {
    const obj = [];
    obj.length = 0;
    try {
        const response = await fetch(docJSON);
        const data = await response.json();
        data.forEach(item => {
            /** se ejecuta el filtrado según hub y su estado 'ACTIVO' en la BBDD
             * Se puede quitar esta última condicional y solo filtrar el HUB */
            if (item.hubs.includes(hubProduct) && (item.state.toLowerCase() == 'a')) {
                /** Se rellena el arreglo de objetos con los productos encontrados */
                obj.push(item);
            }
        });
        /** Se devuelve el arrego de objetos encontrados */
        return obj;
    } catch (error) {
        return console.error(error);
    }
}

/***********************************************************************
 * @function clicksIdsHubs añade evento click a todos
 * los IDs de hubs que existan en el DOM - HTML
 * @param docJob / se pasa el documento a trabajar para su filtrado,
 * el documento pordrá ser un CSV o JSON y dentro de ella se activará
 * una función según documento
 **********************************************************************/
function clicksIdsHubs(docJob) {
    /**
     * @var allIndicator recoge todos los IDs (hubs de producto)
     * del DOM con la clase 'hub-prog' para añadir un evento click
     * a cada uno de los hubs encontrados y ejecutar las funciones
     * de construcción de las tarjetas de producto
     */
    allIndicator.forEach(idHubs => {
        idHubs.addEventListener('click', function () {

            /** Dependiendo del tipo de docJob se activará una u otra función. 
             * @var idHubs.id es el HUB que se obtiene del ID de la etiqueta 
             * contenedora con la clase 'hub-prog'
            */
            if (docJob.includes('.json')) {
                infoProducts(resultadoHubJson(docJob, idHubs.id), idHubs.id)
            } else if (docJob.includes('.csv')) {
                infoProducts(resultadoHubCsv(docJob, idHubs.id), idHubs.id)
            }
            /** función que ejecuta el ScrollTop según elemento elegido*/
            clickScrollElelemt(scrollElement)
        })
    });
}

/************************************************************************
 * @param {arreglo de objeto filtrado} arrayObj 
 * @return / retorna las tarjetas paginadas para mostrarse en pantalla.
 * Dentro de esta función se ejecutará la función de construcción
 * de las tarjetas llamando al <template> del DOM - HTML
 ***********************************************************************/
function paginacionObjetos(arrayObj) {
    /*********************************************************************
     * @function mostrarElementos / función para mostrar la página inicio
     * @param {*numero de pagina} paginaActual inicializada en #1
     ********************************************************************/
    const listaElementos = document.querySelector('#content-programs');
        /** se limpia el contenedor de tarjetas para rellenarlas con las encontradas */
        listaElementos.innerHTML = '';
    const $cards = document.getElementById('content-programs'),
        $template = document.getElementById('template-card').content,
        $fragment = document.createDocumentFragment();
        arrayObj.forEach(obj => {
        /**
         * @function createCard / se llama a la función para contruir las tarjetas
         * @param obj / producto individual del objeto para construir tarjeta
         * @param $template / plantilla de tarjeta de producto
         * @param $fragment / fragmentos de tarjeta para añadirla al DOM
         */
        createCard(obj, $template, $fragment)
    });
    /** Se añade en el contenedor de tarjetas de DOM el fragmento de elementos por página */
    $cards.appendChild($fragment)

    lazyLoad();

}


/***************************************************************************
 * @param {*elelemto scrollTop} scrollElement 
 * la función realiza un scrollTop hacia el elemento indicado una vez
 * se haga click en cualquier botón de paginación o de HUB
 **************************************************************************/
function clickScrollElelemt(scrollElement) {
    window.scrollTo({
        top: scrollElement.offsetTop,
        behavior: 'smooth'
    });
}

console.log("7 Funciona");