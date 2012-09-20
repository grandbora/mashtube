function onYouTubeIframeAPIReady() {
    App.youtubePlayer('create');
}

require.config({
    baseUrl: '/js/',
    waitSeconds: 100,
    urlArgs: globalConfig.isDev ? 'bust=' +  (new Date()).getTime() : undefined,
    paths: {
        domReady: 'vendor/require-domReady',
        text: 'vendor/require-text',
        underscore: 'vendor/underscore',
        backbone: 'vendor/backbone',
        marionette: 'vendor/backbone.marionette',
        marionetteFix: 'vendor/backbone.marionette.requirejs.fix',
        json2: 'vendor/json2',
        jquery: '//ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min',
        jqueryUI: '//ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min',
        jqueryWatermark: 'vendor/jQuery.watermark'
    },
    shim: {
        'jqueryUI': {
            deps: ['jquery']
        },
        'jqueryWatermark': {
            deps: ['jquery']
        },
        'underscore': {
            deps: ['jquery']
        },
        'backbone': {
            deps: ['underscore']
        },
        'marionette': {
            deps: ['backbone']
        },
        'marionetteFix': {
            deps: ['marionette']
        },
        'app': {
            deps: ['marionetteFix']
        }
    }
});
        
require(['domReady', 'app', 'json2','jqueryUI','jqueryWatermark'], function(domReady, app){
    'use strict';
    
    return domReady(function() {
        App = app;
        App.start();
    });
});