import throttle from 'lodash.throttle';
const form = document.querySelector(`.feedback-form`);
const emailInput = document.querySelector(`input[type="email"]`);
const textareaInput = document.querySelector(`textarea[name="message"]`);

const formData = {};
form.addEventListener(`input`, throttle(onInput, 500));
form.addEventListener(`submit`, onFormSubmit);

populateForm();

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}
function onInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}
function populateForm() {
  const savedForm = localStorage.getItem('feedback-form-state');
  if (savedForm) {
    const parsForm = JSON.parse(savedForm);
    emailInput.value = parsForm.email;
    textareaInput.value = parsForm.message;
  }
}
