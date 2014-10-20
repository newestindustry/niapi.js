function NI(){
    if (window === this) {
        return new NI();
    }
    
    return this;
}
 
NI.injectCss = function() {
    // Inject google font and fontawesome
    var elementAwesome = document.getElementById('niCssFontAwesome');
    if(!elementAwesome) {
        var linkAwesome = document.createElement("link");
        linkAwesome.href = "https://netdna.bootstrapcdn.com/font-awesome/4.0.1/css/font-awesome.css";
        linkAwesome.type = "text/css";
        linkAwesome.rel = "stylesheet";
        linkAwesome.id = "niCssFontAwesome";
        document.getElementsByTagName("head")[0].appendChild(linkAwesome);
    }
    
    var elementOpenSans = document.getElementById('niCssOpenSans');
    if(!elementOpenSans) {
        var linkOpenSans = document.createElement("link");
        linkOpenSans.href = "https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800";
        linkOpenSans.type = "text/css";
        linkOpenSans.rel = "stylesheet";
        linkOpenSans.id = "niCssOpenSans";
        document.getElementsByTagName("head")[0].appendChild(linkOpenSans);
    }
};

DomReady.ready(function() {
    NI.Favorite.Prepare();
    NI.Comments.Prepare();
    
    if(NI.Options.load_css === true) {
        NI.injectCss();
    }
});



NI.Me = false;
