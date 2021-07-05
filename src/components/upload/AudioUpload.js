import React from 'react'
const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET_AUDIO

function AudioUpload({ onUpload }) {
  const [audio, setAudio] = React.useState('')
  function handleUpload() {
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: uploadUrl,
          uploadPreset,
          sources: ['local'],
          multiple: false,
        },
        (err, result) => {
          if (err) console.log(err)
          if (result.event === 'success') {
            setAudio(result.info.url)
            onUpload(result.info.url)
          }
        }
      )
      .open()
  }

  return (
    <>
      {audio && <audio controls="true" src={audio} alt="uploaded profile" />}
      <button onClick={handleUpload} type="button" className="button is-fullwidth is-primary">{!audio ? 'Select Song' : 'Select another song'}</button>
    </>
  )
}

export default AudioUpload
