import playerImage from '../assets/player.png'
import ballImage from '../assets/ball.png'

class PreloadScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'PreloadScene'
        })
    }
    preload () {
        this.load.image('player1', playerImage)
        this.load.image('player2', playerImage)
        this.load.image('ball', ballImage)
        this.load.audio({key: 'beep', url: ['/src/assets/beep.mp3', '/src/assets/beep.wav']})
    }
    create () {
        this.game.scene.start('TitleScene')
        this.scene.stop()
    } 
}

export default PreloadScene