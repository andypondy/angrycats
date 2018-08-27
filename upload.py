import json
import os
import sys
import subprocess

with open('config.json') as f:
    data = json.load(f)

appId       = data['FB_appId']
uploadKey   = data['FB_uploadAccessToken']
path        = os.path.dirname(os.path.realpath(__file__)) 
buildpath   = "build/fb-instant-games"

if not os.path.exists(path + buildpath):
    os.makedirs(path + buildpath)

compile = "/Applications/CocosCreator.app/Contents/MacOS/CocosCreator --path " + path + " --build  'autoCompile=true;platform=fb-instant-games;debug=true'"
print compile
compileprocess = subprocess.Popen(compile.split())
compileprocess.wait()

archiveToUpload = ""
for file in os.listdir(buildpath):
    if file.endswith(".zip"):
        archiveToUpload = buildpath + "/" + file

if archiveToUpload != "":
    uploadarr = ["curl",
		  "-X",
		  "POST",
                  "https://graph-video.facebook.com/" + appId + "/assets",
		  "-F",
		  "access_token=" + uploadKey,
		  "-F",
		  "type=BUNDLE",
		  "-F",
		  "asset=@" + archiveToUpload,
		  "-F",
		  "comment=Graph API upload"]
    uploadprocess = subprocess.Popen(uploadarr)
    uploadprocess.wait()

