//
// start components
//
$(document).ready(function() {
	// start basic components
	$('.modal').modal();

	// set default values for the checks
	startCheck($('.checks.province'));
	startCheck($('.checks.gender'));
	startCheck($('.checks.avatar-color'));
	startCheck($('.checks.default-service'));

	// start the checks component
	function startCheck(el) {
		// only load if check list exists
		if($(el).attr('active') == undefined) return false;

		// get default active options
		var active = $(el).attr('active').split(',');

		// check default active options
		$(el).find('.check').each(function(i, e){
			if(active.includes($(e).attr('value'))) {
				$(e).addClass('active');
			}
		});
	}

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
// change your username
//
function changeUsername() {
	// get the username
	var username = $('#username').val();

	// just jump if no changes
	if(username == person.username) {
		jumpTo('province');
		return true;
	}

	// validate the username
	if(username.length <= 3 || username.match(/^\d/)) {
		M.toast({html: 'Escriba un username válido'});
		return false;
	}

	// change in avatar screen
	$('#avatar-username').text('@' + username);

	// update the change in the frontend
	person.username = username;

	// change in the backend
	apretaste.send({
		command: 'PERFIL UPDATE',
		data: {username: username},
		redirect: false
	});

	// move forward
	jumpTo('province');
}

//
// change your province
//
function changeProvince() {
	// get the province
	var province = $('.checks.province').value();

	// just jump if no changes
	if(province[0] == person.province) {
		jumpTo('gender');
		return true;
	}

	// validate the province
	if(province.length <= 0) {
		M.toast({html: 'Escoja su provincia'});
		return false;
	}

	// update the change in the frontend
	person.province = province[0];

	// change in the backend
	apretaste.send({
		command: 'PERFIL UPDATE',
		data: {province: province[0]},
		redirect: false
	});

	// move forward
	jumpTo('gender');
}

//
// change your gender
//
function changeGender() {
	// get the gender
	var gender = $('.checks.gender').value();

	// just jump if no changes
	if(gender[0] == person.gender) {
		jumpTo('avatar');
		return true;
	}

	// validate the province
	if(gender.length <= 0) {
		M.toast({html: 'Escoja su género'});
		return false;
	}

	// update the change in the frontend
	person.gender = gender[0];

	// change in the backend
	apretaste.send({
		command: 'PERFIL UPDATE',
		data: {gender: gender[0]},
		redirect: false
	});

	// change in avatar screen
	$('#avatar-username').removeClass('M').removeClass('F').addClass(person.gender);

	// move forward
	jumpTo('avatar');
}

//
// change your avatar
//
function changeAvatar() {
	// get the avatar
	var avatar = $('#avatar').attr('face');
	var avatarColor = $('.checks.avatar-color').value();

	// just jump if no changes
	if(avatar == person.avatar && avatarColor[0] == person.avatarColor) {
		jumpTo('default-service');
		return true;
	}

	// update the change in the frontend
	person.avatar = avatar;
	person.avatarColor = avatarColor[0];

	// change in the backend
	apretaste.send({
		command: 'PERFIL UPDATE',
		data: {avatar: avatar, avatarColor: avatarColor[0]},
		redirect: false
	});

	// move forward
	jumpTo('default-service');
}

//
// change your avatar face
//
function changeAvatarFace(element) {
	// get the avatar face
	var avatar = $(element).attr('face');

	// set the avatar
	$('#avatar').attr('face', avatar);
	setElementAsAvatar($('#avatar').get());
}

//
// change your avatar color
//
function changeAvatarColor() {
	// get the avatar color
	var avatarColor = $('.checks.avatar-color').value();

	// set the avatar
	$('#avatar').attr('color', avatarColor[0]);
	setElementAsAvatar($('#avatar').get());
}

//
// change your default service
//
function changeDefaultService() {
	// get the gender
	var defaultService = $('.checks.default-service').value();

	// just jump if no changes
	if(defaultService[0] == person.defaultService) {
		jumpToTutorial();
		return true;
	}

	// validate the province
	if(defaultService.length <= 0) {
		M.toast({html: 'Escoja una experiencia'});
		return false;
	}

	// update the change in the frontend
	person.defaultService = defaultService[0];

	// change in the backend
	apretaste.send({
		command: 'PERFIL UPDATE',
		data: {default_service: defaultService[0]},
		redirect: false,
		callback: {name: 'jumpToTutorial'}
	});
}

//
// jump to another screen
//
function jumpTo(screenName) {
	$('.screen').hide();
	$('.screen.'+screenName).show();
}

//
// jump to the tutorial
//
function jumpToTutorial() {
	$('.start_tutorial').prop('disabled', true);
	apretaste.send({command: 'BIENVENIDO TUTORIAL'});
}
