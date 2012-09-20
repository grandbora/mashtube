define(['text!template/navigation.html'],function(navigationTemplate){
    
    return Backbone.Marionette.ItemView.extend({
        template: navigationTemplate,
        
        events: {
            "click #home": "navigateHome",
            "click #create": "navigateCreate"
        },
        
        navigateHome: function() {
            App.router.navigate("", {
                trigger: true
            });
        },
        navigateCreate: function() {
            App.router.navigate("create", {
                trigger: true
            });
        }

    });
});