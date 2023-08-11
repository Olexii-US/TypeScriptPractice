//  Advanced types
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

//  ---------------------------------------
//  ------------- optional chaining -------------
//  ---------------------------------------
// викор. поля яких нема в об'єкті
interface Person003 {
  name: string;
  additionalInfo?: {
    someInfo: string;
  };
}

const user003: Person003 = {
  name: "John",
};

// user003.additionalInfo.someInfo
//так не працює, бо TS не знає чи там є щось, треба через іf або ?
user003?.additionalInfo?.someInfo;

//  ---------------------------------------
//  ------------- nullish coalescing -------------
//  ---------------------------------------
// нульове злиття // ?? спарьов лише коли null чи underfined
const userInput = "";
const srote = userInput || "DEFAULT";
console.log(srote); // буде "DEFAULT"
// а якщо ми хочемо "", то є ?? - тепер дефолт буде лише при null чи underfined

const userInput1 = "";
const srote1 = userInput ?? "DEFAULT";
console.log(srote1); // буде ""

//  ---------------------------------------
//  ---------- function overloads ----------
//  ---------------------------------------
// перегрузка операторів // уточнення типу для функції

function add1(a: number, b: number): number;
function add1(a: string, b: string): string;
function add1(a: string | number, b: string | number) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}
// але TS не знає що ферне ця функція, того перед нею уточнюємо

//  ---------------------------------------
//  ---------------------------------------
//  ---------- Generics ---------- узагальн. тип- -----
//  ---------------------------------------
// щоб наприклад зберігати масив чисел і строк

let arr: Array<string | number>; // повний запис
let arr1: (string | number)[]; // короткий запис, але не прац. з промісами

arr = [5, "hi"];

const promise1 = new Promise((resolve) => {
  resolve("string");
});
// promise1.then((data) => {
//   // data unnown
// });

// того треба так:
const promise: Promise<string> = new Promise((resolve) => {
  resolve("string");
});
promise.then((data) => {});

//  ---------------------------------------
//  ---------- Generics function method ----------
//  ---------------------------------------
//
function merge(objA: object, objB: object) {
  return Object.assign({}, objA, objB);
}

const toMerge1 = {
  name: "Ann",
};

const toMerge2 = {
  age: 5,
};

const merged = merge(toMerge1, toMerge2);

// merged.name;
//так не працює, бо не знає що за обєкти
// тому або:
const merged1 = merge(toMerge1, toMerge2) as { name: string; age: number }; //але це поганий варіант, бо треба увесь час вказувати при возові
merged1.name;

// тому краще дженеріки:
function mergeGeneric<T, U>(objA: T, objB: U) {
  return Object.assign({}, objA, objB);
}

const toMerge01 = {
  name: "Ann",
};

const toMerge02 = {
  age: 5,
};

const mergedGeneric = mergeGeneric(toMerge1, toMerge2);
mergedGeneric.name;

// ще можна вказати тип при визові дженеріка
function mergeGeneric1<T, U>(objA: T, objB: U) {
  return Object.assign({}, objA, objB);
}

type Persom = {
  name: string;
};
type AdditionalFields = {
  age: number;
};

const toMerge011 = {
  name: "Ann",
};

const toMerge021 = {
  age: 5,
};

const mergedGeneric1 = mergeGeneric1<Persom, AdditionalFields>(
  toMerge1,
  toMerge2
);
mergedGeneric.name;

//  ---------------------------------------
//  ---------- Extends ----------
//  ---------------------------------------
// для обмеження типу, розшируювати дженеріки від якого типу унаслідуються
// зазвич букви T та U

function mergeExt<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign({}, objA, objB);
} // extends object щоб можнв було передати лише об'єкт, а не строку напримклад

const toMergeExt1 = {
  name: "Ann",
};

const toMergeExt2 = {
  age: 5,
};

const mergedExt = mergeExt(toMergeExt1, toMergeExt2);
// const mergedExtString = mergeExt("hi", "hello"); // error
mergedExt.name;

///////// ---- приклад 2

// function getLength(str): number {
//   return str.length;
// } // так не працює, можна вказати, що str:string, але тоді з масивом працювати не буде, того треба інтерфейс і дженеріки
interface ILength {
  length: number;
}

function getLength<T extends ILength>(str: T): number {
  return str.length;
}
getLength("string");
getLength(["string"]);
// getLength(5); error
const obj1 = {
  length: 10,
};
getLength(obj1); //все ок бо є поле length

//  ---------------------------------------
//  --------------- keyof---------------
//  ---------------------------------------
// чи є якесь поле в цьому типі чи об'єкті
function extractValue<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key];
}
const field = extractValue({ name: "ann" }, "name");

//  ---------------------------------------
//  --------------- Generic Classes---------------
//  ---------------------------------------
// стейти і пропси в React так передаються теж

class DataStore<T> {
  private data: T[] = [];

  addItem(item: T): void {
    this.data.push(item);
  }
  getItems(): T[] {
    return this.data;
  }
}

interface IPersonStore {
  name: string;
}

const storeUsers = new DataStore<IPersonStore>();

storeUsers.addItem({
  name: "max",
});
storeUsers.addItem({
  name: "ann",
});
console.log(storeUsers.getItems());

const ageStore = new DataStore<number>();

ageStore.addItem(21);
ageStore.addItem(30);

//  --------------Utility types---------------
//  --------------- Partial---------------
//  -не часто--------------------------------------
// якщо я обовязкові поля але не можемо зразу їх заповнити
interface IUser {
  name: string;
  age: number;
}

function createPerson(name: string): IUser {
  const person: Partial<IUser> = {
    name,
  };
  person.age = 20;

  return person as IUser;
}

//  --------------Utility types---------------
//  --------------- Readonly---------------
//  ---------------------------------------
// можна створ наприклад незмінний масив

const arr002: Readonly<string[]> = ["One", "Two", "Three"];

// arr002.push("four") // не працює
// arr002.pop("Two");// не працює
// так само і з обєктом і з іншиим

//  --------------Utility types---------------
//  --------------- Pick---------------
//  ---------------------------------------
// якщо треба частини від типу
interface Page {
  title: string;
  annotation: string;
  numberPage: number;
}

const pageAnnotation: Pick<Page, "annotation" | "numberPage"> = {
  annotation: "small page",
  numberPage: 5,
};
