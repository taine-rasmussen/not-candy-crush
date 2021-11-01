import React from 'react'
import { connect } from 'react-redux'

function App (props) {

  return (
    <>
      <div className='app'>
        <h1>Welcome to our music database</h1>
      </div>
    </>
  )
}

export default connect(mapStateToProps)(App)
