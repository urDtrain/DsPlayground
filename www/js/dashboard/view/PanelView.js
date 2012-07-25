define(function(){
    PanelView = Ember.View.extend({
        templateName: 'panel',
        controller: DashApp.PanelController.create({})
    });
});