'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};


const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
const displayMovement = function (movements) {
    containerMovements.innerHTML = '';
    movements.forEach(function(movement, index){
        const type = movement>0?'deposit':'withdrawal';

        const htmlMov = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${index+1} ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${movement}</div>
        </div>`;
        containerMovements.insertAdjacentHTML('afterbegin', htmlMov)
    })

}

displayMovement(account1.movements)


///////////////////////////

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
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


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];


const eurToUsd = 1.1;

const movementsUsd = movements.map(mov=>mov*eurToUsd)
console.log(movementsUsd)
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

