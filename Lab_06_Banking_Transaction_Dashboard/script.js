const KEY='lab6BankDemo';let account={balance:0,history:[]};
try{const saved=JSON.parse(localStorage.getItem(KEY));if(saved&&Number.isFinite(saved.balance)&&Array.isArray(saved.history))account=saved;}catch(e){}
const money=n=>'Tk '+n.toLocaleString('en-BD',{minimumFractionDigits:2,maximumFractionDigits:2});
function save(){localStorage.setItem(KEY,JSON.stringify(account));}
function render(){document.getElementById('balance').textContent=money(account.balance);document.getElementById('history').innerHTML=account.history.slice().reverse().map(t=>`<tr><td>${t.date}</td><td>${t.type}</td><td>${money(t.amount)}</td><td>${money(t.balance)}</td></tr>`).join('')||'<tr><td colspan="4">No transactions yet.</td></tr>';}
function transact(type){const amount=+document.getElementById('amount').value,msg=document.getElementById('message');if(!Number.isFinite(amount)||amount<=0){msg.textContent='Enter an amount greater than zero.';return;}if(type==='Withdraw'&&amount>account.balance){msg.textContent='Insufficient balance. Negative balance is not allowed.';return;}account.balance=+(account.balance+(type==='Deposit'?amount:-amount)).toFixed(2);account.history.push({date:new Date().toLocaleString(),type,amount,balance:account.balance});save();render();msg.textContent=type+' successful.';document.getElementById('amount').value='';}
function deposit(){transact('Deposit');}function withdraw(){transact('Withdraw');}
function clearHistory(){account.history=[];save();render();document.getElementById('message').textContent='History cleared.';}
render();