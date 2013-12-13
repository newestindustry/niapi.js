# Newest Industry API Javascript SDK

This is the Newest Industry API Javascript SDK for implementing the oauth2 flows in a js app.

This sdk is also available from our cdn: https://cdn.newestindustry.nl/js/niapi.min.js

## Basic implementation
Basic implementation is pretty simple. All you need is a client_id from us (contact us for getting one) and you can implement our JS Oauth2 Api. Place the js sdk in the header of your document:

	<script src="https://cdn.newestindustry.nl/js/niapi.min.js" type="text/javascript"></script>
	
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
	        <script src="https://cdn.newestindustry.nl/js/niapi.min.js"></script>
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
            <td>"https://api.newestindustry.nl"</td>
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
            <td>auth_redirect_type</td>
            <td>API</td>
            <td>The redirect token parameter seperator</td>
            <td>"hash"</td>
            <td>"hash" (=#) or "get" (=?)</td>
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
