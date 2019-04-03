// let radius      = document.querySelector('#radius-select');
// let bedMin      = document.querySelector('#bed-min-box');
// let bedMax      = document.querySelector('#bed-max-box');
// let priceMin    = document.querySelector('#price-min-box');
// let priceMax    = document.querySelector('#price-max-box');
// let type        = document.querySelector('#type-select');
// let propListing = document.querySelectorAll('#listing .property-listing');
let locationInp = document.querySelector('#location-input');

let data = {
  latitude:  null,
  longitude: null,
  radius:    10 * 1609,
  types:     [],
  listings:  [],
  offset:     0,
  limit     : 0,
  min_price : 0,
  max_price : 0,
  bedrooms  : 0,
  bathrooms : 0,
  location  : '',
}

function getDataFromFields() {
  data.offset    = 0;
  data.limit     = 0;
  data.min_price = priceMin.value || 0;
  data.max_price = priceMax.value || 0;
  data.radius    = radius.value * 1609;
  data.bedrooms  = bedMin.value || 0;
  data.bathrooms = 0;
  data.location  = locationInp.value;
  data.types     = ( parseInt(type.value) > 0) ? type.value : '';

  propListing.forEach( (listing) => {
    let listingId = listing.getAttribute('data-listing-id');
    listing.classList.forEach( (cl) => {
      if( cl == 'selected' ) {
        data.listings = [];
        data.listings.push( listingId )
        if (listingId == '1') data.listings.push('4')
      }
    })
  })
}