const movieContainer = document.querySelector('.movie-container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const total = document.getElementById('total');
const seatNumbers = document.getElementById('seatNumbers');
const movieTicket = document.getElementById('movieTicket');
const movie = localStorage.getItem('movie')
let ticketPrice = 100;
  localStorageData();

//Select Seat

movieContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    seatUpdate();
  }
});


// // update total and count
function seatUpdate() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  const idArray = []
  const selectedSeatsCount = selectedSeats.length;
  const selectedSeatsNumbers = Array.from(selectedSeats);
  for(let i = 0; i< selectedSeatsNumbers.length; i++) {
    const x = selectedSeatsNumbers[i].getAttribute('id');
    idArray.push(x)
  }
  seatNumbers.innerText = idArray.join(', ');
  console.log(selectedSeatsNumbers)
  localStorage.setItem('ticketNumbers', JSON.stringify(idArray));
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

}

// get data from localstorage and populate ui
function localStorageData() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  const ticketNumbers = JSON.parse(localStorage.getItem('ticketNumbers'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  if (ticketNumbers !== null && ticketNumbers.length > 0) {
    seatNumbers.innerText = ticketNumbers.join(', ');
}
}

seatUpdate();

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

function confirmBooking(){
  if(JSON.parse(localStorage.getItem('selectedSeats')).length > 0) {
    window.location.href = '/ticket.html'
  } else {
    alert('Please select atleast one seat')
  }
  
}



const getPoster = ()=> {

  fetch('../movies.json')
  .then(res => res.json())
  .then(data => {
    console.log(data)
    const getMoviePoster = data.movies.filter((elem) => elem.imdbID == movie); 
    getMovie(getMoviePoster)
  })
  }


const getMovie = (getMoviePoster)=> {
  movieTicket.innerText = '';
  getMoviePoster.map(movie => {
    const { Poster,Title,imdbID} = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('text-center');
    movieEl.innerHTML = `
    <img src="${Poster}" class="card-img-top mt-5" alt="${Title}" />
    <div class="card-body">
      <h5 class="card-title">${Title}</h5>
        <a href="#" class="btn btn-danger bookNow" onClick ="confirmBooking()"  >Confirm Booking</a>
    </div>
    `
    movieTicket.appendChild(movieEl);
  })
}

getPoster();