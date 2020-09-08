// create the content for the slides
var slides = [
	{title:'Hola, soy Apretín', body:'Soy la mascota de Apretaste, estoy acá para guiarte empezando a usar la app y ayudarte en lo que necesites.'},
	{title:'Crea tu perfil', body:'Desde el menú accede a tu perfil. Agrega tu avatar, color, provincia y descríbete para que otros te conozcan.'},
	{title:'Habla libremente', body:'Desde la barra superior, abre la Pizarra, nuestra red social donde pones lo que quieras y cuando quieras.'},
	{title:'Haz amig@s', body:'Usando Pizarra conoce a otros que piensan como tú e invítales a ser tus amig@s. Revisa tus amig@s desde el menú.'},
	{title:'Hazte popular', body:'Usando la app gana experiencia y sube en el ranking, llega al nivel Diamante, completa retos, dinámicas y concursos.'},
	{title:'Usa tu crédito', body:'Canjea tu crédito por amuletos y adquiere poderes especiales, o por tickets para la rifa, o por recargas Cubacel.'},
	{title:'Ahorra saldo', body:'En la pantalla inicial verás decenas de servicios de internet, optimizados para trabajar rápidamente y ahorrarte datos.'},
	{title:'Sé un experto', body:'¿Quieres volverte todo un experto usando Apretaste? Abre el servicio "Escuela" y léete nuestro curso tutorial.'}
];

// current slide step
var currentSlide = 0;

// load the first slide on start
$(document).ready(function(){
	update();
});

// update the slides and buttons 
function update() {
	// set the buttons
	switch(currentSlide) {
		case 0:
			$('#btn-back').html('Saltar').off().click(close);
			$('#btn-next').html('Comenzar').off().click(next);
		break;

		case 7:
			$('#btn-back').html('Ver tutorial').addClass('green-text').off().click(tutorial);
			$('#btn-next').html('Comenzar').off().click(close);
		break;

		default:
			$('#btn-back').html('Atrás').off().click(back);
			$('#btn-next').html('Siguiente').off().click(next);
	}

	// set the text
	$('#title').html(slides[currentSlide].title);
	$('#body').html(slides[currentSlide].body);

	// set the image
	$('.image').css('display', 'none');
	$('.image-' + currentSlide).css('display', 'inline-block').attr('alt', slides[currentSlide].title);
}

// move to the next slide
function next() {
	currentSlide++;
	update();
}

// move to the previous slide
function back() {
	currentSlide--;
	update();
}

// close the service
function close() {
	var command = isNewVersion ? 'INICIO' : 'SERVICIOS';
	apretaste.send({command: command});
}

// read the tutorial
function tutorial() {
	apretaste.send({
		command: 'ESCUELA CURSO',
		data: {query: tutorialId}
	});
}
