![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)
### General Assembly, Software Engineering Immersive 

# Cloudify 
By [Guy Kozlovskij](https://github.com/guykozlovskij), [Ali Shan](https://github.com/Aliwebs) and [Steven Saunders](https://github.com/SuperSuperStore).

Project backend can be found [here](https://github.com/guykozlovskij/project-3-server).

## Table of Contents
* [Overview](#overview)
* [Brief](#brief)
* [Technologies Used](#technologies)
* [Approach](#approach)
  * [Backend](#backend)
    * [Models](#models)
    * [Controllers for RESTful routes](#controllers)
    * [Middleware](#middleware)
    * [Seeding](#seeding)
  * [Frontend](#frontend)
    * [Song Index](#song-index)
    * [Comments](#comments)
* [Final Thoughts](final-thoughts)
  * [Wins](#wins)
  * [Challenges](#challenges)
  * [Lessons Learned](#lessons-learned)
  * [Potential Features](#potential-features)

<a name="overview"></a>

## Overview
For our third Project at **General Assembly's Software Engineering Immersive Course** we had 10 days to build a fullstack web app in group a of three. The scale of this project has been the biggest one so far in the course, and this has also been the first time we worked collaboratively using Git.

Our project was inspired by two of the internet's biggest music platforms - **Spotify** and **Soundcloud**. The goal was to build a music listening service with a social media aspect to it. Users can upload, comment, like and share songs as well as build playlist, albums, create artists and manage artist profiles. 

![](/readme-img/tour.gif)

<a name="brief"></a>

## Brief
- Build a full-stack application by making our own backend and frontend
- Work in a team using git to code collaboratively
- Use an Express API to serve our data from a Mongo database
- Consume the API with a frontend built with REACT
- Have a complete product with multiple relationships and CRUD functionality for at least a couple of models

<a name="technologies"></a>

## Technologies Used
- HTML5
- CSS3 and Bulma
- JavaScript (ES6)
- React.js
- Node.js
- Express 
- React Jinke Music Player
- Cloudinary
- Mongo and Mongoose
- Git and GitHub
- Google Chrome Dev Tools
- Heroku and Netlify

<a name="approach"></a>

## Approach
As we knew the scale of our project would not be small, our initial step was to focus on a thorough whiteboarding process, creating all of our models, sketching out components and discussing in detail the complex relationships between our schemas. We used [Excalidraw](https://excalidraw.com/) to plan out our project. 

![](/readme-img/whiteboard.gif)

Once we understood our steps and planned out the development, we split our workload, with Steven starting the work on the frontend and myself and Ali working on the backend.

After finishing the backend in 4 days we joined Steven and split into working on different React components in the frontend on different Git branches. 

We would spend 1 to 2 hours a day on debugging and  would continuously assist one another where required. 

<a name="backend"></a>

### Backend 

<a name="models"></a>

#### Models
We started working on our models first. Due to the nature of our app and functionality we wanted to offer we ended up having complex relationship and had to ensure the models' references have been set up correctly.

In the following example you can see our model having references to other models, some of which are required. 

```js
const albumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  leadArtist: { type: mongoose.Schema.ObjectId, ref: 'Artist' },
  artists: [{ type: mongoose.Schema.ObjectId, ref: 'Artist' }],
  cover: { type: String, default: 'https://www.pngkit.com/png/full/20-202815_vinyl-record-png-transparent-vinyl-png.png' },
  year: { type: Date },
  length: { type: Number, required: true },
  songs: [{ type: mongoose.Schema.ObjectId, ref: 'Song' }],
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [commentSchema],
  likesCount: { type: Number, default: 0 },
})
```

The example below shows the possible complexity of references you could have in our application. "User1" uploads a song titled "User1s Song" and the assigns "LeadArtist" created by "User2". The song then has to be assigned to an album, in this case created by "User4" containing a required artist "LeadArtist" and optional featuring artists. Our song has also been assigned to a playlist created by "User3". 

![](/readme-img/references-example.png)



<a name="controllers"></a>

#### Controllers for RESTful routes.
We then moved on to create our controllers and the router, using Express to make API requests, testing each controller as it was created.

We split the work evenly with Ali working on the artists, likes and playlist controllers, and myself working on the users, songs and albums controllers.  

The below example of creating a song highlights how important it was for us to understand the sequence of creating elements on our app.

```js
//* Creating/uploading a song
async function uploadSong(req, res, next) {
  const artist = await Artist.findById(req.body.singer)
  const album = await Album.findById(req.body.album)
  req.body.user = req.currentUser

  try {
    const newSong = await Song.create(req.body)
    await album.songs.push(newSong._id)
    const hasArtistInAlbum = album.artists.findIndex(savedArtist => savedArtist.equals(artist._id))

    hasArtistInAlbum === -1 ? await album.artists.push(artist._id) : null
    await album.save()

    await artist.songs.push(newSong._id)
    const hasAlbumInArtist = artist.albums.findIndex(savedAlbum => savedAlbum.equals(album._id))

    hasAlbumInArtist === -1 ? await artist.albums.push(album._id) : null
    await artist.save()

    res.status(201).json(newSong)

  } catch (e) {
    next(e)
  }
}
```

As a user is uploading a song we get a list of all of the artists with an option to create a new one. Once a song is assigned to an album it will automatically be assigned to the artist of the album so users could find the song by either of the categories. If a new artist is created we assign the artist to an existing or new album and also assign the album to the artist to form a complete relationship. 

![](/readme-img/song-create.png)

<a name="middleware"></a>

#### Middleware
While Ali worked on the secure route, I implemented a custom error handler to help with identify different types of errors the backend might encounter when requests are being made. 

```js
function errorHandler(err, req, res, next) {
  console.log('There was an error')
  console.log(err.name)
  console.log(err)

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid parameter given' })
  }

  if (err.name === 'NotFound') {
    return res.status(err.status).json({ error: { name: err.name, message: err.message } })
  }

  if (err.name === 'NotValid') {
    return res
      .status(err.status)
      .json({ message: 'There was an error, Details provided are not valid' })
  }
  
  if (err.name === 'NotAuthorized') {
    return res.status(err.status).send({ error: { name: err.name, message: err.message } })
  }

  if (err.name === 'ValidationError') {
    const errors = {}
    for (const key in err.errors) {
      errors[key] = err.errors[key].message
    }
    return res.status(422).json({
      message: 'Form Validation Error',
      errors,
    })
  }

  res.sendStatus(500)
  next(err)
}
```

<a name="seeding"></a>

#### Seeding
To make our project stand out visually we wanted to start off our music library already having some royalty free songs with some beautiful artwork. In our search we discovered [Bensound](https://www.bensound.com/) and proceed to work on building our build our database with free songs available on the website. We seeded over 50 songs by me uploading them to [Cloudinary](https://cloudinary.com/) and giving Ali the song data which he typed out one by one. 

We also used Cloudinary as designated storage for users to upload songs. 

```js
export default [
  {
    name: 'sunny',
    genre: 'acoustic',
    cover: 'https://www.bensound.com/bensound-img/betterdays.jpg',
    year: '2021',
    length: 140,
    musicSrc: 'https://res.cloudinary.com/dvpwosiqu/video/upload/v1621946232/bensound-sunny_xary2k.mp3',
    comments: [],
  },
  {
    name: 'better days',
    genre: 'cinematic',
    cover: 'https://www.bensound.com/bensound-img/sunny.jpg',
    year: '2021',
    length: 153,
    musicSrc: 'https://res.cloudinary.com/dvpwosiqu/video/upload/v1621946371/bensound-betterdays_lynk0w.mp3',
    comments: [],
  }, 
  /* ... */
]
```

The result is an elegant looking music library.

![](/readme-img/song-scroll.gif)

<a name="frontend"></a>

### Frontend
Once the backend was finished, Ali and I joined Steven to work on the frontend. At this time Steven has already written majority of the components and has successfully connected our backend to the frontend. Additionally Steven has done some styling using Bulma, making it easier for Ali and I to navigate the app, and even set up the Jinke React Music Player. While Steven continued working on the functionality for creating albums and playlist Ali worked on user registration and song uploading. 

I worked on implementing the song index page, the comment section for authenticated users and song deletion functionality for the owner of the song (see below). 

Additionally Ali and I worked on setting up the music player to accept our music library.

<a name="song-index"></a>

#### Song Index
As with most of our views, song index is split into three components. `SongIndex.js` is the main component where we call our `getAllSongs` request. 

```js
  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllSongs()
        setAllSongs(response.data)
      } catch (err) {
        console.log(err)
        history.push('./error')
      }
    }
    getData()
  }, [setAllSongs, history])
```

Our `songs` are then filtered through for users to be able to search through the library.

```js
  const filteredSongs = songs?.filter((song) => {
    return (
      song.name?.toLowerCase().includes(searchTerm)
    )
  })
```

The `filteredSongs` are then passed to the `SongList` component.

```js
    <>
      <section className="hero">
        //  ...  //
      </section>  
      <SongList songList={filteredSongs} />
    </>
```

The `SongList` maps through our filtered songs and for each of them creates a `<SongListItem>`. While the songs are being loaded we display an elegant loader implemented by Ali.

```js
  {filteredSongList ? (
    filteredSongList.map((song) => (
      <div key={song._id} className="column is-full">
        <SongListItem  {...song} />
      </div>
    )) ) : (
    <div id="loader">
      <Loader type="Puff" color="#00BFFF" height={150} width={150} timeout={3000}/>
    </div>
  )}
```

Finally, a `song-item` is created for each song by retrieving the data from the props in `<SongListItem>`.

```js
  <p>
    <strong id="song-title" className="title has-text-light">
      {props.name}
    </strong>
  </p>
  <p>
    <small className="subtitle has-text-grey">
      Artist: {props.singer.name}
    </small>
  </p>
  // ... ///
```

<a name="comments"></a>

#### Comments

`SongListItem` also calls `<SongComment>` component with CRUD functionality for comments, checking if you are the owner and an authenticated user. 

```js
{comments && comments.map(comment => (
          <div key={comment._id} className="box is-primary">
            <p>{comment.username.username}</p>
            <p>{comment.text}</p>
            {isOwner(comment.username._id) &&
              <span>
                <button type="button" value={`${comment._id}-${comment.text}`} onClick={editComment}>Edit</button>
                <button type="button" value={comment._id} onClick={handleDeleteComment}>Delete</button>
              </span>
            }
          </div>
        ))}
      </div>
      <div>
      </div>
      {isAuthenticated() &&
        <section id="add-comment">
          <div className="columns is-mobile">
            <div className="column box">
              <form className="form" onSubmit={handleAddComment}>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="input"
                      placeholder="Add a comment"
                      name="text"
                      value={formdata.text}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  {!commentEdit ?
                    <button type="submit" className="button is-link">Add Comment</button>
                    : <button type="button" onClick={handleEditComment} className="button is-warning">Edit Comment</button>
                  }
                </div>
              </form>
            </div>
          </div>
        </section>
      }
```

![](/readme-img/comment-demo.gif)

<a name="final-thoughts"></a>

## Final Thoughts 

<a name="wins"></a>

### Wins

- **Teamwork**: we did an excellent job in supporting one another, particularly in the process of debugging. We managed to implement most of the features we desired and are happy with the final product. 

- **Passing Data**: At points I struggled to understand how data is being passed between components, however with the help of my teammates and their patience I was able to overcome this hurdle.

- **The Prep**: I believe that at no point in the project we felt particularly lost and knew which direction we are head. Since we spent a lot of time on our whiteboard each one of us knew what we were doing and could always go back to it in case we needed course correction. 

<a name="challenges"></a>

### Challenges
- **Communication**: Although we split our work well, by the time Ali and I finished with the backend a lot has been done in the frontend by Steven. I believe we could have implemented an additional discussion in our stand-ups with the goal to detail what has been accomplished since the last time we spoke. This would have made the transition from the backend easier as Ali and I had trouble understanding some of the code and the relationships between components. 

- **Populating Data**: At many times we would encounter a barrier where instead of getting a correct response, certain items would return `undefined` which  was due to us not populating certain fields in the backend correctly. On many occasions this has frustrated the flow of work and could have been prevented if we were more thorough in our work. 

- **Deleting Songs**: As we ended up with many models referencing one another we encountered an issue where deleting a song would break certain parts of the app. My sloppy solution was a "shadow delete" function which hides the song permanently, however it stays in the database. This is something I would like to comeback to in the future and refactor as originally intended. 

<a name="lessons-learned"></a>

### Lessons Learned

- **Communication is KEY**. While working in a team of three I have realized how important it is to have thorough discussions of what has been accomplished by different members. This not only makes transitioning from frontend and backend easier but also helps when you have to work with someone elses code.

- I learned a lot about building the backend and found it very satisfying seeing it all come together in the frontend. Although working with Express was a challenge I now better understand how elements function together.

- As this was our first time using Git I have learned how to work in different branches and resolve conflicts with the rest of the team.

<a name="potential-features"></a>

### Potential Features

- **User Dashboard**: Although it was not a part of our MVP we started working on a Dashboard which would have been our homepage displaying logged in user's playlist, liked songs and songs user has uploaded. This is something we would like to comeback to in the future to finish as it would really complete the product.