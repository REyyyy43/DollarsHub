//Rgex validation
const EMAIL_VALIDATION = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const PASSWORD_VALIDATION = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const NAME_VALIDATION = /^[A-Z\u00d1][a-zA-Z-ÿ\u00f1\u00d1]+(\s*[A-Z\u00d1][a-zA-Z-ÿ\u00f1\u00d1\s]*)$/;
const PHONE_VALIDATION = /^[0-9]{6,16}$/;

//SElectors
const countries = document.querySelector("#countries");
const nameInput = document.querySelector("#name-input");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const matchInput = document.querySelector("#match-input");
const phoneInput = document.querySelector("#phone-input");
const formBtn = document.querySelector('#form-btn');

[...countries].forEach(option => {
    option.innerHTML = option.innerHTML.split('(')[0];
});

// EVENTS
nameInput.addEventListener('input', e => {
    nameValidation = NAME_VALIDATION.test(e.target.value);
    validation(nameInput, nameValidation);
});
emailInput.addEventListener('input', e => {
    emailValidation = EMAIL_VALIDATION.test(e.target.value);
    validation(emailInput, emailValidation);
});
phoneInput.addEventListener('input', e => {
    phoneValidation = PHONE_VALIDATION.test(e.target.value);
    validation(phoneInput, phoneValidation);
});
passwordInput.addEventListener('input', e => {
    passwordValidation = PASSWORD_VALIDATION.test(e.target.value);
    matchValidation = e.target.value === matchInput.value;
    validation(passwordInput, passwordValidation);
    validation(matchInput, matchValidation);
});
matchInput.addEventListener('input', e => {
    matchValidation = e.target.value === passwordInput.value;
    validation(matchInput, matchValidation);
});

// Validacion
let nameValidation = false;
let emailValidation = false;
let passwordValidation = false;
let matchValidation = false;
let phoneValidation = false;

const validation = (input , regexValidation) => {
    formBtn.disabled = !nameValidation || !emailValidation || !passwordValidation || !matchValidation || !phoneValidation;

    if (input.value === '') {
        input.classList.remove('outline-red-500', 'outline-2' , 'outline' );
        input.classList.remove('outline-green-500' , 'outline-2' , 'outline');
        input.classList.add('outline-none');
    } else if (regexValidation) {
        input.classList.remove('outline-none');
        input.classList.add('outline-green-500'  , 'outline-2' , 'outline');
        formBtn.classList.remove('disabled' , 'cursor-not-allowed');
    } else if (!regexValidation){
        input.classList.remove('outline-none');
        input.classList.remove('outline-green-500' , 'outline-2' , 'outline' );
        input.classList.add('outline-red-500' , 'outline-2' , 'outline');
        formBtn.classList.add('disabled' , 'cursor-not-allowed');
    }

};





