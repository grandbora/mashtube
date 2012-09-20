define(['text!template/createLayout.html'],function(createLayoutTemplate){
    
    return Backbone.Marionette.Layout.extend({
        className : 'createLayout',
        template: createLayoutTemplate,
    
        regions: {
            stage: ".stageContainer",
            search: ".searchContainer",
            playList: ".playListContainer"
        }
    });
});