TestApp = Ember.Application.create({
    data : [
    PanelVO.create({
        title: 'INBOX (3)',
        subTitle: 'Email for Darin Kohles',
        actionLabel: 'NEW ENTRY',
        classNames: ['email']
    }),
    PanelVO.create({
        title: 'MY APPS',
        subTitle: 'Recently Used',
        actionLabel: 'NEW APP',
        classNames: ['apps']
    })],

    /**
     * Data for email panel
     */
    statsData: PanelVO.create({
        title: 'STATISTICS)',
        subTitle: 'Darin Kohles',
        classNames: ['stats']
    }),

    ac: Ember.ArrayController.create(),

    ready: function(){
        TestApp.ac.set('content', TestApp.data);

        TestApp.mainView = TestApp.MainView.create();
        TestApp.mainView.appendTo($('body'));
    }
})