var game = new Phaser.Game(720,400, Phaser.Auto,'flappy');

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
      this.load.image('pipe', 'asserts/images/pacman.png');
      //Load Google Webfront Loader script
      game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
      //Load sound
      game.load.audio('swoosh','asserts/images/Swoosh.wav');
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
      this.wafty.body.gravity.y = 400;// This adjust how fast the wafty will drop
      //Create an event capture, when the user press SPACEBAR or mouse click on the screen. The object will jump
      var spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      this.input.onDown.add(this.jump,this);
      spaceKey.onDown.add(this.jump, this);
      //Create pipet
      this.pipes = game.add.group();
      this.timer = game.time.events.loop(2000, this.addRowOfPipes,this);
      //Create score
      this.score = 0;
      var style = {font: "25px Nosifer",fill:"#fff"};
      this.playerScore = game.add.text(20,20,'0',style); //Initial player score
      //Add sound when the wafty jump
      this.jumpSound = game.add.audio('swoosh');

  },
  update: function(){
      //If the object is out of the screen(). Call restartGame
      if(this.wafty.y<0 || this.wafty.y>405) this.restartGame();
      game.physics.arcade.overlap(this.wafty,this.pipes,this.restartGame,null,this);
      if(this.wafty.angle<20)
        this.wafty.angle+=1;

  },

  jump: function(){
    //When SPACEBAR is pressed or clicked, this wafty will jump
      this.wafty.body.velocity.y = -200; //This adjust how high th wafty could jump
      //Create animation for the wafty
      var animation = game.add.tween(this.wafty);
      //Adjust to position of the wafty by adjust the position of the image
      //Set the image to the desire angle
      animation.to({angle:-15},100);
      animation.start();
      this.jumpSound.play();
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
      pipe.body.velocity.x = -150;//This adjust how fast the pipe would move

      // Automatically kill the pipe when it's no longer visible
      pipe.checkWorldBounds = true
      pipe.outOfBoundsKill = true;



  },

  addRowOfPipes: function() {
      // Randomly pick a number between 1 and 5
      // This will be the hole position
      var holeofhope = Math.floor(Math.random() * 5) + 1;
      // Add the 10 pipes, with the position of holeofhope, holeofhope+1, holeofhope +2  leave empty
      for (var i = 0; i < 10; i++)
          if (i != holeofhope && i != holeofhope + 1 && i!=holeofhope+2)
          //700 is the postition where the pipe appear.
          //Also knows as the width of the screen, where you want to place pipe
          //i * 50, is the position of the height, where the box should be place.
          this.addOnePipe(700, i * 40 );
      //Add score
      this.score += 1;
      this.playerScore.text = this.score - 2 < 0 ? 0: this.score - 2;


  },

};
game.state.add('GameState',GameState);
game.state.start('GameState');
