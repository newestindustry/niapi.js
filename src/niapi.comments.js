NI.Comments = {
    
    url: false,
    
    setUrl: function(url) {
        if(url) {
            url = url;
        } else if(typeof url !== "undefined") {
            url = url;
        } else {
            if(NI.Options.comments_include_hash) {
                url = window.location.href;
            } else {
                url = window.location.href.replace(window.location.hash, "");
            }
        }
        
        return url;
    },

    Get: function(id, url) {
        url = this.setUrl(url);
        
        if(typeof id === "undefined") {
            id = "ni-comments";
        }
        
        var element = document.getElementById(id);
        
        if(element) {
            NI.Api.Get('/comments/_format/html/element/'+id+'/url/'+encodeURIComponent(url),
                        function(error, data) {
                            element.innerHTML = data;
                            
                            document.getElementById('niCreateCommentFormUrl'+id).value = url;
                            NI.Comments.fixSubmit(id, url);
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
        NI.Api.Post('/comments/_format/html/element/'+id+'/url/'+encodeURIComponent(url), serializedData, function(error) {
            if(!error) {
                NI.Comments.Get(id, url);
            }
        });
    }
};
