define(['control/VariableContentContainerController'], function(){
    DashApp.VariableContentContainerView = Em.ContainerView.extend({
        viewClass: 'VariableContentContainerView',
        controller: DashApp.VariableContentContainerController.create(),
        didInsertElement: function(){
            this.controller.whoAmI(this);
        }
    });
});