# Newest Industry API Javascript SDK

This is the Newest Industry API Javascript SDK for implementing the oauth2 flows in a js app.

This sdk is also available from our cdn: https://cdn.newestindustry.nl/js/niapi.min.js

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
    <tr><td>api_url</td><td>API</td><td>The API endpoint URL </td><td>"https://api.newestindustry.nl"</td><td>A valid url</td></tr>
<tr><td>client_id</td><td>API</td><td> Client ID for oauth</td><td>false</td><td>A valid client ID</td></tr>
<tr><td>redirect_url</td><td>API</td><td>The URL to redirect to after logging in</td><td>false</td><td>A valid redirect uri</td></tr>
<tr><td>scope</td><td>API</td><td>The data scope</td><td>"default"</td><td>"default,other"</td></tr>
<tr><td>auth_redirect_type</td><td>API</td><td>The redirect token parameter seperator</td><td>"hash"</td><td>"hash" (=#) or "get" (=?)</td></tr>
<tr><td>sidebar_force_margin</td><td>Sidebar</td><td>Wether the body should get a fixed margin when the sidebar plugin is used</td><td>true</td><td>true or false</td></tr>
<tr><td>comments_include_hash</td><td>Comments</td><td>Include the hash in the default url handler</td><td>true</td><td>true or false</td></tr>
<tr><td>comments_form_position</td><td>Comments</td><td>The location of the form relative to the comments</td><td>"bottom"</td><td>"bottom" or "top"</td></tr>
<tr><td>comments_reverse</td><td>Comments</td><td>Sort the comments the other way around</td><td>false</td><td>true (last comment first) or false (last comment last)</td></tr>
</table>
