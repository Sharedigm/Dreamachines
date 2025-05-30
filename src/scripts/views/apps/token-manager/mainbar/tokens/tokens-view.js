/******************************************************************************\
|                                                                              |
|                                tokens-view.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view used for displaying tokens.                       |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import ItemsView from '../../../../../views/items/items-view.js';
import TokenIconsView from '../../../../../views/apps/token-manager/mainbar/tokens/icons/token-icons-view.js';
import TokensListView from '../../../../../views/apps/token-manager/mainbar/tokens/lists/tokens-list-view.js';
import TokenCardsView from '../../../../../views/apps/token-manager/mainbar/tokens/cards/token-cards-view.js';

export default ItemsView.extend({

	//
	// attributes
	//

	className: 'items',

	template: template(`
		<div class="items"></div>
	`),

	regions: {
		items: {
			el: '.items',
			replaceElement: true
		}
	},

	emptyView: ItemsView.extend({
		className: 'empty',
		template: template("No apps")
	}),

	//
	// constructor
	//

	initialize: function() {
		
		// set optional parameter defaults
		//
		if (this.options.emptyView) {
			this.emptyView = this.options.emptyView;
		}
	},

	//
	// iterator
	//

	each: function(callback, filter, options) {
		if (this.hasChildView('items')) {
			this.getChildView('items').each(callback, filter, options);
		}
	},

	//
	// selecting methods
	//

	selectByName: function(name) {
		let model = this.collection.getByName(name);
		let itemView = this.getChildView('items').getItemView(model);

		// deselect currently selected item
		//
		this.$el.find('.selected').removeClass('selected');

		// select new item
		//
		if (itemView) {
			itemView.select({
				silent: true
			});
		}

		return itemView;
	},

	deselectAll: function() {
		if (this.hasChildView('items')) {
			this.getChildView('items').deselectAll();
		}
	},

	//
	// rendering methods
	//

	onRender: function() {

		// show files and directories
		//
		switch (this.options.view_kind || 'icons') {
			case 'icons':
				this.showIcons();
				break;
			case 'lists':
				this.showLists();
				break;
			case 'cards':
				this.showCards();
				break;
		}
	},

	showIcons: function() {
		this.showChildView('items', new TokenIconsView(_.extend({
			collection: this.collection
		}, this.options)));
	},

	showLists: function() {
		this.showChildView('items', new TokensListView(_.extend({
			collection: this.collection
		}, this.options)));
	},

	showCards: function() {
		this.showChildView('items', new TokenCardsView(_.extend({
			collection: this.collection
		}, this.options)));
	}
});