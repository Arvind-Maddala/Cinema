const main = document.getElementById('main');
const movies = localStorage.getItem('movie');


window.addEventListener('load', () =>{
  const getMovie = async ()  => {
 
    let res = await fetch('../movies.json')
    let data = await res.json()
    const getMoviename = data.movies.filter(m => m.imdbID === movies);
    printTicketNumber(getMoviename)
  
  }
  
  
  const printTicketNumber = (getMoviename) => {
    main.innerHTML = '';
    const ticketNumbers = JSON.parse(localStorage.getItem('ticketNumbers'));
    const cityName = localStorage.getItem('city') ;
    const city = cityName[0].toUpperCase() + cityName.slice(1)
    const seatCount = JSON.parse(localStorage.getItem('selectedSeats')).length;
    const totalAmount = 100 * seatCount;
    getMoviename.forEach(movie => {
    const {Title} = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('glass-bg');
    movieEl.innerHTML = `
      <div class="ticket">
        <header class="ticket__wrapper">
          <div class="ticket__header">
            <img  class="qr-code" src="../../assets/images/QR-code.png">
          </div>
        </header>
        <div class="ticket__divider">
          <div class="ticket__notch"></div>
          <div class="ticket__notch ticket__notch--right"></div>
        </div>
        <div class="ticket__body">
          <section class="ticket__section">
            <h3>Movie</h3>
            <p>${Title}</p>
          </section>
          <section class="ticket__section">
            <h3>Seat Numbers</h3>
            <p>${ticketNumbers.join()}</p>
          </section>
  
        </div>
        <footer class="ticket__footer">
          <span>Amount Paid</span>
          <p> Total Seats: ${seatCount}</p>
          <p>GST &nbsp (28%): ${(2.8 * seatCount).toFixed(2)}</p>
          <span>Total Amount  &#8377 ${seatCount * 100 + (2.8 * seatCount)}</span>
        </footer>
      </div>
    `
    main.appendChild(movieEl);
  })
    
  }
  
  getMovie()
})