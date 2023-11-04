### df -h
- disk free, human readable

### du -h -d 1 | sort -rh | head -n 10
- disk usage, human readable, directory depth, sort in non increasing, first 10
- -d 1 ~ --max-depth=1

### find . -type f -name "String*" ! -name "String-0.67.36_qa2_june.war" -exec rm {} +
- find, current directory, file type, starting with name String, exclude, execute with rm
