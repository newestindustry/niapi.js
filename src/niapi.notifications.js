NI.Notifications = {
    
    Mark: function(id) {
        NI.Api.Put("/notifications/id/"+id, {}, function(error) {
            if(error) {
                alert("Er is iets fout gegaan");
            } else {
                if(typeof document.getElementById('notification_'+id) !== "undefined") {
                    document.getElementById('notification_'+id).remove();
                }
            }
        });
    },

    GetSidebarCount: function() {
        NI.Api.Get("/notifications/_direction/desc/read/false/_limit/0/module/!general/type/!global", function(error, data) {
            if(error) {
                alert("Er is iets fout gegaan");
            } else {
                var element = document.getElementById('ni-totalUnreadNotifications');
                var elementDashboard = document.getElementById('notificationsTotalNew');
                
                if(typeof element !== "undefined") {
                    element.innerHTML = data.total;
                    if(data.total === 0) {
                        element.style.display = "none";
                    } else {
                        element.style.display = "block";
                    }
                }
                
                if(typeof elementDashboard !== "undefined") {
                    elementDashboard.innerHTML = data.total;
                    if(data.total === 0) {
                        elementDashboard.style.display = "none";
                    } else {
                        elementDashboard.style.display = "block";
                    }
                }
                
            }
            setInterval(NI.Notifications.GetSidebarCount,15000);
        });
    }
};


