NI.Comments = {
    
    url: false,
    idCounter: 1,
    
    Prepare: function() {
        var elements = document.getElementsByClassName("ni-comments");
    
        for(var x=0; x < elements.length; x++) {
            var href = elements[x].dataset.href;
            if(elements[x].id === "") {
                elements[x].id = NI.Comments.GenerateId();
            }
            NI.Comments.Get(elements[x].id, href);
        }
    },
    
    injectCss: function() {
        var element = document.getElementById('niCssComments');
        if(!element) {
            var link = document.createElement("link");
            link.href = "https://cdn.newestindustry.nl/css/modules/ni-comments-1.4.css";
            link.type = "text/css";
            link.rel = "stylesheet";
            link.id = "niCssComments";
            document.getElementsByTagName("head")[0].appendChild(link);
        }
    },
    
    setUrl: function(url) {
        if(typeof url !== "undefined") {
            url = url;
        } else {
            if(NI.Options.comments_include_hash === true) {
                url = window.location.href;
            } else {
                url = window.location.href.replace(window.location.hash, "");
            }
        }

        return url;
    },
    
    GenerateId: function() {
        var id = "ni-comments-"+NI.Comments.idCounter;
        NI.Comments.idCounter++;
        return id;
    },
    
    Get: function(id, url) {
        if (NI.Options.comments_css === true) {
            this.injectCss();
        }
        url = this.setUrl(url);
        
        if(typeof id === "undefined") {
            id = NI.Comments.GenerateId();
        }
        
        var element = document.getElementById(id);
        var formPosition = element.dataset.formPosition;
        var reverse = element.dataset.reverse;
        if(typeof formPosition === "undefined") {
            formPosition = NI.Options.comments_form_position;
        }
        if(typeof reverse === "undefined") {
            reverse = NI.Options.comments_reverse;
        }

        
        if(element) {
            var getUrl = '/comments/_format/html/_limit/50/element/'+id+'/url/'+encodeURIComponent(url);
            getUrl += "/form_position/"+formPosition+"/reverse/"+reverse;

            NI.Api.Get(getUrl,
                        function(error, data) {
                            element.innerHTML = data;
                            
                            if(NI.Options.oauth_token) {
                                document.getElementById('niCreateCommentFormUrl'+id).value = url;
                                NI.Comments.fixSubmit(id, url);
                                NI.Favorite.Prepare();
                            }
                            
                        });
        }
        
    },
    
    fixSubmit: function(id, url) {
        document.getElementById('niCreateComment'+id).onsubmit = function() {
            var ser = niapi_serialize(document.getElementById('niCreateComment'+id));
            NI.Comments.Create(ser, id, url);
            return false;
        };
    },
    
    Create: function(serializedData, id, url) {
        NI.Api.Post('/comments/_format/html/_limit/50/element/'+id+'/url/'+encodeURIComponent(url), serializedData, function(error) {
            if(!error) {
                NI.Comments.Get(id, url);
            }
        });
    }
};
