/******************************************************************************\
|                                                                              |
|                               view-menu-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a view for displaying view dropdown menus.                    |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import ViewMenuView from '../../../../../../views/apps/common/header-bar/menu-bar/menus/view-menu-view.js';

export default ViewMenuView.extend({

	//
	// attributes
	//

	events: {
		'click .show-gallery': 'onClickShowGallery',

		// view options
		//
		'click .fit-size': 'onClickFitSize',
		'click .fit-width': 'onClickFitWidth',
		'click .fit-height': 'onClickFitHeight',

		'click .zoom-in': 'onClickZoomIn',
		'click .zoom-out': 'onClickZoomOut',
		'click .zoom-to-actual': 'onClickZoomToActual',

		'click .rotate-left': 'onClickRotateLeft',
		'click .rotate-right': 'onClickRotateRight',
		'click .rotate-reset': 'onClickRotateReset',

		'click .show-smoothing': 'onClickShowSmoothing',
		'click .view-slide-show': 'onClickSlideShow',

		// toolbar options
		//
		'click .show-toolbars > a': 'onClickShowToolbars',
		'click .show-toolbar > li > a': 'onClickShowToolbar',

		// mainbar options
		//
		'click .show-prompt': 'onClickOption',
		'click .show-exif-info': 'onClickOption',

		// sidebar options
		//
		'click .show-sidebar': 'onClickOption',
		'click .show-sidebar-panels a': 'onClickShowSideBarPanel',
		'click .sidebar-view-kind a': 'onClickSideBarViewKind',
		'click .sidebar-tile-size a': 'onClickSideBarTileSize',

		// window options
		//
		'click .shrink-window': 'onClickShrinkWindow',
		'click .grow-window': 'onClickGrowWindow',
		'click .expand-window': 'onClickExpandWindow',

		// desktop options
		//
		'click .prev-space': 'onClickPrevSpace',
		'click .next-space': 'onClickNextSpace',
		'click .minimize-all': 'onClickMinimizeAll',
		'click .unminimize-all': 'onClickUnminimizeAll',
		'click .view-full-screen': 'onClickViewFullScreen',

		// preferences options
		//
		'click .view-preferences': 'onClickViewPreferences'
	},

	//
	// querying methods
	//

	enabled: function() {
		let hasModel = this.parent.app.model != null;
		let isSignedIn = application.isSignedIn();

		return {

			// options
			//
			'show-gallery': true,

			// viewing options
			//
			'fit-size': hasModel,
			'fit-width': hasModel,
			'fit-height': hasModel,
			'show-smoothing': hasModel,

			// toolbar options
			//
			'show-nav-bar': true,
			'show-mouse-mode-bar': true,
			'show-zoom-mode-bar': true,
			'show-zoom-bar': true,
			'show-rotate-bar': true,
			'show-generate-bar': isSignedIn,
			'show-image-bar': true,

			// mainbar options
			//
			'show-prompt': true,
			'show-exif-info': hasModel,

			// sidebar options
			//
			'show-sidebar': true,
			'show-favorites-panel': true,
			'show-images-panel': true,
			'show-parameters-panel': true,
			'show-files-panel': isSignedIn,

			// sidebar item options
			//
			'view-sidebar-icons': true,
			'view-sidebar-lists': true,
			'view-sidebar-cards': true,
			'view-sidebar-tiles': true
		};
	},

	selected: function() {
		let preferences = this.parent.app.preferences;
		let isSignedIn = application.isSignedIn();
		let toolbars = preferences.get('toolbars') || [];
		let sidebarPanels = preferences.get('sidebar_panels') || [];
		let sidebarViewKind = preferences.get('sidebar_view_kind');
		let sidebarTileSize = preferences.get('sidebar_tile_size');

		return {

			// viewing options
			//
			'fit-size': this.parent.app.zoom == 'fit_size',
			'fit-width': this.parent.app.zoom == 'fit_width',
			'fit-height': this.parent.app.zoom == 'fit_height',
			'show-smoothing': preferences.get('show_smoothing'),

			// toolbar options
			//
			'show-toolbars': toolbars.length > 0,
			'show-nav-bar': toolbars.includes('nav'),
			'show-mouse-mode-bar': toolbars.includes('mouse_mode'),
			'show-zoom-mode-bar': toolbars.includes('zoom_mode'),
			'show-zoom-bar': toolbars.includes('zoom'),
			'show-rotate-bar': toolbars.includes('rotate'),
			'show-generate-bar': toolbars.includes('generate'),
			'show-image-bar': toolbars.includes('generate'),

			// mainbar options
			//
			'show-prompt': preferences.get('show_prompt'),
			'show-exif-info': preferences.get('show_exif_info'),

			// sidebar options
			//
			'show-sidebar': preferences.get('show_sidebar'),
			'show-favorites-panel': sidebarPanels.includes('favorites'),
			'show-images-panel': sidebarPanels.includes('images'),
			'show-parameters-panel': sidebarPanels.includes('parameters'),
			'show-files-panel': sidebarPanels.includes('files') && isSignedIn,

			// sidebar item options
			//
			'view-sidebar-icons': sidebarViewKind == 'icons',
			'view-sidebar-lists': sidebarViewKind == 'lists',
			'view-sidebar-cards': sidebarViewKind == 'cards',
			'view-sidebar-tiles': sidebarViewKind == 'tiles',

			// sidebar tile sizes
			//
			'small-tile-size': sidebarTileSize == 'small',
			'medium-tile-size': sidebarTileSize == 'medium',
			'large-tile-size': sidebarTileSize == 'large'
		};
	},

	//
	// setting methods
	//

	setSmoothing: function(smoothing) {
		this.parent.app.options.smoothing = smoothing;
		this.setItemSelected('show-smoothing', smoothing);
	},

	//
	// rendering methods
	//

	/*
	templateContext: function() {
		return {
			zoom: this.parent.app.zoom,
			zoomLevels: this.parent.app.zoomLevels,
		};
	},
	*/

	//
	// mouse event handling methods
	//

	onClickShowGallery: function() {
		this.parent.app.showGallery();
	},

	//
	// fit mouse event handling methods
	//

	onClickFitSize: function() {
		this.parent.app.getChildView('header zoom').zoomTo('fit_size');
	},

	onClickFitWidth: function() {
		this.parent.app.getChildView('header zoom').zoomTo('fit_width');
	},

	onClickFitHeight: function() {
		this.parent.app.getChildView('header zoom').zoomTo('fit_height');
	},

	//
	// zoom mouse event handling methods
	//

	onClickZoomIn: function() {
		this.parent.app.getChildView('header zoom').zoomIn();
	},

	onClickZoomOut: function() {
		this.parent.app.getChildView('header zoom').zoomOut();
	},

	onClickZoomToActual: function() {
		this.parent.app.getChildView('header zoom').zoomTo(100);
	},

	//
	// rotate mouse event handling methods
	//

	onClickRotateLeft: function() {
		this.parent.app.rotateTo(this.parent.app.getRotation() - 90);
	},

	onClickRotateRight: function() {
		this.parent.app.rotateTo(this.parent.app.getRotation() + 90);
	},

	onClickRotateReset: function() {
		this.parent.app.rotateTo(0);
	},

	//
	// preferences mouse event handling methods
	//
	
	onClickShowSmoothing: function() {
		this.toggleMenuItem('show-smoothing');
		this.parent.app.setOption('show_smoothing', this.isItemSelected('show-smoothing'));
	},

	onClickSlideShow: function() {
		this.toggleMenuItem('view-slide-show');
		this.parent.app.toggleSlideShow();
	}
});