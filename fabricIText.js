fabric.util.object.extend(fabric.IText.prototype, {
    /**
     * Initializes "selected" event handler
     *
     * removed delayed selection init
     */
    initSelectedHandler: function() {
        this.on('selected', function() {

            var _this = this;
            setTimeout(function() {
                _this.selected = true;
            }, 500);

            if (this.canvas && !this.canvas._hasITextHandlers) {
                this._initCanvasHandlers();
                this.canvas._hasITextHandlers = true;
            }
        });
    },

    /**
     * Initializes "mouseup" event handler
     */
    initMouseupHandler: function() {
        this.on('mouseup', function(options) {
            this.__isMousedown = false;
            if (this._isObjectMoved(options.e)) return;

            if (this.selected) {
                this.enterEditing();
                this.initDelayedCursor(true);
            }
            var _this = this;
            setTimeout(function() {
                _this.selected = true;
            }, 500);
        });
    }
});