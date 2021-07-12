# Supply-Chain-Management---BlockChain-UseCase
# Supply Chain Management System

“Supply Chain Management”, Using this supply chain management a user can view the journey of mobile phone from the manufacturer to it's user. Through blockchain technology we can create a trusted, transparent system of this supply chain.

### The API performs following functions: 

  - Registering Stakeholders(Manufacturer, Distributor and User) by providing Name, Password and type. It returns UserID.
  - Login user with the User Id and Password.
  - Register the mobile for the auction.
  - View the mobile and Track the owners and journey in the supply chain. 
  - Transferring the ownership of the mobiles.



### Tech Stack

This supply chain management system uses multiple technologies:

* [Ethereum Blockchain](https://geth.ethereum.org/downloads/)- Ethereum Blockchain Stack (Tool used: Geth) 
* [VS-Code](https://code.visualstudio.com/) - Text Editor for writing code
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [web3.js](https://web3js.readthedocs.io/en/1.0/getting-started.html) - Ethereum Javascript API
* [jQuery] 

And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.

### Installation

[Node.js](https://nodejs.org/) v6+ to run.
```sh
$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```
Installing Ethereum Package:

```sh
$ sudo apt-get install software-properties-common
$ sudo add-apt-repository -y ppa:ethereum/ethereum
$ sudo apt-get update
$ sudo apt-get install ethereum
```

### Testing 

Want to contribute? Great!
Try these commands to work on this: 

Open your favorite Terminal and run these commands.

#### Create local chain:

```sh
$ geth –rpc –rpcport "8085" --rpcapi=”db,eth,net,web3,personal” --datadir data –networkid 123 –nodiscover –maxpeers 0 init genesis.json
```
#### Launch Geth Console:

```sh
$ geth –rpc –rpcport "8085" --rpcapi="db,eth,net,web3,personal" --datadir data –networkid 123 –nodiscover –maxpeers 0 console
```

#### Create new account (in geth console):
```
personal.newAccount(“passphrase”)
```
#### Mine some ether
```
miner.setEtherbase(personal.listAccounts[0]); miner.start()
```
#### Deploy the smart contract
```
loadScript(“mobilechain.js”)
```
P.S.: `mobilechain.js` file is in the directory and it's the web3 deploy form of smart contract.
#### Unlock Account 0th using this syntax
```
personal.unlockAccount(address, “password”, timeout)
```
P.S.: You can also use `eth.accounts[0]` in place of address for the 0th account in the geth.

#### Running node server instance using another terminal window
```sh
$ nodemon server.js
```
P.S.: Here I'm using nodemon for testing purpose.

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:5000
```

### Todos

 - Write MORE Tests
 - Be happy to add functionalities and create PRs.

License
----

GNU


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
