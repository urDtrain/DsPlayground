DashApp.DashboardModel = Ember.Object.create({
    /**
     * Data for email panel
     */
    mailData:PanelModel.create({
        title:'INBOX (3)',
        subTitle:'Email for Darin Kohles',
        actionLabel:'NEW ENTRY',
        classNames:['email']
    }),

    /**
     * Data for email panel
     */
    appsData:PanelModel.create({
        title:'MY APPS',
        subTitle:'Recently Used',
        actionLabel:'NEW APP',
        classNames:['apps']
    }),

    /**
     * Data for email panel
     */
    statsData:PanelModel.create({
        title:'STATISTICS)',
        subTitle:'Darin Kohles',
        classNames:['stats']
    })

});