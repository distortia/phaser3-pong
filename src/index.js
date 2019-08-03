import Phaser, { Scene } from "phaser"
import PreloadScene from './scenes/PreloadScene'
import TitleScene from './scenes/TitleScene'
import MainScene from './scenes/MainScene'
import GameOverScene from './scenes/GameOverScene'

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    }
  },
}
// Player is 50w/100l
// Ball is 25w/25l

const game = new Phaser.Game(config)
game.scene.add('PreloadScene', PreloadScene)
game.scene.add('TitleScene', TitleScene)
game.scene.add('MainScene', MainScene)
game.scene.add('GameOverScene', GameOverScene)

game.scene.start('PreloadScene')

