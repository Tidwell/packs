(function() {
	window.USERID = null;
	window.USERTOKEN = null;
	
	var $form;
	var $formRegister;
	var data = {
		authed: false
	};

	function getUser() {
		API.getUser()
			.then(setAuthed)
			.fail(setFail);
	}

	function setAuthed(res) {
		data.user = res;
		window.USERID = data.user.id;
		window.USERTOKEN = data.user.token;
		data.authed = true;
	}

	function setFail(res) {
		data.msg = res.responseJSON ? res.responseJSON.error : res.responseText;
	}

	function login() {
		data.msg = '';
		API.login($form.find('[name="username"]').val(), $form.find('[name="password"]').val())
			.then(setAuthed)
			.fail(function(res) {
				//user is already authed
				if (res.status === 400) {
					return getUser();
				}
				setFail(res);
			});
		return false;
	}
	function register() {
		data.msg = '';
		API.register($formRegister.find('[name="username"]').val(), $formRegister.find('[name="password"]').val())
			.then(setAuthed)
			.fail(function(res) {
				setFail(res);
			});
		return false;
	}

	function logout() {
		API.logout()
			.then(function() {
				data.authed = false;
				delete data.user;
			})
			.fail(function() {
				data.msg = 'Error logging out, please try again.';
			});
	}

	function init() {
		$auth = $('[auth]');
		$form = $auth.find('form[login]');
		$formRegister = $auth.find('form[register]');

		rivets.bind($auth, {
			data: data
		});

		$auth.on('submit', 'form[login]', login);
		$auth.on('submit', 'form[register]', register);

		$auth.on('click', '[logout]', logout);
	}
	$(init);

	rivets.formatters.json = function(value, intendation) {
		return JSON.stringify(value, null, intendation || 0);
	};
}());