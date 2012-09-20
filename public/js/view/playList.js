define(['text!template/playList.html','view/searchResult'],function(template, SearchResultView){
    
    return Backbone.Marionette.CompositeView.extend({
        className : 'oneLine',
        template: template,
        itemView: SearchResultView,
        itemViewContainer: ".droppable",
        
        triggers: {
            "click #addButton": "openSearch"
        },
        
        onRender: function(){
            var self = this;
            this.$el.find(this.itemViewContainer).sortable({
                opacity: 0.85,
                placeholder: 'playlistPlaceHolder horizontal ui-state-highlight',
                receive: function(event, ui){
                    self.addVideo.apply(self, arguments);
                }
            });
        },

        getDropElementPath : function(){
             return '.' + this.className + " " + this.itemViewContainer;
        },

        setSearchList : function(searchList){
             this.searchList = searchList;
        },

        addVideo : function(event, ui){
            this.collection.reset([], {silent : true});

            var id = ui.item.data('id');
            var newItem = this.$el.find(this.itemViewContainer).children(':not(.added)');
            newItem.data('id', id);

            var self = this;
            this.$el.find(this.itemViewContainer).children().each(
                function(){

                    if($(this).hasClass('added')){
                        var item = $(this).data('item');
                        self.collection.add(item, {silent : true});
                        return true;   
                    }

                    $(this).addClass('added');
                    var id = $(this).data('id');
                    var item = self.searchList.get(id);
                    $(this).data('item', item);
                    self.collection.add(item, {silent : true});

                    $(this).on("click",function(event){
                        self.trigger("loadVideo", item)
                    });
                }
            );
        }
    });
});