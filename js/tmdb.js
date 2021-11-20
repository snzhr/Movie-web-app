const apiKey = '<< your-api-key >>'
const query = 'now_playing'

async function getMovies(url=`https://api.themoviedb.org/3/movie/${query}?api_key=${apiKey}&language=ru-RU&page=1`){
  const response = await fetch(url)
  const data = await response.json();
  const movies = data.results;
  return movies;

}


async function getGenres(){
  const gUrl = ` https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=ru-RU&sort_by=original_title.asc`
  const response = await fetch(gUrl);
  const dataJson = await response.json();
  return dataJson;
}

async function getSpecificGenre(genreId){
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=ru-RU&page=1&with_genres=${genreId}`
    const response = await fetch(url);
    const genreJson = await response.json();
    // console.log(genreJson.results);
    return genreJson.results;
  }


  async function searchMovie(query){
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=ru-RU&query=${query}&page=1`)
    const dataJson = await res.json();
    return dataJson.results;
  }

  async function getSingleMovie(movieId){
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=ru-RU`)
    const dataJson = await response.json();
    return dataJson;
  }




export { getMovies, getGenres, getSpecificGenre, searchMovie, getSingleMovie } 




