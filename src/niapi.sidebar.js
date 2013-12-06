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
    
    Get: function() {
        this.injectCss();
        var element = document.getElementById("ni-root");
        if(element) {
            NI.Api.Get("/frontend/menu/left/_format/html", function(error, data) {
                document.getElementById('ni-root').innerHTML = data;
                if(NI.Options.sidebar_force_margin === true) {
                    document.body.style.marginLeft = "230px";
                    NI.Messages.GetSidebarCount();
                }
            });
        }
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

