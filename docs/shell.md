LS CP MV RM 
---

CHMOD CHOWN ✔️
---
- chmod +x <filename>      Execute access for every user.
- chmod 700 <filename>        Read(4), Write(2) and Execute(1) access for user(owner). ugo
- chmod +x <filename>         Execute access for the owner.

- sudo chown <username> <filename.txt>
- sudo chown -R <username>:<groupname> <directoryname>

GREP
---

SED
---

AWK
---

CURL
---
- curl <url>
- curl -X GET <url>
- curl -X POST <url> -d "name=value" (-d is the short form for --data)
- curl -X POST <url> -d ‘{“name”: “value”}’ -H “Content-Type=application/json” (-H is the short form for --header)
- curl -X DELETE <resource-url> -H “Private-Token:<private-token>”
- curl -X UPDATE <resource-url> -d ‘{“name”: “value”}’ -H “Content-Type=application/json&Private-Token=<private-token>”

WGET
---
- wget <file-url>
- wget -O <name> <file-url>
- wget -i <file-name> (Specify each file-to-be-downloaded link in a new line in the file)
- wget -P <path> <file-url>

APT ✔️
---
- sudo apt update
- sudo apt install <package_name>
- sudo apt remove <package_name>

UNAME ✔️
---
- uname -a

FREE ✔️
---
free -h

DF DU ✔️
---
- df -h
- df -h </home>

- du -sh <work>
- du -h -d 1 | sort -nr | head -n 10

PS ✔️
---
- ps -ef

PING ✔️
---
- ping <domain_name>
- ping <host_ip>

TRACEROUTE ✔️
---
- traceroute <domain_name>
- traceroute <host_ip>

TELNET ✔️
---
- telnet <host_ip> <port>

IP ✔️
---
- ip link (list all the network interfaces)
- ip addr (ip addr associated with network interfaces)

SSH ✔️
---
- ssh-keygen
- ssh <username>@<hostname>
- scp <local_file> <username>@<hostname>:<remote_directory>
- scp <username>@<hostname>:<remote_file> <local_directory>

NETSTAT SS
---

DIG
---

NSLOOKUP
---

FIND
---

TAR
---
