var bootstate = {
  init: function(){
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  },
  preload: function(){
    this.load.image('logo','asserts/images/phaserlogo.png');
  },
  create: function(){
    this.game.stage.backgroundColor = '#31445b';
    this.state.start('GameState');
  }
};
