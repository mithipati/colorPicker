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

        _addColorView.call(this);

        _rgbSurface.call(this);
        _hexSurface.call(this);
        _hsbSurface.call(this);

        _createLogo.call(this);

        _setColorOutput.call(this);
    }

    MainView.prototype = Object.create(View.prototype);
    MainView.prototype.constructor = MainView;

    MainView.DEFAULT_OPTIONS = {
        surfaceOpts: {
            size: [250, 100],
            properties: {
                color: 'white',
                fontFamily: 'Open Sans, sans-serif',
                fontWeight: 'bold',
                fontSize: '2rem',
                marginTop: '1rem',
                paddingLeft: '2rem'
            },
            content: 'ready'
        }
    };

    function _addColorView() {
        var colorView = new ColorView();

        this.add(colorView);

        this.subscribe(colorView);
    }

    function _createLogo() {
        var logo = new ImageSurface({
            size: [100, 100],
            content: '/content/images/famous_logo.png',
            properties: {
                zIndex: 1,
                marginTop: '1rem',
                marginLeft: '-1rem',
            }
        });

        var logoModifier = new StateModifier({
            origin: [1, 0]
        });

        this.add(logoModifier).add(logo);
    }

    function _rgbSurface() {
        this.rgbSurface = new Surface(this.options.surfaceOpts);

        this.add(this.rgbSurface);
    }

    function _hexSurface() {
        this.hexSurface = new Surface(this.options.surfaceOpts);

        var hexModifier = new StateModifier({
            origin: [0, 0.18]
        });

        this.add(hexModifier).add(this.hexSurface);
    }

    function _hsbSurface() {
        this.hsbSurface = new Surface(this.options.surfaceOpts);

        var hsbModifier = new StateModifier({
            origin: [0, 0.36]
        })

        this.add(hsbModifier).add(this.hsbSurface);
    }

    function _setColorOutput() {
        this._eventInput.on('updateOutput', function (data) {
            this.rgbSurface.setContent(data.rgb);
            this.hexSurface.setContent('Hex: ' + data.hex);
            this.hsbSurface.setContent('(H, S, B)\n'+ '(' + data.hsb + ')');
        }.bind(this));
    }

    module.exports = MainView;
});
