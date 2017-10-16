var introText;
var clicktostart;
var bootstate = {
  init: function(){
    //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  },
  preload: function(){
    this.load.image('logo','asserts/images/phaserlogo.png');
    this.load.image('background','asserts/images/background.png');
    this.load.image('wafty','asserts/images/wafty-icon.png');
    this.load.image('gamelogo','asserts/images/gamelogo.png');
  },

  create: function(){
    //this.game.stage.backgroundColor = '#4488AA';
    this.background = this.game.add.sprite(0,0,'background');
    this.wafty = this.game.add.sprite(50,205,'wafty');
    this.logo = this.game.add.sprite (520,338,'logo');
    this.gamelogo = this.game.add.sprite(132,20,'gamelogo');
    clicktostart = game.add.text(360,200, '- click to start -', { font: "40px Arial", fill: "#ffffff", align: "center" });
    clicktostart.anchor.setTo(0.5, 0.5);

    var spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.start,this);
    this.input.onDown.add(this.start,this);

    //game.input.onDown(game.state.start('GameState'),this);
    //this.state.start('GameState');
  },
  start: function(){
    game.state.start('GameState');
  }

};
