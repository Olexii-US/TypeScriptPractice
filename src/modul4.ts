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
