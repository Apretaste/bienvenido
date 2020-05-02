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
