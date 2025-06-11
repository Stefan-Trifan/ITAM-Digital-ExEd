const formulario = document.querySelector('#formulario')
const boton = document.querySelector('#boton');
var docFilter;
/********************************************************************
 * Se para valor a la @var docFilter dependiendo del formato
 * de documento que se declare en el DOM / data-docuement.
 * 
 * El resultado será la obtención de un arreglo de objetos
 * de todos los productos según su estado de activación en la BBDD
 *******************************************************************/
if (docJob.includes('.json')) {
    docFilter = resultadoHubJson(docJob, '')
} else if (docJob.includes('.csv')) {
    docFilter = resultadoHubCsv(docJob, '')
}

function filtrar() {
    /** @var texto recibe el valor del form mientras se va escibiendo */
    const texto = formulario.value.toLowerCase()
    const arrayObj = []
    docFilter.then(data => {
            data.forEach(obj => {
                let nombre = obj.program.toLowerCase()
                /** busca y compara el nombre del producto con el texto escrito
                 * o mientras se escribe para guardarlo en un arreglo de objeto */
                if (nombre.indexOf(texto) !== -1) {
                    arrayObj.push(obj)
                }
            });
            /** función para construir tarjetas por páginas del arreglo guardado
             * anteriormente             */
            paginacionObjetos(arrayObj)
        })
}

/**
 * eventos en el botón de formulario o en el input del formulario
 * mientras se va escribiendo y se le pasa la función filtrar()
 */
boton.addEventListener('click', filtrar)
formulario.addEventListener('keyup', filtrar)