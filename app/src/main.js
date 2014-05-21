/* globals define */
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');

    var MainView = require('views/MainView');

    // create the main context
    var mainContext = Engine.createContext();

    // your app here
    var mainView = new MainView();

    mainContext.add(mainView);
});
