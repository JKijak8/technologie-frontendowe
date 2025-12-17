console.log(`Skrypt załadowany!`);

let imie = "Jakub Kijak";
let wiek = 23;
let czyStudent = true;
let ulubioneJezyki = ["Java", "Go", "Lua"];
let obiekt = {
  imie: imie,
  wiek: wiek,
  miasto: "Brzozów",
};
let zmNull = null;
let zmUndef = undefined;

console.log(typeof imie);
console.log(typeof wiek);
console.log(typeof czyStudent);
//Zwraca typ object bo array jest obiektem.
console.log(typeof ulubioneJezyki);
console.log(typeof obiekt);
//Zwraca typ object bo null jest obiektem.
console.log(typeof zmNull);
console.log(typeof zmUndef);

//Dodawanie
console.log(5 + 5);
//Odejmowanie
console.log(5 - 5);
//Mnożenie
console.log(5 * 5);
//Dzielenie
console.log(5 / 5);
//Modulo - reszta z dzielenia
console.log(6 % 5);
//Potęgowanie
console.log(5 ** 5);

//true, ponieważ javascript ignoruje typ danych jeśli używa się "==" do porównania
console.log("5" == 5);
//false, ponieważ javascript bierze pod uwage typ danych jeśli używa się "===" do porównania
console.log("5" === 5);

//&& - operator logiczny AND; true && false = false
//! - operator logiczny NOT; !false = true
//|| - operator logiczny OR; false || true = true
console.log((true && false) || !false);
