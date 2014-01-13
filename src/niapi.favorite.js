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
            var extraClass = element.dataset.styleClass;
            var activeClass = element.dataset.styleActive;
            var alternativeIcon = element.dataset.styleIcon;
            var alternativeActiveIcon = element.dataset.styleIconActive;
            
            if(typeof href !== "undefined" && href !== "") {
                url = href;
            } else {
                url = window.location.href;
            }
            
            var a = document.createElement('a');
            a.className = "btn";
            a.href = "";
            var i = document.createElement('i');
            if (typeof alternativeIcon !== "undefined") {
                i.className = "fa "+alternativeIcon;
            }
            else {
                i.className = "fa fa-heart-o";
            }
            
            if (typeof extraClass !== "undefined") {
                newClassName = a.className + ' ' + extraClass;
                a.className = newClassName;
            }
            
            element.appendChild(a);
            a.appendChild(i);
            
            element.dataset.loaded = true;
            
            if(NI.Options.oauth_token) {
                NI.Api.Get("/favorites/url/"+encodeURIComponent(url), function(error, data, x) {
                    if(x.status === 200) {
                        var fa = element.getElementsByClassName('fa');
                        for(x = 0; x < fa.length; x++) {
                            
                            if (typeof alternativeActiveIcon !== "undefined") {
                                fa[x].className = "fa "+alternativeActiveIcon;
                            }
                            else {
                                fa[x].className = "fa fa-heart";
                            }
                        }
                        if (typeof activeClass !== "undefined") {
                            a.className = a.className+' '+activeClass;
                        }
                    }
                });
            }
        }
    },
    
    Click: function(element) {
        var href = element.dataset.href;
        var url, a;
        var tag = element.dataset.tag;
        var activeClass = element.dataset.styleActive;
        var alternativeIcon = element.dataset.styleIcon;
        var alternativeActiveIcon = element.dataset.styleIconActive;
        if(typeof href !== "undefined" && href !== "") {
            url = href;
        } else {
            url = window.location.href;
        }
        
        NI.Api.Post("/favorites/", "url="+encodeURIComponent(url)+"&tag="+tag, function(error, data, x) {
            if(x.status === 201) { // Created
                i = element.getElementsByClassName('fa');
                
                for(x = 0; x < i.length; x++) {
                    if (typeof alternativeActiveIcon !== "undefined") {
                        i[x].className = "fa "+alternativeActiveIcon;
                    }
                    else {
                        i[x].className = "fa fa-heart";
                    }
                }
                
                if (typeof activeClass !== "undefined") {
                    a = element.getElementsByClassName('btn');
                    for(x = 0; x < a.length; x++) {
                        a[x].className = a[x].className + ' '+activeClass;
                    }
                }
                
            } else {
                // Removed
                i = element.getElementsByClassName('fa');
                
                for(x = 0; x < i.length; x++) {
                    if (typeof alternativeIcon !== "undefined") {
                        i[x].className = "fa "+alternativeIcon;
                    }
                    else {
                        i[x].className = "fa fa-heart-o";
                    }
                }
                
                if (typeof activeClass !== "undefined") {
                    a = element.getElementsByClassName('btn');
                    for(x = 0; x < a.length; x++) {
                        a[x].className = a[x].className.replace(activeClass,'').trim();
                    }
                }
            }
        });
    }
};
