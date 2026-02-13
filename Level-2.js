const bank = {
    Name:"Bank of India",
    accounts:[],
    acountnum: 1001
}

function createAccount (name, balance=0){
    if(balance < 0){
        console.log("balance can't be negative");
        return;
    }
    
    const newaccount = {
        accountnumber: bank.acountnum++,
        name:name,
        balance:balance,
        transactions: []
    };

    bank.accounts.push(newaccount);
    console.log(`Account Created ${name}`);
}

function find(accountnumber){
    return bank.accounts.find(acc => acc.accountnumber === accountnumber);
}

function deposit(accountnumber, amount){
    const account = find(accountnumber);

    if(!account){
        console.log("Invalid Account");
        return;
    }

    if(amount <= 0){
        console.log("Invalid Amount");
        return;
    }

    account.balance += amount;

    account.transactions.push({
        type:"deposit",
        amount,
        date: new Date().toLocaleString()
    });
    console.log(`${amount} deposited in to account ${accountnumber}`);
}

function withdraw(accountnumber, amount){
    const account = find(accountnumber);

    if(!account){
        console.log("account not found");
        return;
    }
    if(amount < 0){
        console.log("withdraw can't possible");
    }
    if(account.balance < amount){
        console.log("Insufficient balance");
    }

    account.balance -= amount;

    account.transactions.push({
        type:"withdraw",
        amount,
        date: new Date().toLocaleString()
    })
    console.log(`${amount} successfully withdraw from account ${accountnumber}`);
}

function transfer(fromaccountnum,toaccountnum,amount){
    const fromacc = find(fromaccountnum);
    const toacc = find(toaccountnum);

    if(!fromacc || !toacc){
        console.log("Invalid accounts");
    }

    if(amount <= 0) console.log("Invalid amount");

    if(amount > fromacc.balance) console.log("Insufficient balance");

    fromacc.balance -= amount;
    toacc.balance += amount;

    fromacc.transactions.push({
        type:"send",
        amount,
        to: toaccountnum,
        date: new Date().toLocaleString()
    })

    toacc.transactions.push({
        type:"Recive",
        amount,
        from: fromaccountnum,
        date: new Date().toLocaleString()
    })

    console.log(`${fromaccountnum} to ${toaccountnum} transaction successful`);
}

function showallaccounts(){
    console.log("All Accounts");
    bank.accounts.forEach(acc => {
        console.log(`A/C: ${acc.accountnumber} | Name: ${acc.name} | Balance:${acc.balance}`)
    })
}

createAccount("Ekshin",9000);
createAccount("Ajay",100);

deposit(1001,2000);
// deposit(1002,1000);
withdraw(1002,50);

transfer(1001,1002,6000);

showallaccounts();


