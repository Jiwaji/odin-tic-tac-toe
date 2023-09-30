const activePlayer = null

const gameBoard = (() => {
    const getMessage = () => 'hello'
    const size = 3
    const drawBlock = () => {
        const block = document.createElement('button')
        block.classList.add('block')
        block.addEventListener('click', () => {
            block.textContent = 'x'
        })
        return block
    }
    const drawBoard = () => {
        const board = document.querySelector('.gameboard')
        for (let i = 0; i < size; i++) {
            for(let j = 0; j < size; j++) {
                const block = drawBlock()
                board.appendChild(block)
            }
        }
    }
    return {
        getMessage,
        drawBoard
    }
})()

const displayController = (() => {
    const getMessage = () => 'display controller'
    return {
        getMessage
    }
})()

const playerFactory = (name) => {
    const symbol = 'x'
    const isMyTurn = false
    return {
        name,
        isMyTurn
    }
}

const player1 = playerFactory('Player 1')
player1.isMyTurn = true

console.log(gameBoard.drawBoard())
console.log(displayController.getMessage())
console.log(player1.name)

