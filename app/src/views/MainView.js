/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ImageSurface = require('famous/surfaces/ImageSurface');

    var ColorView = require('views/ColorView');

    /*
     * @name MainView
     * @constructor
     * @description
     */

    function MainView() {
        View.apply(this, arguments);

        var logo = new ImageSurface({
            size: [100, 100],
            content: '/content/images/famous_logo.png',
            classes: ['backfaceVisibility'],
            properties: {
                zIndex: 1,
                color: 'blue'
            }
        });

        var logoModifier = new StateModifier({
            origin: [1, 0]
        });

        var colorView = new ColorView();

        this.add(colorView);

        var surface = new Surface({
            size: [300, 300],
            properties: {
                backgroundColor: 'red'
            },
            content: 'Hello'
        });

        this.add(surface);

        this.subscribe(colorView);

        this._eventInput.on('redChanged', function (data) {
            surface.setContent('Red:' + data.color);
        });
    }

    MainView.prototype = Object.create(View.prototype);
    MainView.prototype.constructor = MainView;

    MainView.DEFAULT_OPTIONS = {
    };

    module.exports = MainView;
});
