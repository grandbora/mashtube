define(['text!template/homeLayout.html'],function(homeLayoutTemplate){
    
    return Backbone.Marionette.Layout.extend({
        className : 'homeLayout',
        template: homeLayoutTemplate,
    
        regions: {
            stage: ".stageContainer",
            survey: ".surveyContainer"
        }
    });
});