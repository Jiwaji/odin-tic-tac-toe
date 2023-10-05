const game = (() => {
    let activePlayer = null
    const players = []
    let moves = [[], []]
    const winConditions = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
    ]
    const addPlayers = () => {
        const player1 = playerFactory('Player 1', 'x')
        const player2 = playerFactory('Player 2', 'o')

        players.push(player1)
        players.push(player2)
    }
    const setupGame = () => {
        activePlayer = players[0]
        activeSymbol = 'x'
        moves = [[], []]
        displayController.showMessage('Turn: ' + activePlayer.name)
    }
    const updateGame = (move) => {
        const activePlayerIndex = players.findIndex((player) => player === activePlayer)
        moves[activePlayerIndex].push(move)
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
        displayController.showMessage('Turn: ' + activePlayer.name)
    }
    const status = () => {
        let gameOver = false
        winConditions.map((condition) => {
            if(condition.every((move) => moves[0].includes(String(move)))) {
                displayController.showMessage('Player 1 Wins')
                gameOver = true
            }
            if(condition.every((move) => moves[1].includes(String(move)))) {
                displayController.showMessage('Player 2 Wins')
                gameOver = true
            }
            if(document.querySelectorAll('.active').length === 9) {
                displayController.showMessage('Its a DRAW')
                gameOver = true
            }

        })
        return gameOver
    }
    return {
        addPlayers,
        setupGame,
        updateGame,
        status,
        activePlayer,
        players,
        moves
    }
})()

const gameBoard = (() => {
    const size = 3
    let activeSymbol = 'x'
    const disableBlocks = () => {
        document.querySelectorAll('.block').forEach( block => block.classList.add('disabled'))
    }
    const resetBoard = ()  => {
        game.setupGame()
        activeSymbol = 'x'
        document.querySelector('.gameboard').textContent = ''
        drawBoard()
    }
    const updateSymbol = () => {
        activeSymbol = activeSymbol === 'x' ? 'o' : 'x';
    }
    const drawBlock = () => {
        const block = document.createElement('button')
        block.classList.add('block')
        block.addEventListener('click', (e) => {
            if(!e.target.classList.contains('active')) {
                block.textContent = activeSymbol
                updateSymbol()
                e.target.classList.add('active')
                game.updateGame(e.target.getAttribute('data-index'))
                const gameOver = game.status()
                if(gameOver) {
                    disableBlocks()
                }
            }
        })
        return block
    }
    const drawBoard = () => {
        const board = document.querySelector('.gameboard')
        let index = 1
        for (let i = 0; i < size; i++) {
            for(let j = 0; j < size; j++) {
                const block = drawBlock()
                block.setAttribute('data-index', index)
                board.appendChild(block)
                index++
            }
        }
    }
    return {
        drawBoard,
        resetBoard,
    }
})()

const displayController = (() => {
    const getMessage = () => 'display controller'
    const getDisplay = () => {
        return document.querySelector('.display')
    }
    const showMessage = (message) => {
        const display = getDisplay()
        display.textContent = message
    }
    return {
        getMessage,
        showMessage,
    }
})()

const playerFactory = (name, symbol) => {
    return {
        name,
        symbol
    }
}

game.addPlayers()
game.setupGame()
gameBoard.drawBoard()

const reset = document.querySelector('.reset')
reset.addEventListener('click', () => {
    game.setupGame()
    gameBoard.resetBoard()
})

