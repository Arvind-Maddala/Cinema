const  movies = document.getElementById('main');
let getMovies;
let getCityLocal = localStorage.getItem('city').toLowerCase(); 
let getCity = document.getElementById('getCity');
let getLanguage = document.getElementById('getLanguage');
let getGenre = document.getElementById('getGenre');
let cityLogo = document.getElementById('cityLogo')
clearLocalStorage()


// HTTP Request

const fetchMovies = ()=> {

fetch('../movies.json')
.then(res => res.json())
.then(data => {
  getMovies = data.movies.filter((elem) => elem.city.includes(getCityLocal)); 
  console.log(getMovies);
  showMovies(getMovies)
})
}

fetchMovies();

const showMovies = (getMovies)=> {
  main.innerHTML = '';
  getMovies.forEach(movie => {
    const { Poster,Title,imdbID} = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
    <img src="${Poster}" class="card-img-top" alt="${Title}" />
    <div class="card-body">
      <h5 class="card-title">${Title}</h5>
        <a href="#" class="btn btn-danger bookNow" onClick ="selectMovie('${imdbID}')"  >Book Now</a>
    </div>
    `
    main.appendChild(movieEl);
  });
}


//Filter by Genre 

getLanguage.addEventListener('change', (e) => {
  e.preventDefault();
  let lang = getLanguage.value;
  localStorage.setItem('lang', lang);
  let genre = localStorage.getItem("genre");
  let data = getData(genre, lang) || [];
  showMovies(data)
})

getGenre.addEventListener('change', (e) => {
  let genre = getGenre.value
  localStorage.setItem('genre', genre)
  let lang = localStorage.getItem('lang')
  let data = getData(genre, lang) || []
  showMovies(data)
})


function getData(genre, lang) {
  if (genre == "" && lang == "") {
    return getMovies
  } else if (genre != "" && lang == "") {
    let data = [];
    getMovies.forEach((elem) => {
      if (elem.genre == genre) {
        data.push(elem)
      }
    })
    return data;
  } else if (genre == "" && lang != "") {
    let data = [];
    getMovies.forEach((elem) => {
      if (elem.language == lang) {
        data.push(elem)
      }
    })
    return data
  } else if (genre != "" && lang != "") {
    let data = [];
    getMovies.forEach((elem) => {
      if (elem.genre == genre && elem.language == lang) {
        data.push(elem)
      }
    })
    return data
  }
  return getMovies
}

function headerpicture() {
  if(localStorage.getItem('city') == 'hyderabad'){
    getCity.innerText = 'Hyderabad';
    cityLogo.src = './images/hyd.png'
  }else if(localStorage.getItem('city') == 'bangalore'){
    getCity.innerText = 'Bangalore';
    cityLogo.src = './images/bengalore.png'
} else if(localStorage.getItem('city') == 'mumbai'){
  getCity.innerText = 'Mumbai';
  cityLogo.src = './images/mumbai.png'
}
}
headerpicture();



function selectMovie(id) {
  localStorage.setItem('movie', id);
  window.location.href = '/bookPage.html'
}

const scrollButtonJS = ()=>{
  const scrollButton = document.getElementById('scroll-button');
  scrollButton.addEventListener('click',()=>{
      window.scrollTo({
          top:0,
          left:0,
          behavior:'smooth'
      })
  })

}

scrollButtonJS();

//Clearing LocalStorage values;

function clearLocalStorage() {
  localStorage.removeItem('ticketNumbers');
  localStorage.removeItem('selectedSeats');

}