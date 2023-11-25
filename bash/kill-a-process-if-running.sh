#!/bin/bash

PID=$(ps -ef | grep node | awk '{print $2}' | head -n 1)
if [ -z "$PID" ];
then
      echo "Process not running"
else
      echo "Killing process $PID"
      kill -9 $PID
fi