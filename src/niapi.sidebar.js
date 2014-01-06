NI.Sidebar = {
    injectCss: function() {
        var element = document.getElementById('niCssSidebar');
        if(!element) {
            var link = document.createElement("link");
            link.href = "https://cdn.newestindustry.nl/css/modules/ni-profilebar.css";
            link.type = "text/css";
            link.rel = "stylesheet";
            link.id = "niCssSidebar";
            document.getElementsByTagName("head")[0].appendChild(link);
        }
    },
    
    Get: function(callback) {
        this.injectCss();
        var element = document.getElementById("ni-root");
        var body    = document.getElementsByTagName("body")[0];
        
        if(element) {
            NI.Api.Get("/frontend/menu/left/_format/html", function(error, data) {
                document.getElementById('ni-root').innerHTML = data;
                NI.Messages.GetSidebarCount();
                NI.Notifications.GetSidebarCount();
                
                
                body.onkeydown = function(e) {
                    var messagesPreview = document.getElementById('ni-messagesPreview');
                    var keyDown = e.keyCode;
                    if (messagesPreview.style.display !== "none" && keyDown === 27) {
                        messagesPreview.style.display = "none";
                    }
                };
                
                if(NI.Options.sidebar_force_margin === true) {
                    document.body.style.marginLeft = "230px";
                }
                if (callback && typeof(callback) === "function") {
                    callback();
                }
            });
        }
    },
    
    ShowSettings: function() {
        if(document.getElementById('buttonOpenSettings').className.indexOf("active") === -1) {
            document.getElementById('buttonOpenSettings').className += " active";
        } else {
            var newName = document.getElementById('buttonOpenSettings').className.replace("active", "");
            document.getElementById('buttonOpenSettings').className = newName;
        }
        
        return false;
    },
    
    Remove: function() {
        var element = document.getElementById("ni-profile-menu-left");
        if(element) {
            element.parentNode.removeChild(element);
            if(NI.Options.sidebar_force_margin === true) {
                document.body.style.marginLeft = "0px";
            }
        }
    }
};
