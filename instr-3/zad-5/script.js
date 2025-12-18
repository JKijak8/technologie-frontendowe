const form = document.querySelector("form");
const submitBtn = form.querySelector('button[type="submit"]');
const resetBtn = form.querySelector('button[type="reset"]');
const formData = new FormData(form);

console.log(formData);

function getErrorElement(element) {
  let container = element.closest("div");
  if (!container) container = element.parentElement;
  let error = container.querySelector(".error");
  if (!error) {
    error = document.createElement("div");
    error.className = "error";
    container.appendChild(error);
  }
  return error;
}

const validators = {
  "imie-nazwisko": (value) => {
    if (value.length === 0) return { ok: false, msg: "Imię jest wymagane." };
    if (value.length < 2)
      return { ok: false, msg: "Podaj co najmniej 2 litery." };
    return { ok: true };
  },

  email: (value) => {
    if (value.length === 0) return { ok: false, msg: "Email jest wymagany." };

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ? { ok: true }
      : { ok: false, msg: "Niepoprawny format email." };
  },

  telefon: (value) => {
    if (value.length === 0) return { ok: true };
    return /^(\+?\d[\d\s\-()]{5,}\d)$/.test(value)
      ? { ok: true }
      : { ok: false, msg: "Niepoprawny numer telefonu." };
  },

  wiadomosc: (value) => {
    if (value.length === 0)
      return { ok: false, msg: "Wiadomość jest wymagana." };
    if (value.length < 10)
      return { ok: false, msg: "Wiadomość musi mieć minimum 10 znaków." };
    return { ok: true };
  },

  zgoda: (element) => {
    return element.checked
      ? { ok: true }
      : { ok: false, msg: "Musisz wyrazić zgodę." };
  },

  haslo: (value) => {
    if (value.length === 0) return { ok: false, msg: "Hasło jest wymagane." };
    if (value.length < 6)
      return { ok: false, msg: "Hasło musi mieć minimum 6 znaków." };
    return { ok: true };
  },

  "potw-hasla": (value, formValues) => {
    if (value.length === 0)
      return { ok: false, msg: "Potwierdzenie hasła jest wymagane." };
    if (value !== formValues["haslo"])
      return { ok: false, msg: "Hasła nie są zgodne." };
    return { ok: true };
  },

  requiredIfLabelHasRequired: (element) => {
    const label = form.querySelector(`label[for="${element.id}"]`);
    if (label && label.classList.contains("required")) {
      const value = (element.value || "").toString().trim();
      return value.length > 0
        ? { ok: true }
        : { ok: false, msg: "To pole jest wymagane." };
    }
    return { ok: true };
  },
};

function collectFormValuesAsObject(formData) {
  const obj = {};
  for (const [key, value] of formData.entries()) {
    if (obj.hasOwnProperty(key)) {
      if (!Array.isArray(obj[key])) obj[key] = [obj[key]];
      obj[key].push(value);
    } else {
      obj[key] = value;
    }
  }

  if (!obj.hasOwnProperty("plec")) {
    obj["plec"] = null;
  }

  return obj;
}

function markValid(element) {
  element.classList.remove("input-invalid");
  element.classList.add("input-valid");
  const error = getErrorElement(element);
  error.textContent = "";
}

function markInvalid(element, message) {
  element.classList.remove("input-valid");
  element.classList.add("input-invalid");
  const error = getErrorElement(element);
  error.textContent = message;
}

function clearMark(element) {
  element.classList.remove("input-valid", "input-invalid");
  const error = getErrorElement(element);
  error.textContent = "";
}

function validateElement(element, formValues = {}) {
  const id = element.id;
  const type = element.type;
  const tag = element.tagName.toLowerCase();

  if (id === "zgoda") {
    const res = validators["zgoda"](element);
    if (res.ok) markValid(element);
    else markInvalid(element, res.msg);
    return res.ok;
  }

  const value =
    tag === "input" && type === "checkbox"
      ? element.checked
        ? "on"
        : ""
      : element.value || "";
  let response = { ok: true };
  if (validators[id]) {
    try {
      response =
        typeof validators[id] === "function"
          ? validators[id](value, formValues)
          : { ok: true };
    } catch (e) {
      response = { ok: true };
    }
  } else {
    response = validators.requiredIfLabelHasRequired(element);
  }

  if (response.ok) markValid(element);
  else markInvalid(element, response.msg || "Błąd.");
  return response.ok;
}

const inputs = Array.from(form.querySelectorAll("input, textarea, select"));
inputs.forEach((element) => {
  if (element.disabled) return;
  element.addEventListener("blur", () => {
    const formValues = collectFormValuesAsObject(formData);
    validateElement(element, formValues);
  });
  element.addEventListener("input", () => {
    const formValues = collectFormValuesAsObject(formData);
    validateElement(element, formValues);
  });
});

resetBtn.addEventListener("click", () => {
  inputs.forEach((element) => clearMark(element));
  submitBtn.disabled = false;
  submitBtn.textContent = "Submit";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formValues = collectFormValuesAsObject(formData);

  let valid = true;

  inputs.forEach((element) => {
    if (element.disabled) return;
    if (element.type === "file") return;
    if (
      element.type === "submit" ||
      element.type === "reset" ||
      element.type === "button"
    )
      return;
    const ok = validateElement(element, formValues);
    if (!ok) valid = false;
  });

  if (!valid) {
    const firstInvalid = form.querySelector(".input-invalid");
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  submitBtn.disabled = true;
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Wysyłanie...";

  setTimeout(() => {
    form.reset();
    inputs.forEach((el) => clearMark(el));
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    document.getElementById("submit-msg").textContent = "Wysłano formularz";
  }, 1200);
});
