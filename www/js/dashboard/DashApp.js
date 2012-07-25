REQUIREJS.config();

require(REQUIREJS.lib, function () {
    require(REQUIREJS.core, function () {
        DashApp = {}; // namespace for views modules and data
        TemplateLoader.load(TemplateMap.panel, function(){
            require(REQUIREJS.dashboard, function () {
                App = Ember.Application.create({
                    rootElement:'body',

                    /**
                     * Dom loaded begin building 'dynamic' content
                     */
                    ready:function () {
                       this.addChildViews();
                    },

                    /**
                     * Create and load child views
                     */
                    addChildViews:function () {
                        DashApp.email = PanelView.create(DashApp.DashboardModel.mailData);
                        DashApp.email.appendTo($('#featurePanel'));

                        DashApp.apps = PanelView.create(DashApp.DashboardModel.appsData);
                        DashApp.apps.appendTo($('#sidePanelTop'));

                        DashApp.stats = PanelView.create(DashApp.DashboardModel.statsData);
                        DashApp.stats.appendTo($('#sidePanelBottom'));

                        this.setUX();

                    },

                    /**
                     * use jQuery UI to provide drag and drop functionality
                     */
                    setUX:function () {
                        this.applyUX($('#featurePanel'));
                        this.applyUX($('#sidePanelTop'));
                        this.applyUX($('#sidePanelBottom'));
                    },

                    applyUX: function(item){
                        item.draggable({
                            revert:true,
                            handle: '.panelHeader',
                            cancel: '.panelActions'
                        });
                        item.droppable({
                            drop:function (event, ui) {
                                if (window.App && event) {
                                    window.App.switchPanels(event.target, ui.draggable[0]);
                                }
                            },
                            over: function(event, ui) {
                                $('#'+$(ui.draggable[0])[0].id+' .panelHeader').css('cursor', 'cell');
                            },
                            out: function(event, ui) {
                                $('#'+$(ui.draggable[0])[0].id+' .panelHeader').css('cursor', 'pointer');
                            }
                        });
                        item.resizable();
                    },

                    /**
                     * swap the content from one panel to the dropped panel. current content
                     * shifted to replace moved panel
                     *
                     * @param outgoing - original drop target contents
                     * @param incoming - new panel contents
                     */
                    switchPanels: function (outgoing, incoming) {
                        var targetPanel = outgoing.id;
                        var sourcePanel = incoming.id;
                        var oldViewName = outgoing.lastChild.className.split(' ')[1];
                        var newViewName = incoming.lastChild.className.split(' ')[1];

//                        $('#' + targetPanel).hide("scale", {percent:0}, 500);
//                        $('#' + sourcePanel).hide("scale", {percent:0}, 500);
                        $('#' + sourcePanel).hide();
                        // remove views from the dom
                        var oldView = DashApp[oldViewName];
                        oldView.remove();
                        var newView = DashApp[newViewName];
                        newView.remove();
                        $('#' + sourcePanel).hide();

                        //swap content by applying view data to respective containers
                        newView.appendTo($('#' + targetPanel));
                        newView.rerender();
                        oldView.appendTo($('#' + sourcePanel));
                        oldView.rerender();

                        $('#' + targetPanel).show("scale", {percent:100}, 500);
                        $('#' + sourcePanel).show("scale", {percent:100}, 500);
                    }
                });
            });
        });
    });
});
