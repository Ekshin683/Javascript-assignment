const account = {
    _id: 12301238,
    name: "EKshindeep Gurramkonda",
    balance: 1000,
    transactions:[]
}

function deposit(amount){
    if(amount <= 0){
        console.log("Invalid amount");
        return;
    }
    account.balance += amount;
    account.transactions.push({
        type:"deposit",
        amount: amount,
        date: new Date().toLocaleString()
    })
    console.log("Deposit Successful", +account.balance);
}

function withdraw(amount){
    if(amount <= 0){
        console.log("Invalid amount");
        return;
    }

    if(amount > account.balance){
        console.log("Insufficient balance");
        return;
    }

    account.balance -= amount;
    account.transactions.push({
        type:"withdrawal",
        amount: amount,
        date: new Date().toLocaleString()
    })
    console.log("Withdrawal Successful",+account.balance);
}

function getBalance(){
    console.log("Balance:",+account.balance);
}



deposit(500);
deposit(200);
withdraw(200);
getBalance();
console.log(account);