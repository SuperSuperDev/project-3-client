import React from 'react'

function ControlBar({ children }) {
  return (
    <div className="field">
      <div className="buttons">
        {children}
      </div>
    </div>
  )
}

export default ControlBar





  