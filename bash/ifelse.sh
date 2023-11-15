#!/bin/bash

if [ ${1,,} = herbert ]; then
	echo "Oh, you're the boss here! Welcome!"
elif [ ${1,,} = help ]; then
	echo "Just enter your username, duh!"
else
	echo "I don't know who you are but you're not the boss of me!"
fi

HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://www.google.com)
if [ "$HTTP_STATUS" != "200" ]; then
	echo "Google is up!";
	echo "hey";
	exit 0;
else
	echo "Google is down!"
fi
