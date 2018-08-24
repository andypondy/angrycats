const FACEBOOK_ENABLED = false;

var Platform = cc.Class({

    properties: {
        PlayerPicUrl: null,
        PlayerName: null,
        PlayerID: null,
        Platform: null,
    },

    statics: {
        instance: null
    },

    init: function() {
        if (FACEBOOK_ENABLED) {
            var contextId = FBInstant.context.getID();
            var contextType = FBInstant.context.getType();
            cc.log("context ID: "+contextId+"  type: "+contextType);

            this.PlayerName = FBInstant.player.getName();
            cc.sys.localStorage.setItem("localName", PlayerName);

            this.PlayerID = FBInstant.player.getID();
            this.PlayerPicUrl = FBInstant.player.getPhoto();
            this.Platform = FBInstant.getPlatform();
        }
        else {
            this.PlayerID = FakeStuff.PlayerID;
            this.PlayerName = FakeStuff.PlayerName;
            this.PlayerPicUrl = FakeStuff.PlayerPicUrl;
            this.Platform = FakeStuff.Platform;
        }
        console.log('anand - this.PlayerName ' + this.PlayerName);

    },

    getPlayerName: function () {
        return this.PlayerName;
    },
});


var FakeStuff = FakeStuff || {};

FakeStuff.PlayerPicUrl = "someurl";
FakeStuff.PlayerName = "Anand Offline";
FakeStuff.PlayerID = "123456789";
FakeStuff.Platform = "OFFLINE";


export var PlatformInstance = PlatformInstance || new Platform();