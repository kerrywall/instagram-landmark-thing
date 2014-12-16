var pictures = {};

	// geocode the strings using the google api
	pictures.geocode = function(searchTerm){
		$.ajax({
			type: 'GET',
			url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + searchTerm +'&key=AIzaSyBDup_z0u0VSAQ86shWiq0mIMxXLsSFGMs',
			dataType: 'json',
			success: function(mapData) {
				latitude = mapData.results[0].geometry.location.lat,
				longitude = mapData.results[0].geometry.location.lng;

				// run the getPictures method using the lat and long figures returned by google
				pictures.getPictures(latitude, longitude);
			
			}
		});
	}	

	// serve the lat/long coordinates to instagram
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

	// generate html for the images
	pictures.populate = function(result) {
		for (i = 0; i < result.data.length; i ++) {
			$('.photos').append('<a href="' + result.data[i].link + '" target="_blank"><img class="photo" src="' + result.data[i].images.standard_resolution.url + '"></a>');
		}
	}

	// event handlers

	// dropdown
	$('#place').on('change', function(d) {
		$('.landmark:selected').each(function() {
	    	// the user wants this!
	    	$userSearch = $(this).text();
	    	$('.viewing').text($userSearch);
	    	// use the text in the html as the search term and run it through google
	    	pictures.geocode($userSearch);
		});
	});	

	// search box
	$('#searchy').on('submit', function(f) {
		f.preventDefault();
		$userSearch = $('#search').val();
		$('.viewing').text($userSearch);
		pictures.geocode($userSearch);
	});

	$('document').ready(function() {
		// generate a random landmark from the search menu to load with the page
		random = $('option');
		number = Math.floor(Math.random() * random.length);
		// but you can't use the first option tag, so if number is 0, generate a new number
		if (number === 0) {
			number = Math.floor(Math.random() * random.length);
		}

		value = random[number].textContent;
		pictures.geocode(value);
		$('.viewing').text(value);
	});