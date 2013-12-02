/*global ActiveXObject: false */
window.NI = (function () {
    var NI = {
        api_url: "https://api.newestindustry.nl",
        auth_url: "/oauth/auth/",
        client_id: false,
        redirect_uri: false,
        scope: "default",
        oauth_token: false,
        refresh_token: false,
        error: false,
        me: false,
        root: document.getElementById('ni-root'),

        init: function(obj) {
            if(typeof obj !== "undefined") {
                NI.api_url        = (typeof obj.api_url !== "undefined") ? obj.api_url : NI.api_url;
                NI.client_id      = (typeof obj.client_id !== "undefined") ? obj.client_id : false;
                NI.redirect_uri   = (typeof obj.redirect_uri !== "undefined") ? obj.redirect_uri : false;
            }
        
            NI.parseToken();
        },
        
        emptyCallback: function() {
            
        },
        
        parseToken: function() {
            var params = {}, queryString = location.hash.substring(1), regex = /([^&=]+)=([^&]*)/g;
            var queryStringParts = regex.exec(queryString);
            if(queryStringParts) {
                params[decodeURIComponent(queryStringParts[1])] = decodeURIComponent(queryStringParts[2]);
            }

            if(params.token) {
                NI.oauth_token = params.token;
                localStorage.oauth_token = NI.oauth_token;
            } else if(localStorage.oauth_token) {
                NI.oauth_token = localStorage.oauth_token;
            }
            
            if(params.error) {
                NI.error = params.error;
            }
        },
    
        Me: function(callback) {
            NI.Get("/me", callback);
        },
    
        Login: function() {
            if(!NI.oauth_token) {
                location.href = NI.api_url+NI.auth_url+"?response_type=token&client_id="+NI.client_id+"&redirect_uri="+NI.redirect_uri+"&scope="+NI.scope;
            }
        },
        
        Logout: function() {
            if(NI.oauth_token) {
                NI.Delete("/oauth/token", NI.emptyCallback);
            }
            
            NI.oauth_token = false;
            localStorage.removeItem('oauth_token');
        },
        
        Get: function(uri, callback) {
            NI.call(NI.api_url+uri, callback, "GET");
        },
        
        Post: function(uri, callback, data) {
            if(typeof data === "object") {
                data = NI.toQueryString(data);
            }

            NI.call(NI.api_url+uri, callback, "POST", data);
        },
        
        Put: function(uri, callback, data) {
            if(typeof data === "object") {
                data = NI.toQueryString(data);
            }

            NI.call(NI.api_url+uri, callback, "PUT", data);
        },
        
        Delete: function(uri, callback) {
            NI.call(NI.api_url+uri, callback, "DELETE");
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
        
        loadSidebar: function() {
            NI.call(NI.api_url+"/frontend/menu/left/_format/html", function(error, data) {
                document.getElementById('ni-root').innerHTML = data;
                
                NI.call(NI.api_url+"/mail/messages/thread/false/read/false/_limit/1", function(error, data) {
                    document.getElementById('ni-totalUnreadMessages').innerHTML = data.total;
                });
            });
        },
        
        getMessages: function() {
            NI.call(NI.api_url+"/mail/messages/thread/false/_limit/5/_sort/created/_direction/desc/_format/html", function(error, data) {
                document.getElementById('ni-messagesPreviewList').innerHTML = data;
                if(document.getElementById('ni-messagesPreview').style.display === "none") {
                    document.getElementById('ni-messagesPreview').style.display = "block";
                } else {
                    document.getElementById('ni-messagesPreview').style.display = "none";
                }
                
            });
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

                    var data;
                    
                    if(x.getResponseHeader('content-type').indexOf("application/json") !== -1) {
                        data = JSON.parse(x.responseText);
                    } else {
                        data = x.responseText;
                    }
                    
                    callback(error, data, x);
                }
            };
        
            if(method) {
                requestMethod = method.toUpperCase();
            } else {
                requestMethod = "GET";
            }
        
            x.open(requestMethod, url+"/_ts/" + Date.now(), true);
        
            if(NI.oauth_token) {
                x.setRequestHeader("Authorization", "oauth_token "+NI.oauth_token);
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