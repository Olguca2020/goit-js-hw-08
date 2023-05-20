import throttle from 'lodash.throttle';
const refs = {
  form: document.querySelector(`.feedback-form`),
  inputEmail: document.querySelector(`input[type="email"]`),
  textarea: document.querySelector(`textarea[name="message"]`),
  btnSubmit: document.querySelector(`button[type="submit"]`),
};

refs.textarea.addEventListener(`input`, throttle(onTextareaInput, 500));
refs.inputEmail.addEventListener(`input`, onEmailInput);
// refs.form.addEventListener(`submit`, onFormSubmit);

function onTextareaInput(e) {
  const message = e.currentTarget.value;
  console.log(message);
}
function onEmailInput(e) {
  const email = e.currentTarget.value;
  return email;
}
const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

export default {
  save,
  load,
};
