#!/bin/bash

PID=$(ps -ef | grep node | grep -v grep | awk '{print $2}')
if [ -z "$PID" ];
then
      echo "Process not running"
else
      echo "Killing process $PID"
      kill -9 $PID
fi