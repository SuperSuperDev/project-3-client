import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <section className="homepage hero is-fullheight-with-navbar" style="background: ">
        <div className="hero-body">
          <Link to="/"className="container">
            <div className="title has-text-centered is-1">🎶</div>
            <h1 className="title is-1 has-text-centered has-text-white">
              Cloudify
            </h1>
            <video autoplay muted loop id="myVideo">
  <source src="http://nonovium.com/wp-content/uploads/sites/5/2021/06/Loop-62061.mp4" type="video/mp4" />
</video>

          </Link>
        </div>
      </section>
    </>
  )
}

export default Home
