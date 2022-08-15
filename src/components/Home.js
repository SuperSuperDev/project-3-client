import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <section className="homepage hero is-fullheight-with-navbar">
        <div className="hero-body">
          <Link to="/songs" className="container">
            <div className="title has-text-centered is-1">
              <div className="image is-square has-text-centered">
                <img src="/img/cloudify-logo.svg" alt="logo" />
              </div>
            </div>

            <h1 className="title is-1 has-text-centered has-text-white">
              Cloudify
            </h1>
          </Link>
        </div>
      </section>
    </>
  )
}

export default Home
