# Searching for text in linux shell

## `grep` command

- Print all the lines containing a certain text in some file

    `grep "<search-text> <file>`

- Search for a string in your current directory and all other subdirectories

    `grep -r "<some-text>" <some-file>`

- Ignore case

    `grep -i "<some-text>" <some-file>`

- Count the matching lines

    `grep -c "<some-text>" <some-file>`
