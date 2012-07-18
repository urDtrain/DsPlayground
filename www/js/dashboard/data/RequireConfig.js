if (!window.REQUIREJS) window.REQUIREJS = {};

REQUIREJS = {
    config:function () {
        require.config({
            baseUrl:'/lib',
            paths:{
                'core':'../js/core',
                'control':'../js/dashboard/control',
                'data':'../js/dashboard/data',
                'model':'../js/dashboard/model',
                'view':'../js/dashboard/view'
            },
            shim:{
                'ember':['jquery', 'handlebars'],
                'view/PanelView': ['view/VariableContentContainerView'],
                'view/VariableContentContainerView': ['control/VariableContentContainerController'],
                'model/DashboardModel': ['model/PanelModel']

            }
        });
    },

    lib:[
        'ember',
        'handlebars',
        'jquery',
        'jquery-ui-m',
        'underscore-min',
        'jsPlumb-jq'
    ],

    core:[
        'core/AjaxService',
        'core/EmberExtensions',
        'core/HandlebarsHelpers',
        'core/LocalStoreService',
        'core/TemplateLoader',
        'data/TemplateMap'
    ],

    'dashboard':[
        'control/PanelController',
        'control/VariableContentContainerController',

        'model/PanelModel',
        'model/DashboardModel',

        'view/PanelView',
        'view/VariableContentContainerView'
    ]
};