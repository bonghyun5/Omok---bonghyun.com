var _neutral = "#F5DEB3";
var _dark = "#8B7765";
var _light = "#FFF5EE";
var _player = "dark";
var _darkMoveList = new Array();
var _lightMoveList = new Array();
var _enabled = true;
var _AIMoveList = new Array();
$(document).ready(function() {
    $(".board-row div").hover(
	function () {
	    if (_enabled) {
		if (_player == "dark" && $(this).attr("class") == "neutral") {
		    $(this).css("background-color", _dark);
		} else if (_player == "light" && $(this).attr("class") == "neutral") {
		    $(this).css("background-color", _light);
		}
	    }
	},
	function () {
	    if ($(this).attr("class") == "neutral") {
		$(this).css("background-color", _neutral);
	    } else if ($(this).attr("class") == "dark") {
		$(this).css("background-color", _dark);
	    } else {
		$(this).css("background-color", _light);
	    }
	}
    );
    $(".board-row div").click(
	function () {
	    if (makeHumanMove(this)) {
		makeAIMove("light");
	    }
	}
    );    
});
function makeHumanMove(click) {
    if(_enabled) {
	var movePlayer = $(click).attr("class");
	var move = $(click).attr("id");
	if (_player == "dark" && moveValidator(movePlayer)) {
	    $(click).removeClass($(click).attr("class")).addClass("dark");
	    _darkMoveList.push(move);
	    addAIMove(move);
	    _AIMoveList.splice(_AIMoveList.indexOf(move), 1);
	    if (winCheck(move, _player)) {
		alert("BLACK WINS!");
		_enabled = false;
	    }
	    _player = "light";
	    return true;
	} else if (_player == "light" && moveValidator(movePlayer)) {
	    $(click).removeClass($(click).attr("class")).addClass("light");
	    _lightMoveList.push(move);
	    addAIMove(move);
	    $(click).css("background-color", _player);
	    _AIMoveList.splice(_AIMoveList.indexOf(move), 1);
	    if (winCheck(move, _player)) {
		alert("WHITE WINS!");
		_enabled = false;
	    }
	    _player = "dark";
	    return true;
	}
	return false;
    }
}
function addAIMove(move) {
    var moveX = getMoveX(move);
    var moveY = getMoveY(move);
    for(i = -2; i <= 2; i ++) {
	for (j = -2; j <= 2; j++) {
	    var tempMove = concatMove(numToLetter(moveX + i), numToLetter(moveY + j));
	    if (tempMove != null && tempMove != move && _AIMoveList.indexOf(tempMove) == -1 && _darkMoveList.indexOf(tempMove) == -1 && _lightMoveList.indexOf(tempMove) == -1) {
		_AIMoveList.push(tempMove);
	    }
	}   
    }
}
function concatMove(moveX, moveY) {
    if (moveX < 0 || moveX > 14 || moveY < 0 || moveY > 14) {
	return null;
    } else {
	return (moveX.toString()).concat(moveY.toString());
    }
}
function moveValidator(movePlayer) {
    if (movePlayer != "neutral") {
	return false;
    } else {
	return true;
    }
}
function getMoveX(move) {
    var moveX = move.charAt(0);
    return letterToNum(moveX);
}
function getMoveY(move) {
    var moveY = move.charAt(1);
    return letterToNum(moveY);
}
function letterToNum(move) {
    if (move == "a") {
	return 10;
    } else if (move == "b") {
	return 11;
    } else if (move == "c") {
	return 12;
    } else if (move == "d") {
	return 13;
    } else if (move == "e") {
	return 14;
    } else {
	return parseInt(move);
    }
}
function numToLetter(move) {
    if (move == 10) {
	return "a";
    } else if (move == 11) {
	return "b";
    } else if (move == 12) {
	return "c";
    } else if (move == 13) {
	return "d";
    } else if (move == 14) {
	return "e";
    } else {
	return move.toString();
    }
}
function winCheck(move, player) {
    return numConnections(move, player, 5);
}
function numConnections(move, player, numConnect) {
    var moveX = getMoveX(move);
    var moveY = getMoveY(move);
    if(horizontalConnection(moveX, moveY, player, numConnect) || verticalConnection(moveX, moveY, player, numConnect) || diagonal1Connection(moveX, moveY, player, numConnect) || diagonal2Connection(moveX, moveY, player, numConnect)) {
	return true;
    } else {
	return false;
    }
}
function horizontalConnection(moveX, moveY, player, numConnection) {
    var counter = 1;
    for (i = 1; i < 6 ; i ++) {
	var move = numToLetter(parseInt(moveX) - i).toString() + numToLetter(moveY).toString();
	if (player == "dark") {
	    if(_darkMoveList.indexOf(move) == -1) {
		break;
	    } else {
		counter ++;
	    }
	} else {
	    if(_lightMoveList.indexOf(move) == -1) {
		break;
	    } else {
		counter ++;
	    } 
	}
    }
    for (j = 1; j < 6; j ++) {
	var move = numToLetter(parseInt(moveX) + j).toString() + numToLetter(moveY).toString();
	if (player == "dark") {
	    if(_darkMoveList.indexOf(move) == -1) {
		break;
	    } else {
		counter ++;
	    }
	} else {
	    if(_lightMoveList.indexOf(move) == -1) {
		break;
	    } else {
		counter ++;
	    } 
	}
    }
    if(counter >= numConnection) {
	return true;
    } else {
	return false;
    }
}
function verticalConnection(moveX, moveY, player, numConnection) {
    var counter = 1;
    for (i = 1; i < 6 ; i ++) {
	var move = numToLetter(moveX).toString() + numToLetter(parseInt(moveY) + i).toString();
	if (player == "dark") {
	    if(_darkMoveList.indexOf(move) == -1) {
		break;
	    } else {
		counter ++;
	    }
	} else {
	    if(_lightMoveList.indexOf(move) == -1) {
		break;
	    } else {
		counter ++;
	    } 
	}
    }
    for (j = 1; j < 6; j ++) {
	var move = numToLetter(moveX).toString() + numToLetter(parseInt(moveY) - j).toString();
	if (player == "dark") {
	    if(_darkMoveList.indexOf(move) == -1) {
		break;
	    } else {
		counter ++;
	    }
	} else {
	    if(_lightMoveList.indexOf(move) == -1) {
		break;
	    } else {
		counter ++;
	    } 
	}
    }
    if(counter >= numConnection) {
	return true;
    } else {
	return false;
    }
}
function diagonal1Connection(moveX, moveY, player, numConnection) {
    var counter = 1;
    for (i = 1; i < 6 ; i ++) {
	var move = numToLetter(parseInt(moveX) + i).toString() + numToLetter(parseInt(moveY) + i).toString();
	if (player == "dark") {
	    if(_darkMoveList.indexOf(move) == -1) {
		break;
	    } else {
		counter ++;
	    }
	} else {
	    if(_lightMoveList.indexOf(move) == -1) {
		break;
	    } else {
		counter ++;
	    } 
	}
    }
    for (j = 1; j < 6; j ++) {
	var move = numToLetter(parseInt(moveX) - j).toString() + numToLetter(parseInt(moveY) - j).toString();
	if (player == "dark") {
	    if(_darkMoveList.indexOf(move) == -1) {
		break;
	    } else {
		counter ++;
	    }
	} else {
	    if(_lightMoveList.indexOf(move) == -1) {
		break;
	    } else {
		counter ++;
	    } 
	}
    }
    if(counter >= numConnection) {
	return true;
    } else {
	return false;
    }
}
function diagonal2Connection(moveX, moveY, player, numConnection) {
    var counter = 1;
    for (i = 1; i < 6 ; i ++) {
	var move = numToLetter(parseInt(moveX) + i).toString() + numToLetter(parseInt(moveY) - i).toString();
	if (player == "dark") {
	    if(_darkMoveList.indexOf(move) == -1) {
		break;
	    } else {
		counter ++;
	    }
	} else {
	    if(_lightMoveList.indexOf(move) == -1) {
		break;
	    } else {
		counter ++;
	    } 
	}
    }
    for (j = 1; j < 6; j ++) {
	var move = numToLetter(parseInt(moveX) - j).toString() + numToLetter(parseInt(moveY) + j).toString();
	if (player == "dark") {
	    if(_darkMoveList.indexOf(move) == -1) {
		break;
	    } else {		
		counter ++;
	    }
	} else {
	    if(_lightMoveList.indexOf(move) == -1) {
		break;
	    } else {
		counter ++;
	    } 
	}
    }
    if(counter >= numConnection) {
	return true;
    } else {
	return false;
    }
}
function blockedThree(move, player) {
    var player = player;
    var opponent = getOpponent(player);
    var moveX = getMoveX(move);
    var moveY = getMoveY(move);
    if (horizontal1BlockedThree(moveX, moveY, player) || horizontal2BlockedThree(moveX, moveY, player) || vertical1BlockedThree(moveX, moveY, player) || vertical2BlockedThree(moveX, moveY, player) || diagonal1BlockedThree(moveX, moveY, player) || diagonal2BlockedThree(moveX, moveY, player) || diagonal3BlockedThree(moveX, moveY, player) || diagonal4BlockedThree(moveX, moveY, player)) {
	return true;
    } else {
	return false;
    }
}
function horizontal1BlockedThree(moveX, moveY, player) {
    var player = player;
    var opponent = getOpponent(player);
    var move1 = numToLetter(parseInt(moveX) - 1).toString() + numToLetter(moveY).toString();
    var move2 = numToLetter(parseInt(moveX) - 2).toString() + numToLetter(moveY).toString();
    var move3 = numToLetter(parseInt(moveX) - 3).toString() + numToLetter(moveY).toString();
    var move4 = numToLetter(parseInt(moveX) - 4).toString() + numToLetter(moveY).toString();
    if (player == "dark") {
	if(_lightMoveList.indexOf(move1) != -1 && _lightMoveList.indexOf(move2) != -1 && _lightMoveList.indexOf(move3) != -1 && _darkMoveList.indexOf(move4) != -1) {
	    return true;
	} else {
	    return false;
	}
    } else {
	if(_darkMoveList.indexOf(move1) != -1 && _darkMoveList.indexOf(move2) != -1 && _darkMoveList.indexOf(move3) != -1 && _lightMoveList.indexOf(move4) != -1) {
	    return true;
	} else {
	    return false;
	}
    }
}
function horizontal2BlockedThree(moveX, moveY, player) {
    var player = player;
    var opponent = getOpponent(player);
    var move1 = numToLetter(parseInt(moveX) + 1).toString() + numToLetter(moveY).toString();
    var move2 = numToLetter(parseInt(moveX) + 2).toString() + numToLetter(moveY).toString();
    var move3 = numToLetter(parseInt(moveX) + 3).toString() + numToLetter(moveY).toString();
    var move4 = numToLetter(parseInt(moveX) + 4).toString() + numToLetter(moveY).toString();
    if (player == "dark") {
	if(_lightMoveList.indexOf(move1) != -1 && _lightMoveList.indexOf(move2) != -1 && _lightMoveList.indexOf(move3) != -1 && _darkMoveList.indexOf(move4) != -1) {
	    return true;
	} else {
	    return false;
	}
    } else {
	if(_darkMoveList.indexOf(move1) != -1 && _darkMoveList.indexOf(move2) != -1 && _darkMoveList.indexOf(move3) != -1 && _lightMoveList.indexOf(move4) != -1) {
	    return true;
	} else {
	    return false;
	}
    }
}
function vertical1BlockedThree(moveX, moveY, player) {
    var player = player;
    var opponent = getOpponent(player);
    var move1 = numToLetter(moveX).toString() + numToLetter(parseInt(moveY) + 1).toString();
    var move2 = numToLetter(moveX).toString() + numToLetter(parseInt(moveY) + 2).toString();
    var move3 = numToLetter(moveX).toString() + numToLetter(parseInt(moveY) + 3).toString();
    var move4 = numToLetter(moveX).toString() + numToLetter(parseInt(moveY) + 4).toString();
    if (player == "dark") {
	if(_lightMoveList.indexOf(move1) != -1 && _lightMoveList.indexOf(move2) != -1 && _lightMoveList.indexOf(move3) != -1 && _darkMoveList.indexOf(move4) != -1) {
	    return true;
	} else {
	    return false;
	}
    } else {
	if(_darkMoveList.indexOf(move1) != -1 && _darkMoveList.indexOf(move2) != -1 && _darkMoveList.indexOf(move3) != -1 && _lightMoveList.indexOf(move4) != -1) {
	    return true;
	} else {
	    return false;
	}
    }
}
function vertical2BlockedThree(moveX, moveY, player) {
    var player = player;
    var opponent = getOpponent(player);
    var move1 = numToLetter(moveX).toString() + numToLetter(parseInt(moveY) - 1).toString();
    var move2 = numToLetter(moveX).toString() + numToLetter(parseInt(moveY) - 2).toString();
    var move3 = numToLetter(moveX).toString() + numToLetter(parseInt(moveY) - 3).toString();
    var move4 = numToLetter(moveX).toString() + numToLetter(parseInt(moveY) - 4).toString();
    if (player == "dark") {
	if(_lightMoveList.indexOf(move1) != -1 && _lightMoveList.indexOf(move2) != -1 && _lightMoveList.indexOf(move3) != -1 && _darkMoveList.indexOf(move4) != -1) {
	    return true;
	} else {
	    return false;
	}
    } else {
	if(_darkMoveList.indexOf(move1) != -1 && _darkMoveList.indexOf(move2) != -1 && _darkMoveList.indexOf(move3) != -1 && _lightMoveList.indexOf(move4) != -1) {
	    return true;
	} else {
	    return false;
	}
    }
}
function diagonal1BlockedThree(moveX, moveY, player) {
    var player = player;
    var opponent = getOpponent(player);
    var move1 = numToLetter(parseInt(moveX) - 1).toString() + numToLetter(parseInt(moveY) - 1).toString();
    var move2 = numToLetter(parseInt(moveX) - 2).toString() + numToLetter(parseInt(moveY) - 2).toString();
    var move3 = numToLetter(parseInt(moveX) - 3).toString() + numToLetter(parseInt(moveY) - 3).toString();
    var move4 = numToLetter(parseInt(moveX) - 4).toString() + numToLetter(parseInt(moveY) - 4).toString();
    if (player == "dark") {
	if(_lightMoveList.indexOf(move1) != -1 && _lightMoveList.indexOf(move2) != -1 && _lightMoveList.indexOf(move3) != -1 && _darkMoveList.indexOf(move4) != -1) {
	    return true;
	} else {
	    return false;
	}
    } else {
	if(_darkMoveList.indexOf(move1) != -1 && _darkMoveList.indexOf(move2) != -1 && _darkMoveList.indexOf(move3) != -1 && _lightMoveList.indexOf(move4) != -1) {
	    return true;
	} else {
	    return false;
	}
    }
}
function diagonal2BlockedThree(moveX, moveY, player) {
    var player = player;
    var opponent = getOpponent(player);
    var move1 = numToLetter(parseInt(moveX) - 1).toString() + numToLetter(parseInt(moveY) + 1).toString();
    var move2 = numToLetter(parseInt(moveX) - 2).toString() + numToLetter(parseInt(moveY) + 2).toString();
    var move3 = numToLetter(parseInt(moveX) - 3).toString() + numToLetter(parseInt(moveY) + 3).toString();
    var move4 = numToLetter(parseInt(moveX) - 4).toString() + numToLetter(parseInt(moveY) + 4).toString();
    if (player == "dark") {
	if(_lightMoveList.indexOf(move1) != -1 && _lightMoveList.indexOf(move2) != -1 && _lightMoveList.indexOf(move3) != -1 && _darkMoveList.indexOf(move4) != -1) {
	    return true;
	} else {
	    return false;
	}
    } else {
	if(_darkMoveList.indexOf(move1) != -1 && _darkMoveList.indexOf(move2) != -1 && _darkMoveList.indexOf(move3) != -1 && _lightMoveList.indexOf(move4) != -1) {
	    return true;
	} else {
	    return false;
	}
    }
}
function diagonal3BlockedThree(moveX, moveY, player) {
    var player = player;
    var opponent = getOpponent(player);
    var move1 = numToLetter(parseInt(moveX) + 1).toString() + numToLetter(parseInt(moveY) - 1).toString();
    var move2 = numToLetter(parseInt(moveX) + 2).toString() + numToLetter(parseInt(moveY) - 2).toString();
    var move3 = numToLetter(parseInt(moveX) + 3).toString() + numToLetter(parseInt(moveY) - 3).toString();
    var move4 = numToLetter(parseInt(moveX) + 4).toString() + numToLetter(parseInt(moveY) - 4).toString();
    if (player == "dark") {
	if(_lightMoveList.indexOf(move1) != -1 && _lightMoveList.indexOf(move2) != -1 && _lightMoveList.indexOf(move3) != -1 && _darkMoveList.indexOf(move4) != -1) {
	    return true;
	} else {
	    return false;
	}
    } else {
	if(_darkMoveList.indexOf(move1) != -1 && _darkMoveList.indexOf(move2) != -1 && _darkMoveList.indexOf(move3) != -1 && _lightMoveList.indexOf(move4) != -1) {
	    return true;
	} else {
	    return false;
	}
    }
}
function diagonal4BlockedThree(moveX, moveY, player) {
    var player = player;
    var opponent = getOpponent(player);
    var move1 = numToLetter(parseInt(moveX) + 1).toString() + numToLetter(parseInt(moveY) + 1).toString();
    var move2 = numToLetter(parseInt(moveX) + 2).toString() + numToLetter(parseInt(moveY) + 2).toString();
    var move3 = numToLetter(parseInt(moveX) + 3).toString() + numToLetter(parseInt(moveY) + 3).toString();
    var move4 = numToLetter(parseInt(moveX) + 4).toString() + numToLetter(parseInt(moveY) + 4).toString();
    if (player == "dark") {
	if(_lightMoveList.indexOf(move1) != -1 && _lightMoveList.indexOf(move2) != -1 && _lightMoveList.indexOf(move3) != -1 && _darkMoveList.indexOf(move4) != -1) {
	    return true;
	} else {
	    return false;
	}
    } else {
	if(_darkMoveList.indexOf(move1) != -1 && _darkMoveList.indexOf(move2) != -1 && _darkMoveList.indexOf(move3) != -1 && _lightMoveList.indexOf(move4) != -1) {
	    return true;
	} else {
	    return false;
	}
    }
}
function makeAIMove(player) {
    if (_enabled == true) {
	_enabled == false;
	if (player == "light") {
	    var AImove = $("#" + getAIMove(player));
	    $(AImove).removeClass($(AImove).attr("class")).addClass("light");
	    _lightMoveList.push($(AImove).attr("id"));
	    if ($(AImove).attr("class") == "neutral") {
		$(AImove).css("background-color", _neutral);
	    } else if ($(AImove).attr("class") == "dark") {
		$(AImove).css("background-color", _dark);
	    } else {
		$(AImove).css("background-color", _light);
	    }
	    addAIMove($(AImove).attr("id"));
	    _AIMoveList.splice(_AIMoveList.indexOf($(AImove).attr("id")), 1);
	    if (winCheck($(AImove).attr("id"), _player)) {
		alert("WHITE WINS!");
		_enabled = false;
	    }
	    _player = "dark";
	}
    }
    _enabled == true;
}
function getAIMove(player) {
    var move;
    move = _AIMoveList[0];
    for (i in _AIMoveList) {
	var tempMove = _AIMoveList[i];
	if (getMoveValue(tempMove, player) > getMoveValue(move) && $("#" + tempMove).attr("class") == "neutral") {
	    move = tempMove;
	}
    }
    return move;
}
function getMoveValue(move, player) {
    var player = player;
    var opponent = getOpponent(player);
    if (numConnections(move, opponent, 5) == true) {
	return 9.5;
    }
    if (numConnections(move, player, 5) == true) {
	return 10;
    }
    if (numConnections(move, opponent, 4) == true && !blockedThree(move, player)) {
	return 7;
    }
    if (numConnections(move, opponent, 4) == true && blockedThree(move, player)){
	return 2.1;
    }
    if (numConnections(move, player, 4) == true && !blockedThree(move, opponent)) {
	return 9;
    }
    if (numConnections(move, player, 4) == true && blockedThree(move, opponent)) {
	return 6;
    }
    if (numConnections(move, player, 3) == true) {
	return 5;
    }
    if (numConnections(move, player, 2) == true) {
	return 3;
    }
    if (numConnections(move, opponent, 3) == true) {
	return 2;
    }
    if (numConnections(move, opponent, 2) == true) {
	return 1;
    }
    return 0;
}
function getOpponent(player) {
    if (player == "dark") {
	return "light";
    } else {
	return "dark";
    }
}