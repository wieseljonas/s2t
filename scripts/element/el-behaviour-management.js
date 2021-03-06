var s2t = s2t || {}

s2t.behaviour = s2t.behaviour || {}

s2t.behaviour.setArtistClickBehaviour = function (element) {

	element.on('click', function (event) {
		event.preventDefault();
		var artistId = jQuery(event.target).data('artistid');

		s2t.api.getArtist(artistId, function (data) {
			s2t.main.createAlbumView(data);
			console.log(data.artist.name);
		});
	});
}

s2t.behaviour.setPlaylistClickBehaviour = function (element) {

	element.on('click', function (event) {
		event.preventDefault();
		var playlistId = jQuery(event.target).data('playlistid');
		s2t.main.displayPlaylist(playlistId);
		console.log(playlistId);
	});
}

s2t.behaviour.setCreatePlaylistClickBehaviour = function (element) {

	element.on('click', function (event) {
		event.preventDefault();
		jQuery('#createplaylist').modal('show');
	});
}

s2t.behaviour.setStarBehaviour = function (element, id) {

	if(_.has(s2t.starredObjects, id)) {
		element.removeClass('icon-star-empty');
		element.addClass('icon-star');
	}

	element.on('click', function (event) {
		event.preventDefault();

		if(element.hasClass('icon-star-empty')) {
			element.addClass('icon-star');
			element.removeClass('icon-star-empty');

			s2t.api.star(id, function(data) {
				s2t.starredObjects[id] = 'true';
			});
		}
		else {
			element.removeClass('icon-star');
			element.addClass('icon-star-empty');

			s2t.api.unstar(id, function(data) {
				//update array
				s2t.starredObjects[id] = 'false';
			});
		}
	});
}

