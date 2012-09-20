define(['text!template/searchResult.html'],function(template){
    
    return Backbone.Marionette.ItemView.extend({
        className: 'resultView horizontal',
        template: template,
        
        triggers: {
            "click": "loadVideo"
        },
        
        onRender: function(){
            this.$el.data('id', this.model.id);
            this.$el.draggable({
                connectToSortable : this.options.dropElementPath,
                revert : 'invalid',
                helper: 'clone',
                iframeFix: true,
                opacity: 0.85
            });
        }
    });
});