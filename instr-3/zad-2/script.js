function isEven(num) {
  if (num % 2 === 0) return true;
  else return false;
}

function gradeCalc(points) {
  if (points < 0 || points > 100) return "Nieprawidłowa liczba punktów";
  if (points >= 90) return "Bardzo dobra";
  else if (points < 90 && points >= 60) return "Dobra";
  else if (points < 60 && points > 40) return "Dostateczna";
  else return "Niedostateczna";
}

function weekday(dayNum) {
  switch (dayNum) {
    case 1:
      return "Poniedziałek";
    case 2:
      return "Wtorek";
    case 3:
      return "Środa";
    case 4:
      return "Czwartek";
    case 5:
      return "Piątek";
    case 6:
      return "Sobota";
    case 7:
      return "Niedziela";
    default:
      return "Nie istnieje taki dzień tygodnia.";
  }
}

function isAdult(age) {
  return age >= 18 ? "Pełnoletni" : "Niepełnoletni";
}

for (let i = 1; i <= 10; i++) {
  console.log(i);
}

let counter = 10;
while (counter >= 0) {
  console.log(counter);
  counter--;
}

let arr = [25, 164, 1678, 1236176];
for (const num of arr) {
  console.log(num);
}

while (true) {
  console.log((counter += 3));
  if (counter >= 15) break;
}

for (let i = 0; i < 10; i++) {
  if (i % 2 !== 0) continue;
  console.log(i);
}

function tabliczkaMnozenia() {
  let tabliczkaMnozenia = "";

  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      tabliczkaMnozenia += `${i * j} `;
    }
    tabliczkaMnozenia += "\n";
  }
  console.log(tabliczkaMnozenia);
}
