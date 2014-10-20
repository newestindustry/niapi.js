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
        NI.Api.Get("/notifications/_direction/desc/read/false/_limit/1/type/!global", function(error, data) {
            if(error) {
                alert("Er is iets fout gegaan");
            } else {
                var element = document.getElementById('ni-totalUnreadNotifications');
                var elementDashboard = document.getElementById('notificationsTotalNew');
                
                if(element) {
                    element.innerHTML = data.total;
                    if(data.total === 0) {
                        element.style.display = "none";
                    } else {
                        element.style.display = "block";
                    }
                }

                if(elementDashboard) {
                    elementDashboard.innerHTML = data.total;
                    if(data.total === 0) {
                        elementDashboard.style.display = "none";
                    } else {
                        elementDashboard.style.display = "block";
                    }
                }
                
            }
        });
        
        var elementProfile = document.getElementById('notification_badge_profile');
        if(elementProfile) {
            NI.Api.Get("/notifications/_direction/desc/read/false/_limit/1/module/profile/type/!global", function(error, data) {
                if(data.total === 0) {
                    elementProfile.style.display = "none";
                } else {
                    elementProfile.style.display = "block";
                    elementProfile.innerHTML = data.total;
                }
            });
        }
        
        var elementCollectives = document.getElementById('notification_badge_collective');
        if(elementCollectives) {
            NI.Api.Get("/notifications/_direction/desc/read/false/_limit/1/module/collectives/type/!global", function(error, data) {
                if(data.total === 0) {
                    elementCollectives.style.display = "none";
                } else {
                    elementCollectives.style.display = "block";
                    elementCollectives.innerHTML = data.total;
                }
            });
        }
        
        
        
    }
};


