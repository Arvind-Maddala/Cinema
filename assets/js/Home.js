let getLocation = document.getElementById('location')
let getCity = document.getElementById('getCity')


getCity.addEventListener('click', (e) => {
  e.preventDefault()
  let city = getLocation.value;
  if(city !='hyderabad' && city !='bangalore' && city !='mumbai') {
    alert('Please select city')
    return
   } ;
  localStorage.setItem('city', city);
  window.location.href = '/movies.html'
})