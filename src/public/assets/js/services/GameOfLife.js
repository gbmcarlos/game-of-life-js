/**
 * Created by gbmcarlos on 11/6/17.
 */
(function(jQuery, window, gridManager){

    var GameOfLife = {

        $: jQuery,

        gridManager: gridManager,

        config: {},

        interval: null,

        init: function(config) {

            this.config = config;

            this.gridManager.init(
                this.config.numberCellsX * this.config.cellWidth,
                this.config.numberCellsY * this.config.cellHeight
            );

        },

        drawPopulation: function(population) {
            this.gridManager.drawGrid(population);
        },

        start: function(initialPopulation, iterationCallback) {

            this.reset();
            this.population = initialPopulation; // in this property we'll save the population each time
            this.iterationCallback = iterationCallback; // callback to be called after each generation, with the number of generation and the population count
            this.setInterval();

        },

        stop: function() {

            clearInterval(this.interval);

        },

        reset: function() {
            this.stop();
            this.generations = 0;
            this.gridManager.resetGrid();
        },

        resume: function() {
            this.setInterval();
        },

        setInterval: function() {
            clearInterval(this.interval);
            this.interval = setInterval(this.nextGeneration.bind(this), this.config.intervalDuration); // start the iterations
        },

        nextGeneration: function() {

            this.generations++;

            var nextPopulation = this.calculateNextGeneration(this.population);

            this.gridManager.drawGrid(nextPopulation.population);
            this.population = nextPopulation.population;

            if (nextPopulation.count == 0) {
                this.stop();
            }

            if (typeof this.iterationCallback == 'function') {
                this.iterationCallback(this.generations, nextPopulation.count);
            }

        },

        /*
         * Rules for next generation
         * Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
         * Any live cell with two or three live neighbours lives on to the next generation.
         * Any live cell with more than three live neighbours dies, as if by overpopulation.
         * Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
         */
        calculateNextGeneration: function(population) {

            var count = 0;

            var next = [];

            for (var i = 0; i < population.length; i++) { // for each line

                next[i] = [];

                for (var j = 0; j < population[i].length; j++) { // for each cell

                    var numberNeighbours = this.countNeighbours(population, i, j);

                    var nextState = this.calculateNextCellState(population[i][j], numberNeighbours);

                    next[i][j] = nextState;

                    if (nextState) {
                        count++;
                    }

                }

            }

            return {
                population: next,
                count: count
            };
        },

        countNeighbours: function(population, i, j) {

            var count = 0;

            for (var k = -1; k <= 1; k++) {

                for (var l = -1; l <= 1; l++) {

                    if (k != 0 || l != 0) { // if it's not the central cell that we are looking at

                        if (population[i + k] && population[i + k][j + l]) {
                            count++;
                        }

                    }

                }

            }

            return count;

        },

        calculateNextCellState: function(cell, numberNeighbours) {

            var result;

            if (cell) { // for alive cells

                // 2 or 3, lives
                // less than 2 or more than 3, dies
                result = (numberNeighbours == 2 || numberNeighbours == 3);

            } else { // for dead cells

                // exactly 3, comes to life
                result = (numberNeighbours == 3);
            }

            return result;

        }

    };

    window.GameOfLife = GameOfLife;

})(jQuery, window, window.GridManagerCanvas);