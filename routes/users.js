const express = require("express")
const accountRoutes = express.Router();
const fs = require('fs');

const dataPath = './data/users.json' 

// util functions 

const saveAccountData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}

const getAccountData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)    
}


// reading the data
accountRoutes.get('/account', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });

  // Read - get all accounts from the json file
accountRoutes.get('/account/list', (req, res) => {
  const accounts = getAccountData()
  res.send(accounts)
})

//Adding the data-Using the POST Method

  accountRoutes.post('/account/add', (req, res) => {
   
    var existAccounts = getAccountData()
    const newAccountId = Math.floor(10+ Math.random() * 90)
   
    existAccounts[newAccountId] = req.body
     
    console.log(existAccounts);

    saveAccountData(existAccounts);
    res.send(' Data added successfully');
})



// Update - using Put method
accountRoutes.put('/account/:id', (req, res) => {
   var existAccounts = getAccountData()

   fs.readFile(dataPath, 'utf8', (err, data) => {
    const accountId = req.params['id'];
    existAccounts[accountId] = req.body;

    saveAccountData(existAccounts);
    res.send('Data has been updated');
  }, true);
});


//delete - using delete method
accountRoutes.delete('/account/delete/:id', (req, res) => {
   fs.readFile(dataPath, 'utf8', (err, data) => {
    var existAccounts = getAccountData()

    const userId = req.params['id'];

    delete existAccounts[userId];  
    saveAccountData(existAccounts);
    res.send('Data has been deleted');
  }, true);
})
module.exports = accountRoutes