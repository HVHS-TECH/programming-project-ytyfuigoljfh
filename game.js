/*******************************************************/
// P5.play: game
// game
// Written by ??
/*******************************************************/
	
/*******************************************************/
// setup()
/*******************************************************/

var inBattle = 0
var battleTurn = "player1"
var battleTotalTurn = 1
var battleTurnArray = ['p1', 'p2', 'p3', 'p4', 'e1', 'e2', 'e3', 'e4']
var shuffledBattleTurnArray = shuffle(battleTurnArray);
var battleButtonHover = 1

preload()
	function preload() {
	imgFace = loadImage('../assets/images/Merp.svg');
	imgPlayerBattle = loadImage('../assets/images/MerpBattle.svg');
	imgUnkownBattle = loadImage('../assets/images/UnkownBattle.svg');
    imgGlorbBattle = loadImage('../assets/images/GlorbBattleIdle.svg');
    imgMerpTurnPlate = loadImage('../assets/images/turnPlates/MerpTurnPlate.svg');
    imgUnkownTurnPlate = loadImage('../assets/images/turnPlates/UnkownTurnPlate.svg');
    imgGlorbTurnPlate = loadImage('../assets/images/turnPlates/GlorbTurnPlate.svg');

	musicTrobbioButItsTheWorldRevolving = loadSound('../assets/audio/music/Trobbio_but_its_THE_WORLD_REVOLVING__Tarro57.mp3')
}


function setup() {
	console.log("setup: ");

	cnv = new Canvas(1088 , 612);

	mapGroup = new Group();
    upperWall = new Sprite(544, 0, 1088, 306, 's')
    upperWall.color = '#000000'
	mapGroup.add(upperWall);

    lowerWall = new Sprite(544, 612, 1088, 306, 's')
    lowerWall.color = '#000000'
	mapGroup.add(lowerWall);

	player = new Sprite(225, 306, 50, 100, 'k');
	player.image = imgFace;

    enemiesGroup = new Group();
    badGuy = new Sprite(400, 306, 50, 100, 'd');
    badGuy.color = '#ff4141'
    enemiesGroup.add(badGuy);
    enemiesGroup.collides(player, battleStart);

    function battleStart(_badGuy, _player) {
		_badGuy.remove();
		_player.remove();
		mapGroup.remove();
		inBattle = 1
		battleButtonHover = 1
        battleTotalTurn = 1
        shuffledBattleTurnArray = shuffle(battleTurnArray);
        console.log(shuffledBattleTurnArray)
		musicTrobbioButItsTheWorldRevolving.play()

		battlePlayer1 = new Sprite(100, 100, 50, 100, 'k');
		battlePlayer1.image = imgPlayerBattle;

		battlePlayer2 = new Sprite(100, 300, 50, 100, 'k');
		battlePlayer2.image = imgUnkownBattle;

		battleEnemie1 = new Sprite(800, 100, 50, 100, 'k')
        battleEnemie1.image = imgGlorbBattle;

		battleEnemie2 = new Sprite(650, 200, 50, 100, 'k')
        battleEnemie2.image = imgGlorbBattle;

		battleEnemie3 = new Sprite(650, 400, 50, 100, 'k')
        battleEnemie3.image = imgGlorbBattle;

		battleEnemie4 = new Sprite(800, 500, 50, 100, 'k')
        battleEnemie4.image = imgGlorbBattle;

		battleTurnMarker1 = new Sprite(1013, 45, 100, 50)
        battleTurnMarker1.image = imgMerpTurnPlate;

		battleTurnMarker2 = new Sprite(1013, 100, 75, 37.5)
        battleTurnMarker2.image = imgGlorbTurnPlate;
        battleTurnMarker2.image.resize(75, 0)
		
		battleTurnMarker3 = new Sprite(1013, 140, 50, 25)
        battleTurnMarker3.image = imgUnkownTurnPlate;
        battleTurnMarker3.image.resize(50, 0)

		attackButton = new Sprite(70, 170, 15, 15)

		defendButton = new Sprite(90, 170, 15, 15)

		talkButton = new Sprite(110, 170, 15, 15)
		
		spellButton = new Sprite(130, 170, 15, 15)
	}
}
	
/*******************************************************/
// draw()
/*******************************************************/
function draw() {

	if (inBattle === 0) {
		background('#484848'); 

		if (kb.pressing('left')) {
			player.vel.x = -3
		};
		if (kb.pressing ('right')) {
			player.vel.x = 3
		};
		if (kb.pressing ('up')) {
			player.vel.y = -3
		};
		if (kb.pressing ('down')) {
			player.vel.y = 3
		};

		if (kb.released('left')) {
			player.vel.x = 0
		};
		if (kb.released ('right')) {
			player.vel.x = 0
		};
		if (kb.released ('up')) {
			player.vel.y = 0
		};
		if (kb.released ('down')) {
			player.vel.y = 0
		};
	} else {
		background('#ffffff'); 

		textSize(25);
		fill('#000000');
		text("Turn:", 888, 50);
		text(battleButtonHover, 450, 50);

		if (kb.pressing('left')) {
			battleButtonHover = battleButtonHover - 1
		};
		if (kb.pressing ('right')) {
			battleButtonHover = battleButtonHover + 1
		};

		if (battleButtonHover === 1){
			attackButton.color = '#afafaf'
			defendButton.color = '#000000'
			talkButton.color = '#000000'
			spellButton.color = '#000000'
		} else if(battleButtonHover === 2) {
			attackButton.color = '#000000'
			defendButton.color = '#afafaf'
			talkButton.color = '#000000'
			spellButton.color = '#000000'
		} else if (battleButtonHover === 3) {
			attackButton.color = '#000000'
			defendButton.color = '#000000'
			talkButton.color = '#afafaf'
			spellButton.color = '#000000'
		} else if (battleButtonHover === 4) {
			attackButton.color = '#000000'
			defendButton.color = '#000000'
			talkButton.color = '#000000'
			spellButton.color = '#afafaf'
		};

		if (battleButtonHover > 4){
			battleButtonHover = 1
		}
		if (battleButtonHover < 1){
			battleButtonHover = 4
		}

		if (kb.pressing ('x') && battleButtonHover === 1) {
			battleSelectAttack()
		};


	}

	
}

/*******************************************************/
//  END OF APP
/*******************************************************/