/*========================================================*/
/* QUERY SCROLL PARA VISUALIZAR LA FLECHA DE SCROLL UP y MORE INFO
/*========================================================*/

function upDownSee(element, number) {
	if (document.querySelector(element)) {
		$(window).scroll(function (event) {
			var scrollTop = $(window).scrollTop();
			if (scrollTop >= number) {
				document.querySelector(element).classList.remove('oculto');
				document.querySelector(element).classList.add('visible');
			} else if (scrollTop < number) {
				document.querySelector(element).classList.remove('visible');
				document.querySelector(element).classList.add('oculto');
			}
		});
	}
	
}

// upDownSee('.btn-fijo-mobile')

if ((window.matchMedia('(min-width: 992px)').matches)) {
	var scrollNumber = 1000
	upDownSee('.scroll-top-arrow', scrollNumber)
}
/*========================================================*/
/* ANIMACIÓN TODOS LOS BOTONES, ESTO SUSTITUYE LAS ANCLAS
/*========================================================*/

$(document).ready(function () {
	$('.scroll-top-arrow').click(function () { //FLECHA SCROLL UP

		$('body, html').animate({
			scrollTop: '0px'
		}, 500);
	});

});

/*==============================================================================*/
/* QUERY SCROLL PARA VISUALIZAR BOTONES APPLY NOW Y SCHEDULE A CALLE EN MOBILE
/*==============================================================================*/
if (document.querySelector('#btn-sticky-bottom')  && (window.matchMedia('(max-width: 991px)').matches) ) {
	// Obtiene el elemento que se desea comprobar
	const formResponsive = document.querySelector('#content-form-responsive')
	// Variable para almacenar el estado actual del formulario
	let formularioFueraDePantalla = false;
	window.addEventListener("scroll", () => {
		// Obtiene la posición y el tamaño del elemento
		const elementoRect = formResponsive.getBoundingClientRect();
		// Comprueba si la parte inferior del elemento sale de la pantalla superior
		const seSalePorArriba = elementoRect.bottom < 0;
		// Si la parte inferior del elemento sale de la pantalla superior, haz algo
		if (seSalePorArriba !== formularioFueraDePantalla) {
			formularioFueraDePantalla = seSalePorArriba;
			if (seSalePorArriba) {
				document.querySelector('#btn-sticky-bottom').classList.remove('oculto');
				document.querySelector('#btn-sticky-bottom').classList.add('visible');
			} else {
				document.querySelector('#btn-sticky-bottom').classList.remove('visible');
				document.querySelector('#btn-sticky-bottom').classList.add('oculto');
			}
		}
	})
}