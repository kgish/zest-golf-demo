#!/usr/bin/env bash

DATE=`date`

git add .
git commit -am "HEROKU DEPLOYMENT: $DATE"
git push heroku master
heroku open
