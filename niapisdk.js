/*global ActiveXObject: false */
window.NI = (function () {
    var NI = {
        api_url: "https://api.newestindustry.nl",
        auth_url: "/oauth/auth/",
        client_id:false,
        redirect_uri:false,
        scope:"default",
        oauth_token:false,
        refresh_token: false,
        error:false,
        me:false,

        init: function(obj) {
            if(typeof obj !== "undefined") {
                this.api_url        = (typeof obj.api_url !== "undefined") ? obj.api_url : this.api_url;
                this.client_id      = (typeof obj.client_id !== "undefined") ? obj.client_id : false;
                this.redirect_uri   = (typeof obj.redirect_uri !== "undefined") ? obj.redirect_uri : false;
            }
        
            this.parseToken();
        },
        
        emptyCallback: function(error, data) {
            
        },
        
        parseToken: function() {
            var params = {}, queryString = location.hash.substring(1), regex = /([^&=]+)=([^&]*)/g, m;
            while (m = regex.exec(queryString)) {
                params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
            }
            
            if(params.token) {
                this.oauth_token = params.token;
                localStorage.oauth_token = this.oauth_token;
            } else if(localStorage.oauth_token) {
                this.oauth_token = localStorage.oauth_token;
            }
            
            if(params.error) {
                this.error = params.error;
            }
        },
    
        Me: function(callback) {
            this.Get("/me", callback);
        },
    
        Login: function() {
            if(!this.oauth_token) {
                location.href = this.api_url+this.auth_url+"?response_type=token&client_id="+this.client_id+"&redirect_uri="+this.redirect_uri+"&scope="+this.scope;
            }
        },
        
        Logout: function() {
            if(this.oauth_token) {
                this.Delete("/oauth/token", this.emptyCallback);    
            }
            
            this.oauth_token = false;
            localStorage.removeItem('oauth_token');
        },
        
        Get: function(uri, callback) {
            this.call(this.api_url+uri, callback, "GET");
        },
        
        Post: function(uri, callback, data) {
            if(typeof data === "object") {
                data = this.toQueryString(data);
            }

            this.call(this.api_url+uri, callback, "POST", data);
        },
        
        Put: function(uri, callback, data) {
            if(typeof data === "object") {
                data = this.toQueryString(data);
            }

            this.call(this.api_url+uri, callback, "PUT", data);
        },
        
        Delete: function(uri, callback) {
            this.call(this.api_url+uri, callback, "DELETE");
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
        
        call: function(url, callback, method, post) {
            var requestTimeout, x, requestMethod, error;
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
                        NI.Logout();
                        error = new Error("NIApi: Access denied");
                    } else {
                        error = new Error("NIApi: Response status: "+x.status);
                    }
                    
                    var data = JSON.parse(x.responseText);
                    callback(error, data, x);
                }
            };
        
            if(method) {
                requestMethod = method.toUpperCase();
            } else {
                requestMethod = "GET";
            }
        
            x.open(requestMethod, url+"/_ts/" + Date.now(), true);
        
            if(this.oauth_token) {
                x.setRequestHeader("Authorization", "oauth_token "+this.oauth_token);
            }
        
            if(!post) {
                x.send();
            } else {
                x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                x.send(post);
            }
            return false;
        }
    };
    
    return NI;
}());