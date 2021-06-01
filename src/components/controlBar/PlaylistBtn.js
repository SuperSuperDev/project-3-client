import React from 'react'
import PlaylistBtnDropdown from './PlaylistBtnDropdown'

function PlaylistBtn(props) {
  const [dropDownIsActive, setDropDownIsActive] = React.useState(false)
  const toggleDropDown = () => {
    setDropDownIsActive(!dropDownIsActive)
  }

  return (
    <>
      <div className={`dropdown is-right ${dropDownIsActive && 'is-active'}`}>
        <div className="dropdown-trigger">
          <button
            id="add-button"
            onClick={toggleDropDown}
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            ➕
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {dropDownIsActive && <PlaylistBtnDropdown {...props} />}
          </div>
        </div>
      </div>
    </>
  )
}

export default PlaylistBtn
