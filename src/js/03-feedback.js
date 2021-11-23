import throttle from 'lodash.throttle';

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
};

const FEEDBACK_FORM = 'feedback-form-state';
let dataUser = {};

if (localStorage.getItem(FEEDBACK_FORM)) {
    dataUser = JSON.parse(localStorage.getItem(FEEDBACK_FORM));
    refs.input.value = dataUser.email;
    refs.textarea.value = dataUser.password;
}

refs.form.addEventListener('submit', onFormSubmit);
refs.input.addEventListener('input', throttle(onFormInput, 500));
refs.textarea.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(event) {
    event.preventDefault();
    refs.input.value = '';
    refs.textarea.value = '';
    console.log(dataUser);
    localStorage.removeItem(FEEDBACK_FORM);
}



function onFormInput(event) {
    let formData = new FormData(refs.form);
    formData.forEach((value, name) => {
        if (name === 'email') {
            value = value.toLocaleLowerCase();
        }

        if (name === 'message') {
            name = 'password';
        }

        dataUser[name] = value;
    });

    localStorage.setItem(FEEDBACK_FORM, JSON.stringify(dataUser));
    refs.input.value = refs.input.value.toLocaleLowerCase();
}