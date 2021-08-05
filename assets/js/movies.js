const  movies = document.getElementById('main');
let getMovies;
let getCityLocal = localStorage.getItem('city').toLowerCase(); 
let getCity = document.getElementById('getCity');
let getLanguage = document.getElementById('getLanguage');
let getGenre = document.getElementById('getGenre');
let cityLogo = document.getElementById('cityLogo');
let city = localStorage.getItem('city')

 // Fetch request

 const fetchMovies = async () => {
  let res = await fetch('../../movies.json')
  let data = await res.json();
  getMovies = data.movies.filter((elem) => elem.city.includes(getCityLocal)); 
  showMovies(getMovies)
}
// on movie select
  function selectMovie(id){
  localStorage.setItem('movie', id);
  window.location.href = '/bookPage.html'
  }


//Movies display

const showMovies = async (getMovies)=> {
    main.innerHTML = '';
    if(getMovies.length == 0) {
    const movieEl = document.createElement('div');
    movieEl.classList.add('notfound');
    movieEl.innerHTML = `
    <i class="fas fa-exclamation-triangle"></i>
    <p> No Movies found, please search for other genre </p>
    `
    main.appendChild(movieEl);
    }
    await getMovies.forEach(movie => {
    const { Poster,Title,imdbID} = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
    <img src="${Poster}" class="card-img-top" alt="${Title}" />
    <div class="card-body">
      <h5 class="card-title">${Title}</h5>
        <button href="#" class="btn btn-danger bookNow" onclick = "selectMovie('${imdbID}')" >Book Now</button>
    </div>
    `
    main.appendChild(movieEl);
  });
}



//Filter by Language and Genre


getLanguage.addEventListener('change', async (e) => {
e.preventDefault();
let lang = getLanguage.value;
let res = await fetch('../../movies.json')
let data = await res.json();
getMovies = data.movies.filter((elem) => elem.language === lang); 
showMovies(getMovies)
})

getGenre.addEventListener('change', async (e) => {
let genre = getGenre.value;
let lang = getLanguage.value;
if(!lang) alert('Please select a language')
let res = await fetch('../../movies.json')
let data = await res.json();
getMovies = data.movies.filter((elem) => elem.genre === genre && elem.language === lang); 
showMovies(getMovies)
})

//Clearing LocalStorage values;

const clearLocalStorage = () =>{
localStorage.removeItem('ticketNumbers');
localStorage.removeItem('selectedSeats');

}

// City picture and name

const headerpicture = () => {
  getCity.innerText = city.charAt(0).toUpperCase() + city.slice(1);
  cityLogo.src = `../../assets/images/${city}.png`;
}

//Scroll Button 

const scrollButtonJS = () =>{
const scrollButton = document.getElementById('scroll-button');
scrollButton.addEventListener('click',()=>{
    window.scrollTo({
        top:0,
        left:0,
        behavior:'smooth'
    })
})

}


fetchMovies();
clearLocalStorage()
headerpicture();
scrollButtonJS();

 