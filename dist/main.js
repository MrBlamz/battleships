/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/computer.js":
/*!*************************!*\
  !*** ./src/computer.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ \"./src/helpers.js\");\n\n\n\nconst Computer = function Computer() {\n  const plays = [];\n\n  function checkForRepeatedPlay(newPlay) {\n    return plays.some((prevPlay) => (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.isEqualCoordinate)(prevPlay, newPlay));\n  }\n\n  function addPlay(play) {\n    plays.push(play);\n  }\n\n  // eslint-disable-next-line consistent-return\n  function makePlay() {\n    const play = { x: (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.generateRandomNumber)(9), y: (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.generateRandomNumber)(9) };\n    const isRepeated = checkForRepeatedPlay(play);\n\n    if (!isRepeated) {\n      addPlay(play);\n      return play;\n    }\n\n    return makePlay();\n  }\n\n  function getPlays() {\n    return plays;\n  }\n\n  return { makePlay, getPlays, ...(0,_player__WEBPACK_IMPORTED_MODULE_0__.default)() };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Computer);\n\n\n//# sourceURL=webpack://battleship/./src/computer.js?");

/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst DOM = (function DOM() {\n  const playerBoardContainer = document.querySelector('.player-gameboard');\n  const computerBoardContainer = document.querySelector('.computer-gameboard');\n  const modal = document.querySelector('.modal');\n  const winner = document.getElementById('winner');\n  const restartGameBtn = document.getElementById('restart-game');\n\n  function createGameBoard(gameBoard) {\n    const board = document.createElement('div');\n    board.classList.add('gameboard');\n\n    for (let x = 0; x <= 9; x += 1) {\n      const column = document.createElement('div');\n      column.classList.add('column');\n\n      for (let y = 0; y <= 9; y += 1) {\n        const square = document.createElement('div');\n        square.classList.add('square');\n        square.setAttribute('data-coordinate', `${x},${y}`);\n        const isShip = gameBoard.getCoords(x, y);\n        if (isShip) square.classList.add('ship');\n        column.appendChild(square);\n      }\n\n      board.appendChild(column);\n    }\n\n    return board;\n  }\n\n  function removeExistingGameBoard(container) {\n    const gameBoard = container.querySelector('.gameboard');\n    if (gameBoard) container.removeChild(gameBoard);\n  }\n\n  function renderGameBoards(player, computer) {\n    removeExistingGameBoard(playerBoardContainer);\n    removeExistingGameBoard(computerBoardContainer);\n    const playerBoard = createGameBoard(player);\n    const computerBoard = createGameBoard(computer);\n    playerBoardContainer.appendChild(playerBoard);\n    computerBoardContainer.appendChild(computerBoard);\n  }\n\n  function triggerPlayOnGameBoardClick(fn) {\n    computerBoardContainer\n      .querySelectorAll('.square')\n      .forEach((square) =>\n        square.addEventListener('click', fn, { once: true })\n      );\n  }\n\n  function getPlayerBoardSquare(x, y) {\n    let result;\n    const squares = playerBoardContainer.querySelectorAll('.square');\n\n    for (let i = 0; i < squares.length; i += 1) {\n      const coords = squares[i].getAttribute('data-coordinate').split(',');\n      const squareX = parseInt(coords[0], 10);\n      const squareY = parseInt(coords[1], 10);\n      if (x === squareX && y === squareY) {\n        result = squares[i];\n        break;\n      }\n    }\n\n    return result;\n  }\n\n  function setSuccessfulHit(target) {\n    target.classList.add('ship-hit');\n  }\n\n  function setMissedShot(target) {\n    target.classList.add('missed-shot');\n  }\n\n  function toggleModal() {\n    modal.classList.toggle('active');\n  }\n\n  function setWinner(text) {\n    winner.textContent = `${text} won!`;\n  }\n\n  function popUpModal(text) {\n    toggleModal();\n    setWinner(text);\n  }\n\n  function closeModal() {\n    modal.classList.remove('active');\n  }\n\n  function triggerGameRestartOnModalBtnClick(fn) {\n    restartGameBtn.addEventListener('click', (e) => {\n      fn(e);\n      closeModal();\n    });\n  }\n\n  return {\n    renderGameBoards,\n    triggerPlayOnGameBoardClick,\n    getPlayerBoardSquare,\n    setSuccessfulHit,\n    setMissedShot,\n    popUpModal,\n    triggerGameRestartOnModalBtnClick,\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOM);\n\n\n//# sourceURL=webpack://battleship/./src/dom.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _computer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./computer */ \"./src/computer.js\");\n/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameBoard */ \"./src/gameBoard.js\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers */ \"./src/helpers.js\");\n\n\n\n\n\n\nconst Game = (function Game() {\n  const player = (0,_player__WEBPACK_IMPORTED_MODULE_0__.default)();\n  const playerBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_2__.default)();\n  const computer = (0,_computer__WEBPACK_IMPORTED_MODULE_1__.default)();\n  const computerBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_2__.default)();\n  let hasWinner = false;\n\n  function addShips(gameBoard) {\n    gameBoard.fill();\n  }\n\n  function drawStartingPlayer() {\n    const rnd = (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.generateRandomNumber)(1);\n\n    if (rnd) {\n      player.changeTurn();\n    } else {\n      computer.changeTurn();\n    }\n  }\n\n  function nextTurn() {\n    player.changeTurn();\n    computer.changeTurn();\n  }\n\n  function computerPlay() {\n    if (computer.isTurn() && !hasWinner) {\n      const coords = computer.makePlay();\n      const { x, y } = coords;\n      const isShip = playerBoard.getCoords(x, y);\n      playerBoard.receiveAttack(x, y);\n\n      if (isShip) {\n        _dom__WEBPACK_IMPORTED_MODULE_3__.default.setSuccessfulHit(_dom__WEBPACK_IMPORTED_MODULE_3__.default.getPlayerBoardSquare(x, y));\n      } else {\n        _dom__WEBPACK_IMPORTED_MODULE_3__.default.setMissedShot(_dom__WEBPACK_IMPORTED_MODULE_3__.default.getPlayerBoardSquare(x, y));\n      }\n\n      if (!playerBoard.hasShips()) {\n        _dom__WEBPACK_IMPORTED_MODULE_3__.default.popUpModal('Computer');\n        hasWinner = true;\n      } else {\n        nextTurn();\n      }\n    }\n  }\n\n  function playerPlay(event) {\n    if (player.isTurn() && !hasWinner) {\n      const coords = event.target.getAttribute('data-coordinate').split(',');\n      const x = parseInt(coords[0], 10);\n      const y = parseInt(coords[1], 10);\n\n      // getCoords is called first cause if receive attack has a ship in it's\n      // cords and the ship is sunk it will remove it from board returning null\n      // to getCoords\n      const isShip = computerBoard.getCoords(x, y);\n      computerBoard.receiveAttack(x, y);\n\n      if (isShip) {\n        _dom__WEBPACK_IMPORTED_MODULE_3__.default.setSuccessfulHit(event.target);\n      } else {\n        _dom__WEBPACK_IMPORTED_MODULE_3__.default.setMissedShot(event.target);\n      }\n\n      if (!computerBoard.hasShips()) {\n        _dom__WEBPACK_IMPORTED_MODULE_3__.default.popUpModal('Player');\n        hasWinner = true;\n      } else {\n        nextTurn();\n        computerPlay();\n      }\n    }\n  }\n\n  function restartGame() {\n    playerBoard.reset();\n    computerBoard.reset();\n    hasWinner = false;\n    addShips(playerBoard);\n    addShips(computerBoard);\n    _dom__WEBPACK_IMPORTED_MODULE_3__.default.renderGameBoards(playerBoard, computerBoard);\n    _dom__WEBPACK_IMPORTED_MODULE_3__.default.triggerPlayOnGameBoardClick(playerPlay);\n    computerPlay();\n  }\n\n  function start() {\n    addShips(playerBoard);\n    addShips(computerBoard);\n    _dom__WEBPACK_IMPORTED_MODULE_3__.default.renderGameBoards(playerBoard, computerBoard);\n    drawStartingPlayer();\n    _dom__WEBPACK_IMPORTED_MODULE_3__.default.triggerPlayOnGameBoardClick(playerPlay);\n    _dom__WEBPACK_IMPORTED_MODULE_3__.default.triggerGameRestartOnModalBtnClick(restartGame);\n    computerPlay();\n  }\n\n  return { start };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);\n\n\n//# sourceURL=webpack://battleship/./src/game.js?");

/***/ }),

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ \"./src/helpers.js\");\n\n\n\nconst GameBoard = function GameBoard() {\n  let shipSizes = [5, 4, 3, 3, 2];\n  let ships = [];\n  let missedShots = [];\n\n  function calculateCoordinates(shipLength, x, y, direction) {\n    const coords = [];\n\n    for (let i = 0; i < shipLength; i += 1) {\n      if (direction === 'horizontal') {\n        coords.push({ x: x + i, y });\n      } else {\n        coords.push({ x, y: y + i });\n      }\n    }\n\n    return coords;\n  }\n\n  function checkCoordinatesAvailability(newCoordinates) {\n    let available = true;\n\n    for (let i = 0; i < ships.length; i += 1) {\n      const shipCoordinates = ships[i].coordinates;\n\n      const result = newCoordinates.filter((newShipCoordinate) =>\n        shipCoordinates.some((oldShipCoordinate) =>\n          (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.isEqualCoordinate)(newShipCoordinate, oldShipCoordinate)\n        )\n      );\n\n      if (result.length) {\n        available = false;\n        break;\n      }\n    }\n\n    return available;\n  }\n\n  function isWithinBounds(coordinates) {\n    return coordinates.every((coordinate) => {\n      const { x, y } = coordinate;\n      return x >= 0 && x <= 9 && y >= 0 && y <= 9;\n    });\n  }\n\n  function add(shipLength, x, y, direction) {\n    const newCoordinates = calculateCoordinates(shipLength, x, y, direction);\n    const isAvailable = checkCoordinatesAvailability(newCoordinates);\n    const isInsideBoard = isWithinBounds(newCoordinates);\n\n    if (isAvailable && isInsideBoard) {\n      ships.push((0,_ship__WEBPACK_IMPORTED_MODULE_0__.default)(shipLength, newCoordinates));\n      return true;\n    }\n\n    return false;\n  }\n\n  function fill() {\n    while (ships.length !== 5) {\n      const x = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.generateRandomNumber)(9);\n      const y = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.generateRandomNumber)(9);\n      const direction =\n        (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.generateRandomNumber)(1) === 0 ? 'horizontal' : 'vertical';\n      const successful = add(shipSizes[0], x, y, direction);\n\n      if (successful) {\n        shipSizes.shift();\n      }\n    }\n  }\n\n  function getCoords(xAxis, yAxis) {\n    let result = null;\n\n    for (let i = 0; i < ships.length; i += 1) {\n      const shipCoords = ships[i].coordinates.filter((ShipCoordinate) =>\n        (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.isEqualCoordinate)(ShipCoordinate, { x: xAxis, y: yAxis })\n      );\n\n      if (shipCoords.length) {\n        result = ships[i];\n        break;\n      }\n    }\n\n    return result;\n  }\n\n  function indexOfShipCoordinate(coordinate, array) {\n    let index = -1;\n\n    for (let i = 0; i < array.length; i += 1) {\n      if ((0,_helpers__WEBPACK_IMPORTED_MODULE_1__.isEqualCoordinate)(array[i], coordinate)) {\n        index = i;\n        break;\n      }\n    }\n\n    return index;\n  }\n\n  function indexOfShip(ship) {\n    return ships.indexOf(ship);\n  }\n\n  function removeShip(ship) {\n    const index = indexOfShip(ship);\n    ships.splice(index, 1);\n  }\n\n  function addMissedShot(coordinate) {\n    missedShots.push(coordinate);\n  }\n\n  function receiveAttack(x, y) {\n    const ship = getCoords(x, y);\n\n    if (ship) {\n      const shipCoordinates = ship.coordinates;\n      const index = indexOfShipCoordinate({ x, y }, shipCoordinates);\n      ship.hit(index);\n      if (ship.isSunk()) removeShip(ship);\n      return;\n    }\n\n    addMissedShot({ x, y });\n  }\n\n  function getMissedShots() {\n    return missedShots;\n  }\n\n  function hasShips() {\n    return ships.length > 0;\n  }\n\n  function getShips() {\n    return ships;\n  }\n\n  function reset() {\n    shipSizes = [5, 4, 3, 3, 2];\n    ships = [];\n    missedShots = [];\n  }\n\n  return {\n    add,\n    fill,\n    getCoords,\n    receiveAttack,\n    getMissedShots,\n    hasShips,\n    getShips,\n    reset,\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameBoard);\n\n\n//# sourceURL=webpack://battleship/./src/gameBoard.js?");

/***/ }),

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"generateRandomNumber\": () => (/* binding */ generateRandomNumber),\n/* harmony export */   \"isEqualCoordinate\": () => (/* binding */ isEqualCoordinate)\n/* harmony export */ });\nfunction generateRandomNumber(max) {\n  return Math.floor(Math.random() * (max + 1));\n}\n\nfunction isEqualCoordinate(coordinate1, coordinate2) {\n  return coordinate1.x === coordinate2.x && coordinate1.y === coordinate2.y;\n}\n\n\n//# sourceURL=webpack://battleship/./src/helpers.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\n_game__WEBPACK_IMPORTED_MODULE_0__.default.start();\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Player = function Player() {\n  let turn = false;\n\n  function changeTurn() {\n    turn = turn === false;\n  }\n\n  function isTurn() {\n    return turn;\n  }\n\n  return {\n    changeTurn,\n    isTurn,\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Ship = function Ship(size, coords) {\n  const length = size;\n  const hitPositions = new Array(length).fill(false);\n  const coordinates = coords;\n\n  function hit(position) {\n    const inRange = position >= 0 && position < length;\n    if (inRange) hitPositions[position] = true;\n  }\n\n  function isSunk() {\n    return hitPositions.every((position) => position === true);\n  }\n\n  return {\n    length,\n    hitPositions,\n    coordinates,\n    hit,\n    isSunk,\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;