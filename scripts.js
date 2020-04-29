// create the content for the slides
var slides = [
	{title:'Niveles', body:'Usa la app y gana beneficios. A medida que uses la app podrás subir de nivel, desbloqueando beneficios y bonos extras.'},
	{title:'7 días', body:'Usa la app toda la semana y gana crédito. Canjea el crédito por tickets para las Rifas, amuletos de la app, recargas Cubacel, y más.'},
	{title:'Chat', body:'Usa el servicio Chat para mantenerte comunicado con tus seres queridos, o hacer nuevos amigos entre los usuarios de la app.'},
	{title:'Pizarra', body:'Usa nuestro servicio pizarra para expresar libremente tu opinión, tu sentir y tus pensamientos y conocer gente que piensa como tú'},
	{title:'Piropazo', body:'Date la oportunidad y ¡Conoce nuevas personas! En nuestro servicio Piropazo podrás hacer amigos y conocer tu media naranja.'},
	{title:'Recargas', body:'Aprovecha la oportunidad de canjear una recarga a Cubacel en nuestro servicio Recargas y mantenerte conectado todo el tiempo.'},
	{title:'Noticias', body:'Mantente siempre informado. Con nuestra variedad de servicios de noticias podrás conocer todo el acontecer nacional y mundial.'},
	{title:'Ayuda', body:'¿Necesitas ayuda? ¿Tienes quejas o sugerencias? ¡Escríbenos en nuestra pestaña soporte! Estaremos encantados de atenderte.'}
];

$(document).ready(function(){
	// initialize a carousel
	$('.carousel').carousel({
		noWrap: true,
		numVisible: 3,
		onCycleTo: onSlideChange
	});
});

// callback when a slide changes
function onSlideChange(e) {
	// get the slide number
	var slide = parseInt($(e).attr('slide'));

	// set the text
	$('#title').html(slides[slide - 1].title);
	$('#body').html(slides[slide - 1].body);

	// set the button caption and click
	if(slide === 8) $('.btn-next').html('Comenzar').off('click').click(start);
	else $('.btn-next').html('Siguiente').off('click').click(next);
}

// open the next screen
function next() {
	$('.carousel').carousel('next');
}

// send users home
function start() {
	apretaste.send({'command':'SERVICIOS'});
}
