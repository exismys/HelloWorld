#!/bin/bash

MY_ARRAY=(one two three four five)

for item in ${MY_ARRAY[@]}; do
       echo -n $item | wc -c;
done
