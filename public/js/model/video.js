define(function(){
    
    return Backbone.Model.extend({
        
        initialize : function(entry){
            this.id = entry.id.$t;
            this.yId = entry.media$group.yt$videoid.$t;
        }
    });
});