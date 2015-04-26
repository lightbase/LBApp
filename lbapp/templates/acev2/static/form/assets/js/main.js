require.config({
  baseUrl: "/templates/acev2/static/form/assets/js/deps/"
	  //TODO remover o urlArgs ... apenas para o desenvolvimento (cache)
  , urlArgs: "bust=" + (new Date()).getTime()
  , shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'underscore': {
      exports: '_'
    },
    'bootstrap': {
      deps: ['jquery'],
      exports: '$.fn.popover'
    }
  }
  , paths: {
    app           : ".."
    , collections : "../collections"
    , data        : "../data"
    , models      : "../models"
    , helper      : "../helper"
    , templates   : "../templates"
    , views       : "../views"
  }
});
require([ 'app/app'], function(app){
  app.initialize();
});
