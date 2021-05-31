import React from 'react'

function ControlBar({ children }) {
  return (
    <div className="field is-grouped has-addons">
      <div className="buttons">
        {children}
      </div>
    </div>
  )
}

export default ControlBar





  