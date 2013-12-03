/*global ActiveXObject: false */
NI.Api = {
    error: false,

    Get: function(uri, callback) {
        this.call({url: uri, method: "GET"}, callback);
    },
    
    Post: function(uri, data, callback) {
        this.call({url: uri, data: data, method: "POST"}, callback);
    },
    
    Put: function(uri, data, callback) {
        this.call({url: uri, data: data, method: "PUT"}, callback);
    },
    
    Delete: function(uri, data, callback) {
        this.call({url: uri, method: "DELETE"}, callback);
    },
    
    call: function(options, callback) {
        var url, method, data, requestTimeout, x, error;
        
        if(typeof options === "object") {
            url = (typeof options.url !== "undefined") ? NI.Options.api_url+options.url : false;
            method = (typeof options.url !== "undefined") ? options.method.toUpperCase() : "GET";
            data = (typeof options.url !== "undefined") ? options.data : false;
        }
        
        if(typeof callback === "undefined") {
            callback = NI.emptyCallback;
        }

        try{
            x = new XMLHttpRequest();
        } catch(exc) {
            try{
                x = new ActiveXObject("Msxml2.XMLHTTP");
            } finally {
                if(typeof console !== "undefined") {
                    console.log("NIApi: Not supported");
                }
                return null;
            }
        }
    
        requestTimeout = setTimeout(function() {
            x.abort();
            callback(new Error("NIApi: Timeout Reached"), "",x);
        }, 10000);
    
        x.onreadystatechange = function() {
            if (x.readyState !== 4) {
                return;
            } else {
                clearTimeout(requestTimeout);
                
                if(x.status === 200 || x.status === 201 || x.status === 204) {
                    error = false;
                } else if(x.status === 401) {
                    NI.Profile.Logout();
                    error = new Error("NIApi: Access denied");
                } else {
                    error = new Error("NIApi: Response status: "+x.status);
                }

                var data;
                
                if(x.getResponseHeader('content-type').indexOf("application/json") !== -1) {
                    data = JSON.parse(x.responseText);
                } else {
                    data = x.responseText;
                }
                
                callback(error, data, x);
            }
        };
    
        x.open(method, url, true);
    
        if(NI.Options.oauth_token) {
            x.setRequestHeader("Authorization", "oauth_token "+NI.Options.oauth_token);
        }
    
        if(!data) {
            x.send();
        } else {
            x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            x.send(data);
        }
        return false;
    },

    
    toQueryString: function(obj) {
        var str = "";
        var seperator = "";
        for (var key in obj) {
            str += seperator;
            str += encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
            seperator = "&";
        }
        return str;
    },
    
    parseToken: function() {
        var params = {}, queryString = location.hash.substring(1), regex = /([^&=]+)=([^&]*)/g;
        var queryStringParts = regex.exec(queryString);
        if(queryStringParts) {
            params[decodeURIComponent(queryStringParts[1])] = decodeURIComponent(queryStringParts[2]);
        }

        if(params.token) {
            NI.Options.setToken(params.token);
        } else if(localStorage.oauth_token) {
            NI.Options.setToken(localStorage.oauth_token);
        }
        
        if(params.error) {
            NI.Api.error = params.error;
        }
    },

    
    emptyCallback: function() {
        
    }
};