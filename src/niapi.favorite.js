NI.Favorite = {
    Prepare: function() {
        var elements = document.getElementsByClassName("ni-favorite");
    
        for(var x=0; x < elements.length; x++) {
            NI.Favorite.Init(elements[x]);
            elements[x].onclick = function() {
                NI.Favorite.Click(this);
                return false;
            };
        }
    },

    Init: function(element) {
        var loaded = element.dataset.loaded;
        
        if(typeof loaded === "undefined") {
            var href = element.dataset.href;
            var url;
            
            if(typeof href !== "undefined" && href !== "") {
                url = href;
            } else {
                url = window.location.href;
            }
            
            var a = document.createElement('a');
            a.className = "btn";
            a.href = "";
            var i = document.createElement('i');
            i.className = "fa fa-heart-o";
            
            element.appendChild(a);
            a.appendChild(i);
            
            element.dataset.loaded = true;
            
            if(NI.Options.oauth_token) {
                NI.Api.Get("/favorites/url/"+encodeURIComponent(url), function(error, data, x) {
                    if(x.status === 200) {
                        var fa = element.getElementsByClassName('fa');
                        for(x = 0; x < fa.length; x++) {
                            fa[x].className = "fa fa-heart";
                        }
                    }
                });
            }
        }
    },
    
    Click: function(element) {
        var href = element.dataset.href;
        var url, a;
        if(typeof href !== "undefined" && href !== "") {
            url = href;
        } else {
            url = window.location.href;
        }
        
        NI.Api.Post("/favorites/", "url="+encodeURIComponent(url), function(error, data, x) {
            if(x.status === 201) { // Created
                a = element.getElementsByClassName('fa-heart-o');
                for(x = 0; x < a.length; x++) {
                    a[x].className = "fa fa-heart";
                }
            } else {
                // Removed
                a = element.getElementsByClassName('fa-heart');
                for(x = 0; x < a.length; x++) {
                    a[x].className = "fa fa-heart-o";
                }
            }
        });
    }
};
