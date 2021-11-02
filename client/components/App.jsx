import React, {useState,  useEffect } from 'react'
import '../styles/index.css'



// ToDo
  // Score game
  // Restart game
  // Candy can be moved one square in any of the four directions providing not going past game border
  // Func that checks if move is succseful or not
  // Func that updates candy after section is cleared

const App = () => {
  const [colourArrangement, setColourArrangement] = useState([])

  const width = 8
  const candyColours = [
    'red',
    'green',
    'blue',
    'orange',
    'purple',
    'yellow',
  ] 

  // Checks cell and the two cells below it for matches
  // If grid size changes update "47" to index of cell located on the right edge 3 rows up from the bottom.
  const checkForColumnOfThree = () => {
    for (let i = 0; i < 47; i++){

      // Contains index of cell i, cell directly below i & below that again
      const columnOfThree = [i, i + width, i + width * 2]
      const decidedColour = [colourArrangement[i]]

      // Checks if all cells match the colour of the first cell
      if (columnOfThree.every(cell => colourArrangement[cell] == decidedColour)){
        columnOfThree.forEach(square => colourArrangement[square] = '')
      }
    }
  }

  // Exact same as above Func but checking column of four instead of three
  const checkForColumnOfFour = () => {
    for (let i = 0; i < 39; i++){

      // Contains index of cell i, cell directly below i & below that again
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
      const decidedColour = [colourArrangement[i]]

      // Checks if all cells match the colour of the first cell
      if (columnOfFour.every(cell => colourArrangement[cell] == decidedColour)){
        columnOfFour.forEach(cell => colourArrangement[cell] = '')
      }
    }
  }

  const checkForRowOfFour = () => {
      for (let i = 0; i < 64; i++) {
         const rowOfFour = [i, i + 1, i + 2, i + 3]
         const decidedColour = [colourArrangement[i]]
         const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]

         if (notValid.includes(i)) continue

         if (rowOfFour.every(cell => colourArrangement[cell] == decidedColour)){
            rowOfFour.forEach(cell => colourArrangement[cell] = '')
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
            rowOfThree.forEach(cell => colourArrangement[cell] = '')
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
    }, 250)
    return () => clearInterval(timer)
  }, [checkForColumnOfFour, checkForRowOfFour, colourArrangement, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow ])

  console.log(colourArrangement)

  return (
      <div className='app'> 
        <div className="game-container">
          {colourArrangement.map((colour, index) => {
            return( 
              <img 
                style={{backgroundColor: colour}}
                key={index}
                data-id={index}
                alt={colour}
                draggable={true}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
                onDragLeave={(e) => e.preventDefault()}
              />)
          })}    
        </div>
      </div> 
  )
}

export default App
