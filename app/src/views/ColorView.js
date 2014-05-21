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

        var panelView = new PanelView();

        this.add(panelView);

        this.subscribe(panelView);

        var colorDisplay = new Surface({
            properties: {
                backgroundColor: 'rgb('+this.red+','+this.green+','+this.blue+')'
            }
        });

        this.mainNode.add(colorDisplay);

        // this._eventInput.on('updateRed updateGreen updateBlue', function (data){
        //     this._eventOutput.emit('colorChange', {

        //     });
        // });

        this._eventInput.on('updateRed', function (data){
            this.red = data.value;
            colorDisplay.setProperties({
                backgroundColor: 'rgb('+this.red+','+this.green+','+this.blue+')'
            });
            this._eventOutput.emit('redChanged', { color: this.red });
        }.bind(this));

        this._eventInput.on('updateGreen', function (data){
            this.green = data.value;
            colorDisplay.setProperties({
                backgroundColor: 'rgb('+this.red+','+this.green+','+this.blue+')'
            });
        }.bind(this));

        this._eventInput.on('updateBlue', function (data){
            this.blue = data.value;
            colorDisplay.setProperties({
                backgroundColor: 'rgb('+this.red+','+this.green+','+this.blue+')'
            });
        }.bind(this));
    }

    ColorView.prototype = Object.create(View.prototype);
    ColorView.prototype.constructor = ColorView;

    ColorView.DEFAULT_OPTIONS = {
        size: [undefined, 500]
    };

    module.exports = ColorView;
});
