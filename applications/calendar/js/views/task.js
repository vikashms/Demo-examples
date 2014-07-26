(function () {
    Training.Backbone.TaskView = Backbone.View.extend({
        tagName:'div',
        events: {
            'click .delete': 'deleteTask',
        },
        initialize: function (options) {
            //  this.router = options.router;
            var model = this.model;
            //});
        },
        render: function () {
            var $div = $("<div class='task'>" + this.model.get('task') + "</div><div class='btn btn-primary delete'>delete</div>");
            this.$el.append($div);
            return this;
        },
        deleteTask: function () {
            this.model.destroy();
            this.remove();
        }
    });
})();