const global = {
    currentPage: window.location.pathname,
  };


//function for fetching popular tv shows

async function displayPopularTv(){

 const { results } =  await fetchAPIData('tv/popular');

 results.forEach((show)=>{
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <a href="tv-details.html?id=${show.id}">
      ${
        show.poster_path ? `<img
        src="https://image.tmdb.org/t/p/w500${show.poster_path}"
        class="card-img-top"
        alt="${show.title}"
      />` : `<img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="Show title"
    />`
      }
    </a>
    <div class="card-body">
      <h5 class="card-title">${show.name}</h5>
      <p class="card-text">
        <small class="text-muted">${show.first_air_date}</small>
      </p>
    </div>
  
  `

  document.querySelector('#popular-shows').appendChild(div);
 })



}

//function for fetching popular movies

async function displayPopularMovie() {

  const { results } = await fetchAPIData('movie/popular');

  results.forEach((movie)=>{

    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML= ` 
     <a href="movie-details.html?id=${movie.id}">
     ${
     movie.poster_path ? ` <img
    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
    class="card-img-top"
    alt="Movie Title"
  />` :  `<img src="images/no-image.jpg" class="card-img-top" alt="${movie.title}"/>`
   }
  </a>
  <div class="card-body">
    <h5 class="card-title">${movie.title}</h5>
    <p class="card-text">
      <small class="text-muted">Release: ${movie.release_date}</small>
    </p>
  </div>
`;
document.querySelector('#popular-movies').appendChild(div);
  })
  

}

// spinner function

function showSpinner(){
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}
  
// fetching data from the movie api

async function fetchAPIData(endpoint){
    const API_KEY = 'e67f2cb9083be9a72a19dc7c2908e640';
    const API_URL = 'https://api.themoviedb.org/3';

    showSpinner();

    const res = await fetch(`${API_URL}/${endpoint}?api_key=${API_KEY}&language=en-US`);

    const data = await res.json();

    hideSpinner();

    return data;
}

//function for highlighting active link

function highlightActiveLink() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
      if (link.getAttribute('href') === global.currentPage) {
        link.classList.add('active');
      }
    });
  }

//show details

// Display Show Details
async function displayShowDetails() {
    const showId = window.location.search.split('=')[1];
  
    const show = await fetchAPIData(`tv/${showId}`);
  
    // Overlay for background image
    displayBackgroundImage('tv', show.backdrop_path);
  
    const div = document.createElement('div');
  
    div.innerHTML = `
    <div class="details-top">
    <div>
    ${
      show.poster_path
        ? `<img
      src="https://image.tmdb.org/t/p/w500${show.poster_path}"
      class="card-img-top"
      alt="${show.name}"
    />`
        : `<img
    src="../images/no-image.jpg"
    class="card-img-top"
    alt="${show.name}"
  />`
    }
    </div>
    <div>
      <h2>${show.name}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${show.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
      <p>
        ${show.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${
        show.homepage
      }" target="_blank" class="btn">Visit show Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
      <li><span class="text-secondary">Number of Episodes:</span> ${
        show.number_of_episodes
      }</li>
      <li><span class="text-secondary">Last Episode To Air:</span> ${
        show.last_episode_to_air.name
      }</li>
      <li><span class="text-secondary">Status:</span> ${show.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
      ${show.production_companies
        .map((company) => `<span>${company.name}</span>`)
        .join(', ')}
    </div>
  </div>
    `;
  
    document.querySelector('#show-details').appendChild(div);
  }

// movie details 

async function showMovieDetails(){

const movieId = window.location.search.split('=')[1];

const movie = await fetchAPIData(`movie/${movieId}`);

displayBackgroundImage('movie', movie.backdrop_path);

const div = document.createElement('div');

div.innerHTML = `<div class="details-top">
<div>
${
    movie.poster_path ? ` <img
   src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
   class="card-img-top"
   alt="Movie Title"
 />` :  `<img src="images/no-image.jpg" class="card-img-top" alt="${movie.title}"/>`
  }
</div>
<div>
  <h2>${movie.title}</h2>
  <p>
    <i class="fas fa-star text-primary"></i>
    ${movie.vote_average.toFixed(1)} / 10
  </p>
  <p class="text-muted">${movie.release_date}</p>
  <p>
    ${movie.overview}
  </p>
  <h5>Genres</h5>
  <ul class="list-group">
    ${movie.genres.map((genre)=>`<li>${genre.name}</li>`).join('')}
  </ul>
  <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
</div>
</div>
<div class="details-bottom">
<h2>Movie Info</h2>
<ul>
  <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
  <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
  <li><span class="text-secondary">Runtime:</span> ${movie.runtime}</li>
  <li><span class="text-secondary">Status:</span> ${movie.status}</li>
</ul>
<h4>Production Companies</h4>
<div class="list-group">${movie.production_companies.map((company)=> `<span>${company.name}</span>`).join(', ')}</div>
</div>`

document.querySelector('#movie-details').appendChild(div);
}

async function displaySliderMovie(){

 const { results } = await fetchAPIData('movie/now_playing');

 results.forEach((movie)=>{
    const div = document.createElement('div');

    div.classList.add('swiper-slide');

    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
    ${
        movie.poster_path ? ` <img
       src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
       class="card-img-top"
       alt="Movie Title"
     />` :  `<img src="images/no-image.jpg" class="card-img-top" alt="${movie.title}"/>`
      }
    </a>
    <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
    </h4>
  `;

  document.querySelector('.swiper-wrapper').appendChild(div);

  initSwiper();

 })

}

function initSwiper(){
    const swiper = new Swiper('.swiper',{
        slidesPerview: 1,
        spaceBetween: 30,
        freeMode : true,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        breakpoints: {
            500: {
                slidesPerview :2
            },
            700: {
                slidesPerview :3
            },
            1200: {
                slidesPerview :4
            },
        }
    });
}

function displayBackgroundImage(type, path){

 const overlay = document.createElement('div');

 overlay.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${path})`;


  overlay.style.backgroundSize = 'cover';
  overlay.style.backgroundPosition = 'center';
  overlay.style.backgroundRepeat = 'no-repeat';
  overlay.style.height = '100vh';
  overlay.style.width = '100vw';
  overlay.style.position = 'absolute';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.zIndex = '-1';
  overlay.style.opacity = '0.1';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlay);
  } else {
    document.querySelector('#show-details').appendChild(overlay);
  }

}

function addCommasToNumber(number){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
}
  
  // Init App
  function init() {
    switch (global.currentPage) {
      case '/':
      case '/index.html':
        displayPopularMovie();
        displaySliderMovie();
        break;
      case '/shows.html':
        displayPopularTv();
        break;
      case '/movie-details.html':
        showMovieDetails();
        break;
      case '/tv-details.html':
        displayShowDetails();
        break;
      case '/search.html':
        console.log('Search');
        break;
    }
  
    highlightActiveLink();
   
    
  }
  
  document.addEventListener('DOMContentLoaded', init);
  
 
