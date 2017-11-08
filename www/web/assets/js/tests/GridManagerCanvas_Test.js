/**
 * Created by gbmcarlos on 11/7/17.
 */

/*
 * To assert that the grid manager uses the canvas properly we are going to create a mock object that intercepts the calls to the canvas,
 * and a custom assertion that compares the calls made to that mock object with the expected calls
 */

/*
 * Custom assertion that compares two lists of method calls
 * Each method call is an array with an string and an array with the arguments
 * ['methodName', [arg1, arg2]]
 */
QUnit.assert.methodCalls = function(value, expected, message) {

    var result = true;

    for (var i = 0; i < expected.length;i++) {

        if (expected[i][0] != value[i][0]) { // the name of the method
            result = false;
        }

        for (var j = 0; j < expected[i][1].length;j++) { // all the arguments
            if (expected[i][1][j] != value[i][1][j]) {
                result = false;
            }
        }

    }

    this.pushResult({
        result: result,
        actual: value,
        expected: expected
    });

};

/*
 * We need to record the calls that the grid manager does to the methods 'fillRect' and 'clearRect' of the canvas object
 * so we're going to mock an object that records those calls
 */
var MethodRecorder = function(){

    this.methodCalls = [];

    this.fillRect = function() {
        this.methodCalls.push(['fillRect', arguments]);
    };

    this.clearRect = function() {
        this.methodCalls.push(['clearRect', arguments]);
    };

};

QUnit.module('Grid manager basics');

QUnit.test('Sets up a canvas context', function(assert) {

    GridManagerCanvas.setupCanvas(10, 10);
    assert.ok(GridManagerCanvas.canvas instanceof CanvasRenderingContext2D);

});

QUnit.test('Sets the dimensions', function(assert) {

    GridManagerCanvas.setDimensions(0, 0);
    assert.ok(GridManagerCanvas.config.width == 0);
    assert.ok(GridManagerCanvas.config.height == 0);

    GridManagerCanvas.setDimensions(10, 10);
    assert.ok(GridManagerCanvas.config.width == 10);
    assert.ok(GridManagerCanvas.config.height == 10);
});

QUnit.test('Init: sets up a canvas and sets the dimensions', function(assert) {

    GridManagerCanvas.init(10, 10);
    assert.ok(GridManagerCanvas.canvas instanceof CanvasRenderingContext2D);
    assert.ok(GridManagerCanvas.config.width == 10);
    assert.ok(GridManagerCanvas.config.height == 10);

});

QUnit.module('Grid manager drawings', {
    before: function() {
        GridManagerCanvas.previousCanvas = GridManagerCanvas.canvas;
    },
    beforeEach: function(){
        GridManagerCanvas.canvas = new MethodRecorder();
    },
    after: function() {
        GridManagerCanvas.canvas = GridManagerCanvas.previousCanvas;
    }
});

QUnit.test('Draws valid grid 3x3', function(assert){

    var grid = [
        [1,0,1],
        [0,1,1],
        [1,1,0]
    ];

    GridManagerCanvas.setDimensions(30, 30);
    GridManagerCanvas.drawGrid(grid);

    assert.methodCalls(
        GridManagerCanvas.canvas.methodCalls,
        [
            ['fillRect', [0, 0, 10, 10]],
            ['clearRect', [10, 0, 10, 10]],
            ['fillRect', [20, 0, 10, 10]],
            ['clearRect', [0, 10, 10, 10]],
            ['fillRect', [10, 10, 10, 10]],
            ['fillRect', [20, 10, 10, 10]],
            ['fillRect', [0, 20, 10, 10]],
            ['fillRect', [10, 20, 10, 10]],
            ['clearRect', [20, 20, 10, 10]]
        ]
    );

});

QUnit.test('Does not draw invalid grid', function(assert) {

    var grid = [
        []
    ];

    GridManagerCanvas.setDimensions(30, 30);
    GridManagerCanvas.drawGrid(grid, 30, 30);

    assert.methodCalls(
        GridManagerCanvas.canvas.methodCalls,
        []
    );

});

QUnit.test('Clears the canvas', function(assert) {

    GridManagerCanvas.setDimensions(30, 30);
    GridManagerCanvas.resetGrid();
    assert.methodCalls(
        GridManagerCanvas.canvas.methodCalls,
        [
            ['clearRect', [0, 0, 30, 30]]
        ]
    );

});

