define(['router', 'controller/index', 'view/navigation'],function(Router, IndexController, Navigation){
    
    App = new Backbone.Marionette.Application();
    
    App.addRegions({
        navigation: ".navigationContainer",
        content: ".contentContainer"
    });
    
    App.addInitializer(function(){
        App.navigation.show (new Navigation());
    });
    
    App.addInitializer(function(){
        
        App.router = new Router({
            controller: IndexController
        });
        
        Backbone.history.start({
            pushState: true
        })
    });

    var youtubePlayerData = {};

    var youtubePlayerMethods = {
        remove: function() {
            $('script#youtubeLoader').remove();
            window['YT'] = undefined;
        },

        add: function() {
            var tag = $('<script/>').attr('src','//www.youtube.com/iframe_api').attr('id', 'youtubeLoader');
            tag.insertBefore($('script:first'));
        },

        init: function(options) { 
            
            // options.events = {
            //     'onReady': youtubePlayerMethods.onPlayerReady,
            //     'onStateChange': youtubePlayerMethods.onPlayerStateChange
            // };
            youtubePlayerData.options = options;
            youtubePlayerData.mash = options.mash;
            youtubePlayerMethods.remove();
            youtubePlayerMethods.add();
        },

        create: function() {
            youtubePlayerData.player = new YT.Player(youtubePlayerData.options.id, youtubePlayerData.options);
        },

        getPlayer : function() { 
            return youtubePlayerData.player;
        },

        getMash : function() { 
            return youtubePlayerData.mash;
        },

        playMash : function() {

            youtubePlayerData.index = 0;
            youtubePlayerData.totalDuration = 0;
            _.each(youtubePlayerData.mash.models, function(video){
                youtubePlayerData.totalDuration += video.attributes.range[1] - video.attributes.range[0];
            });

            var video = youtubePlayerData.mash.models[youtubePlayerData.index];

            youtubePlayerData.interval = setInterval(youtubePlayerMethods.checkPlayerStatus, 250);
            youtubePlayerData.player.loadVideoById(video.yId, video.attributes.range[0]);
        },

        onPlayerReady : function(event){
            console.log(event.data);
        },
        
        onPlayerStateChange : function(event){
            console.log(event.data);
        },
        
        checkPlayerStatus : function(){

            if (undefined == youtubePlayerData.mash.models[youtubePlayerData.index]){
                App.trigger("completed");
                clearInterval(youtubePlayerData.interval);
                return;
            };
            var max = youtubePlayerData.mash.models[youtubePlayerData.index].attributes.range[1];
            var min = youtubePlayerData.mash.models[youtubePlayerData.index].attributes.range[0];
            var currentTime = youtubePlayerData.player.getCurrentTime();

            var progress = 0;
            for (var i = 0; i < youtubePlayerData.index; i++) {
                progress += youtubePlayerData.mash.models[i].attributes.range[1] - youtubePlayerData.mash.models[i].attributes.range[0];
            }
            progress += currentTime - min;
            progressPercentage = progress / youtubePlayerData.totalDuration * 100;
            youtubePlayerData.options.events.onStatusChange(progressPercentage);

            if(currentTime > max){
                
                youtubePlayerData.index++;
                if(youtubePlayerData.mash.models[youtubePlayerData.index]){

                    var video = youtubePlayerData.mash.models[youtubePlayerData.index];
                    youtubePlayerData.player.loadVideoById(video.yId, video.attributes.range[0]);

                }else{
                    youtubePlayerData.player.stopVideo();
                    App.trigger("completed");
                    clearInterval(youtubePlayerData.interval);
                }
            }
        }

    };
    
    App.youtubePlayer = function(method) {
        if ( youtubePlayerMethods[method] ) {
            return youtubePlayerMethods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || !method ) {
            return youtubePlayerMethods.init.apply( this, arguments );
        }    
    };

    return App;
});