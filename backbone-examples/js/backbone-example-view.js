(function () {
    Training.Backbone.ExampleView = Backbone.View.extend({
        events: {
            'click .add-task': 'addTask',
            'click .show-task': 'showTasks',
        },
        initialize: function (options) {
          //  this.router = options.router;
            var model = this.model;
           // model.on('change:task', this._addTableRow, model.get('task'));
            //this.on('updateTaskContent', function (strTask) {
            //    model.set('task', strTask);
            //});
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
                taskList = tasks.models;
            $showTaskContainer.empty();
            for (var i = 0; i < taskList.length; i++) {
                var $div = $("<div></div>"),
                    curModel =taskList[i]; 
                $div.text(curModel.get('task'));
                $showTaskContainer.append($div);
            }
        }
    });
})();