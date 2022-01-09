"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const calcDisplayBalance = function (account) {
  const balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  account.balance = balance;
  labelBalance.textContent = `${balance} €`;
};

const calcDisplaySummary = function (account) {
  const income = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov);

  labelSumIn.textContent = `${income} €`;

  const out = account.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(out)} €`;
  const interest = account.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter((int) => int > 1)
    .reduce((acc, int) => acc + int);
  labelSumInterest.textContent = `${interest} €`;
};

const displayMovement = function (movements, sort=false) {
  containerMovements.innerHTML = "";
  const movs = sort?movements.slice().sort((a,b)=>a-b):movements
  movs.forEach(function (movement, index) {
    const type = movement > 0 ? "deposit" : "withdrawal";

    const htmlMov = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${movement}€</div>
        </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", htmlMov);
  });
};

///////////////////////////

const createUsername = function (accs) {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
const updateUI = function (acc) {
  console.log('update ui', acc)
  displayMovement(acc.movements);

  calcDisplaySummary(acc);

  calcDisplayBalance(acc);
};
createUsername(accounts);
let currentAccount;
btnLogin.addEventListener("click", function (event) {
  event.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    labelWelcome.textContent =
      "Welcome back," + currentAccount.owner.split(" ")[0];

    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    updateUI(currentAccount);
  }
});

const transferMoney = function () {};

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    currentAccount.username !== receiverAcc?.username
  ) {
    console.log("transfer valid");
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
    inputTransferTo.value = inputTransferAmount.value = '';
  }
});

btnLoan.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if(amount > 0&& currentAccount.movements.some(mov=>mov > amount*0.1)){
    currentAccount.movements.push(amount)
    updateUI(currentAccount)
    inputTransferTo.value = inputTransferAmount.value = '';

  }
})

btnClose.addEventListener('click', function(e){
  e.preventDefault();
  console.log('close account!')

  console.log(inputClosePin.value===currentAccount.pin, inputCloseUsername.value === currentAccount.username)

  if(+inputClosePin.value===currentAccount.pin && inputCloseUsername.value === currentAccount.username){
    console.log('valid close')
    const indx = accounts.findIndex(acc=>acc.username===inputCloseUsername.value)
    console.log('index:',indx)
    accounts.splice(indx,1)
    inputCloseUsername.value = inputClosePin.value = ''
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Login to get started'
  }

})
let sorted = false;
btnSort.addEventListener('click',function(e){
  e.preventDefault();

  sorted = !sorted
  displayMovement(currentAccount.movements,sorted)
  // sort = sort==='des'?'asc':'des'
  // currentAccount.movements.sort((a,b)=>sort==='des'?a-b:b-a)
  // updateUI(currentAccount)
})

/////////////////////////////
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);
/////////////////////////////////////
// currencies.forEach(function(value, key, map){
//     console.log(`${key}: ${value}`)
// })
//
// const currenciesUnique = new Set(['USD', 'GBP', 'USD','EUR','EUR']);
// console.log(currenciesUnique)
//
// currenciesUnique.forEach(function(key,value, map_){
//   console.log(`${key}: ${value}`)
// })

//
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// movements.reduce((acc,mov)=>)

// movements.reduce(function(acc,cul,i,arr){
//     console.log(`${i}: acc:${acc}, cul:${cul}`)
//     return acc + cul
// },1)

// const deposite = movements.filter(mov=>mov>0)
// console.log(deposite)
//
//
// const eurToUsd = 1.1;
//
// const movementsUsd = movements.map(mov=>mov*eurToUsd)
// console.log(movementsUsd)
///////////////////////////////////////////////////

//
// for(const movement of movements){
//   if(movement>0){
//     console.log(`You deposited ${movement}`)
//   }else{
//     console.log(`You withdrew ${Math.abs(movement)}`)
//   }
// }
// console.log('----------------------------')
// movements.forEach(function(movement,indx,arr){
//   console.log(arr)
//   if(movement>0){
//     console.log(`You deposited ${movement}`)
//   }else{
//     console.log(`You withdrew ${Math.abs(movement)}`)
//   }
// })

/////////////////////////////////////////////////

// const arr = ['a','b','c','d','e'];
// console.log(arr.slice(2));
// console.log(arr.slice(2,4));
// console.log(arr.splice(2))
// console.log(arr)
// console.log(arr);
// const arr2 = ['f','g','h','i','j'];
// console.log(arr2.at())

// console.log(arr2.reverse())
// console.log(arr2)

// challenge #2
// const test1 = [5,2,4,1,12];
//
// const calcAverageHumanAge = function(dogAge){
//   const humanAge = dogAge.map(age=>age<=2?2*age:16+age*4);
//   console.log(humanAge)
//   const adultDog = humanAge.filter(age=>age>=18)
//   console.log(adultDog)
//   adultDog.reduce((acc,cul,i,arr)=>{
//     return acc + cul/arr.length
//   },0)
// }

// calcAverageHumanAge(test1)

// const arrr1 = [[1,2,3],[4,6,[11,12,14]],7,8];
//
// console.log(arrr1.flat(2))
//
// const owners = ['jonas', 'zack', 'adam']
// console.log(owners.sort())
//
// console.log(movements)
// movements.sort((a,b)=>a-b)
// console.log(movements)
//
