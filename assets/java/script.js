// ARRAY of SPECIAL characters that are included as part of the password generator.
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of NUMERIC characters that are included as part of the password generator.
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of LOWERCASE characters that are included as part of the password generator.
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of UPPERCASE characters that are included as part of the password generator.
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

// FUNCTION opening window prompt for Password Options.
function getPasswordOptions() {
  // VARIABLE that stores the length of the Password.
  var length = parseInt(
    prompt('How many characters would you like your password to contain?')
  );

  // CONDITIONAL STATEMENT to check if a number was entered for password length. Window prompt ends if this evaluates false.
  if (isNaN(length) === true) {
    alert('Password length must be provided as a number.');
    return;
  }

  // Conditional statement to check if password length is at least 8 characters long. Window prompt ends if this evaluates false.
  if (length < 8) {
    alert('Password length must be at least 8 characters.');
    return;
  }

  // Conditional statement to check if password length is less than 128 characters long. Window prompt ends if this evaluates false.
  if (length > 128) {
    alert('Password length must less than 129 characters.');
    return;
  }

  // Variable to store boolean regarding the inclusion of SPECIAL characters.
  var hasSpecialCharacters = confirm(
    'Click OK to confirm including special characters.'
  );

  // Variable to store boolean regarding the inclusion of NUMERIC characters.
  var hasNumericCharacters = confirm(
    'Click OK to confirm including numeric characters.'
  );

  // Variable to store boolean regarding the inclusion of LOWERCASE characters.
  var hasLowerCasedCharacters = confirm(
    'Click OK to confirm including lowercase characters.'
  );

  // Variable to store boolean regarding the inclusion of UPPERCASE characters.
  var hasUpperCasedCharacters = confirm(
    'Click OK to confirm including uppercase characters.'
  );

  // Conditional statement to check if user DOES NOT include any types of specified characters. Password generator ends if all four variables evaluate to FALSE. Alert prompt if all are FALSE.
  if (
    hasSpecialCharacters === false &&
    hasNumericCharacters === false &&
    hasLowerCasedCharacters === false &&
    hasUpperCasedCharacters === false
  ) {
    alert('Must select at least one character type');
    return;
  }

  // OBJECT to store user input.
  var passwordOptions = {
    length: length,
    hasSpecialCharacters: hasSpecialCharacters,
    hasNumericCharacters: hasNumericCharacters,
    hasLowerCasedCharacters: hasLowerCasedCharacters,
    hasUpperCasedCharacters: hasUpperCasedCharacters
  };

  return passwordOptions;
}

// Function for getting a random element from an array for the given length.
function getRandom(arr) {
  var randIndex = Math.floor(Math.random() * arr.length);
  var randElement = arr[randIndex];

  return randElement;
}

// Function to generate password with USER INPUT.
function generatePassword() {
  var options = getPasswordOptions();
  // Variable to store password AS IT IS BEING CONCATENATED.
  var result = [];

  // Array to store types of characters to include in password.
  var possibleCharacters = [];

  // Array to contain one of each type of CHOSEN character(s) to ensure each will be used in creation of password.
  var guaranteedCharacters = [];

  // Conditional statement that ADDS array of special characters into array of possible characters based on user input.
  // Pushes new random special character to guaranteedCharacters.
  if (options.hasSpecialCharacters) {
    possibleCharacters = possibleCharacters.concat(specialCharacters);
    guaranteedCharacters.push(getRandom(specialCharacters));
  }

  // Conditional statement that ADDS array of numeric characters into array of possible characters based on user input.
  // Pushes new random special character to guaranteedCharacters.
  if (options.hasNumericCharacters) {
    possibleCharacters = possibleCharacters.concat(numericCharacters);
    guaranteedCharacters.push(getRandom(numericCharacters));
  }

  // Conditional statement that ADDS array of lowercase characters into array of possible characters based on user input.
  // Pushes new random lower-cased character to guaranteedCharacters.
  if (options.hasLowerCasedCharacters) {
    possibleCharacters = possibleCharacters.concat(lowerCasedCharacters);
    guaranteedCharacters.push(getRandom(lowerCasedCharacters));
  }

  // Conditional statement that ADDS array of uppercase characters into array of possible characters based on user input.
  // Pushes new random upper-cased character to guaranteedCharacters.
  if (options.hasUpperCasedCharacters) {
    possibleCharacters = possibleCharacters.concat(upperCasedCharacters);
    guaranteedCharacters.push(getRandom(upperCasedCharacters));
  }

  // For loop to iterate over the password length from the options object, selecting random INDICES from the array of possible characters and concatenating those characters into the result variable.
  for (var i = 0; i < options.length; i++) {
    var possibleCharacter = getRandom(possibleCharacters);
    result.push(possibleCharacter);
  }

  // Mix in AT LEAST ONE OF EACH guaranteed character in the result.
  for (var i = 0; i < guaranteedCharacters.length; i++) {
    result[i] = guaranteedCharacters[i];
  }

  // Transform the result into a string and pass into writePassword.
  return result.join('');
}

// Get references to the #generate element.
var generateBtn = document.querySelector('#generate');

// Write password to the #password input.
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add EVENT LISTENER (click) to generate button.
generateBtn.addEventListener('click', writePassword);
