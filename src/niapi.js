function NI(){
    if (window === this) {
        return new NI();
    }
    
    return this;
}
 
NI.prototype = {

};

NI.Me = false;
