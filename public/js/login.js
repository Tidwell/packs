(function() {
	var $form;
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
		data.authed = true;
	}

	function setFail(res) {
		data.msg = res.responseJSON.error;
	}

	function init() {
		$auth = $('[auth]');
		$form = $auth.find('form');
		$logout = $auth.find('[logout]');

		rivets.bind($auth, {data: data});

		$form.submit(function(){
			data.msg = '';
			API.auth($form.find('[name="username"]').val(), $form.find('[name="password"]').val())
				.then(setAuthed)
				.fail(function(res) {
					console.log(res)
					//user is already authed
					if (res.status === 400) {
						return getUser();
					}
					setFail(res);
				});
			return false;
		});

		$logout.click(function() {
			API.logout()
				.then(function() {
					data.authed = false;
					delete data.user;
				})
				.fail(function(){
					data.msg = 'Error logging out, please try again.';
				});
		});
	}
	$(init);

	rivets.formatters.json = function(value, intendation) {
		return JSON.stringify(value, null, intendation || 0);
	};
}());