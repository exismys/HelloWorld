#!/bin/bash

case ${1,,} in
	ritesh | administrator)
		echo "Hello, you are the boss here!"
		;;
	help)
		echo "Just enter your username!"
		;;
	*)
		echo "You are not the boss"

esac
