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
    imgMerpTurnPlate = loadImage('assets/images/turnPlates/MerpTurnPlate.svg');
    imgUnkownTurnPlate = loadImage('assets/images/turnPlates/UnkownTurnPlate.svg');
    imgGlorbTurnPlate = loadImage('assets/images/turnPlates/GlorbTurnPlate.svg');

    musicTrobbioButItsTheWorldRevolving = loadSound('assets/audio/music/Trobbio_but_its_THE_WORLD_REVOLVING__Tarro57.mp3')
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
        battleTotalTurn = 0
        shuffledBattleTurnArray = shuffle(battleTurnArray);
        console.log(shuffledBattleTurnArray)
		battleTurn = shuffledBattleTurnArray[1]
        musicTrobbioButItsTheWorldRevolving.loop()

        battlePlayer1 = new Sprite(100, 100, 50, 100, 'k');
        battlePlayer1Type = "Merp";
        battlePlayer1State = "idle";
        battlePlayer1MaxHP = 30;
        battlePlayer1HP = 30;
        battlePlayer1.image = imgPlayerBattle;

        battlePlayer1HPBarRed = new Sprite(100, 35, 100, 10, 'k');
        battlePlayer1HPBarRed.color = '#720000'
        battlePlayer1HPBarGreen = new Sprite(100, 35, battlePlayer1HP * (100/battlePlayer1MaxHP), 10, 'k');
        battlePlayer1HPBarGreen.color = '#30ff7f'
        battlePlayer1HPBarRed.visible = false;
        battlePlayer1HPBarGreen.visible = false;


        battlePlayer2 = new Sprite(100, 300, 50, 100, 'k');
        battlePlayer2Type = "Unkown";
        battlePlayer2State = "idle";
        battlePlayer2MaxHP = 35;
        battlePlayer2HP = 35;
        battlePlayer2.image = imgUnkownBattle;

        battlePlayer2HPBarRed = new Sprite(100, 215, 100, 10, 'k');
        battlePlayer2HPBarRed.color = '#720000'
        battlePlayer2HPBarGreen = new Sprite(100, 215, battlePlayer2HP * (100/battlePlayer2MaxHP), 10, 'k');
        battlePlayer2HPBarGreen.color = '#30ff7f'
        battlePlayer2HPBarRed.visible = false;
        battlePlayer2HPBarGreen.visible = false;

        //battlePlayer1 = new Sprite(100, 100, 50, 100, 'k');
        battlePlayer3Type = "Merp";
        battlePlayer3State = "idle";
        battlePlayer3MaxHP = 25;
        battlePlayer3HP = 25;
    //  battlePlayer1.image = imgPlayerBattle;

        //battlePlayer1 = new Sprite(100, 100, 50, 100, 'k');
        battlePlayer4Type = "Unkown";
        battlePlayer4State = "idle";
        battlePlayer4MaxHP = 30;
        battlePlayer4HP = 30;
    //  battlePlayer4.image = imgPlayerBattle;

        battleEnemie1 = new Sprite(800, 100, 50, 100, 'k');
        battleEnemie1Type = "Glorb";
        battleEnemie1State = "idle";
        battleEnemie1MaxHP = 40;
        battleEnemie1HP = 40;
        battleEnemie1.image = imgGlorbBattle;

        battleEnemie1HPBarRed = new Sprite(800, 25, 100, 10, 'k');
        battleEnemie1HPBarRed.color = '#720000'
        battleEnemie1HPBarGreen = new Sprite(800, 25, battleEnemie1HP * (100/battleEnemie1MaxHP), 10, 'k');
        battleEnemie1HPBarGreen.color = '#30ff7f'
        battleEnemie1HPBarRed.visible = false;
        battleEnemie1HPBarGreen.visible = false;


        battleEnemie2 = new Sprite(650, 200, 50, 100, 'k');
        battleEnemie2Type = "Glorb";
        battleEnemie2State = "idle";
        battleEnemie2MaxHP = 40;
        battleEnemie2HP = 40;
        battleEnemie2.image = imgGlorbBattle;

        battleEnemie2HPBarRed = new Sprite(650, 125, 100, 10, 'k');
        battleEnemie2HPBarRed.color = '#720000'
        battleEnemie2HPBarGreen = new Sprite(650, 125, battleEnemie2HP * (100/battleEnemie2MaxHP), 10, 'k');
        battleEnemie2HPBarGreen.color = '#30ff7f'
        battleEnemie2HPBarRed.visible = false;
        battleEnemie2HPBarGreen.visible = false;


        battleEnemie3 = new Sprite(650, 400, 50, 100, 'k');
        battleEnemie3Type = "Glorb";
        battleEnemie3State = "idle";
        battleEnemie3MaxHP = 40;
        battleEnemie3HP = 40;
        battleEnemie3.image = imgGlorbBattle;

        battleEnemie3HPBarRed = new Sprite(650, 325, 100, 10, 'k');
        battleEnemie3HPBarRed.color = '#720000'
        battleEnemie3HPBarGreen = new Sprite(650, 325, battleEnemie3HP * (100/battleEnemie3MaxHP), 10, 'k');
        battleEnemie3HPBarGreen.color = '#30ff7f'
        battleEnemie3HPBarRed.visible = false;
        battleEnemie3HPBarGreen.visible = false;


        battleEnemie4 = new Sprite(800, 500, 50, 100, 'k');
        battleEnemie4Type = "Glorb";
        battleEnemie4State = "idle";
        battleEnemie4MaxHP = 40;
        battleEnemie4HP = 40;
        battleEnemie4.image = imgGlorbBattle;

        battleEnemie4HPBarRed = new Sprite(800, 425, 100, 10, 'k');
        battleEnemie4HPBarRed.color = '#720000'
        battleEnemie4HPBarGreen = new Sprite(800, 425, battleEnemie4HP * (100/battleEnemie4MaxHP), 10, 'k');
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
        text(battleChosenMove, 450, 100);

        battlePlayer1HPBarGreen.width = battlePlayer1HP * (100/battlePlayer1MaxHP);
        battlePlayer2HPBarGreen.width = battlePlayer2HP * (100/battlePlayer2MaxHP);

        battleEnemie1HPBarGreen.width = battleEnemie1HP * (100/battleEnemie1MaxHP);
        battleEnemie2HPBarGreen.width = battleEnemie2HP * (100/battleEnemie2MaxHP);
        battleEnemie3HPBarGreen.width = battleEnemie3HP * (100/battleEnemie3MaxHP);
        battleEnemie4HPBarGreen.width = battleEnemie4HP * (100/battleEnemie4MaxHP);


        if(battleEnemie1HP === 0){
            battleEnemie1.visible = false
        };

        if(battleEnemie2HP === 0){
            battleEnemie2.visible = false
        };

        if(battleEnemie3HP === 0){
            battleEnemie3.visible = false
        };

        if(battleEnemie4HP === 0){
            battleEnemie4.visible = false
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
            battlePlayer1HPBarRed.visible = false;
            battlePlayer1HPBarGreen.visible = false;
            battlePlayer2HPBarRed.visible = false;
            battlePlayer2HPBarGreen.visible = false;
            battleEnemie1HPBarRed.visible = false;
            battleEnemie1HPBarGreen.visible = false;
            battleEnemie2HPBarRed.visible = false;
            battleEnemie2HPBarGreen.visible = false;
            battleEnemie3HPBarRed.visible = false;
            battleEnemie3HPBarGreen.visible = false;
            battleEnemie4HPBarRed.visible = false;
            battleEnemie4HPBarGreen.visible = false;
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
                attackButton.color = '#afafaf'
                defendButton.color = '#000000'
                talkButton.color = '#000000'
                spellButton.color = '#000000'
            } else if(battleButtonHover === 2 && inBattleMenu === "base") {
                attackButton.color = '#000000'
                defendButton.color = '#afafaf'
                talkButton.color = '#000000'
                spellButton.color = '#000000'
            } else if (battleButtonHover === 3 && inBattleMenu === "base") {
                attackButton.color = '#000000'
                defendButton.color = '#000000'
                talkButton.color = '#afafaf'
                spellButton.color = '#000000'
            } else if (battleButtonHover === 4 && inBattleMenu === "base") {
                attackButton.color = '#000000'
                defendButton.color = '#000000'
                talkButton.color = '#000000'
                spellButton.color = '#afafaf'
            } else if(inBattleMenu === "attack") {
                attackButton.color = '#afafaf'
                defendButton.color = '#000000'
                talkButton.color = '#000000'
                spellButton.color = '#000000'
            } else if(inBattleMenu === "spells") {
                attackButton.color = '#000000'
                defendButton.color = '#000000'
                talkButton.color = '#afafaf'
                spellButton.color = '#000000'
            } else if(inBattleMenu === "talk") {
                attackButton.color = '#000000'
                defendButton.color = '#000000'
                talkButton.color = '#000000'
                spellButton.color = '#afafaf'
            }

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
                battleEnemie1.tint = 255
                battleEnemie2.tint = 155
                battleEnemie3.tint = 155
                battleEnemie4.tint = 155
            } else if(battleButtonHover === 2 && inBattleMenu === "choseEnemie") {
                battleEnemie1.tint = 155
                battleEnemie2.tint = 255
                battleEnemie3.tint = 155
                battleEnemie4.tint = 155
            } else if (battleButtonHover === 3 && inBattleMenu === "choseEnemie") {
                battleEnemie1.tint = 155
                battleEnemie2.tint = 155
                battleEnemie3.tint = 255
                battleEnemie4.tint = 155
            } else if (battleButtonHover === 4 && inBattleMenu === "choseEnemie") {
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

            if (kb.pressed ('x') && battleButtonHover === 1 && inBattleMenu === "base") {
                inBattleMenu = "attack"
                battleButtonHover = 1
                battleSelectAttack()
            };

            if (kb.pressed ('x') && battleButtonHover === 2 && inBattleMenu === "base") {
                battleChosenMove = "defend"
                endTurn()
            };

            if (kb.pressed ('x') && battleButtonHover === 3 && inBattleMenu === "base") {
                inBattleMenu = "spells"
                battleButtonHover = 1
                battleSelectSpell()
            };

            if (kb.pressed ('x') && battleButtonHover === 4 && inBattleMenu === "base") {
                inBattleMenu = "talk"
                battleButtonHover = 1
                battleSelectTalk()
            };

            if (kb.pressed ('x') && battleButtonHover === 1 && inBattleMenu === "attack") {
                battleChosenMove = "attack1"
                //inBattleMenu = "choseEnemie"
                //battleButtonHover = 0
                //changeBattleButtonHoverEnemie(1)
                //choseEnemieToAttack()
            };

            if (kb.pressed ('x') && battleButtonHover === 2 && inBattleMenu === "attack") {
                battleChosenMove = "attack2"
                inBattleMenu = "choseEnemie"
                battleButtonHover = 0
                changeBattleButtonHoverEnemie(1)
                choseEnemieToAttack()
            };

            if (kb.pressed ('x') && battleButtonHover === 3 && inBattleMenu === "attack") {
                battleChosenMove = "attack3"
                inBattleMenu = "choseEnemie"
                battleButtonHover = 0
                changeBattleButtonHoverEnemie(1)
                choseEnemieToAttack()
            };

            if (kb.pressed ('x') && battleButtonHover === 4 && inBattleMenu === "attack") {
                battleChosenMove = "attack4"
                inBattleMenu = "choseEnemie"
                battleButtonHover = 0
                changeBattleButtonHoverEnemie(1)
                choseEnemieToAttack()
            };

            if (kb.pressed ('x') && battleButtonHover === 5 && inBattleMenu === "attack") {
                battleChosenMove = "attack5"
                inBattleMenu = "choseEnemie"
                battleButtonHover = 0
                changeBattleButtonHoverEnemie(1)
                choseEnemieToAttack()
            };

            if (kb.pressed ('x') && battleButtonHover === 6 && inBattleMenu === "attack") {
                battleChosenMove = "attack6"
                inBattleMenu = "choseEnemie"
                battleButtonHover = 0
                changeBattleButtonHoverEnemie(1)
                choseEnemieToAttack()
            };

            if (kb.pressed ('x') && battleButtonHover === 1 && inBattleMenu === "spells") {
                battleChosenMove = "spell1"
            };

            if (kb.pressed ('x') && battleButtonHover === 2 && inBattleMenu === "spells") {
                battleChosenMove = "spell2"
            };

            if (kb.pressed ('x') && battleButtonHover === 3 && inBattleMenu === "spells") {
                battleChosenMove = "spell3"
            };

            if (kb.pressed ('x') && battleButtonHover === 1 && inBattleMenu === "talk") {
                battleChosenMove = "talk1"
            };

            if (kb.pressed ('x') && battleButtonHover === 2 && inBattleMenu === "talk") {
                battleChosenMove = "talk2"
            };

            if (kb.pressed ('x') && battleButtonHover === 3 && inBattleMenu === "talk") {
                battleChosenMove = "talk3"
            };

            if (kb.pressed ('x') && battleButtonHover === 1 && inBattleMenu === "choseEnemie") {
                battleEnemie1HP = battleEnemie1HP - 5
                //battleBackAttack()
               // battleBackBase()
                //endTurn()
            };

            if (kb.pressed ('x') && battleButtonHover === 2 && inBattleMenu === "choseEnemie") {
                battleEnemie2HP = battleEnemie2HP - 5
                battleBackAttack()
                battleBackBase()
                endTurn()
            };

            if (kb.pressed ('x') && battleButtonHover === 3 && inBattleMenu === "choseEnemie") {
                battleEnemie3HP = battleEnemie3HP - 5
                battleBackAttack()
                battleBackBase()
                endTurn()
            };

            if (kb.pressed ('x') && battleButtonHover === 4 && inBattleMenu === "choseEnemie") {
                battleEnemie4HP = battleEnemie4HP - 5
                battleBackAttack()
                battleBackBase()
                endTurn()
            };

            if (kb.pressed ('z') && (inBattleMenu !== "base" && inBattleMenu !== "choseEnemie")) {
                if(inBattleMenu === "attack"){
                    battleButtonHover = 1
                } else if(inBattleMenu === "spells"){
                    battleButtonHover = 3
                } else if(inBattleMenu === "talk"){
                    battleButtonHover = 4
                };
                battleBackBase()
                inBattleMenu = "base"
            };

            if (kb.pressed ('z') && inBattleMenu === "choseEnemie") {
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

function startTurn(){
    if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p1"){
        battleButtonHover = 1
        attackButton = new Sprite(70, 170, 15, 15, 'k');
        defendButton = new Sprite(90, 170, 15, 15, 'k');
        talkButton = new Sprite(110, 170, 15, 15, 'k');    
        spellButton = new Sprite(130, 170, 15, 15, 'k');
    } else if(shuffledBattleTurnArray[0 + battleTotalTurn] === "p2"){
        battleButtonHover = 1
        attackButton = new Sprite(70, 400, 15, 15, 'k');
        defendButton = new Sprite(90, 400, 15, 15, 'k');
        talkButton = new Sprite(110, 400, 15, 15, 'k');    
        spellButton = new Sprite(130, 400, 15, 15, 'k');
    }
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
    startTurn()
}

/*******************************************************/
//  END OF APP
/*******************************************************/