#!/usr/bin/env bash

#
# ./heroku-deployment.sh
#
# Commit latest changes, push to heroku and then open browser.

DATE=`date`

git add .
git commit -am "HEROKU DEPLOYMENT: $DATE"
git push heroku master
heroku open
