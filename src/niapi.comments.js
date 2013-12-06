NI.Comments = {
    
    url: false,
    
    injectCss: function() {
        var element = document.getElementById('niCssComments');
        if(!element) {
            var link = document.createElement("link");
            link.href = "https://cdn.newestindustry.nl/css/modules/ni-comments.css";
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

    Get: function(id, url) {
        this.injectCss();
        url = this.setUrl(url);
        
        if(typeof id === "undefined") {
            id = "ni-comments";
        }
        
        var element = document.getElementById(id);
        
        if(element) {
            var getUrl = '/comments/_format/html/_limit/50/element/'+id+'/url/'+encodeURIComponent(url);
            getUrl += "/form_position/"+NI.Options.comments_form_position+"/reverse/"+NI.Options.comments_reverse;

            NI.Api.Get(getUrl,
                        function(error, data) {
                            element.innerHTML = data;
                            
                            if(NI.Options.oauth_token) {
                                document.getElementById('niCreateCommentFormUrl'+id).value = url;
                                NI.Comments.fixSubmit(id, url);
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
