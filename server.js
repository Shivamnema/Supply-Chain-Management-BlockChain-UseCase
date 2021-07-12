var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var express = require('express');
var app = express();
var cors = require('cors');
var Web3 = require('web3');
var web3 = new Web3();
var path = require('path');
var http = require('http');

web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8085"));

var abi = [{ "constant": false, "inputs": [{ "name": "id", "type": "uint256" }, { "name": "pass", "type": "bytes32" }, { "name": "types", "type": "bytes32" }], "name": "login", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_mid", "type": "uint256" }], "name": "getLength", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "id", "type": "uint256" }], "name": "getMobile", "outputs": [{ "name": "", "type": "bytes32" }, { "name": "", "type": "bytes32" }, { "name": "", "type": "address" }, { "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "sid", "type": "uint256" }, { "name": "types", "type": "bytes32" }, { "name": "name", "type": "bytes32" }, { "name": "specs", "type": "bytes32" }], "name": "setMobile", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "totMobile", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "u_id1", "type": "uint256" }, { "name": "u_id2", "type": "uint256" }, { "name": "_mid", "type": "uint256" }], "name": "transferOwnershipOfMobile", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "id", "type": "uint256" }], "name": "getstakeholders", "outputs": [{ "name": "", "type": "bytes32" }, { "name": "", "type": "bytes32" }, { "name": "", "type": "address" }, { "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "mid", "type": "uint256" }, { "name": "id", "type": "uint256" }], "name": "gettrack", "outputs": [{ "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_name", "type": "bytes32" }, { "name": "pass", "type": "bytes32" }, { "name": "Add", "type": "address" }, { "name": "typeuser", "type": "bytes32" }], "name": "setstakeholders", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }];
var contadd = "0x6e68238d5fb0bc6719f69944ed27fcdbdda710cd";

var con = web3.eth.contract(abi).at(contadd);

app.use(cors());
app.use(bodyparser.json()); //utilizes the body-parser package
app.use(express.urlencoded()); //Parse URL-encoded bodies

app.use(express.static(path.join(__dirname, '/public')));

// API for the functions in the Smart Contract.
app.post('/setstackholder', function (req, res) {
	// try{
	var usr = req.body.username;
	var pass = req.body.password;
	var addr = web3.personal.newAccount("qwerty");
	var type = req.body.usertype;
	var t = con.setstakeholders.call(usr, pass, addr, type, { from: web3.eth.accounts[0], gas: 0x493E0 });
	var p = con.setstakeholders(usr, pass, addr, type, { from: web3.eth.accounts[0], gas: 0x493E0 });
	web3.eth.sendTransaction({ from: web3.eth.coinbase, to: addr, value: web3.toWei(20, "ether") })

	console.log("U:", usr, " :", pass, ": ", type);
	var test;
	web3.eth.filter("latest").watch(function (error, result) {
		if (web3.eth.getTransaction(p).blockNumber !== null) {
			test = t;
		}
	});
	if (t >= 100) {
		res.send("Registeration Successful " + " Note Your StackHolder-ID: " + t + "addrs: " + addr);
	} else {
		res.send("Registeration Unsuccessful");
	}
	// }catch(error){
	// 	res.send("Some Error Occured ! :(");
	// }
});

app.post('/loginstackholder', function (req, res) {
	try {
		var types = req.body.typeofstk;
		var stkid = parseInt(req.body.sid);
		var password = req.body.pass;
		var p = con.login.call(stkid, password, types);
		console.log("T:", types, " :", stkid, " ", password, "P: ", p);
		if (p == true) {
			let a = "Login Successful. " + "Please Note Your Address: " + web3.eth.accounts[0];
			res.send(a);
		} else {
			res.send("Login Failed. Please try again.");
		}

	} catch (error) {
		res.send("Some error occured. :(");
	}
});

app.post('/regmobile', function (req, res) {
	try {
		let id = parseInt(req.body.sid);
		let typeofphone = req.body.phonetype;
		let _namephone = req.body.namephone;
		let _specs = req.body.specs;
		// console.log(web3.personal.unlockAccount(address1, "qwerty"));

		var p = con.setMobile.call(id, typeofphone, _namephone, _specs, { from: web3.eth.accounts[0], gas: 0x493E0 });
		var t = con.setMobile(id, typeofphone, _namephone, _specs, { from: web3.eth.accounts[0], gas: 0x493E0 });

		if (t >= 100) {
			res.send("Mobile is Registered.Note the ID: " + p);
		} else {
			res.send("Not able to register.")
		}
	} catch (error) {
		res.send("Some error occured.")
	}
});


app.post('/track', function (req, res) {
	try {
		let _mid = req.body.mid;
		var length = con.getLength.call(_mid);
		var obj = {};
		var a = [];
		obj.a = a;
		for (let i = 0; i < length; i++) {
			let p = con.gettrack.call(_mid, i);
			var m = {
				"mobileid": p[0],
				"ownerid": p[1],
				"owner": p[2]
			}
			obj.a.push(m);
		}
		res.send(obj);
	} catch (error) {
		res.send("Some error occured. :(");
	}
});

app.post('/transferowner', function (req, res) {
	// try {
	let _stk1 = parseInt(req.body.stk1);
	let a = con.getstakeholders.call(_stk1);
	let address1 = a[2];
	console.log(address1)
	console.log(web3.personal.unlockAccount(address1, "qwerty"));

	let _stk2 = parseInt(req.body.stk2);
	let _mid = parseInt(req.body.mid);
	console.log(_stk1, _stk2, _mid);
	let p = con.transferOwnershipOfMobile.call(_stk1, _stk2, _mid, { from: address1, gas: 0x493E0 });
	let t = con.transferOwnershipOfMobile(_stk1, _stk2, _mid, { from: address1, gas: 0x493E0 });
	console.log()
	if (p == true)
		res.send("success: " + p);
	else
		res.send("Not Transfered. :( " + p)
	// } catch (error) {
	// 	res.send("Some error occured. :(");
	// }
});

app.post('/mobiles', (req, res) => {
	let _mid = parseInt(req.body.mid);
	let m = con.getMobile.call(_mid);
	let mobile = [];
	mobile.push(web3.toAscii(m[0]).replace(/\0/g, ''));
	mobile.push(web3.toAscii(m[1]).replace(/\0/g, ''));
	mobile.push(m[2]);
	mobile.push(web3.toAscii(m[3]).replace(/\0/g, ''));

	res.send(mobile);
});

app.post('/getstakeholder', (req, res) => {
	let _uid = req.body.uid;

	let p = con.getstakeholders.call(_uid);

	res.send(web3.toAscii(p[0]).replace(/\0/g, '') + "Pass: " + web3.toAscii(p[1]).replace(/\0/g, '') +
		"Address: " + (p[2]) + "Type: " + web3.toAscii(p[3])).replace(/\0/g, '');
})

app.post('/getmobile', (req, res) => {
	let _mid = req.body.mid;

	let p = con.getMobile.call(_mid);

	res.send(p);
});


// Server
var server = app.listen(5000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log("Example app listening at http://%s:%s", host, port);

});