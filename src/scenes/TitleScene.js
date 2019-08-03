class TitleScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'TitleScene'
        })
    }
    preload () {
    }
    create () {
        this.add.text(250, 300, 'Welcome to Pong', {fontSize: '32px', fill: '#FFF'})
        this.add.text(200, 500, 'Press Enter to start!', {fontSize: '32px', fill: '#FFF'})
    }
    update () {
        let enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        if (enter.isDown) {
            this.game.scene.start('MainScene')
            this.scene.stop()
        }
    }
}

export default TitleScene