NI.Notifications = {
    
    Mark: function(id) {
        NI.Api.Put("/notifications/id/"+id, {}, function(error) {
            if(error) {
                alert("Er is iets fout gegaan");
            } else {
                document.getElementById('notification_'+id).remove();
            }
            
        });
    },

    GetSidebarCount: function() {
        
    }
};
