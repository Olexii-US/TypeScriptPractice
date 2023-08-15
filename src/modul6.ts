//           Декоратори
//  ---------------------------------------
//  ------------- Декоратори класів -------------
//  ---------------------------------------
// простий приклад
function JustLogger(constructor: Function) {
  console.log("Loading///////////////");
  console.log(constructor);
}
@JustLogger
class Controller111 {}

// варіант щоб прокинути аргументи
// function Logger(logString: string) {
//   return function (constructor: Function) {
//     console.log(logString);
//     console.log(constructor);
//   };
// }
// @Logger("Hi!!!!!!!!!!!!!!!!")
// class Controller {}

// варіант щоб прокинути аргументи + кілька декораторів
function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function AddProperty() {
  return function (constructor: Function) {
    console.log("AddProperty");
    constructor.prototype.modify = true;
    console.log(constructor);
  };
}

@Logger("Hi!!!!!!!!!!!!!!!!")
@AddProperty()
class Controller {
  public id = 1;
  public modify?: boolean;
}

const controller = new Controller();

console.log("is modify?", controller.modify);
