import React from 'react'


function App () {

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
      console.log(randomColourArrangement)
  }

  createBoard()



  return (
      <div className='app'> 
      </div> 
  )
}

export default App
