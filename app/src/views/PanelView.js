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
            origin: [1, 1]
        });

        this.mainNode = this.add(this.rootModifier);

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

    function _createPanel() {
        this.panel = new Surface({
            properties: {
                backgroundColor: 'rgb(49,49,49)'
            }
        });

        var panelTitle = new Surface({
            size: [100, 100],
            content: 'Control\nPanel',
            properties: {
                color: 'white',
                fontSize: '3rem',
                fontWeight: 'bold',
                fontFamily: 'Open Sans, sans-serif',
                marginTop: '2rem',
                marginLeft: '3rem'
            }
        });

        var panelModifier = new StateModifier({
            origin: [0.5, 0.5]
        });

        this.mainNode.add(panelModifier).add(this.panel);
        this.mainNode.add(panelTitle);
    }

    function _createSliders() {
        this.redSlider = new Slider(this.options.sliderOpts);
        this.redSlider.setOptions({ fillColor: 'rgba(255,0,0,1)'});

        this.greenSlider = new Slider(this.options.sliderOpts);
        this.greenSlider.setOptions({ fillColor: 'rgba(0,255,0,1)'});

        this.blueSlider = new Slider(this.options.sliderOpts);
        this.blueSlider.setOptions({ fillColor: 'rgba(0,0,255,1)'});

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
