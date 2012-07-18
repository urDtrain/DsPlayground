define(['control/VariableContentContainerController'], function(){
    DashApp.VariableContentContainerView = Em.ContainerView.extend({
        controller: DashApp.VariableContentContainerController.create(),
        init: function(){
            console.log('vcv init');
        }
    });
});