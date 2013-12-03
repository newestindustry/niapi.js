NI.Comments = {
    
    url: false,

    setUrl: function(url) {
        if(this.url) {
            this.url = this.url;
        } else if(typeof url !== "undefined") {
            this.url = url;
        } else {
            if(NI.Options.comments_include_hash) {
                this.url = window.location.href;
            } else {
                this.url = window.location.href.replace(window.location.hash, "");
            }
        }
        
        return this.url;
    },

    Get: function(url) {
        this.setUrl(url);
        
        var element = document.getElementById("ni-comments");
        if(element) {
            NI.Api.Get('/comments/_format/html/url/'+encodeURIComponent(NI.Comments.url),
                        function(error, data) {
                            element.innerHTML = data;
                            
                            document.getElementById('niCreateCommentFormUrl').value = NI.Comments.url;
                            NI.Comments.fixSubmit();
                        });
        }
        
    },
    
    fixSubmit: function() {
        document.getElementById('niCreateComment').onsubmit = function() {
            var ser = niapi_serialize(document.getElementById('niCreateComment'));
            NI.Comments.Create(ser);
            return false;
        };
    },
    
    Create: function(serializedData) {
        NI.Api.Post('/comments/_format/html/url/'+encodeURIComponent(NI.Comments.url), serializedData, function(error) {
            if(!error) {
                NI.Comments.Get();
            }
        });
    }
};
