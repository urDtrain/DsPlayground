TemplateLoader = {
    load: function(aTemp, c){
        var loadStep = 0, loadCount = aTemp.length;
        for( var i = 0 ; i < loadCount ; i++){
            var tmpl = aTemp[i];
            $.get(tmpl.url, null, function(t){
                Em.TEMPLATES[aTemp[loadStep].name] = Em.Handlebars.compile(t);
                if(++loadStep == loadCount){
                    if(Em.typeOf(c) === 'function'){
                        c();
                    }
                    return;
                }
            });
        }
    }
};
