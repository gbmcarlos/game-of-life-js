/**
 * Created by gbmcarlos on 11/6/17.
 */
(function(jQuery, window, gameOfLife){

    var GosperGliderGunPageController = {

        ui: {
            stopBtn: jQuery('#stopBtn'),
            resumeBtn: jQuery('#resumeBtn'),
            restartBtn: jQuery('#restartBtn')
        },

        $: jQuery,

        gameOfLife: gameOfLife,

        start: function() {

            var initialPattern = this.getGosperGiderGunPattern(0, 0, this.config.numberCellsX, this.config.numberCellsY);

            this.gameOfLife.start(initialPattern, this.iterationsCallback.bind(this));

        },

        getGosperGiderGunPattern: function(x, y, width, height) {

            var g = [];
            for (var i = 0; i < height;i++) {
                g[i] = [];
                for (var j = 0; j < width; j++) {
                    g[i][j] = false;
                }
            }

            g[5][1] = g[5][2] = g[6][1] = g[6][2] = true; // first Rect
            g[5][11] = g[6][11] = g[7][11] = g[4][12] = g[3][13] = g[3][14] = g[8][12] = g[9][13] = g[9][14] = g[6][15] = g[4][16] = g[8][16] = g[5][17] = g[6][17] = g[7][17] = g[6][18] = true; // the big weird circle
            g[5][21] = g[5][22] = g[4][21] = g[4][22] = g[3][21] = g[3][22] = g[2][23] = g[6][23] = g[1][25] = g[2][25] = g[6][25] = g[7][25] = true; // the weird shape next to the weird circle
            g[3][35] = g[3][36] = g[4][35] = g[4][36] = true;

            return g;

        }

    };

    window.GosperGliderGunPageController = jQuery.extend(GosperGliderGunPageController, window.BaseGameOfLifeController);

    window.GosperGliderGunPageController.init();

    window.GosperGliderGunPageController.start();

})(jQuery, window, window.GameOfLife);