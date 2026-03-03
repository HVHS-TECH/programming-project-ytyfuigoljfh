/*******************************************************/
// P5.play: game
// game
// Written by ??
/*******************************************************/
    
/*******************************************************/
// setup()
/*******************************************************/

var inBattle = 0
var inBattleMenu = "base"
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
    badGuy.image = imgGlorbBattle;
    enemiesGroup.add(badGuy);
    enemiesGroup.collides(player, battleStart);

    function battleStart(_badGuy, _player) {
        _badGuy.remove();
        _player.remove();
        mapGroup.remove();
        inBattle = 1
        battleButtonHover = 1
		inBattleMenu === "base"
        battleTotalTurn = 1
        shuffledBattleTurnArray = shuffle(battleTurnArray);
        console.log(shuffledBattleTurnArray)
		battleTurn = shuffledBattleTurnArray[1]
        musicTrobbioButItsTheWorldRevolving.play()

        battlePlayer1 = new Sprite(100, 100, 50, 100, 'k');
        battlePlayer1Type = "Merp";
        battlePlayer1.image = imgPlayerBattle;

        battlePlayer2 = new Sprite(100, 300, 50, 100, 'k');
        battlePlayer2Type = "Unkown";
        battlePlayer2.image = imgUnkownBattle;

        //battlePlayer1 = new Sprite(100, 100, 50, 100, 'k');
        battlePlayer3Type = "Merp";
    //  battlePlayer1.image = imgPlayerBattle;

    //battlePlayer1 = new Sprite(100, 100, 50, 100, 'k');
        battlePlayer4Type = "Unkown";
    //  battlePlayer1.image = imgPlayerBattle;

        battlePlayer2 = new Sprite(100, 300, 50, 100, 'k');
        battlePlayer2Type = "Unkown";
        battlePlayer2.image = imgUnkownBattle;

        battleEnemie1 = new Sprite(800, 100, 50, 100, 'k');
        battleEnemie1Type = "Glorb";
        battleEnemie1.image = imgGlorbBattle;

        battleEnemie2 = new Sprite(650, 200, 50, 100, 'k');
        battleEnemie2Type = "Glorb";
        battleEnemie2.image = imgGlorbBattle;

        battleEnemie3 = new Sprite(650, 400, 50, 100, 'k');
        battleEnemie3Type = "Glorb";
        battleEnemie3.image = imgGlorbBattle;

        battleEnemie4 = new Sprite(800, 500, 50, 100, 'k');
        battleEnemie4Type = "Glorb";
        battleEnemie4.image = imgGlorbBattle;

        if (battlePlayer1Type === "Merp") {
            battlePlayer1TypeImg = imgMerpTurnPlate;
        } else if (battlePlayer1Type === "Unkown") {
            battlePlayer1TypeImg = imgUnkownTurnPlate;
        } else if (battlePlayer1Type === "???") {
            battlePlayer1TypeImg = imgMerpTurnPlate;
        } else if (battlePlayer1Type === "???") {
            battlePlayer1TypeImg = imgUnkownTurnPlate;
        } else if (battlePlayer1Type === "Glorb") {
            battlePlayer1TypeImg = imgGlorbTurnPlate;
        };

        if (battlePlayer2Type === "Merp") {
            battlePlayer2TypeImg = imgMerpTurnPlate;
        } else if (battlePlayer2Type === "Unkown") {
            battlePlayer2TypeImg = imgUnkownTurnPlate;
        } else if (battlePlayer2Type === "???") {
            battlePlayer2TypeImg = imgMerpTurnPlate;
        } else if (battlePlayer2Type === "???") {
            battlePlayer2TypeImg = imgUnkownTurnPlate;
        } else if (battlePlayer2Type === "Glorb") {
            battlePlayer2TypeImg = imgGlorbTurnPlate;
        };

        if (battlePlayer3Type === "Merp") {
            battlePlayer3TypeImg = imgMerpTurnPlate;
        } else if (battlePlayer3Type === "Unkown") {
            battlePlayer3TypeImg = imgUnkownTurnPlate;
        } else if (battlePlayer3Type === "???") {
            battlePlayer3TypeImg = imgMerpTurnPlate;
        } else if (battlePlayer3Type === "???") {
            battlePlayer3TypeImg = imgUnkownTurnPlate;
        } else if (battlePlayer3Type === "Glorb") {
            battlePlayer3TypeImg = imgGlorbTurnPlate;
        };

        if (battlePlayer4Type === "Merp") {
            battlePlayer4TypeImg = imgMerpTurnPlate;
        } else if (battlePlayer4Type === "Unkown") {
            battlePlayer4TypeImg = imgUnkownTurnPlate;
        } else if (battlePlayer4Type === "???") {
            battlePlayer4TypeImg = imgMerpTurnPlate;
        } else if (battlePlayer4Type === "???") {
            battlePlayer4TypeImg = imgUnkownTurnPlate;
        } else if (battlePlayer4Type === "Glorb") {
            battlePlayer4TypeImg = imgGlorbTurnPlate;
        };


        if (battleEnemie1Type === "Merp") {
            battleEnemie1TypeImg = imgMerpTurnPlate;
        } else if (battleEnemie1Type === "Unkown") {
            battleEnemie1TypeImg = imgUnkownTurnPlate;
        } else if (battleEnemie1Type === "???") {
            battleEnemie1TypeImg = imgMerpTurnPlate;
        } else if (battleEnemie1Type === "???") {
            battleEnemie1TypeImg = imgUnkownTurnPlate;
        } else if (battleEnemie1Type === "Glorb") {
            battleEnemie1TypeImg = imgGlorbTurnPlate;
        };


        if (battleEnemie2Type === "Merp") {
            battleEnemie2TypeImg = imgMerpTurnPlate;
        } else if (battleEnemie2Type === "Unkown") {
            battleEnemie2TypeImg = imgUnkownTurnPlate;
        } else if (battleEnemie2Type === "???") {
            battleEnemie2TypeImg = imgMerpTurnPlate;
        } else if (battleEnemie2Type === "???") {
            battleEnemie2TypeImg = imgUnkownTurnPlate;
        } else if (battleEnemie2Type === "Glorb") {
            battleEnemie2TypeImg = imgGlorbTurnPlate;
        };

        if (battleEnemie3Type === "Merp") {
            battleEnemie3TypeImg = imgMerpTurnPlate;
        } else if (battleEnemie3Type === "Unkown") {
            battleEnemie3TypeImg = imgUnkownTurnPlate;
        } else if (battleEnemie3Type === "???") {
            battleEnemie3TypeImg = imgMerpTurnPlate;
        } else if (battleEnemie3Type === "???") {
            battleEnemie3TypeImg = imgUnkownTurnPlate;
        } else if (battleEnemie3Type === "Glorb") {
            battleEnemie3TypeImg = imgGlorbTurnPlate;
        };

        if (battleEnemie4Type === "Merp") {
            battleEnemie4TypeImg = imgMerpTurnPlate;
        } else if (battleEnemie4Type === "Unkown") {
            battleEnemie4TypeImg = imgUnkownTurnPlate;
        } else if (battleEnemie4Type === "???") {
            battleEnemie4TypeImg = imgMerpTurnPlate;
        } else if (battleEnemie4Type === "???") {
            battleEnemie4TypeImg = imgUnkownTurnPlate;
        } else if (battleEnemie4Type === "Glorb") {
            battleEnemie4TypeImg = imgGlorbTurnPlate;
        };


        battleTurnMarker1 = new Sprite(1013, 45, 100, 50, 'k');
        battleTurnMarker1.image = imgMerpTurnPlate;

        battleTurnMarker2 = new Sprite(1013, 100, 75, 37.5, 'k');
        battleTurnMarker2.image = imgGlorbTurnPlate;
        battleTurnMarker2.scale = 0.75;
        
        battleTurnMarker3 = new Sprite(1013, 140, 50, 25, 'k');
        battleTurnMarker3.image = imgUnkownTurnPlate;
        battleTurnMarker3.scale = 0.5;

        attackButton = new Sprite(70, 170, 15, 15, 'k');

        defendButton = new Sprite(90, 170, 15, 15, 'k');

        talkButton = new Sprite(110, 170, 15, 15, 'k');
        
        spellButton = new Sprite(130, 170, 15, 15, 'k');
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

		if(inBattleMenu === "base"){
        	if (kb.pressing('left')) {
       	    	battleButtonHover = battleButtonHover - 1
    	    };
    	    if (kb.pressing ('right')) {
    	        battleButtonHover = battleButtonHover + 1
    	    };
		} else if ( inBattleMenu === "attack"){
			if (kb.pressing('left')) {
        	    battleButtonHover = battleButtonHover - 1
    	    };
        	if (kb.pressing ('right')) {
        	    battleButtonHover = battleButtonHover + 1
        	};
		}

        if (battleButtonHover === 1 && inBattleMenu === "base"){
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
        } else if(inBattleMenu === "attack") {
			attackButton.color = '#afafaf'
            defendButton.color = '#000000'
            talkButton.color = '#000000'
            spellButton.color = '#000000'
		}

		if (battleButtonHover === 1 && inBattleMenu === "attack"){
            attackOption1Button.color = '#afafaf'
            attackOption2Button.color = '#000000'
            attackOption3Button.color = '#000000'
            attackOption4Button.color = '#000000'
			attackOption5Button.color = '#000000'
            attackOption6Button.color = '#000000'
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
        } else if(inBattleMenu === "attack") {
			attackButton.color = '#afafaf'
            defendButton.color = '#000000'
            talkButton.color = '#000000'
            spellButton.color = '#000000'
		}

        if (battleButtonHover > 4){
            battleButtonHover = 1
        }
        if (battleButtonHover < 1){
            battleButtonHover = 4
        }

        if (kb.pressing ('x') && battleButtonHover === 1 && inBattleMenu === "base") {
			inBattleMenu = "attack"
            battleSelectAttack()
        };


        if (shuffledBattleTurnArray[0] === "p1"){
            battleTurnMarker1.image = battlePlayer1TypeImg 
        } else if (shuffledBattleTurnArray[0] === "p2"){
            battleTurnMarker1.image = battlePlayer2TypeImg
        } else if (shuffledBattleTurnArray[0] === "p3"){
            battleTurnMarker1.image = battlePlayer3TypeImg
        } else if (shuffledBattleTurnArray[0] === "p4"){
            battleTurnMarker1.image =  battlePlayer4TypeImg
        } else if (shuffledBattleTurnArray[0] === "e1"){
            battleTurnMarker1.image = battleEnemie1TypeImg
        } else if (shuffledBattleTurnArray[0] === "e2"){
            battleTurnMarker1.image = battleEnemie2TypeImg
        } else if (shuffledBattleTurnArray[0] === "e3"){
            battleTurnMarker1.image =  battleEnemie3TypeImg
        } else if (shuffledBattleTurnArray[0] === "e4"){
            battleTurnMarker1.image =  battleEnemie4TypeImg
        };

        if (shuffledBattleTurnArray[1] === "p1"){
            battleTurnMarker2.image = battlePlayer1TypeImg 
        } else if (shuffledBattleTurnArray[1] === "p2"){
            battleTurnMarker2.image = battlePlayer2TypeImg
        } else if (shuffledBattleTurnArray[1] === "p3"){
            battleTurnMarker2.image = battlePlayer3TypeImg
        } else if (shuffledBattleTurnArray[1] === "p4"){
            battleTurnMarker2.image =  battlePlayer4TypeImg
        } else if (shuffledBattleTurnArray[1] === "e1"){
            battleTurnMarker2.image = battleEnemie1TypeImg
        } else if (shuffledBattleTurnArray[1] === "e2"){
            battleTurnMarker2.image = battleEnemie2TypeImg
        } else if (shuffledBattleTurnArray[1] === "e3"){
            battleTurnMarker2.image =  battleEnemie3TypeImg
        } else if (shuffledBattleTurnArray[1] === "e4"){
            battleTurnMarker2.image =  battleEnemie4TypeImg
        };

        if (shuffledBattleTurnArray[2] === "p1"){
            battleTurnMarker3.image = battlePlayer1TypeImg 
        } else if (shuffledBattleTurnArray[2] === "p2"){
            battleTurnMarker3.image = battlePlayer2TypeImg
        } else if (shuffledBattleTurnArray[2] === "p3"){
            battleTurnMarker3.image = battlePlayer3TypeImg
        } else if (shuffledBattleTurnArray[2] === "p4"){
            battleTurnMarker3.image =  battlePlayer4TypeImg
        } else if (shuffledBattleTurnArray[2] === "e1"){
            battleTurnMarker3.image = battleEnemie1TypeImg
        } else if (shuffledBattleTurnArray[2] === "e2"){
            battleTurnMarker3.image = battleEnemie2TypeImg
        } else if (shuffledBattleTurnArray[2] === "e3"){
            battleTurnMarker3.image =  battleEnemie3TypeImg
        } else if (shuffledBattleTurnArray[2] === "e4"){
            battleTurnMarker3.image =  battleEnemie4TypeImg
        };


    }

    
}

function battleSelectAttack(){
	attackOption1Button = new Sprite(200, 75, 70, 20, 'k');
	attackOption1Button.color = '#000000'

	attackOption2Button = new Sprite(200, 110, 70, 20, 'k');
	attackOption2Button.color = '#000000'

	attackOption3Button = new Sprite(200, 145, 70, 20, 'k');
	attackOption3Button.color = '#000000'

	attackOption4Button = new Sprite(280, 75, 70, 20, 'k');
	attackOption4Button.color = '#000000'

	attackOption5Button = new Sprite(280, 110, 70, 20, 'k');
	attackOption5Button.color = '#000000'

	attackOption6Button = new Sprite(280, 145, 70, 20, 'k');
	attackOption6Button.color = '#000000'
}

/*******************************************************/
//  END OF APP
/*******************************************************/