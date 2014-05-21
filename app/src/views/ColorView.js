/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var PanelView = require('views/PanelView');

    /*
     * @name ColorView
     * @constructor
     * @description
     */

    function ColorView() {
        View.apply(this, arguments);

        this.rootModifier = new StateModifier({
            size: this.options.size
        });

        this.mainNode = this.add(this.rootModifier);

        this.red = 0;
        this.green = 0;
        this.blue = 0;

        _addPanelView.call(this);
        _createColorDisplay.call(this);
    }

    ColorView.prototype = Object.create(View.prototype);
    ColorView.prototype.constructor = ColorView;

    ColorView.DEFAULT_OPTIONS = {
        size: [undefined, 500]
    };

    function _addPanelView() {
        var panelView = new PanelView();

        this.add(panelView);

        this.subscribe(panelView);
    }

    function _createColorDisplay() {
        var colorDisplay = new Surface({
            properties: {
                backgroundColor: 'rgb('+this.red+','+this.green+','+this.blue+')'
            }
        });

        this.mainNode.add(colorDisplay);

        this._eventInput.on('colorChange', function (data) {
            var rgb, hexColor, hsbColor;

            this.red   = data.redValue;
            this.green = data.greenValue;
            this.blue  = data.blueValue;
            rgb = 'rgb(' + this.red + ',' + this.green + ',' + this.blue + ')';

            colorDisplay.setProperties({
                backgroundColor: rgb
            });

            hexColor = _rgbToHex.call(null, this.red, this.green, this.blue);
            hsbColor = _rgbToHSB.call(null, this.red, this.green, this.blue);

            this._eventOutput.emit('updateOutput', {
                rgb: rgb,
                hex: hexColor,
                hsb: hsbColor
            });
        }.bind(this));
    }

    function _rgbToHex(r, g, b) {
        return '#' + _colorToHex(r) + _colorToHex(g) + _colorToHex(b);
    }

    function _colorToHex(color) {
        var hex = color.toString(16).toUpperCase();
        return hex.length == 1 ? "0" + hex : hex;
    }

    function _rgbToHSB(r, g, b) {
        r /= 255, g /= 255, b /= 255;

        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var hue, saturation;
        var brightness = max;
        var chroma = max - min;

        if (max === 0) {
            saturation = 0;
        } else {
            saturation = chroma / max;
        }

        if (max === min) {
            hue = 0;
        } else {
            switch (max) {
                case r: hue = (g - b)/chroma + (g < b ? 6 : 0); break;
                case g: hue = (b - r)/chroma + 2; break;
                case b: hue = (r - g)/chroma + 4; break;
            }
            hue /= 6;
        }

        hue = hue.toFixed(6);
        saturation = saturation.toFixed(6);
        brightness = brightness.toFixed(6);

        return [hue, saturation, brightness];
    }

    module.exports = ColorView;
});
