const gameBoard = (() => {
    const size = 3
    let activePlayer = null
    let activeSymbol = 'x'
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
        const player1 = playerFactory('Player 1')
        const player2 = playerFactory('Player 2')

        players.push(player1)
        players.push(player2)
    }
    const setupGame = () => {
        activePlayer = players[0]
        activeSymbol = 'x'
        moves = [[], []]
        displayController.showMessage('Turn: ' + activePlayer.name)
    }
    const disableBlocks = () => {
        document.querySelectorAll('.block').forEach( block => block.classList.add('disabled'))
    }
    const resetBoard = ()  => {
        setupGame()
        document.querySelector('.gameboard').textContent = ''
        drawBoard()
    }
    const drawBlock = () => {
        const block = document.createElement('button')
        block.classList.add('block')
        block.addEventListener('click', (e) => {
            if(!e.target.classList.contains('active')) {
                block.textContent = activeSymbol
                updateSymbol()
                const activePlayerIndex = players.findIndex((player) => player === activePlayer)
                moves[activePlayerIndex].push(e.target.getAttribute('data-index')) 
                activePlayer = activePlayer === players[0] ? players[1] : players[0]
                e.target.classList.add('active')
                displayController.showMessage('Turn: ' + activePlayer.name)
                const gameOver = gameBoard.checkWin()
                if(gameOver) {
                    disableBlocks()
                }
            }
        })
        return block
    }
    const updateSymbol = () => {
        activeSymbol = activeSymbol === 'x' ? 'o' : 'x';
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
    const checkWin = () => {
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
        })
        return gameOver
    }
    return {
        addPlayers,
        setupGame,
        drawBoard,
        checkWin,
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

const playerFactory = (name) => {
    return {
        name
    }
}

gameBoard.addPlayers()
gameBoard.setupGame()
gameBoard.drawBoard()

const reset = document.querySelector('.reset')
reset.addEventListener('click', (e) => {
    gameBoard.setupGame()
    gameBoard.resetBoard()
})

