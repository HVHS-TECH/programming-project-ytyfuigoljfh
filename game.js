/*******************************************************/
// P5.play: game
// game
// Written by ??
/*******************************************************/
    
/*******************************************************/
// setup()
/*******************************************************/

var inMainMenu = 1

var inBattle = 0
var inBattleMenu = "base"
var battleTurn = "player1"
var battleTotalTurn = 0
var battleTurnArray = ['p1', 'p2', 'p3', 'p4', 'e1', 'e2', 'e3', 'e4']
var battleChosenMove = "defend"
var shuffledBattleTurnArray
var battleButtonHover = 1

var merpHP = 30;
var merpMaxHP = 30;
var unkownHP = 35;
var unkownMaxHP = 35;

var defaultGlorbMaxHP = 40
var defaultDugMaxHP = 28
var defaultWleemMaxHP = 15
var defaultTrueSaviorMaxHP = 200

var p1EquippedWeppon = "transcendedScythe"
var p2EquippedWeppon = "gun"

var roomNum = 1


function preload() {
    imgMainMenuBG = loadImage('assets/images/mainMenu/MainMenuBG.svg');
    imgMainMenuStart = loadImage('assets/images/mainMenu/MainMenuStart.svg');
    imgMainMenuOptions = loadImage('assets/images/mainMenu/MainMenuOptions.svg');
    imgMainMenuHelp = loadImage('assets/images/mainMenu/MainMenuHelp.svg');
    imgMainMenuCredits = loadImage('assets/images/mainMenu/MainMenuCredits.svg');

    imgFace = loadImage('assets/images/Merp.svg');
    imgPlayerBattle = loadImage('assets/images/MerpBattle.svg');
    imgPlayerBattleDown = loadImage('assets/images/MerpBattleDown.svg');
    imgUnkownBattle = loadImage('assets/images/UnkownBattle.svg');
    imgUnkownBattleDown = loadImage('assets/images/UnkownBattleDown.svg');
    imgGlorbBattle = loadImage('assets/images/GlorbBattleIdle.svg');
    imgTrueSaviorBattle = loadImage('assets/images/TrueSaviorBattleIdle.svg');
    imgDugBattle = loadImage('assets/images/DugBattleIdle.svg');
    imgDugBattleAttack = loadImage('assets/images/DugBattleAttack.svg');
    imgWleemBattle = loadImage('assets/images/WleemBattleIdle.svg');
    imgWleemBattleAttack = loadImage('assets/images/WleemBattleAttack.svg');
    imgWleemBattleDamage = loadImage('assets/images/WleemBattleDamage.svg');
    imgMerpTurnPlate = loadImage('assets/images/turnPlates/MerpTurnPlate.svg');
    imgUnkownTurnPlate = loadImage('assets/images/turnPlates/UnkownTurnPlate.svg');
    imgGlorbTurnPlate = loadImage('assets/images/turnPlates/GlorbTurnPlate.svg');
    imgTrueSaviorTurnPlate = loadImage('assets/images/turnPlates/TrueSaviorTurnPlate.svg');
    imgDugTurnPlate = loadImage('assets/images/turnPlates/DugTurnPlate.svg');
    imgWleemTurnPlate = loadImage('assets/images/turnPlates/WleemTurnPlate.svg');

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
    makeMainMenu()
   // makeMap(1)
}
    
/*******************************************************/
// draw()
/*******************************************************/
function draw() {

    if (inBattle === 0) {
        if(inMainMenu === 0){
            background('#484848');

            cameraLeftEdge = 544
            cameraRightEdge = 2000
            cameraTopEdge = -906
            cameraBottomEdge = 306

            if(player.x <= cameraLeftEdge){
                camera.x = cameraLeftEdge
            } else if(player.x >= cameraRightEdge){
                camera.x = cameraRightEdge
            } else {
                camera.x = player.x
            }

            if(player.y <= cameraTopEdge){
                camera.y = cameraTopEdge
            } else if(player.y >= cameraBottomEdge){
                camera.y = cameraBottomEdge
            } else {
                camera.y = player.y
            }

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
            background('#000000');

            mainMenuBG.x = (mouse.x/48) + 544
            mainMenuBG.y = (mouse.y/48) + 356

            if(mainMenuStart.mouse.presses()){
                startGame()
            };
        }
    } else {
        background('#ffffff'); 

        camera.x = 544
        camera.y = 306

        textSize(25);
        fill('#000000');
        text("Turn:", 888, 50);
        //text(battleButtonHover, 450, 50);
        //text(battleTotalTurn, 500, 50);
        //text(battleChosenMove, 450, 100);

        battlePlayer1HPBarYellow.width = ((battlePlayer1HP * -1) * (100/battlePlayer1MaxHP)) + 0.01;
        battlePlayer2HPBarYellow.width = ((battlePlayer2HP * -1) * (100/battlePlayer2MaxHP)) + 0.01;
        battlePlayer3HPBarYellow.width = ((battlePlayer3HP * -1) * (100/battlePlayer3MaxHP)) + 0.01;
        battlePlayer4HPBarYellow.width = ((battlePlayer4HP * -1) * (100/battlePlayer4MaxHP)) + 0.01;

        battlePlayer1HPBarGreen.width = (battlePlayer1HP * (100/battlePlayer1MaxHP)) + 0.01;
        battlePlayer2HPBarGreen.width = (battlePlayer2HP * (100/battlePlayer2MaxHP)) + 0.01;
        battlePlayer3HPBarGreen.width = (battlePlayer3HP * (100/battlePlayer3MaxHP)) + 0.01;
        battlePlayer4HPBarGreen.width = (battlePlayer4HP * (100/battlePlayer4MaxHP)) + 0.01;

        battlePlayer1EXBarCyan.height = battlePlayer1EX + 0.01;
        battlePlayer2EXBarCyan.height = battlePlayer2EX + 0.01;
        battlePlayer3EXBarCyan.height = battlePlayer3EX + 0.01;
        battlePlayer4EXBarCyan.height = battlePlayer4EX + 0.01;

        battleEnemie1HPBarGreen.width = battleEnemie1HP * (100/battleEnemie1MaxHP);
        battleEnemie2HPBarGreen.width = battleEnemie2HP * (100/battleEnemie2MaxHP);
        battleEnemie3HPBarGreen.width = battleEnemie3HP * (100/battleEnemie3MaxHP);
        battleEnemie4HPBarGreen.width = battleEnemie4HP * (100/battleEnemie4MaxHP);

    if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p1"){
        currentBattleTurnEX = battlePlayer1EX
    } else if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p2"){
        currentBattleTurnEX = battlePlayer2EX
    } else if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p3"){
        currentBattleTurnEX = battlePlayer3EX
    } else if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p4"){
        currentBattleTurnEX = battlePlayer4EX
    };


        if(battleEnemie1HP <= 0){
            battleEnemie1.visible = false
            if(shuffledBattleTurnArray.includes('e1')){
                shuffledBattleTurnArray.splice(shuffledBattleTurnArray.indexOf('e1'), 1)
            };
        };

        if(battleEnemie2HP <= 0){
            battleEnemie2.visible = false
            if(shuffledBattleTurnArray.includes('e2')){
                shuffledBattleTurnArray.splice(shuffledBattleTurnArray.indexOf('e2'), 1)
            };
        };

        if(battleEnemie3HP <= 0){
            battleEnemie3.visible = false
            if(shuffledBattleTurnArray.includes('e3')){
                shuffledBattleTurnArray.splice(shuffledBattleTurnArray.indexOf('e3'), 1)
            };
        };

        if(battleEnemie4HP <= 0){
            battleEnemie4.visible = false
            if(shuffledBattleTurnArray.includes('e4')){
                shuffledBattleTurnArray.splice(shuffledBattleTurnArray.indexOf('e4'), 1)
            };
        };


        if(battlePlayer1HP <= 0){
            if(battleAlivePlayersArray.includes('p1')){
                battleAlivePlayersArray.splice(battleAlivePlayersArray.indexOf('p1'), 1)
            };
            playAnimation("down", "p1")
        };

        if(battlePlayer2HP <= 0){
            if(battleAlivePlayersArray.includes('p2')){
                battleAlivePlayersArray.splice(battleAlivePlayersArray.indexOf('p2'), 1)
            };
            playAnimation("down", "p2")
        };

        if(battlePlayer3HP <= 0){
            if(battleAlivePlayersArray.includes('p3')){
                battleAlivePlayersArray.splice(battleAlivePlayersArray.indexOf('p3'), 1)
            };
            playAnimation("down", "p3")
        };

        if(battlePlayer4HP <= 0){
            if(battleAlivePlayersArray.includes('p4')){
                battleAlivePlayersArray.splice(battleAlivePlayersArray.indexOf('p4'), 1)
            };
            playAnimation("down", "p4")
        };

        if(battlePlayer1HP > 0){
            if(!battleAlivePlayersArray.includes('p1')){
                battleAlivePlayersArray.push('p1')
                playAnimation("idle", "p1")
            };
        };

        if(battlePlayer2HP > 0){
            if(!battleAlivePlayersArray.includes('p2')){
                battleAlivePlayersArray.push('p2')
                playAnimation("idle", "p2")
            };
        };

        if(battlePlayer3HP > 0){
            if(!battleAlivePlayersArray.includes('p3')){
                battleAlivePlayersArray.push('p3')
                playAnimation("idle", "p3")
            };
        };

        if(battlePlayer4HP > 0){
            if(!battleAlivePlayersArray.includes('p4')){
                battleAlivePlayersArray.push('p4')
                playAnimation("idle", "p4")
            };
        };

        if(battlePlayer1HP > battlePlayer1MaxHP){
            battlePlayer1HP = battlePlayer1MaxHP
        };

        if(battlePlayer2HP > battlePlayer2MaxHP){
            battlePlayer2HP = battlePlayer2MaxHP
        };

        if(battlePlayer3HP > battlePlayer3MaxHP){
            battlePlayer3HP = battlePlayer3MaxHP
        };

        if(battlePlayer4HP > battlePlayer4MaxHP){
            battlePlayer4HP = battlePlayer4MaxHP
        };

        if(battlePlayer1EX > 100){
            battlePlayer1EX = 100
        };

        if(battlePlayer2EX > 100){
            battlePlayer2EX = 100
        };

        if(battlePlayer3EX > 100){
            battlePlayer3EX = 100
        };

        if(battlePlayer4EX > 100){
            battlePlayer4EX = 100
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
            } else if ( inBattleMenu === "chosePlayer"){
                if (kb.pressed('left')) {
                    changeBattleButtonHoverPlayer(-1)
                };
                if (kb.pressed ('right')) {
                    changeBattleButtonHoverPlayer(1)
                };
                if (kb.pressed('up')) {
                    changeBattleButtonHoverPlayer(-1)
                };
                if (kb.pressed ('down')) {
                    changeBattleButtonHoverPlayer(1)
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
                attackOption1Button.color = '#dfdfdf'
                attackOption2Button.color = '#ffffff'
                attackOption3Button.color = '#ffffff'
                attackOption4Button.color = '#ffffff'
                attackOption5Button.color = '#ffffff'
                attackOption6Button.color = '#ffffff'
            } else if(battleButtonHover === 2 && inBattleMenu === "attack") {
                attackOption1Button.color = '#ffffff'
                attackOption2Button.color = '#dfdfdf'
                attackOption3Button.color = '#ffffff'
                attackOption4Button.color = '#ffffff'
                attackOption5Button.color = '#ffffff'
                attackOption6Button.color = '#ffffff'
            } else if (battleButtonHover === 3 && inBattleMenu === "attack") {
                attackOption1Button.color = '#ffffff'
                attackOption2Button.color = '#ffffff'
                attackOption3Button.color = '#dfdfdf'
                attackOption4Button.color = '#ffffff'
                attackOption5Button.color = '#ffffff'
                attackOption6Button.color = '#ffffff'
            } else if (battleButtonHover === 4 && inBattleMenu === "attack") {
                attackOption1Button.color = '#ffffff'
                attackOption2Button.color = '#ffffff'
                attackOption3Button.color = '#ffffff'
                attackOption4Button.color = '#dfdfdf'
                attackOption5Button.color = '#ffffff'
                attackOption6Button.color = '#ffffff'
            } else if(battleButtonHover === 5 && inBattleMenu === "attack") {
                attackOption1Button.color = '#ffffff'
                attackOption2Button.color = '#ffffff'
                attackOption3Button.color = '#ffffff'
                attackOption4Button.color = '#ffffff'
                attackOption5Button.color = '#dfdfdf'
                attackOption6Button.color = '#ffffff'
            } else if(battleButtonHover === 6 && inBattleMenu === "attack") {
                attackOption1Button.color = '#ffffff'
                attackOption2Button.color = '#ffffff'
                attackOption3Button.color = '#ffffff'
                attackOption4Button.color = '#ffffff'
                attackOption5Button.color = '#ffffff'
                attackOption6Button.color = '#dfdfdf'
            }

            if (battleButtonHover === 1 && inBattleMenu === "spells"){
                spellOption1Button.color = '#dfdfdf'
                spellOption2Button.color = '#ffffff'
                spellOption3Button.color = '#ffffff'
            } else if(battleButtonHover === 2 && inBattleMenu === "spells") {
                spellOption1Button.color = '#ffffff'
                spellOption2Button.color = '#dfdfdf'
                spellOption3Button.color = '#ffffff'
            } else if (battleButtonHover === 3 && inBattleMenu === "spells") {
                spellOption1Button.color = '#ffffff'
                spellOption2Button.color = '#ffffff'
                spellOption3Button.color = '#dfdfdf'
            }

            if (battleButtonHover === 1 && inBattleMenu === "talk"){
                talkOption1Button.color = '#dfdfdf'
                talkOption2Button.color = '#ffffff'
                talkOption3Button.color = '#ffffff'
            } else if(battleButtonHover === 2 && inBattleMenu === "talk") {
                talkOption1Button.color = '#ffffff'
                talkOption2Button.color = '#dfdfdf'
                talkOption3Button.color = '#ffffff'
            } else if (battleButtonHover === 3 && inBattleMenu === "talk") {
                talkOption1Button.color = '#ffffff'
                talkOption2Button.color = '#ffffff'
                talkOption3Button.color = '#dfdfdf'
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
            };

            if (battleButtonHover === 1 && inBattleMenu === "chosePlayer"){
                battlePlayer1HPBarGreen.visible = true;
                battlePlayer1HPBarYellow.visible = true;
                battlePlayer1HPBarRed.visible = true;
                battlePlayer2HPBarGreen.visible = false;
                battlePlayer2HPBarYellow.visible = false;
                battlePlayer2HPBarRed.visible = false;
                battlePlayer3HPBarGreen.visible = false;
                battlePlayer3HPBarYellow.visible = false;
                battlePlayer3HPBarRed.visible = false;
                battlePlayer4HPBarGreen.visible = false;
                battlePlayer4HPBarYellow.visible = false;
                battlePlayer4HPBarRed.visible = false;
                battlePlayer1.tint = 255
                battlePlayer2.tint = 155
                battlePlayer3.tint = 155
                battlePlayer4.tint = 155
            } else if(battleButtonHover === 2 && inBattleMenu === "chosePlayer") {
                battlePlayer1HPBarGreen.visible = false;
                battlePlayer1HPBarYellow.visible = false;
                battlePlayer1HPBarRed.visible = false;
                battlePlayer2HPBarGreen.visible = true;
                battlePlayer2HPBarYellow.visible = true;
                battlePlayer2HPBarRed.visible = true;
                battlePlayer3HPBarGreen.visible = false;
                battlePlayer3HPBarYellow.visible = false;
                battlePlayer3HPBarRed.visible = false;
                battlePlayer4HPBarGreen.visible = false;
                battlePlayer4HPBarYellow.visible = false;
                battlePlayer4HPBarRed.visible = false;
                battlePlayer1.tint = 155
                battlePlayer2.tint = 255
                battlePlayer3.tint = 155
                battlePlayer4.tint = 155
            } else if (battleButtonHover === 3 && inBattleMenu === "chosePlayer") {
                battlePlayer1HPBarGreen.visible = false;
                battlePlayer1HPBarYellow.visible = false;
                battlePlayer1HPBarRed.visible = false;
                battlePlayer2HPBarGreen.visible = false;
                battlePlayer2HPBarYellow.visible = false;
                battlePlayer2HPBarRed.visible = false;
                battlePlayer3HPBarGreen.visible = true;
                battlePlayer3HPBarYellow.visible = true;
                battlePlayer3HPBarRed.visible = true;
                battlePlayer4HPBarGreen.visible = false;
                battlePlayer4HPBarYellow.visible = false;
                battlePlayer4HPBarRed.visible = false;
                battlePlayer1.tint = 155
                battlePlayer2.tint = 155
                battlePlayer3.tint = 255
                battlePlayer4.tint = 155
            } else if (battleButtonHover === 4 && inBattleMenu === "chosePlayer") {
                battlePlayer1HPBarGreen.visible = false;
                battlePlayer1HPBarYellow.visible = false;
                battlePlayer1HPBarRed.visible = false;
                battlePlayer2HPBarGreen.visible = false;
                battlePlayer2HPBarYellow.visible = false;
                battlePlayer2HPBarRed.visible = false;
                battlePlayer3HPBarGreen.visible = false;
                battlePlayer3HPBarYellow.visible = false;
                battlePlayer3HPBarRed.visible = false;
                battlePlayer4HPBarGreen.visible = true;
                battlePlayer4HPBarYellow.visible = true;
                battlePlayer4HPBarRed.visible = true;
                battlePlayer1.tint = 155
                battlePlayer2.tint = 155
                battlePlayer3.tint = 155
                battlePlayer4.tint = 255
            };

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
            } else if (inBattleMenu === "chosePlayer"){
                if (battleButtonHover > 4){
                    battleButtonHover = 0
                    changeBattleButtonHoverPlayer(1)
                }
                if (battleButtonHover < 1){
                    battleButtonHover = 5
                    changeBattleButtonHoverPlayer(-1)
                }
            };


            if (kb.pressed ('z') && battleButtonHover === 1 && inBattleMenu === "choseEnemie") {
                battleBackAttack(false)
                battleBackBase()
                halfEndTurn()
                attackEnemie("e1")
            };

            if (kb.pressed ('z') && battleButtonHover === 2 && inBattleMenu === "choseEnemie") {
                battleBackAttack(false)
                battleBackBase()
                halfEndTurn()
                attackEnemie("e2")
            };

            if (kb.pressed ('z') && battleButtonHover === 3 && inBattleMenu === "choseEnemie") {
                battleBackAttack(false)
                battleBackBase()
                halfEndTurn()
                attackEnemie("e3")
            };

            if (kb.pressed ('z') && battleButtonHover === 4 && inBattleMenu === "choseEnemie") {
                battleBackAttack(false)
                battleBackBase()
                halfEndTurn()
                attackEnemie("e4")
            };

            if (kb.pressed ('z') && battleButtonHover === 1 && inBattleMenu === "chosePlayer") {
                battleBackSpells(false)
                battleBackBase()
                halfEndTurn()
                healPlayer("p1")
            };

            if (kb.pressed ('z') && battleButtonHover === 2 && inBattleMenu === "chosePlayer") {
                battleBackSpells(false)
                battleBackBase()
                halfEndTurn()
                healPlayer("p2")
            };

            if (kb.pressed ('z') && battleButtonHover === 3 && inBattleMenu === "chosePlayer") {
                battleBackSpells(false)
                battleBackBase()
                halfEndTurn()
                healPlayer("p3")
            };

            if (kb.pressed ('z') && battleButtonHover === 4 && inBattleMenu === "chosePlayer") {
                battleBackSpells()
                battleBackBase()
                halfEndTurn()
                healPlayer("p4")
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
                if(currentBattleTurnEX >= spellButton1EXCost){
                    EXCost = spellButton1EXCost
                    battleChosenMove = "spell1"
                    inBattleMenu = "chosePlayer"
                    battleButtonHover = 0
                    changeBattleButtonHoverPlayer(1)
                };
            };

            if (kb.pressed ('z') && battleButtonHover === 2 && inBattleMenu === "spells") {
                if(currentBattleTurnEX >= spellButton2EXCost){
                    EXCost = spellButton2EXCost
                    battleChosenMove = "spell2"
                    inBattleMenu = "chosePlayer"
                    battleButtonHover = 0
                    changeBattleButtonHoverPlayer(1)
                };
            };

            if (kb.pressed ('z') && battleButtonHover === 3 && inBattleMenu === "spells") {
                if(currentBattleTurnEX >= spellButton3EXCost){
                    EXCost = spellButton3EXCost
                    battleChosenMove = "spell3"
                    inBattleMenu = "chosePlayer"
                    battleButtonHover = 0
                    changeBattleButtonHoverPlayer(1)
                };
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


            if (kb.pressed ('x') && (inBattleMenu !== "base" && inBattleMenu !== "choseEnemie" && inBattleMenu !== "chosePlayer")) {
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
                battleBackAttack(true)
            };

            if (kb.pressed ('x') && inBattleMenu === "chosePlayer") {
                if(battleChosenMove === "spell1"){
                    battleButtonHover = 1
                } else if(battleChosenMove === "spell2"){
                    battleButtonHover = 2
                } else if(battleChosenMove === "spell3"){
                    battleButtonHover = 3
                };
                inBattleMenu = "spells"
                battleBackSpells(true)
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
        attackOption1Button.color = '#ffffff'
        attackOption1Button.textSize = 12.5
        attackOption1Button.textColor = '#000000'
        attackOption1Button.text = attackButton1Text

        attackOption3Button = new Sprite(200, 110, 70, 20, 'k');
        attackOption3Button.color = '#ffffff'
        attackOption3Button.textSize = 12.5
        attackOption3Button.textColor = '#000000'
        attackOption3Button.text = attackButton3Text

        attackOption5Button = new Sprite(200, 145, 70, 20, 'k');
        attackOption5Button.color = '#ffffff'
        attackOption5Button.textSize = 12.5
        attackOption5Button.textColor = '#000000'
        attackOption5Button.text = attackButton5Text

        attackOption2Button = new Sprite(280, 75, 70, 20, 'k');
        attackOption2Button.color = '#ffffff'
        attackOption2Button.textSize = 12.5
        attackOption2Button.textColor = '#000000'
        attackOption2Button.text = attackButton2Text

        attackOption4Button = new Sprite(280, 110, 70, 20, 'k');
        attackOption4Button.color = '#ffffff'
        attackOption4Button.textSize = 12.5
        attackOption4Button.textColor = '#000000'
        attackOption4Button.text = attackButton4Text

        attackOption6Button = new Sprite(280, 145, 70, 20, 'k');
        attackOption6Button.color = '#ffffff'
        attackOption6Button.textSize = 12.5
        attackOption6Button.textColor = '#000000'
        attackOption6Button.text = attackButton6Text
    } else if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p2"){
        attackOption1Button = new Sprite(200, 275, 70, 20, 'k');
        attackOption1Button.color = '#ffffff'
        attackOption1Button.textSize = 12.5
        attackOption1Button.textColor = '#000000'
        attackOption1Button.text = attackButton1Text

        attackOption3Button = new Sprite(200, 310, 70, 20, 'k');
        attackOption3Button.color = '#ffffff'
        attackOption3Button.textSize = 12.5
        attackOption3Button.textColor = '#000000'
        attackOption3Button.text = attackButton3Text

        attackOption5Button = new Sprite(200, 345, 70, 20, 'k');
        attackOption5Button.color = '#ffffff'
        attackOption5Button.textSize = 12.5
        attackOption5Button.textColor = '#000000'
        attackOption5Button.text = attackButton5Text

        attackOption2Button = new Sprite(280, 275, 70, 20, 'k');
        attackOption2Button.color = '#ffffff'
        attackOption2Button.textSize = 12.5
        attackOption2Button.textColor = '#000000'
        attackOption2Button.text = attackButton2Text

        attackOption4Button = new Sprite(280, 310, 70, 20, 'k');
        attackOption4Button.color = '#ffffff'
        attackOption4Button.textSize = 12.5
        attackOption4Button.textColor = '#000000'
        attackOption4Button.text = attackButton4Text

        attackOption6Button = new Sprite(280, 345, 70, 20, 'k');
        attackOption6Button.color = '#ffffff'
        attackOption6Button.textSize = 12.5
        attackOption6Button.textColor = '#000000'
        attackOption6Button.text = attackButton6Text
    };
};

function battleSelectSpell(){
    if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p1"){
        spellOption1Button = new Sprite(200, 75, 70, 20, 'k');
        spellOption1Button.color = '#ffffff'
        spellOption1Button.textSize = 12.5
        spellOption1Button.textColor = '#000000'
        spellOption1Button.text = spellButton1Text

        spellOption2Button = new Sprite(200, 110, 70, 20, 'k');
        spellOption2Button.color = '#ffffff'
        spellOption2Button.textSize = 12.5
        spellOption2Button.textColor = '#000000'
        spellOption2Button.text = spellButton2Text

        spellOption3Button = new Sprite(200, 145, 70, 20, 'k');
        spellOption3Button.color = '#ffffff'
        spellOption3Button.textSize = 12.5
        spellOption3Button.textColor = '#000000'
        spellOption3Button.text = spellButton3Text
    } else if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p2"){
        spellOption1Button = new Sprite(200, 275, 70, 20, 'k');
        spellOption1Button.color = '#ffffff'
        spellOption1Button.textSize = 12.5
        spellOption1Button.textColor = '#000000'
        spellOption1Button.text = spellButton1Text

        spellOption2Button = new Sprite(200, 310, 70, 20, 'k');
        spellOption2Button.color = '#ffffff'
        spellOption2Button.textSize = 12.5
        spellOption2Button.textColor = '#000000'
        spellOption2Button.text = spellButton2Text

        spellOption3Button = new Sprite(200, 345, 70, 20, 'k');
        spellOption3Button.color = '#ffffff'
        spellOption3Button.textSize = 12.5
        spellOption3Button.textColor = '#000000'
        spellOption3Button.text = spellButton3Text
    };
};

function battleSelectTalk(){
    if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p1"){
        talkOption1Button = new Sprite(200, 75, 70, 20, 'k');
        talkOption1Button.color = '#ffffff'
        talkOption1Button.textSize = 12.5
        talkOption1Button.textColor = '#000000'
        talkOption1Button.text = talkButton1Text

        talkOption2Button = new Sprite(200, 110, 70, 20, 'k');
        talkOption2Button.color = '#ffffff'
        talkOption2Button.textSize = 12.5
        talkOption2Button.textColor = '#000000'
        talkOption2Button.text = talkButton2Text

        talkOption3Button = new Sprite(200, 145, 70, 20, 'k');
        talkOption3Button.color = '#ffffff'
        talkOption3Button.textSize = 12.5
        talkOption3Button.textColor = '#000000'
        talkOption3Button.text = talkButton3Text
    } else if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p2"){
        talkOption1Button = new Sprite(200, 275, 70, 20, 'k');
        talkOption1Button.color = '#ffffff'
        talkOption1Button.textSize = 12.5
        talkOption1Button.textColor = '#000000'
        talkOption1Button.text = talkButton1Text

        talkOption2Button = new Sprite(200, 310, 70, 20, 'k');
        talkOption2Button.color = '#ffffff'
        talkOption2Button.textSize = 12.5
        talkOption2Button.textColor = '#000000'
        talkOption2Button.text = talkButton2Text

        talkOption3Button = new Sprite(200, 345, 70, 20, 'k');
        talkOption3Button.color = '#ffffff'
        talkOption3Button.textSize = 12.5
        talkOption3Button.textColor = '#000000'
        talkOption3Button.text = talkButton3Text
    }
};

function choseEnemieToAttack(){

};

function changeBattleButtonHoverEnemie(amount){
    battleButtonHover = battleButtonHover + amount;
    if(amount > 0){
        if(battleButtonHover === 1 && battleEnemie1HP <= 0){
            changeBattleButtonHoverEnemie(1)
        }
        if(battleButtonHover === 2 && battleEnemie2HP <= 0){
            changeBattleButtonHoverEnemie(1)
        }
        if(battleButtonHover === 3 && battleEnemie3HP <= 0){
            changeBattleButtonHoverEnemie(1)
        }
        if(battleButtonHover === 4 && battleEnemie4HP <= 0){
            changeBattleButtonHoverEnemie(1)
        }
    } else if (amount < 0){
        if(battleButtonHover === 1 && battleEnemie1HP <= 0){
            changeBattleButtonHoverEnemie(-1)
        }
        if(battleButtonHover === 2 && battleEnemie2HP <= 0){
            changeBattleButtonHoverEnemie(-1)
        }
        if(battleButtonHover === 3 && battleEnemie3HP <= 0){
            changeBattleButtonHoverEnemie(-1)
        }
        if(battleButtonHover === 4 && battleEnemie4HP <= 0){
            changeBattleButtonHoverEnemie(-1)
        }
    }
};

function changeBattleButtonHoverPlayer(amount){
    battleButtonHover = battleButtonHover + amount;
    if(amount > 0){
        if(battleButtonHover === 1 && !shuffledBattleTurnArray.includes("p1")){
            changeBattleButtonHoverPlayer(1)
        }
        if(battleButtonHover === 2 && !shuffledBattleTurnArray.includes("p2")){
            changeBattleButtonHoverPlayer(1)
        }
        if(battleButtonHover === 3 && !shuffledBattleTurnArray.includes("p3")){
            changeBattleButtonHoverPlayer(1)
        }
        if(battleButtonHover === 4 && !shuffledBattleTurnArray.includes("p4")){
            changeBattleButtonHoverPlayer(1)
        }
    } else if (amount < 0){
        if(battleButtonHover === 1 && !shuffledBattleTurnArray.includes("p1")){
            changeBattleButtonHoverPlayer(-1)
        }
        if(battleButtonHover === 2 && !shuffledBattleTurnArray.includes("p2")){
            changeBattleButtonHoverPlayer(-1)
        }
        if(battleButtonHover === 3 && !shuffledBattleTurnArray.includes("p3")){
            changeBattleButtonHoverPlayer(-1)
        }
        if(battleButtonHover === 4 && !shuffledBattleTurnArray.includes("p4")){
            changeBattleButtonHoverPlayer(-1)
        }
    }
};

async function attackEnemie(enemie){
    await delay(100);
    playAnimation("damage", enemie)
    if(battleChosenMove === "attack1"){
        playerDamageValue = attackButton1Damage
    } else if(battleChosenMove === "attack2"){
        playerDamageValue = attackButton2Damage
    } else if(battleChosenMove === "attack3"){
        playerDamageValue = attackButton3Damage
    } else if(battleChosenMove === "attack4"){
        playerDamageValue = attackButton4Damage
    } else if(battleChosenMove === "attack5"){
        playerDamageValue = attackButton5Damage
    } else if(battleChosenMove === "attack6"){
        playerDamageValue = attackButton6Damage
    };
    if(enemie === "e1"){
        battleEnemie1HP = battleEnemie1HP - playerDamageValue
    } else if(enemie === "e2"){
        battleEnemie2HP = battleEnemie2HP - playerDamageValue
    } else if(enemie === "e3"){
        battleEnemie3HP = battleEnemie3HP - playerDamageValue
    } else if(enemie === "e4"){
        battleEnemie4HP = battleEnemie4HP - playerDamageValue
    };

    if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p1"){
        battlePlayer1EX = battlePlayer1EX + 12
    } else if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p2"){
        battlePlayer2EX = battlePlayer2EX + 12
    } else if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p3"){
        battlePlayer3EX = battlePlayer3EX + 12
    } else if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p4"){
        battlePlayer4EX = battlePlayer4EX + 12
    };

    if(battlePlayer1EX > 100){
        battlePlayer1EX = 100
    };
    if(battlePlayer2EX > 100){
        battlePlayer2EX = 100
    };
    if(battlePlayer3EX > 100){
        battlePlayer3EX = 100
    };
    if(battlePlayer4EX > 100){
        battlePlayer4EX = 100
    };
    await delay(500);
    playAnimation("idle", enemie)
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

async function healPlayer(player){
    if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p1"){
        battlePlayer1EX = battlePlayer1EX - EXCost
    } else if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p2"){
        battlePlayer2EX = battlePlayer2EX - EXCost
    } else if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p3"){
        battlePlayer3EX = battlePlayer3EX - EXCost
    } else if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p4"){
        battlePlayer4EX = battlePlayer4EX - EXCost
    };
    await delay(100);
    if(battleChosenMove === "spell1"){
        if(player === "p1"){
            battlePlayer1HP = battlePlayer1HP + 7
        } else if(player === "p2"){
            battlePlayer2HP = battlePlayer2HP + 7
        } else if(player === "p3"){
            battlePlayer3HP = battlePlayer3HP + 7
        } else if(player === "p4"){
            battlePlayer4HP = battlePlayer4HP + 7
        };
    } else if(battleChosenMove === "spell2"){
        if(player === "p1"){
            battlePlayer1HP = battlePlayer1HP + 16
        } else if(player === "p2"){
            battlePlayer2HP = battlePlayer2HP + 16
        } else if(player === "p3"){
            battlePlayer3HP = battlePlayer3HP + 16
        } else if(player === "p4"){
            battlePlayer4HP = battlePlayer4HP + 16
        };
        
    } else if(battleChosenMove === "spell3"){
        if(player === "p1"){
            battlePlayer1HP = battlePlayer1HP + 24
        } else if(player === "p2"){
            battlePlayer2HP = battlePlayer2HP + 24
        } else if(player === "p3"){
            battlePlayer3HP = battlePlayer3HP + 24
        } else if(player === "p4"){
            battlePlayer4HP = battlePlayer4HP + 24
        };
    };
    if(battlePlayer1HP > battlePlayer1MaxHP){
            battlePlayer1HP = battlePlayer1MaxHP
    };

    if(battlePlayer2HP > battlePlayer2MaxHP){
        battlePlayer2HP = battlePlayer2MaxHP
    };

    if(battlePlayer3HP > battlePlayer3MaxHP){
        battlePlayer3HP = battlePlayer3MaxHP
    };

    if(battlePlayer4HP > battlePlayer4MaxHP){
        battlePlayer4HP = battlePlayer4MaxHP
    };
    await delay(500);
    battlePlayer1HPBarGreen.visible = false;
    battlePlayer1HPBarYellow.visible = false;
    battlePlayer1HPBarRed.visible = false;
    battlePlayer2HPBarGreen.visible = false;
    battlePlayer2HPBarYellow.visible = false;
    battlePlayer2HPBarRed.visible = false;
    battlePlayer3HPBarGreen.visible = false;
    battlePlayer3HPBarYellow.visible = false;
    battlePlayer3HPBarRed.visible = false;
    battlePlayer4HPBarGreen.visible = false;
    battlePlayer4HPBarYellow.visible = false;
    battlePlayer4HPBarRed.visible = false;
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

function battleBackAttack(hideHP){
    battleEnemie1.tint = 255
    battleEnemie2.tint = 255
    battleEnemie3.tint = 255
    battleEnemie4.tint = 255
    if(hideHP === true){
        battleEnemie1HPBarGreen.visible = false;
        battleEnemie1HPBarRed.visible = false;
        battleEnemie2HPBarGreen.visible = false;
        battleEnemie2HPBarRed.visible = false;
        battleEnemie3HPBarGreen.visible = false;
        battleEnemie3HPBarRed.visible = false;
        battleEnemie4HPBarGreen.visible = false;
        battleEnemie4HPBarRed.visible = false;
    };
    inBattleMenu = "attack"
};

function battleBackSpells(hideHP){
    battlePlayer1.tint = 255
    battlePlayer2.tint = 255
    battlePlayer3.tint = 255
    battlePlayer4.tint = 255
    if(hideHP === true){
        battlePlayer1HPBarGreen.visible = false;
        battlePlayer1HPBarYellow.visible = false;
        battlePlayer1HPBarRed.visible = false;
        battlePlayer2HPBarGreen.visible = false;
        battlePlayer2HPBarYellow.visible = false;
        battlePlayer2HPBarRed.visible = false;
        battlePlayer3HPBarGreen.visible = false;
        battlePlayer3HPBarYellow.visible = false;
        battlePlayer3HPBarRed.visible = false;
        battlePlayer4HPBarGreen.visible = false;
        battlePlayer4HPBarYellow.visible = false;
        battlePlayer4HPBarRed.visible = false;
    }
    inBattleMenu = "spells"
};

async function startTurn(){
    if(battleEnemie1HP <= 0 && battleEnemie2HP <= 0 && battleEnemie3HP <= 0 && battleEnemie4HP <= 0){
        endBattle()
    };
    if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p1" && battlePlayer1HP <= 0){
        halfEndTurn()
        await delay(500);
        endTurn()
    } else if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p2" && battlePlayer2HP <= 0){
        halfEndTurn()
        await delay(500);
        endTurn()
    } else if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p1"){
        battleButtonHover = 1
        battlePlayer1State = "idle"
        changeBattleMenuOptions("p1")
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
        battlePlayer2State = "idle"
        changeBattleMenuOptions("p2")
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
    playAnimation("attack", enemieNum);
    getEnemieAttackValue(enemieNum);
    if(enemieAttackPlayerNum === 'p1'){
        await delay(100);
        battlePlayer1HPBarGreen.visible = true;
        battlePlayer1HPBarYellow.visible = true;
        battlePlayer1HPBarRed.visible = true;
        await delay(500);
        if(battlePlayer1State === "defend"){
            battlePlayer1HP = battlePlayer1HP - round(random(0,1))
        } else {
            battlePlayer1HP = battlePlayer1HP - round(random((enemieDamageValue - 1),(enemieDamageValue + 1)))
        }
        await delay(500);
        battlePlayer1HPBarGreen.visible = false;
        battlePlayer1HPBarYellow.visible = false;
        battlePlayer1HPBarRed.visible = false;

    } else if(enemieAttackPlayerNum === 'p2'){
        await delay(100);
        battlePlayer2HPBarGreen.visible = true;
        battlePlayer2HPBarYellow.visible = true;
        battlePlayer2HPBarRed.visible = true;
        await delay(500);
        if(battlePlayer2State === "defend"){
            battlePlayer2HP = battlePlayer2HP - round(enemieDamageValue/3)
        } else {
            battlePlayer2HP = battlePlayer2HP - round(random((enemieDamageValue - 1),(enemieDamageValue + 1)))
        }
        await delay(500);
        battlePlayer2HPBarGreen.visible = false;
        battlePlayer2HPBarYellow.visible = false;
        battlePlayer2HPBarRed.visible = false;

    } else if(enemieAttackPlayerNum === 'p3'){
        await delay(100);
        battlePlayer3HPBarGreen.visible = true;
        battlePlayer3HPBarYellow.visible = true;
        battlePlayer3HPBarRed.visible = true;
        await delay(500);
        if(battlePlayer3State === "defend"){
            battlePlayer3HP = battlePlayer3HP - round(random(0,1))
        } else {
            battlePlayer3HP = battlePlayer3HP - round(random((enemieDamageValue - 1),(enemieDamageValue + 1)))
        }
        await delay(500);
        battlePlayer3HPBarGreen.visible = false;
        battlePlayer3HPBarYellow.visible = false;
        battlePlayer3HPBarRed.visible = false;

    } else if(enemieAttackPlayerNum === 'p4'){
        await delay(100);
        battlePlayer4HPBarGreen.visible = true;
        battlePlayer4HPBarYellow.visible = true;
        battlePlayer4HPBarRed.visible = true;
        await delay(500);
        if(battlePlayer4State === "defend"){
            battlePlayer4HP = battlePlayer4HP - round(random(0,1))
        } else {
            battlePlayer4HP = battlePlayer4HP - round((enemieDamageValue - 1),(enemieDamageValue + 1))
        }
        await delay(500);
        battlePlayer4HPBarGreen.visible = false;
        battlePlayer4HPBarYellow.visible = false;
        battlePlayer4HPBarRed.visible = false;

    };
    playAnimation("idle", enemieNum)
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
            if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p1"){
                battlePlayer1State = "defend"
            } else if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p2"){
                battlePlayer2State = "defend"
            } else if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p3"){
                battlePlayer3State = "defend"
            } else if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p4"){
                battlePlayer4State = "defend"
            };
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

function getEnemieAttackValue(ememieNum){
    if(battleEnemie1Type === "Dug"){
        enemieDamageValue = 8
    } else if(battleEnemie1Type === "Glorb"){
        enemieDamageValue = 6
    } else if(battleEnemie1Type === "TrueSavior"){
        enemieDamageValue = 9
    } else if(battleEnemie1Type === "Wleem"){
        enemieDamageValue = 4
    };
};

function changeBattleMenuOptions(id){
    if(id === "p1"){
        if(battlePlayer1Type === "Merp"){
            attackButton1Text = "attack 1"
            attackButton1Damage = 10
            attackButton1EXCost = 0
            attackButton2Text = "attack 2"
            attackButton2Damage = 10
            attackButton2EXCost = 0
            attackButton3Text = "attack 3"
            attackButton3Damage = 10
            attackButton3EXCost = 0
            attackButton4Text = "attack 4"
            attackButton4Damage = 10
            attackButton4EXCost = 0
            attackButton5Text = "Egg"
            attackButton5Damage = 10
            attackButton5EXCost = 0
            attackButton6Text = "gun :3"
            attackButton6Damage = 999999999
            attackButton6EXCost = 5
            talkButton1Text = "talk 1"
            talkButton1EXCost = 0
            talkButton2Text = "talk 2"
            talkButton2EXCost = 0
            talkButton3Text = "talk 3"
            talkButton3EXCost = 0
            spellButton1Text = "heal 1"
            spellButton1EXCost = 20
            spellButton2Text = "heal 2"
            spellButton2EXCost = 40
            spellButton3Text = "heal 3"
            spellButton3EXCost = 60
        } else if(battlePlayer1Type === "Unkown"){
            attackButton1Text = "attack 1"
            attackButton1Damage = 10
            attackButton1EXCost = 0
            attackButton2Text = "attack 2"
            attackButton2Damage = 10
            attackButton2EXCost = 0
            attackButton3Text = "attack 3"
            attackButton3Damage = 10
            attackButton3EXCost = 0
            attackButton4Text = "attack 4"
            attackButton4Damage = 10
            attackButton4EXCost = 0
            attackButton5Text = "orange"
            attackButton5Damage = 10
            attackButton5EXCost = 0
            attackButton6Text = "oh..."
            attackButton6Damage = 999999999
            attackButton6EXCost = 5
            talkButton1Text = "talk 1"
            talkButton1EXCost = 0
            talkButton2Text = "talk 2"
            talkButton2EXCost = 0
            talkButton3Text = "talk 3"
            talkButton3EXCost = 0
            spellButton1Text = "heal 1"
            spellButton1EXCost = 20
            spellButton2Text = "heal 2"
            spellButton2EXCost = 40
            spellButton3Text = "heal 3"
            spellButton3EXCost = 60
        };
    } else if(id === "p2"){
        if(battlePlayer2Type === "Merp"){
            attackButton1Text = "attack 1"
            attackButton1Damage = 10
            attackButton1EXCost = 0
            attackButton2Text = "attack 2"
            attackButton2Damage = 10
            attackButton2EXCost = 0
            attackButton3Text = "attack 3"
            attackButton3Damage = 10
            attackButton3EXCost = 0
            attackButton4Text = "attack 4"
            attackButton4Damage = 10
            attackButton4EXCost = 0
            attackButton5Text = "Egg"
            attackButton5Damage = 10
            attackButton5EXCost = 0
            attackButton6Text = "gun :3"
            attackButton6Damage = 999999999
            attackButton6EXCost = 5
            talkButton1Text = "talk 1"
            talkButton1EXCost = 0
            talkButton2Text = "talk 2"
            talkButton2EXCost = 0
            talkButton3Text = "talk 3"
            talkButton3EXCost = 0
            spellButton1Text = "heal 1"
            spellButton1EXCost = 20
            spellButton2Text = "heal 2"
            spellButton2EXCost = 40
            spellButton3Text = "heal 3"
            spellButton3EXCost = 60
        } else if(battlePlayer2Type === "Unkown"){
            attackButton1Text = "attack 1"
            attackButton1Damage = 10
            attackButton1EXCost = 0
            attackButton2Text = "attack 2"
            attackButton2Damage = 10
            attackButton2EXCost = 0
            attackButton3Text = "attack 3"
            attackButton3Damage = 10
            attackButton3EXCost = 0
            attackButton4Text = "attack 4"
            attackButton4Damage = 10
            attackButton4EXCost = 0
            attackButton5Text = "orange"
            attackButton5Damage = 10
            attackButton5EXCost = 0
            attackButton6Text = "oh..."
            attackButton6Damage = 999999999
            attackButton6EXCost = 5
            talkButton1Text = "talk 1"
            talkButton1EXCost = 0
            talkButton2Text = "talk 2"
            talkButton2EXCost = 0
            talkButton3Text = "talk 3"
            talkButton3EXCost = 0
            spellButton1Text = "heal 1"
            spellButton1EXCost = 20
            spellButton2Text = "heal 2"
            spellButton2EXCost = 40
            spellButton3Text = "heal 3"
            spellButton3EXCost = 60
        };
    };
};

async function playAnimation(animation, id) {
  if(id === "e1"){
    if(battleEnemie1Type === "Dug"){
        if(animation === "idle"){
            battleEnemie1.image = imgDugBattle;
        } else if(animation === "attack"){
            battleEnemie1.image = imgDugBattleAttack;
        };
    } else if(battleEnemie1Type === "Wleem"){
        if(animation === "idle"){
            battleEnemie1.image = imgWleemBattle;
        } else if(animation === "attack"){
            battleEnemie1.image = imgWleemBattleAttack;
        } else if(animation === "damage"){
            battleEnemie1.image = imgWleemBattleDamage;
        };
    };
  } else if(id === "e2"){
    if(battleEnemie2Type === "Dug"){
        if(animation === "idle"){
            battleEnemie2.image = imgDugBattle;
        } else if(animation === "attack"){
            battleEnemie2.image = imgDugBattleAttack;
        };
    } else if(battleEnemie2Type === "Wleem"){
        if(animation === "idle"){
            battleEnemie2.image = imgWleemBattle;
        } else if(animation === "attack"){
            battleEnemie2.image = imgWleemBattleAttack;
        } else if(animation === "damage"){
            battleEnemie2.image = imgWleemBattleDamage;
        };
    };
  } else if(id === "e3"){
    if(battleEnemie3Type === "Dug"){
        if(animation === "idle"){
            battleEnemie3.image = imgDugBattle;
        } else if(animation === "attack"){
            battleEnemie3.image = imgDugBattleAttack;
        };
    } else if(battleEnemie3Type === "Wleem"){
        if(animation === "idle"){
            battleEnemie3.image = imgWleemBattle;
        } else if(animation === "attack"){
            battleEnemie3.image = imgWleemBattleAttack;
        } else if(animation === "damage"){
            battleEnemie3.image = imgWleemBattleDamage;
        };
    };
  } else if(id === "e4"){
    if(battleEnemie4Type === "Dug"){
        if(animation === "idle"){
            battleEnemie4.image = imgDugBattle;
        } else if(animation === "attack"){
            battleEnemie4.image = imgDugBattleAttack;
        };
    } else if(battleEnemie4Type === "Wleem"){
        if(animation === "idle"){
            battleEnemie4.image = imgWleemBattle;
        } else if(animation === "attack"){
            battleEnemie4.image = imgWleemBattleAttack;
        } else if(animation === "damage"){
            battleEnemie4.image = imgWleemBattleDamage;
        };
    };
  } else if(id === "p1"){
    if(battlePlayer1Type === "Merp"){
        if(animation === "idle"){
            battlePlayer1.image = imgPlayerBattle;
        } else if(animation === "down"){
            battlePlayer1.image = imgPlayerBattleDown;
        };
    } else if(battlePlayer1Type === "Unkown"){
        if(animation === "idle"){
            battlePlayer1.image = imgUnkownBattle;
        } else if(animation === "down"){
            battlePlayer1.image = imgUnkownBattleDown;
        };
    };
  } else if(id === "p2"){
    if(battlePlayer2Type === "Merp"){
        if(animation === "idle"){
            battlePlayer2.image = imgPlayerBattle;
        } else if(animation === "down"){
            battlePlayer2.image = imgPlayerBattleDown;
        };
    } else if(battlePlayer2Type === "Unkown"){
        if(animation === "idle"){
            battlePlayer2.image = imgUnkownBattle;
        } else if(animation === "down"){
            battlePlayer2.image = imgUnkownBattleDown;
        };
    };
  } else if(id === "p3"){
    if(battlePlayer3Type === "Merp"){
        if(animation === "idle"){
            battlePlayer3.image = imgPlayerBattle;
        } else if(animation === "down"){
            battlePlayer3.image = imgPlayerBattleDown;
        };
    } else if(battlePlayer3Type === "Unkown"){
        if(animation === "idle"){
            battlePlayer3.image = imgUnkownBattle;
        } else if(animation === "down"){
            battlePlayer3.image = imgUnkownBattleDown;
        };
    };
  } else if(id === "p4"){
    if(battlePlayer4Type === "Merp"){
        if(animation === "idle"){
            battlePlayer4.image = imgPlayerBattle;
        } else if(animation === "down"){
            battlePlayer4.image = imgPlayerBattleDown;
        };
    } else if(battlePlayer4Type === "Unkown"){
        if(animation === "idle"){
            battlePlayer4.image = imgUnkownBattle;
        } else if(animation === "down"){
            battlePlayer4.image = imgUnkownBattleDown;
        };
    };
  };
};

async function endBattle(){
    halfEndTurn();
    inBattle = 0;
    shuffledBattleTurnArray = [];
    battleMusic.stop();
    allSprites.remove();
    makeMap(1)
};

function makeMap(roomnum){
    mapGroup = new Group();
    upperWall = new Sprite(544, 0, 1088, 306, 's')
    upperWall.color = '#000000'
    mapGroup.add(upperWall);

    lowerWall = new Sprite(544, 612, 1088, 306, 's')
    lowerWall.color = '#000000'
    mapGroup.add(lowerWall);

    for (let i = 0; i < 5; i++) {
        wleemWall = new Sprite(980, (150 + (i * 75)), 50, 100, 'k');
        wleemWall.image = imgWleemBattleAttack;
        mapGroup.add(wleemWall);
    };

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

    badGuy4 = new Sprite(150, 406, 50, 100, 'd');
    badGuy4.image = imgWleemBattle;
    enemiesGroup.add(badGuy4);
    badGuy4.collides(player, preBattleStart4);

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

    function preBattleStart4(){
        enemiesAndPlayersInBattleArray = ['p1', 'e1']
        battleStart(badGuy, player, "Merp", 100, 100, merpMaxHP, merpHP, imgPlayerBattle, "no", 0, 0, 0, 0, imgPlayerBattle, "no", 0, 0, 0, 0, imgPlayerBattle, "no", 0, 0, 0, 0, imgPlayerBattle, "Wleem", 750, 306, defaultWleemMaxHP, defaultWleemMaxHP, imgWleemBattle, "no", 0, 0, 0, 0, imgPlayerBattle, "no", 0, 0, 0, 0, imgPlayerBattle, "no", 0, 0, 0, 0, imgPlayerBattle, "normal", musicTrobbioButItsTheWorldRevolving)
    };
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
        attackButton1Text = "attack 1"
        attackButton2Text = "attack 2"
        attackButton3Text = "attack 3"
        attackButton4Text = "attack 4"
        attackButton5Text = "attack 5"
        attackButton6Text = "attack 6"
        talkButton1Text = "talk 1"
        talkButton2Text = "talk 2"
        talkButton3Text = "talk 3"
        spellButton1Text = "heal 1"
        spellButton2Text = "heal 2"
        spellButton3Text = "heal 3"
        
        attackButton1EXCost = 0
        attackButton2EXCost = 0
        attackButton3EXCost = 0
        attackButton4EXCost = 0
        attackButton5EXCost = 0
        attackButton6EXCost = 0
        talkButton1EXCost = 0
        talkButton2EXCost = 0
        talkButton3EXCost = 0
        spellButton1EXCost = 20
        spellButton2EXCost = 40
        spellButton3EXCost = 60
        battleMusic.loop()

        battlePlayer1 = new Sprite(p1X, p1Y, 50, 100, 'k');
        battlePlayer1Type = p1Type;
        battlePlayer1State = "idle";
        battlePlayer1MaxHP = p1MaxHp;
        battlePlayer1HP = p1HP;
        battlePlayer1EX = 20;
        battlePlayer1.image = p1Img;

        battlePlayer1HPBarRed = new Sprite(p1X, (p1Y - 70), 100, 10, 'k');
        battlePlayer1HPBarRed.color = '#720000'
        battlePlayer1HPBarYellow = new Sprite(p1X, (p1Y - 70), (battlePlayer1HP * -1) * (100/battlePlayer1MaxHP), 10, 'k');
        battlePlayer1HPBarYellow.color = '#fff530'
        battlePlayer1HPBarGreen = new Sprite(p1X, (p1Y - 70), battlePlayer1HP * (100/battlePlayer1MaxHP), 10, 'k');
        battlePlayer1HPBarGreen.color = '#30ff7f'
        battlePlayer1HPBarRed.visible = false;
        battlePlayer1HPBarYellow.visible = false;
        battlePlayer1HPBarGreen.visible = false;

        battlePlayer1EXBarGray = new Sprite((p1X - 60), p1Y, 5, 100, 'k');
        battlePlayer1EXBarGray.color = '#292929'
        battlePlayer1EXBarCyan = new Sprite((p1X - 60), p1Y, 5, battlePlayer1EX, 'k');
        battlePlayer1EXBarCyan.color = '#30fff1'

        if(p1Type === "no"){
            battlePlayer1.visible = false;
            battlePlayer1HPBarGreen.visible = false;
            battlePlayer1HPBarYellow.visible = false;
            battlePlayer1HPBarRed.visible = false;
            battlePlayer1EXBarCyan.visible = false;
            battlePlayer1EXBarGray.visible = false;
        };

        battlePlayer2 = new Sprite(p2X, p2Y, 50, 100, 'k');
        battlePlayer2Type = p2Type;
        battlePlayer2State = "idle";
        battlePlayer2MaxHP = p2MaxHp;
        battlePlayer2HP = p2HP;
        battlePlayer2EX = 20;
        battlePlayer2.image = p2Img;

        battlePlayer2HPBarRed = new Sprite(p2X, (p2Y - 70), 100, 10, 'k');
        battlePlayer2HPBarRed.color = '#720000'
        battlePlayer2HPBarYellow = new Sprite(p2X, (p2Y - 70), (battlePlayer2HP * -1) * (100/battlePlayer2MaxHP), 10, 'k');
        battlePlayer2HPBarYellow.color = '#fff530'
        battlePlayer2HPBarGreen = new Sprite(p2X, (p2Y - 70), battlePlayer2HP * (100/battlePlayer2MaxHP), 10, 'k');
        battlePlayer2HPBarGreen.color = '#30ff7f'
        battlePlayer2HPBarRed.visible = false;
        battlePlayer2HPBarYellow.visible = false;
        battlePlayer2HPBarGreen.visible = false;

        battlePlayer2EXBarGray = new Sprite((p2X - 60), p2Y, 5, 100, 'k');
        battlePlayer2EXBarGray.color = '#292929'
        battlePlayer2EXBarCyan = new Sprite((p2X - 60), p2Y, 5, battlePlayer2EX, 'k');
        battlePlayer2EXBarCyan.color = '#30fff1'

        if(p2Type === "no"){
            battlePlayer2.visible = false;
            battlePlayer2HPBarGreen.visible = false;
            battlePlayer2HPBarYellow.visible = false;
            battlePlayer2HPBarRed.visible = false;
            battlePlayer2EXBarCyan.visible = false;
            battlePlayer2EXBarGray.visible = false;
        };

        battlePlayer3 = new Sprite(p3X, p3Y, 50, 100, 'k');
        battlePlayer3Type = p3Type;
        battlePlayer3State = "idle";
        battlePlayer3MaxHP = p3MaxHp;
        battlePlayer3HP = p3HP;
        battlePlayer3EX = 20;
        battlePlayer3.image = p3Img;

        battlePlayer3HPBarRed = new Sprite(p3X, (p3Y - 70), 100, 10, 'k');
        battlePlayer3HPBarRed.color = '#720000'
        battlePlayer3HPBarYellow = new Sprite(p3X, (p3Y - 70), (battlePlayer3HP * -1) * (100/battlePlayer3MaxHP), 10, 'k');
        battlePlayer3HPBarYellow.color = '#fff530'
        battlePlayer3HPBarGreen = new Sprite(p3X, (p3Y - 70), battlePlayer3HP * (100/battlePlayer3MaxHP), 10, 'k');
        battlePlayer3HPBarGreen.color = '#30ff7f'
        battlePlayer3HPBarRed.visible = false;
        battlePlayer3HPBarYellow.visible = false;
        battlePlayer3HPBarGreen.visible = false;

        battlePlayer3EXBarGray = new Sprite((p3X - 60), p3Y, 5, 100, 'k');
        battlePlayer3EXBarGray.color = '#292929'
        battlePlayer3EXBarCyan = new Sprite((p3X - 60), p3Y, 5, battlePlayer3EX, 'k');
        battlePlayer3EXBarCyan.color = '#30fff1'

        if(p3Type === "no"){
            battlePlayer3.visible = false;
            battlePlayer3HPBarGreen.visible = false;
            battlePlayer3HPBarYellow.visible = false;
            battlePlayer3HPBarRed.visible = false;
            battlePlayer3EXBarCyan.visible = false;
            battlePlayer3EXBarGray.visible = false;
        };

        battlePlayer4 = new Sprite(p4X, p4Y, 50, 100, 'k');
        battlePlayer4Type = p4Type;
        battlePlayer4State = "idle";
        battlePlayer4MaxHP = p4MaxHp;
        battlePlayer4HP = p4HP;
        battlePlayer4EX = 20;
        battlePlayer4.image = p4Img;

        battlePlayer4HPBarRed = new Sprite(p2X, (p2Y - 70), 100, 10, 'k');
        battlePlayer4HPBarRed.color = '#720000'
        battlePlayer4HPBarYellow = new Sprite(p4X, (p4Y - 70), (battlePlayer4HP * -1) * (100/battlePlayer4MaxHP), 10, 'k');
        battlePlayer4HPBarYellow.color = '#fff530'
        battlePlayer4HPBarGreen = new Sprite(p2X, (p2Y - 70), battlePlayer4HP * (100/battlePlayer4MaxHP), 10, 'k');
        battlePlayer4HPBarGreen.color = '#30ff7f'
        battlePlayer4HPBarRed.visible = false;
        battlePlayer4HPBarYellow.visible = false;
        battlePlayer4HPBarGreen.visible = false;

        battlePlayer4EXBarGray = new Sprite((p4X - 60), p4Y, 5, 100, 'k');
        battlePlayer4EXBarGray.color = '#292929'
        battlePlayer4EXBarCyan = new Sprite((p4X - 60), p4Y, 5, battlePlayer4EX, 'k');
        battlePlayer4EXBarCyan.color = '#30fff1'

        if(p4Type === "no"){
            battlePlayer4.visible = false;
            battlePlayer4HPBarGreen.visible = false;
            battlePlayer4HPBarYellow.visible = false;
            battlePlayer4HPBarRed.visible = false;
            battlePlayer4EXBarCyan.visible = false;
            battlePlayer4EXBarGray.visible = false;
        };

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
            battlePlayer1TypeImg = imgDugTurnPlate;
        } else if (battlePlayer1Type === "Wleem") {
            battlePlayer1TypeImg = imgWleemTurnPlate;
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
            battlePlayer2TypeImg = imgDugTurnPlate;
        } else if (battlePlayer2Type === "Wleem") {
            battlePlayer2TypeImg = imgWleemTurnPlate;
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
            battlePlayer3TypeImg = imgDugTurnPlate;
        } else if (battlePlayer3Type === "Wleem") {
            battlePlayer3TypeImg = imgWleemTurnPlate;
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
            battlePlayer4TypeImg = imgDugTurnPlate;
        } else if (battlePlayer4Type === "Wleem") {
            battlePlayer4TypeImg = imgWleemTurnPlate;
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
            battleEnemie1TypeImg = imgDugTurnPlate;
        } else if (battleEnemie1Type === "Wleem") {
            battleEnemie1TypeImg = imgWleemTurnPlate;
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
            battleEnemie2TypeImg = imgDugTurnPlate;
        } else if (battleEnemie2Type === "Wleem") {
            battleEnemie2TypeImg = imgWleemTurnPlate;
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
            battleEnemie3TypeImg = imgDugTurnPlate;
        } else if (battleEnemie3Type === "Wleem") {
            battleEnemie3TypeImg = imgWleemTurnPlate;
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
            battleEnemie4TypeImg = imgDugTurnPlate;
        } else if (battleEnemie4Type === "Wleem") {
            battleEnemie4TypeImg = imgWleemTurnPlate;
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
};

function makeMainMenu(){
    mainMenuBG = new Sprite(544, 306, 1, 1, 'k');
    mainMenuBG.image = imgMainMenuBG
    mainMenuBG.scale = 1.9

    mainMenuStart = new Sprite(75, 375, 150, 50, 'k');
    mainMenuStart.image = imgMainMenuStart

    mainMenuOptions = new Sprite(105, 450, 200, 50, 'k');
    mainMenuOptions.image = imgMainMenuOptions

    mainMenuHelp = new Sprite(110, 515, 200, 50, 'k');
    mainMenuHelp.image = imgMainMenuHelp

    mainMenuCredits = new Sprite(95, 575, 200, 50, 'k');
    mainMenuCredits.image = imgMainMenuCredits
};

function startGame(){
    mainMenuBG.remove();
    mainMenuStart.remove();
    mainMenuOptions.remove();
    mainMenuHelp.remove();
    mainMenuCredits.remove();
    inMainMenu = 0
    makeMap(1)
}
/*******************************************************/
//  END OF APP
/*******************************************************/