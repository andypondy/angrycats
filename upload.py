import json
import os
import sys

with open('config.json') as f:
    data = json.load(f)

appId       = data['FB_appId']
uploadKey   = data['FB_uploadAccessToken']
path        = os.path.dirname(os.path.realpath(__file__)) 

compile = "/Applications/CocosCreator.app/Contents/MacOS/CocosCreator --path " + path + " --build  'autoCompile=true'"
print compile

archiveToUpload = ""
for file in os.listdir("./build/fb-instant-games"):
    if file.endswith(".zip"):
        archiveToUpload = "./build/fb-instant-games/" + file

if archiveToUpload != "":
    upload = "curl -X POST https://graph-video.facebook.com/" + appId + "/assets -F 'access_token=" + uploadKey + "' -F 'type=BUNDLE' -F 'asset=@" + archiveToUpload + "' -F 'comment=Graph API upload'"

print upload