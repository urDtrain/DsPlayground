TestApp.MainView = Ember.View.extend({
    templateName: 'main',
    click: function(){
        TestApp.data.pushObject(TestApp.statsData);
    }
})