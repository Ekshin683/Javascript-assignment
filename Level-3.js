const bank = {
    name: "bank of India",
    accounts: [],
    nextaccount: 1001,
    totalloans: 0
}


function createaccount(name, type, balance){
    if(balance < 0){
         console.log("Invalid balance")
         return;
    }

    if(type === "savings" && balance < 1000){
        console.log("savings can't create without 1000 minimum balance");
        return;
    }
    if(type !== "savings" && type !== "current"){
        console.log("Invalid Account");
        return;
    }

    const newaccount = {
        accountNumber: bank.nextaccount++,
        name,
        type,
        balance,
        loan:0,
        transactions:[]
    }
    bank.accounts.push(newaccount);

    console.log("Account created successfully");
}

function find(accountNumber){
    return bank.accounts.find(
        acc => acc.accountNumber === accountNumber
    );
}


function deposit(accountNumber, amount){
    const acc = find(accountNumber);
    if(!acc){
        console.log("account not found");
        return;
    }
    if(amount <= 0){
        console.log("deposit can't possible");
        return;
    }
    acc.balance += amount;
    acc.transactions.push({
        type:"DEPOSIT",
        amount,
        date: new Date().toLocaleDateString()
    });

    console.log(`${amount} deposited successfully to ${accountNumber}`)
}

function withdraw(accountNumber, amount){
    const acc = find(accountNumber);

    if(!acc){
        console.log("Account not found");
        return;
    }

    if(amount <= 0){
        console.log("Invalid amount");
        return;
    }

    if(acc.type === "savings" && acc.balance-amount < 1000){
        console.log("savings must maintain 1000 minimum");
        return;
    }

    if(amount > acc.balance){
        console.log("Insufficeient balance");
        return;
    }

    acc.balance -= amount;
    acc.transactions.push({
        type: "WITHDRAW",
        amount,
        date: new Date().toLocaleString()
    });
    console.log(`${amount}withdraw successfully from ${accountNumber}`)
}

function applyYearlyInterest(accountNumber){
    const acc = find(accountNumber);
    if(!acc) {
        console.log("Account not found");
        return;
    }
    if(acc.type !== "savings"){
        console.log("Interest only for savings account");
        return;
    }

    const interest = acc.balance * 0.04;
    acc.balance += interest;
    acc.transactions.push({
        type: "INTEREST",
        amount: interest,
        date: new Date().toLocaleString()
    });

    console.log(`${interest} interest added to account ${accountNumber}`);
}


function Loan(accountNumber, amount){
    const acc = find(accountNumber);

    if(!acc){
        console.log("Account not found");
        return;
    }

    if(amount <= 0){
        console.log("Invalid loan");
        return;
    }
    const maxloan = acc.balance * 5;
    if(amount > maxloan){
        console.log("Loan can't possible");
        return;
    }

    acc.loan += amount;
    acc.balance += amount;
    bank.totalloans += amount;

    acc.transactions.push({
        type: "Loan",
        amount,
        date: new Date().toLocaleString()
    })
    console.log(`Loan of ${amount} approved`);
}

function showtransactions(accountNumber){
    const acc = find(accountNumber)

    if(!acc){
        console.log("Account not found");
        return;
    }

    console.log(`\n Transactions for ${accountNumber}`);
    acc.transactions.forEach(t => console.log(t));
}

function totalbankbalance(){
    const total = bank.accounts.reduce(
        (sum,acc) => sum + acc.balance,
        0
    );
    console.log(`Total Bank Balance: ${total}`)
}

function totalBankLoans(){
    console.log(`Total loans: ${bank.totalloans}`)
}


createaccount("Ekshin","savings", 5000);
createaccount("Ajay","current", 2000);

deposit(1001, 3000);
withdraw(1001, 2000);

applyYearlyInterest(1001);

Loan(1001, 10000);

showtransactions(1001);
totalbankbalance();
totalBankLoans();