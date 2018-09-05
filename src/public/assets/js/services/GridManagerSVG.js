/**
 * Created by gbmcarlos on 11/6/17.
 */
(function(jQuery, window){

    var GridManagerSVG = {

        $: jQuery,

        config: {
            width: 600,
            height: 600,
            containerSelector: '#grid-container'
        },

        init: function() {

            this.canvas = this.setupCanvas(this.config);

        },

        resetGrid: function() {
            this.canvas.empty();
        },

        drawGrid: function(grid) {

            var cellWidth = this.config.width / grid.length;
            var cellHeight = this.config.width / grid[0].length;

            var count = 0;

            this.resetGrid();

            for (var i = 0; i < grid.length; i++) { // for each line

                for (var j = 0; j < grid[i].length; j++) { // for each cell

                    var cellInfo = grid[i][j];

                    var cellProperties = {
                        x: i * cellWidth,
                        y: j * cellHeight,
                        width: cellWidth,
                        height: cellHeight,
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

            this.canvas.append(node);

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

            var canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            canvas = this.$(canvas);
            canvas.width(config.width);
            canvas.height(config.height);
            canvas.css('border', '1px solid');

            this.$(config.containerSelector).empty();
            this.$(config.containerSelector).append(canvas);

            return canvas;

        }

    };

    window.GridManagerSVG = GridManagerSVG;

    window.GridManagerSVG.init();

})(jQuery, window);