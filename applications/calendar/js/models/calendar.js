(function () {
    App.Calendar.Models.Calendar = App.Calendar.Model.extend({
        defaults: {
            tasks: null,
            currentDate: null,
            selectedMonth: 6,
            selectedYear:2014,
            selectedLang:'en'
        },
        initialize: function () {
        },
        getCurrentMonthId:function(){
            return this.get('selectedMonth');
        },
        getMonthText:function(monthId){
            var loc = App.Calendar.Models.Calendar.loc,
                lang = this.get('selectedLang'),
                strMonth = loc[lang].months[monthId];
            return strMonth;
        },
        setSelectedMonth: function (monthId) {
            var monthRange = App.Calendar.Models.Calendar.MONTH_RANGE,
                selectedYear = this.get('selectedYear');
            if (monthId > monthRange.max) {
                selectedYear += 1;
                monthId = monthRange.min;
            }
            else if (monthId < monthRange.min) {
                selectedYear -= 1;
                monthId = monthRange.max;
            }
            this.set('selectedMonth', monthId);
            this.set('selectedYear', selectedYear);
        },
        getSelectedYear: function () {
            return this.get('selectedYear');
        }
    }, {
        loc:{
            en:{
                days:['Monday','Tue','Wed','Th','Fri','Sat','Sun'],
                months:['January','February','March','April','May','June','July','August','September','October','Nov','Dec']
            }
        },
        MONTH_RANGE: {
            min: 0,
            max:11
        }
    


    })
})();