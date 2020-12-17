//
// start components
//
$(document).ready(function() {
	// start basic components
	$('.modal').modal();

	// checks/uncheck components
	$('.checks .check').click(function() {
		// get active and limit
		var limit = $(this).parent().attr('limit');
		var count = $(this).parent().find('.check.active').length;
		var isActive = $(this).hasClass('active');

		// jump checks if only one element allowed
		if(limit == 1) $('.checks .check').removeClass('active');

		// do not go over the limit for multiple elements
		else if(limit != undefined && limit <= count && !isActive) return false;

		// make the check active/inactive
		$(this).toggleClass('active');
	});

	// get values of active "checks" components
	$.fn.value = function() {
		var values = [];
		$(this).find('.check').each(function(i, e){
			if($(e).hasClass('active')) {
				values.push($(e).attr('value'));
			}
		})
		return values;
	};
});

//
// get the list of avatars
//
function getAvatars() {
	return ['artista','atento','bandido','belleza','chica','coqueta','cresta','deportiva','dulce','emo','extranna','fabulosa','fuerte','ganadero','geek','genia','gotica','gotico','guapo','hawaiano','hippie','hombre','jefe','jugadora','libre','mago','metalero','modelo','moderna','musico','nerd','oculto','punk','punkie','rap','rapear','rapero','rock','rockera','rubia','rudo','sencilla','sencillo','sennor','sennorita','sensei','surfista','tablista','vaquera'];
}

//
// jump to another screen
//
function jumpTo(screenName) {
	$('.screen').hide();
	$('.screen.'+screenName).show();
}

//
// change your username
//
function changeUsername() {
	// get the username
	var username = $('#username').val();

	// validate the username
	if(username.length <= 3 || username.match(/^\d/)) {
		M.toast({html: 'Escriba un username válido'});
		return false;
	}

	// add to the list
	person.username = username;

	// change in avatar screen
	$('#avatar-username').text('@' + person.username);

	// move forward
	jumpTo('province');
}

//
// change your province
//
function changeProvince() {
	// get the province
	var province = $('.checks.province').value();

	// validate the province
	if(province.length <= 0) {
		M.toast({html: 'Escoja su provincia'});
		return false;
	}

	// add to the list
	person.province = province[0];

	// move forward
	jumpTo('gender');
}

//
// change your gender
//
function changeGender() {
	// get the gender
	var gender = $('.checks.gender').value();

	// validate the province
	if(gender.length <= 0) {
		M.toast({html: 'Escoja su género'});
		return false;
	}

	// add to the list
	person.gender = gender[0];

	// change in avatar screen
	$('#avatar-username').removeClass('M').removeClass('F').addClass(person.gender);

	// move forward
	jumpTo('avatar');
}

//
// change your avatar face
//
function changeAvatarFace(element) {
	// get the avatar face
	var face = $(element).attr('face');

	// add to the list
	person.avatar = face;

	// set the avatar
	$('#avatar').attr('face', face);
	setElementAsAvatar($('#avatar').get());
}

//
// change your avatar color
//
function changeAvatarColor() {
	// get the avatar color
	var avatarColor = $('.checks.avatar-color').value();

	// add to the list
	person.avatarColor = avatarColor[0];

	// set the avatar
	$('#avatar').attr('color', avatarColor);
	setElementAsAvatar($('#avatar').get());
}

//
// change your favorites
//
function changeFavorites() {
	// get the avatar color
	var favs = $('.checks.favorites').value();

	// validate the province
	if(favs.length <= 0) {
		M.toast({html: 'Escoja al menos una preferencia'});
		return false;
	}

	// define categories
	var services = {
		'BASE' : ['bienvenido','invitar'],
		'FRIENDS' : ['amigos','chat','pizarra'],
		'TALK' : ['chat','pizarra','noticias'],
		'INFO' : ['clima','dondehay','etecsadroyd','noticias','vuelos','television'],
		'BOLITA' : ['bolita'],
		'DATES' : ['piropazo','amigos'],
		'LEARN' : ['escuela'],
		'JOBS' : ['empleos','revoltillo'],
		'FUN' : ['ajedrez','chiste','concurso','letras','rifa','ruleta','sudoku'],
		'SPORTS' : ['baseball','futbol'],
		'FAITH' : ['horoscopo','oracion']
	};

	// get unique favorites services
	var favorites = services['BASE'];
	favs.forEach(function(item){
		services[item].forEach(function(i){
			if($.inArray(i, favorites) < 0) {
				favorites.push(i);
			}
		});
	});

	// submit the data
	apretaste.send({
		command: 'BIENVENIDO UPDATE',
		data: {
			person: person,
			favorites: favorites
		}
	});
}
