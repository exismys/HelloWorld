if git diff --quiet file1 file2; then
    echo "Files are the same, no action required"
else
    echo "Files are different, executing commands"
    cat file1
    cat file2
fi
