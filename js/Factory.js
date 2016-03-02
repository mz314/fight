var Factory = {
    loaded: {},
    
    get: function (name) {
        instance = null;

        if (!Factory.loaded[name]) {
            instance = eval('new '+name+"()");
            Factory.loaded[name] = instance;
        }
        
        return Factory.loaded[name];
    }
    
};

