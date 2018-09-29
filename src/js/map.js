function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: { lat: 1.4557, lng: 48.4902 }
  });
  var geocoder = new google.maps.Geocoder();

  document.getElementById("userCity").addEventListener("change", function() {
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById("userCity").value;
  geocoder.geocode({ address: address }, function(results, status) {
    if (status === "OK") {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}
