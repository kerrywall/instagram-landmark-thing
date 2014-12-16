	var pictures = {};

	var landmarks = {
	 	westminster: {
	 		title: 'Palace of Westminster, London',
	 		lat: 51.499167,
	 		lng: -0.124722
	 	},
	 	eiffel: {
	 		title: 'Eiffel Tower, Paris',
	 		lat: 48.858222,
	 		lng: 2.2945
	 	},
	 	museumsquartier: {
	 		title: 'Museumsquartier, Vienna',
	 		lat: 48.203333,
	 		lng: 16.358889
	 	},
	 	goldenGate: {
	 		title: 'Golden Gate Bridge, San Francisco',
	 		lat: 37.819722,
	 		lng: -122.478611
	 	},
	 	vatican: {
	 		title: 'St. Peter\'s Square, Vatican',
	 		lat: 41.902222, 
	 		lng: 12.456389
	 	},
	 	liberty: {
	 		title: 'Statue of Liberty, New York',
	 		lat: 40.689167, 
	 		lng: -74.044444
	 	},
	 	basil: {
	 		title: 'St. Basil\'s Cathedral, Moscow',
	 		lat: 55.7525, 
	 		lng: 37.623056
	 	}
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
	    	$viewing = landmarks[$userWants].title;
	    	$('.viewing').text($viewing);

    		pictures.lat = landmarks[$userWants].lat;
    		pictures.lng = landmarks[$userWants].lng;

	    	pictures.getPictures(pictures.lat, pictures.lng);
		});
	});	

	$('document').ready(function() {
		random = new Array();

		for (places in landmarks) {
			random.push(places);
		}

		number = Math.floor(Math.random() * random.length);
		pictures.getPictures(landmarks[random[number]].lat, landmarks[random[number]].lng);
		$('.viewing').text(landmarks[random[number]].title);
	});