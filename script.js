const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6258b79524c3f609c364612b1795e657&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=6258b79524c3f609c364612b1795e657&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

/// switch Dark-Bright
const toggle = document.querySelector('.toggle')

toggle.addEventListener('click', (e) => {
  const body = document.querySelector('body')
  if (body.classList.contains('dark')) {
    body.classList.remove('dark')
    e.target.innerHTML = 'Dark mode'
  } else {
    body.classList.add('dark')
    e.target.innerHTML = 'Light mode'
  }
})
///

getMovies(API_URL)

async function getMovies(url) {
  const response = await fetch(url)
  const data = await response.json()

  showMovies(data.results)
  console.log(data.results)
}

function showMovies(movies) {
  main.innerHTML = '' // clear all

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview, release_date, adult } = movie // destructure

    const movieEl = document.createElement('div')
    movieEl.classList.add('movie')

    movieEl.innerHTML = `

    <img src="${IMG_PATH + poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        <h6>Release Date: ${release_date}</h6>
       <p>${overview}</p>
      </div>
    `
    main.appendChild(movieEl)
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return 'orange'
  } else {
    return 'red'
  }
}


form.addEventListener('submit', (e) => {
  e.preventDefault()

  const searchTerm = search.value

  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm)

    search.value = ''
  } else {
    window.location.reload()
  }
})
