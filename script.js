const game = (() => {
    let activePlayer = null
    let players = []
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
    const addPlayers = (player1, player2) => {
        players.push(player1)
        players.push(player2)
    }
    const setupGame = () => {
        activePlayer = players[0]
        moves = [[], []]
        displayController.showMessage('Turn: ' + activePlayer.name)
    }
    const updateGame = (move) => {
        const activePlayerIndex = players.findIndex((player) => player === activePlayer)
        moves[activePlayerIndex].push(move)
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
        displayController.showMessage('Turn: ' + activePlayer.name)
    }
    const switchPlayers = () => {
        const [player1, player2] = players
        players = [player2, player1]
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
        switchPlayers,
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
        game.switchPlayers()
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
    const drawInputs = () => {
        const reset = document.createElement('button')
        reset.textContent = 'Reset'
        reset.addEventListener('click', () => {
            game.setupGame()
            gameBoard.resetBoard()
        })
        const container = document.querySelector('.game-container')
        container.appendChild(reset)
    }
    return {
        drawBoard,
        drawInputs,
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

const start = document.querySelector('.start')
start.addEventListener('click', () => {
    const p1Name = document.querySelector('.p1').value
    const p2Name = document.querySelector('.p2').value
    const player1 = playerFactory(p1Name)
    const player2 = playerFactory(p2Name)
    game.addPlayers(player1, player2)
    game.setupGame()
    gameBoard.drawBoard()
    gameBoard.drawInputs()
})

