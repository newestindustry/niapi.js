function NIApi()
{
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
}

NIApi.prototype.api_url         = "https://api.newestindustry.nl";
NIApi.prototype.auth_url        = "https://api.newestindustry.nl/oauth/auth/";

NIApi.prototype.client_id       = false;
NIApi.prototype.redirect_uri    = false;
NIApi.prototype.scope           = "default";

NIApi.prototype.oauth_token     = false;
NIApi.prototype.refresh_token   = false;

NIApi.prototype.error           = false;

NIApi.prototype.me              = false;

NIApi.prototype.Login = function()
{
    if(!this.oauth_token) {
        gotoUrl = this.auth_url+"?response_type=token&client_id="+this.client_id+"&redirect_uri="+this.redirect_uri+"&scope="+this.scope;
        location.href = gotoUrl;
    }
};
NIApi.prototype.TS = function() 
{
    return "/_ts/" + Date.now();
};

NIApi.prototype.ValidateToken = function(callback)
{
    this.Get("/oauth/tokenstatus", callback);
};

NIApi.prototype.Logout = function(callback)
{
    this.Delete("/oauth/token", callback);
    
    this.oauth_token = false;
    localStorage.removeItem('oauth_token');
    
};

NIApi.prototype.Me = function(callback) 
{
    this.Get("/me", callback);
};

NIApi.prototype.Get = function(uri, callback) 
{
    this.call(this.api_url+uri+this.TS(), callback, "GET");
};

NIApi.prototype.Post = function(uri, callback, data) 
{
    if(typeof data == "object") {
        data = this.toQueryString(data);
    }

    this.call(this.api_url+uri+this.TS(), callback, "POST", data);
};

NIApi.prototype.Put = function(uri, callback, data) 
{
    if(typeof data == "object") {
        data = this.toQueryString(data);
    }

    this.call(this.api_url+uri+this.TS(), callback, "PUT", data);    
};

NIApi.prototype.Delete = function(uri, callback) 
{
    this.call(this.api_url+uri+this.TS(), callback, "DELETE");
};

NIApi.prototype.call = function(url,callback,method,post)
{
    var requestTimeout, x;
    try{ 
        x = new XMLHttpRequest(); 
    } catch(e) {
        try{ 
            x = new ActiveXObject("Msxml2.XMLHTTP"); 
        } catch (e) {
            if(console) {
                console.log("NIApi: Not supported");
            }
            return null;
        }
    }
    
    requestTimeout = setTimeout(function() { x.abort(); callback(new Error("NIApi: Timeout Reached"), "",x); }, 10000);
    
    x.onreadystatechange = function()
    {
        if (x.readyState != 4) {
            return;
        } else {
            clearTimeout(requestTimeout);
            
            if(x.status == 200 || x.status == 201 || x.status == 204)
            {
                error = false;
            } else if(x.status == 401) {
                this.InvalidateToken();
                error = new Error("NIApi: Access denied");
            } else {
                error = new Error("NIApi: Response status: "+x.status);
            }
            
            data = JSON.parse(x.responseText);
            
            callback(error, data, x);
        }
        
    };
    
    if(method) {
        requestMethod = method.toUpperCase();    
    } else {
        requestMethod = "GET";
    }

    x.open(requestMethod, url, true);

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
};

NIApi.prototype.toQueryString = function(obj) 
{
    var str = "";
    var seperator = "";
    for (key in obj) {
        str += seperator;
        str += encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
        seperator = "&";
    }
    return str;
};

NIApi = new NIApi();
