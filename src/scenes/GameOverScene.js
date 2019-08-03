class GameOverScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameOverScene'
        })
    }
    preload () {
    }
    create () {
        this.cameras.main.backgroundColor.setTo(255,255,255)
        this.add.text(340, 300, 'GAME OVER!', {fontSize: '32px', fill: '#000'})
        this.add.text(250, 400, "Press 'ENTER' to restart!", {fontSize: '32px', fill: '#000'})
    } 
    update () {
        let enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        if (enter.isDown) {
            this.game.scene.start('TitleScene')
            this.scene.stop()
        }
    }
}

export default GameOverScene