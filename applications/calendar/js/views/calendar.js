(function () {
    App.Calendar.Views.Calendar = App.Calendar.View.extend({
        events: {
            'click .next-month': '_loadNextMonth',
            'click .previous-month': '_loadPreviousMonth',
        },
        initialize: function (options) {
            var model = this.model;
            this.render();
            this._bindModelChangeEvents()
        },
        render: function () {
        },
        _loadNextMonth: function (event) {
            var model = this.model,
                currentMonthId = model.getCurrentMonthId(),
                nxtMonthId = currentMonthId + 1,
                monthStr = null;
            model.setSelectedMonth(nxtMonthId);
        },
        _loadPreviousMonth:function(event){
            var model = this.model,
                currentMonthId = model.getCurrentMonthId(),
                nxtMonthId = currentMonthId +-1,
                monthStr = null;
            model.setSelectedMonth(nxtMonthId);
            
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
        },
        _updateMonth: function () {
            var model = this.model,
                currentMonthId = model.getCurrentMonthId(),
                monthStr = model.getMonthText(currentMonthId);
            this.$('.month-name').text(monthStr);
        },
        _updateYear:function(){
                var model = this.model,
                year = model.getSelectedYear();
            this.$('.year-name').text(year);
        },
        _bindModelChangeEvents: function () {
            var events = App.Calendar.Views.Calendar.EVENTS,
                model = this.model;
            this.listenTo(model, events.SELECTED_MONTH_CHANGE, this._updateMonth);
            this.listenTo(model, events.SELECTED_YEAR_CHANGE, this._updateYear);
        }
    }, {
        EVENTS: {
            SELECTED_YEAR_CHANGE: 'change:selectedYear',
            SELECTED_MONTH_CHANGE: 'change:selectedMonth',
        }

    });
})();