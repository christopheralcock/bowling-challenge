describe('Scorecard', function() {

  // var scorecard = new Scorecard()

  var scorecard;
  beforeEach(function() {
      scorecard = new Scorecard();
  });

  describe('it returns', function(){
    it("0 when 0 has been rolled", function() {
      expect(scorecard.verifyRoll(0)).toEqual(0);
    });
    it("1 when 1 has been rolled", function() {
      expect(scorecard.verifyRoll(1)).toEqual(1);
    });
  });

  describe('it errors', function(){
    it("when 11 has been 'rolled'", function() {
      expect( function() {scorecard.verifyRoll(11); }).toThrow("Rolls can only score 0 to 10 inclusive");
    });
    it("when the total for a turn is greater than 10", function() {
      expect( function() {scorecard.verifyTurn(6,5); }).toThrow("Rolls can only score 0 to 10 inclusive");
    });
    it("when a negative number of pins has been 'rolled'", function() {
      expect( function() {scorecard.verifyRoll(-1); }).toThrow("Rolls can only score 0 to 10 inclusive");
    });
  });

  describe('it groups rolls into turns', function(){
    it("taking two rolls and outputting an array of them", function(){
      scorecard.roll(1);
      scorecard.roll(2);
      expect(scorecard.gameStorage).toEqual([[1,2]]);
    });
    it("tracking which part of the turn we're in after one roll", function(){
      scorecard.roll(1);
      expect(scorecard.currentStageOfTurn).toEqual(2);
    });
    it("tracking which part of the turn we're in after two rolls", function(){
      scorecard.roll(1);
      for (turn = 1; turn < 2; turn++) {scorecard.roll(1)};
      expect(scorecard.currentStageOfTurn).toEqual(1);
    });
    it("taking a third roll and recognising it as part of a new turn", function(){
      scorecard.roll(1);
      scorecard.roll(2);
      scorecard.roll(3);
      expect(scorecard.currentTurnStorage).toEqual([3]);
    });
  });

  describe('it keeps track of which turn it is', function(){
    it("at the beginning", function(){
      expect(scorecard.turnNumber).toEqual(1);
    });
    it("after one turn", function(){
      scorecard.updateGameStorageWithTurn([1,1]);
      expect(scorecard.turnNumber).toEqual(2);
    });
    it("after two turns", function(){
      for (turn = 1; turn < 3; turn++) {scorecard.updateGameStorageWithTurn([1,1])};
      expect(scorecard.turnNumber).toEqual(3);
    });
    it("after nine turns", function(){
      for (turn = 1; turn < 10; turn++) {scorecard.updateGameStorageWithTurn([1,1])};
      expect(scorecard.turnNumber).toEqual(10);
    });
    it("and it knows when the game is over", function(){
      for (turn = 1; turn < 10; turn++) {scorecard.updateGameStorageWithTurn([1,1])};
      expect( function() {scorecard.updateGameStorageWithTurn([1,1]); }).toThrow("You only get 10 turns");
    });
  });


  describe('it records', function() {
    it("two rolls as a turn", function(){
      scorecard.roll(1);
      scorecard.roll(2);
      expect(scorecard.gameStorage).toEqual([[1,2]]);
    });
    it("a turn in a game array", function(){
      scorecard.updateGameStorageWithTurn([3,3]);
      expect(scorecard.gameStorage).toEqual([[3,3]]);
    });
    it("another turn in the same array", function(){
      scorecard.updateGameStorageWithTurn([3,3]);
      scorecard.updateGameStorageWithTurn([2,2]);
      expect(scorecard.gameStorage).toEqual([[3,3],[2,2]]);
    });
    it("a third turn in the same array", function(){
      scorecard.updateGameStorageWithTurn([3,3]);
      scorecard.updateGameStorageWithTurn([2,2]);
      scorecard.updateGameStorageWithTurn([1,1]);
      expect(scorecard.gameStorage).toEqual([[3,3],[2,2],[1,1]]);
    });
  });

});
