/**
 * Created by gbmcarlos on 11/6/17.
 */
(function(jQuery, window, gameOfLife){

    var RandomPageController = {

        $: jQuery,

        gameOfLife: gameOfLife,

        start: function() {

            var initialPattern = this.gameOfLife.getRandomPattern(0.4);

            this.gameOfLife.start(
                initialPattern,
                this.iterationsCallback.bind(this),
                this.finishCallback.bind(this)
            );
        },

        iterationsCallback: function() {

        },

        finishCallback: function() {

        }

    };

    window.RandomPageController = RandomPageController;

    window.RandomPageController.start();

})(jQuery, window, window.GameOfLife);