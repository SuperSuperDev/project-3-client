![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)
### General Assembly, Software Engineering Immersive 

# Cloudify 
By [Guy Kozlovskij](https://github.com/guykozlovskij), [Ali Shan](https://github.com/Aliwebs) and [Steven Saunders](https://github.com/SuperSuperStore).

## Table of Contents

## Overview
For our third Project at General Assembly's Software Engineering Immersive Course we had 10 days to build a fullstack web app in group of three. The scale of this project has been the biggest one so far in the course, and this has also been the first time we worked collaboratively using Git.

Our project was inspired by two of the internet's biggest music platforms - Spotify and Soundcloud. The goal was to build a music listening service with a social media aspect to it. Users can upload, comment, like and share songs as well as build playlist, albums, create artists and manage artist profiles. 

![](/readme-img/intro_image.png)

## Brief
- Build a full-stack application by making our own back-end and front-end
- Work in team using git to code collaboratively
- Use an Express API to serve our data from a Mongo database
- Consume the API with a front-end built with REACT
- Have a complete product with multiple relationships and CRUD functionality for at least a couple of models

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


## Approach
As we knew the scale of our project would be quite big, our initial step was to focus on a thorough whiteboarding process, creating all of our models, sketching out components and discussing in detail the complex relationships between our schemas. We used [Excalidraw](https://excalidraw.com/) to plan out our project. 

![](/readme-img/whiteboard.gif)

After understanding our steps and planning out the development, we split our workload, with Steven starting the work on the front-end and myself and Ali working on the back-end.

Once we finished the back-end in three days we joined Steven and split into working on different React components in the front-end on different Git branches. 

We would spend 1 to 2 hours a day on debugging and  would continuously assist one another where required. 

### Backend 
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

The picture below shows the possible complexity of references you could have in our application. 

![](/readme-img/references-example.png)

"User1" uploads a song titled "User1s Song" and the assigns "LeadArtist" created by "User2". The song then has to be assigned to an album, in this case created by "User4" containing a required artist "LeadArtist" and optional featuring artists. Our song has also been assigned to a playlist created by "User3". 

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


#### Middleware
While Ali worked on the secure route, I implemented a custom error handler to help with identify different types of errors the back-end might encounter when requests are being made. 

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
The result is a elegant looking music library.
![](/readme-img/song-scroll.gif)

### Frontend

