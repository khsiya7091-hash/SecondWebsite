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

function setActiveSection(sectionToShow) {
  [signupSection, registerSection, questionSection, resultSection].forEach((section) =>
    section.classList.remove("active")
  );
  sectionToShow.classList.add("active");
}

function getNextEmployeeNumber() {
  return STARTING_EMPLOYEE_NUMBER + employees.length;
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

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  signupData = Object.fromEntries(new FormData(signupForm).entries());
  setActiveSection(registerSection);
});

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  registerData = Object.fromEntries(new FormData(registerForm).entries());
  setActiveSection(questionSection);
});

questionForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (employees.length >= MAX_EMPLOYEES) {
    alert("All 40 employee slots are already used.");
    return;
  }

  const questionData = Object.fromEntries(new FormData(questionForm).entries());
  const employeeNumber = getNextEmployeeNumber();

  employees.push({
    employeeNumber,
    companyName: signupData?.companyName || "",
    bankDetails: signupData?.bankDetails || "",
    directoryNamesSurnames: signupData?.directoryNamesSurnames || "",
    idNumber: registerData?.idNumber || "",
    address: registerData?.address || "",
    name: questionData.name,
    surname: questionData.surname,
    position: questionData.position,
  });

  renderEmployees();

  resultMessage.textContent = `Employee ${questionData.name} ${questionData.surname} was registered with Employee Number ${employeeNumber}.`;
  setActiveSection(resultSection);
});

addAnotherBtn.addEventListener("click", () => {
  if (employees.length >= MAX_EMPLOYEES) {
    alert("All 40 employee slots are already used.");
    return;
  }

  resetEmployeeForms();
  setActiveSection(registerSection);
});

renderEmployees();
employeesSection.classList.add("active");
