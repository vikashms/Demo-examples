
LoginView = Backbone.View.extend({
    el: '#leave-tracker-login-form',
    events: {
        'blur .login-password': '_validatePassword'
    },

    intialize: function () {
    },
    render: function () {
    },
    _validatePassword: function (event) {
        var $element = $(event.target),
            strPassword = $element.val(),
            regex = /(?=^.{8,32}$)(?=(?:.*?\d){1})(?=.*[a-z])(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%*()_+^&]*$/;
        if (regex.test(strPassword)) {
            $element.removeClass('invalid');
        }
        else {
            $element.addClass('invalid');
            
        }
    }
});