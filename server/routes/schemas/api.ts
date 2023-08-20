/**
 * Join game request payload
 * @typedef {object} JoinGameRequest
 * @property {string} gameKey.required - game key
 * @property {string} username.required - unername
 * @property {string} gameName.required - gamename
 */

/**
 * Board payload
 * @typedef {object} BoardItem
 * @property {number} id.required - board id
 * @property {string} image.required - image url
 * @property {string} selected.required - board item is selected
 */

/**
 * Join game response
 * @typedef {object} GameResponse
 * @property {string} gameKey.required - game key
 * @property {boolean} ready.required - is user ready to play
 * @property {string} host.required - is the host of the game
 * @property {BoardItem[]} board.required - is the host of the game
 */

/**
 * AI limits
 * @typedef {object} AccessGameResponse
 * @property {string} accessKey.required - access game response
 */
