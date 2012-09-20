define(['text!template/survey.html'],function(template){
    
    return Backbone.Marionette.ItemView.extend({
        className : 'survey',
        template: template,
        
        triggers: {
        },

        events : {
            "click .answer.yes" : "saveAnswerYes",
            "click .answer.no" : "saveAnswerNo",
            "click #submit" : "saveSubmit",
            "click #replay" : "replay"
        },

        onRender: function(){
            this.$el.find('#step1').show();
            this.$el.find('#step2').hide();
            this.$el.find('#step3').hide();
            this.$el.find('#step2 input').watermark(this.$el.find('#step2 input').attr('placeholder'),{color: '#330'});
            this.$el.find('#step2 textarea').watermark(this.$el.find('#step2 textarea').attr('placeholder'), {color: '#330'});
        },

        saveAnswerYes: function(){

            var self = this;
            $.ajax({
                url: '/vote/yes',
                dataType: 'json',
                type: "POST"
            }).done(function(data) {
                 self.$el.find('#step1').hide();
                 self.$el.find('#step2').show();
                 self.$el.find('#step3').hide();
            });
        },
        saveAnswerNo: function(){

            var self = this;
            $.ajax({
                url: '/vote/no',
                dataType: 'json',
                type: "POST"
            }).done(function(data) {
                 self.$el.find('#step1').hide();
                 self.$el.find('#step2').show();
                 self.$el.find('#step3').hide();
            });
        },

        saveSubmit: function(){

            var self = this;
            if (false == this.$el.find('#step2 input').val() && false == this.$el.find('#step2 textarea').val()) {                 
                self.$el.find('#step1').hide();
                self.$el.find('#step2').hide();
                self.$el.find('#step3').show();
                return;
            };

            $.ajax({
                url: '/submit',
                dataType: 'json',
                type: "POST",
                data: {
                    email: this.$el.find('#step2 input').val(),
                    comment: this.$el.find('#step2 textarea').val()
                }
            }).done(function(data) {
                 self.$el.find('#step1').hide();
                 self.$el.find('#step2').hide();
                 self.$el.find('#step3').show();
            });
        },

        replay: function(){
            App.trigger("replay");
        },
    });
});