/*========================================================*/
/* START TOOGLE DEL BOTÓN SEE MORE/SEE LESS
/*========================================================*/
$(document).ready(function(){
  var lang = document.querySelector('html').lang.toLowerCase().trim().slice(0,2);
  var b_slide = document.querySelectorAll('a.button-slide');
  var MostrarMas;
  var MostrarMenos;
  switch(lang) {
    case 'en': MostrarMas = 'See more'; MostrarMenos = 'See less';
    break;
    case 'es': MostrarMas = 'Ver más'; MostrarMenos = 'Ver menos';
    break;
    case 'it': MostrarMas = 'Mostra di più'; MostrarMenos = 'Mostra di meno';
    break;
    case 'fr': MostrarMas = 'Voir plus'; MostrarMenos = 'voir moins';
    break;
    case 'pt': MostrarMas = 'Ver mais'; MostrarMenos = 'Ver menos';
    break;
  }
  b_slide.forEach(element => {
    var idContainer = '#' + element.dataset.slide
    var idBtnSlide = '#' + element.dataset.slide + ' a.button-slide';
    var more_slide = '#' + element.dataset.slide + ' .more-slide';
    $(idBtnSlide).click(function(){
      if(document.querySelector(more_slide).style.display.includes('block')){
        $(more_slide).slideUp()
        document.querySelector(idBtnSlide).innerText = MostrarMas
        // var container = document.querySelector(idContainer).offsetTop - 150
        var container = document.querySelector(idContainer).offsetTop - document.querySelector('.pos-fixed').clientHeight
        $([document.documentElement, document.body]).animate({
          scrollTop: container
        }, 300);
      } else {
        $(more_slide).slideDown()
        document.querySelector(idBtnSlide).innerText = MostrarMenos    
      }
    })
  });
}); 
/* -- END TOOGLE DEL BOTÓN SEE MORE/SEE LESS  -- */

/*========================================================*/
/* ACCORDION
/*========================================================*/
$(document).ready(function(){
  $(".accordion-wrap").on("click", function(){   
    $(this).children().eq(1).slideToggle(300);  
    $(this).children().eq(0).toggleClass("accordion-no-bar");
    $(this).siblings().find(".accordion-header").removeClass("accordion-gold");
    $(this).siblings().find(".accordion-header i").removeClass("rotate-fa");
    $(this).find(".accordion-header").toggleClass("accordion-gold");
    $(this).find(".fa").toggleClass("rotate-fa");

    $(".accordion-wrap .accordion-text").not($(this).children().eq(1)).slideUp(300);
  });
});