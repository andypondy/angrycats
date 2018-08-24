import {FacebookInstance} from "./Facebook"
import {WechatInstance} from "./Wechat"

// const FACEBOOK_ENABLED = FACEBOOK_ENABLED || false;

var GamePaused = false;
var SkipFirstInterstitial = true;
var LevelToStartAfterLoad = -1;

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
        FacebookInstance.Hi();
        WechatInstance.Hi();
        if (FACEBOOK_ENABLED) {
            console.log('anand[Platform.js:23] - facebook is enabled ', );
            FacebookInstance.init(this);
        }
        else {
            console.log('anand[Platform.js:27] - running in local mode ', );
            FakeStuff.init(this);
        }
        console.log('anand[Platform.js:36] - this.PlayerName ', this.PlayerName);
        cc.sys.localStorage.setItem("localName", this.PlayerName);
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

FakeStuff.init = function(platform) {
    platform.PlayerID = FakeStuff.PlayerID;
    platform.PlayerName = FakeStuff.PlayerName;
    platform.PlayerPicUrl = FakeStuff.PlayerPicUrl;
    platform.Platform = FakeStuff.Platform;
}


export var PlatformInstance = PlatformInstance || new Platform();