/**
 * Main JavaScript
 * Site Name
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors:
 */

// create or use existing site scope
var Site = Site || {};

// make sure variable cache exists
Site.variable_cache = Site.variable_cache || {};


/**
 * Check if site is being displayed on mobile.
 * @return boolean
 */
Site.is_mobile = function() {
	var result = false;

	// check for cached value
	if ('mobile_version' in Site.variable_cache) {
		result = Site.variable_cache['mobile_version'];

	} else {
		// detect if site is mobile
		var elements = document.getElementsByName('viewport');

		// check all tags and find `meta`
		for (var i=0, count=elements.length; i<count; i++) {
			var tag = elements[i];

			if (tag.tagName == 'META') {
				result = true;
				break;
			}
		}

		// cache value so next time we are faster
		Site.variable_cache['mobile_version'] = result;
	}

	return result;
};

/**
 * Function called when document and images have been completely loaded.
 */
Site.on_load = function() {
	if (Site.is_mobile())
		Site.mobile_menu = new Caracal.MobileMenu();

	// create dialog for showing contact form
	Site.floating_form = new Dialog();
	Site.floating_form
		.setContentFromDOM('div.floating_form')
		.setSize(600, 300)
		.setTitle(language_handler.getText(null, 'form_title'));

	// create handler for submitting dialog form
	Caracal.ContactForm.list[1].events.connect('submit-success', function(event) {
		Site.floating_form.hide();
		return true;
	});

	// click handle for showing dialog
	var button_dialog = document.querySelector('a.contact');
	button_dialog.addEventListener('click', function() {
		Site.floating_form.show();
	});
};


// connect document `load` event with handler function
$(Site.on_load);
