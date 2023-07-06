const button = document.querySelector("button")!;
const input1 = document.getElementById("num1")! as HTMLInputElement;
const input2 = document.getElementById("num2")! as HTMLInputElement;

function add1(num1: number, num2: number) {
  return num1 + num2;
}

button.addEventListener("click", function () {
  console.log(add1(+input1.value, +input2.value));
});

// -----------  HW 2  -----------
// Задайте правильні ts типи для класичних js;
let age: number;
age = 50;

let name1: string;
name1 = "Max";

let toggle: boolean;
toggle = true;

let empty: null;
empty = null;

let notInitialize: undefined;
notInitialize = undefined;

let callback: (a: number) => number;

callback = (a) => {
  return 100 + a;
};
// Задайте тип для змінної, в яку можна зберегти будь-яке значення.
let anything: any;
anything = -20;
anything = "Text";
anything = {};

// Виправте код зі змінною unknown, щоб у нього можна було зберегти змінну з текстом.
let some: unknown;
some = "Text";

let str1: string;

if (typeof some === "string") {
  str1 = some;
}

// Зробіть незмінний масив із суворо описаними типами. Масив для прикладу.
let person: [string, number];
person = ["Max", 21];

// Опишіть enum умову наступну: він повинен відображати статус завантаження. Завантажується (LOADING) та завантажена (READY).

enum LoadingStatus {
  LOADING,
  READY,
}

const page = {
  pageStatus: LoadingStatus.LOADING,
};

if (page.pageStatus === LoadingStatus.LOADING) {
  console.log("Page is loading");
}
if (page.pageStatus === LoadingStatus.READY) {
  console.log("Page is ready");
}

// Зробіть змінну, яка може приймати або рядок, або число.

let unionVer: string | number;
unionVer = "hi";
unionVer = 10;

// Зробіть змінну, яка може приймати лише одне значення з двох: 'enable' або 'disable'
let toggleSwitch: "enable" | "disable";
toggleSwitch = "enable";

// Вкажіть типи для наступних функцій

function showMessage(message: string): void {
  console.log(message);
}

function calc(num1: number, num2: number): number {
  return num1 + num2;
}

function customError(): never {
  throw new Error("Error");
}

// Створіть свій тип даних на основі наявних даних.
type DatabeseData = {
  title: string;
  likes: number;
  accounts: string[];
  status: "open" | "close";
  details?: {
    createAt: Date;
    updateAt: Date;
  };
};

const page1: DatabeseData = {
  title: "The awesome page",
  likes: 100,
  accounts: ["Max", "Anton", "Nikita"],
  status: "open",
  details: {
    createAt: new Date("2021-01-01"),
    updateAt: new Date("2021-05-01"),
  },
};

const page2: DatabeseData = {
  title: "Python or Js",
  likes: 5,
  accounts: ["Alex"],
  status: "close",
};
