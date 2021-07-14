import UserRepository from './UserRepository';
import User from './User';
import userData from '../src/data/users';
import './css/styles.css';
import './images/turing-logo.png'
let userRepo;
let currentUser;

const homeBtn = document.getElementById('homeButton');
const userInfoBtn = document.getElementById('userButton');
const homePage = document.getElementById('homePage');
const sleepPage = document.getElementById('sleepPage');
const hydrationPage = document.getElementById('hydrationPage');
const activityPage = document.getElementById('activityPage');
const userInfoPage = document.getElementById('userInfo');
const headerMessage = document.getElementById('headerMessage');
const userAvgStepGoal = document.getElementById('avgStepGoal');

window.addEventListener("load", loadPage);
userInfoBtn.addEventListener("click", displayUserPage);
homeBtn.addEventListener("click", viewHome);


function getRandomIndex(array) {
  const index = Math.floor(Math.random() * array.length);
  return index;
}

// function fetchData('users/userData') {
//   .then(userData => {
//     const userRepo = new UserRepo(userData.userData);
//     const user = new User(userRepo.returnUserData(uniqueUserID));
// }
// };

function loadPage() {
    userRepo = new UserRepository(userData);
    currentUser = new User(userRepo.findUserData(getRandomIndex(userData)));
    displayHomeData();
}

function displayHomeData() {
  currentUser.firstName = currentUser.returnFirstName();
  const avgStepGoal = userRepo.findAverageUserGoal();
  headerMessage.innerText = `Welcome, ${currentUser.firstName}!`;
  userStepGoal.innerText = `${currentUser.dailyStepGoal}`;
  userAvgStepGoal.innerText = `${avgStepGoal}`;
  //need to add date display that shows current date once activity data is added
}

function displayUserPage() {
  hide([hydrationPage, sleepPage, activityPage, homePage])
  userInfoPage.classList.remove("hidden")
  userInfoPage.innerHTML = `
    <p class='name' id='name'>${currentUser.name}</p>
    <p class='address' id='address'>${currentUser.address}</p>
    <p class='email' id='email'>${currentUser.email}</p>
    <p class='stride' id='stride'>stride length: ${currentUser.strideLength}
    </p>`;
}

function viewHome() {
  homePage.classList.remove('hidden')
  hide([hydrationPage, sleepPage, activityPage, userInfoPage])
}

function hide(elements) {
  elements.forEach(element => element.classList.add('hidden'));
}

function show(elements) {
  elements.forEach(element => element.classList.remove('hidden'))
}








// For a specific user, display how their step goal compares to the average step goal amongst all users (this display should not be hard-coded)
