<h1><i class="fa fa-coins"></i>Tokens</h1>

<ol class="breadcrumb">
	<li><a href="#"><i class="fa fa-home"></i>Home</a></li>
	<li><i class="fa fa-coins"></i>Tokens</li>
</ol>

<div class="content">
	<p>Creating stunning images requires an enormous amount of computing power which, unfortunately, is not free.  <%= application.name %> is a free service and we cover the costs of the image generation services so you don't have to.  However, we haved a fixed capacity to cover these costs, so we use a token based system to regulate the use and prevent abuse of the image generation services. </p>

	<div class="attention"><div class="emphasis">Free Tokens</div></div>

	<p>The token system works as follows: </p>
	<ul>
		<li>When you register, you are granted an initial set of tokens (50). </li>
		<li>Each time you generate an image, one token is deducted from your total. </li>
		<li>If you run out of tokens, you can request a new batch of tokens (10). </li>
		<li>You may only request additional tokens once per day. </li>
		<li>If you'd like more images than the free tokens allow, then you can supply your own API key and create as many images as you'd like. </li> 
	</ul>

	<br />
	<p>Your tokens are managed using the <%= config.apps['token_manager'].name %> app shown below: </p>
	<br />

	<div class="figure desktop-only">
		<a href="images/info/apps/token-manager/token-manager.png" target="_blank" class="lightbox" title="<%= config.apps['token_manager'].name %>"><img class="dialog" src="images/info/apps/token-manager/token-manager.png" /></a>
		<div class="caption"><%= config.apps['token_manager'].name %></div>
	</div>
	<div class="figure desktop-only">
		<a href="images/info/apps/token-manager/token-manager-api-keys.png" target="_blank" class="lightbox" title="Add Your Own API Keys"><img class="dialog" src="images/info/apps/token-manager/token-manager-api-keys.png" /></a>
		<div class="caption">Add Your Own API Keys</div>
	</div>
	<div class="figure mobile-only">
		<a href="images/info/apps/token-manager/mobile/mobile-token-manager.png" target="_blank" class="lightbox" title="<%= config.apps['token_manager'].name %>"><img src="images/info/apps/token-manager/mobile/mobile-token-manager.png" /></a>
		<div class="caption"><%= config.apps['token_manager'].name %></div>
	</div>
	<div class="figure mobile-only">
		<a href="images/info/apps/token-manager/mobile/mobile-token-manager-api-keys.png" target="_blank" class="lightbox" title="Add Your Own API Keys"><img src="images/info/apps/token-manager/mobile/mobile-token-manager-api-keys.png" /></a>
		<div class="caption">Add Your Own API Keys</div>
	</div>
</div>