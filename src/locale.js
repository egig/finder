DTFINDER.Locale = {

	locale: null,

	localize: function(string) {
		if(typeof DTFINDER.lang[this.locale][string] == 'undefined' ) {
			return string;
		} else {
			return DTFINDER.lang[this.locale][string];
		}
	}
}