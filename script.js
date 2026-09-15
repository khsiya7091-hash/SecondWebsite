const MAX_EMPLOYEES = 40;
const STARTING_EMPLOYEE_NUMBER = 1001;

const signupSection = document.getElementById("signup-section");
const registerSection = document.getElementById("register-section");
const questionSection = document.getElementById("question-section");
const resultSection = document.getElementById("result-section");
const employeesSection = document.getElementById("employees-section");

const signupForm = document.getElementById("signup-form");
const registerForm = document.getElementById("register-form");
const questionForm = document.getElementById("question-form");
const resultMessage = document.getElementById("result-message");
const addAnotherBtn = document.getElementById("add-another-btn");
const employeeCount = document.getElementById("employee-count");
const employeeList = document.getElementById("employee-list");

let signupData = null;
let registerData = null;
let employees = [];
let nextEmployeeNumber = STARTING_EMPLOYEE_NUMBER;

function hasEmployeeCapacity() {
  return employees.length < MAX_EMPLOYEES;
}

function setActiveSection(sectionToShow) {
  [signupSection, registerSection, questionSection, resultSection].forEach((section) =>
    section.classList.remove("active")
  );
  sectionToShow.classList.add("active");
  const firstField = sectionToShow.querySelector("input, textarea, button");
  if (firstField) {
    firstField.focus();
  }
}

function getNextEmployeeNumber() {
  const employeeNumber = nextEmployeeNumber;
  nextEmployeeNumber += 1;
  return employeeNumber;
}

function renderEmployees() {
  employeeCount.textContent = String(employees.length);
  employeeList.innerHTML = "";

  employees.forEach((employee) => {
    const item = document.createElement("li");
    item.textContent = `${employee.employeeNumber} - ${employee.name} ${employee.surname} (${employee.position})`;
    employeeList.appendChild(item);
  });
}

function resetEmployeeForms() {
  registerForm.reset();
  questionForm.reset();
  registerData = null;
}

function updateAddAnotherButtonState() {
  const full = !hasEmployeeCapacity();
  addAnotherBtn.disabled = full;
  addAnotherBtn.textContent = full
    ? "All 40 employees have been registered"
    : "Register Another Employee";
}

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!hasEmployeeCapacity()) {
    alert("All 40 employee slots are already used.");
    return;
  }
  signupData = Object.fromEntries(new FormData(signupForm).entries());
  setActiveSection(registerSection);
});

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!hasEmployeeCapacity()) {
    alert("All 40 employee slots are already used.");
    return;
  }
  registerData = Object.fromEntries(new FormData(registerForm).entries());
  setActiveSection(questionSection);
});

questionForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!hasEmployeeCapacity()) {
    alert("All 40 employee slots are already used.");
    return;
  }

  const questionData = Object.fromEntries(new FormData(questionForm).entries());
  if (
    registerData &&
    (registerData.name !== questionData.name ||
      registerData.surname !== questionData.surname ||
      registerData.position !== questionData.position)
  ) {
    alert("Confirmation details must match the employee data entered on Step 2.");
    return;
  }

  const employeeNumber = getNextEmployeeNumber();
  const registeredName = registerData?.name || questionData.name;
  const registeredSurname = registerData?.surname || questionData.surname;
  const registeredPosition = registerData?.position || questionData.position;

  employees.push({
    employeeNumber,
    companyName: signupData?.companyName || "",
    signupPersonName: signupData?.name || "",
    signupPersonSurname: signupData?.surname || "",
    bankDetails: signupData?.bankDetails || "",
    directoryNamesSurnames: signupData?.directoryNamesSurnames || "",
    idNumber: registerData?.idNumber || "",
    address: registerData?.address || "",
    name: registeredName,
    surname: registeredSurname,
    position: registeredPosition,
  });

  renderEmployees();
  updateAddAnotherButtonState();

  resultMessage.textContent = `Employee ${registeredName} ${registeredSurname} was registered with Employee Number ${employeeNumber}.`;
  registerData = null;
  questionForm.reset();
  setActiveSection(resultSection);
});

addAnotherBtn.addEventListener("click", () => {
  if (!hasEmployeeCapacity()) {
    return;
  }

  resetEmployeeForms();
  setActiveSection(registerSection);
});

renderEmployees();
updateAddAnotherButtonState();
employeesSection.classList.add("active");
