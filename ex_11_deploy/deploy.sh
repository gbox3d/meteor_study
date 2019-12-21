#!/usr/bin/env bash


#MONGO_URL=mongodb://localhost:27017/meteor ROOT_URL=http://127.0.0.1 MAIL_URL=NULL PORT=3000 node main.js
#METEOR_SETTINGS= "{\"public\" : {\"race\" : \"human\",\"class\" : \"wizardry\"},\"private\" : {}}"
ROOT_URL=http://127.0.0.1 MAIL_URL=NULL PORT=3000 METEOR_SETTINGS='{"public" : {"race" : "human","class" : "wizardry"},"private" : {}}' node main.js
