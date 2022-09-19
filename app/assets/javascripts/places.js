const changeMarker = (lng, lat, map) => {
	var marker = new mapboxgl.Marker({
		// draggable: true,
	})
		.setLngLat([lng, lat])
		.addTo(map);

	return marker
}

const createMap = () => {
	var element1 = document.getElementById('latitude-geocoder')
	var element2 = document.getElementById('longitude-geocoder')

	if (element1 && element2) {
		var lat = parseInt(element1.value) || 0
		var lng = parseInt(element2.value) || 0

		mapboxgl.accessToken = 'pk.eyJ1IjoiYWRpdGlnaG9zaCIsImEiOiJjbDZ2djVsNHQwNWJhM2lwOTd4MXBleWQ4In0.nuh7l51aGzorlxyF_BfQaQ';
		const map = new mapboxgl.Map({
			container: 'location-map',
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [lng, lat],
			zoom: 3
		});
		const geocoder = new MapboxGeocoder({
			accessToken: mapboxgl.accessToken,
			mapboxgl: mapboxgl
		})
		map.addControl(geocoder);

		var marker = null
		map.on('load', function (e) {
			marker = changeMarker(lng, lat, map)
		});

		map.on('click', function (e) {
			marker.remove()
			changeFieldVal(e.lngLat.lat, e.lngLat.lng)
			marker = changeMarker(e.lngLat.lng, e.lngLat.lat, map)
		});

		function changeFieldVal(lat, lng) {
			element1.value = lat || 0
			element2.value = lng || 0
		}

		// marker.on('dragend', function () {
		// 	if (marker) {
		// 		const lngLat = marker.getLngLat();
		// 		changeFieldVal(lngLat.lat, lngLat.lng)
		// 	}
		// });
		geocoder.on('result', function (results) {
			var coordinates = results.result?.geometry.coordinates
			changeFieldVal(coordinates[1], coordinates[0])
			marker.remove();
		});

	}
}

$(document).on('turbolinks:load', createMap)

window.createMap = createMap