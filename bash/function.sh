#!/bin/bash

printString(){
	echo $1
	if [ ${1} = ritesh ]; then
		return 0
	else
		return 1
	fi
}
printString $1

if [ $? = 0 ]; then
	echo "right user"
else
	echo "wrong user"
fi
