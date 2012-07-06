DashApp = Ember.Application.create({
    rootElement: $('body'),

    /**
     * Data for email panel
     */
    mailData: PanelVO.create({
        title: 'INBOX (3)',
        subTitle: 'Email for Darin Kohles',
        actionLabel: 'NEW ENTRY',
        classNames: ['email']
    }),

    /**
     * Data for email panel
     */
    appsData:PanelVO.create({
        title: 'MY APPS',
        subTitle: 'Recently Used',
        actionLabel: 'NEW APP',
        classNames: ['apps']
    }),

    /**
     * Data for email panel
     */
    statsData: PanelVO.create({
        title: 'STATISTICS)',
        subTitle: 'Darin Kohles',
        classNames: ['stats']
    }),

    /**
     * Dom loaded begin building 'dynamic' content
     */
    ready: function(){
        this.addChildViews();
    },

    /**
     * Create and load child views
     */
    addChildViews:function(){
        DashApp.email = PanelView.create(DashApp.mailData);
        DashApp.email.appendTo($('#featurePanel'));

        DashApp.apps = PanelView.create(DashApp.appsData);
        DashApp.apps.appendTo($('#sidePanelTop'));

        DashApp.stats = PanelView.create(DashApp.statsData);
        DashApp.stats.appendTo($('#sidePanelBottom'));

        this.setUpDrag();

    },

    /**
     * use jQuery UI to provide drag and drop functionality
     */
    setUpDrag:function(){
        var that = this;
        $('#featurePanel').draggable({
            revert: true
        });
        $('#featurePanel').droppable({
            that: DashApp,
            drop: function( event, ui ){
                if(window.DashApp && event){
                    window.DashApp.switchPanels(event.target,ui.draggable[0]);
                }
            }
        });

        $('#sidePanelTop').draggable({
            revert: true
        });
        $('#sidePanelTop').droppable({
            drop: function( event, ui ){
                if(window.DashApp && event){
                    window.DashApp.switchPanels(event.target,ui.draggable[0]);
                }
            }
        });

        $('#sidePanelBottom').draggable({
            revert: true
        });
        $('#sidePanelBottom').droppable({drop: function( event, ui ){
            if(window.DashApp && event){
                window.DashApp.switchPanels(event.target,ui.draggable[0]);
            }
        }});
    },

    /**
     * swap the content from one panel to the dropped panel. current content
     * shifted to replace moved panel
     *
     * @param outgoing - original drop target contents
     * @param incoming - new panel contents
     */
    switchPanels: function( outgoing, incoming ){
        var targetPanel = outgoing.id;
        var sourcePanel = incoming.id;
        var oldViewName = outgoing.children[0].className.split(' ')[1];
        var newViewName = incoming.children[0].className.split(' ')[1];

        $('#'+targetPanel).hide("scale", {percent :0}, 500);
        $('#'+sourcePanel).hide("scale", {percent :0}, 500);
        // remove views from the dom
        var oldView = DashApp[oldViewName];
        oldView.remove();
        var newView = DashApp[newViewName];
        newView.remove();

        //swap content by applying view data to respective containers
        oldView.appendTo($('#'+sourcePanel));
        oldView.rerender();
        newView.appendTo($('#'+targetPanel));
        newView.rerender();

        $('#'+targetPanel).show("scale", {percent :100}, 500);
        $('#'+sourcePanel).show("scale", {percent :100}, 500);
    }
});