function add(num1: number, num2: number) {
  return num1 + num2;
}

add(1, 1);

// -----------   Lesson 2   -------------
//            прості типи
// Ім'я змінної і потім якого вона типу
let num: number;
let str: string;
let bool: boolean;
let empty1: null;
let notParam: undefined;

// І призначаємо
num = 10;
str = "Some string";
bool = true;
empty1 = null;
notParam = undefined;

let arrString: string[];

//              Складні типи
// Array
let arrString1: string[];
let arrNumber: number[];
let arrAny: any[]; // будь-який тип
let arrObj: { name: string }[]; // масив об'єктів

// Object
const obj: { name: string } = { name: "Alex" };
//Але тепер, якщо ми не вкажемо ім'я відразу, то отримаємо помилку.
const obj2: { name?: string } = {}; // ? поле не обов'язкове
obj2.name = "Alex";

const data: {
  id: number;
  price: number;
  permission: string[];
  details: {
    title: string;
    description?: string;
  };
  notNecessery?: number;
} = {
  id: 1,
  price: 10.99,
  permission: ["read", "write"],
  details: {
    title: "New product",
    description: "This is awesome product!",
  },
};

// ---------  tuple  ----------
let tupleArr: [string, number];
tupleArr = ["bob", 5];

// ---------  enum  ------------
enum Toggle {
  ENABLE,
  DISABLE,
}

const service = { status: Toggle.ENABLE };
if (service.status === Toggle.ENABLE) {
  console.log("It is active");
}

// ---------  union type  ------------

let union: number | string;
union = 5;
union = "bob";

function combine(param1: string | number, param2: string | number) {
  if (typeof param1 === "string" || typeof param2 === "string") {
    return param1.toString() + param2.toString();
  }
  return param1 + param2;
}
console.log(combine("str1", "str2"));

// ---------  literal type  ------------

let active: "start" | "end";
active = "end";

const fruit: string[] = [];

function workWithArr(arr: string[], value: string, action: "add" | "delete") {
  if (action === "add") {
    arr.push(value);
  } else {
    const index = arr.indexOf(value);
    if (index !== -1) {
      arr.splice(index, 1);
    }
  }
  return arr;
}

workWithArr(fruit, "Banana", "add");
workWithArr(fruit, "Melon", "add");
workWithArr(fruit, "Pear", "add");
workWithArr(fruit, "beer", "add");
workWithArr(fruit, "beer", "delete");

console.log(fruit);

// ---------  function type + callback  ------------
function calc1(
  num1: number,
  num2: number,
  callback: (arg1: number, arg2: number) => number
) {
  return callback(num1, num2);
}

function foo(num1: number, num2: number) {
  return num1 + num2;
}
const result = calc1(2, 5, foo);

console.log("result", result);

// ---------  custom types ------------
type PersonType = {
  name: string;
  age?: number;
};
const person1: PersonType = {
  name: "Alex",
  age: 30,
};
const person2: PersonType = {
  name: "Ann",
};
// ---------  custom types + readonly------------
type PersonReadonly = {
  readonly name: string;
  age?: number;
};
const person01: PersonReadonly = {
  name: "Alex",
  age: 30,
};
const person02: PersonReadonly = {
  name: "Ann",
};
// змінити не можна вже
// person01.name = "add";

// ---------  custom types + методи (не сильно бажано)------------
type PersonTypeNew = {
  name: string;
  age?: number;
  showName: () => void;
};
const person7: PersonTypeNew = {
  name: "Alex",
  age: 30,
  showName() {
    console.log(this.name);
  },
};
const person77: PersonTypeNew = {
  name: "Ann",
  showName() {
    console.log(this.name);
  },
};
person7.showName();
person77.showName();
