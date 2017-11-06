/**
 * Created by gbmcarlos on 11/6/17.
 */
(function(jQuery, window){

    var GridManager = {

        $: jQuery,

        config: {
            grid: {
                width: '600',
                height: '600',
                containerSelector: '#grid-container',
                id: 'grid'
            }
        },

        init: function() {

            this.canvasElement = this.createCanvas(this.config.grid);



        },

        createCanvas: function(gridConfig) {

            var canvas = document.createElement('canvas');
            canvas.id = gridConfig.id;
            canvas.width = gridConfig.width;
            canvas.height = gridConfig.height;
            canvas.style.border = '1px solid';

            var container = this.$(gridConfig.containerSelector);
            container.empty();
            container.append(canvas);


        }

    };

    window.GridManager = GridManager;

    window.GridManager.init();

})(jQuery, window);