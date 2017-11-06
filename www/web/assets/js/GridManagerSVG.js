/**
 * Created by gbmcarlos on 11/6/17.
 */
(function(jQuery, window){

    var GridManagerSVG = {

        $: jQuery,

        config: {
            width: 600,
            height: 600,
            selector: '#grid',
            numberCellsX: 38,
            numberCellsY: 38
        },

        init: function() {

            this.canvas = this.setupCanvas(this.config);

        },

        resetGrid: function() {
            this.$(this.config.selector).empty();
        },

        drawGrid: function(grid) {

            var count = 0;

            this.resetGrid();

            for (var i = 0; i < grid.length; i++) { // for each line

                for (var j = 0; j < grid[i].length; j++) { // for each cell

                    var cellInfo = grid[i][j];

                    var cellProperties = {
                        x: i * this.config.cell.width,
                        y: j * this.config.cell.height,
                        width: this.config.cell.width,
                        height: this.config.cell.height,
                        fill: '#ffffff'
                    };

                    if (cellInfo) {
                        cellProperties.fill = '#000000';
                        count++;
                    }

                    this.drawNode('rect', cellProperties);

                }

            }

            return count;

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

            var canvas = this.$(config.selector);
            canvas.width(config.width);
            canvas.height(config.height);

            this.config.cell = {
                width: config.width / config.numberCellsX,
                height: config.height / config.numberCellsY
            };

            return canvas.get(0);

        }

    };

    window.GridManagerSVG = GridManagerSVG;

    window.GridManagerSVG.init();

})(jQuery, window);