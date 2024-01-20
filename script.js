// $('.search-button').on('click',function(){
//     $.ajax({
//         url: 'https://www.omdbapi.com/?apikey=f3abb3c5&s='+$('.input-keyword').val(),
//         success: apiFilms => {
//             const films = apiFilms.Search
//             let cards = ''
//             films.forEach(film=>{
//                 cards += showFilm(film)
//             })
//             $('.movies-container').html(cards)
//             $('.modal-detail-button').on('click',function(){
//                 $.ajax({
//                     url:'http://www.omdbapi.com/?apikey=f3abb3c5&i='+$(this).attr('id'),
//                     success: result=>{
//                         const movieDetail = showMovieDetail(result)
//                         $('.modal-body').html(movieDetail)
//                     },
//                     error: (e)=> {
//                         console.log(e.responseText)
//                     }
//                 })
//             })
//         },
//         error: (e)=> {
//             console.log(e.responseText)
//         }
//     })
// })

// fetch
// const searchButton = document.querySelector('.search-button')
// searchButton.addEventListener('click',function(){
//     const inputKeyword = document.querySelector('.input-keyword')
//     fetch(`https://www.omdbapi.com/?apikey=f3abb3c5&s=${inputKeyword.value}`)
//         .then(response => response.json())
//         .then(response => {
//             const movies = response.Search
//             let cards = ''
//             movies.forEach(m=> cards +=showFilm(m))
//             const movieContainer = document.querySelector('.movies-container')
//             movieContainer.innerHTML = cards
        
//         const detailButton = document.querySelectorAll('.modal-detail-button')
//         detailButton.forEach(btn=>{
//             btn.addEventListener('click',function(){
//                 const idIMDB = this.id
//                 fetch(`https://www.omdbapi.com/?apikey=f3abb3c5&i=${idIMDB}`)
//                 .then(result=> result.json())
//                 .then(result => {
//                     const movieDetail = showMovieDetail(result)
//                     const modalBody = document.querySelector('.modal-body')
//                     modalBody.innerHTML = movieDetail
//                 })
//             })
//         })
//         })
// })

const searchButton = document.querySelector('.search-button')
searchButton.addEventListener('click',async function(){
    try {const inputKeyword = document.querySelector('.input-keyword')
    const movies = await getMovies(inputKeyword.value)
    updateUI(movies)
    } catch(abc){alert(abc)}
})

function getMovies(keyword){
    return fetch(`http://www.omdbapi.com/?apikey=f3abb3c5&s=${keyword}`)
            .then(response => {
                if(!response.ok){
                    throw new Error(response.statusText)
            }
                return response.json()
        })
            .then(response => {
                if(response.Response == 'False'){
                    throw new Error(response.Error)
                }
                return response.Search

            })
}

function updateUI(movies){
    let cards = ''
    movies.forEach(m=> cards +=showFilm(m))
    const movieContainer = document.querySelector('.movies-container')
    movieContainer.innerHTML = cards
}


document.addEventListener('click',async function(e){
    if(e.target.classList.contains('modal-detail-button')){
        const idIMDB = e.target.id
        const movieDetail = await getMovieDetail(idIMDB)
        const showMovie = showMovieDetail(movieDetail)
        const modalBody = document.querySelector('.modal-body')
        modalBody.innerHTML = showMovie
    
    }
})

function getMovieDetail(id){
    return fetch(`http://www.omdbapi.com/?apikey=f3abb3c5&i=${id}`)
                .then(result=> result.json())
}

function showFilm(film){
    return  `<div class="col-md-4 my-2">
                <div class="card">
                    <img src="${film.Poster}" class="card-img-top" alt="#">
                    <div class="card-body">
                    <h5 class="card-title">${film.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${film.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#modalDisplay" id="${film.imdbID}">Show Details</a>
                    </div>
                </div>
            </div>`
}

function showMovieDetail(result){
    return  `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${result.Poster}" alt="${result.Title}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><h4>${result.Title} ${result.Year}</h4></li>
                            <li class="list-group-item"><strong>Director : </strong>${result.Director}</li>
                            <li class="list-group-item"><strong>Actor : </strong>${result.Actors}</li>
                            <li class="list-group-item"><strong>Writer : </strong>${result.Writer}</li>
                            <li class="list-group-item"><strong>Plot : </strong><br>${result.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`
}
