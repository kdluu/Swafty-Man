var game = new Phaser.Game(720,405, Phaser.Auto,'flappy');

var GameState = {
  //This preload function is to load everything
  //That we need to the project.
  preload: function() {
  //This will preload the background
  this.load.image('background','asserts/images/background.png');
  //Preload the wafty-icon
  this.load.image('wafty','asserts/images/wafty-icon.png');
  },
  create: function(){
    //Add background from the preload background
  this.background = this.game.add.sprite(0,0,'background');
  // Add the wafty-icon
  this.wafty = this.game.add.sprite(50,205,'wafty');
  //Enable physics engine, so that the object will fall due to gravity
  this.physics.arcade.enable(this.wafty);
  //Set gravity to the desire number
  this.wafty.body.gravity.y = 500;
  //Create an event capture, when the user press SPACEBAR or mouse click on the screen. The object will jump
  var spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  this.input.onDown.add(this.jump,this);
  spaceKey.onDown.add(this.jump, this);
  },
  update: function(){

  },
  jump: function(){
    this.wafty.body.velocity.y = -350;
  }
};
game.state.add('GameState',GameState);
game.state.start('GameState');
