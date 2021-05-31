import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <section className="homepage hero is-fullheight-with-navbar">
        <div className="hero-body">
          <Link to="/"className="container">
            <div className="title has-text-centered is-1">🎶</div>
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
