function initMap() {
  //Get current device's position
  navigator.geolocation.getCurrentPosition(position => {
    let currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: { lat: currentPosition.lat, lng: currentPosition.lng }
    });

    const geocoder = new google.maps.Geocoder();

    document.getElementById("userCity").addEventListener("change", function() {
      geocodeAddress(geocoder, map);
    });
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
