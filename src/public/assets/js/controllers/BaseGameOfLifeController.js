/**
 * Created by gbmcarlos on 11/7/17.
 */
/**
 * Created by gbmcarlos on 11/6/17.
 */
(function(jQuery, window, gameOfLife){

    var BaseGameOfLifeController = {

        ui: {
            stopBtn: jQuery('#stopBtn'),
            resumeBtn: jQuery('#resumeBtn'),
            restartBtn: jQuery('#restartBtn'),
            generationLabel: jQuery('#generationLabel'),
            countLabel: jQuery('#countLabel')
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

        init: function() {
            this.gameOfLife.init(this.config);
            this.setEvents();
        },

        setEvents: function() {

            if (this.ui.stopBtn.length) {
                this.ui.stopBtn.on('click', this.stop.bind(this));
            }

            if (this.ui.resumeBtn.length) {
                this.ui.resumeBtn.on('click', this.resume.bind(this));
            }

            if (this.ui.restartBtn.length) {
                this.ui.restartBtn.on('click', this.start.bind(this));
            }

        },

        stop: function() {
            this.gameOfLife.stop();
        },

        resume: function() {
            this.gameOfLife.resume();
        },

        iterationsCallback: function(generation, count) {

            this.ui.generationLabel.html(generation);
            this.ui.countLabel.html(count);

        }

    };

    window.BaseGameOfLifeController = BaseGameOfLifeController;

})(jQuery, window, window.GameOfLife);