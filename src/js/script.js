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


submitBtn.addEventListener('click', e => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  const user = new User(name,email,message);
  if([user.name,user.email,user.message].every(field => field.length > 0)){
    showLoadingMsg();
    showSuccessMsg();
    
  } else{
    showLoadingMsg();
    showFailedMsg();
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
