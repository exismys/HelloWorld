Steps to setup a node-express environment:

1. Run "npm init" to create the basic skeleton for your node project and package.json file which keeps track of all the dependencies (We can use "npm install" to install all the dependencies mentioned in package.json).

2. Run "npm install express" to install expressjs framework.

3. Run "npm install anyPackageName --save-dev" to install the package as dev dependency.

4. Run "node server.js" to start your server (Alternatively, you can setup custom commands in "scripts" section of package.json).