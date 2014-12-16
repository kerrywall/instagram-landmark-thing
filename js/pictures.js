	var pictures = {};

	pictures.geocode = function(searchTerm){

		// geocode the inputted address
		$.ajax({
			type: 'GET',
			url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + searchTerm +'&key=AIzaSyBDup_z0u0VSAQ86shWiq0mIMxXLsSFGMs',
			dataType: 'json',
			success: function(mapData) {
				var latitude = mapData.results[0].geometry.location.lat,
					longitude = mapData.results[0].geometry.location.lng;

				pictures.getPictures(latitude, longitude);
			
		}
	});

}
	pictures.getPictures = function(lat, lng) {
		$('.photos').empty();

		$.ajax({
			url: 'https://api.instagram.com/v1/media/search?',
			method: 'GET',
			data: {
				lat: lat,
				lng: lng,
				distance: '500',
				client_id: '480749a31b8d4feb86e8164fbfda1f45'
			},
			dataType: 'jsonp',
			success: function(result){
				pictures.populate(result);
			}
		});
	}

	pictures.populate = function(result) {
		for (i = 0; i < result.data.length; i ++) {
			$('.photos').append('<a href="' + result.data[i].link + '" target="_blank"><img class="photo" src="' + result.data[i].images.standard_resolution.url + '"></a>');
		}
	}

	$('#place').on('change', function(d) {
		$('.landmark:selected').each(function() {
	    	// the user wants this!
	    	$userWants = $(this).val();
	    	$userSearch = $(this).text();
	    	$('.viewing').text($userSearch);

	    	pictures.geocode($userSearch);
		});
	});	

	$('#searchy').on('submit', function(f) {
		f.preventDefault();
		$userSearch = $('#search').val();
		$('.viewing').text($userSearch);
		pictures.geocode($userSearch);
	});

	$('document').ready(function() {
		random = $('option');
		number = Math.floor(Math.random() * random.length);

		if (number === 0) {
			number = Math.floor(Math.random() * random.length);
		}

		value = random[number].textContent;
		
		pictures.geocode(value);
		$('.viewing').text(value);
	});