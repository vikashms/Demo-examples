(function () {
    Training.Backbone.ExampleModel = Backbone.Model.extend({
        defaults: {
            tasks:null
        },
        initialize: function () {
            var tasks = new Training.Backbone.ExampleCollection();
            this.set('tasks', tasks);
        },
        addTask: function (strTask) {
            var newTask = new Training.Backbone.Task({task:strTask}),
                taskList = this.get('tasks');
            taskList.add(newTask);
        }

    })
})();