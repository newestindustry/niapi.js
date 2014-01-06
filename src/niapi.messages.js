NI.Messages = {
    
    GetSidebar: function() {
        NI.Api.Get("/mail/messages/thread/false/_limit/5/_sort/created/_direction/desc/_format/html", function(error, data) {
                document.getElementById('ni-messagesPreviewList').innerHTML = data;
                if(document.getElementById('ni-messagesPreview').style.display === "none") {
                    document.getElementById('ni-messagesPreview').style.display = "block";
                } else {
                    document.getElementById('ni-messagesPreview').style.display = "none";
                }
            });
    },
    
    GetSidebarCount: function() {
        NI.Api.Get("/mail/messages/thread/false/read/false/_limit/1", function(error, data) {
            var element = document.getElementById('ni-totalUnreadMessages');
            if(typeof element !== "undefined") {
                element.innerHTML = data.total;
                if(data.total === 0) {
                    element.style.display = "none";
                } else {
                    element.style.display = "block";
                }
            }
            
        });
        setInterval(NI.Messages.GetSidebarCount,15000);
    }
};


