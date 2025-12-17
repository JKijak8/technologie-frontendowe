function helloWorld() {
  console.log("Hello World!");
}

const constHello = function () {
  console.log("Hello World!");
};

const constHello2 = () => {
  console.log("Hello World!");
};

(() => {
  console.log("Hello World!");
})();

const multiply = function multiply(a, b = 2) {
  return a * b;
};

const sum = function sum(...nums) {
  let sum = 0;
  for (num of nums) {
    sum += num;
  }
  return sum;
};

function person(firstName, lastName, age) {
  return {
    firstName: firstName,
    lastName: lastName,
    age: age,
  };
}

function operateOnNums(num1, num2, callback) {
  if (typeof callback === "string") callback = getCallback(callback);
  if (typeof callback === "function") return callback(num1, num2);
  else return "Nie ma takiej funkcji";
}

function getCallback(funcName) {
  switch (funcName) {
    case "sum":
      return sum;
    case "multiply":
      return multiply;
    default:
      return undefined;
  }
}

function funkcja() {
  const stala = "stała";

  if (true) {
    var zmienna = "zmienna 1";
    let zmienna2 = "zmienna 2";
  }

  try {
    stala = 9;
  } catch {
    console.error("Nie da się zmienić stałej");
  }

  console.log(`${zmienna}`);
  try {
    console.log(`${zmienna2}`);
  } catch {
    console.error("zmienna2 nie została zadeklarowana");
  }
  console.log(`${stala}`);

  console.log(`${zmienna}`);
  try {
    console.log(`${zmienna2}`);
  } catch {
    console.error("zmienna2 nie została zadeklarowana");
  }

  console.log(`${stala}`);
}

function stworzLicznik() {
  let licznik = 0;
  return function () {
    return (licznik += 1);
  };
}
