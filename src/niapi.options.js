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

    Set: function(options) {
        if(typeof options === "object") {
            this.api_url        = (typeof options.api_url !== "undefined")          ? options.api_url       : this.api_url;
            this.auth_url       = (typeof options.auth_url !== "undefined")         ? options.auth_url      : this.auth_url;
            this.client_id      = (typeof options.client_id !== "undefined")        ? options.client_id     : this.client_id;
            this.redirect_url   = (typeof options.redirect_url !== "undefined")     ? options.redirect_url  : this.redirect_url;
            this.scope          = (typeof options.scope !== "undefined")            ? options.scope         : this.scope;
            this.oauth_token    = (typeof options.oauth_token !== "undefined")      ? options.oauth_token   : this.oauth_token;
            this.refresh_token  = (typeof options.refresh_token !== "undefined")    ? options.refresh_token : this.refresh_token;
            
            this.sidebar_force_margin  = (typeof options.sidebar_force_margin !== "undefined")    ? options.sidebar_force_margin : this.sidebar_force_margin;
            
            this.comments_include_hash  = (typeof options.comments_include_hash !== "undefined")    ? options.comments_include_hash : this.comments_include_hash;
        }
        
        NI.Api.parseToken();
    },
    
    setToken: function(token) {
        NI.Options.oauth_token = token;
        localStorage.oauth_token = NI.Options.oauth_token;
    }
};
