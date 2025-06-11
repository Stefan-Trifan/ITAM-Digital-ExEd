/*=============================================================*/
/* funcion convierte fecha en formato: dia, mes, año
/*=============================================================*/
function isValidDate(day, month, year) {
    var dteDate;
    month = month - 1;
    dteDate = new Date(year, month, day);
    return ((day == dteDate.getDate()) && (month == dteDate.getMonth()) && (year == dteDate.getFullYear()));
}

/*========================================================================*/
/* funcion convierte fecha en idioma-ENG para que la entienda el sistema
/*=======================================================================*/
function convertDateEsToEn(dateEs, formatReturn) {
    var patron = new RegExp("^([0-9]{1,2})([/])([0-9]{1,2})([/])(19|20)+([0-9]{2})$");
    if (dateEs.search(patron) == 0) {
        values = dateEs.split("/");
        // Revisamos que la fecha sea correcta
        if (isValidDate(values[0], values[1], values[2])) {
            // devuelve la fecha en formato ingles
            if (formatReturn == 2) {
                // puedes devolver un objeto fecha para trabajar con el

                return new Date(values[2], (parseInt(values[1]) - 1), values[0]);
            } else {
                // puedes devolver simplemente la fecha en formato cadena
                if (values[1].length <= 1) {
                    values[1] = '0' + values[1];
                }
                if (values[0].length <= 1) {
                    values[0] = '0' + values[0];
                }
                return values[2] + "/" + values[1] + "/" + values[0];
            }
        }
    }
    return "";
}

/*=============================================================*/
/*funcion para convertir fecha a string segun idioma de landing
/*=============================================================*/
function fechaString(date_fecha) {
    var f_format_eng = convertDateEsToEn(date_fecha, 1)
    const fecha = new Date(f_format_eng);
    //objeto en formato string de fecha
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    if ((lang_html == 'af-ZA') && (dataProgram.dataset.lang == 'en')) {
        lang_html = 'en-US'
    }
    
    return (fecha.toLocaleDateString(lang_html, options))

}