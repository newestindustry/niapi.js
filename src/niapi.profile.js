NI.Profile = {
    Me: function(callback) {
        NI.Api.Get("/me", function(error, data) {
            NI.Me = data.me;
        
            callback(error, data);
        });
    },

    Login: function() {
        if(!NI.Options.oauth_token) {
            location.href = NI.Options.api_url+NI.Options.auth_url+"?response_type=token&client_id="+NI.Options.client_id+"&redirect_uri="+NI.Options.redirect_url+"&scope="+NI.Options.scope;
        }
    },
    
    Logout: function() {
        if(NI.Options.oauth_token) {
            NI.Api.Delete("/oauth/token", NI.Api.emptyCallback);
        }
        
        NI.Options.oauth_token = false;
        localStorage.removeItem('oauth_token');
    }
    
    
};
