import React, { useState, useEffect } from 'react'
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
        columnOfThree.forEach(square => colourArrangement[square] = ' ')
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
        columnOfFour.forEach(square => colourArrangement[square] = ' ')
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
      checkForColumnOfThree()
      setColourArrangement([...colourArrangement])
    }, 100)
    return () => clearInterval(timer)
  }, [checkForColumnOfFour, colourArrangement, checkForColumnOfThree ])

  console.log(colourArrangement)

  return (
      <div className='app'> 
        <div className="game-container">
          {colourArrangement.map((colour, index) => {
            return( 
              <img 
                style={{backgroundColor: colour}}
                key={index}
                alt={colour}
              />)
          })}    
        </div>
      </div> 
  )
}

export default App
