import Phaser, { Scene } from "phaser"
import playerImage from "./assets/player.png"
import ballImage from './assets/ball.png'

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    }
  }
}
// Player is 50w/100l
// Ball is 25w/25l

const game = new Phaser.Game(config)
let player1, player2, ball, leftWall, rightWall, player1ScoreText, player2ScoreText, gameOverText, gameRestartText, beepSound
const playerSpeed = 500
const ballSpeed = 500
let player1Score = 0
let player2Score = 0
let canScore = true
const maxScore = 10
let gameOver = false

function preload() {
  this.load.image('player1', playerImage)
  this.load.image('player2', playerImage)
  this.load.image('ball', ballImage)
  this.load.audio({key: 'beep', url: ['/src/assets/beep.mp3', '/src/assets/beep.wav']})
}

function create() {
  this.physics.world.setBounds(0, 0, 800, 600)
  this.cameras.main.backgroundColor.setTo(255,255,255)
  beepSound         = this.sound.add('beep')
  player1ScoreText  = this.add.text(20, 16, 'Score: 0', {fontSize: '32px', fill: '#000'})
  player2ScoreText  = this.add.text(600, 16, 'Score: 0', {fontSize: '32px', fill: '#000'})
  gameOverText      = this.add.text(300, 300, '', {fontSize: '32px', fill: '#000'})
  player1           = this.physics.add.sprite(0, 300, 'player1')
  player1.name      = 'player1'
  player2           = this.physics.add.sprite(800, 300, 'player2')
  player2.name      = 'player2'
  ball              = this.physics.add.sprite(400, 300, 'ball')

  leftWall = this.physics.add.sprite(0, 1, '').setScale(1, 100)
  leftWall.name = 'leftWall'

  rightWall = this.physics.add.sprite(800, 1, '').setScale(1, 100)
  rightWall.name = 'rightWall'

  this.physics.add.collider(player1, ball, reflectBall, null, null)
  this.physics.add.collider(player2, ball, reflectBall, null, null)
  this.physics.add.overlap(ball, leftWall, scorePoint, null, null)
  this.physics.add.overlap(ball, rightWall, scorePoint, null, null)

  player1.setCollideWorldBounds(true).setBounce(0)
  player2.setCollideWorldBounds(true).setBounce(0)
  ball.setCollideWorldBounds(true).setBounce(1)
  ball.setVelocityX(randomStartDirection())
  ball.setVelocity(-ballSpeed, 0)
  ball.setFriction(0)
}

function update () {
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
}

function reflectBall (player, ball) {
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

function scorePoint (_ball, wall) {
  if (canScore) {
    canScore = false
    if (wall.name === 'rightWall') {
      player1Score += 1
      player1ScoreText.setText(`Score: ${player1Score}`)
    } else {
      player2Score += 1
      player2ScoreText.setText(`Score: ${player2Score}`)
    }
  }
  if(player1Score === maxScore || player2Score === maxScore) {
    gameIsOver()
    return
  }
  if(!gameOver) {
    resetCanScore()
  }
}
function randomStartDirection () {
  let leftOrRight = Math.floor(Math.random() * Math.floor(2))
  let velocity = (leftOrRight === 0) ? ballSpeed : -ballSpeed
  return velocity
}
// Super Hacky work around in an attempt to ensure that points cant get scored too often
function resetCanScore() { 
  setTimeout(() => {
    canScore = true
  }, 800)
}
function gameIsOver () {
  gameOverText.setText('GAME OVER')
  ball.setVelocity(0)
  canScore = false
  gameOver = true
}