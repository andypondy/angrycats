
var Facebook = cc.Class({
    Hi: function() {
        console.log('anand[Facebook.js:4] - just saying hi ', );
    },

    init: function(platform) {
        console.log('anand[Facebook.js:8] -  ', );
        var contextId = FBInstant.context.getID();
        var contextType = FBInstant.context.getType();
    
        platform.PlayerName = FBInstant.player.getName();
        console.log('anand[Facebook.js:13] - platform.PlayerName ', platform.PlayerName);
    
        platform.PlayerID = FBInstant.player.getID();
        platform.PlayerPicUrl = FBInstant.player.getPhoto();
        platform.Platform = FBInstant.getPlatform();
    
        var entryPointData = FBInstant.getEntryPointData();
        // check if is not null and is a valid number
        if(entryPointData && !isNaN(entryPointData))
        {
            LevelToStartAfterLoad = entryPointData - 1; // -1 because server already adds 1 to be in range between 1-15
        }
        // var data_to_store = {
        //     'type' : 1,
        //     'name' : FBInstant.player.getName(), 
        //     'picture': FBInstant.player.getPhoto(),
        //     'localTime': Date.now()
        // };
        // FB.SaveDataToBackend(data_to_store);
        console.log('anand[Facebook.js:32] -  ', );
    },

});

export var FacebookInstance = FacebookInstance || new Facebook();