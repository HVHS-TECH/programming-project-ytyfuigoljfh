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
var battleTotalTurn = 0
var battleTurnArray = ['p1', 'p2', 'p3', 'p4', 'e1', 'e2', 'e3', 'e4']
var battleChosenMove = "defend"
var shuffledBattleTurnArray = shuffle(battleTurnArray);
var battleButtonHover = 1


preload()
    function preload() {
    imgFace = loadImage('assets/images/Merp.svg');
    imgPlayerBattle = loadImage('assets/images/MerpBattle.svg');
    imgUnkownBattle = loadImage('assets/images/UnkownBattle.svg');
    imgGlorbBattle = loadImage('assets/images/GlorbBattleIdle.svg');
    imgTrueSaviorBattle = loadImage('assets/images/TrueSaviorBattleIdle.svg');
    imgDugBattle = loadImage('assets/images/DugBattleIdle.svg');
    imgDugBattleAttack = loadImage('assets/images/DugBattleAttack.svg');
    imgMerpTurnPlate = loadImage('assets/images/turnPlates/MerpTurnPlate.svg');
    imgUnkownTurnPlate = loadImage('assets/images/turnPlates/UnkownTurnPlate.svg');
    imgGlorbTurnPlate = loadImage('assets/images/turnPlates/GlorbTurnPlate.svg');
    imgTrueSaviorTurnPlate = loadImage('assets/images/turnPlates/TrueSaviorTurnPlate.svg');

    imgAttackButtonOff = loadImage('assets/images/buttons/base/AttackButton1.svg');
    imgAttackButtonOn = loadImage('assets/images/buttons/base/AttackButton2.svg');
    imgDefendButtonOff = loadImage('assets/images/buttons/base/DefendButton1.svg');
    imgDefendButtonOn = loadImage('assets/images/buttons/base/DefendButton2.svg');
    imgTalkButtonOff = loadImage('assets/images/buttons/base/TalkButton1.svg');
    imgTalkButtonOn = loadImage('assets/images/buttons/base/TalkButton2.svg');
    imgSpellButtonOff = loadImage('assets/images/buttons/base/SpellButton1.svg');
    imgSpellButtonOn = loadImage('assets/images/buttons/base/SpellButton2.svg');

    musicTrobbioButItsTheWorldRevolving = loadSound('assets/audio/music/Trobbio_but_its_THE_WORLD_REVOLVING__Tarro57.mp3')
    musicDeltaruneUstEverAscending = loadSound('assets/audio/music/Deltarune_UST__Ever_Ascending_lexxiemow.mp3')
}


function setup() {
    console.log("setup: ");

    cnv = new Canvas(1088 , 612);

    var merpHP = 30;
    var merpMaxHP = 30;
    var unkownHP = 35;
    var unkownMaxHP = 35;

    var defaultGlorbMaxHP = 40
    var defaultDugMaxHP = 15
    var defaultTrueSaviorMaxHP = 200

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
    badGuy.collides(player, preBattleStart1);

    badGuy2 = new Sprite(700, 206, 50, 100, 'd');
    badGuy2.image = imgTrueSaviorBattle;
    enemiesGroup.add(badGuy2);
    badGuy2.collides(player, preBattleStart2);

    badGuy3 = new Sprite(100, 306, 50, 100, 'd');
    badGuy3.image = imgDugBattle;
    enemiesGroup.add(badGuy3);
    badGuy3.collides(player, preBattleStart3);

    function preBattleStart1(){
        enemiesAndPlayersInBattleArray = ['p1', 'p2', 'e1', 'e2', 'e3', 'e4']
        battleStart(badGuy, player, "Merp", 100, 100, merpMaxHP, merpHP, imgPlayerBattle, "Unkown", 100, 300, unkownMaxHP, unkownHP, imgUnkownBattle, "no", 0, 0, 0, 0, imgPlayerBattle, "no", 0, 0, 0, 0, imgPlayerBattle, "Glorb", 800, 100, defaultGlorbMaxHP, defaultGlorbMaxHP, imgGlorbBattle, "Glorb", 650, 200, defaultGlorbMaxHP, defaultGlorbMaxHP, imgGlorbBattle, "Glorb", 650, 400, defaultGlorbMaxHP, defaultGlorbMaxHP, imgGlorbBattle, "Glorb", 800, 500, defaultGlorbMaxHP, defaultGlorbMaxHP, imgGlorbBattle, "normal", musicTrobbioButItsTheWorldRevolving)
    };

    function preBattleStart2(){
        enemiesAndPlayersInBattleArray = ['p1', 'p2', 'e1']
        battleStart(badGuy, player, "Merp", 100, 100, merpMaxHP, merpHP, imgPlayerBattle, "Unkown", 100, 300, unkownMaxHP, unkownHP, imgUnkownBattle, "no", 0, 0, 0, 0, imgPlayerBattle, "no", 0, 0, 0, 0, imgPlayerBattle, "TrueSavior", 800, 306, defaultTrueSaviorMaxHP, defaultTrueSaviorMaxHP, imgTrueSaviorBattle, "no", 0, 0, 0, 0, imgPlayerBattle, "no", 0, 0, 0, 0, imgPlayerBattle, "no", 0, 0, 0, 0, imgPlayerBattle, "boss", musicDeltaruneUstEverAscending)
    };

    function preBattleStart3(){
        enemiesAndPlayersInBattleArray = ['p1', 'p2', 'e1', 'e2']
        battleStart(badGuy, player, "Merp", 100, 100, merpMaxHP, merpHP, imgPlayerBattle, "Unkown", 100, 300, unkownMaxHP, unkownHP, imgUnkownBattle, "no", 0, 0, 0, 0, imgPlayerBattle, "no", 0, 0, 0, 0, imgPlayerBattle, "Dug", 750, 200, defaultDugMaxHP, defaultDugMaxHP, imgDugBattle, "Dug", 750, 400, defaultDugMaxHP, defaultDugMaxHP, imgDugBattle, "no", 0, 0, 0, 0, imgPlayerBattle, "no", 0, 0, 0, 0, imgPlayerBattle, "normal", musicTrobbioButItsTheWorldRevolving)
    };

    function battleStart(_badGuy, _player, p1Type, p1X, p1Y, p1MaxHp, p1HP, p1Img, p2Type, p2X, p2Y, p2MaxHp, p2HP, p2Img, p3Type, p3X, p3Y, p3MaxHp, p3HP, p3Img, p4Type, p4X, p4Y, p4MaxHp, p4HP, p4Img, e1Type, e1X, e1Y, e1MaxHp, e1HP, e1Img, e2Type, e2X, e2Y, e2MaxHp, e2HP, e2Img, e3Type, e3X, e3Y, e3MaxHp, e3HP, e3Img, e4Type, e4X, e4Y, e4MaxHp, e4HP, e4Img, battleType, music) {
        _badGuy.remove();
        _player.remove();
        mapGroup.remove();
        enemiesGroup.remove();
        inBattle = 1
        battleMusic = music
        battleButtonHover = 1
		inBattleMenu === "base"
        battleTotalTurn = 0
        shuffledBattleTurnArray = shuffle(battleTurnArray);

        if (!enemiesAndPlayersInBattleArray.includes('p1')){
            shuffledBattleTurnArrayP1Place = shuffledBattleTurnArray.indexOf('p1')
            shuffledBattleTurnArray.splice(shuffledBattleTurnArrayP1Place, 1)
        };
        if (!enemiesAndPlayersInBattleArray.includes('p2')){
            shuffledBattleTurnArrayP2Place = shuffledBattleTurnArray.indexOf('p2')
            shuffledBattleTurnArray.splice(shuffledBattleTurnArrayP2Place, 1)
        };
        if (!enemiesAndPlayersInBattleArray.includes('p3')){
            shuffledBattleTurnArrayP3Place = shuffledBattleTurnArray.indexOf('p3')
            shuffledBattleTurnArray.splice(shuffledBattleTurnArrayP3Place, 1)
        };
        if (!enemiesAndPlayersInBattleArray.includes('p4')){
            shuffledBattleTurnArrayP4Place = shuffledBattleTurnArray.indexOf('p4')
            shuffledBattleTurnArray.splice(shuffledBattleTurnArrayP4Place, 1)
        };
        if (!enemiesAndPlayersInBattleArray.includes('e1')){
            shuffledBattleTurnArrayE1Place = shuffledBattleTurnArray.indexOf('e1')
            shuffledBattleTurnArray.splice(shuffledBattleTurnArrayE1Place, 1)
        };
        if (!enemiesAndPlayersInBattleArray.includes('e2')){
            shuffledBattleTurnArrayE2Place = shuffledBattleTurnArray.indexOf('e2')
            shuffledBattleTurnArray.splice(shuffledBattleTurnArrayE2Place, 1)
        };
        if (!enemiesAndPlayersInBattleArray.includes('e3')){
            shuffledBattleTurnArrayE3Place = shuffledBattleTurnArray.indexOf('e3')
            shuffledBattleTurnArray.splice(shuffledBattleTurnArrayE3Place, 1)
        };
        if (!enemiesAndPlayersInBattleArray.includes('e4')){
            shuffledBattleTurnArrayE4Place = shuffledBattleTurnArray.indexOf('e4')
            shuffledBattleTurnArray.splice(shuffledBattleTurnArrayE4Place, 1)
        };

        battleAlivePlayersArray = shuffledBattleTurnArray.slice(0)
        if (battleAlivePlayersArray.includes('e1')){
            battleAlivePlayersArray.splice(battleAlivePlayersArray.indexOf('e1'), 1)
        };
        if (battleAlivePlayersArray.includes('e2')){
            battleAlivePlayersArray.splice(battleAlivePlayersArray.indexOf('e2'), 1)
        };
        if (battleAlivePlayersArray.includes('e3')){
            battleAlivePlayersArray.splice(battleAlivePlayersArray.indexOf('e3'), 1)
        };
        if (battleAlivePlayersArray.includes('e4')){
            battleAlivePlayersArray.splice(battleAlivePlayersArray.indexOf('e4'), 1)
        };

        console.log(shuffledBattleTurnArray)
		battleTurn = shuffledBattleTurnArray[1]
        battleMusic.loop()

        battlePlayer1 = new Sprite(p1X, p1Y, 50, 100, 'k');
        battlePlayer1Type = p1Type;
        battlePlayer1State = "idle";
        battlePlayer1MaxHP = p1MaxHp;
        battlePlayer1HP = p1HP;
        battlePlayer1.image = p1Img;

        battlePlayer1HPBarRed = new Sprite(p1X, (p1Y - 70), 100, 10, 'k');
        battlePlayer1HPBarRed.color = '#720000'
        battlePlayer1HPBarGreen = new Sprite(p1X, (p1Y - 70), battlePlayer1HP * (100/battlePlayer1MaxHP), 10, 'k');
        battlePlayer1HPBarGreen.color = '#30ff7f'
        battlePlayer1HPBarRed.visible = false;
        battlePlayer1HPBarGreen.visible = false;


        battlePlayer2 = new Sprite(p2X, p2Y, 50, 100, 'k');
        battlePlayer2Type = p2Type;
        battlePlayer2State = "idle";
        battlePlayer2MaxHP = p2MaxHp;
        battlePlayer2HP = p2HP;
        battlePlayer2.image = p2Img;

        battlePlayer2HPBarRed = new Sprite(p2X, (p2Y - 70), 100, 10, 'k');
        battlePlayer2HPBarRed.color = '#720000'
        battlePlayer2HPBarGreen = new Sprite(p2X, (p2Y - 70), battlePlayer2HP * (100/battlePlayer2MaxHP), 10, 'k');
        battlePlayer2HPBarGreen.color = '#30ff7f'
        battlePlayer2HPBarRed.visible = false;
        battlePlayer2HPBarGreen.visible = false;

        //battlePlayer1 = new Sprite(100, 100, 50, 100, 'k');
        battlePlayer3Type = p3Type;
        battlePlayer3State = "idle";
        battlePlayer3MaxHP = p3MaxHp;
        battlePlayer3HP = p3HP;
    //  battlePlayer1.image = imgPlayerBattle;

        //battlePlayer1 = new Sprite(100, 100, 50, 100, 'k');
        battlePlayer4Type = p4Type;
        battlePlayer4State = "idle";
        battlePlayer4MaxHP = p4MaxHp;
        battlePlayer4HP = p4HP;
    //  battlePlayer4.image = imgPlayerBattle;

        battleEnemie1 = new Sprite(e1X, e1Y, 50, 100, 'k');
        battleEnemie1Type = e1Type;
        battleEnemie1State = "idle";
        battleEnemie1MaxHP = e1MaxHp;
        battleEnemie1HP = e1HP;
        battleEnemie1.image = e1Img;

        battleEnemie1HPBarRed = new Sprite(e1X, (e1Y - 70), 100, 10, 'k');
        battleEnemie1HPBarRed.color = '#720000'
        battleEnemie1HPBarGreen = new Sprite(e1X, (e1Y - 70), battleEnemie1HP * (100/battleEnemie1MaxHP), 10, 'k');
        battleEnemie1HPBarGreen.color = '#30ff7f'
        battleEnemie1HPBarRed.visible = false;
        battleEnemie1HPBarGreen.visible = false;


        battleEnemie2 = new Sprite(e2X, e2Y, 50, 100, 'k');
        battleEnemie2Type = e2Type;
        battleEnemie2State = "idle";
        battleEnemie2MaxHP = e2MaxHp;
        battleEnemie2HP = e2HP;
        battleEnemie2.image = e2Img;

        battleEnemie2HPBarRed = new Sprite(e2X, (e2Y - 70), 100, 10, 'k');
        battleEnemie2HPBarRed.color = '#720000'
        battleEnemie2HPBarGreen = new Sprite(e2X, (e2Y - 70), battleEnemie2HP * (100/battleEnemie2MaxHP), 10, 'k');
        battleEnemie2HPBarGreen.color = '#30ff7f'
        battleEnemie2HPBarRed.visible = false;
        battleEnemie2HPBarGreen.visible = false;


        battleEnemie3 = new Sprite(e3X, e3Y, 50, 100, 'k');
        battleEnemie3Type = e3Type;
        battleEnemie3State = "idle";
        battleEnemie3MaxHP = e3MaxHp;
        battleEnemie3HP = e3HP;
        battleEnemie3.image = e3Img;

        battleEnemie3HPBarRed = new Sprite(e3X, (e3Y - 70), 100, 10, 'k');
        battleEnemie3HPBarRed.color = '#720000'
        battleEnemie3HPBarGreen = new Sprite(e3X, (e3Y - 70), battleEnemie3HP * (100/battleEnemie3MaxHP), 10, 'k');
        battleEnemie3HPBarGreen.color = '#30ff7f'
        battleEnemie3HPBarRed.visible = false;
        battleEnemie3HPBarGreen.visible = false;


        battleEnemie4 = new Sprite(e4X, e4Y, 50, 100, 'k');
        battleEnemie4Type = e4Type;
        battleEnemie4State = "idle";
        battleEnemie4MaxHP = e4MaxHp;
        battleEnemie4HP = e4HP;
        battleEnemie4.image = e4Img;

        battleEnemie4HPBarRed = new Sprite(e4X, (e4Y - 70), 100, 10, 'k');
        battleEnemie4HPBarRed.color = '#720000'
        battleEnemie4HPBarGreen = new Sprite(e4X, (e4Y - 70), battleEnemie4HP * (100/battleEnemie4MaxHP), 10, 'k');
        battleEnemie4HPBarGreen.color = '#30ff7f'
        battleEnemie4HPBarRed.visible = false;
        battleEnemie4HPBarGreen.visible = false;


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
        } else if (battlePlayer1Type === "TrueSavior") {
            battlePlayer1TypeImg = imgTrueSaviorTurnPlate;
        } else if (battlePlayer1Type === "Dug") {
            battlePlayer1TypeImg = imgTrueSaviorTurnPlate;
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
        } else if (battlePlayer2Type === "TrueSavior") {
            battlePlayer2TypeImg = imgTrueSaviorTurnPlate;
        } else if (battlePlayer2Type === "Dug") {
            battlePlayer2TypeImg = imgTrueSaviorTurnPlate;
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
        } else if (battlePlayer3Type === "TrueSavior") {
            battlePlayer3TypeImg = imgTrueSaviorTurnPlate;
        } else if (battlePlayer3Type === "Dug") {
            battlePlayer3TypeImg = imgTrueSaviorTurnPlate;
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
        } else if (battlePlayer4Type === "TrueSavior") {
            battlePlayer4TypeImg = imgTrueSaviorTurnPlate;
        } else if (battlePlayer4Type === "Dug") {
            battlePlayer4TypeImg = imgTrueSaviorTurnPlate;
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
        } else if (battleEnemie1Type === "TrueSavior") {
            battleEnemie1TypeImg = imgTrueSaviorTurnPlate;
        } else if (battleEnemie1Type === "Dug") {
            battleEnemie1TypeImg = imgTrueSaviorTurnPlate;
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
        } else if (battleEnemie2Type === "TrueSavior") {
            battleEnemie2TypeImg = imgTrueSaviorTurnPlate;
        } else if (battleEnemie2Type === "Dug") {
            battleEnemie2TypeImg = imgTrueSaviorTurnPlate;
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
        } else if (battleEnemie3Type === "TrueSavior") {
            battleEnemie3TypeImg = imgTrueSaviorTurnPlate;
        } else if (battleEnemie3Type === "Dug") {
            battleEnemie3TypeImg = imgTrueSaviorTurnPlate;
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
        } else if (battleEnemie4Type === "TrueSavior") {
            battleEnemie4TypeImg = imgTrueSaviorTurnPlate;
        } else if (battleEnemie4Type === "Dug") {
            battleEnemie4TypeImg = imgTrueSaviorTurnPlate;
        };


        battleTurnMarker1 = new Sprite(1013, 45, 100, 50, 'k');
        battleTurnMarker1.image = imgMerpTurnPlate;

        battleTurnMarker2 = new Sprite(1013, 100, 75, 37.5, 'k');
        battleTurnMarker2.image = imgGlorbTurnPlate;
        battleTurnMarker2.scale = 0.75;
        
        battleTurnMarker3 = new Sprite(1013, 140, 50, 25, 'k');
        battleTurnMarker3.image = imgUnkownTurnPlate;
        battleTurnMarker3.scale = 0.5;

        startTurn()
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
        text(battleTotalTurn, 500, 50);
        text(battleChosenMove, 450, 100);

        battlePlayer1HPBarGreen.width = battlePlayer1HP * (100/battlePlayer1MaxHP);
        battlePlayer2HPBarGreen.width = battlePlayer2HP * (100/battlePlayer2MaxHP);

        battleEnemie1HPBarGreen.width = battleEnemie1HP * (100/battleEnemie1MaxHP);
        battleEnemie2HPBarGreen.width = battleEnemie2HP * (100/battleEnemie2MaxHP);
        battleEnemie3HPBarGreen.width = battleEnemie3HP * (100/battleEnemie3MaxHP);
        battleEnemie4HPBarGreen.width = battleEnemie4HP * (100/battleEnemie4MaxHP);


        if(battleEnemie1HP === 0){
            battleEnemie1.visible = false
            if(shuffledBattleTurnArray.includes('e1')){
                shuffledBattleTurnArray.splice(shuffledBattleTurnArray.indexOf('e1'), 1)
            };
        };

        if(battleEnemie2HP === 0){
            battleEnemie2.visible = false
            if(shuffledBattleTurnArray.includes('e2')){
                shuffledBattleTurnArray.splice(shuffledBattleTurnArray.indexOf('e2'), 1)
            };
        };

        if(battleEnemie3HP === 0){
            battleEnemie3.visible = false
            if(shuffledBattleTurnArray.includes('e3')){
                shuffledBattleTurnArray.splice(shuffledBattleTurnArray.indexOf('e3'), 1)
            };
        };

        if(battleEnemie4HP === 0){
            battleEnemie4.visible = false
            if(shuffledBattleTurnArray.includes('e4')){
                shuffledBattleTurnArray.splice(shuffledBattleTurnArray.indexOf('e4'), 1)
            };
        };

        if(battlePlayer1HP <= 0){
            if(battleAlivePlayersArray.includes('p1')){
                battleAlivePlayersArray.splice(battleAlivePlayersArray.indexOf('p1'), 1)
            };
        };

        if(battlePlayer2HP <= 0){
            if(battleAlivePlayersArray.includes('p2')){
                battleAlivePlayersArray.splice(battleAlivePlayersArray.indexOf('p2'), 1)
            };
        };

		
        if (kb.pressed ('e')) {
            endTurn();
        };

        if (kb.pressing ('h')) {
            battlePlayer1HPBarRed.visible = true;
            battlePlayer1HPBarGreen.visible = true;
            battlePlayer2HPBarRed.visible = true;
            battlePlayer2HPBarGreen.visible = true;
            battleEnemie1HPBarRed.visible = true;
            battleEnemie1HPBarGreen.visible = true;
            battleEnemie2HPBarRed.visible = true;
            battleEnemie2HPBarGreen.visible = true;
            battleEnemie3HPBarRed.visible = true;
            battleEnemie3HPBarGreen.visible = true;
            battleEnemie4HPBarRed.visible = true;
            battleEnemie4HPBarGreen.visible = true;
        } else {
            //battlePlayer1HPBarRed.visible = false;
            //battlePlayer1HPBarGreen.visible = false;
            //battlePlayer2HPBarRed.visible = false;
            //battlePlayer2HPBarGreen.visible = false;
            //battleEnemie1HPBarRed.visible = false;
            //battleEnemie1HPBarGreen.visible = false;
            //battleEnemie2HPBarRed.visible = false;
            //battleEnemie2HPBarGreen.visible = false;
            //battleEnemie3HPBarRed.visible = false;
            //battleEnemie3HPBarGreen.visible = false;
            //battleEnemie4HPBarRed.visible = false;
            //battleEnemie4HPBarGreen.visible = false;
        }

        if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p1" || shuffledBattleTurnArray[0 + battleTotalTurn] === "p2"){

            if(inBattleMenu === "base"){
                if (kb.pressed('left')) {
                    battleButtonHover = battleButtonHover - 1
                };
                if (kb.pressed ('right')) {
                    battleButtonHover = battleButtonHover + 1
                };
            } else if ( inBattleMenu === "attack"){
                if (kb.pressed('left')) {
                    battleButtonHover = battleButtonHover - 1
                };
                if (kb.pressed ('right')) {
                    battleButtonHover = battleButtonHover + 1
                };
                if (kb.pressed('up')) {
                    battleButtonHover = battleButtonHover - 2
                };
                if (kb.pressed ('down')) {
                    battleButtonHover = battleButtonHover + 2
                };
            } else if ( inBattleMenu === "spells"){
                if (kb.pressed('left')) {
                    battleButtonHover = battleButtonHover - 1
                };
                if (kb.pressed ('right')) {
                    battleButtonHover = battleButtonHover + 1
                };
                if (kb.pressed('up')) {
                    battleButtonHover = battleButtonHover - 1
                };
                if (kb.pressed ('down')) {
                    battleButtonHover = battleButtonHover + 1
                };
            } else if ( inBattleMenu === "talk"){
                if (kb.pressed('left')) {
                    battleButtonHover = battleButtonHover - 1
                };
                if (kb.pressed ('right')) {
                    battleButtonHover = battleButtonHover + 1
                };
                if (kb.pressed('up')) {
                    battleButtonHover = battleButtonHover - 1
                };
                if (kb.pressed ('down')) {
                    battleButtonHover = battleButtonHover + 1
                };
            } else if ( inBattleMenu === "choseEnemie"){
                if (kb.pressed('left')) {
                    changeBattleButtonHoverEnemie(-1)
                };
                if (kb.pressed ('right')) {
                    changeBattleButtonHoverEnemie(1)
                };
                if (kb.pressed('up')) {
                    changeBattleButtonHoverEnemie(-1)
                };
                if (kb.pressed ('down')) {
                    changeBattleButtonHoverEnemie(1)
                };
            };

            if (battleButtonHover === 1 && inBattleMenu === "base"){
                attackButton.image = imgAttackButtonOn;
                defendButton.image = imgDefendButtonOff;
                talkButton.image = imgTalkButtonOff;
                spellButton.image = imgSpellButtonOff;
            } else if(battleButtonHover === 2 && inBattleMenu === "base") {
                attackButton.image = imgAttackButtonOff;
                defendButton.image = imgDefendButtonOn;
                talkButton.image = imgTalkButtonOff;
                spellButton.image = imgSpellButtonOff;
            } else if (battleButtonHover === 3 && inBattleMenu === "base") {
                attackButton.image = imgAttackButtonOff;
                defendButton.image = imgDefendButtonOff;
                talkButton.image = imgTalkButtonOn;
                spellButton.image = imgSpellButtonOff;
            } else if (battleButtonHover === 4 && inBattleMenu === "base") {
                attackButton.image = imgAttackButtonOff;
                defendButton.image = imgDefendButtonOff;
                talkButton.image = imgTalkButtonOff;
                spellButton.image = imgSpellButtonOn;
            } else if(inBattleMenu === "attack") {
                attackButton.image = imgAttackButtonOn;
                defendButton.image = imgDefendButtonOff;
                talkButton.image = imgTalkButtonOff;
                spellButton.image = imgSpellButtonOff;
            } else if(inBattleMenu === "talk") {
                attackButton.image = imgAttackButtonOff;
                defendButton.image = imgDefendButtonOff;
                talkButton.image = imgTalkButtonOn;
                spellButton.image = imgSpellButtonOff;
            } else if(inBattleMenu === "spells") {
                attackButton.image = imgAttackButtonOff;
                defendButton.image = imgDefendButtonOff;
                talkButton.image = imgTalkButtonOff;
                spellButton.image = imgSpellButtonOn;
            };

            if (battleButtonHover === 1 && inBattleMenu === "attack"){
                attackOption1Button.color = '#afafaf'
                attackOption2Button.color = '#000000'
                attackOption3Button.color = '#000000'
                attackOption4Button.color = '#000000'
                attackOption5Button.color = '#000000'
                attackOption6Button.color = '#000000'
            } else if(battleButtonHover === 2 && inBattleMenu === "attack") {
                attackOption1Button.color = '#000000'
                attackOption2Button.color = '#afafaf'
                attackOption3Button.color = '#000000'
                attackOption4Button.color = '#000000'
                attackOption5Button.color = '#000000'
                attackOption6Button.color = '#000000'
            } else if (battleButtonHover === 3 && inBattleMenu === "attack") {
                attackOption1Button.color = '#000000'
                attackOption2Button.color = '#000000'
                attackOption3Button.color = '#afafaf'
                attackOption4Button.color = '#000000'
                attackOption5Button.color = '#000000'
                attackOption6Button.color = '#000000'
            } else if (battleButtonHover === 4 && inBattleMenu === "attack") {
                attackOption1Button.color = '#000000'
                attackOption2Button.color = '#000000'
                attackOption3Button.color = '#000000'
                attackOption4Button.color = '#afafaf'
                attackOption5Button.color = '#000000'
                attackOption6Button.color = '#000000'
            } else if(battleButtonHover === 5 && inBattleMenu === "attack") {
                attackOption1Button.color = '#000000'
                attackOption2Button.color = '#000000'
                attackOption3Button.color = '#000000'
                attackOption4Button.color = '#000000'
                attackOption5Button.color = '#afafaf'
                attackOption6Button.color = '#000000'
            } else if(battleButtonHover === 6 && inBattleMenu === "attack") {
                attackOption1Button.color = '#000000'
                attackOption2Button.color = '#000000'
                attackOption3Button.color = '#000000'
                attackOption4Button.color = '#000000'
                attackOption5Button.color = '#000000'
                attackOption6Button.color = '#afafaf'
            }

            if (battleButtonHover === 1 && inBattleMenu === "spells"){
                spellOption1Button.color = '#afafaf'
                spellOption2Button.color = '#000000'
                spellOption3Button.color = '#000000'
            } else if(battleButtonHover === 2 && inBattleMenu === "spells") {
                spellOption1Button.color = '#000000'
                spellOption2Button.color = '#afafaf'
                spellOption3Button.color = '#000000'
            } else if (battleButtonHover === 3 && inBattleMenu === "spells") {
                spellOption1Button.color = '#000000'
                spellOption2Button.color = '#000000'
                spellOption3Button.color = '#afafaf'
            }

            if (battleButtonHover === 1 && inBattleMenu === "talk"){
                talkOption1Button.color = '#afafaf'
                talkOption2Button.color = '#000000'
                talkOption3Button.color = '#000000'
            } else if(battleButtonHover === 2 && inBattleMenu === "talk") {
                talkOption1Button.color = '#000000'
                talkOption2Button.color = '#afafaf'
                talkOption3Button.color = '#000000'
            } else if (battleButtonHover === 3 && inBattleMenu === "talk") {
                talkOption1Button.color = '#000000'
                talkOption2Button.color = '#000000'
                talkOption3Button.color = '#afafaf'
            }

            if (battleButtonHover === 1 && inBattleMenu === "choseEnemie"){
                battleEnemie1HPBarGreen.visible = true;
                battleEnemie1HPBarRed.visible = true;
                battleEnemie2HPBarGreen.visible = false;
                battleEnemie2HPBarRed.visible = false;
                battleEnemie3HPBarGreen.visible = false;
                battleEnemie3HPBarRed.visible = false;
                battleEnemie4HPBarGreen.visible = false;
                battleEnemie4HPBarRed.visible = false;
                battleEnemie1.tint = 255
                battleEnemie2.tint = 155
                battleEnemie3.tint = 155
                battleEnemie4.tint = 155
            } else if(battleButtonHover === 2 && inBattleMenu === "choseEnemie") {
                battleEnemie1HPBarGreen.visible = false;
                battleEnemie1HPBarRed.visible = false;
                battleEnemie2HPBarGreen.visible = true;
                battleEnemie2HPBarRed.visible = true;
                battleEnemie3HPBarGreen.visible = false;
                battleEnemie3HPBarRed.visible = false;
                battleEnemie4HPBarGreen.visible = false;
                battleEnemie4HPBarRed.visible = false;
                battleEnemie1.tint = 155
                battleEnemie2.tint = 255
                battleEnemie3.tint = 155
                battleEnemie4.tint = 155
            } else if (battleButtonHover === 3 && inBattleMenu === "choseEnemie") {
                battleEnemie1HPBarGreen.visible = false;
                battleEnemie1HPBarRed.visible = false;
                battleEnemie2HPBarGreen.visible = false;
                battleEnemie2HPBarRed.visible = false;
                battleEnemie3HPBarGreen.visible = true;
                battleEnemie3HPBarRed.visible = true;
                battleEnemie4HPBarGreen.visible = false;
                battleEnemie4HPBarRed.visible = false;
                battleEnemie1.tint = 155
                battleEnemie2.tint = 155
                battleEnemie3.tint = 255
                battleEnemie4.tint = 155
            } else if (battleButtonHover === 4 && inBattleMenu === "choseEnemie") {
                battleEnemie1HPBarGreen.visible = false;
                battleEnemie1HPBarRed.visible = false;
                battleEnemie2HPBarGreen.visible = false;
                battleEnemie2HPBarRed.visible = false;
                battleEnemie3HPBarGreen.visible = false;
                battleEnemie3HPBarRed.visible = false;
                battleEnemie4HPBarGreen.visible = true;
                battleEnemie4HPBarRed.visible = true;
                battleEnemie1.tint = 155
                battleEnemie2.tint = 155
                battleEnemie3.tint = 155
                battleEnemie4.tint = 255
            }

            if (inBattleMenu === "base"){
                if (battleButtonHover > 4){
                    battleButtonHover = 1
                }
                if (battleButtonHover < 1){
                    battleButtonHover = 4
                }
            } else if (inBattleMenu === "attack"){
                if (battleButtonHover === 8){
                    battleButtonHover = 2
                } else if (battleButtonHover > 6){
                    battleButtonHover = 1
                }
                if (battleButtonHover < 1){
                    battleButtonHover = 6
                }
            } else if (inBattleMenu === "spells"){
                if (battleButtonHover > 3){
                    battleButtonHover = 1
                }
                if (battleButtonHover < 1){
                    battleButtonHover = 3
                }
            } else if (inBattleMenu === "talk"){
                if (battleButtonHover > 3){
                    battleButtonHover = 1
                }
                if (battleButtonHover < 1){
                    battleButtonHover = 3
                }
            } else if (inBattleMenu === "choseEnemie"){
                if (battleButtonHover > 4){
                    battleButtonHover = 0
                    changeBattleButtonHoverEnemie(1)
                }
                if (battleButtonHover < 1){
                    battleButtonHover = 5
                    changeBattleButtonHoverEnemie(-1)
                }
            };


            if (kb.pressed ('z') && battleButtonHover === 1 && inBattleMenu === "choseEnemie") {
                battleBackAttack()
                battleBackBase()
                halfEndTurn()
                attackEnemie("e1")
            };

            if (kb.pressed ('z') && battleButtonHover === 2 && inBattleMenu === "choseEnemie") {
                battleBackAttack()
                battleBackBase()
                halfEndTurn()
                attackEnemie("e2")
            };

            if (kb.pressed ('z') && battleButtonHover === 3 && inBattleMenu === "choseEnemie") {
                battleBackAttack()
                battleBackBase()
                halfEndTurn()
                attackEnemie("e3")
            };

            if (kb.pressed ('z') && battleButtonHover === 4 && inBattleMenu === "choseEnemie") {
                battleBackAttack()
                battleBackBase()
                halfEndTurn()
                attackEnemie("e4")
            };

            if (kb.pressed ('z') && battleButtonHover === 1 && inBattleMenu === "attack") {
                battleChosenMove = "attack1"
                inBattleMenu = "choseEnemie"
                battleButtonHover = 0
                changeBattleButtonHoverEnemie(1)
                choseEnemieToAttack()
            };

            if (kb.pressed ('z') && battleButtonHover === 2 && inBattleMenu === "attack") {
                battleChosenMove = "attack2"
                inBattleMenu = "choseEnemie"
                battleButtonHover = 0
                changeBattleButtonHoverEnemie(1)
                choseEnemieToAttack()
            };

            if (kb.pressed ('z') && battleButtonHover === 3 && inBattleMenu === "attack") {
                battleChosenMove = "attack3"
                inBattleMenu = "choseEnemie"
                battleButtonHover = 0
                changeBattleButtonHoverEnemie(1)
                choseEnemieToAttack()
            };

            if (kb.pressed ('z') && battleButtonHover === 4 && inBattleMenu === "attack") {
                battleChosenMove = "attack4"
                inBattleMenu = "choseEnemie"
                battleButtonHover = 0
                changeBattleButtonHoverEnemie(1)
                choseEnemieToAttack()
            };

            if (kb.pressed ('z') && battleButtonHover === 5 && inBattleMenu === "attack") {
                battleChosenMove = "attack5"
                inBattleMenu = "choseEnemie"
                battleButtonHover = 0
                changeBattleButtonHoverEnemie(1)
                choseEnemieToAttack()
            };

            if (kb.pressed ('z') && battleButtonHover === 6 && inBattleMenu === "attack") {
                battleChosenMove = "attack6"
                inBattleMenu = "choseEnemie"
                battleButtonHover = 0
                changeBattleButtonHoverEnemie(1)
                choseEnemieToAttack()
            };

            if (kb.pressed ('z') && battleButtonHover === 1 && inBattleMenu === "spells") {
                battleChosenMove = "spell1"
            };

            if (kb.pressed ('z') && battleButtonHover === 2 && inBattleMenu === "spells") {
                battleChosenMove = "spell2"
            };

            if (kb.pressed ('z') && battleButtonHover === 3 && inBattleMenu === "spells") {
                battleChosenMove = "spell3"
            };

            if (kb.pressed ('z') && battleButtonHover === 1 && inBattleMenu === "talk") {
                battleChosenMove = "talk1"
            };

            if (kb.pressed ('z') && battleButtonHover === 2 && inBattleMenu === "talk") {
                battleChosenMove = "talk2"
            };

            if (kb.pressed ('z') && battleButtonHover === 3 && inBattleMenu === "talk") {
                battleChosenMove = "talk3"
            };

            if (kb.pressed ('z') && battleButtonHover === 1 && inBattleMenu === "base") {
                inBattleMenu = "attack"
                battleButtonHover = 1
                battleSelectAttack()
            };

            if (kb.pressed ('z') && battleButtonHover === 2 && inBattleMenu === "base") {
                battleChosenMove = "defend"
                endTurn()
            };

            if (kb.pressed ('z') && battleButtonHover === 3 && inBattleMenu === "base") {
                inBattleMenu = "talk"
                battleButtonHover = 1
                battleSelectTalk()
            };

            if (kb.pressed ('z') && battleButtonHover === 4 && inBattleMenu === "base") {
                inBattleMenu = "spells"
                battleButtonHover = 1
                battleSelectSpell()
            };


            if (kb.pressed ('x') && (inBattleMenu !== "base" && inBattleMenu !== "choseEnemie")) {
                if(inBattleMenu === "attack"){
                    battleButtonHover = 1
                } else if(inBattleMenu === "talk"){
                    battleButtonHover = 3
                } else if(inBattleMenu === "spells"){
                    battleButtonHover = 4
                };
                battleBackBase()
                inBattleMenu = "base"
            };

            if (kb.pressed ('x') && inBattleMenu === "choseEnemie") {
                if(battleChosenMove === "attack1"){
                    battleButtonHover = 1
                } else if(battleChosenMove === "attack2"){
                    battleButtonHover = 2
                } else if(battleChosenMove === "attack3"){
                    battleButtonHover = 3
                } else if(battleChosenMove === "attack4"){
                    battleButtonHover = 4
                } else if(battleChosenMove === "attack5"){
                    battleButtonHover = 5
                } else if(battleChosenMove === "attack6"){
                    battleButtonHover = 6
                };
                inBattleMenu = "attack"
                battleBackAttack()
            };
        };


        if (shuffledBattleTurnArray[0 + battleTotalTurn] === "p1"){
            battleTurnMarker1.image = battlePlayer1TypeImg 
        } else if (shuffledBattleTurnArray[0 + battleTotalTurn] === "p2"){
            battleTurnMarker1.image = battlePlayer2TypeImg
        } else if (shuffledBattleTurnArray[0 + battleTotalTurn] === "p3"){
            battleTurnMarker1.image = battlePlayer3TypeImg
        } else if (shuffledBattleTurnArray[0 + battleTotalTurn] === "p4"){
            battleTurnMarker1.image =  battlePlayer4TypeImg
        } else if (shuffledBattleTurnArray[0 + battleTotalTurn] === "e1"){
            battleTurnMarker1.image = battleEnemie1TypeImg
        } else if (shuffledBattleTurnArray[0 + battleTotalTurn] === "e2"){
            battleTurnMarker1.image = battleEnemie2TypeImg
        } else if (shuffledBattleTurnArray[0 + battleTotalTurn] === "e3"){
            battleTurnMarker1.image =  battleEnemie3TypeImg
        } else if (shuffledBattleTurnArray[0 + battleTotalTurn] === "e4"){
            battleTurnMarker1.image =  battleEnemie4TypeImg
        };

        if((1 + battleTotalTurn) < shuffledBattleTurnArray.length){
            if (shuffledBattleTurnArray[1 + battleTotalTurn] === "p1"){
                battleTurnMarker2.image = battlePlayer1TypeImg 
            } else if (shuffledBattleTurnArray[1 + battleTotalTurn] === "p2"){
                battleTurnMarker2.image = battlePlayer2TypeImg
            } else if (shuffledBattleTurnArray[1 + battleTotalTurn] === "p3"){
                battleTurnMarker2.image = battlePlayer3TypeImg
            } else if (shuffledBattleTurnArray[1 + battleTotalTurn] === "p4"){
                battleTurnMarker2.image =  battlePlayer4TypeImg
            } else if (shuffledBattleTurnArray[1 + battleTotalTurn] === "e1"){
                battleTurnMarker2.image = battleEnemie1TypeImg
            } else if (shuffledBattleTurnArray[1 + battleTotalTurn] === "e2"){
                battleTurnMarker2.image = battleEnemie2TypeImg
            } else if (shuffledBattleTurnArray[1 + battleTotalTurn] === "e3"){
                battleTurnMarker2.image =  battleEnemie3TypeImg
            } else if (shuffledBattleTurnArray[1 + battleTotalTurn] === "e4"){
                battleTurnMarker2.image =  battleEnemie4TypeImg
            };
        } else if((1 + battleTotalTurn) > (shuffledBattleTurnArray.length - 1)){
            if (shuffledBattleTurnArray[(1 + battleTotalTurn) - shuffledBattleTurnArray.length] === "p1"){
                battleTurnMarker2.image = battlePlayer1TypeImg 
            } else if (shuffledBattleTurnArray[(1 + battleTotalTurn) - shuffledBattleTurnArray.length] === "p2"){
                battleTurnMarker2.image = battlePlayer2TypeImg
            } else if (shuffledBattleTurnArray[(1 + battleTotalTurn) - shuffledBattleTurnArray.length] === "p3"){
                battleTurnMarker2.image = battlePlayer3TypeImg
            } else if (shuffledBattleTurnArray[(1 + battleTotalTurn) - shuffledBattleTurnArray.length] === "p4"){
                battleTurnMarker2.image =  battlePlayer4TypeImg
            } else if (shuffledBattleTurnArray[(1 + battleTotalTurn) - shuffledBattleTurnArray.length] === "e1"){
                battleTurnMarker2.image = battleEnemie1TypeImg
            } else if (shuffledBattleTurnArray[(1 + battleTotalTurn) - shuffledBattleTurnArray.length] === "e2"){
                battleTurnMarker2.image = battleEnemie2TypeImg
            } else if (shuffledBattleTurnArray[(1 + battleTotalTurn) - shuffledBattleTurnArray.length] === "e3"){
                battleTurnMarker2.image =  battleEnemie3TypeImg
            } else if (shuffledBattleTurnArray[(1 + battleTotalTurn) - shuffledBattleTurnArray.length] === "e4"){
                battleTurnMarker2.image =  battleEnemie4TypeImg
            };
        };

        if((2 + battleTotalTurn) < shuffledBattleTurnArray.length){
            if (shuffledBattleTurnArray[2 + battleTotalTurn] === "p1"){
                battleTurnMarker3.image = battlePlayer1TypeImg 
            } else if (shuffledBattleTurnArray[2 + battleTotalTurn] === "p2"){
                battleTurnMarker3.image = battlePlayer2TypeImg
            } else if (shuffledBattleTurnArray[2 + battleTotalTurn] === "p3"){
                battleTurnMarker3.image = battlePlayer3TypeImg
            } else if (shuffledBattleTurnArray[2 + battleTotalTurn] === "p4"){
                battleTurnMarker3.image =  battlePlayer4TypeImg
            } else if (shuffledBattleTurnArray[2 + battleTotalTurn] === "e1"){
                battleTurnMarker3.image = battleEnemie1TypeImg
            } else if (shuffledBattleTurnArray[2 + battleTotalTurn] === "e2"){
                battleTurnMarker3.image = battleEnemie2TypeImg
            } else if (shuffledBattleTurnArray[2 + battleTotalTurn] === "e3"){
                battleTurnMarker3.image =  battleEnemie3TypeImg
            } else if (shuffledBattleTurnArray[2 + battleTotalTurn] === "e4"){
                battleTurnMarker3.image =  battleEnemie4TypeImg
            };
        } else if((2 + battleTotalTurn) > (shuffledBattleTurnArray.length - 1)){
            if (shuffledBattleTurnArray[(2 + battleTotalTurn) - shuffledBattleTurnArray.length] === "p1"){
                battleTurnMarker3.image = battlePlayer1TypeImg 
            } else if (shuffledBattleTurnArray[(2 + battleTotalTurn) - shuffledBattleTurnArray.length] === "p2"){
                battleTurnMarker3.image = battlePlayer2TypeImg
            } else if (shuffledBattleTurnArray[(2 + battleTotalTurn) - shuffledBattleTurnArray.length] === "p3"){
                battleTurnMarker3.image = battlePlayer3TypeImg
            } else if (shuffledBattleTurnArray[(2 + battleTotalTurn) - shuffledBattleTurnArray.length] === "p4"){
                battleTurnMarker3.image =  battlePlayer4TypeImg
            } else if (shuffledBattleTurnArray[(2 + battleTotalTurn) - shuffledBattleTurnArray.length] === "e1"){
                battleTurnMarker3.image = battleEnemie1TypeImg
            } else if (shuffledBattleTurnArray[(2 + battleTotalTurn) - shuffledBattleTurnArray.length] === "e2"){
                battleTurnMarker3.image = battleEnemie2TypeImg
            } else if (shuffledBattleTurnArray[(2 + battleTotalTurn) - shuffledBattleTurnArray.length] === "e3"){
                battleTurnMarker3.image =  battleEnemie3TypeImg
            } else if (shuffledBattleTurnArray[(2 + battleTotalTurn) - shuffledBattleTurnArray.length] === "e4"){
                battleTurnMarker3.image =  battleEnemie4TypeImg
            };
        };

    }

    
}

function battleSelectAttack(){
    if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p1"){
        attackOption1Button = new Sprite(200, 75, 70, 20, 'k');
        attackOption1Button.color = '#000000'

        attackOption3Button = new Sprite(200, 110, 70, 20, 'k');
        attackOption3Button.color = '#000000'

        attackOption5Button = new Sprite(200, 145, 70, 20, 'k');
        attackOption5Button.color = '#000000'

        attackOption2Button = new Sprite(280, 75, 70, 20, 'k');
        attackOption2Button.color = '#000000'

        attackOption4Button = new Sprite(280, 110, 70, 20, 'k');
        attackOption4Button.color = '#000000'

        attackOption6Button = new Sprite(280, 145, 70, 20, 'k');
        attackOption6Button.color = '#000000'
    } else if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p2"){
        attackOption1Button = new Sprite(200, 275, 70, 20, 'k');
        attackOption1Button.color = '#000000'

        attackOption3Button = new Sprite(200, 310, 70, 20, 'k');
        attackOption3Button.color = '#000000'

        attackOption5Button = new Sprite(200, 345, 70, 20, 'k');
        attackOption5Button.color = '#000000'

        attackOption2Button = new Sprite(280, 275, 70, 20, 'k');
        attackOption2Button.color = '#000000'

        attackOption4Button = new Sprite(280, 310, 70, 20, 'k');
        attackOption4Button.color = '#000000'

        attackOption6Button = new Sprite(280, 345, 70, 20, 'k');
        attackOption6Button.color = '#000000'
    };
};

function battleSelectSpell(){
    if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p1"){
        spellOption1Button = new Sprite(200, 75, 70, 20, 'k');
        spellOption1Button.color = '#000000'

        spellOption2Button = new Sprite(200, 110, 70, 20, 'k');
        spellOption2Button.color = '#000000'

        spellOption3Button = new Sprite(200, 145, 70, 20, 'k');
        spellOption3Button.color = '#000000'
    } else if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p2"){
        spellOption1Button = new Sprite(200, 275, 70, 20, 'k');
        spellOption1Button.color = '#000000'

        spellOption2Button = new Sprite(200, 310, 70, 20, 'k');
        spellOption2Button.color = '#000000'

        spellOption3Button = new Sprite(200, 345, 70, 20, 'k');
        spellOption3Button.color = '#000000'
    };
};

function battleSelectTalk(){
    if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p1"){
        talkOption1Button = new Sprite(200, 75, 70, 20, 'k');
        talkOption1Button.color = '#000000'

        talkOption2Button = new Sprite(200, 110, 70, 20, 'k');
        talkOption2Button.color = '#000000'

        talkOption3Button = new Sprite(200, 145, 70, 20, 'k');
        talkOption3Button.color = '#000000'
    } else if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p2"){
        talkOption1Button = new Sprite(200, 275, 70, 20, 'k');
        talkOption1Button.color = '#000000'

        talkOption2Button = new Sprite(200, 310, 70, 20, 'k');
        talkOption2Button.color = '#000000'

        talkOption3Button = new Sprite(200, 345, 70, 20, 'k');
        talkOption3Button.color = '#000000'
    }
};

function choseEnemieToAttack(){

};

function changeBattleButtonHoverEnemie(amount){
    battleButtonHover = battleButtonHover + amount;
    if(amount > 0){
        if(battleButtonHover === 1 && battleEnemie1HP === 0){
            changeBattleButtonHoverEnemie(1)
        }
        if(battleButtonHover === 2 && battleEnemie2HP === 0){
            changeBattleButtonHoverEnemie(1)
        }
        if(battleButtonHover === 3 && battleEnemie3HP === 0){
            changeBattleButtonHoverEnemie(1)
        }
        if(battleButtonHover === 4 && battleEnemie4HP === 0){
            changeBattleButtonHoverEnemie(1)
        }
    } else if (amount < 0){
        if(battleButtonHover === 1 && battleEnemie1HP === 0){
            changeBattleButtonHoverEnemie(-1)
        }
        if(battleButtonHover === 2 && battleEnemie2HP === 0){
            changeBattleButtonHoverEnemie(-1)
        }
        if(battleButtonHover === 3 && battleEnemie3HP === 0){
            changeBattleButtonHoverEnemie(-1)
        }
        if(battleButtonHover === 4 && battleEnemie4HP === 0){
            changeBattleButtonHoverEnemie(-1)
        }
    }
};

async function attackEnemie(enemie){
    await delay(100);
    if(enemie === "e1"){
        battleEnemie1HP = battleEnemie1HP - 5
    } else if(enemie === "e2"){
        battleEnemie2HP = battleEnemie2HP - 5
    } else if(enemie === "e3"){
        battleEnemie3HP = battleEnemie3HP - 5
    } else if(enemie === "e4"){
        battleEnemie4HP = battleEnemie4HP - 5
    };
    await delay(500);
    battleEnemie1HPBarGreen.visible = false;
    battleEnemie1HPBarRed.visible = false;
    battleEnemie2HPBarGreen.visible = false;
    battleEnemie2HPBarRed.visible = false;
    battleEnemie3HPBarGreen.visible = false;
    battleEnemie3HPBarRed.visible = false;
    battleEnemie4HPBarGreen.visible = false;
    battleEnemie4HPBarRed.visible = false;
    endTurn()
};

function battleBackBase(){
    if(inBattleMenu === "attack"){
        attackOption1Button.remove();
        attackOption2Button.remove();
        attackOption3Button.remove();
        attackOption4Button.remove();
        attackOption5Button.remove();
        attackOption6Button.remove();
    } else if(inBattleMenu === "spells"){
        spellOption1Button.remove();
        spellOption2Button.remove();
        spellOption3Button.remove();
    } else if(inBattleMenu === "talk"){
        talkOption1Button.remove();
        talkOption2Button.remove();
        talkOption3Button.remove();
    };
    inBattleMenu = "base"
}

function battleBackAttack(){
    battleEnemie1.tint = 255
    battleEnemie2.tint = 255
    battleEnemie3.tint = 255
    battleEnemie4.tint = 255
    inBattleMenu = "attack"
}

async function startTurn(){
    if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p1" && battlePlayer1HP <= 0){
        halfEndTurn()
        await delay(1000);
        endTurn()
    } else if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p2" && battlePlayer2HP <= 0){
        halfEndTurn()
        await delay(1000);
        endTurn()
    } else if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p1"){
        battleButtonHover = 1
        inBattleMenu = "base"
        attackButton = new Sprite(70, 170, 15, 15, 'k');
        defendButton = new Sprite(90, 170, 15, 15, 'k');
        talkButton = new Sprite(110, 170, 15, 15, 'k');    
        spellButton = new Sprite(130, 170, 15, 15, 'k');

        attackButton.image = imgAttackButtonOff;
        defendButton.image = imgDefendButtonOff;
        talkButton.image = imgTalkButtonOff;
        spellButton.image = imgSpellButtonOff;

        attackButton.scale = 1.25;
        defendButton.scale = 1.25;
        talkButton.scale = 1.25;
        spellButton.scale = 1.25;
    } else if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p2"){
        battleButtonHover = 1
        inBattleMenu = "base"
        attackButton = new Sprite(70, 400, 15, 15, 'k');
        defendButton = new Sprite(90, 400, 15, 15, 'k');
        talkButton = new Sprite(110, 400, 15, 15, 'k');    
        spellButton = new Sprite(130, 400, 15, 15, 'k');

        attackButton.image = imgAttackButtonOff;
        defendButton.image = imgDefendButtonOff;
        talkButton.image = imgTalkButtonOff;
        spellButton.image = imgSpellButtonOff;

        attackButton.scale = 1.25;
        defendButton.scale = 1.25;
        talkButton.scale = 1.25;
        spellButton.scale = 1.25;
    } else if(shuffledBattleTurnArray[0 + battleTotalTurn] === "e1"){
        startEnemieTurn('e1')
    } else if(shuffledBattleTurnArray[0 + battleTotalTurn] === "e2"){
        startEnemieTurn('e2')
    } else if(shuffledBattleTurnArray[0 + battleTotalTurn] === "e3"){
        startEnemieTurn('e3')
    } else if(shuffledBattleTurnArray[0 + battleTotalTurn] === "e4"){
        startEnemieTurn('e4')
    };
};

async function startEnemieTurn(enemieNum){
    enemieAttackPlayerNum = battleAlivePlayersArray[Math.floor(Math.random()*battleAlivePlayersArray.length)];
    if(enemieAttackPlayerNum === 'p1'){
        await delay(100);
        battlePlayer1HPBarGreen.visible = true;
        battlePlayer1HPBarRed.visible = true;
        await delay(500);
        battlePlayer1HP = battlePlayer1HP - round(random(4,6))
        await delay(500);
        battlePlayer1HPBarGreen.visible = false;
        battlePlayer1HPBarRed.visible = false;

    } else if(enemieAttackPlayerNum === 'p2'){
        await delay(100);
        battlePlayer2HPBarGreen.visible = true;
        battlePlayer2HPBarRed.visible = true;
        await delay(500);
        battlePlayer2HP = battlePlayer2HP - round(random(4,6))
        await delay(500);
        battlePlayer2HPBarGreen.visible = false;
        battlePlayer2HPBarRed.visible = false;

    } else if(enemieAttackPlayerNum === 'p3'){
        await delay(100);
        battlePlayer3HPBarGreen.visible = true;
        battlePlayer3HPBarRed.visible = true;
        await delay(500);
        battlePlayer3HP = battlePlayer3HP - round(random(4,6))
        await delay(500);
        battlePlayer3HPBarGreen.visible = false;
        battlePlayer3HPBarRed.visible = false;

    } else if(enemieAttackPlayerNum === 'p4'){
        await delay(100);
        battlePlayer4HPBarGreen.visible = true;
        battlePlayer4HPBarRed.visible = true;
        await delay(500);
        battlePlayer4HP = battlePlayer4HP - round(random(4,6))
        await delay(500);
        battlePlayer4HPBarGreen.visible = false;
        battlePlayer4HPBarRed.visible = false;

    };
    endTurn();
};

function endTurn(){
    if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p1" || shuffledBattleTurnArray[0 + battleTotalTurn] === "p2"){
        battleBackBase()
        attackButton.remove();
        defendButton.remove();
        spellButton.remove();
        talkButton.remove();
        if(battleChosenMove === "defend"){
            battlePlayer1State = "defend"
        };
        battleButtonHover = 0
    }
    battleTotalTurn = battleTotalTurn + 1
    if(battleTotalTurn > (shuffledBattleTurnArray.length - 1)){
        battleTotalTurn = 0
    };
    startTurn()
}

function halfEndTurn(){
    if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p1" || shuffledBattleTurnArray[0 + battleTotalTurn] === "p2"){
        battleBackBase()
        attackButton.remove();
        defendButton.remove();
        spellButton.remove();
        talkButton.remove();
        inBattleMenu = "halfEnd"
        battleButtonHover = 0
    };
};

/*******************************************************/
//  END OF APP
/*******************************************************/