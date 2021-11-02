import React from 'react'

const ScoreBoard = ({score}) => {
   return (
      <div className="scoreboard-container">
         <h1>Current Score: {score}</h1>
      </div>
   )
}

export default ScoreBoard
