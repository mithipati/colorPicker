/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var Slider = require('famous/widgets/Slider');

    /*
     * @name PanelView
     * @constructor
     * @description
     */

    function PanelView() {
        View.apply(this, arguments);

        this.rootModifier = new StateModifier({
            size: this.options.size,
            origin: [1, 1],
            properties: {
                zIndex: 2
            }
        });

        this.mainNode = this.add(this.rootModifier);

        // _createBackground.call(this);
        _createPanel.call(this);
        _createSliders.call(this);
    }

    PanelView.prototype = Object.create(View.prototype);
    PanelView.prototype.constructor = PanelView;

    PanelView.DEFAULT_OPTIONS = {
        size: [undefined, 200],
        sliderOpts: {
            range: [0,255],
            indicatorSize: [700, 30],
            labelSize: [700, 30],
            label: 'Click and Drag to change'
        }
    };

    // function _createBackground() {
    //     var background = new Surface({
    //         properties: {
    //             backgroundColor: 'gray'
    //         }
    //     });

    //     this.mainNode.add(background);
    // }

    function _createPanel() {
        this.panel = new Surface({
            // size: [800, 200],
            properties: {
                backgroundColor: 'gray'
                // borderRadius: '2rem'
            }
        });

        var panelModifier = new StateModifier({
            origin: [0.5, 0.5]
        });

        this.mainNode.add(panelModifier).add(this.panel);
    }

    function _createSliders() {
        var redSlider = new Slider(this.options.sliderOpts);
        var greenSlider = new Slider(this.options.sliderOpts);
        var blueSlider = new Slider(this.options.sliderOpts);

        // redSlider.on('change', function () {
        //     var value = Math.floor(redSlider.get());
        //     this._eventOutput.emit('updateRed', {value: value});
        // }.bind(this));

        // greenSlider.on('change', function () {
        //     var value = Math.floor(greenSlider.get());
        //     this._eventOutput.emit('updateGreen', {value: value});
        // }.bind(this));

        // blueSlider.on('change', function () {
        //     var value = Math.floor(blueSlider.get());
        //     this._eventOutput.emit('updateBlue', {value: value});
        // }.bind(this));

        var redModifier = new StateModifier({
            origin: [0.25, 0.33]
        });

        var greenModifier = new StateModifier({
            origin: [0.25, 0.67]
        });

        var blueModifier = new StateModifier({
            origin: [0.25, 0.99]
        });

        var sliders = {
            red: [redModifier, redSlider],
            green: [greenModifier, greenSlider],
            blue: [blueModifier, blueSlider]
        };

        for (var slider in sliders) {
            var currentModifier = sliders[slider][0];
            var currentSlider = sliders[slider][1];

            this.mainNode.add(currentModifier).add(currentSlider);
        }
    }

    module.exports = PanelView;
});
