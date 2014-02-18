# Newest Industry API Javascript SDK

This is the Newest Industry API Javascript SDK for implementing the oauth2 flows in a js app.

This sdk is also available from our cdn: https://cdn.newestindustry.nl/js/niapi-1.4.min.js

## Basic implementation
Basic implementation is pretty simple. All you need is a client_id from us (contact us for getting one) and you can implement our JS Oauth2 Api. Place the js sdk in the header of your document:

	<script src="https://cdn.newestindustry.nl/js/niapi-1.4.min.js" type="text/javascript"></script>
	
And then the following just below:
    
    <script>
    NI.Options.Set({
        client_id: "theclientIDyoureceived",
        redirect_url: "http://your.redirect.url/with/path/"
    }); 
    </script>
    
And you're ready to go! If you want to authenticate add this check (anywhere is fine, as long as it is below the NI.Options.Set and where the javascript file is loaded).
            
	<script>
	NI.Profile.Me(function(error, data) {
		if(error) {
			console.log(error);
		} else {
			console.log(data);
		}
	});
	</script>
	
If you are not logged in you can send someone over to our login pages by using 
    
    NI.Profile.Login();
    
This handles the rest. 


## The basic implementation in HTML

So here is the full basic implementation in HTML (as an example):

    <html>
	    <head>
	        <script src="https://cdn.newestindustry.nl/js/niapi-1.4.min.js"></script>
	        <script>
	            NI.Options.Set({
	                client_id: "theclientIDyoureceived",
        			redirect_url: "http://your.redirect.url/with/path/to/this.file"
	            });
	            
	            NI.Profile.Me(function(error, data) {
	                if(error) {
	                    
	                } else {
	                    document.getElementById('name').innerHTML = data.me.firstname;
	                }
	            });
			</script>
	    </head>
	    <body>
	        Welcome back, <span id="name"></span>
	        <br><br>
	        <a href="#" onclick="NI.Profile.Login();">Click here to Login</a>
	    </body>
	</html>

## Options
You can set multiple options by doing so via the options plugin:

    NI.Options.Set({sidebar_force_margin: false, redirect_url: "http://www.google.com/myapp.aspx"});



<table>
	<tr>
    	<th>Key</th>
	    <th>Plugin</th>
	    <th>Description</th>
	    <th>Default value</th>
		<th>Possible value(s)</th>
    </tr>
	<tr>
            <td>api_url</td>
            <td>API</td>
            <td>The API endpoint URL</td>
            <td>"https://api.mycollectiv.es"</td>
            <td>A valid url</td>
        </tr>
        <tr>
            <td>client_id</td>
            <td>API</td>
            <td>Client ID for oauth</td>
            <td>false</td>
            <td>A valid client ID</td>
        </tr>
        <tr>
            <td>redirect_url</td>
            <td>API</td>
            <td>The URL to redirect to after logging in</td>
            <td>false</td>
            <td>A valid redirect uri</td>
        </tr>
        <tr>
            <td>scope</td>
            <td>API</td>
            <td>The data scope</td>
            <td>"default"</td>
            <td>"default"</td>
        </tr>
        <tr>
            <td>sidebar_force_margin</td>
            <td>Sidebar</td>
            <td>Wether the body should get a fixed margin when the sidebar plugin is used</td>
            <td>true</td>
            <td>true or false</td>
        </tr>
        <tr>
            <td>comments_include_hash</td>
            <td>Comments</td>
            <td>Include the hash in the default url handler</td>
            <td>true</td>
            <td>true or false</td>
        </tr>
        <tr>
            <td>comments_form_position</td>
            <td>Comments</td>
            <td>The location of the form relative to the comments</td>
            <td>"bottom"</td>
            <td>"bottom" or "top"</td>
        </tr>
        <tr>
            <td>comments_reverse</td>
            <td>Comments</td>
            <td>Sort the comments the other way around</td>
            <td>false</td>
            <td>true (last comment first) or false (last comment last)</td>
        </tr>

</table>


## Favorite button

When you have an logged in user you can use the favorite button by adding the following HTML somewhere in your webpage:

    <div class="ni-favorite"></div>

This will create a favorite button which will mark the current page as an favorite. It is also possible to mark another than the current page as favorite by adding a data-href attribute. See the example below:

    <div class="ni-favorite" data-href="http://newestindustry.nl"></div>

This will add a favorite button for the webpage http://newestindustry.nl. There are a bunch of other data-attributes available which are listed below.

<table>
	<tr>
    	<th>Option</th>
	    <th>Description</th>
	    <th>Default value</th>
		<th>Example value</th>
    </tr>
	<tr>
	    <td>data-href</td>
	    <td>An alternative page to mark as favorite</td>
	    <td>The current url</td>
	    <td>"http://newestindustry.nl"</td>
	</tr>
	<tr>
	    <td>data-style-icon</td>
	    <td>An alternative favorite icon</td>
	    <td>"fa-heart-o"</td>
	    <td>Any font awesome icon class</td>
	</tr>
	<tr>
	    <td>data-style-icon-active</td>
	    <td>An alternative favorite icon for a page already marked as favorite</td>
	    <td>"fa-heart""</td>
	    <td>Any font awesome icon class</td>
	</tr>
	<tr>
	    <td>data-style-class</td>
	    <td>Any extra classes you want to assign to the a-tag within the favorite button</td>
	    <td>-</td>
	    <td>"ico small"</td>
	</tr>
	<tr>
	    <td>data-style-active</td>
	    <td>A extra class you want to assign to the a-tag of the favorite button when marked as favorite.</td>
	    <td>-</td>
	    <td>"active"</td>
	</tr>
	<tr>
	    <td>data-callback</td>
	    <td>A callback function to execute after the call is finished. Sends the following params to the callback function: error, data and x.</td>
	    <td>-</td>
	    <td>"active"</td>
	</tr>
</table>

## Comment box

You can easily create a comment box on your page by adding the following HTML somewhere in your webpage:

    <div class="ni-comments"></div>

This will create a comment box that uses the current url as its identifier. It is possible to modify the used identifier url (e.g. when you want more comment boxes on one page) by adding a data-href example. See the example below:

    <div class="ni-comments" data-href="http://newestindustry.nl"></div>


There are a bunch of other data-attributes available which are listed below.

<table>
	<tr>
    	<th>Option</th>
	    <th>Description</th>
	    <th>Default value</th>
		<th>Example value</th>
    </tr>
	<tr>
	    <td>data-href</td>
	    <td>The identifier url to use with this comment box</td>
	    <td>The current url</td>
	    <td>"http://newestindustry.nl"</td>
	</tr>
	<tr>
	    <td>data-form-position</td>
	    <td>This determines wether the comment form should be placed below (bottom) or above (top) the comments.</td>
	    <td>"bottom"</td>
	    <td>"bottom" or "top"</td>
	</tr>
	<tr>
	    <td>data-reverse</td>
	    <td>This determines wether the comment list order is reversed or not</td>
	    <td>false (order First to Last)</td>
	    <td>false or true</td>
	</tr>
</table>

