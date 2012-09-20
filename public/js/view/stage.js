define(['text!template/stage.html'],function(template){
    
    return Backbone.Marionette.ItemView.extend({
        
        template: template,
        
        events : {
            "click #play" : "playMash",
            "click #pasue" : "pauseMash",
            "click #save" : "saveMash"
        },

        initialize: function(){
            this.initializePlayer();
        },

        onRender: function(){
            if (false == this.options.isEditor) {
                this.$el.find("#editorElements").hide()
                this.$el.find("#showElements").show().find('#progressbar').css('width', this.options.width).progressbar();
            };
        },
        
        initializePlayer : function(){

        this.options =  _.extend({}, {
            id :'playerStage',
            height: '400',
            width: '400',
            playerVars: {
                controls : 1
            }
        }, this.options);

        App.youtubePlayer(this.options);

        },
        
        loadVideo : function(video){
            var videoId = video.yId;
            var max = video.attributes.media$group.yt$duration.seconds;

            var self = this;
            this.$el.find('#cropper').slider('destroy');
            this.$el.find('#cropper').slider({
                range: true,
                min: 0,
                max: max,
                values: [ 0, max ],
                slide: function(event, ui) {
                    self.changeRange.call(self, event, ui, video);
                }
            });

            this.$el.find('#rangeInfoBar #start').html('0');
            this.$el.find('#rangeInfoBar #end').html(max);

            App.youtubePlayer('getPlayer').loadVideoById(videoId);
        },

        changeRange : function(event, ui, video){
            video.attributes.range = ui.values;
            this.$el.find('#rangeInfoBar #start').html(ui.values[0]);
            this.$el.find('#rangeInfoBar #end').html(ui.values[1]);
        },

        playMash : function(){
            this.$el.find('#cropper').slider('destroy');
            App.youtubePlayer('playMash');
        },

        pauseMash : function(){
            this.options.playList;
        },

        saveMash : function(){
            var name = this.$el.find('#name input').val();
            App.youtubePlayer('getMash').persist({name: name});
        },

        loadMash : function(){

            var self = this;
            this.options.mash.loadFromBackend(function(){
                self.playMash();
            });
        },

        onStatusChange : function(progressPercentage){
            this.$el.find("#showElements #progressbar").progressbar('option', 'value', progressPercentage);
        }
    });
});