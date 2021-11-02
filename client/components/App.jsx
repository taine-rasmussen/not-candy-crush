import React, {useState,  useEffect } from 'react'
import '../styles/index.css'
import ScoreBoard from './ScoreBoard'

const App = () => {
   
  const [colourArrangement, setColourArrangement] = useState([])
  const [cellBeingDragged, setCellBeingDragged] = useState(null)
  const [cellBeingReplaced, setCellBeingReplaced] = useState(null)
  const [scoreDisplay, setScoreDisplay] = useState(0)


  const width = 8
  const candyColours = [
    'blue',
    'green',
    'red',
    'purple',
    'orange',
    'yellow'
  ] 
  const checkForRowOfFour = () => {
      for (let i = 0; i < 64; i++) {
         const rowOfFour = [i, i + 1, i + 2, i + 3]
         const decidedColour = [colourArrangement[i]]
         const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]

         if (notValid.includes(i)) continue

         if (rowOfFour.every(cell => colourArrangement[cell] == decidedColour)){
            setScoreDisplay(scoreDisplay + 4)
            rowOfFour.forEach(cell => colourArrangement[cell] = '')
            return true
         }
      }
   }

  // Exact same as above Func but checking column of four instead of three
  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++){

      // Contains index of cell i, cell directly below i & below that again
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
      const decidedColour = [colourArrangement[i]]

      // Checks if all cells match the colour of the first cell
      if (columnOfFour.every(cell => colourArrangement[cell] == decidedColour)){
        setScoreDisplay(scoreDisplay + 4)
        columnOfFour.forEach(cell => colourArrangement[cell] = '')
        return true
      }
    }
  }

  // Checks cell and the two cells below it for matches
  // If grid size changes update "47" to index of cell located on the right edge 3 rows up from the bottom.
  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++){

      // Contains index of cell i, cell directly below i & below that again
      const columnOfThree = [i, i + width, i + width * 2]
      const decidedColour = [colourArrangement[i]]

      // Checks if all cells match the colour of the first cell
      if (columnOfThree.every(cell => colourArrangement[cell] == decidedColour)){
        setScoreDisplay(scoreDisplay + 3)
        columnOfThree.forEach(square => colourArrangement[square] = '')
        return true
      }
    }
  }

   const checkForRowOfThree = () => {
      for (let i = 0; i < 64; i++) {
         const rowOfThree = [i, i + 1, i + 2]
         const decidedColour = [colourArrangement[i]]
         const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]

         if (notValid.includes(i)) continue

         if (rowOfThree.every(cell => colourArrangement[cell] == decidedColour)){
            setScoreDisplay(scoreDisplay + 3)
            rowOfThree.forEach(cell => colourArrangement[cell] = '')
            return true
         }
      }
   }

  // Checks if cell below is blank, if true moves coloured cell down board and blank up
  const moveIntoSquareBelow = () => {
    for (let i = 0; i < 64 - width; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)

      // Handles cells at top of board with nothing to replace - generates new random colour
      if (isFirstRow && colourArrangement[i] === '') {
        let randomNumber = Math.floor(Math.random() * candyColours.length)
        colourArrangement[i] = candyColours[randomNumber]
      }

      if (colourArrangement[i + width] === ''){
        colourArrangement[i + width] = colourArrangement[i]
        colourArrangement[i] = ''
      }
    }
  }

  // Updates state with value of cell clicked on to be dragged
  const dragStart = (e) => {
    setCellBeingDragged(e.target)
  }

  // Updates state with value of cell being dragged over to be replaced
  const dragDrop = (e) => {
    setCellBeingReplaced(e.target)
  }

  // Swaps bg colour value of cell being dragged with cell being replaced
  // Checks if move being made is valid
  const dragEnd = () => {
    const cellBeingDraggedId = parseInt(cellBeingDragged.getAttribute('data-id'))
    const cellBeingReplacedId = parseInt(cellBeingReplaced.getAttribute('data-id'))

    colourArrangement[cellBeingDraggedId] = cellBeingReplaced.style.backgroundColor
    colourArrangement[cellBeingReplacedId] = cellBeingDragged.style.backgroundColor

    const validMoves = [
            cellBeingDraggedId - 1,
            cellBeingDraggedId - width,
            cellBeingDraggedId + 1,
            cellBeingDraggedId + width
          ]
    const validMove = validMoves.includes(cellBeingReplacedId)

    const isAColumnOfFour = checkForColumnOfFour()
    const isARowOfFour = checkForRowOfFour()
    const isAColumnOfThree = checkForColumnOfThree()
    const isARowOfThree = checkForRowOfThree()

    if (cellBeingReplacedId && validMove && (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)) {
      setCellBeingDragged(null)
      setCellBeingReplaced(null)
    } else {
      colourArrangement[cellBeingReplacedId] = cellBeingReplaced.style.backgroundColor  
      colourArrangement[cellBeingDraggedId] = cellBeingDragged.style.backgroundColor
      setColourArrangement([...colourArrangement])
    }
  }

  // Fills array with random arrangement of colours from candyColours to size of game board.
  const createBoard = () => {
    const randomColourArrangement = []
      for (let i = 0; i < width * width; i++){
        const randomColour = candyColours[Math.floor(Math.random() * candyColours.length)]
        randomColourArrangement.push(randomColour)
      }
      setColourArrangement(randomColourArrangement)
  }

  // Prevents infinte loop 
  useEffect(() => {
    createBoard()
  },[])

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour()
      checkForRowOfFour()
      checkForColumnOfThree()
      checkForRowOfThree()
      moveIntoSquareBelow()
      setColourArrangement([...colourArrangement])
    }, 100)
    return () => clearInterval(timer)
  }, [checkForColumnOfFour, checkForRowOfFour, colourArrangement, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow ])

  return (
      <div className='app'> 
      <ScoreBoard score={scoreDisplay} />
        <div className="game-container">
          {colourArrangement.map((colour, index) => {
            return( 
              <div 
                style={{backgroundColor: colour}}
                key={index}
                data-id={index}
                draggable={true}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
                onDragLeave={(e) => e.preventDefault()}
                onDragStart={dragStart}
                onDrop={dragDrop}
                onDragEnd={dragEnd}
              ></div>)
          })}    
        </div>
      </div> 
  )
}

export default App


