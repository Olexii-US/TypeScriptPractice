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
// function CheckEmail(target: any, name: string, position: number) {
//   console.log("target", target);
//   console.log("position", position);
//   console.log("name", name);
// }

// class Person1 {
//   setEmail(@CheckEmail email: string) {
//     console.log(email);
//   }
// }

//
function CheckEmail(target: any, nameMethod: string, position: number) {
  if (!target[nameMethod].validation) {
    target[nameMethod].validation = {};
  }
  Object.assign(target[nameMethod].validation, {
    [position]: (value: string) => {
      if (value.includes("@")) {
        return value;
      }
      throw new Error("No valid field");
    },
  });
}

function Validation(_: any, _2: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;

  return {
    configurable: true,
    enumerable: false,
    get() {
      return (...args: any[]) => {
        if (method.validation) {
          args.forEach((item, index) => {
            if (method.validation[index]) {
              args[index] = method.validation[index](item);
            }
          });
        }
        return method.apply(this, args);
      };
    },
  };
}

class Person1 {
  @Validation
  setEmail(@CheckEmail email: string) {
    console.log(email);
  }
}

const person033 = new Person1();

person033.setEmail("testgmail.com");
person033.setEmail("test@gmail.com");

//  ---------------------------------------
//  ------------- Декоратори властивостей -------------
//  ---------------------------------------
function Required(target: any, propertyName: string | Symbol) {
  console.log("Required");
  console.log(target, propertyName);
}

function PositiveNumber(target: any, propertyName: string | Symbol) {
  console.log("PositiveNumber");
  console.log(target, propertyName);
}

class Person777 {
  @Required
  name: string;
  @PositiveNumber
  age: number;

  constructor(n: string, a: number) {
    this.name = n;
    this.age = a;
  }
}

//складний приклад
interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Required007(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["required"],
  };
}

function PositiveNumber007(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["positive"],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Person007 {
  @Required007
  name: string;
  @PositiveNumber007
  age: number;

  constructor(n: string, a: number) {
    this.name = n;
    this.age = a;
  }
}

// const person007 = new Person007("", -1);
const person0077 = new Person007("Jane", 5);

if (!validate(person0077)) {
  console.log("Validation error!");
} else {
  console.log("Validation ok!");
}
