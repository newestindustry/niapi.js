# Newest Industry API Javascript SDK

This is the Newest Industry API Javascript SDK for implementing the oauth2 flows in a js app.

This sdk is also available from our cdn: https://cdn.newestindustry.nl/js/niapi.min.js

## Options
You can set multiple options by doing so via the options plugin:

    NI.Options.Set({sidebar_force_margin: false, redirect_url: "http://www.google.com/myapp.aspx"});


Key | Plugin | Description | Default value | Possible values
------------ | ------------- | ------------
api_url | API | The API endpoint URL  | "https://api.newestindustry.nl" | A valid url
client_id | API |  Client ID for oauth | false | A valid client ID
redirect_url | API | The URL to redirect to after logging in | false | A valid redirect uri
scope | API | The data scope | "default" | "default,other"
auth_redirect_type | API | The redirect token parameter seperator | "hash" | "hash" (=#) or "get" (=?)
sidebar_force_margin | Sidebar | Wether the body should get a fixed margin when the sidebar plugin is used | true | true or false
comments_include_hash | Comments | Include the hash in the default url handler | true | true or false
comments_form_position | Comments | The location of the form relative to the comments | "bottom" | "bottom" or "top"
comments_reverse | Comments | Sort the comments the other way around | false | true (last comment first) or false (last comment last)