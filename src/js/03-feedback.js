import throttle from 'lodash.throttle';

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
};

const FEEDBACK_FORM = 'feedback-form-state';

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onInput, 500));

settleInput();

function onFormSubmit(event) {
    event.preventDefault();

    event.currentTarget.reset();
    localStorage.removeItem(FEEDBACK_FORM);
    console.log(FormData);
}

const formData = {};

function onInput(event) {
    FormData[event.target.name] = event.target.value;
    localStorage.setItem(FEEDBACK_FORM, JSON.stringify(formData));
}

function settleInput() {
    const savedMessage = localStorage.getItem(FEEDBACK_FORM);
    const parsedMessage = JSON.parse(savedMessage);

    if (parsedMessage) {
        refs.input.value = parsedMessage.email;
        refs.textarea.value = parsedMessage.message;
    }
}