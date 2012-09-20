define(['model/video'],function(Video){
    
    return Backbone.Collection.extend({
        model: Video,
        loadBaseConfig : {
            url: 'https://gdata.youtube.com/feeds/api/videos?v=2&alt=json-in-script',
            dataType: "jsonp",
            data: {
                q : ''
            }
        },
        saveBaseConfig : {
            url: '/save',
            dataType: "json",
            type: "POST"
        },
        loadFromBackendBaseConfig : {
            dataType: "html",
            type: "GET"
        },
        
        fill : function(keyword){
            var self = this;
            this.loadBaseConfig.data.q = keyword;
            $.ajax(this.loadBaseConfig).done(function(data) {
                self.reset(data.feed.entry);
            });
        },
        
        persist : function(options){

            var ajaxConfig = _.extend({}, this.saveBaseConfig, {data : {data : JSON.stringify(this.toArray()), name : options.name}});
            $.ajax(ajaxConfig).done(function(data) {});
        },
        
        loadFromBackend : function(mashName,callback){

            var ajaxConfig = _.extend({}, this.loadFromBackendBaseConfig, {
                url: '/getmash/' + mashName
            });

            var self = this;
            $.ajax(ajaxConfig).done(function(videoList) {

                _.each(jQuery.parseJSON(videoList), function(video){
                     self.add(video);
                });
                callback();
            });
        }
    });
});