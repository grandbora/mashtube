define(['text!template/search.html','view/searchResult'],function(template, SearchResultView){
    
    return Backbone.Marionette.CompositeView.extend({
        className : 'oneLine',
        template: template,
        itemView: SearchResultView,
        itemViewContainer: ".result",
        
        events : {
            "click .cancel" : "closeSearch"
        },
        
        onItemAdded: function(searchResultView){
            searchResultView.options.dropElementPath = this.options.dropElementPath;
            
            var self = this;
            searchResultView.bindTo(searchResultView, "loadVideo", function(){
                self.trigger("loadVideo", searchResultView.model)
            });
        },
                
        initialize: function(){
            this.lastKeyword = '';
            this.interval = null;
        },
        
        openSearch: function(){
            this.showSearch();
            
            var self = this;
            this.interval = setInterval((function(self) {
                return function() {
                    self.checkKeyword();
                }
            } )(this), 500);
        },
        
        checkKeyword: function(){
            
            var newKeyword = this.getKeyword();
            if(this.lastKeyword !== newKeyword){
                this.lastKeyword = newKeyword;
                this.collection.fill(this.lastKeyword);
            }
        },
        
        closeSearch: function(){
            this.hideSearch();
            this.clearInterval();
        },
        
        getKeyword: function(){
            return this.$el.find('.searchBox input').val();
        },
        
        hideSearch : function(){
            this.$el.hide();
        },
        
        showSearch : function(){
            this.$el.show();
        },
        
        clearInterval : function(){
            if(null !== this.interval){
                clearInterval(this.interval);
                this.interval = null;
            }
        },
        
        onShow: function(){
            this.hideSearch();
        },
        
        onClose: function(){
            this.clearInterval();
        }
        
    });
});