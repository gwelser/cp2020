function getRandomInt(min, max) {
    "use strict";
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function enableForms() {
    "use strict";
    /*
     Only enable forms after choosing Character Point roll method (random, manual, hero)
     Don't disable Run, Leap & Lift because they are derived
     */
    //Statistics fields
    var int = document.getElementById("int");
    var ref = document.getElementById("ref");
    var tech = document.getElementById("tech");
    var cl = document.getElementById("cl");
    var att = document.getElementById("att");
    var lk = document.getElementById("lk");
    var ma = document.getElementById("ma");
    var bt = document.getElementById("bt"); //body type stat
    var emp = document.getElementById("emp");

    var formArr = [int, ref, tech, cl, att, lk, ma, bt, emp];
    for (var i = 0; i < formArr.length; i++) {
        formArr[i].removeAttribute("disabled");
        //re-enable to implement checking stats against roll remaining
        formArr[i].onchange = characterMeta.statChange;
    }
}

function randomStyleClick() {
    "use strict";

    var clothesRoll = getRandomInt(1, 10); // Clothes Object
    var hairRoll = getRandomInt(1, 10); // HairStyle Object
    var affecRoll = getRandomInt(1, 10); // Affectations Object

    //Output fields for Clothes, Hair, Affectations
    var clothesField = document.getElementById("clothesField");
    var hairField = document.getElementById("hairField");
    var affecField = document.getElementById("affecField");

    clothesField.innerHTML = clothes[clothesRoll];
    //Update the character output for clothes
    var clothesCharOutput = document.getElementById("clothesCharOutput");
    clothesCharOutput.innerHTML = clothesField.innerHTML;

    hairField.innerHTML = hairStyle[hairRoll];
    //Update the character output for hair
    var hairCharOutput = document.getElementById("hairCharOutput");
    hairCharOutput.innerHTML = hairField.innerHTML;

    affecField.innerHTML = affectations[affecRoll];
    //Update affectations output
    var affecCharOutput = document.getElementById("affecCharOutput");
    affecCharOutput.innerHTML = affecField.innerHTML;
}

function rollEthClick() {
    "use strict";

    var ethRoll = (getRandomInt(1, 10) - 1);
    var langLength = ethnic.origins[ethRoll].languages.length;
    var langChoice = Math.floor(Math.random() * langLength);
    var ethField = document.getElementById("ethField");
    var ethLang = document.getElementById("ethLang");

    ethField.innerHTML = ethnic.origins[ethRoll].origin;
    ethLang.innerHTML = ethnic.origins[ethRoll].languages[langChoice];

    var ethCharOutput = document.getElementById("ethCharOutput");
    ethCharOutput.innerHTML = ethField.innerHTML;

    var langCharOutput = document.getElementById("langCharOutput");
    //var ethLang = document.getElementById("ethLang");
    langCharOutput.innerHTML = ethLang.innerHTML;
}

function randFamClick() {
    "use strict";

    var famRankField = document.getElementById("famRankField");
    var randFamRoll = getRandomInt(1, 10);
    famRankField.innerHTML = famRank[randFamRoll];

    var famRankCharOutput = document.getElementById("famRankCharOutput");
    famRankCharOutput.innerHTML = famRankField.innerHTML;
}

function randParentsClick() {
    "use strict";
    var parentStatusField = document.getElementById("parentStatusField");
    var parentSomethingHappened = document.getElementById("parentSomethingHappened");
    var parentSomethingHappenedField = document.getElementById("parentSomethingHappenedField");

    parentSomethingHappened.style.display = "none";
    parentSomethingHappenedField.style.display = "none"; //hide this initially

    var randParentRoll = getRandomInt(1, 10);

    var parentStatusCharOutput = document.getElementById("parentStatusCharOutput");

    if (randParentRoll <= 6) {
        parentStatusField.innerHTML = parentStatus.okay;
        parentStatusCharOutput.innerHTML = parentStatusField.innerHTML;
    } else if (randParentRoll >= 7) {
        parentSomethingHappened.style.display = "block";
        parentSomethingHappenedField.style.display = "block";
        parentStatusField.innerHTML = parentStatus.somethingHappened;
        var parentTragedyRoll = getRandomInt(1, 10);
        parentSomethingHappenedField.innerHTML = parentTragedy[parentTragedyRoll];
        parentStatusCharOutput.innerHTML = parentStatusField.innerHTML.concat("; ").concat(parentSomethingHappenedField.innerHTML.toLowerCase());
    }

}

function randFamilyStatusClick() {
    "use strict";
    var familyTragedyOutput = document.getElementById("familyTragedyOutput");
    var famTragedyHeader = document.getElementById("famTragedyHeader");
    var familyStatus = document.getElementById("familyStatus");
    var familyStatusCharOutput = document.getElementById("familyStatusCharOutput");

    famTragedyHeader.style.display = "none";
    famTragedyHeader.style.display = "none";

    var famStatusRoll = getRandomInt(1, 10);
    if (famStatusRoll <= 6) {
        // Family is in danger
        famTragedyHeader.style.display = "block";
        familyStatus.style.display = "inline";
        familyStatus.innerHTML = familyStatusOptions.danger;
        familyTragedyOutput.style.display = "inline";
        var famTragedyRoll = getRandomInt(1, 10);
        familyTragedyOutput.innerHTML = familyTragedy[famTragedyRoll];
        familyStatusCharOutput.innerHTML = familyStatus.innerHTML.concat("; ").concat(familyTragedyOutput.innerHTML.toLowerCase());
    } else if (famStatusRoll >= 7) {
        // Family is okay
        familyStatus.innerHTML = familyStatusOptions.okay;
        familyTragedyOutput.style.display = "none";
        familyStatusCharOutput.innerHTML = familyStatus.innerHTML;
    }
}

function randChildEnvClick() {
    "use strict";
    var childEnvOutput = document.getElementById("childEnvOutput");

    var randChildRoll = getRandomInt(1, 10);
    childEnvOutput.innerHTML = childEnv[randChildRoll];

    var childEnvCharOutput = document.getElementById("childEnvCharOutput");
    childEnvCharOutput.innerHTML = childEnvOutput.innerHTML;
}

function killChildren(myNode) {
    "use strict";
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function randSiblingsClick() {
    "use strict";
    var numSiblings = getRandomInt(1, 10);
    var siblingsOutput = document.getElementById("siblingsOutput");
    killChildren(siblingsOutput);

    var charSiblingOutputNum = document.getElementById("charSiblingOutputNum");
    charSiblingOutputNum.innerHTML = numSiblings;

    var charSiblingOutput = document.getElementById("charSiblingOutput");
    while (charSiblingOutput.firstChild) {
        charSiblingOutput.removeChild(charSiblingOutput.firstChild);
    }

    var haveSiblings = document.getElementById("haveSiblings");
    if (numSiblings <= 7) {
        haveSiblings.innerHTML = "You have ".concat(numSiblings.toString()).concat(" siblings");

        for (var i = 1; i <= numSiblings; i++) {
            var siblingGender = getRandomInt(1, 2);
            var siblingAge = getRandomInt(1, 10);
            var siblingFeel = getRandomInt(1, 10);

            var siblingOut = "Sibling " + i.toString() + ": " + siblingAges[siblingAge] + " " + siblingGenders[siblingGender] +
                " " + siblingFeelings[siblingFeel];

            siblingsOutput.innerHTML += siblingOut;
            appendBR(siblingsOutput);

            charSiblingOutput.innerHTML += siblingOut;
            appendBR(charSiblingOutput);
        }
    } else if (numSiblings >= 8) {
        haveSiblings.value = "Only child; no siblings";
        charSiblingOutputNum.innerHTML = "0";
    }
}

function appendBR(toParent) {
    "use strict";
    var br = document.createElement("br");
    br.setAttribute("class", "dynamicBR");
    toParent.appendChild(br);
}

function randPersTraitsClick() {
    "use strict";
    var persTraitsField = document.getElementById("persTraitsField");
    var persRoll = getRandomInt(1, 10);
    persTraitsField.innerHTML = persTraits[persRoll];

    var persTraitCharOutput = document.getElementById("persTraitCharOutput");
    persTraitCharOutput.innerHTML = persTraitsField.innerHTML;

}

function randPersValueClick() {
    "use strict";
    var persValRoll = getRandomInt(1, 10);
    var persValField = document.getElementById("persValField");
    persValField.innerHTML = persValued[persValRoll];

    var persValCharOutput = document.getElementById("persValCharOutput");
    persValCharOutput.innerHTML = persValField.innerHTML;
}

function randYouValueClick() {
    "use strict";
    var youValRoll = getRandomInt(1, 10);
    var youValField = document.getElementById("youValField");
    youValField.innerHTML = youValue[youValRoll];

    var valMostCharOutput = document.getElementById("valMostCharOutput");
    valMostCharOutput.innerHTML = youValField.innerHTML;
}

function randYouFeelClick() {
    "use strict";
    var youFeelRoll = getRandomInt(1, 10);
    var youFeelField = document.getElementById("youFeelField");
    youFeelField.innerHTML = howFeel[youFeelRoll];

    var feelPeopleCharOutput = document.getElementById("feelPeopleCharOutput");
    feelPeopleCharOutput.innerHTML = youFeelField.innerHTML;
}

function randPosClick() {
    "use strict";
    var posRoll = getRandomInt(1, 10);
    var posField = document.getElementById("posField");
    posField.innerHTML = valuedPos[posRoll];

    var valPosessionCharOutput = document.getElementById("valPosessionCharOutput");
    valPosessionCharOutput.innerHTML = posField.innerHTML;
}

function randAgeClick() {
    "use strict";
    // Remove all children from lifeTable
    var lifeTable = document.getElementById("lifeTable");
    lifeTable.style.display = "block";
    var rowCount = lifeTable.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        lifeTable.deleteRow(i);
    }

    var ageField = document.getElementById("ageField");
    var ageRoll1 = getRandomInt(1, 6);
    var ageRoll2 = getRandomInt(1, 6);
    var numEvents = ageRoll1 + ageRoll2;
    var age = numEvents + 16;
    ageField.value = age;
    var lifeEventStart = 17;

    // Clean out the previous (if applicable) charLifeEvents div
    var charLifeEvents = document.getElementById("charLifeEvents");
    while (charLifeEvents.firstChild) {
        charLifeEvents.removeChild(charLifeEvents.firstChild);
    }

    // Create Life Events
    for (var j = lifeEventStart; j <= age; j++) {
        randLifeEvent(j);
    }
}

function ageChange() {
    "use strict";
    // Remove all children from lifeTable
    var lifeTable = document.getElementById("lifeTable");
    lifeTable.style.display = "block";
    var rowCount = lifeTable.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        lifeTable.deleteRow(i);
    }

    // Clean out the previous (if applicable) charLifeEvents div
    var charLifeEvents = document.getElementById("charLifeEvents");
    while (charLifeEvents.firstChild) {
        charLifeEvents.removeChild(charLifeEvents.firstChild);
    }

    var ageField = document.getElementById("ageField");
    if (ageField.value === "" || isNaN(ageField.value)) {
        return;
    }
    var ageFieldValue = ageField.value;

    if (ageFieldValue >= 17) {
        var lifeEventStart = 17;
        var age = ageField.value;
        // Life Events
        for (var j = lifeEventStart; j <= age; j++) {
            randLifeEvent(j);
        }
    }
}

function addLifeRowEnemy(td1Val, td2Val, td3Val) {
    "use strict";
    var lifeTable = document.getElementById("lifeTable");
    var tBody = lifeTable.getElementsByTagName("tbody");
    var newRow = document.createElement("tr");

    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    td3.setAttribute("colspan", "2");

    td1.innerHTML = td1Val;
    td2.innerHTML = td2Val;
    td3.appendChild(td3Val);

    newRow.appendChild(td1);
    newRow.appendChild(td2);
    newRow.appendChild(td3);

    tBody[0].appendChild(newRow);
}

function addLifeRow(td1Val, td2Val, td3Val, td4Val) {
    "use strict";
    /*
     Adds the row for the lifeTable table
     example usage: addLifeRow(age, eventType, enemy.enemyGender[age], enemyDetailTable);
     */
    var lifeTable = document.getElementById("lifeTable");
    var tBody = lifeTable.getElementsByTagName("tbody");

    var newRow = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");

    td1.innerHTML = td1Val;
    td2.innerHTML = td2Val;
    td3.innerHTML = td3Val;
    td4.innerHTML = td4Val;

    newRow.appendChild(td1);
    newRow.appendChild(td2);
    newRow.appendChild(td3);
    newRow.appendChild(td4);

    tBody[0].appendChild(newRow);
}

function randLifeEvent(age) {
    "use strict";
    var preventNothing = document.getElementById("preventNothing");
    // Main Life Event: Problem/Win, Friend/Enemy, Romance, Nothing
    var lifeEventRoll;
    if (preventNothing.checked) {
        lifeEventRoll = getRandomInt(1, 8);
    } else {
        lifeEventRoll = getRandomInt(1, 10);
    }
    var secondLifeRoll = getRandomInt(1, 10);
    var thirdLifeRoll = getRandomInt(1, 10);
    var fourthLifeRoll = getRandomInt(1, 10);

    var eventType = "";
    var connection = "";
    var amount = "";

    // charOutput Life Events
    var charLifeEvents = document.getElementById("charLifeEvents");

    if (lifeEventRoll <= 3) {
        // Big Problem or Win
        if ((secondLifeRoll % 2 === 0) === true) {
            // Even, Big Score
            eventType = "You Get Lucky";

            // Arguments that are duplicated a lot or used a lot, passed by .apply(null, dupAgrs) to functions
            var dupArgs = [age, eventType, getLucky[thirdLifeRoll].title, getLucky[thirdLifeRoll].detail];

            if (thirdLifeRoll === 1) {
                var connectionMade = "";
                if (fourthLifeRoll <= 4) {
                    connectionMade = getLucky.addMakePowerfulConnection("police");
                } else if (fourthLifeRoll >= 5 && fourthLifeRoll <= 7) {
                    connectionMade = getLucky.addMakePowerfulConnection("da");
                } else if (fourthLifeRoll >= 8) {
                    connectionMade = getLucky.addMakePowerfulConnection("mayor");
                }
                connectionMade = "You made a connection " + connectionMade;
                addLifeRow(age, eventType, getLucky[thirdLifeRoll].title, connectionMade);

            } else if (thirdLifeRoll === 2) {
                getLucky.addWindFall(age);
                amount = "Amount: " + getLucky.windfallHistory[age] + " eb";
                addLifeRow(age, eventType, getLucky[thirdLifeRoll].title, amount);
            } else if (thirdLifeRoll === 3) {
                getLucky.addScore(age);
                amount = amount.concat("Amount: ", getLucky.scoreHistory[age], " eb");
                addLifeRow(age, eventType, getLucky[thirdLifeRoll].title, amount);
            } else if (thirdLifeRoll === 4) {
                getLucky.addSensei(age);
                addLifeRow.apply(null, dupArgs);
            } else if (thirdLifeRoll === 5) {
                getLucky.addTeacher(getLucky, age);
                addLifeRow.apply(null, dupArgs);
            } else if (thirdLifeRoll === 6) {
                getLucky.addCorpFavor(getLucky, age);
                addLifeRow.apply(null, dupArgs);
            } else if (thirdLifeRoll === 7) {
                getLucky.addNomadFavor(getLucky, age);
                addLifeRow.apply(null, dupArgs);
            } else if (thirdLifeRoll === 8) {
                getLucky.addPoliceFriend(getLucky, age);
                addLifeRow.apply(null, dupArgs);
            } else if (thirdLifeRoll === 9) {
                getLucky.addBoosterFriend(getLucky, age);
                addLifeRow.apply(null, dupArgs);
            } else if (thirdLifeRoll === 10) {
                getLucky.addCombatTeacher(getLucky, age);
                addLifeRow.apply(null, dupArgs);
            }
        } else if ((secondLifeRoll % 2 === 0) === false) {
            // Uneven,  Disaster
            eventType = "Disaster Strikes";
            if (thirdLifeRoll === 1) {
                // Financial loss
                disaster.addDebt(age);
                amount = "Amount: ".concat(disaster.debtHistory[age], " eb");
                addLifeRow(age, eventType, disaster[thirdLifeRoll].title, amount);
            } else if (thirdLifeRoll === 2) {
                // Imprisonment
                disaster.addPrison(age);
                amount = "Time imprisoned / held hostage: ".concat(disaster.prisonHistory[age], " months");
                addLifeRow(age, eventType, disaster[thirdLifeRoll].title, amount);
            } else if (thirdLifeRoll === 3) {
                // Illness / addiction
                disaster.addIllness(age);
                addLifeRow(age, eventType, disaster[thirdLifeRoll].title, disaster[thirdLifeRoll].detail);
            } else if (thirdLifeRoll === 4) {
                // Betrayal
                disaster.addBetray(age, thirdLifeRoll, fourthLifeRoll);
                addLifeRow(age, eventType, disaster[thirdLifeRoll].title, disaster.betrayDetail[age]);
            } else if (thirdLifeRoll === 5) {
                disaster.addAccident(age, thirdLifeRoll, fourthLifeRoll);
                addLifeRow(age, eventType, disaster[thirdLifeRoll].title, disaster.accidentDetail[age]);
            } else if (thirdLifeRoll === 6) {
                disaster.loverKilled(age, thirdLifeRoll, fourthLifeRoll);
                addLifeRow(age, eventType, disaster[thirdLifeRoll].title, disaster.loverKilledDetail[age]);
            } else if (thirdLifeRoll === 7) {
                disaster.addFalseAccused(age, thirdLifeRoll, fourthLifeRoll);
                addLifeRow(age, eventType, disaster[thirdLifeRoll].title, disaster.falseAccuseDetail[age]);
            } else if (thirdLifeRoll === 8) {
                disaster.addLawHunted(age, thirdLifeRoll, fourthLifeRoll);
                addLifeRow(age, eventType, disaster[thirdLifeRoll].title, disaster.lawHuntedDetail[age]);
            } else if (thirdLifeRoll === 9) {
                disaster.addCorpHunted(age, thirdLifeRoll, fourthLifeRoll);
                addLifeRow(age, eventType, disaster[thirdLifeRoll].title, disaster.corpHuntedDetail[age]);
            } else if (thirdLifeRoll === 10) {
                disaster.addIncap(age, thirdLifeRoll, fourthLifeRoll);
                addLifeRow(age, eventType, disaster[thirdLifeRoll].title, disaster.incapDetail[age]);
            }
        }
    } else if (lifeEventRoll >= 4 && lifeEventRoll <= 6) {
        // Friend or Enemy
        if (secondLifeRoll <= 5) {
            // Make a friend
            eventType = "Make a Friend";
            friendMade.addFriend(age, thirdLifeRoll, fourthLifeRoll);
            addLifeRow(age, eventType, friendMade[thirdLifeRoll], friendMade.friendMadeGender[age]);
        } else if (secondLifeRoll >= 6) {
            // Make an enemy
            eventType = "Make an Enemy";
            enemy.addEnemy(age, thirdLifeRoll, fourthLifeRoll);
            var enemyDetailTable = addEnemyTable(
                enemy.enemyGender[age],
                enemy.enemyWhoIsIt[age],
                enemy.enemyCauseIs[age],
                enemy.enemyWhoMad[age],
                enemy.enemyWhatDo[age],
                enemy.enemyWhatThrow[age]
            );
            enemyDetailTable.setAttribute("class", "enemyDetailTable");

            // addLifeRow(age, eventType, enemy.enemyGender[age], enemyDetailTable);
            addLifeRowEnemy(age, eventType, enemyDetailTable);
        }
    } else if (lifeEventRoll >= 7 && lifeEventRoll <= 8) {
        // Romantic involvement
        var metaEventType = "Romance";
        if (secondLifeRoll <= 4) {
            eventType = metaEventType;
            romance.addHappyAffair(age);
            addLifeRow(age, eventType, romance.happyHistory[age], romance.happyDetail[age]);
        } else if (secondLifeRoll === 5) {
            eventType = metaEventType;
            romance.addTragic(age, thirdLifeRoll);
            addLifeRow(age, eventType, romance.tragicHistory[age], romance.tragicDetail[age]);
        } else if (secondLifeRoll >= 6 && secondLifeRoll <= 7) {
            eventType = metaEventType.concat(". Love Affair With Problems");
            romance.addProblem(age, thirdLifeRoll, fourthLifeRoll);
            addLifeRow(age, eventType, romance.problemHistory[age], romance.problemDetail[age]);
        } else if (secondLifeRoll >= 8) {
            eventType = metaEventType;
            romance.addFast(age);
            addLifeRow(age, eventType, romance.fastHistory[age], romance.fastDetail[age]);
        }
    } else if (lifeEventRoll >= 9) {
        // Nothing Happened
        eventType = nothing.nothingResult;
        nothing.addNothing(age);
        addLifeRow(age, eventType, nothing.nothingDetail[age], nothing.nothingDetail[age]);

    }
    //
    var lifeTable = document.getElementById("lifeTable");
    var charOutputAge = "";
    var charOutputEvent = "";
    var charOutputResult = "";
    var charOutputDetail = "";

    for (var i = 1; i < lifeTable.rows.length; i++) {
        //
        for (var j = 0; j < lifeTable.rows[i].cells.length; j++) {
            var currCell = lifeTable.rows[i].cells[j];

            charOutputAge = lifeTable.rows[i].cells[0].innerHTML; // Age

            charOutputEvent = lifeTable.rows[i].cells[1].innerHTML; // Event

            if (charOutputEvent !== "Make an Enemy") {
                charOutputResult = lifeTable.rows[i].cells[2].innerHTML;
                charOutputDetail = lifeTable.rows[i].cells[3].innerHTML;
            }

            for (var k = 0; k < currCell.childNodes.length; k++) {
                if (currCell.childNodes[k].localName === "table" && currCell.childNodes[k].localName !== "null") {
                    var tempEnemyTable = currCell.childNodes[k];
                    for (var l = 1; l < tempEnemyTable.rows.length; l++) {
                        var targetRows = tempEnemyTable.rows[l];
                        charOutputResult = "";
                        charOutputDetail = "";
                        for (var m = 0; m < targetRows.cells.length; m++) {
                            if (m === 0) {
                                // Result of make enemy life event
                                charOutputResult += targetRows.cells[m].innerHTML.concat(". ");
                            } else if (m >= 1 && m <= 4) {
                                charOutputResult += targetRows.cells[m].innerHTML.concat(". ");
                            } else if (m === 5) {
                                charOutputResult += targetRows.cells[m].innerHTML.concat(".");
                            }

                        }
                    }
                }
            }

        }
    }

    var span01 = document.createElement("span"); // Age
    span01.innerHTML = charOutputAge.concat(". ");
    charLifeEvents.appendChild(span01);

    var span02 = document.createElement("span");
    span02.innerHTML = charOutputEvent.concat(". ");
    charLifeEvents.appendChild(span02);

    var span03 = document.createElement("span");
    if (charOutputEvent !== "Make an Enemy") {
        span03.innerHTML = charOutputResult.concat(". ");
    } else {
        span03.innerHTML = charOutputResult;
    }

    if (charOutputResult !== "n/a") {
        charLifeEvents.appendChild(span03);
    }

    if (charOutputDetail !== "Make an Enemy") {
        var span04 = document.createElement("span");
        span04.innerHTML = charOutputDetail;

        if (charOutputDetail !== "n/a") {
            charLifeEvents.appendChild(span04);
        }
    }
    appendBR(charLifeEvents);
}

function addEnemyTable(tdVal1, tdVal2, tdVal3, tdVal4, tdVal5, tdVal6) {
    "use strict";
    var enemyDetailTable = document.createElement("table");

    var enemyDetailHeader = document.createElement("tr");
    enemyDetailHeader.setAttribute("class", "enemyDetailTableHeader");
    var head1 = document.createElement("td");
    var head2 = document.createElement("td");
    var head3 = document.createElement("td");
    var head4 = document.createElement("td");
    var head5 = document.createElement("td");
    var head6 = document.createElement("td");

    head1.innerHTML = "Enemy Gender";
    head2.innerHTML = "Who is this Enemy?";
    head3.innerHTML = "Cause";
    head4.innerHTML = "Who's Angry?";
    head5.innerHTML = "Reaction If You See Them?";
    head6.innerHTML = "What Can They Throw At You?";

    enemyDetailHeader.appendChild(head1);
    enemyDetailHeader.appendChild(head2);
    enemyDetailHeader.appendChild(head3);
    enemyDetailHeader.appendChild(head4);
    enemyDetailHeader.appendChild(head5);
    enemyDetailHeader.appendChild(head6);
    enemyDetailTable.appendChild(enemyDetailHeader);

    var enemyDetailRow = document.createElement("tr");
    var enemyTD1 = document.createElement("td");
    var enemyTD2 = document.createElement("td");
    var enemyTD3 = document.createElement("td");
    var enemyTD4 = document.createElement("td");
    var enemyTD5 = document.createElement("td");
    var enemyTD6 = document.createElement("td");

    enemyTD1.innerHTML = tdVal1;
    enemyTD2.innerHTML = tdVal2;
    enemyTD3.innerHTML = tdVal3;
    enemyTD4.innerHTML = tdVal4;
    enemyTD5.innerHTML = tdVal5;
    enemyTD6.innerHTML = tdVal6;

    enemyDetailRow.appendChild(enemyTD1);
    enemyDetailRow.appendChild(enemyTD2);
    enemyDetailRow.appendChild(enemyTD3);
    enemyDetailRow.appendChild(enemyTD4);
    enemyDetailRow.appendChild(enemyTD5);
    enemyDetailRow.appendChild(enemyTD6);

    enemyDetailTable.appendChild(enemyDetailRow);
    return enemyDetailTable;
}

var clothes = {
    1: "Biker leathers",
    2: "Blue jeans",
    3: "Corporate suits",
    4: "Jumpsuits",
    5: "Miniskirts",
    6: "High Fashion",
    7: "Cammos",
    8: "Normal clothes",
    9: "Nude",
    10: "Bag lady chic"
};

var hairStyle = {
    1: "Mohawk",
    2: "Long & Ratty",
    3: "Short & Spiked",
    4: "Wild & all over",
    5: "Bald",
    6: "Striped",
    7: "Tinted",
    8: "Neat, short",
    9: "Short, curly",
    10: "Long, straight"
};

var affectations = {
    1: "Tattoos",
    2: "Mirrorshades",
    3: "Ritual Scars",
    4: "Spiked gloves",
    5: "Nose Rings",
    6: "Earrings",
    7: "Long fingernails",
    8: "Spike heel boots",
    9: "Weird contact lenses",
    10: "Fingerless gloves"
};

var ethnic = {
    origins: [
        {origin: "Anglo-American", languages: ["English"]},
        {origin: "African", languages: ["Bantu", "Fante", "Kongo", "Ashanti", "Zulu", "Swahili"]},
        {origin: "Japanese/Korean", languages: ["Japanese", "Korean"]},
        {
            origin: "Central European/Soviet",
            languages: ["Bulgarian", "Russian", "Czech", "Polish", "Ukranian", "Slovak"]
        },
        {
            origin: "Pacific Islander",
            languages: ["Micronesian", "Tagalog", "Polynesian", "Malayan", "Sudanese", "Indonesian", "Hawaiian"]
        },
        {
            origin: "Chinese/Southeast Asian",
            languages: ["Burmese", "Cantonese", "Mandarin", "Thai", "Tibetan", "Vietnamese"]
        },
        {origin: "Black American", languages: ["English", "Blackfolk"]},
        {origin: "Hispanic/American", languages: ["Spanish", "English"]},
        {origin: "Central/South American", languages: ["Spanish", "Portuguese"]},
        {
            origin: "European",
            languages: ["French", "German", "Enlgish", "Spanish", "Italian", "Greek", "Danish", "Dutch", "Norwegian", "Swedish"]
        }
    ]
};

var famRank = {
    1: "Corporate Executive",
    2: "Corporate Manager",
    3: "Corporate Technician",
    4: "Nomad Pack",
    5: "Pirate Fleet",
    6: "Gang family",
    7: "Crime Lord",
    8: "Combat Zone Poor",
    9: "Urban homeless",
    10: "Arcology family"
};

var parentStatus = {
    okay: "Both parents are living",
    somethingHappened: "Something happened to one or both parents"
};

var parentTragedy = {
    1: "Your parent(s) died in warefare",
    2: "Your parent(s) died in an accident",
    3: "Your parent(s) were murdered",
    4: "Your parent(s) have amnesia and don't remember you",
    5: "You never knew your parent(s)",
    6: "Your parent(s) are in hiding to protect you",
    7: "You were left with relatives for safekeeping",
    8: "You grew up on the street and never had parents",
    9: "Your parent(s) gave you up for adoption",
    10: "Your parent(s) sold you for money"
};

var familyStatusOptions = {
    danger: "Family status in danger, and you risk losing everything",
    okay: "Family status is OK, even if parents are missing or dead"
};

var familyTragedy = {
    1: "Family lost everything through betrayal",
    2: "Family lost everything through bad management",
    3: "Family exiled or otherwise driven from their original home/ nation/ corporation",
    4: "Family is imprisoned and you alone escaped",
    5: "Family vanished. You are the only remaining member",
    6: "Family was murdered or killed, and you were the only survivor",
    7: "Family is involved in a longterm conspiracy, organization or assocation, such as a crime family or revolutionary group",
    8: "Your family was scattered to the winds due to misfortune",
    9: "Your family is cursed with a hereditary feud that has lasted for generations",
    10: "You are the inheritor of a family debt; you must honor this debt before moving on with your life"
};

var childEnv = {
    1: "Spent on the street, with no adult supervision",
    2: "Spent in a safe corporate suburbia",
    3: "In a Nomad Pack moving from town to town",
    4: "In a decarying, once upscale neighborhood",
    5: "In a defended corporate zone in the central City",
    6: "In the heart of the combat zone",
    7: "In a small village or town far from the city",
    8: "In a large archology city",
    9: "In an aquatic pirate pack",
    10: "On a corporate controlled farm or research facility"
};

var siblingGenders = {
    1: "male",
    2: "female"
};

var siblingAges = {
    1: "older",
    2: "older",
    3: "older",
    4: "older",
    5: "older",
    6: "younger",
    7: "younger",
    8: "younger",
    9: "younger",
    10: "twin"
};

var siblingFeelings = {
    1: "sibling dislikes you",
    2: "sibling dislikes you",
    3: "sibling likes you",
    4: "sibling likes you",
    5: "sibling neutral towards you",
    6: "sibling neutral towards you",
    7: "sibling hero worships you",
    8: "sibling hero worships you",
    9: "sibling hates you",
    10: "sibling hates you"
};

var persTraits = {
    1: "Shy and secretive",
    2: "Rebellious, antisocial, violent",
    3: "Arrogant, proud, aloof",
    4: "Moody, rash and headstrong",
    5: "Picky, fussy and nervous",
    6: "Stable and serious",
    7: "Silly and fluffheaded",
    8: "Sneaky and deceptive",
    9: "Intellectual and detached",
    10: "Friendly and outgoing"
};

var persValued = {
    1: "A parent (or guardian)",
    2: "Brother or sister",
    3: "Lover",
    4: "Friend",
    5: "Yourself",
    6: "A pet",
    7: "Teacher or mentor",
    8: "Public figure",
    9: "A personal hero",
    10: "No one"
};

var youValue = {
    1: "Money",
    2: "Honor",
    3: "Your word",
    4: "Honesty",
    5: "Knowledge",
    6: "Vengeance",
    7: "Love",
    8: "Power",
    9: "Having a good time",
    10: "Friendship"
};

var howFeel = {
    1: "Neutral",
    2: "Neutral",
    3: "I like almost everyone",
    4: "I hate almost everyone",
    5: "People are tools. Use them for your own goals and discard them",
    6: "Every person is a valuable individual",
    7: "People are obstacles to be destroyed if they cross me",
    8: "People are untrustworthy. Don't depend on anyone",
    9: "Wipe 'em all out and give the place to the cockroaches",
    10: "People are wonderful"
};

var valuedPos = {
    1: "A weapon",
    2: "A tool",
    3: "A piece of clothing",
    4: "A photograph",
    5: "A book or diary",
    6: "A recording",
    7: "A musical instrument",
    8: "A piece of jewelry",
    9: "A toy",
    10: "A letter"
};

var disaster = {
    // Disaster Strikes table from Big Problems, Big Wins
    betrayalAmount: 0,
    betrayalHistory: {},
    betrayDetail: {},
    addBetray: function (age, thirdLifeRoll, fourthLifeRoll) {
        "use strict";
        this.betrayalHistory[age] = this[thirdLifeRoll].title;
        this.betrayalAmount += 1;
        if (fourthLifeRoll <= 3) {
            this.betrayDetail[age] = " You are being blackmailed.";
        } else if (fourthLifeRoll >= 4 && fourthLifeRoll <= 7) {
            this.betrayDetail[age] = " A secret was exposed.";
        } else if (fourthLifeRoll >= 8 && fourthLifeRoll <= 10) {
            this.betrayDetail[age] = " Betrayed by close friend in romance or career (you choose)";
        }
    },
    accidentAmount: 0,
    accidentHistory: {},
    accidentDetail: {},
    addAccident: function (age, thirdLifeRoll, fourthLifeRoll) {
        "use strict";
        this.accidentHistory[age] = this[thirdLifeRoll].title;
        this.accidentAmount += 1;
        var randInt = getRandomInt(1, 10);
        if (fourthLifeRoll <= 4) {
            this.accidentDetail[age] = "Terribly disfigured. Subtract -5 from ATT";
        } else if (fourthLifeRoll >= 5 && fourthLifeRoll <= 6) {
            this.accidentDetail[age] = "Hospitalized for " + randInt + " months this year";
        } else if (fourthLifeRoll >= 7 && fourthLifeRoll <= 8) {
            this.accidentDetail[age] = "You have lost " + randInt + " months of memory this year";
        } else if (fourthLifeRoll >= 9) {
            this.accidentDetail[age] = "You constantly relive nightmares ".concat(
                "(8 in 10 chance each night) of the accident and wake up screaming");
        }
    },
    loverKilledAmount: 0,
    loverKilledHistory: {},
    loverKilledDetail: {},
    loverKilled: function (age, thirdLifeRoll, fourthLifeRoll) {
        "use strict";
        this.loverKilledAmount += 1;
        this.loverKilledHistory[age] = this[thirdLifeRoll].title;
        if (fourthLifeRoll <= 5) {
            this.loverKilledDetail[age] = "They died accidentally";
        } else if (fourthLifeRoll >= 6 && fourthLifeRoll <= 8) {
            this.loverKilledDetail[age] = "They were murdered by unknown parties";
        } else if (fourthLifeRoll >= 9) {
            this.loverKilledDetail[age] = "They were murdered; you know who did it. You just need proof";
        }
    },
    falseAccuseAmount: 0,
    falseAccuseHistory: {},
    falseAccuseDetail: {},
    addFalseAccused: function (age, thirdLifeRoll, fourthLifeRoll) {
        "use strict";
        this.falseAccuseAmount += 1;
        this.falseAccuseHistory[age] = this[thirdLifeRoll].title;
        if (fourthLifeRoll <= 3) {
            this.falseAccuseDetail[age] = "The accusation is theft.";
        } else if (fourthLifeRoll >= 4 && fourthLifeRoll <= 5) {
            this.falseAccuseDetail[age] = "The accusation is cowardice.";
        } else if (fourthLifeRoll >= 6 && fourthLifeRoll <= 8) {
            this.falseAccuseDetail[age] = "The accusation is murder";
        } else if (fourthLifeRoll === 9) {
            this.falseAccuseDetail[age] = "The accusation is rape";
        } else if (fourthLifeRoll === 10) {
            this.falseAccuseDetail[age] = "The accusation is lying or betrayal";
        }
    },
    lawHuntedAmount: 0,
    lawHuntedHistory: {},
    lawHuntedDetail: {},
    addLawHunted: function (age, thirdLifeRoll, fourthLifeRoll) {
        "use strict";
        this.lawHuntedAmount += 1;
        this.lawHuntedHistory[age] = this[thirdLifeRoll].title;
        if (fourthLifeRoll <= 3) {
            this.lawHuntedDetail[age] = "Only a couple local cops want you.";
        } else if (fourthLifeRoll >= 4 && fourthLifeRoll <= 6) {
            this.lawHuntedDetail[age] = "The entire local police force wants you.";
        } else if (fourthLifeRoll >= 7 && fourthLifeRoll <= 8) {
            this.lawHuntedDetail[age] = "the State Police or militia wants you.";
        } else if (fourthLifeRoll >= 9) {
            this.lawHuntedDetail[age] = "the FBI or equivalent national police force wants you.";
        }
    },
    corpHuntedAmount: 0,
    corpHuntedHistory: {},
    corpHuntedDetail: {},
    addCorpHunted: function (age, thirdLifeRoll, fourthLifeRoll) {
        "use strict";
        //
        this.corpHuntedAmount += 1;
        this.corpHuntedHistory[age] = this[thirdLifeRoll].title;
        if (fourthLifeRoll <= 3) {
            this.corpHuntedDetail[age] = "Small local firm is hunting you";
        } else if (fourthLifeRoll >= 4 && fourthLifeRoll <= 6) {
            this.corpHuntedDetail[age] = "Larger corporation with offices statewide hunting you";
        } else if (fourthLifeRoll >= 7 && fourthLifeRoll <= 8) {
            this.corpHuntedDetail[age] = "Big, national corporation with agents in major cities nationwide hunting you";
        } else if (fourthLifeRoll >= 9) {
            this.corpHuntedDetail[age] = "Huge multinational corporation hunting you; they have armies, ninjas and spies everywhere";
        }
    },
    incapAmount: 0,
    incapHistory: {},
    incapDetail: {},
    addIncap: function (age, thirdLifeRoll, fourthLifeRoll) {
        "use strict";
        this.incapAmount += 1;
        this.incapHistory[age] = this[thirdLifeRoll].title;
        if (fourthLifeRoll <= 3) {
            this.incapDetail[age] = "It's some type of nervous disorder, probably from a bioplague -- Lose 1 pt. REF";
        } else if (fourthLifeRoll >= 4 && fourthLifeRoll <= 7) {
            this.incapDetail[age] = "It's some kind of mental problem; you suffer from anxiety".concat(
                "attacks and phobias. Lose 1 pt. from your CL stat.");
        } else if (fourthLifeRoll >= 8) {
            this.incapDetail[age] = "It's a major psychosis. You hear voices, are violent,".concat(
                "irrational, depressive. Lose 1pt from CL, 1pt from REF");
        }
    },
    debtAmount: 0,
    debtHistory: {},
    addDebt: function (age) {
        "use strict";
        var newDebt = getRandomInt(1, 10) * 100;
        this.debtHistory[age] = newDebt;
        this.debtAmount += newDebt;
    },
    prisonTime: 0,
    prisonHistory: {},
    addPrison: function (age) {
        "use strict";
        var prisonTerm = getRandomInt(1, 10);
        this.prisonHistory[age] = prisonTerm;
        this.prisonTime += prisonTerm;
    },
    illnessTime: 0,
    illnessHistory: {},
    addIllness: function (age) {
        "use strict";
        var illnessLength = getRandomInt(1, 10);
        this.illnessHistory[age] = illnessLength;
        this.illnessTime += illnessLength;
    },
    1: {
        title: "Financial Loss or Debt",
        detail: "Roll 1D10x100." +
        "You have lost this much in Eurodollars. If you can't pay this now," +
        " you have a debt to pay, in cash--or blood."
    },
    2: {
        title: "Imprisonment",
        detail: "You have been in prison, or possibly held hostage" +
        " (your choice). Roll 1D10 for length of imprisonment in months."
    },
    3: {
        title: "Illness or addiction",
        detail: "You have contracted either an illness or" +
        " drug habit in this time. Lose 1 point of REF permanently as a result."
    },
    4: {
        title: "Betrayal. You have been backstabbed in some manner",
        detail: "Roll another 1D10. 1-3, you are being blackmailed. 4-7 a secret was".concat(
            " exposed. 8-10, you were betrayed by a close friend in either romance",
            " or career (your choice).")
    },
    5: {
        title: "Accident",
        detail: "You were in some kind of terrible accident. Roll" +
        " 1D10. 1-4, you were terribly disfigured and must subtract -5 from your ATT." +
        " 5-6 you were hospitalized for 1D10 months that year. 7-8, you have lost" +
        " 1D10 months of memory that year. 9-10, you constantly relive nightmares" +
        " (8 in 10 chance each night) of the accident and wake up screaming"
    },
    6: {
        title: "Lover, friend or relative killed",
        detail: "You lost someone you" +
        " really cared about. 1-5, they died accidentally. 6-8 they were murdered" +
        " by unknown parties. 9-10, they were murdered and you know who did it. You" +
        " just need the proof."
    },
    7: {
        title: "False Accusation",
        detail: "You were set up. Roll 1D10. 1-3, the" +
        " accusation is theft. 4-5 it's cowardice. 6-8 it's murder. 9 it's rape" +
        " 10, it's lying or betrayal"
    },
    8: {
        title: "Hunted by the law",
        detail: "You are hunted by the law for crimes" +
        " you may or may not have committed (your choice). Roll 1D10. 1-3 only" +
        " a couple cops want you. 4-6 it's the entire local force. 7-8, it's the" +
        " State police or Militia. 9-10 it's the FBI or equivalent national police force."
    },
    9: {
        title: "Hunted by a Corporation",
        detail: "You have angered some corporate" +
        " honcho. Roll 1D10. 1-3 it's a small, local firm. 4-6 it's a larger corp with offices" +
        "statewide. 7-8 it's a big, national corp with agents in major cities nationwide." +
        "9-10; it's a huge multinational with armies, ninja and spies everywhere."
    },
    10: {
        title: "Mental or physical incapacitation",
        detail: "You have experienced" +
        " some type of mental or physical breakdown. Roll 1D10. 1-3 it's some type" +
        " of nervous disorder, probably from a bioplague -- lose 1pt REF. 4-7 it's" +
        " some kind of mental problem; you suffer anxiety attacks and phobias. Lose" +
        " 1pt from your CL stat. 8-10 it's a major psychosis. You hear voices" +
        " are violent, irrational, depressive. Lose 1pt from CL, 1pt from REF"
    }
};

var getLucky = {
    // Get Lucky table from Big Problems, Big Wins
    connectionAmount: 0, // Number of Powerful Connections
    connectionHistory: {},
    addMakePowerfulConnection: function (whereIsConnection) {
        "use strict";
        var connectionMade = {
            "police": "in the Police department",
            "da": "in the District Attorney's Office",
            "mayor": "in the Mayor's office"
        };
        return connectionMade[whereIsConnection];
    },
    windfallAmount: 0,
    windfallHistory: {},
    addWindFall: function (age) {
        "use strict";
        var newWindfall = getRandomInt(1, 10) * 100;
        this.windfallHistory[age] = newWindfall;
        this.windfallAmount += +newWindfall;
    },
    scoreAmount: 0,
    scoreHistory: {},
    addScore: function (age) {
        "use strict";
        var newScore = getRandomInt(1, 10) * 100;
        this.scoreHistory[age] = newScore;
        this.scoreAmount += newScore;
    },
    senseiFound: 0,
    senseiHistory: {},
    addSensei: function (age) {
        "use strict";
        this.senseiHistory[age] = "Find a Sensei";
        this.senseiFound += 1;
    },
    teacherFound: 0,
    teacherHistory: {},
    addTeacher: function (age) {
        "use strict";
        this.teacherHistory[age] = "Find a teacher";
        this.teacherFound += 1;
    },
    corpFavor: 0,
    corpFavorHistory: {},
    addCorpFavor: function (age) {
        "use strict";
        this.corpFavorHistory[age] = "Corporate Executive owes you a favor";
        this.corpFavor += 1;
    },
    nomadFavor: 0,
    nomadFavorHistory: {},
    addNomadFavor: function (age) {
        "use strict";
        this.nomadFavorHistory[age] = "Develop friendship with a nomad pack";
        this.nomadFavor += 1;
    },
    policeFriend: 0,
    policefriendHistory: {},
    addPoliceFriend: function (age) {
        "use strict";
        this.policefriendHistory[age] = "Friend on Police Force";
        this.policeFriend += 1;
    },
    boosterFriend: 0,
    boosterFriendHistory: {},
    addBoosterFriend: function (age) {
        "use strict";
        this.boosterFriendHistory[age] = "Local Boostergang likes you";
        this.boosterFriend += 1;
    },
    combatTeacher: 0,
    combatTeacherHistory: {},
    addCombatTeacher: function (age) {
        "use strict";
        this.combatTeacherHistory[age] = "Find combat teacher";
        this.combatTeacher += 1;
    },
    // Life Events table output, Detail column data
    1: {
        title: "Make a Powerful Connection in City Government",
        detail: "Roll 1D10" +
        " 1-4 it's the Police. 5-7 it's in DA office. 8-10 its the Mayor"
    },
    2: {
        title: "Financial Windfall",
        detail: "Roll 1D10x100 for amount in Euros"
    },
    3: {
        title: "Big Score",
        detail: "Roll 1D10x100 for amount"
    },
    4: {
        title: "Find a Sensei (Teacher)",
        detail: "Begin a new Martial Art at +2, or add +1 to an existing Martial Art"
    },
    5: {
        title: "Find a Teacher",
        detail: "Add +1 to any INT based skill, or begin new at +2"
    },
    6: {
        title: "Favor with a Powerful Corporate Executive",
        detail: "They owe you a favor"
    },
    7: {
        title: "Local Nomad Pack Befriends You",
        detail: "Call on them for one favor a month, " +
        " equivalent to Family special ability +2"
    },
    8: {
        title: "Make Friend on Police Force",
        detail: "You may use them for information at".concat(
            " a level of +2 Streetwise on any police related situation.")
    },
    9: {
        title: "Local Boostergang likes you",
        detail: "You can call on them for" +
        " one favor a month, equivalent to Family special ability of +2. Don't push it"
    },
    10: {
        title: "Find a combat teacher",
        detail: "Add +1 to any weapon skill w/ exception" +
        " of Martial Arts or Brawling, or begin a new combat skill at +2"
    }
};

var enemy = {
    enemyAmount: 0,
    enemyGender: {},
    enemyWhoIsIt: {},
    enemyCauseIs: {},
    enemyWhoMad: {},
    enemyWhatDo: {},
    enemyWhatThrow: {},
    addEnemy: function (age, thirdLifeRoll, fourthLifeRoll) {
        "use strict";
        this.enemyAmount += 1;
        var causeRoll = getRandomInt(1, 10);
        var whoIsMadRoll = getRandomInt(1, 10);
        var whatDoRoll = getRandomInt(1, 10);
        var whatThrowRoll = getRandomInt(1, 10);

        if ((fourthLifeRoll % 2 === 0) === true) {
            this.enemyGender[age] = "Male";
        } else if ((fourthLifeRoll % 2 === 0) === false) {
            this.enemyGender[age] = "Female";
        }
        this.enemyWhoIsIt[age] = this.enemyMade[thirdLifeRoll]; // Who are they
        this.enemyCauseIs[age] = this.enemyCause[causeRoll]; // What is the cause
        if (whoIsMadRoll <= 4) { //Who's mad
            this.enemyWhoMad[age] = this.whoIsAngry[1];
        } else if (whoIsMadRoll >= 5 && whoIsMadRoll <= 7) {
            this.enemyWhoMad[age] = this.whoIsAngry[2];
        } else if (whoIsMadRoll >= 8 && whoIsMadRoll <= 10) {
            this.enemyWhoMad[age] = this.whoIsAngry[3];
        }
        if (whatDoRoll <= 2) { // Whatcha gonna do about it
            this.enemyWhatDo[age] = this.whatDo[1];
        } else if (whatDoRoll >= 3 && whatDoRoll <= 4) {
            this.enemyWhatDo[age] = this.whatDo[2];
        } else if (whatDoRoll >= 5 && whatDoRoll <= 6) {
            this.enemyWhatDo[age] = this.whatDo[3];
        } else if (whatDoRoll >= 7 && whatDoRoll <= 8) {
            this.enemyWhatDo[age] = this.whatDo[4];
        } else if (whatDoRoll >= 9 && whatDoRoll <= 10) {
            this.enemyWhatDo[age] = this.whatDo[5];
        }
        if (whatThrowRoll <= 3) { // What can they throw against you
            this.enemyWhatThrow[age] = this.whatThrow[1];
        } else if (whatThrowRoll >= 4 && whatThrowRoll <= 5) {
            this.enemyWhatThrow[age] = this.whatThrow[2];
        } else if (whatThrowRoll >= 6 && whatThrowRoll <= 7) {
            this.enemyWhatThrow[age] = this.whatThrow[3];
        } else if (whatThrowRoll === 8) {
            this.enemyWhatThrow[age] = this.whatThrow[4];
        } else if (whatThrowRoll === 9) {
            this.enemyWhatThrow[age] = this.whatThrow[5];
        } else if (whatThrowRoll === 10) {
            this.enemyWhatThrow[age] = this.whatThrow[6];
        }

    },
    enemyMade: {
        1: "Ex friend",
        2: "Ex lover",
        3: "Relative",
        4: "Childhood enemy",
        5: "Person working for you",
        6: "Person you work for",
        7: "Partner or co-worker",
        8: "Booster gang member",
        9: "Corporate Executive",
        10: "Government Official"
    },
    enemyCause: {
        1: "Caused the other to lose face or status",
        2: "Caused the loss of a lover, friend or relative",
        3: "Caused a major humiliation",
        4: "Accused the other of cowardice or other personal flaw",
        5: "Caused a physical disability",
        6: "Deserted or betrayed the other",
        7: "Turned down the other's offer of job or romantic involvement",
        8: "Just didn't like each other",
        9: "Was a romantic rival",
        10: "Foiled plans of the other"
    },
    whoIsAngry: {
        1: "They hate you",
        2: "You hate them",
        3: "The feeling's mutual"
    },
    whatDo: {
        1: "Go into a murderous killing rage",
        2: "Avoid the scum",
        3: "Backstab them indirectly",
        4: "Ignore them",
        5: "Rip into them verbally"
    },
    whatThrow: {
        1: "Just themselves",
        2: "Them and a few friends",
        3: "An entire gang",
        4: "A small corporation",
        5: "A Large corporation",
        6: "An entire government agency"
    }
};

var friendMade = {
    1: "Like a big brother/sister to you",
    2: "Like a kid sister/brother to you",
    3: "A teacher or mentor",
    4: "A partner or coworker",
    5: "An old lover (choose which one)",
    6: "An old enemy (choose which one)",
    7: "Like a foster parent to you",
    8: "A relative",
    9: "Reconnect with an old childhood friend",
    10: "Met through a common interest",
    friendMadeAmount: 0,
    friendMadeHistory: {},
    friendMadeGender: {},
    addFriend: function (age, thirdLifeRoll, fourthLifeRoll) {
        "use strict";
        this.friendMadeAmount += 1;
        this.friendMadeHistory[age] = this[thirdLifeRoll];
        if ((fourthLifeRoll % 2 === 0) === true) {
            this.friendMadeGender[age] = "Gender of friend: male";
        } else if ((fourthLifeRoll % 2 === 0) === false) {
            this.friendMadeGender[age] = "Gender of friend: female";
        }

    }
};

var romance = {
    happyCount: 0,
    romanceCount: 0,
    happyDetail: {},
    happyHistory: {},
    addHappyAffair: function (age) {
        "use strict";
        this.romanceCount += 1;
        this.happyHistory[age] = this.romanceEvent[1];
        this.happyDetail[age] = "n/a";
    },
    tragicCount: 0,
    tragicDetail: {},
    tragicHistory: {},
    addTragic: function (age, thirdLifeRoll) {
        "use strict";
        this.tragicCount += 1;
        this.tragicHistory[age] = this.romanceEvent[2];
        this.tragicDetail[age] = this.romanceTragic[thirdLifeRoll];
    },
    problemCount: 0,
    problemDetail: {},
    problemHistory: {},
    addProblem: function (age, thirdLifeRoll, fourthLifeRoll) {
        "use strict";
        this.problemCount += 1;
        this.problemHistory[age] = this.romanceProblems[thirdLifeRoll];
        this.problemDetail[age] = this.romanceMutalFeel[fourthLifeRoll];
    },
    fastCount: 0,
    fastDetail: {},
    fastHistory: {},
    addFast: function (age) {
        "use strict";
        this.fastCount += 1;
        this.fastHistory[age] = this.romanceEvent[4];
        this.fastDetail[age] = "n/a";
    },
    romanceEvent: {
        1: "Happy Love Affair",
        2: "Tragic Love Affair",
        3: "Love Affair With Problems",
        4: "Fast affairs and Hot Dates"
    },
    romanceTragic: {
        1: "Lover died in an accident",
        2: "Lover mysteriously vanisehd",
        3: "It didnt work out",
        4: "A personal goal or vendetta came between you",
        5: "Lover kidnapped",
        6: "Lover went insane",
        7: "Lover committed suicide",
        8: "Lover killed in a fight",
        9: "Rival cut you out of the action",
        10: "Lover imprisoned or exiled"
    },
    romanceProblems: {
        1: "Your lover's friends/family hate you",
        2: "Your lover's friends/family would use any means to get rid of you",
        3: "Your friends/family hate your lover",
        4: "One of you has a romantic rival",
        5: "You are seperated in some way",
        6: "You fight constantly",
        7: "You're professional rivals",
        8: "One of you is insanely jealous",
        9: "One of you is messing around",
        10: "You have conflicting backgrounds and families"
    },
    romanceMutalFeel: {
        1: "They still love you",
        2: "You still love them",
        3: "You still love each other",
        4: "You hate them",
        5: "They hate you",
        6: "You hate each other",
        7: "You're friends",
        8: "No feelings either way; its over",
        9: "You like them, they hate you",
        10: "They like you, you hate them"
    }

};

var nothing = {
    nothingCount: 0,
    nothingDetail: {},
    nothingHistory: {},
    addNothing: function (age) {
        "use strict";
        this.nothingCount += 1;
        this.nothingHistory[age] = "Nothing Happened This Year";
        this.nothingDetail[age] = "n/a";
    },
    nothingResult: "Nothing Happened This Year"
};

var skills = {
    special: {
        name: "Special Abilities",
        Cop: "Authority",
        Rocker: "Charismatic Leadership",
        Solo: "Combat Sense",
        Media: "Credibility",
        Nomad: "Family",
        Netrunner: "Interface",
        Techie: "Jury Rig",
        MedTechie: "Medical Tech",
        Corp: "Resources",
        Fixer: "Streetdeal"
    },
    attr: {
        name: "Attractiveness Skills",
        attr01: "Personal Grooming",
        attr02: "Wardrobe & Style"
    },
    body: {
        name: "Body Skills",
        body01: "Endurance",
        body02: "Strength Feat",
        body03: "Swimming"
    },
    cool: {
        name: "Cool / Will Skills",
        cool01: "Interrogation",
        cool02: "Intimidate",
        cool03: "Oratory",
        cool04: "Resist Torture/Drugs",
        cool05: "Streetwise"
    },
    emp: {
        name: "Empathy Skills",
        emp01: "Human Perception",
        emp02: "Interview",
        emp03: "Leadership",
        emp04: "Seduction",
        emp05: "Social",
        emp06: "Persuasion and Fast Talk",
        emp07: "Perform"
    },
    int: {
        name: "Intelligence Skills",
        int01: "Accounting",
        int02: "Anthropology",
        int03: "Awareness / Notice",
        int04: "Biology",
        int05: "Botany",
        int06: "Chemistry",
        int07: "Composition",
        int08: "Diagnose Illness",
        int09: "Ed./General Knowledge",
        int10: "Expert",
        int11: "Gamble",
        int12: "Geology",
        int13: "Hide/Evade",
        int14: "History",
        int15: "Know Language",
        int16: "Library Search",
        int17: "Mathematics",
        int18: "Physics",
        int19: "Programming",
        int20: "Shadow/Track",
        int21: "Stock Market",
        int22: "System Knowledge",
        int23: "Teaching",
        int24: "Wilderness Survival",
        int25: "Zoology"
    },
    ref: {
        name: "Reflex Skills",
        ref01: "Archery",
        ref02: "Athletics",
        ref03: "Brawling",
        ref04: "Dance",
        ref05: "Dodge & Escape",
        ref06: "Driving",
        ref07: "Fencing",
        ref08: "Handgun",
        ref09: "Heavy Weapons",
        ref10: "Martial Art",
        ref11: "Melee",
        ref12: "Motorcycle",
        ref13: "Operate Heavy Machinery",
        ref14: "Pilot Gyro",
        ref15: "Pilot Fixed Wing",
        ref16: "Pilot Dirigible",
        ref17: "Pilot Vect. Thrust Vehicle",
        ref18: "Rifle",
        ref19: "Stealth",
        ref20: "Submachinegun"
    },
    tech: {
        name: "Tech Skills",
        tech01: "Aero Tech",
        tech02: "AV Tech",
        tech03: "Basic Tech",
        tech04: "Cryotank Operation",
        tech05: "Cyberdeck Design",
        tech06: "CyberTech",
        tech07: "Demolitions",
        tech08: "Disguise",
        tech09: "Electronics",
        tech10: "Electronic Security",
        tech11: "First Aid",
        tech12: "Forgery",
        tech13: "Gyro Tech",
        tech14: "Paint or Draw",
        tech15: "Photo & Film",
        tech16: "Pharmaceuticals",
        tech17: "Pick Lock",
        tech18: "Pick Pocket",
        tech19: "Play Instrument",
        tech20: "Weaponsmith"
    }
};

// Career Skills from pg. 44
var career = {
    solo: {
        1: skills.special.Solo,
        2: skills.int.int03,
        3: skills.ref.ref08,
        4: skills.ref.ref03,
        5: skills.ref.ref10,
        6: skills.ref.ref11,
        7: skills.tech.tech20,
        8: skills.ref.ref18,
        9: skills.ref.ref02,
        10: skills.ref.ref20,
        11: skills.ref.ref19
    },
    corp: {
        1: skills.special.Corp,
        2: skills.int.int03,
        3: skills.emp.emp01,
        4: skills.int.int09,
        5: skills.int.int16,
        6: skills.emp.emp05,
        7: skills.emp.emp06,
        8: skills.int.int21,
        9: skills.attr.attr02,
        10: skills.attr.attr01
    },
    media: {
        1: skills.special.Media,
        2: skills.int.int03,
        3: skills.int.int07,
        4: skills.int.int09,
        5: skills.emp.emp06,
        6: skills.emp.emp01,
        7: skills.emp.emp05,
        8: skills.cool.cool05,
        9: skills.tech.tech15,
        10: skills.emp.emp02
    },
    nomad: {
        1: skills.special.Nomad,
        2: skills.int.int03,
        3: skills.body.body01,
        4: skills.ref.ref11,
        5: skills.ref.ref18,
        6: skills.ref.ref06,
        7: skills.tech.tech03,
        8: skills.int.int24,
        9: skills.ref.ref03,
        10: skills.ref.ref02
    },
    techie: {
        1: skills.special.Techie,
        2: skills.int.int03,
        3: skills.tech.tech03,
        4: skills.tech.tech06,
        5: skills.int.int23,
        6: skills.int.int09,
        7: skills.tech.tech09,
        8: skills.tech.tech01,
        9: skills.tech.tech02,
        10: skills.tech.tech20,
        11: skills.tech.tech10,
        12: skills.tech.tech13
    },
    cop: {
        1: skills.special.Cop,
        2: skills.int.int03,
        3: skills.ref.ref08,
        4: skills.emp.emp01,
        5: skills.ref.ref02,
        6: skills.int.int09,
        7: skills.ref.ref03,
        8: skills.ref.ref11,
        9: skills.cool.cool01,
        10: skills.cool.cool05
    },
    rocker: {
        1: skills.special.Rocker,
        2: skills.int.int03,
        3: skills.emp.emp07,
        4: skills.attr.attr02,
        5: skills.int.int07,
        6: skills.ref.ref03,
        7: skills.tech.tech19,
        8: skills.cool.cool05,
        9: skills.emp.emp06,
        10: skills.emp.emp04
    },
    med: {
        1: skills.special.MedTechie,
        2: skills.int.int03,
        3: skills.tech.tech03,
        4: skills.int.int08,
        5: skills.int.int09,
        6: skills.tech.tech04,
        7: skills.int.int16,
        8: skills.tech.tech16,
        9: skills.int.int25,
        10: skills.emp.emp01
    },
    fixer: {
        1: skills.special.Fixer,
        2: skills.int.int03,
        3: skills.tech.tech12,
        4: skills.ref.ref08,
        5: skills.ref.ref03,
        6: skills.ref.ref11,
        7: skills.tech.tech17,
        8: skills.tech.tech18,
        9: skills.cool.cool02,
        10: skills.emp.emp06
    },
    net: {
        1: skills.special.Netrunner,
        2: skills.int.int03,
        3: skills.tech.tech03,
        4: skills.int.int09,
        5: skills.int.int22,
        6: skills.tech.tech06,
        7: skills.tech.tech05,
        8: skills.int.int07,
        9: skills.tech.tech09,
        10: skills.int.int19
    }
};

function rollMethodClick() {
    "use strict";
    var rollMethod = document.getElementById("rollMethod");
    var whatClicked = rollMethod.options[rollMethod.selectedIndex].value;
    characterMeta.rollStyle = whatClicked;
    enableForms();
    if (whatClicked === "random") {
        characterMeta.randomPoints();
    } else if (whatClicked === "fast") {
        characterMeta.fastPoints();
    } else if (
        whatClicked === "cineMajorHero" ||
        whatClicked === "cineMajorSupp" ||
        whatClicked === "cineMinorHero" ||
        whatClicked === "cineMinorSupp" ||
        whatClicked === "Average") {
        characterMeta.cinematicChar(whatClicked);
    } else if (whatClicked === "manual") {
        characterMeta.manualPoints();
    }
}

var characterMeta = {
    charPoints: 0,
    charPointsRemain: 0,
    careerSkillPoints: 40,
    careerSkillPointsRemain: 40,
    pickupSkillPoints: 0,
    pickupSkillPointsRemain: 0,
    pickupSkillsAdded: 0, // Each dropdown box created to add a skill
    rollStyle: "",
    randRolls: [],
    randTotal: 0,
    randRemain: 0,

    updateBodyDerived: function () {
        "use strict";
        var bt = document.getElementById("bt"); // Body type stat
        var bodyTypeInt = parseInt(bt.value);
        var lift = document.getElementById("lift");
        var carry = document.getElementById("carry");
        var liftLBs = document.getElementById("liftLBs");
        var carryLBs = document.getElementById("carryLBs");
        var bodyType = document.getElementById("bodyType"); // Derived body type
        var btm = document.getElementById("btm"); // Body Type Modifier
        var save = document.getElementById("save"); // Save number

        if (bt.value !== "") {
            lift.innerHTML = bodyTypeInt * 40;
            carry.innerHTML = bodyTypeInt * 10;
            liftLBs.innerHTML = parseFloat(parseInt(lift.innerHTML) * 2.2046).toFixed(2); //Convert kg to lbs
            carryLBs.innerHTML = parseFloat(parseInt(carry.innerHTML) * 2.2046).toFixed(2);
            save.innerHTML = bodyTypeInt;

            if (bodyTypeInt <= 2) {
                bodyType.innerHTML = "Very Weak";
                btm.innerHTML = "-0";
            } else if (bodyTypeInt >= 3 && bodyTypeInt <= 4) {
                bodyType.innerHTML = "Weak";
                btm.innerHTML = "-1";
            } else if (bodyTypeInt >= 5 && bodyTypeInt <= 7) {
                bodyType.innerHTML = "Average";
                btm.innerHTML = "-2";
            } else if (bodyTypeInt >= 8 && bodyTypeInt <= 9) {
                bodyType.innerHTML = "Strong";
                btm.innerHTML = "-3";
            } else if (bodyTypeInt === 10) {
                bodyType.innerHTML = "Very Strong";
                btm.innerHTML = "-4";
            } else if (bodyTypeInt >= 11) {
                bodyType.innerHTML = "Cybernetically Enhanced";
                btm.innerHTML = "-5";
            }
        }
    },

    updateLeap: function () {
        "use strict";
        // Update the Leap derived field
        var run = document.getElementById("run");
        var leapDerived = parseInt(run.innerHTML) / 4;
        var leap = document.getElementById("leap");
        leap.innerHTML = leapDerived;
    },

    updateRun: function () {
        "use strict";
        // Update the Run derived field
        var ma = document.getElementById("ma");
        if (ma.value !== "") {
            var runDerived = parseInt(ma.value) * 3;
            var run = document.getElementById("run");
            run.innerHTML = runDerived.toString();
            this.updateLeap();
        }
    },

    updateHumanity: function () {
        "use strict";
        // Update the Humanity derived field
        var emp = document.getElementById("emp");
        if (emp.value !== "") {
            var humanityDerived = parseInt(emp.value) * 10;
            var humanity = document.getElementById("humanity");
            humanity.innerHTML = humanityDerived.toString();
        }
    },

    // Random Method clicked
    randomPoints: function () {
        "use strict";
        this.randRolls.length = 0;
        this.randTotal = 0; // Total of all the Random rolls
        this.charPoints = 0;
        var roll = 0;
        for (var i = 1; i <= 9; i++) {
            roll = getRandomInt(2, 10);
            // Append each roll to randRolls
            this.randRolls.push(roll);
        }
        var rollOutput = document.getElementById("rollOutput");
        while (rollOutput.firstChild) { // Remove all children from rollOutput
            rollOutput.removeChild(rollOutput.firstChild);
        }

        for (var j = 0; j < this.randRolls.length; j++) {
            this.randTotal = this.randTotal + this.randRolls[j];
        }
        rollOutput.appendChild(document.createTextNode("Roll Method: Random"));
        rollOutput.appendChild(document.createElement("br"));
        rollOutput.appendChild(document.createTextNode("Roll Total: ".concat(this.randTotal.toString())));
        this.charPoints = this.randTotal;
        //
        var charPointsOutput = document.getElementById("charPointsOutput");
        charPointsOutput.innerHTML = this.charPoints.toString();

        characterMeta.getCharacterPoints();
        characterMeta.updateCharacterPointsRemaining();
    },
    fastRolls: [],
    fastTotal: 0,

    // Fast Method clicked
    fastPoints: function () {
        "use strict";

        this.fastTotal = 0;
        this.fastRolls.length = 0;
        this.charPoints = 0;
        var roll = 0;
        for (var i = 0; i < 9; i++) {
            roll = getRandomInt(2, 10);
            this.fastRolls.push(roll);
        }
        var rollOutput = document.getElementById("rollOutput");
        while (rollOutput.firstChild) { // Remove all children from rollOutput
            rollOutput.removeChild(rollOutput.firstChild);
        }

        rollOutput.appendChild(document.createTextNode("Roll Method: Fast"));
        rollOutput.appendChild(document.createElement("br"));
        rollOutput.appendChild(document.createTextNode("Rolls: ".concat(this.fastRolls.join(", "))));

        for (var j = 0; j < this.fastRolls.length; j++) {
            this.fastTotal += this.fastRolls[j];
        }

        rollOutput.appendChild(document.createElement("br"));
        rollOutput.appendChild(document.createTextNode("Rolls Total: ".concat(this.fastTotal.toString())));

        this.charPoints = this.fastTotal;
        var charPointsOutput = document.getElementById("charPointsOutput");
        charPointsOutput.innerHTML = this.charPoints.toString();

        characterMeta.getCharacterPoints();
        characterMeta.updateCharacterPointsRemaining();
    },

    // Cinematic Method clicked
    cinematicChar: function (whatClicked) {
        "use strict";
        this.charPoints = 0;
        var rollOutput = document.getElementById("rollOutput");
        while (rollOutput.firstChild) { // Remove all children from rollOutput
            rollOutput.removeChild(rollOutput.firstChild);
        }
        var points = 0;
        var cine = "";
        if (whatClicked === "cineMajorHero") {
            points = 80;
            cine = "Major Hero";
        } else if (whatClicked === "cineMajorSupp") {
            points = 75;
            cine = "Major Supporting Character";
        } else if (whatClicked === "cineMinorHero") {
            points = 70;
            cine = "Minor Hero";
        } else if (whatClicked === "cineMinorSupp") {
            points = 60;
            cine = "Minor Supporting Character";
        } else if (whatClicked === "Average") {
            points = 50;
            cine = "Average";
        }
        rollOutput.appendChild(document.createTextNode("Cinematic Method: ".concat(cine)));
        rollOutput.appendChild(document.createElement("br"));
        rollOutput.appendChild(document.createTextNode("Points: ".concat(points.toString())));

        this.charPoints = points;
        var charPointsOutput = document.getElementById("charPointsOutput");
        charPointsOutput.innerHTML = this.charPoints.toString();

        characterMeta.getCharacterPoints();
        characterMeta.updateCharacterPointsRemaining();
    },

    // Manually Enter Value clicked
    manualPoints: function () {
        "use strict";
        var rollOutput = document.getElementById("rollOutput");
        while (rollOutput.firstChild) { //Remove all children from rollOutput
            rollOutput.removeChild(rollOutput.firstChild);
        }
        var manualInput = document.createElement("input");
        manualInput.setAttribute("id", "manualInput");
        manualInput.setAttribute("size", "6");
        rollOutput.appendChild(document.createTextNode("Roll Method: Manual Entry"));
        rollOutput.appendChild(document.createElement("br"));
        rollOutput.appendChild(document.createTextNode("Points: "));
        rollOutput.appendChild(manualInput);
        // Stat Manual Input
        var manualInputValue = document.getElementById("manualInput");
        manualInputValue.onchange = characterMeta.manualInputChange;

        // Clear out the Stat Points Remaining until a value is manually entered
        var statPointsRemainingOutput = document.getElementById("statPointsRemaining");
        statPointsRemainingOutput.innerHTML = "";

    },

    manualInputChange: function () {
        "use strict";
        var charPointsOutput = document.getElementById("charPointsOutput");
        var manualInput = document.getElementById("manualInput");
        if (manualInput.value !== "") {
            charPointsOutput.innerHTML = manualInput.value;
        }
        characterMeta.getCharacterPoints();
        characterMeta.updateCharacterPointsRemaining();
    },

    getCharacterPoints: function () {
        "use strict";
        var rollMethod = document.getElementById("rollMethod");
        var whatClicked = rollMethod.options[rollMethod.selectedIndex].value;
        if (whatClicked === "manual") {
            var manualInputValue = document.getElementById("manualInput");
            characterMeta.charPoints = manualInputValue.value;
        }
    },

    updateCharacterPointsRemaining: function () {
        "use strict";
        var statPointsRemainingOutput = document.getElementById("statPointsRemaining");
        var statPointsToDeduct = 0;
        var int = document.getElementById("int");
        var ref = document.getElementById("ref");
        var tech = document.getElementById("tech");
        var cl = document.getElementById("cl");
        var att = document.getElementById("att");
        var lk = document.getElementById("lk");
        var ma = document.getElementById("ma");
        var bt = document.getElementById("bt"); //body type stat
        var emp = document.getElementById("emp");
        var statElements = [int, ref, tech, cl, att, lk, ma, bt, emp];
        for (var i = 0; i < statElements.length; i++) {
            if ((statElements[i].value !== "") && (typeof parseFloat(statElements[i].value) === "number")) {
                statPointsToDeduct += parseFloat(statElements[i].value);
                //console.log("statPointsToDeduct currently:" + statPointsToDeduct);
            }
        }
        var remainingStatPoints = characterMeta.charPoints - statPointsToDeduct;
        statPointsRemainingOutput.innerHTML = remainingStatPoints.toString();
    },
    statChange: function () {
        "use strict";
        var int = document.getElementById("int");
        var ref = document.getElementById("ref");
        var tech = document.getElementById("tech");
        var cl = document.getElementById("cl");
        var att = document.getElementById("att");
        var lk = document.getElementById("lk");
        var ma = document.getElementById("ma");
        var bt = document.getElementById("bt"); //body type stat
        var emp = document.getElementById("emp");
        var run = document.getElementById("run");
        var leap = document.getElementById("leap");
        var lift = document.getElementById("lift");
        var liftLBs = document.getElementById("liftLBs");
        var carry = document.getElementById("carry");
        var carryLBS = document.getElementById("carryLBs");
        var humanity = document.getElementById("humanity");
        var save = document.getElementById("save");
        var btm = document.getElementById("btm");

        characterMeta.getCharacterPoints();
        characterMeta.updateCharacterPointsRemaining();

        characterMeta.updateBodyDerived();
        characterMeta.updateRun();
        characterMeta.updateHumanity();

        if (int.value !== "" && ref.value !== "") {
            characterMeta.pickupSkillPoints = parseInt(int.value) + parseInt(ref.value);
            var pickupSkillPointField = document.getElementById("pickupSkillPointField");
            pickupSkillPointField.innerHTML = characterMeta.pickupSkillPoints;
            characterMeta.updatePickupSkillPointsRemaining();
        }
        var charINTOutput = document.getElementById("charINTOutput");
        if (int.value !== "") {
            charINTOutput.innerHTML = " ".concat(int.value).concat(" ");
        }
        var charREFOutput = document.getElementById("charREFOutput");
        if (ref.value !== "") {
            charREFOutput.innerHTML = " ".concat(ref.value).concat(" ");
        }
        var charTECHOutput = document.getElementById("charTECHOutput");
        if (tech.value !== "") {
            charTECHOutput.innerHTML = " ".concat(tech.value).concat(" ");
        }
        var charCOOLOutput = document.getElementById("charCOOLOutput");
        if (cl.value !== "") {
            charCOOLOutput.innerHTML = " ".concat(cl.value).concat(" ");
        }
        var charATTROutput = document.getElementById("charATTROutput");
        if (att.value !== "") {
            charATTROutput.innerHTML = " ".concat(att.value).concat(" ");
        }
        var charLUCKOutput = document.getElementById("charLUCKOutput");
        if (lk.value !== "") {
            charLUCKOutput.innerHTML = " ".concat(lk.value).concat(" ");
        }
        var charMAOutput = document.getElementById("charMAOutput");
        if (ma.value !== "") {
            charMAOutput.innerHTML = " ".concat(ma.value).concat(" ");
            // Fill out Run on char sheet
            var charRunOutput = document.getElementById("charRunOutput");
            charRunOutput.innerHTML = " ".concat(run.innerHTML).concat(" ");
            // Fill out Leap on char sheet
            var charLeapOutput = document.getElementById("charLeapOutput");
            charLeapOutput.innerHTML = " ".concat(leap.innerHTML).concat(" ");
        }
        var charBODYOutput = document.getElementById("charBODYOutput");
        if (bt.value !== "") {
            charBODYOutput.innerHTML = " ".concat(bt.value).concat(" ");
            // Fill out Lift on char sheet
            var charLiftOutput = document.getElementById("charLiftOutput");
            charLiftOutput.innerHTML = " ".concat(lift.innerHTML).concat(" ");
            var charLiftLBsOutput = document.getElementById("charLiftLBsOutput");
            charLiftLBsOutput.innerHTML = " ".concat(Math.abs(parseInt(liftLBs.innerHTML)).toString()).concat(" ");
            // Fill out Carry on char sheet
            var charCarryOutput = document.getElementById("charCarryOutput");
            charCarryOutput.innerHTML = " ".concat(carry.innerHTML).concat(" ");
            var charCarryLBsOutput = document.getElementById("charCarryLBsOutput");
            charCarryLBsOutput.innerHTML = " ".concat(Math.abs(parseInt(carryLBS.innerHTML)).toString()).concat(" ");
        }
        var charEMPOutput = document.getElementById("charEMPOutput");
        if (emp.value !== "") {
            charEMPOutput.innerHTML = " ".concat(emp.value).concat(" ");
            // Fill out Humanity on char sheet
            var charHumanityOutput = document.getElementById("charHumanityOutput");
            charHumanityOutput.innerHTML = " ".concat(humanity.innerHTML).concat(" ");
        }
        var saveCharOutput = document.getElementById("saveCharOutput");
        if (save.innerHTML !== "") {
            saveCharOutput.innerHTML = save.innerHTML;
        }
        var btmCharOutput = document.getElementById("btmCharOutput");
        if (btm.innerHTML !== "") {
            btmCharOutput.innerHTML = btm.innerHTML;
        }

    },
    updatePickupSkillPointsRemaining: function () {
        "use strict";
        var pickupSkillsTable = document.getElementById("pickupSkillsTable");
        var pickupSkillRemainingOutput = document.getElementById("pickupSkillPointsRemaining");
        var pickupSkillArray = pickupSkillsTable.getElementsByTagName("input");

        characterMeta.pickupSkillPointsRemain = characterMeta.pickupSkillPoints;
        for (var i = 0; i < pickupSkillArray.length; i++) {
            if (pickupSkillArray[i].value !== "") {
                var skillLevel = pickupSkillArray[i].value;
                characterMeta.pickupSkillPointsRemain -= parseInt(skillLevel);
            }
        }
        pickupSkillRemainingOutput.innerHTML = characterMeta.pickupSkillPointsRemain;
    }
};

function roleSelectPopulate() {
    "use strict";
    var roleSelect = document.getElementById("roleSelect");
    var rolesLength = Object.keys(skills.special).length;
    var roles = Object.keys(skills.special);
    for (var i = 1; i < rolesLength; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.textContent = roles[i];
        roleSelect.appendChild(option);
    }
}

function manualRoleSelectChange() {
    "use strict";
    var roleSelect = document.getElementById("roleSelect");
    var roleField = roleSelect.options[roleSelect.selectedIndex].text;
    createCareerSkills(roleField);

    //Update charOutput R. Side section
    var charRoleOutput = document.getElementById("charRoleOutput");
    charRoleOutput.innerHTML = roleField;
}

function createPickupSkills() {
    "use strict";
    var pickupSkillsTable = document.getElementById("pickupSkillsTable");
    while (pickupSkillsTable.firstChild) { //Remove all children (options) from pickupSkillsTable
        pickupSkillsTable.removeChild(pickupSkillsTable.firstChild);
    }
    //var skills;
    var createSkillButton = document.createElement("button");
    createSkillButton.innerHTML = "Add Pickup Skill";
    createSkillButton.setAttribute("id", "createSkillButton");
    var pickupSkillsButtonContainer = document.getElementById("pickupSkillButton");
    pickupSkillsButtonContainer.appendChild(createSkillButton);
    createSkillButton.onclick = createPickupOpt;
    characterMeta.pickupSkillPointsRemain = characterMeta.pickupSkillPoints;
}

function createPickupOpt() {
    "use strict";
    var pickupSkillsTable = document.getElementById("pickupSkillsTable");
    var pickupOptSelect = document.createElement("select");
    characterMeta.pickupSkillsAdded += 1;
    var pickupOptID = "pickup".concat(characterMeta.pickupSkillsAdded.toString()).concat("Select");
    pickupOptSelect.setAttribute("id", pickupOptID);

    // Populate the "category" pickup skill option selet (ATTR, BODY, etc)
    for (var i = 1; i < Object.keys(skills).length; i++) {
        var opt = document.createElement("option");
        opt.value = i;
        opt.textContent = Object.keys(skills)[i].toUpperCase();
        pickupOptSelect.appendChild(opt);
    }

    var tdSkill = document.createElement("td");
    var tdValue = document.createElement("td");
    tdSkill.appendChild(pickupOptSelect);

    pickupOptSelect.onchange = pickupOptSelectChange;

    //Create the sub-skill Select dropdown
    var subSkillSelect = document.createElement("select");
    tdSkill.appendChild(subSkillSelect);

    var subSkillSelectID = "subPickup".concat(characterMeta.pickupSkillsAdded.toString()).concat("Select");
    subSkillSelect.setAttribute("id", subSkillSelectID);

    for (var j = 1; j < Object.keys(skills.attr).length; j++) {
        var opt2 = document.createElement("option");
        opt2.value = j;
        var opt2Temp;
        opt2Temp = "attr".concat("0").concat(j.toString());
        //
        opt2.textContent = skills.attr[opt2Temp];
        subSkillSelect.appendChild(opt2);
    }

    var subSkillField = document.createElement("input");
    var subSkillFieldID = "subSkillField".concat(characterMeta.pickupSkillsAdded.toString());
    subSkillField.setAttribute("id", subSkillFieldID);
    subSkillField.setAttribute("size", "3");

    tdValue.appendChild(subSkillField);

    var tr = document.createElement("tr");
    tr.appendChild(tdSkill);
    tr.appendChild(tdValue);
    pickupSkillsTable.appendChild(tr);

    //Assign event handler for the pickup skill fields on change
    var pickupSkillArray = pickupSkillsTable.getElementsByTagName("input");
    for (var k = 0; k < pickupSkillArray.length; k++) {
        pickupSkillArray[k].onchange = pickupSkillInputChange;
    }

    //Assign event handler for the pickup skill two dropdowns (pickup2Select and subPickup2Select)
    var pickupSelectArray = pickupSkillsTable.getElementsByTagName("select");
    for (var l = 0; l < pickupSelectArray.length; l++) {
        pickupSelectArray[l].addEventListener("change", pickupSkillInputChange);

    }
}

function pickupOptSelectChange(eventObj) {
    "use strict";
    var theSelect = eventObj.target;
    var theID = theSelect.id;
    var whichPickup = theID;
    whichPickup = whichPickup.replace("pickup", "");
    whichPickup = whichPickup.replace("Select", "");
    var theValue = theSelect.value;
    var subCategory;
    if (theValue === "1") {
        subCategory = "attr";
    } else if (theValue === "2") {
        subCategory = "body";
    } else if (theValue === "3") {
        subCategory = "cool";
    } else if (theValue === "4") {
        subCategory = "emp";
    } else if (theValue === "5") {
        subCategory = "int";
    } else if (theValue === "6") {
        subCategory = "ref";
    } else if (theValue === "7") {
        subCategory = "tech";
    }

    var theSubSelectID = "subPickup".concat(whichPickup.toString()).concat("Select");
    var theSubSelect = document.getElementById(theSubSelectID);
    while (theSubSelect.firstChild) { //Remove all children (options) from theSubSelect
        theSubSelect.removeChild(theSubSelect.firstChild);
    }

    for (var i = 1; i < Object.keys(skills[subCategory]).length; i++) {
        var opt = document.createElement("option");
        opt.value = i;
        var optText;
        if (i < 10) {
            optText = subCategory.concat("0").concat(i.toString());
            opt.textContent = skills[subCategory][optText];
        } else if (i >= 10) {
            optText = subCategory.concat(i.toString());
            opt.textContent = skills[subCategory][optText];
        }
        theSubSelect.appendChild(opt);
    }
}

function pickupSkillInputChange() {
    "use strict";
    var pickupSkillCharOutput = document.getElementById("pickupSkillCharOutput");
    var pickupSkillsTable = document.getElementById("pickupSkillsTable");
    var pickupSkillRemainingOutput = document.getElementById("pickupSkillPointsRemaining");

    while (pickupSkillCharOutput.firstChild) { //Remove all children from pickupSkillCharOutput
        pickupSkillCharOutput.removeChild(pickupSkillCharOutput.firstChild);
    }
    var pickupSkillArray = pickupSkillsTable.getElementsByTagName("input");

    characterMeta.pickupSkillPointsRemain = characterMeta.pickupSkillPoints;
    for (var i = 0; i < pickupSkillArray.length; i++) {
        if (pickupSkillArray[i].value !== "") {
            var skillLevel = pickupSkillArray[i].value;
            var skillLabelID = "subPickup".concat((i + 1).toString()).concat("Select");
            var currentSkill = document.getElementById(skillLabelID);
            var skillLabel = currentSkill[currentSkill.selectedIndex].text;
            var skillOutString = skillLabel.concat(" ").concat("[ ").concat(skillLevel).concat(" ]");
            var br = document.createElement("br");
            var newTextNode = document.createTextNode(skillOutString);
            pickupSkillCharOutput.appendChild(newTextNode);
            pickupSkillCharOutput.appendChild(br);
            characterMeta.pickupSkillPointsRemain -= parseInt(skillLevel);
        }
    }
    pickupSkillRemainingOutput.innerHTML = characterMeta.pickupSkillPointsRemain;
}

function createCareerSkills(role) {
    "use strict";
    var careerSkillTable = document.getElementById("careerSkillTable");

    // Clear out previous values if they exist
    while (careerSkillTable.firstChild) { //Remove all children (options) from careerSkillTable
        careerSkillTable.removeChild(careerSkillTable.firstChild);
    }

    var skills;
    if (role === "Solo") {
        skills = career.solo;
    } else if (role === "Corp") {
        skills = career.corp;
    } else if (role === "Media") {
        skills = career.media;
    } else if (role === "Nomad") {
        skills = career.nomad;
    } else if (role === "Techie") {
        skills = career.techie;
    } else if (role === "Cop") {
        skills = career.cop;
    } else if (role === "Rocker") {
        skills = career.rocker;
    } else if (role === "MedTechie") {
        skills = career.med;
    } else if (role === "Fixer") {
        skills = career.fixer;
    } else if (role === "Netrunner") {
        skills = career.net;
    }

    var numSkills = Object.keys(skills).length;
    for (var i = 1; i <= numSkills; i++) {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var td2 = document.createElement("td");

        // Houses the actual skill value
        var textField = document.createElement("input");
        textField.setAttribute("id", skills[i]);
        textField.setAttribute("class", "skillValueBoxes");
        textField.setAttribute("size", "3");
        var label = document.createElement("label");
        label.innerHTML = skills[i];

        td.appendChild(label);
        td2.appendChild(textField);
        tr.appendChild(td);
        tr.appendChild(td2);
        careerSkillTable.appendChild(tr);
    }
    var careerSkillArray = careerSkillTable.getElementsByTagName("input");
    for (var j = 0; j < careerSkillArray.length; j++) {
        careerSkillArray[j].onchange = careerSkillInputChange;
    }
}

function careerSkillInputChange() {
    "use strict";
    var skillCharOutput = document.getElementById("skillCharOutput");
    var careerSkillTable = document.getElementById("careerSkillTable");
    var careerSkillArray = careerSkillTable.getElementsByTagName("input");
    var careerSkillRemainingOutput = document.getElementById("careerSkillPointsRemaining");

    while (skillCharOutput.firstChild) { // Remove all children from skillCharOutput
        skillCharOutput.removeChild(skillCharOutput.firstChild);
    }

    characterMeta.careerSkillPointsRemain = characterMeta.careerSkillPoints;
    for (var i = 0; i < careerSkillArray.length; i++) {
        if (careerSkillArray[i].value !== "") {
            var skillLevel = careerSkillArray[i].value;
            var skillLabel = careerSkillArray[i].id;
            var skillOutString = skillLabel.concat(" ").concat("[ ").concat(skillLevel).concat(" ]");
            var br = document.createElement("br");
            var newTextNode = document.createTextNode(skillOutString);
            skillCharOutput.appendChild(newTextNode);
            skillCharOutput.appendChild(br);
            characterMeta.careerSkillPointsRemain -= parseInt(skillLevel);
        }
    }
    careerSkillRemainingOutput.innerHTML = characterMeta.careerSkillPointsRemain.toString();
}

function handleChange() {
    "use strict";
    var charNameOutput = document.getElementById("charNameOutput");
    var handle = document.getElementById("handle");
    if (handle.value !== "") {
        charNameOutput.innerHTML = handle.value;
    }
}

// From http://stackoverflow.com/a/12646864/853178
function shuffleArray(array) {
    "use strict";
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function generateClick() {
    "use strict";
    enableForms();
    // Reset because of the naming on "pickup{dynamic number}Select"
    characterMeta.pickupSkillsAdded = 0;

    var int = document.getElementById("int");
    var ref = document.getElementById("ref");
    var tech = document.getElementById("tech");
    var cl = document.getElementById("cl");
    var att = document.getElementById("att");
    var lk = document.getElementById("lk");
    var ma = document.getElementById("ma");
    var bt = document.getElementById("bt"); // Body type stat
    var emp = document.getElementById("emp");

    function randomlyAssignValueToStat(rolls) {
        var theStats = [int, ref, tech, cl, att, lk, ma, bt, emp];
        for (var i = 0; i < rolls.length; i++) {
            theStats[i].value = rolls[i];
        }
    }

    function generateCinematicArrayRolls(cineTotal) {
        //cineTotal: integer for that cinematic class, ie, avg == 50
        var currRoll = 0;
        var generatedCinematicRolls = [];
        var newTotal = cineTotal;
        for (var i = 0; i < 8; i++) {
            currRoll = getRandomInt(2, 10);
            generatedCinematicRolls.push(currRoll);
            newTotal -= currRoll;
        }
        var totalOfGeneratedValues = 0;
        for (var j = 0; j < generatedCinematicRolls.length; j++) {
            totalOfGeneratedValues += generatedCinematicRolls[j];
        }
        var lastValue = cineTotal - totalOfGeneratedValues;
        var subtractValue = 0;
        var tempModifyIndexValue = 0;

        while (lastValue > 10) {
            subtractValue = getRandomInt(1, 3);
            tempModifyIndexValue = getRandomInt(0, 7);
            var tempValue;
            if (generatedCinematicRolls[tempModifyIndexValue] < 10) {
                tempValue = generatedCinematicRolls[tempModifyIndexValue] + subtractValue;
                if (tempValue <= 10) {
                    generatedCinematicRolls[tempModifyIndexValue] += subtractValue;
                    lastValue -= subtractValue;
                }

            }
        }
        generatedCinematicRolls.push(lastValue);
        return generatedCinematicRolls;
    }

    var rollMethod = document.getElementById("rollMethod");
    if (rollMethod.value === 'random') {
        characterMeta.randomPoints();
        randomlyAssignValueToStat(shuffleArray(characterMeta.randRolls));
    } else if (rollMethod.value === 'fast') {
        characterMeta.fastPoints();
        randomlyAssignValueToStat(shuffleArray(characterMeta.fastRolls));
    } else if (rollMethod.value === 'cineMajorHero') {
        characterMeta.cinematicChar = 'cineMajorHero';
        randomlyAssignValueToStat(shuffleArray(generateCinematicArrayRolls(80)));
    }
    else if (rollMethod.value === 'cineMajorSupp') {
        characterMeta.cinematicChar = 'cineMajorSupp';
        randomlyAssignValueToStat(shuffleArray(generateCinematicArrayRolls(75)));
    }
    else if (rollMethod.value === 'cineMinorHero') {
        characterMeta.cinematicChar = 'cineMinorHero';
        randomlyAssignValueToStat(shuffleArray(generateCinematicArrayRolls(70)));
    }
    else if (rollMethod.value === 'cineMinorSupp') {
        characterMeta.cinematicChar = 'cineMinorSupp';
        randomlyAssignValueToStat(shuffleArray(generateCinematicArrayRolls(60)));
    }
    else if (rollMethod.value === 'Average') {
        characterMeta.cinematicChar = 'Average';
        randomlyAssignValueToStat(shuffleArray(generateCinematicArrayRolls(50)));
    }
    characterMeta.statChange();

    var roleSelect = document.getElementById('roleSelect');
    var roleField = roleSelect.options[roleSelect.selectedIndex].text;
    createCareerSkills(roleField);
    createPickupSkills();

    function randomlyAssignValuesToSkills(roleField, career, skills) {
        var startingSkillPoints = 40;
        var currentSkillSet;
        if (roleField === "Solo") {
            currentSkillSet = career.solo;
        } else if (roleField === "Corp") {
            currentSkillSet = career.corp;
        } else if (roleField === "Media") {
            currentSkillSet = career.media;
        } else if (roleField === "Nomad") {
            currentSkillSet = career.nomad;
        } else if (roleField === "Techie") {
            currentSkillSet = career.techie;
        } else if (roleField === "Cop") {
            currentSkillSet = career.cop;
        } else if (roleField === "Rocker") {
            currentSkillSet = career.rocker;
        } else if (roleField === "MedTechie") {
            currentSkillSet = career.med;
        } else if (roleField === "Fixer") {
            currentSkillSet = career.fixer;
        } else if (roleField === "Netrunner") {
            currentSkillSet = career.net;
        }
        var remainingPoints = startingSkillPoints;
        var numberSkills = Object.keys(currentSkillSet).length;

        function generateSkillPointsArray(remainingPoints, numberSkills) {
            // Generate values for randomized skill point distribution
            var distributionNumber;
            var candidateNumber;
            var generatedSkillPoints = [];
            for (var i = 0; i < numberSkills - 1; i++) {
                if (remainingPoints > 10) {
                    distributionNumber = getRandomInt(1, 10);

                    if ((distributionNumber >= 1) && (distributionNumber < 7)) {
                        candidateNumber = getRandomInt(1, 5);
                    } else if ((distributionNumber >= 7) && (distributionNumber <= 8)) {
                        candidateNumber = getRandomInt(1, 7);
                    } else if ((distributionNumber >= 9) && (distributionNumber <= 10)) {
                        candidateNumber = getRandomInt(1, 10);
                    }
                } else if (remainingPoints <= 10) {
                    candidateNumber = remainingPoints;
                }
                remainingPoints -= candidateNumber;
                generatedSkillPoints.push(candidateNumber);
            }

            // If there's points remaining, distribute them across the array
            while (remainingPoints >= 1) {
                for (var j = 0; j < generatedSkillPoints.length; j++) {
                    if (remainingPoints >= 1) {
                        generatedSkillPoints[j] += 1;
                        remainingPoints -= 1;
                    }
                }

            }
            // If there's 0 values, pull from highest value to make them at least 1
            for (var k = 0; k < generatedSkillPoints.length; k++) {
                if (generatedSkillPoints[k] === 0) {
                    var largest = Math.max.apply(Math, generatedSkillPoints);
                    var positionOfLargest = generatedSkillPoints.indexOf(largest);
                    generatedSkillPoints[k] += 1;
                    generatedSkillPoints[positionOfLargest] -= 1;
                }
            }
            generatedSkillPoints = shuffleArray(generatedSkillPoints);
            return generatedSkillPoints;
        }


        function generatePickupPointsArray(currentSkillSet) {
            var remainingPickupPoints = characterMeta.pickupSkillPoints;
            var whichSubSkill = {
                1: "attr",
                2: "body",
                3: "cool",
                4: "emp",
                5: "int",
                6: "ref",
                7: "tech"
            }

            var numberAdded = 0; // Number of pickup skills added
            var usedAlready = [];
            while (remainingPickupPoints > 0) {
                var currentCandidateSkillLevel;
                if (remainingPickupPoints <= 10) {
                    currentCandidateSkillLevel = getRandomInt(1, remainingPickupPoints);
                } else {
                    currentCandidateSkillLevel = getRandomInt(1, 10);
                }
                if (remainingPickupPoints - currentCandidateSkillLevel >= 0) {
                    var currentSubSkill = getRandomInt(1, 7);

                    // attr, body, cool, etc.
                    var skillSubCategory = whichSubSkill[currentSubSkill];

                    var allSkillsFromSubCategory = skills[skillSubCategory];
                    var numberSkillsInSubCategory = Object.keys(allSkillsFromSubCategory).length - 1;
                    var randomSkillFromSubCategory = getRandomInt(1, numberSkillsInSubCategory);
                    if (randomSkillFromSubCategory < 10) {
                        randomSkillFromSubCategory.toString();
                        randomSkillFromSubCategory = "0" + randomSkillFromSubCategory;
                    } else {
                        randomSkillFromSubCategory.toString();
                    }
                    // example: tech04
                    var finalSkillName = skillSubCategory + randomSkillFromSubCategory;
                    var proceed;

                    // Verify random candidate isn't part of career skills
                    for (var property in currentSkillSet) {
                        if ((skills[skillSubCategory][finalSkillName] === currentSkillSet[property]) === true) {
                            proceed = false;
                            break;
                        } else {
                            proceed = true;
                        }
                    }

                    // Verify random candidate isn't part of already chosen pickup skills
                    if (usedAlready.indexOf(finalSkillName) !== -1) {
                        proceed = false;
                    }

                    if (proceed === true) {
                        usedAlready.push(finalSkillName);
                        var addPickup = document.getElementById("createSkillButton");
                        addPickup.click();
                        numberAdded += 1;
                        var pickupCategory = document.getElementById("pickup" + numberAdded + "Select");

                        for (var k = 0; k < pickupCategory.options.length; k++) {
                            if (pickupCategory.options[k].text === skillSubCategory.toUpperCase()) {
                                pickupCategory.selectedIndex = k;
                                break;
                            }
                        }
                        // Dynamically fire a onchange for the pickup skill category dropdown
                        var event = document.createEvent("HTMLEvents");
                        event.initEvent("change", false, true);
                        pickupCategory.dispatchEvent(event);

                        var pickupChoice = document.getElementById("subPickup" + numberAdded + "Select");

                        for (var l = 0; l < pickupChoice.options.length; l++) {
                            if (pickupChoice.options[l].text === skills[skillSubCategory][finalSkillName]) {
                                pickupChoice.selectedIndex = l;
                            }
                        }

                        var pickupField = document.getElementById("subSkillField" + numberAdded);
                        pickupField.value = currentCandidateSkillLevel;
                        pickupSkillInputChange();
                        remainingPickupPoints -= currentCandidateSkillLevel;
                    }
                }
            }
        }

        // Set the value of the Career Skill
        var careerSkillName = document.getElementById(currentSkillSet[1]);
        careerSkillName.value = getRandomInt(1, 10);
        remainingPoints -= parseInt(careerSkillName.value);

        // Generate the rest of the Role skills
        var generatedSkillPoints = generateSkillPointsArray(remainingPoints, numberSkills);
        var currentSkillToUpdate;
        for (var l = 0; l < generatedSkillPoints.length; l++) {
            currentSkillToUpdate = document.getElementById(currentSkillSet[l + 2]);
            currentSkillToUpdate.value = generatedSkillPoints[l];
        }
        careerSkillInputChange();
        generatePickupPointsArray(currentSkillSet);
    }

    //Randomize Skills
    randomlyAssignValuesToSkills(roleField, career, skills);

    // Randomize Style
    randomStyleClick();

    // Randomize Ethnicity
    rollEthClick();

    // Randomize Family Origins
    randFamClick();

    // Randomize Parents History
    randParentsClick();

    // Randomize Family Status
    randFamilyStatusClick();

    // Randomize Childhood Env
    randChildEnvClick();

    // Randomize Siblings
    randSiblingsClick();

    // Randomize Personality Traits
    randPersTraitsClick();

    // Randomize Person You Value Most
    randPersValueClick();

    // Randomize What You Value Most
    randYouValueClick();

    // Randomize Feel about Most People
    randYouFeelClick();

    // Randomize valued posession
    randPosClick();

    // Randomize Age
    randAgeClick();
}

function saveNewImage() {
    "use strict";
    var fullCharOutput = document.getElementById("fullCharOutput");
    html2canvas(fullCharOutput, {
        onrendered: function (canvas) {
            var img = canvas.toDataURL();
            window.open(img);
        },
        letterRendering: true
    });
}


function init() {
    "use strict";

    var saveImage = document.getElementById("saveImage");
    saveImage.onclick = saveNewImage;

    // Handle (character name)
    var handle = document.getElementById("handle");
    handle.onchange = handleChange;

    // Generate
    var generate = document.getElementById("generate");
    // Randomize generation
    generate.onclick = generateClick;

    // Roll method elements
    var rollMethod = document.getElementById("rollMethod");
    rollMethod.onchange = rollMethodClick;

    // Role elements
    roleSelectPopulate();
    var roleSelect = document.getElementById("roleSelect");
    // Role event handlers
    roleSelect.onchange = manualRoleSelectChange;

    var ageField = document.getElementById("ageField");
    ageField.onchange = ageChange;
}
window.onload = init;
