// const url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2021&month=OCTOBER'
// const url2 = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/4380837'
// async function getMovie(){
//     let response = await 
//     fetch(url, {
//         method: 'GET',
//         headers: {
//             'X-API-KEY': '{your-api-key}',
//             'Content-Type': 'application/json',
//         }
//     })
//     const movieJson = await response.json(); 
//     console.log(movieJson);
//     return movieJson;
// }
 
//  getMovie()
// .then(data=>{
//     const moviePoster = document.querySelector('.movie-poster')
//     const movieTitle = document.querySelector('.card-title')
//     const movieDesc = document.querySelector('.movie-desc')
//     const pubYear = document.getElementById('year')
//     if (data.posterUrl) {
//         moviePoster.src = data.posterUrl;        
//     }
//     movieTitle.innerText = data.nameRu;
//     // movieDesc.innerText = data.description;
//     pubYear.innerText = 'Год: '+data.year; 
// })
