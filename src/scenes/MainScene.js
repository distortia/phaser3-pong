let player1, player2, ball, leftWall, rightWall, player1ScoreText, player2ScoreText, beepSound
const playerSpeed = 500
const ballSpeed = 800
let player1Score = 0
let player2Score = 0
const maxScore = 1

class MainScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'MainScene'
        })
    }
    create () {
        this.physics.world.setBounds(0, 0, 800, 600)
        this.cameras.main.backgroundColor.setTo(255,255,255)
        beepSound         = this.sound.add('beep')
        player1ScoreText  = this.add.text(20, 16, 'Score: 0', {fontSize: '32px', fill: '#000'})
        player2ScoreText  = this.add.text(600, 16, 'Score: 0', {fontSize: '32px', fill: '#000'})
        player1           = this.physics.add.sprite(0, 300, 'player1')
        player1.name      = 'player1'
        player2           = this.physics.add.sprite(800, 300, 'player2')
        player2.name      = 'player2'
        ball              = this.physics.add.sprite(400, 300, 'ball')
        leftWall = this.physics.add.sprite(0, 1, '').setScale(1, 100).setImmovable(true)
        leftWall.name = 'leftWall'
        
        rightWall = this.physics.add.sprite(800, 1, '').setScale(1, 100).setImmovable(true)
        rightWall.name = 'rightWall'
        
        this.physics.add.collider(player1, ball, this.reflectBall, null, null)
        this.physics.add.collider(player2, ball, this.reflectBall, null, null)
        this.physics.add.collider(ball, leftWall, this.scorePoint, null, null)
        this.physics.add.collider(ball, rightWall, this.scorePoint, null, null)
        
        player1.setCollideWorldBounds(true).setBounce(0)
        player2.setCollideWorldBounds(true).setBounce(0)
        ball.setCollideWorldBounds(true).setBounce(1)
        setTimeout(() => {
            ball.setVelocityX(this.randomStartDirection())
        }, 3000)
        ball.setFriction(0)
    }
    
    update () {
        let cursors = this.input.keyboard.createCursorKeys()
        let keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        let keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        if (cursors.up.isDown) {
            player2.setVelocityY(-playerSpeed)
        }
        else if (cursors.down.isDown) {
            player2.setVelocityY(playerSpeed)
        } else {
            player2.setVelocityY(0)
        } 
        if (keyW.isDown) {
            player1.setVelocityY(-playerSpeed)
        } else if (keyS.isDown) {
            player1.setVelocityY(playerSpeed)
        } else {
            player1.setVelocityY(0)
        }
        if(player1Score === maxScore || player2Score === maxScore) {
            this.resetScores()
            this.game.scene.start('GameOverScene')
            this.scene.stop()
        }
    }
    
    reflectBall (player, ball) {
        let newY
        let newX = (player.name === 'player1') ? ballSpeed : -ballSpeed
        beepSound.play()
        if (ball.y < player.y) {
            newY = -(player.y - ball.y) * ball.body.angle * 2
        } else if (ball.y > player.y) {
            newY = -(player.y - ball.y) * ball.body.angle * 2
        } else {
            newY = 0
        }
        ball.setVelocity(newX, newY)
    }
    
    scorePoint (_ball, wall) {
        if (wall.name === 'rightWall') {
            player1Score += 1
            player1ScoreText.setText(`Score: ${player1Score}`)
        } else {
            player2Score += 1
            player2ScoreText.setText(`Score: ${player2Score}`)
        }
        ball.setPosition(400, 300)
        ball.setVelocity(0, 0)
        setTimeout(() => {
            ball.setVelocityX(this.randomStartDirection())
        }, 3000)
    }
    randomStartDirection () {
        let leftOrRight = Math.floor(Math.random() * Math.floor(2))
        let velocity = (leftOrRight === 0) ? ballSpeed : -ballSpeed
        return velocity
    }
    resetScores () {
        player1Score = 0
        player2Score = 0
    }
}

export default MainScene