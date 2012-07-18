REQUIREJS.config();

require(REQUIREJS.lib, function () {
    require(REQUIREJS.core, function () {
        DashApp = {};
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

                        this.setUpDrag();

                    },

                    /**
                     * use jQuery UI to provide drag and drop functionality
                     */
                    setUpDrag:function () {
                        var that = this;
                        $('#featurePanel').draggable({
                            revert:true,
                            helper: 'clone',
                            handle: '.panelHeader',
                            cancel: '.panelActions'
                        });
                        $('#featurePanel').droppable({
                            drop:function (event, ui) {
                                if (window.App && event) {
                                    window.App.switchPanels(event.target, ui.draggable[0]);
                                }
                            }
                        });
                        $('#featurePanel').resizable();

                        $('#sidePanelTop').draggable({
                            revert:true,
                            helper: 'clone',
                            handle: '.panelHeader',
                            cancel: '.panelActions'
                        });
                        $('#sidePanelTop').droppable({
                            drop:function (event, ui) {
                                if (window.App && event) {
                                    window.App.switchPanels(event.target, ui.draggable[0]);
                                }
                            }
                        });
                        $('#sidePanelTop').resizable();

                        $('#sidePanelBottom').draggable({
                            revert:true,
                            helper: 'clone',
                            handle: '.panelHeader',
                            cancel: '.panelActions'
                        });
                        $('#sidePanelBottom').droppable({drop:function (event, ui) {
                            if (window.App && event) {
                                window.App.switchPanels(event.target, ui.draggable[0]);
                            }
                        }});
                        $('#sidePanelBottom').resizable();
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
                        var oldViewName = outgoing.children[0].className.split(' ')[1];
                        var newViewName = incoming.children[0].className.split(' ')[1];

                        $('#' + targetPanel).hide("scale", {percent:0}, 500);
                        $('#' + sourcePanel).hide("scale", {percent:0}, 500);
                        // remove views from the dom
                        var oldView = DashApp[oldViewName];
                        oldView.remove();
                        var newView = DashApp[newViewName];
                        newView.remove();

                        //swap content by applying view data to respective containers
                        oldView.appendTo($('#' + sourcePanel));
                        oldView.rerender();
                        newView.appendTo($('#' + targetPanel));
                        newView.rerender();

                        $('#' + targetPanel).show("scale", {percent:100}, 500);
                        $('#' + sourcePanel).show("scale", {percent:100}, 500);
                    }
                });
            });
        });
    });
});
