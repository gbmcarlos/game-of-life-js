/**
 * Created by gbmcarlos on 11/6/17.
 */
/**
 * Created by gbmcarlos on 11/6/17.
 */
(function(jQuery, window){

    var GridManagerCanvas = {

        $: jQuery,

        config: {
            containerSelector: '#grid-container'
        },

        init: function(width, height) {
            this.config.width = width;
            this.config.height = height;
            this.canvas = this.setupCanvas(this.config);
        },

        resetGrid: function() {
            this.canvas = this.setupCanvas(this.config);
        },

        drawGrid: function(grid) {

            var cellWidth = +(this.config.width / grid.length).toFixed(1);
            var cellHeight = +(this.config.width / grid[0].length).toFixed(1);

            for (var i = 0; i < grid.length;i++) {
                for (var j = 0; j < grid[i].length;j++) {

                    var cell = grid[i][j];

                    var x = i * cellWidth;
                    var y = j * cellHeight;
                    var width = x + cellWidth;
                    var height = y + cellHeight;

                    if (cell) {
                        this.canvas.fillRect(x, y, width, height);
                    } else {
                        this.canvas.clearRect(x, y, width, height);
                    }
                    this.canvas.closePath();

                }
            }

        },

        setupCanvas: function(config) {

            var canvas = document.createElement('canvas');
            canvas.width = config.width;
            canvas.height = config.height;
            canvas.style.border = '1px solid';

            this.$(config.containerSelector).empty();
            this.$(config.containerSelector).append(canvas);

            return canvas.getContext('2d');

        }

    };

    window.GridManagerCanvas = GridManagerCanvas;

})(jQuery, window);