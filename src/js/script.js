function User(name,email,message){
  this.name = name;
  this.email = email;
  this.message = message;
}

const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const submitBtn = document.querySelector('#submitBtn');
const clientList = document.querySelector('#clientList');
const loadingMsg = document.querySelector('#loadingMsg');
const successMsg = document.querySelector('#successMsg');
const failedMsg = document.querySelector('#failedMsg');

window.addEventListener('DOMContentLoaded', () => {
  const savedUsers = getInfo();
  if (savedUsers){
    savedUsers.forEach(x =>  {showClientFeedback(x);})
  }
})

submitBtn.addEventListener('click', e => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  const user = new User(name,email,message);
  if([user.name,user.email,user.message].every(field => field.length > 0)){
    showLoadingMsg();
    showSuccessMsg();
    clearInputs();
    showClientFeedback(user);
    saveInfo(user);
  } else{
    showLoadingMsg();
    showFailedMsg();
    clearInputs();
  }
})


const showLoadingMsg = () => {
  loadingMsg.classList.remove('hidden');
}

const showSuccessMsg = () => {
  successMsg.classList.toggle('hidden');
}

const showFailedMsg = () => {
  failedMsg.classList.remove('hidden');
}

const clearInputs = () => {
    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";
}

const showClientFeedback = item => {
  let clientInfo = document.createElement('li');
  clientInfo.textContent = `Name: ${item.name}, Email: ${item.email}, Message: ${item.message}`;
  clientList.append(clientInfo);
}

const saveInfo = item => {
  const existing = getInfo() || [];
  existing.push(item);
  localStorage.setItem('client', JSON.stringify(existing))
}

function getInfo(){
  return JSON.parse(localStorage.getItem('client'));
}


