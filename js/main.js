var game = new Phaser.Game(720,405, Phaser.Auto,'flappy');

var GameState = {
      //This preload function is to load everything
      //That we need to the project.
      preload: function() {
      // Preload the image from source
      //This will preload the background
      this.load.image('background','asserts/images/background.png');
      //Preload the wafty-icon
      this.load.image('wafty','asserts/images/wafty-icon.png');
      //Preload the pipte
      this.load.image('pipe', 'asserts/images/pipe.png');
  },
  create: function(){
      game.physics.startSystem(Phaser.Physics.ARCADE);
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
      //Create pipet
      this.pipes = game.add.group();
      this.timer = game.time.events.loop(1500, this.addRowOfPipes,this);
  },
  update: function(){
      //If the object is out of the screen(). Call restartGame
      if(this.wafty.y<0 || this.wafty.y>405) this.restartGame();

  },
  jump: function(){
      this.wafty.body.velocity.y = -350;
  },
  restartGame: function(){
      this.state.start('GameState');
  },
  addOnePipe: function(x, y) {
      // Create a pipe at the position x and y
      var pipe = game.add.sprite(x, y, 'pipe');
      // Add the pipe to our previously created group
      this.pipes.add(pipe);
      // Enable physics on the pipe
      game.physics.arcade.enable(pipe);
      // Add velocity to the pipe to make it move left
      pipe.body.velocity.x = -200;
      // Automatically kill the pipe when it's no longer visible
      pipe.checkWorldBounds = true;
      pipe.outOfBoundsKill = true;
  },

  addRowOfPipes: function() {
      // Randomly pick a number between 1 and 5
      // This will be the hole position
      var holeofhope = Math.floor(Math.random() * 5) + 1;
      // Add the 6 pipes
      // With one big hole at position 'hole' and 'hole + 1'
      for (var i = 0; i < 8; i++)
          if (i != holeofhope && i != holeofhope + 1)
              this.addOnePipe(400, i * 60 + 10);
  },

};
game.state.add('GameState',GameState);
game.state.start('GameState');
