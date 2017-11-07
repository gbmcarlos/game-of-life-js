/**
 * Created by gbmcarlos on 11/6/17.
 */
(function(jQuery, window, gameOfLife){

    var RandomPageController = {

        ui: {
            stopBtn: jQuery('#stopBtn'),
            resumeBtn: jQuery('#resumeBtn'),
            restartBtn: jQuery('#restartBtn')
        },

        $: jQuery,

        gameOfLife: gameOfLife,

        config: {
            numberCellsX: 50,
            numberCellsY: 50,
            cellWidth: 5,
            cellHeight: 5,
            intervalDuration: 10
        },

        /*
         * 0 = stop
         * 1 = running
         */
        state: 0,

        init: function() {
            this.gameOfLife.init(this.config);
            this.setEvents();
        },

        setEvents: function() {

            this.ui.stopBtn.on('click', this.stop.bind(this));
            this.ui.resumeBtn.on('click', this.resume.bind(this));
            this.ui.restartBtn.on('click', this.start.bind(this));

        },

        start: function() {

            var initialPattern = this.getRandomPattern(0.4);

            this.gameOfLife.start(
                initialPattern,
                this.iterationsCallback.bind(this),
                this.finishCallback.bind(this)
            );

            this.state = 1;

        },

        stop: function() {
            this.gameOfLife.stop();
        },

        reset: function() {
            this.gameOfLife.reset();
        },

        resume: function() {
            this.gameOfLife.resume();
        },

        iterationsCallback: function() {

        },

        finishCallback: function() {

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

    window.RandomPageController = RandomPageController;

    window.RandomPageController.init();

    window.RandomPageController.start();

})(jQuery, window, window.GameOfLife);