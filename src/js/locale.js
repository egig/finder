DTFINDER.Locale = {

	locale: null,

	localize: function(string) {

		if(typeof DTFINDER.lang[this.locale] == 'undefined' ) {
			return string;
		} else {
			if(typeof DTFINDER.lang[this.locale][string] == 'undefined' ) {

				if(this.local !== 'en') {
					console.warn("Missing translation: '"+string+"' for locale "+ this.locale);
				}

				return string;
			}

			return DTFINDER.lang[this.locale][string];
		}
	}
}
