// create the content for the slides
var slides = [
	{title:'Sube de nivel', body:'Usa la app y sube de nivel. Desbloquea beneficios y premios. Alcanza el nivel más alto y sé parte del club Diamante.'},
	{title:'Gana crédito', body:'Usa la app toda la semana, invita amig@s, contesta en encuestas y concursos, canjea cupones, y gana crédito en la app.'},
	{title:'Usa tu crédito', body:'Saca provecho a tu crédito adquiriendo tickets para las rifas, amuletos, recargas Cubacel, bonos especiales y más.'},
	{title:'Crea tu perfil', body:'Agrega tu avatar, color, @username, provincia y descríbete para que otros conozcan tu estilo y sepan que te gusta.'},
	{title:'Haz amig@s', body:'Opina públicamente en la Pizarra, conoce quienes piensa como tú, haz amig@s y habla en privado usando el Chat.'},
	{title:'Busca parejas', body:'Encuentra tu media naranja en nuestra vibrante comunidad de parejas llamada Piropazo, tenemos miembros de toda Cuba.'},
	{title:'Ponte al día', body:'Mantente informado sobre el acontecer nacional y mundial revisando los medios de prensa más leídos en Cuba actualmente.'},
	{title:'Recibe ayuda', body:'¿Tienes dudas sobre cómo usar la app? Escríbenos al soporte y con gusto te responderemos en un máximo de 72 horas.'}
];

// current slide step
var currentSlide = 0;

$(document).ready(function(){
	next();
});

// load the next slide
function next() {
	// send users home on the last slide
	if(currentSlide === 8) {
		apretaste.send({'command':'SERVICIOS'});
		return false;
	}

	// set the text
	$('#title').html(slides[currentSlide].title);
	$('#body').html(slides[currentSlide].body);

	// set the slide image
	$('#image').attr('src', '{{APP_SERVICE_PATH}}/images/' + currentSlide + '.png');
	$('#image').attr('alt', slides[currentSlide].title);

	// set the button caption and click
	if(currentSlide === 7) $('#btn-next').html('Siguiente');
	else $('#btn-next').html('Comenzar');

	// get to the next slide
	currentSlide++;
}