define(function(){
        
    var Router = Backbone.Marionette.AppRouter.extend({
        appRoutes: {
            "create": "create",
            "*mashName": "index"
        }
    });
    
    return Router;
});