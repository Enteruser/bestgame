/*global Phaser*/

var game = new Phaser.Game(1366, 765, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var platforms;
var player;
var cursors;
var stars;
var score = 0;
var scoreText;
var ledge;
// var ledge;

function preload() {
    
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    // game.load.image('star', 'assets/oldstar.png');
    game.load.spritesheet('star', 'assets/dude.png', 40, 40);
    // game.load.spritesheet('star', 'assets/spritesheet(1).png', 504, 506);
    game.load.spritesheet('dude', 'assets/braid.png', 83, 140);
    
}

// var ledge2;

function create() {
    game.add.sprite(0,0,'sky');
    // game.add.sprite(50,50,'star');
    platforms = game.add.group();
    platforms.enableBody = true;
    // var ground = platforms.create(0, game.world.height - 64, 'ground');
    // ground.scale.setTo(4,2);
    // ground.body.immovable = true;
    
    
    ledge = platforms.create(10, 600, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(0.5,1);
    
    // ledge = platforms.create(10, 600, 'ground');
    // ledge.body.immovable = true;
    // ledge.scale.setTo(0.1,0.1);
    // ledge.body.collideWorldBounds = true;

    
    ledge = platforms.create(152, 600, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(0.145,-10);
    ledge.enableBody = true;
    ledge.body.setSize(60, -350, 50, 25);
    game.debug.body(ledge);
    
    // ledge = platforms.create(150, 500, 'ground');
    // ledge.body.immovable = false;
    // ledge.scale.setTo(0.1,0.1);
    // ledge.body.immovable = true;
    // ledge.body.collideWorldBounds = true;
    // ledge.body.bounce.y = 0.2 + Math.random() * 0.2;
    // ledge.body.bounce.x = 0.2 + Math.random() * 0.2;
    // ledge.body.gravity.x = 100;
    
    // ledge = platforms.create(150, 560, 'ground');
    // ledge.body.immovable = false;
    // ledge.scale.setTo(0.1,0.1);
    // ledge.body.collideWorldBounds = true;
    // ledge.body.bounce.y = 0.2 + Math.random() * 2;
    // ledge.body.bounce.x = 0.2 + Math.random() * 2;
    
    ledge = platforms.create(300, 400, 'ground');
    ledge.body.immovable = false;
    // ledge.body.immovable = true;
    ledge.scale.setTo(0.1,0.1);
    ledge.body.collideWorldBounds = true;
    
    ledge = platforms.create(450, 300, 'ground');
    ledge.body.immovable = false;
    // ledge.body.immovable = true;
    ledge.scale.setTo(0.1,0.1);
    ledge.body.collideWorldBounds = true;
    
    ledge = platforms.create(600, 200, 'ground');
    ledge.body.immovable = false;
    // ledge.body.immovable = true;
    ledge.scale.setTo(0.1,0.1);
    ledge.body.collideWorldBounds = true;
    
    // ledge = platforms.create(750, 100, 'ground');
    // ledge.body.immovable = false;
    // ledge.scale.setTo(0.1,0.1);
    
    ledge = platforms.create(750, 100, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(40,0.1);
    
    // platforms.body.immovable = true;
    // ledge = platforms.create(1000, 600, 'ground');
    // ledge.body.immovable = false;
    // ledge.scale.setTo(0.1,0.1);
    
    // ledge = platforms.create(1300, 100, 'ground');
    // ledge.body.immovable = true;
    // ledge.scale.setTo(21,21);
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    player = game.add.sprite(0, game.world.height - 1520, 'dude');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.23;
    player.body.gravity.y = 900;
    player.body.collideWorldBounds = true;
    // player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48], 10, true);
    player.animations.add('standing', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3], 2, true);
    cursors = game.input.keyboard.createCursorKeys();
    stars = game.add.group();
    stars.enableBody = true;
    // stars.body.collideWorldBounds = true;
    stars.callAll('animations.add', 'animations', 'shine', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true);
    // stars.callAll('animations.play', 'animations', 'shine');
    // stars.animations.add('shine', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true);
    // for (var i=0; i < 12; i++){
    //     var star = stars.create(i * 100,0,'star');
    //     star.body.gravity.y = 900;
    //     star.body.bounce.y = 0.2 + Math.random() * 0.2;
    // }
    for (var i=0; i<1; i++){
        var star = stars.create(1300,0, 'star');
        star.body.gravity.y =100;
        star.body.bounce.y = 0.2+ Math.random() * 0.2;
    }
    //You're welcome
    stars.callAll('animations.add', 'animations', 'shine', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true);
    stars.callAll('animations.play', 'animations', 'shine');
    scoreText = game.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: '#000'});
    // platforms.body.collideWorldBounds = false;
    
}

function update() {
    
    // game.debug.body(player);
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(platforms, platforms);
    player.body.velocity.x = 0;
    
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -650;
        
        // player.animations.play('left');
    }

    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 160;
        
        // player.animations.play('left');
        
        player.animations.play('right');
    }
    else
    {
        // player.animations.stop();
        
        player.animations.play('standing');
        
        // player.frame = 4;
    }
    
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -500;
    }
    
    // if (hitPlatform)
    // {
    //     ledge.body.gravity.x = 100;
    // }
    // game.physics.arcade.collide(player, platforms, collidePlatform, this);
    game.physics.arcade.collide(stars, platforms);

    game.physics.arcade.overlap(player, stars, collectStar, null, this);
    scoreText.text = "Score:" + score;
    // stars.animations.play('shine');
    stars.callAll('animations.play', 'animations', 'shine');
    
    
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
function collidePlatform (player, platforms){
    platforms.body.y -= 5;
}