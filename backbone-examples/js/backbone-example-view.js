(function () {
    Training.Backbone.ExampleView = Backbone.View.extend({
        el: '#backbone-example-holder',
        events: {
            'click .btn-add-task': 'addTask',
            'blur .input-task': '_updateTask'
        },
        initialize: function () {
            var model = this.model;
            model.on('change:task', this._addTableRow, model.get('task'));
            this.on('updateTaskContent', function (strTask) {
                model.set('task', strTask);
            });
        },
        render: function () {
        },
        addTask: function () {
            var model = this.model;
            console.log(model.get('task'));
            model.set('date', this.$('.task-date').val());
        },
        _updateTask: function (event) {
            this.trigger('updateTaskContent', $(event.target).val());
        },
        _addTableRow: function (task) {
            console.log(task)
        }
    });
    Training.Backbone.ExampleRouter = Backbone.Router.extend({
                routes: {
                    "posts/:id": "getPost",
                    "*actions": "defaultRoute" // Backbone will try match the route above first
                }
            });
    // Instantiate the router
    var app_router = new Training.Backbone.ExampleRouter;
    app_router.on('route:getPost', function (id) {
        // Note the variable in the route definition being passed in here
        alert( "Get post number " + id );   
    });
    app_router.on('route:defaultRoute', function (actions) {
        alert( actions ); 
    });
    // Start Backbone history a necessary step for bookmarkable URL's
    Backbone.history.start();


})();