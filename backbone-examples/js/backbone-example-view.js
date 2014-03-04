(function () {
    Training.Backbone.ExampleView = Backbone.View.extend({
        el: '#backbone-example-holder',
        events:{
            'click .btn-add-task': 'addTask',
            'blur .input-task':'_updateTask'
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
            this.trigger('updateTaskContent',$(event.target).val());
        },
        _addTableRow: function (task) {
            console.log(task)
        }
    })
})();