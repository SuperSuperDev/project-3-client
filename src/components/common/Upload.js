import useForm from '../../hooks/useForm.js'
import React from 'react'
import ImageUpload from './ImageUpload.js'
import AudioUpload from './AudioUpload.js'

function Upload() {
  const { formdata, handleChange } = useForm({
    cover: '',
  })


  const handleUpload = (files) => {
    handleChange({ target: { name: 'cover', value: files } })
  }

  const handleSubmit = event => {
    event.preventDefault()

    window.alert(`Submitting ${JSON.stringify(formdata, null, 2)}`)
  }


 
  return (
    <main className="section">
      <div className="columns is-mobile">
        <div className="column is-6-tablet is-offset-3-tablet is-8-mobile is-offset-2-mobile box">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <ImageUpload
                onUpload={handleUpload}
                
              />
            </div>
            <div className="field">
              <AudioUpload
                onUpload={handleUpload}
                
              />
            </div>
            <div className="field">
              <button className="button is-fullwidth is-dark" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}



export default Upload