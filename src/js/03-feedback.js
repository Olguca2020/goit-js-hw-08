import throttle from 'lodash.throttle';
const form = document.querySelector(`.feedback-form`);
const emailInput = document.querySelector(`input[type="email"]`);
const textareaInput = document.querySelector(`textarea[name="message"]`);

let formData = {};
form.addEventListener(`input`, throttle(onInput, 500));
form.addEventListener(`submit`, onFormSubmit);

populateForm();

function onInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}
function populateForm() {
  const savedForm = localStorage.getItem('feedback-form-state');
  if (savedForm) {
    formData = JSON.parse(savedForm);
    emailInput.value = formData.email;
    textareaInput.value = formData.message;
  }
}
function onFormSubmit(e) {  
  if (emailInput.value.trim() === '' || textareaInput.value.trim() === '') {
    alert('Заповніть порожні поля форми');
  } else {
    e.preventDefault();
    console.log(formData);
    e.currentTarget.reset();
    localStorage.removeItem('feedback-form-state');
    formData = {};
  }
}
