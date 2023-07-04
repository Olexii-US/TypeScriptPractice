var button = document.querySelector("button");
var input1 = document.getElementById("num1");
var input2 = document.getElementById("num2");
function add(num1, num2) {
    return num1 + num2;
}
button.addEventListener("click", function () {
    console.log(add(+input1.value, +input2.value));
});
// -----------  HW 2  -----------
// Задайте правильні ts типи для класичних js;
var age;
age = 50;
var name1;
name1 = "Max";
var toggle;
toggle = true;
var empty;
empty = null;
var notInitialize;
notInitialize = undefined;
var callback;
callback = function (a) {
    return 100 + a;
};
// Задайте тип для змінної, в яку можна зберегти будь-яке значення.
var anything;
anything = -20;
anything = "Text";
anything = {};
// Виправте код зі змінною unknown, щоб у нього можна було зберегти змінну з текстом.
var some;
some = "Text";
var str;
if (typeof some === "string") {
    str = some;
}
// Зробіть незмінний масив із суворо описаними типами. Масив для прикладу.
var person;
person = ["Max", 21];
// Опишіть enum умову наступну: він повинен відображати статус завантаження. Завантажується (LOADING) та завантажена (READY).
var LoadingStatus;
(function (LoadingStatus) {
    LoadingStatus[LoadingStatus["LOADING"] = 0] = "LOADING";
    LoadingStatus[LoadingStatus["READY"] = 1] = "READY";
})(LoadingStatus || (LoadingStatus = {}));
var page = {
    pageStatus: LoadingStatus.LOADING,
};
if (page.pageStatus === LoadingStatus.LOADING) {
    console.log("Page is loading");
}
if (page.pageStatus === LoadingStatus.READY) {
    console.log("Page is ready");
}
// Зробіть змінну, яка може приймати або рядок, або число.
var unionVer;
unionVer = "hi";
unionVer = 10;
// Зробіть змінну, яка може приймати лише одне значення з двох: 'enable' або 'disable'
var toggleSwitch;
toggleSwitch = "enable";
// Вкажіть типи для наступних функцій
function showMessage(message) {
    console.log(message);
}
function calc(num1, num2) {
    return num1 + num2;
}
function customError() {
    throw new Error("Error");
}
var page1 = {
    title: "The awesome page",
    likes: 100,
    accounts: ["Max", "Anton", "Nikita"],
    status: "open",
    details: {
        createAt: new Date("2021-01-01"),
        updateAt: new Date("2021-05-01"),
    },
};
var page2 = {
    title: "Python or Js",
    likes: 5,
    accounts: ["Alex"],
    status: "close",
};
