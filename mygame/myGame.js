/*global Phaser*/

var game = new Phaser.Game(1366, 765, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var platforms;
var player;
var cursors;
var stars;
var score = 0;
var scoreText;

function preload() {
    
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.spritesheet('star', 'assets/dude.png', 40, 40);
    game.load.spritesheet('dude', 'assets/olddude.png', 32, 48);
    
}

function create() {
    game.add.sprite(0,0,'sky');
    // game.add.sprite(500,250,'star');
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(4,2);
    ground.body.immovable = true;
    var ledge = platforms.create(10, 600, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(0.1,0.1);
    ledge = platforms.create(1000, 600, 'ground');
    ledge.body.immovable = false;
    ledge.scale.setTo(0.1,0.1);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    player = game.add.sprite(400, game.world.height - 1520, 'dude');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.23;
    player.body.gravity.y = 900;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    cursors = game.input.keyboard.createCursorKeys();
    stars = game.add.group();
    stars.animations.add('shine', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], true);
    stars.enableBody = true;
    for (var i=0; i < 12; i++){
        var star = stars.create(i * 100,0,'star');
        star.body.gravity.y = 900;
        star.body.bounce.y = 0.2 + Math.random() * 0.2;
    }
    scoreText = game.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});
}

function update() {
    
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    player.body.velocity.x = 0;
    
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -650;
        
        player.animations.play('left');
    }

    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 60;
        
        player.animations.play('right');
    }
    else
    {
        player.animations.stop();
        
        player.frame = 4;
    }
    
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -500;
    }
    
    game.physics.arcade.collide(stars, platforms);
    
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
    scoreText.text = "Score:" + score;
    stars.animations.play('shine');
}
function collectStar (player, star) {
    
    star.kill();
    score += 1;
    // star = stars.create(Math.random() * 1300, 0, 'star');
    // for (var i = 0; i < 1; i++) {
    //     star.body.gravity.y = 300;
    //     star.body.bounce.y = 0.2 + Math.random() * 0.2;
    // }
}