/******************************************************************************\
|                                                                              |
|                            gallery-button-view.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines the view for a particular type of toolbar button.        |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import ButtonView from '../../../../../../views/apps/common/toolbars/buttons/button-view.js';

export default ButtonView.extend({

	//
	// attributes
	//

	className: 'wide button',

	template: '<i class="fa fa-image"></i><span>Gallery</span>',

	//
	// selecting methods
	//

	onClick: function() {

		// perform action
		//
		this.parent.parent.app.showGallery();
	}
});