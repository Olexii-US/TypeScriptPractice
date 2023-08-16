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

//  ---------------------------------------
//  ------------- Декоратори класів -------------
//  ---------------------------------------
// складний приклад
// варіант 1 - гірше
interface IDecoration1 {
  parent: string;
  template: string;
}

function ControllerDecoration1(config: IDecoration) {
  return function (constructor: any) {
    const current = new constructor();

    const getParrent = document.getElementById(config.parent)!;
    const createElement = document.createElement(config.template);

    createElement.innerHTML = current.content;

    constructor.prototype.element = createElement;
    constructor.prototype.parent = getParrent;

    getParrent.appendChild(createElement);
  };
}

@ControllerDecoration1({
  parent: "app",
  template: "H1",
})
class ControllerHard1 {
  public content = "My controller";
}

// варіант 2 - краще (щоб декоратор вертав новий клас)
interface IDecoration {
  parent: string;
  template: string;
}

function ControllerDecoration(config: IDecoration) {
  return function <T extends { new (...args: any[]): { content: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      private element: HTMLElement;
      private parent: HTMLElement;
      constructor(...arg: any[]) {
        super(...arg);
        this.parent = document.getElementById(config.parent)!;
        this.element = document.createElement(config.template);

        this.element.innerHTML = this.content;

        this.parent.appendChild(this.element);
      }
    };
  };
}

@ControllerDecoration({
  parent: "app",
  template: "H1",
})
class ControllerHard {
  public content = "My controller2";
}

const controllerHard = new ControllerHard();

//  ---------------------------------------
//  ------------- Декоратори методів -------------
//  ---------------------------------------
function ShowParams(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("target", target);
  console.log("name", name);
  console.log("descriptor", descriptor);
}

// AutoBind щоб прив'язати this
function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value as Function;

  return {
    configurable: true,
    enumerable: false,
    get() {
      return method.bind(this);
    },
  };
}

class Notifier {
  public content = "message in class";
  @ShowParams
  @AutoBind
  showMessage() {
    console.log(this.content);
  }
}

const notifier = new Notifier();

const showMessage01 = notifier.showMessage;

notifier.showMessage();
showMessage01();

// наступне
function AddTax(taxPercent: number) {
  return (_: any, _2: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value as Function;

    return {
      configurable: true,
      enumerable: false,
      get() {
        return (...args: any[]) => {
          const result = method.apply(this, args);

          return result + (result / 100) * taxPercent;
        };
      },
    };
  };
}

class Payment {
  @AddTax(20)
  pay(money: number): number {
    return money;
  }
}

const payment = new Payment();

console.log("Amount with tax: ", payment.pay(100));

//  ---------------------------------------
//  ------------- Декоратори параметрів -------------
//  ---------------------------------------
