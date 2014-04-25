(function () {
    Training.Backbone.Router = Backbone.Router.extend({
        routes: {
            '': function () { alert('you are viewing home page'); },
            //'user/:id': 'showUserInformation',
            'user/:name(/:page)': 'showUserNameWithId',
            'view': function () {
                $('#css3-container').load(Training.Backbone.Router.VIEW);
            },
            'animate': function () {
                $('#css3-container').load(Training.Backbone.Router.VIEW);
            },
            'boxShadow': function () {
                $('#css3-container').load(Training.Backbone.Router.BOX_SHADOW);
            }
        },
        showUserInformation: function (id) {
            alert(id)
        },
        showUserNameWithId: function (name,id) {
            alert(name+ '                -            ' + id)
        }
    }, {
        VIEW: "../html5/css3.htm",
        BOX_SHADOW: "../html5/box-shadow.htm"
    });
    //route.navigate('user/vikash/19');
})();