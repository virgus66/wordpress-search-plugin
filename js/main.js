console.log('plugin installed :D')
var autocomplete, geocoder;
let locationInput = document.getElementById('location-input');
// let price_min_input = document.querySelector('#price-min-box');
// let price_max_input = document.querySelector('#price-max-box');
let image1 = document.getElementById('image1');
let image2 = document.getElementById('image2');


function initAutocomplete() {
  var input = document.getElementById('location-input');
  var options = {
    // types: ['(cities)'],
    componentRestrictions: {country: 'uk'}
  };

  autocomplete = new google.maps.places.Autocomplete(input,options);
  geocoder = new google.maps.Geocoder();
  autocomplete.addListener('place_changed', getPlace);
}


function getPlace() {
  var place = autocomplete.getPlace();
  let lat = place.geometry.location.lat()
  let lng = place.geometry.location.lng()

  codeLatLngToAddress(lat, lng).then( o => {
    data.latitude       = lat;
    data.longitude      = lng;
    data.location       = o;
    locationInput.value = o;

    let url = new URLSearchParams(data).toString()
    url = url.replace(/%2C/gi, ',');
    console.log(url)
    window.location.href = "https://ucado.co.uk/app/dist/search?"+url;
  })
}

function setLocationApi () {
  let lat,lng;

  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( (position)=>{
        lat = position.coords.latitude; 
        lng = position.coords.longitude;

        codeLatLngToAddress(lat,lng).then( o => {
          data.latitude = lat;
          data.longitude = lng;
          data.location       = o;
          image1.style.display = 'inline-block';
          image2.style.display = 'none';
          locationInput.value = o;
          locationInput.classList.remove('required')
          // locationInput.parentElement.querySelector('p').style.display = 'none';

          let url = new URLSearchParams(data).toString()
          url = url.replace(/%2C/gi, ',');
          console.log(url)
          window.location.href = "https://ucado.co.uk/app/dist/search?"+url;
        })
      });
  } else console.log( "Geolocation is not supported by this browser." );
}

codeLatLngToAddress = (lat,lng) => {
  return new Promise( (res, rej)=> {
    let geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        console.log('location: ',results)
        if (results[0]) {

          let addr = results[0].address_components;
          for (let i=0; i < addr.length; i++) {
            for(let j=0; j < addr[i].types.length; j++ ) {
              if (addr[i].types[j] == 'postal_town') {
                res(addr[i].long_name);
              }
            }
          }

        } else rej("No results found");
      } else rej(`Google status: ${status}`)
    })
  })
}

function createPricesOptions() {
  let price = 50000;
  let html;

  while ( price <= 20000000 ) {
    if( price < 300000) {
      html+= `<option value=${price}>£${price}</option>`
      price += 10000
    } else if ( price < 500000 ) {
      html+= `<option value=${price}>£${price}</option>`
      price += 25000
    } 
    else if ( price < 700000 ) {
      html+= `<option value=${price}>£${price}</option>`
      price += 50000
    }
    else if ( price < 1000000 ) {
      html+= `<option value=${price}>£${price}</option>`
      price += 100000
    }
    else if ( price < 2000000 ) {
      html+= `<option value=${price}>£${price}</option>`
      price += 250000
    }
    else if ( price < 5000000 ) {
      html+= `<option value=${price}>£${price}</option>`
      price += 1000000
    }
    else if ( price < 10000000 ) {
      html+= `<option value=${price}>£${price}</option>`
      price += 2500000
    }
    else {
      html+= `<option value=${price}>£${price}</option>`
      price += 5000000
    }
  }
  return html;
}

// // ON LOAD
// window.onload = ()=>  {
//   price_min_input.innerHTML = '<option value="0" selected>min</option>'
//   price_min_input.innerHTML += createPricesOptions()
//   price_max_input.innerHTML = createPricesOptions()
//   price_max_input.innerHTML += '<option value="0" selected>max</option>'
// }  

// // LISTENERS
// document.querySelector('#location-input').addEventListener('focus', ()=>{
//   document.querySelector('.hover-container').style.height = "100%";
// })

// document.querySelectorAll('#listing .property-listing').forEach( node => {
//   node.addEventListener('click', (e)=>{
//     document.querySelectorAll('#listing .property-listing').forEach( node => {
//       node.classList.remove('selected');
//     })
//     e.target.classList.add('selected')
//     console.log(e.target)
//   })
// })

document.getElementById('get-location-button').addEventListener('click', ()=>{
  image1.style.display = 'none';
  image2.style.display = 'inline-block';
  setLocationApi();
})

// document.getElementById('submit-button').addEventListener('click', (e)=>{
//   e.preventDefault();
//   getDataFromFields();

//   if (data.latitude == null || data.longitude == null) {
//     locationInput.classList.add('required');
//     locationInput.classList.add('shake')

//     let node = document.createElement('p');
//     node.className = 'required';
//     node.innerHTML = 'This field is required';
//     locationInput.parentElement.appendChild(node);
//   }
//   else {
//     let url = new URLSearchParams(data).toString()
//     url = url.replace(/%2C/gi, ',');
//     console.log(url)
//     window.location.href = "http://localhost:3335/app/dist/search?"+url;
//   }
// })