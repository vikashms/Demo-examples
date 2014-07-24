(function () {
    Training.Backbone.ExampleView = Backbone.View.extend({
        events: {
            'click .add-task': 'addTask',
            'click .show-task': 'showTasks',
        },
        initialize: function (options) {
          var model = this.model;
        },
        render: function () {
        },
        addTask: function () {
            var model = this.model,
                $inpTask = this.$('.txt-task'),
                strTask = $inpTask.val();
            model.addTask(strTask);
            $inpTask.val('');
        },
        showTasks:function(){
            var $showTaskContainer = this.$('#show-task-container'),
                tasks = this.model.get('tasks'),
                taskList = tasks.models,
                length = taskList.length;
            $showTaskContainer.empty();
            for (var i = 0; i < length; i++) {
                var curModel = taskList[i];
                var $view = new Training.Backbone.TaskView({
                    model: curModel
                })
                $showTaskContainer.append($view.render().el);
            }
        }
    });
})();