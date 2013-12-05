NI.Options = {
    api_url: "https://api.newestindustry.nl",
    auth_url: "/oauth/auth/",
    client_id: false,
    redirect_url: false,
    scope: "default",
    oauth_token: false,
    refresh_token: false,
    
    /* SIDEBAR */
    sidebar_force_margin: true,
    
    /* COMMENTS */
    comments_include_hash: true,
    comments_form_position: "bottom",
    comments_reverse: false,

    Set: function(options) {
        var availableOptions = [
            'api_url',
            'auth_url',
            'client_id',
            'redirect_url',
            'scope',
            'oauth_token',
            'refresh_token',
            'sidebar_force_margin',
            'comments_include_hash',
            'comments_form_position',
            'comments_reverse'
        ];
    
        if(typeof options === "object") {
            for(var x = 0; x < availableOptions.length; x++) {
                this[availableOptions[x]] = (typeof options[availableOptions[x]] !== "undefined") ? options[availableOptions[x]] : this[availableOptions[x]];
            }
        }

        NI.Api.parseToken();
    },
    
    setToken: function(token) {
        NI.Options.oauth_token = token;
        localStorage.oauth_token = NI.Options.oauth_token;
    }
};
