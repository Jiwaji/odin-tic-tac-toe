let activePlayer = null
let activeSymbol = 'x'
const players = []
const moves = [[], []]

const gameBoard = (() => {
    const getMessage = () => 'hello'
    const size = 3
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
                displayController.showMessage()
                gameBoard.checkWin()
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
        winConditions.map((condition) => {
            if(condition.every((move) => moves[0].includes(String(move)))) {
                console.log('player 1 win')
            }
            if(condition.every((move) => moves[1].includes(String(move)))) {
                console.log('player 2 win')
            }
            console.log('out')
        })
    }
    return {
        getMessage,
        drawBoard,
        checkWin
    }
})()

const displayController = (() => {
    const getMessage = () => 'display controller'
    const getDisplay = () => {
        return document.querySelector('.display')
    }
    const showMessage = () => {
        const display = getDisplay()
        display.textContent = 'Turn: ' + activePlayer.name
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

const player1 = playerFactory('Player 1')

const player2 = playerFactory('Player 2')

players.push(player1)
players.push(player2)

activePlayer = player1

displayController.showMessage()
console.log(gameBoard.drawBoard())
console.log(displayController.getMessage())
console.log(player1.name)

