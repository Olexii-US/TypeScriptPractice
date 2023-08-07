//  ---------------------------------------
//  --------- intersection types ----------
//  ---------------------------------------

// об'єднання 2 типів

// type Admin = {
//   name: string;
//   privileges: string[];
// };

// type User = {
//   name: string;
//   startDate: Date;
// };

// type AdminUser = Admin & User;
// const user1: AdminUser = {};

//------------------------------
// об'єднання з інтерфейсами

interface Admin {
  name: string;
  privileges: string[];
}

interface User {
  name: string;
  startDate: Date;
}

interface AdminUser extends Admin, User {}

//  ---------------------------------------
//  ------------- type guards -------------
//  ---------------------------------------
// коли  TS точно не знає що в нас

type ComplexTypes = string | number;

function combine(a: ComplexTypes, b: ComplexTypes) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

//------якщо об'єкт--
type AdminOrUser = Admin | User;

function showFields(el: AdminOrUser) {
  if ("startDate" in el) {
    console.log(el.startDate);
  }
  if ("privileges" in el) {
    console.log(el.privileges);
  }
  console.log(el.name);
}

//------якщо клас--

abstract class Guy {
  constructor(public name: string) {}
}

class Good extends Guy {
  advice() {
    console.log("advice");
  }
}
class Bad extends Guy {
  insult() {
    console.log("insult");
  }
}

const good = new Good("Alex");
const bad = new Bad("John");

function guys(user: Guy) {
  if (user instanceof Good) {
    user.advice;
  }
  if (user instanceof Bad) {
    user.insult;
  }
}

//  ---------------------------------------
//  ------------- type casting -------------
//  ---------------------------------------
// коли треба вказати уточнення для типу

// const input = document.getElementById("num1")!;
// // так не буде працювати
// input.value;

//---варіант1 - дженеріки (не завжди добре)
// const input = <HTMLInputElement>document.getElementById("num1")!;
// input.value;

//---варіант2 - через as
const input = document.getElementById("num1") as HTMLInputElement;
input.value;

//---варіант3 - можна уточнити пізніше
const input01 = document.getElementById("num1");
if (input01) {
  (input01 as HTMLInputElement).value;

  // або можна створ константи
  const newInput = input01 as HTMLInputElement;
  newInput.value;
}

//  ---------------------------------------
//  ------------- index properties -------------
//  ---------------------------------------
// коли не знаємо які можуть бути поля в об'єкті

interface Person001 {
  name: string;
  [x: string]: string;
  // або можна не х, а el/element
}
const newPerson: Person001 = {
  name: "John",
  gender: "man",
  country: "Ukraine",
};

// але якщо зявляться цифри, то:

interface Person002 {
  name: string;
  age: number;
  [x: string]: string | number;
  // або можна any
  //   [x: string]: any;
}
const newPerson2: Person002 = {
  name: "John",
  gender: "man",
  age: 35,
  country: "Ukraine",
};
