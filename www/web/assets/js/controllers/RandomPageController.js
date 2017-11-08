/**
 * Created by gbmcarlos on 11/6/17.
 */
(function(jQuery, window, gameOfLife){

    var RandomPageController = {

        $: jQuery,

        gameOfLife: gameOfLife,

        start: function() {

            var initialPattern = this.getRandomPattern(0.4);

            this.gameOfLife.start(
                initialPattern,
                this.iterationsCallback.bind(this)
            );

        },

        getRandomPattern: function(ratio) {

            var pattern = [];

            for (var i = 0; i < this.config.numberCellsX; i++) { // for each line

                pattern[i] = [];

                for (var j = 0; j < this.config.numberCellsY; j++) { // for each cell

                    pattern[i][j] = this.getRandomCell(ratio);

                }

            }

            return pattern;

        },

        getRandomCell: function(ratio) {
            return Math.random() < ratio;
        }

    };

    window.RandomPageController = jQuery.extend(RandomPageController, window.BaseGameOfLifeController);

    window.RandomPageController.init();

})(jQuery, window, window.GameOfLife);