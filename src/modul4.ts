// ------------ modul 4 --------------
class Zhiguli_8 {
  private needRepair = false;
  private maxEngineLoad = 3;

  /**
   * Заводить двигун машини, якщо це можливо
   */
  private checkEngine() {
    // Перевіряємо, чи не зламаний двигун
    if (this.needRepair) {
      throw new Error("Engine not work");
    }

    // Пробуємо його завести
    const engineLoad = Math.floor(Math.random() * this.maxEngineLoad) + 1;
    if (this.maxEngineLoad === engineLoad) {
      this.needRepair = true;
      throw new Error("Engine broken again");
    }
  }

  /**
   * Завести двигун
   */
  public startEngine() {
    this.checkEngine();

    console.log("Ta-ta-ta-ta");
  }

  /**
   * Ремонт двигуна
   */
  public repairEngine() {
    this.needRepair = false;

    console.log("Engine rebuilt");
  }
}

//--------- створ екземпляр ----------
const auto = new Zhiguli_8();

try {
  auto.startEngine();
  auto.startEngine();
  auto.startEngine();
  auto.startEngine();
} catch (e) {
  console.log(e);
  auto.repairEngine();
  auto.startEngine();
}

//------------- Інкапсуляція -------------
// чистий js
// модифікаторів private i public не існує

function protectedMethod() {
  return "Something";
}

class myClass {
  myPublicMethod() {
    return protectedMethod();
  }
}
// Type Script
class myClass1 {
  private protectedMethod() {
    return "Something";
  }

  public myPublicMethod() {
    return this.protectedMethod();
  }
}

//------------- Інкапсуляція -------------
// в js i ts однаково
class classA1 {
  myMethod() {
    return "I'm a class A";
  }
}

class classB1 extends classA1 {}
// І тепер classB має всі методи та властивості classA.

//------------- Поліморфізм -------------
// 'В' взяв меток 'А' і мутував його
class classA {
  myMethod() {
    return "I'm a class A";
  }
}

class classB extends classA {
  myMethod() {
    return "I'm a class B";
  }
}

//------------- Абстракція -------------
//  не пиляти все в один великий метод, а розділити на кілька методів, який виконує кожен своє завдання, і викликати їх усіх в одному методі.

class classAA {
  private process1() {
    return 1;
  }
  private process2() {
    return 2;
  }
  private process3() {
    return 3;
  }

  public superProcess() {
    return this.process1() + this.process2() + this.process3();
  }
}

//     ------    Класи та інтерфейси    -------
class House01 {
  street: string;

  constructor(n: string) {
    this.street = n;
  }

  //   showAddress() {
  //     console.log("Address: " + this.street);
  //   }

  // Ми вкажемо, якого типу повинен бути this в методі.
  showAddress(this: House01) {
    console.log("Address: " + this.street);
  }
}

const house01 = new House01("Middle-earth");

house01.showAddress();

const houseCopy = { street: "Dummy", showAddress: house01.showAddress };

houseCopy.showAddress();

// Модифікатори доступу
class House1 {
  private street: string;
  private tenants: string[] = [];

  constructor(n: string) {
    this.street = n;
  }
  // або зразу
  // constructor(private street: string) {
  // }

  public showAddress(this: House1) {
    console.log("Address: " + this.street);
  }

  public addTenant(tenant: string) {
    this.tenants.push(tenant);
  }

  public showTenants() {
    console.log(this.tenants);
  }
}

const house1 = new House1("Middle-earth");

house1.addTenant("Anton");
house1.addTenant("Nikita");

house1.showTenants();

// ---------  Інтерфейси ------------
// Інтерфейси об'єктів
interface IPerson1 {
  name: string;
  age: number;

  greet(phrase: string): void;
}

let user: IPerson1;

user = {
  name: "Anthony",
  age: 21,

  greet(phrase) {
    console.log(phrase + " " + this.name);
  },
};

user.greet("Усім привіт я");

// Інтерфейси класів
interface IPerson {
  name: string;
  age: number;

  greet(phrase: string): void;
}

interface IPilot {
  flyMessage(): void;
}

class Pilot implements IPerson, IPilot {
  constructor(public name: string, public age: number) {
    if (this.age < 28) {
      throw new Error("Pilot to young");
    }
  }

  greet(phrase: string): void {
    console.log(phrase + " " + this.name);
  }

  flyMessage(): void {
    console.log("Літак набрав висоту, всім приємного польоту!");
  }
}

const pilot = new Pilot("Anthony", 32);

pilot.greet("Вас вітає капітан корабля");
pilot.flyMessage();

// Extending Interfaces
interface IPerson {
  name: string;
  age: number;

  greet(phrase: string): void;
}

interface IPilot extends IPerson {
  flyMessage(): void;
} // IPilot містить усі поля із IPerson.

// ...........................................................
// ---------video lessons ----------
class HouseMy {
  street: string;

  constructor(n: string) {
    this.street = n;
  }

  showAdress(this: HouseMy): void {
    console.log("Address: " + this.street);
  }
}

const houseMy = new HouseMy("my street");
houseMy.showAdress();

// наслідування
class House001 {
  private tenants: string[] = [];

  constructor(private readonly type: string, private street: string) {}

  public showAddress(this: House001) {
    console.log("Address: " + this.street);
  }

  public showType(this: House001) {
    console.log("House Type: " + this.type);
  }

  public addTenant(tenant: string) {
    this.tenants.push(tenant);
  }

  public showTenants() {
    console.log(this.tenants);
  }
}

class StoneHouse extends House001 {
  private chargeOfTheHouse: string; // Головний в будинку

  constructor(street: string, generalTenant: string) {
    super("stone", street); // Виклик батьківського конструктора

    // Додаємо власника квартири
    this.chargeOfTheHouse = generalTenant;
    this.addTenant(generalTenant);
  }

  public showTenants() {
    console.log("General: " + this.chargeOfTheHouse);

    // Запускаємо батьківський метод showTenants();
    super.showTenants();
  }
}

const stoneHouse = new StoneHouse("Stone-world", "Max");

stoneHouse.addTenant("Anton");
stoneHouse.addTenant("Nikita");

stoneHouse.showTenants();
stoneHouse.showType();
stoneHouse.showAddress();

// абстарктний клас

abstract class Plane {
  protected pilotInCabin = false;

  public sitInPlane() {
    this.pilotInCabin = true;
  }

  public abstract startEngine(): string;
}

class Corn extends Plane {
  public startEngine() {
    return "Ta-ta-ta";
  }
}

class Boeing extends Plane {
  public startEngine() {
    return "Buuuuuuuuu";
  }
}

const corn = new Corn();
const boeing = new Boeing();

corn.sitInPlane();
boeing.sitInPlane();

console.log(corn.startEngine());
console.log(boeing.startEngine());

// інтерфейси об'єктів
interface IUser {
  readonly userName: string;
  userAge: number;

  greet(phrase: string): void;
}

let newUser: IUser;

newUser = {
  userName: "Max",
  userAge: 30,

  greet(phrase: string) {
    console.log(phrase + " " + this.userName);
  },
};

newUser.greet("Hi, I'm");

// те саме переписати на тип
type IUser1 = {
  readonly userName1: string;
  userAge1: number;

  greet: (phrase: string) => void;
};

let newUser1: IUser1;

newUser1 = {
  userName1: "Max",
  userAge1: 30,

  greet(phrase: string) {
    console.log(phrase + " " + this.userName1);
  },
};

newUser1.greet("Hi from type, I'm");

// інтерфейси класів
interface IUserClass {
  readonly userNameClass: string;
  userAgeClass: number;

  greet(phrase: string): void;
}

interface IPilot1 {
  flyMessage(): void;
}

class Pilot1 implements IUserClass, IPilot1 {
  constructor(
    public readonly userNameClass: string,
    public userAgeClass: number
  ) {
    this.checkAge();
  }

  private checkAge() {
    if (this.userAgeClass < 28) {
      throw new Error("Pilot is too young");
    }
  }

  greet(phrase: string): void {
    console.log(phrase + " " + this.userNameClass);
  }
  flyMessage(): void {
    console.log("The plain is flying on 10000m");
  }
}

const newPilot = new Pilot1("Max", 35);

newPilot.greet("Wellcome om board! I'm");
newPilot.flyMessage();

// інтерфейси, як тип функції

// type AddFunc = (n1: number, n2: number) => number
interface AddFunc {
  (n1: number, n2: number): number;
}

const foo1: AddFunc = (n1: number, n2: number) => {
  return n1 + n2;
};

////////////////////////////////////////////////////////
//----------------- Homework--------------------------//

class Key {
  private signature: number;

  constructor() {
    this.signature = Math.random();
  }
  getSignature(): number {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key) {}

  getKey(): Key {
    return this.key;
  }
  // constructor(private key: number) {}

  // getKey(): number {
  //   return this.key;
  // }
}

abstract class House {
  protected door = false;
  private tenants: Person[] = [];

  key: Key;
  constructor(k: Key) {
    this.key = k;
  }

  comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
      console.log("Tenant is in House");
    }
    if (!this.door) {
      throw new Error("The door is close");
    }
  }
  public abstract openDoor(key: Key): boolean;
}

class MyHouse extends House {
  public openDoor(key: Key) {
    if (key.getSignature() !== this.key.getSignature()) {
      throw new Error("Wrong key");
    }
    return (this.door = true);
  }
}

const key = new Key();

const house = new MyHouse(key);
const person001 = new Person(key);

house.openDoor(person001.getKey());

house.comeIn(person001);
