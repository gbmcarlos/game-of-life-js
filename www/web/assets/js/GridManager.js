/**
 * Created by gbmcarlos on 11/6/17.
 */
(function(jQuery, window){

    var GridManager = {

        $: jQuery,

        config: {
            grid: {
                width: 600,
                height: 600,
                selector: '#grid',
                numberCellsX: 38,
                numberCellsY: 38
            }
        },

        init: function() {

            this.canvas = this.setupCanvas(this.config);

        },

        getRandomGrid: function() {

            var grid = [];

            for (var i = 0; i < this.config.grid.numberCellsX; i++) { // for each line

                grid[i] = [];

                for (var j = 0; j < this.config.grid.numberCellsY; j++) { // for each cell

                    grid[i][j] = this.getRandomCell();

                }

            }

            return grid;

        },

        getRandomCell: function(){
            return !!Math.floor(Math.random() * 2);
        },

        drawGrid: function(grid) {

            for (var i = 0; i < grid.length; i++) { // for each line

                for (var j = 0; j < grid[i].length; j++) { // for each cell

                    var cellInfo = grid[i][j];

                    if (cellInfo) {

                        var positionX = i * this.config.cell.width;
                        var positionY = j * this.config.cell.height;

                        this.drawNode('rect', {
                                x: positionX,
                                y: positionY,
                                width: this.config.cell.width,
                                height: this.config.cell.height,
                                fill: '#000000'
                            }
                        );

                    }

                }

            }

        },

        drawNode: function(nodeType, properties) {

            var node = this.getNode(nodeType, properties);

            this.canvas.appendChild(node);

            return this;

        },

        getNode: function (nodeType, properties) {

            var node = document.createElementNS("http://www.w3.org/2000/svg", nodeType);

            for (var property in properties)
                node.setAttributeNS(
                    null,
                    property.replace(/[A-Z]/g, function (match) { // transform camel case to dash case
                        return "-" + match.toLowerCase();
                    }),
                    properties[property]
                );
            return node;
        },

        setupCanvas: function(config) {

            var canvas = this.$(config.grid.selector);
            canvas.width(config.grid.width);
            canvas.height(config.grid.height);

            this.config.cell = {
                width: config.grid.width / config.grid.numberCellsX,
                height: config.grid.height / config.grid.numberCellsY
            };

            return canvas.get(0);

        }

    };

    window.GridManager = GridManager;

    window.GridManager.init();

})(jQuery, window);