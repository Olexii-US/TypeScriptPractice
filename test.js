function add(num1, num2) {
  return num1 + num2;
}
add(1, 1);
// -----------   Lesson 2   -------------
//            прості типи
// Ім'я змінної і потім якого вона типу
var num;
var str;
var bool;
var empty1;
var notParam;
// І призначаємо
num = 10;
str = "Some string";
bool = true;
empty1 = null;
notParam = undefined;
var arrString;
//              Складні типи
// Array
var arrString1;
var arrNumber;
var arrAny; // будь-який тип
var arrObj; // масив об'єктів
// Object
var obj = { name: "Alex" };
//Але тепер, якщо ми не вкажемо ім'я відразу, то отримаємо помилку.
var obj2 = {}; // ? поле не обов'язкове
obj2.name = "Alex";
var data = {
  id: 1,
  price: 10.99,
  permission: ["read", "write"],
  details: {
    title: "New product",
    description: "This is awesome product!",
  },
};
// ---------  tuple  ----------
var tupleArr;
tupleArr = ["bob", 5];
// ---------  enum  ------------
var Toggle;
(function (Toggle) {
  Toggle[(Toggle["ENABLE"] = 0)] = "ENABLE";
  Toggle[(Toggle["DISABLE"] = 1)] = "DISABLE";
})(Toggle || (Toggle = {}));
var service = { status: Toggle.ENABLE };
if (service.status === Toggle.ENABLE) {
  console.log("It is active");
}
// ---------  union type  ------------
var union;
union = 5;
union = "bob";
function combine(param1, param2) {
  if (typeof param1 === "string" || typeof param2 === "string") {
    return param1.toString() + param2.toString();
  }
}
console.log(combine("str1", "str2"));
// ---------  literal type  ------------
var active;
active = "end";
var fruit = [];
function workWithArr(arr, value, action) {
  if (action === "add") {
    arr.push(value);
  } else {
    var index = arr.indexOf(value);
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
function calc(num1, num2, callback) {
  return callback(num1, num2);
}
function foo(num1, num2) {
  return num1 + num2;
}
var result = calc(2, 5, foo);
console.log("result", result);
var person1 = {
  name: "Alex",
  age: 30,
};
var person2 = {
  name: "Ann",
};
var person01 = {
  name: "Alex",
  age: 30,
};
var person02 = {
  name: "Ann",
};
var person7 = {
  name: "Alex",
  age: 30,
  showName: function () {
    console.log(this.name);
  },
};
var person77 = {
  name: "Ann",
  showName: function () {
    console.log(this.name);
  },
};
person7.showName();
person77.showName();
