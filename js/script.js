/* 

The form validattion only occurs when it is submitted as mentioned in the readme.md 

"Program the form element to listen for the submit event. When the form submission is detected, each required form field or section should be validated, or checked to ensure that they have been filled out correctly. If any of the following required fields is not valid, the form’s submission should be prevented."

*/
// Focus the name filed when page loads
const nameField = document.getElementById("name");
nameField.focus();

// Hide or show the other job role text field based on user selection
const jobRoleSelection = document.getElementById("title");
const hiddenJobRole = document.getElementById("other-job-role");
jobRoleSelection.addEventListener("change", checkJobRoleValue);
hiddenJobRole.style.display = "none";
function checkJobRoleValue() {
  // If selected job role is other than show the hidden job role else hide the hidden job role
  if (jobRoleSelection.value === "other") hiddenJobRole.style.display = "block";
  else hiddenJobRole.style.display = "none";
}

// Hide or show the clor options for specefic T-shirt designs based on user selection
const designsField = document.getElementById("design");
const colorsField = document.getElementById("color");
let punsOptions = document.querySelectorAll('[data-theme="js puns"]');
let heartOptions = document.querySelectorAll('[data-theme="heart js"]');
designsField.addEventListener("change", checkDesignFieldValue);
colorsField.disabled = true;
function checkDesignFieldValue() {
  // enalbe colorsfield and display all design colors
  colorsField.disabled = false;
  for (let i = 1; i < 7; i++) {
    colorsField.children[i].style.display = "block";
  }
  if (designsField.value === "heart js") {
    // hide js puns design color options
    punsOptions.forEach((option) => {
      option.style.display = "none";
    });
    heartOptions[0].selected = true;
  } else if (designsField.value === "js puns") {
    // hide heart js design color options
    heartOptions.forEach((option) => {
      option.style.display = "none";
    });
    punsOptions[0].selected = true;
  } else {
    // Disable the colors filed.
    colorsField[0].selected = true;
    colorsField.disabled = true;
  }
}

// Set and Update the activity cost as per the selected activities.
const activities = document.getElementById("activities");
const activityCost = document.getElementById("activities-cost");
activities.addEventListener("change", caclulateTotalCost);
let calculatedCost = 0;
function caclulateTotalCost(e) {
  // add or subtract from the cost if clicked element is check or unchecked.
  if (e.target.checked) {
    calculatedCost += Number(e.target.dataset.cost);
  } else {
    calculatedCost -= Number(e.target.dataset.cost);
  }
  activityCost.innerText = `Total: $${calculatedCost}`;
}

// Payment info section by default on credit card payment is selected

const payment = document.getElementById("payment");
const creditCard = document.getElementById("credit-card");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");
paypal.style.display = "none";
bitcoin.style.display = "none";

// Event listener on payment changer.
payment.children[1].selected = true;
payment.addEventListener("change", changePaymentMethod);

// Display different payment method based on user selection
function changePaymentMethod(e) {
  if (e.target.value === "paypal") {
    paypal.style.display = "block";
    creditCard.style.display = "none";
    bitcoin.style.display = "none";
  } else if (e.target.value === "bitcoin") {
    bitcoin.style.display = "block";
    paypal.style.display = "none";
    creditCard.style.display = "none";
  } else if (e.target.value === "credit-card") {
    creditCard.style.display = "block";
    bitcoin.style.display = "none";
    paypal.style.display = "none";
  }
}

// This will call all the validation functions at the form submission;
const nameHint = document.getElementById("name-hint");
const emailField = document.getElementById("email");
const emailHint = document.getElementById("email-hint");
const form = document.getElementsByTagName("form");
form[0].addEventListener("submit", handleFormSubmit);
function handleFormSubmit(e) {
  validateName(e);
  validateEmail(e);
  validateActivityRegistrations(e);
  if (payment.value === "credit-card") {
    validDate(e);
    validYear(e);
    validateCardNumber(e);
    validateZipCod(e);
    validateCVV(e);
  }
}

// This function will validate the name provided by user (call the isEmpty function and provide the name as an argument) and will display an error if the name is empty.

function validateName(e) {
  let empty = isEmpty(nameField.value);
  if (empty) {
    // shows the Hint for this field.
    nameHint.style.display = "block";
    // Shows the error at this filed.
    setParentInvalid(nameField);
    e.preventDefault();
  } else {
    // Hide the Hint and error
    nameHint.style.display = "none";
    setParentValid(nameField);
  }
}

/* 
 This function will validate the email provided by user
 (call the isEmpty function and provide the email as an argument) and will display an error if the email is empty. 
 (call the isEmail function and provide the email as an argument) and will display an error if the eamil is not a valid email;

 validemail = "anything@anything.com"
*/

function validateEmail(e) {
  let empty = isEmpty(emailField.value);
  let email = isEmail(emailField.value);
  if (empty || !email) {
    // shows the Hint for this field.
    emailHint.style.display = "block";
    // Shows the error at this filed.
    setParentInvalid(emailField);

    e.preventDefault();
  } else {
    // Hide the Hint and error
    emailHint.style.display = "none";
    setParentValid(emailField);
  }
}

/* 
validateActivityRegistrations
 This function will validate the activities selected by user
 by checking if no activity is selected then it will display an error.
*/

let checkBoxes = document.querySelectorAll("input[type='checkbox']");

// adding classes to checkbox parent (label) elements so they can recive focus while tabbing through css
for (let i = 0; i < checkBoxes.length; i++)
  checkBoxes[i].parentElement.classList.add("checkbox-parent");

const registerHint = document.getElementById("activities-hint");
function validateActivityRegistrations(e) {
  let allNonChecked = true;
  // check if atleast one checkbox is selected
  for (let i = 0; i < checkBoxes.length; i++) {
    if (checkBoxes[i].checked === true) {
      allNonChecked = false;
    }
  }
  if (allNonChecked) {
    // shows the Hint for this field.
    registerHint.style.display = "block";

    // Shows the error at this filed.
    setParentInvalid(registerHint);

    e.preventDefault();
  } else {
    // Hide the Hint and error
    registerHint.style.display = "none";
    setParentValid(registerHint);
  }
}

/* 
validDate
 This function will validate the date selected by user
 by checking if no date  is selected then it will display an error.
*/
function validDate(e) {
  const dateField = document.getElementById("exp-month");
  let onDateisChecked = false;
  // Check if atleast one option on datefield is selected.
  for (let i = 1; i < 12; i++) {
    if (dateField.children[i].selected) {
      onDateisChecked = true;
    }
  }
  if (!onDateisChecked) {
    // Shows the error at this filed.
    setParentInvalid(dateField);
    e.preventDefault();
  } else {
    // Hide the Hint and error
    setParentValid(dateField);
  }
}

/* 
validYear
 This function will validate the year selected by user
 by checking if no year  is selected then it will display an error.
*/
function validYear(e) {
  const yearField = document.getElementById("exp-year");
  let onYearisChecked = false;
  // Check if atleast on year option is selected on year filed.
  for (let i = 1; i < 5; i++) {
    if (yearField.children[i].selected) {
      onYearisChecked = true;
    }
  }
  if (!onYearisChecked) {
    // Shows the error at this filed.
    setParentInvalid(yearField);
    e.preventDefault();
  } else {
    // Hide the Hint and error
    setParentValid(yearField);
  }
}

/* 
validateCardNumber
 This function will validate the credit card number provided by user
 It will do so by using the help of an another function maxMin(value, min, max) to dtermine if card number is between 12 to 17 digits. if not it will display an error.
*/
const cardNoValue = document.getElementById("cc-num");
const cardNoHint = document.getElementById("cc-hint");
function validateCardNumber(e) {
  const isCardNoOk = maxMin(cardNoValue.value, 12, 17);
  if (!isCardNoOk) {
    // shows the Hint for this field.
    cardNoHint.style.display = "block";

    // Shows the error at this filed.
    setParentInvalid(cardNoHint);

    e.preventDefault();
  } else {
    // Hide the Hint and error
    setParentValid(cardNoHint);
    cardNoHint.style.display = "none";
  }
}

/* 
validateZipCod
 This function will validate the zip cod number provided by user
 It will do so by using the help of an another function maxMin(value, min, max) to dtermine if the zip cod is 5 digits long. if not it will display an error.
*/

const zip = document.getElementById("zip");
const zipHint = document.getElementById("zip-hint");
function validateZipCod(e) {
  const isZipcodOK = maxMin(zip.value, 4, 6);
  if (!isZipcodOK) {
    // shows the Hint for this field.
    zipHint.style.display = "block";

    // Shows the error at this filed.
    setParentInvalid(zipHint);

    e.preventDefault();
  } else {
    // Hide the Hint and error
    setParentValid(zipHint);
    zipHint.style.display = "none";
  }
}

/* 
validateCVV
 This function will validate the cvv code for credit card provided by user
 It will do so by using the help of an another function maxMin(value, min, max) to dtermine if cvv code is 5 digits long. if not it will display an error.
*/
const cvv = document.getElementById("cvv");
const cvvHint = document.getElementById("cvv-hint");
function validateCVV(e) {
  const isCvvOK = maxMin(cvv.value, 2, 4);
  if (!isCvvOK) {
    // shows the Hint for this field.
    cvvHint.style.display = "block";

    // Shows the error at this filed.
    setParentInvalid(cvvHint);

    e.preventDefault();
  } else {
    // Hide the Hint and error
    cvvHint.style.display = "none";
    setParentValid(cvvHint);
  }
}

// Will show the error as an invalid sign on the parent of the given field.
function setParentInvalid(element) {
  element.parentElement.classList.add("valid");
  element.parentElement.classList.add("not-valid");
}
// Will hide the error on the parent of the given field.
function setParentValid(element) {
  element.parentElement.classList.remove("not-valid");
  element.parentElement.classList.add("valid");
}

// This function will check if provided value is a valid email
function isEmail(input) {
  let email = input.trim();
  const re = /\S+@\S+\.com/;
  return re.test(email);
}

// This function will check if provided value is not empty.
function isEmpty(input) {
  let value = input.trim();
  if (value === " ") return true;
  if (value === "") return true;
  if (!value) return true;
  if (value.length > 0) return false;
}
function getlength(input) {
  return input.toString().length;
}

// This function will check if provided value is a number and the number is between max and min values
function maxMin(input, min, max) {
  let re = /^\d+$/;
  if (!re.test(input)) return false;
  let length = getlength(input);
  if (length > min && length < max) return true;
  else return false;
}
