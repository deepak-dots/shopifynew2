// Override Settings
var boostPFSInstantSearchConfig = {
		search: {
				//suggestionMode: 'test',
				//suggestionPosition: 'left'
		}
};

(function() {
	BoostPFS.inject(this);

	// Customize style of Suggestion box
	SearchInput.prototype.customizeInstantSearch= function() {};

	function closeSuggestionMobile(searchBoxId, isCloseSearchBox) {
		/* console.log('closeSuggestionMobile'); */
		jQ(searchBoxId).autocomplete('close');
		jQ('.' + Class.searchSuggestion + '[data-search-box="' + searchBoxId + '"]').parent().hide();
		// Remove search box
		var isCloseSearchBox = typeof isCloseSearchBox !== 'undefined' ? isCloseSearchBox : false;
		if (isCloseSearchBox) jQ('.boost-pfs-search-suggestion-mobile-top-panel,.boost-pfs-search-suggestion-mobile-overlay').hide();
		// Update current term for all search boxes
		setValueAllSearchBoxes();
		// Add back tabindex=-1
		jQ('.boost-pfs-search-no-tabindex').attr('tabindex', -1);
		// Return scrolling of body
		if(jQ('body').hasClass(Class.searchSuggestionMobileOpen)){    
			jQ('body').removeClass(Class.searchSuggestionMobileOpen);
		}
		BoostPFS.afterCloseSuggestionMobile(searchBoxId, isCloseSearchBox);
		
		// Close search theme debut
		if(jQ('.js-drawer-close').length > 1){
			jQ('.js-drawer-close').trigger('click');
		}
	}

})();

