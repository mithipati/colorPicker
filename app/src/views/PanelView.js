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
        this.redSlider = new Slider(this.options.sliderOpts);
        this.greenSlider = new Slider(this.options.sliderOpts);
        this.blueSlider = new Slider(this.options.sliderOpts);

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
            red: [redModifier, this.redSlider],
            green: [greenModifier, this.greenSlider],
            blue: [blueModifier, this.blueSlider]
        };

        for (var slider in sliders)
        {
            var currentModifier = sliders[slider][0];
            var currentSlider = sliders[slider][1];

            _emitColorChange.call(this, currentSlider);

            this.mainNode.add(currentModifier).add(currentSlider);
        }
    }

    function _emitColorChange (slider) {
        slider.on('change', function () {
            var redValue = Math.floor(this.redSlider.get());
            var greenValue = Math.floor(this.greenSlider.get());
            var blueValue = Math.floor(this.blueSlider.get());

            this._eventOutput.emit('colorChange', {
                redValue: redValue,
                greenValue: greenValue,
                blueValue: blueValue
            });
        }.bind(this));
    }


    module.exports = PanelView;
});
