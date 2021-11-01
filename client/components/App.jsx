import React, { useState, useEffect } from 'react'
import '../styles/index.css'



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

  console.log(colourArrangement)

  return (
      <div className='app'> 
        <div className="game-container">
          {colourArrangement.map((colour, index) => {
            return( 
              <img 
                style={{backgroundColor: colour}}
                key={index}
              />)
          })}    
        </div>
      </div> 
  )
}

export default App
