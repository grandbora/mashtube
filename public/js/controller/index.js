define(['view/createLayout','view/homeLayout','view/stage','view/survey','view/search','view/playList','model/videoList'],function(CreateLayout,HomeLayout,StageView,SurveyView,SearchView,PlayListView,VideoList){
    
    return {
        
        index : function(mashName){

            App.content.close();

            if (false == mashName) {
                mashName = globalConfig.defaultMash;
            };

            $(document).attr('title', $(document).attr('title') +' - '+ mashName);

            var showCollection = new VideoList();

            var stageViewConfiguration = {
                mash : showCollection,
                isEditor : false,
                height: '500',
                width: '800',
                playerVars: {
                    controls : 0,
                    iv_load_policy: 3
                },
                events: {
                    'onReady': function () {
                        showCollection.loadFromBackend(mashName, function(){
                            stageView.playMash();
                        });
                    },
                    'onStatusChange':  function (currentTime) {
                        stageView.onStatusChange(currentTime);
                    }
                }
            };

            var stageView = new StageView(stageViewConfiguration);

            var homeLayout = new HomeLayout();
            App.content.show(homeLayout);
            homeLayout.stage.show(stageView);
            homeLayout.survey.show(new SurveyView());

            App.bindTo(App, "completed", function () {
                homeLayout.stage.close()
            });
            App.bindTo(App, "replay", function () {
                
                homeLayout = new HomeLayout();
                stageView = new StageView(stageViewConfiguration)
                
                App.content.close();
                App.content.show(homeLayout);
                homeLayout.stage.show(stageView);
                homeLayout.survey.show(new SurveyView());               
            });

        },
        
        create : function(){
            
            App.content.close();

            var playListView = new PlayListView({
                collection : new VideoList(),
            });

            var searchView = new SearchView({
                dropElementPath : playListView.getDropElementPath(),
                collection : new VideoList()
            });
            
            
            var stageView = new StageView({
                mash : playListView.collection
            });

            playListView.setSearchList(searchView.collection);

            App.bindTo(playListView, "openSearch", searchView.openSearch, searchView);
            App.bindTo(searchView, "loadVideo", stageView.loadVideo, stageView);
            App.bindTo(playListView, "loadVideo", stageView.loadVideo, stageView);
            
            var createLayout = new CreateLayout();
            App.content.show(createLayout);
            createLayout.stage.show(stageView);
            createLayout.search.show(searchView);
            createLayout.playList.show(playListView);
        }
        
    };

});