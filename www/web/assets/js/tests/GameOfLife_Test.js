/**
 * Created by gbmcarlos on 11/7/17.
 */

/*
 * To compare arrays we need to compare each element, so we need a custom assert to compare populations
 */
QUnit.assert.equalPopulation = function(value, expected, message) {

    var result = true;

    for (var i = 0; i < expected.length && result; i++) {
        if (typeof expected[i] != typeof value[i]) {
            result = false;
            continue;
        }
        for (var j = 0; j < expected.length; j++) {
            if (expected[i][j] != value[i][j]) {
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

QUnit.module("Game Of Life basics");

QUnit.test('Next cell state rules', function(assert) {

    assert.equal(false, GameOfLife.calculateNextCellState(true, 0)); // alive cell with 0 neighbours goes dead
    assert.equal(false, GameOfLife.calculateNextCellState(true, 1)); // alive cell with 1 neighbours goes dead
    assert.equal(true, GameOfLife.calculateNextCellState(true, 2)); // alive cell with 2 neighbours goes alive!
    assert.equal(true, GameOfLife.calculateNextCellState(true, 3)); // alive cell with 3 neighbours goes alive!
    assert.equal(false, GameOfLife.calculateNextCellState(true, 4)); // alive cell with 4 neighbours goes dead
    assert.equal(false, GameOfLife.calculateNextCellState(true, 5)); // alive cell with 5 neighbours goes dead
    assert.equal(false, GameOfLife.calculateNextCellState(true, 6)); // alive cell with 6 neighbours goes dead
    assert.equal(false, GameOfLife.calculateNextCellState(true, 7)); // alive cell with 7 neighbours goes dead
    assert.equal(false, GameOfLife.calculateNextCellState(true, 8)); // alive cell with 8 neighbours goes dead
    assert.equal(false, GameOfLife.calculateNextCellState(false, 0)); // dead cell with 0 neighbours goes dead
    assert.equal(false, GameOfLife.calculateNextCellState(false, 1)); // dead cell with 1 neighbours goes dead
    assert.equal(false, GameOfLife.calculateNextCellState(false, 2)); // dead cell with 2 neighbours goes dead
    assert.equal(true, GameOfLife.calculateNextCellState(false, 3)); // dead cell with 3 neighbours goes alive!
    assert.equal(false, GameOfLife.calculateNextCellState(false, 4)); // dead cell with 4 neighbours goes dead
    assert.equal(false, GameOfLife.calculateNextCellState(false, 5)); // dead cell with 5 neighbours goes dead
    assert.equal(false, GameOfLife.calculateNextCellState(false, 6)); // dead cell with 6 neighbours goes dead
    assert.equal(false, GameOfLife.calculateNextCellState(false, 7)); // dead cell with 7 neighbours goes dead
    assert.equal(false, GameOfLife.calculateNextCellState(false, 8)); // dead cell with 8 neighbours goes dead

});

QUnit.test('Counting neighbours', function(assert) {

    var grid0 = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];

    var grid1 = [
        [1,0,0],
        [0,0,0],
        [0,0,0]
    ];

    var grid2 = [
        [1,1,0],
        [0,0,0],
        [0,0,0]
    ];

    var grid3 = [
        [1,1,1],
        [0,0,0],
        [0,0,0]
    ];

    var grid4 = [
        [1,1,1],
        [1,0,0],
        [0,0,0]
    ];

    var grid5 = [
        [1,1,1],
        [1,0,1],
        [0,0,0]
    ];

    var grid6 = [
        [1,1,1],
        [1,0,1],
        [1,0,0]
    ];

    var grid7 = [
        [1,1,1],
        [1,0,1],
        [1,1,0]
    ];

    var grid8 = [
        [1,1,1],
        [1,0,1],
        [1,1,1]
    ];

    assert.equal(0, GameOfLife.countNeighbours(grid0, 1, 1));
    assert.equal(1, GameOfLife.countNeighbours(grid1, 1, 1));
    assert.equal(2, GameOfLife.countNeighbours(grid2, 1, 1));
    assert.equal(3, GameOfLife.countNeighbours(grid3, 1, 1));
    assert.equal(4, GameOfLife.countNeighbours(grid4, 1, 1));
    assert.equal(5, GameOfLife.countNeighbours(grid5, 1, 1));
    assert.equal(6, GameOfLife.countNeighbours(grid6, 1, 1));
    assert.equal(7, GameOfLife.countNeighbours(grid7, 1, 1));
    assert.equal(8, GameOfLife.countNeighbours(grid8, 1, 1));

});

QUnit.test('Calculate next generation', function(assert) {

    var population1 = [
        [0,1,0],
        [0,1,0],
        [0,1,0]
    ];

    var nextGeneration1 = [
        [0,0,0],
        [1,1,1],
        [0,0,0]
    ];

    var population2 = [
        [0,0,0],
        [0,1,0],
        [0,1,0]
    ];

    var nextGeneration2 = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];

    var population3 = [
        [0,0,0],
        [1,1,0],
        [0,1,0]
    ];

    var nextGeneration3 = [
        [0,0,0],
        [1,1,0],
        [1,1,0]
    ];

    var population4 = [
        [0,0,0],
        [1,1,0],
        [1,1,0]
    ];

    var nextGeneration4 = [
        [0,0,0],
        [1,1,0],
        [1,1,0]
    ];

    assert.equalPopulation(GameOfLife.calculateNextGeneration(population1).population, nextGeneration1);
    assert.equalPopulation(GameOfLife.calculateNextGeneration(population2).population, nextGeneration2);
    assert.equalPopulation(GameOfLife.calculateNextGeneration(population3).population, nextGeneration3);
    assert.equalPopulation(GameOfLife.calculateNextGeneration(population4).population, nextGeneration4);

});