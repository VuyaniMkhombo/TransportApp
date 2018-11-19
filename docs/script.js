var map = L.map('map').setView([-33.91, 18.41], 11)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

const appId = 'UQC0GZBe4uhDMrPh37kB'
const appCode = 'skrJjuMNRtDPm5YFPW9P4w'
const clientId = 'f3af64fa-c976-4840-bddd-2e6b4b48160b'
const clientSecret = 'm38EJQNCAD2VZ1SeQbTtLIIAlhuVjEtUsc7pR8lNLhk='

const autocompleteUrl = "http://autocomplete.geocoder.api.here.com/6.2/suggest.json" +
  "?app_id=" + appId +
  "&app_code=" + appCode +
  "&query="
  
const geocodeUrl = "https://geocoder.api.here.com/6.2/geocode.json" +
  "?app_id=" + appId +
  "&app_code=" + appCode +
  "&searchtext="

const tokenUrl = "https://identity.whereismytransport.com/connect/token"

function login() {
    var payload = {
        'client_id': clientId,
        'client_secret': clientSecret,
        'grant_type': 'client_credentials',
        'scope': 'transportapi:all'
    }

    var request = new XMLHttpRequest();
    request.open('POST', 'https://identity.whereismytransport.com/connect/token', true);
    request.addEventListener('load', function () {
        if(this.status == 200) {
            var response = JSON.parse(this.responseText);
            var token = response.access_token;
            window.token = token;

            localStorage.setItem('token', token)
            localStorage.setItem('storageDate', Date.now().toLocaleString())
        } else {
            console.log("get token call failed")
            alert('login unsuccessful')
        }
    });
    request.setRequestHeader('Accept', 'application/json');
    var formData = new FormData();

    for (var key in payload) {
        formData.append(key, payload[key]);
    }

    request.send(formData);
}

login()

var app = new Vue({
    el: '#app',
    data: {
        startAddress: '',
        destinationAddress: '',
        startLocation: undefined,
        destinationLocation: undefined,
        isStart: true,
        autoCompleteResults: [],
        startPoint: undefined,
        destinationPoint: undefined
    },
    methods: {
        autocomplete: function (isStart) {
            var _this = this
            var text = this.startAddress

            if (isStart == false) {
                text = this.destinationAddress
            }

            if(text.length < 5) {
                return false
            }

            fetch(autocompleteUrl + text)
                .then(function (response) {
                    return response.json()
                })
                .then(function (response) {
                    _this.autoCompleteResults = response.suggestions
                    _this.isStart = isStart
                })
        },
        resultSelect: function (result) {
            var _this = this
            fetch(geocodeUrl + result.label)
                .then(function (response) {
                    return response.json()
                })
                .then(function (response) {
                    var location = response.Response.View[0].Result[0].Location.DisplayPosition
                    if(_this.isStart == true) {
                        _this.startAddress = result.label
                        _this.startPoint = L.marker([location.Latitude, location.Longitude])
                        _this.startPoint.addTo(map)
                        _this.startLocation = location
                        _this.autoCompleteResults = []
                    } else {
                        _this.destinationAddress = result.label
                        _this.destinationPoint = L.marker([location.Latitude, location.Longitude])
                        _this.destinationPoint.addTo(map)
                        _this.destinationLocation = location
                        _this.autoCompleteResults = []
                    }
                })
        },
        search: function () {
            console.log('running search')
            var journeyUrl = 'https://platform.whereismytransport.com/api/journeys'
            var ourBody = {
                "geometry": {
                    "type": "MultiPoint",
                    "coordinates": [
                        [
                            this.startLocation.Longitude,
                            this.startLocation.Latitude
                        ],
                        [
                            this.destinationLocation.Longitude,
                            this.destinationLocation.Latitude
                        ]
                    ]
                },
                "maxItineraries": 5
            }


            fetch(journeyUrl, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + window.token,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(ourBody) 
            })
            .then(function(response){
                //console.log(response)
                return response.json()
            })
            .then(function(response) {
                console.log(response)

                var itineraries = response.itineraries
                if(itineraries.length > 0) {
                    var legs = itineraries[0].legs
                    for(var i = 0; i < legs.length; i++) {
                        console.log('geometry', legs[i].geometry.coordinates)
                        var coorindates = legs[i].geometry.coordinates

                        var latlngs = [
                            [45.51, -122.68],
                            [37.77, -122.43],
                            [34.04, -118.2]
                        ];
                        var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
                        // zoom the map to the polyline
                        map.fitBounds(polyline.getBounds());

                    }
                }
                
            })
        }
    }
})