/******************************************************************************\
|                                                                              |
|                             tabbed-content-view.js                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view used for editing code files.                      |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import TabbedContentView from '../../../../../views/apps/common/mainbar/tabbed-content/tabbed-content-view.js';
import TabsView from '../../../../../views/apps/contact-editor/mainbar/tabbed-content/tabs/tabs-view.js';
import TabPanesView from '../../../../../views/apps/contact-editor/mainbar/tabbed-content/tab-panes/tab-panes-view.js';

export default TabbedContentView.extend({

	//
	// attributes
	//

	tabsView: TabsView,
	tabPanesView: TabPanesView
});