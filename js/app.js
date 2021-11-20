import { getMovies, getGenres, getSpecificGenre, searchMovie, getSingleMovie } from "./tmdb.js";

// ==================================== Create movies ==============================================\\

function createCard(imgSrc, title, vote, year, movieid){
  if (imgSrc) {
      imgSrc = 'https://image.tmdb.org/t/p/w500/'+imgSrc;
  }else{
      imgSrc = 'https://d32qys9a6wm9no.cloudfront.net/images/movies/poster/500x735.png';
  }

  function rank(){
    if (vote >= 6.0) {
      return 'bg-success';
    }
    else if(vote >=5 && vote < 6.0){
        return 'bg-warning'
    }
    else{
      return 'bg-danger';
    }
  }
  
  
  const movieCard = 
  `<div class="card m-1 card-cw">
  <img src="${imgSrc}" class="card-img-top movie-poster" alt="movie-image">
  <span class="badge position-absolute ${rank()}">${vote}</span>
  <div class="card-body">
    <h5 class="card-title movie-name" data-id="${movieid}">${title}</h5>
    <!-- <p class="card-text movie-desc">${vote}</p> --> 
  </div>
  <ul class="list-group list-group-flush">
      <li class="list-group-item" id="year">Дата релиза: ${year}</li>
    </ul>
  </div>
  `;
  
  return movieCard;
  }

async function allMovies(){
  return await getMovies().then(movies=>{
    for (const movie of movies) {
      document.getElementById('movies')
      .insertAdjacentHTML('afterbegin',createCard(movie.poster_path, movie.title, movie.vote_average, movie.release_date,movie.id))
    }
  }).then(()=>{
    let movieTitleBtns = document.getElementsByClassName('movie-name');
    // console.log(movieTitleBtns);
    for (const btn of movieTitleBtns) {
      btn.addEventListener('click', function(e) {
          // console.log(e.currentTarget.dataset.id);
          getMovie(e.currentTarget.dataset.id)
      })
    }
  })
}

allMovies()



// ====================================== Create genre ===============================================\\
function createGenre(genreName, genreId){
    const genre = 
    ` <li class="nav-item d-flex justify-content-between align-items-center">
    <a href="#" class="nav-link single-genre" data-index="${genreId}">
      ${genreName}
    </a>
    <button type="button" class="btn-close" aria-label="Close"></button>
  </li>
  `
  return genre;
}

getGenres().then(data=>{
  const genres = [...data.genres]
  for (const genre of genres) {
    document.getElementById('genres').insertAdjacentHTML('afterbegin', createGenre(genre.name, genre.id))
  }
}).then(()=>{
  const navLinks = document.getElementsByClassName('single-genre');
  let current = [];
  for (const navLink of navLinks) {
      navLink.addEventListener('click', function(e){
        document.getElementById('movies').innerHTML = '';
        getSpecificGenre(this.dataset.index).then(movies=>{
          for (const movie of movies) {
            document.getElementById('movies')
            .insertAdjacentHTML('afterbegin',createCard(movie.poster_path, movie.title, movie.vote_average, movie.release_date,movie.id))
          }
        }).then(()=>{
          let movieTitleBtns = document.getElementsByClassName('movie-name');
          // console.log(movieTitleBtns);
          for (const btn of movieTitleBtns) {
            btn.addEventListener('click', function(e) {
                // console.log(e.currentTarget.dataset.id);
                getMovie(e.currentTarget.dataset.id)
            })
          }
        });
        

        // Adding active class to clicked link
        let parent = e.currentTarget.parentNode;
        if (current.length === 0) {
          current.push(parent)
          parent.classList.add('active-link')
          parent.lastElementChild.style.display='block';           
        }
        else{
          current[0].classList.remove('active-link')
          current[0].lastElementChild.style.display='none';           
          current.pop();
          current.push(parent) 
          parent.classList.add('active-link')         
          parent.lastElementChild.style.display='block';           
        }


        // Adding click event listener to close button
        parent.lastElementChild.addEventListener('click', function(e){
          e.currentTarget.parentNode.classList.remove('active-link')
          document.getElementById('movies').innerHTML = '';
          allMovies();
          e.currentTarget.style.display = 'none';
        })


      }) // button click listener
  }
  
})


// ============================================================================================= \\

// Search movies

document.getElementById('searchForm').addEventListener('submit',function(e){
  let searchField = document.getElementById('searchField').value;
    if (searchField != '') {
      searchMovie(searchField).then(movies=>{
        document.getElementById('movies').innerHTML = '';
        for (const movie of movies) {
          document.getElementById('movies')
          .insertAdjacentHTML('afterbegin',createCard(movie.poster_path, movie.title, movie.vote_average, movie.release_date, movie.id))
        }
        searchField = '';
      }).then(()=>{
        let movieTitleBtns = document.getElementsByClassName('movie-name');
        // console.log(movieTitleBtns);
        for (const btn of movieTitleBtns) {
          btn.addEventListener('click', function(e) {
              // console.log(e.currentTarget.dataset.id);
              getMovie(e.currentTarget.dataset.id)
          })
        }
      })
    }else{
      document.getElementById('movies').innerHTML = '';
      allMovies();
    }
    e.preventDefault();
  })
  

// ============================================================================================ \\

//  Get single movie

async function getMovie(mId){
return getSingleMovie(mId).then(movie=>{
   document.getElementById('movies').innerHTML = '';
   document.getElementById('movies')
   .insertAdjacentHTML('afterbegin',
   `
<div class="card mb-3" >
  <div class="row g-0">
    <div class="col-md-4">
      <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="img-fluid rounded-start" alt="${movie.title}">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">${movie.overview}</p>
        <p class="card-text"><small class="text-muted">${movie.release_date}</small></p>
      </div>
    </div>
  </div>
</div>
`)
})
}
