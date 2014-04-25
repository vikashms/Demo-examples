(function () {
    Training.Backbone.ExampleView = Backbone.View.extend({
        el: '#css3-link-container',
        events: {
            'click .animate': 'loadAnimate',
            'click .boxShadow': 'loadUser',
            'click .btn-add-task': 'addTask',
            'blur .input-task': '_updateTask'
        },
        initialize: function (options) {
            this.router = options.router;
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
        },
        loadAnimate: function (event) {
            this.router.navigate('#animate', { trigger: true });
        },
        loadUser: function (event) {
            this.router.navigate('#user/vikash/12', { trigger: true,replace:true });
        }
    });
})();