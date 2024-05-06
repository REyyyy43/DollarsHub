const form = document.querySelector('#form');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const formBtn = document.querySelector('#form-btn');
const errorText = document.querySelector('#error-text');
//Rgex validation

const EMAIL_VALIDATION = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const PASSWORD_VALIDATION = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

// Validacion
let emailValidation = false;
let passwordValidation = false;

const validation = (input , regexValidation) => {
    formBtn.disabled = !emailValidation || !passwordValidation;

    if (input.value === '') {
        input.classList.remove('border-b-red-500', 'outline-none');
        input.classList.remove('border-b-green-500' , 'outline-none');
        input.classList.add('focus:border-b-cyan-950');
    } else if (regexValidation) {
        input.classList.remove('focus:border-b-cyan-950');
        input.classList.add('border-b-green-500'  , 'outline-none' , 'border-4' , 'border-r-0', 'border-x-0', 'border-t-0', 'border-spacing-0');
    } else if (!regexValidation){
        input.classList.remove('focus:border-b-cyan-950');
        input.classList.remove('border-b-green-500' , 'outline-none' , 'border-r-0', 'border-x-0', 'border-t-0', 'border-spacing-0');
        input.classList.add('border-b-red-500' , 'outline-none' , 'border-4' , 'border-r-0', 'border-x-0', 'border-t-0', 'border-spacing-0');
    }
};
// EVENTS

emailInput.addEventListener('input', e => {
    emailValidation = EMAIL_VALIDATION.test(e.target.value);
    validation(emailInput, emailValidation);
});

passwordInput.addEventListener('input', e => {
    passwordValidation = PASSWORD_VALIDATION.test(e.target.value);
    validation(passwordInput, passwordValidation);
});


form.addEventListener('submit', async e => {
    e.preventDefault();
    try {
        const user = {
            email: emailInput.value,
            password: passwordInput.value,
        };
        const { data } = await axios.post('/api/login', user);
        if(data.role === 'admin') {
            window.location.pathname = `/Admin/`
        } else {
            window.location.pathname = `/ABarberP/`
        }
    } catch (error) {
       console.log(error); 
       errorText.innerHTML = error.response.data.error;
    }
});

