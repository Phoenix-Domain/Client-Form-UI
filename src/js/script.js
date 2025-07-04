function User(name,email,msg){
  this.name = name;
  this.email = email;
  this.msg = msg;
}

const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msgInput = document.querySelector('#msg');
const submitBtn = document.querySelector('#submitBtn');
const loadingMsg = document.querySelector('#loadingMsg');
const successMsg = document.querySelector('#successMsg');
const failedMsg = document.querySelector('#failedMsg');
const users = document.querySelector('#userList');

window.addEventListener('DOMContentLoaded', () => {
  const currentUsers = getUser();
  if(currentUsers){
    currentUsers.forEach(x => {
      addUsers(x);
    })
  }
});

submitBtn.addEventListener('click', e => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const msg = msgInput.value.trim();
  
  const user = new User(name,email,msg);
  if ([user.name,user.email,user.msg].every(x => x.length > 0)){
    showLoadingMsg();
    showSuccessMsg();
    addUsers(user);
    saveUser(user);
    clearInput(user);
    autoHideMsg()

  } else{
    showFailedMsg();
  }
})

const showLoadingMsg = () => {
  loadingMsg.classList.remove('hidden');
}

const showSuccessMsg = () => {
  successMsg.classList.remove('hidden');
}

const showFailedMsg = () => {
  failedMsg.classList.remove('hidden');
}

const addUsers = item => {
  const userList = document.createElement('li');
  userList.textContent = `Congratulations ${item.name}, your message has been submitted.`;
  users.append(userList);
}

const clearInput = item => {
  nameInput.value = "";
  emailInput.value ="";
  msgInput.value = ""
}

const saveUser = item => {
  const existing = getUser() || [];
  existing.push(item)
  localStorage.setItem('client', JSON.stringify(existing))
}

const getUser = () => {
  return JSON.parse(localStorage.getItem('client'));
}

const autoHideMsg = () => {
  setTimeout(() => {
    loadingMsg.classList.add('hidden');
    successMsg.classList.add('hidden');
    failedMsg.classList.add('hidden');
  }, 3000)
}