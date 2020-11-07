$(document).ready(function() {
	//
	// start basic components
	//
	$('.modal').modal();

	//
	// start check component
	//

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
// update the user profile
//
function submitData() {
	// submit profile data
	apretaste.send({
		command: 'PERFIL UPDATE',
		redirect: false,
		data: {
			username: person.username,
			province: person.province,
			gender: person.gender,
			avatar: person.avatar,
			avatarColor: person.avatarColor
		},
		callback: {name: 'openTutorialCallback'}
	});
}

//
// redirect to the tutorial
//
function openTutorialCallback() {
	apretaste.send({command: 'BIENVENIDO TUTORIAL'});
}
