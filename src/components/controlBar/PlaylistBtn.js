import React from 'react'
import NewPlaylistForm from '../forms/NewPlaylistForm'

function PlaylistBtn() {
  const [modalIsActive, setModalIsActive] = React.useState(false)
  const [dropDownIsActive, setDropDownIsActive] = React.useState(false)

  const toggleNewPlaylistModal = () => {
    setModalIsActive(!modalIsActive)
  }

  const toggleDropDown = () => {
    setDropDownIsActive(!dropDownIsActive)
  }
  
  return (
    <>
      <div className={`dropdown ${dropDownIsActive && 'is-active'}`}>
        <div className="dropdown-trigger">
          <button
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
            <div className="box">
              <ul>
                <li>Something Here</li>
                <li>Something Here</li>
              </ul>
            </div>
          </div>
          <div className="box">
            <button
              className="button is-primary"
              onClick={toggleNewPlaylistModal}
            >
              <span className="icon">➕ </span>
              <span>New Playlist</span>
            </button>
          </div>
        </div>
      </div>
      <div className={`modal ${modalIsActive && 'is-active'}`}>
        <div
          className="modal-background"
          onClick={toggleNewPlaylistModal}
        ></div>
        <div className="modal-content">
          ${modalIsActive && <NewPlaylistForm stopPushHistory />}
        </div>
        <button
          onClick={toggleNewPlaylistModal}
          className="modal-close is-large"
          aria-label="close"
        ></button>
      </div>
    </>
  )
}

export default PlaylistBtn
