/******************************************************************************\
|                                                                              |
|                      contact-organization-panel-view.js                      |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a panel view of a contact's organization.                |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import BaseView from '../../../../../../views/base-view.js';
import Expandable from '../../../../../../views/behaviors/expanders/expandable.js';
import ContainableSelectable from '../../../../../../views/behaviors/containers/containable-selectable.js';
import ContactOrganizationsView from '../../../../../../views/apps/contact-editor/mainbar/contacts/organizations/contact-organizations-view.js';

export default BaseView.extend(_.extend({}, Expandable, ContainableSelectable, {

	//
	// attributes
	//

	tagName: 'form',
	className: 'expandable form-horizontal',

	template: template(`
		<div class="header info">
		
			<% if (heading) { %>
			<div class="heading"><% if (icon) { %><div class="icon"><%= icon %></div><% } %><%= heading %></div>
			<% } %>
			
			<% if (expandable || editable) { %>
			<div class="buttons">
				<% if (expandable) { %>
				<div class="expander">
					<button type="button" class="collapse btn-sm">
						<i class="fa fa-caret-up"></i>
					</button>
					<button type="button" class="expand btn-sm">
						<i class="fa fa-caret-down"></i>	
					</button>
				</div>
				<% } %>
		
				<% if (editable) { %>
				<button type="button" class="add success btn btn-sm" data-toggle="tooltip" title="Add Organization">
					<i class="fa fa-plus"></i>
				</button>
		
				<button type="button" class="remove success btn btn-sm" data-toggle="tooltip" title="Remove Organization" style="display:none">
					<i class="fa fa-minus"></i>
				</button>
				<% } %>
			</div>
			<% } %>
		</div>
		
		<div class="items"></div>
	`),

	regions: {
		items: '.items'
	},

	events: {
		'click .heading': 'onClickHeading',
		'click .expander': 'onClickExpander',
		'click .add': 'onClickAdd',
		'click .remove': 'onClickRemove'
	},

	//
	// constructor
	//

	initialize: function() {

		// listen for changes to collection
		//
		this.listenTo(this.collection, 'add', (item) => {
			this.updateButtons();

			// perform callback
			//
			if (this.options.onadd) {
				this.options.onadd(item);
			}
		});
		this.listenTo(this.collection, 'remove', (item) => {
			this.updateButtons();

			// perform callback
			//
			if (this.options.onremove) {
				this.options.onremove(item);
			}
		});
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
	// adding methods
	//

	addItem: function() {
		import(
			'../../../../../../views/apps/contact-editor/dialogs/contacts/add/add-user-job-dialog-view.js'
		).then((AddUserJobDialogView) => {
			
			// show add dialog
			//
			application.show(new AddUserJobDialogView.default({

				// callbacks
				//
				onadd: (model) => {
					this.collection.add(model);

					// update view
					//
					if (this.collection.length == 1) {
						this.render();
					}
				}
			}));
		});
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			icon: '<i class="fa fa-university"></i>',
			heading: this.options.heading,

			// capabilities
			//
			expandable: this.options.expandable,
			editable: this.options.editable
		};
	},

	onRender: function() {

		// show child views
		//
		this.showContactOrganizations();

		// hide / show buttons
		//
		this.updateButtons();

		// add tooltip triggers
		//
		this.addTooltips();
	},

	showContactOrganizations: function() {
		this.showChildView('items', new ContactOrganizationsView({
			collection: this.collection,

			// options
			//
			multicolumn: this.options.multicolumn,
			countries: this.options.countries,
			empty: "No organizations.",

			// capabilities
			//
			expandable: this.options.expandable,
			selectable: this.options.selectable,
			editable: this.options.editable,
			draggable: this.options.draggable,
			droppable: this.options.droppable,

			// callbacks
			//
			onselect: this.options.onselect,
			ondeselect: this.options.ondeselect,
			onchange: this.options.onchange,
			onadd: this.options.onadd,
			onremove: this.options.onremove
		}));
	},

	updateButtons: function() {
		if (this.collection.length == 0) {
			this.$el.find('.add.btn').show();
			this.$el.find('.remove.btn').hide();
		} else {
			this.$el.find('.add.btn').hide();
			this.$el.find('.remove.btn').show();
		}
	},

	//
	// mouse event handling methods
	//

	onClickHeading: function() {
		if (this.hasChildView('items')) {
			this.getChildView('items').deselectAll();
		}
	},
	
	onClickExpander: function() {
		this.toggleCollapse({
			recursive: true
		});
	},

	onClickAdd: function() {
		this.addItem();
	},

	onClickRemove: function() {
		this.getChildView('items').getChildViewAt(0).delete({

			// callbacks
			//
			success: () => {
				if (this.options.onchange) {
					this.options.onchange();
				}
			}
		});
	}
}));