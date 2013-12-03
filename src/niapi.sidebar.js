NI.Sidebar = {
    Get: function() {
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
    }
};

