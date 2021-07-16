import UserRepository from './UserRepository';
import User from './User';
import Hydration from './Hydration';
import './css/styles.css';
// import './images/turing-logo.png'
import apiCalls from './data/apiCalls'
const currentDate = '2019/09/22';
const startDate = '2019/09/15';
let userRepo;
let currentUser;
let userData, activityData, sleepData, hydrationData;

const homeBtn = document.getElementById('homeButton');
const hydrationBtn = document.getElementById('hydrationButton');
const sleepBtn = document.getElementById('sleepButton');
const activityBtn = document.getElementById('activityButton');
const userInfoBtn = document.getElementById('userButton');
const homePage = document.getElementById('homePage');
const sleepPage = document.getElementById('sleepPage');
const hydrationPage = document.getElementById('hydrationPage');
const dailyWater = document.getElementById('userDailyWater');
const activityPage = document.getElementById('activityPage');
const userInfoPage = document.getElementById('userInfo');
const userInfoBox = document.getElementById('userInfoBox');
const headerMessage = document.getElementById('headerMessage');
const headerDate = document.getElementById('headerDate')
const userAvgStepGoal = document.getElementById('avgStepGoal');

window.addEventListener("load", setData);
userInfoBtn.addEventListener("click", displayUserPage);
homeBtn.addEventListener("click", viewHome);
hydrationBtn.addEventListener("click", viewHydration);
sleepBtn.addEventListener("click", viewSleep);
activityBtn.addEventListener("click", viewActivity);


function getRandomIndex(array) {
  const index = Math.floor(Math.random() * array.length);
  return index;
}


function setData () {
  apiCalls.getData()
  .then(promise => {
    userData = promise[0]['userData'];
    hydrationData = promise[1]['hydrationData'];
    sleepData = promise[2]['sleepData']
    activityData = promise[3]['activityData']
    userRepo = new UserRepository(userData);
    currentUser = new User(userRepo.findUserData(getRandomIndex(userData)));
    loadPage()
  })
}

function loadPage() {
    displayHomeData();
}

function getPrettyDate(date) {
var date = new Date(date);  
let str = date.toDateString(); 
return str
}

function displayHomeData() {
  currentUser.firstName = currentUser.returnFirstName();
  const avgStepGoal = userRepo.findAverageUserGoal();
  headerMessage.innerText = `Welcome, ${currentUser.firstName}!`;
  userStepGoal.innerText = `${currentUser.dailyStepGoal}`;
  userAvgStepGoal.innerText = `${avgStepGoal}`;
  headerDate.innerText = `${getPrettyDate(currentDate)}`;

}

function displayUserPage() {
  hide([hydrationPage, sleepPage, activityPage, homePage])
  userInfoPage.classList.remove("hidden")
  userInfoBox.innerHTML = `
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

function viewHydration() {
  hydrationPage.classList.remove('hidden')
  hide([sleepPage, activityPage, userInfoPage, homePage])
  const dailyOz = currentUser.getDailyOunces(currentDate, hydrationData);
  displayWeekHydrationChart()
  dailyWater.innerText = `${dailyOz} oz`;
}

function viewSleep() {
  sleepPage.classList.remove('hidden')
  hide([activityPage, userInfoPage, homePage, hydrationPage])
}

function viewActivity() {
  activityPage.classList.remove('hidden')
  hide([userInfoPage, homePage, hydrationPage, sleepPage])
}


function hide(elements) {
  elements.forEach(element => element.classList.add('hidden'));
}

function show(elements) {
  elements.forEach(element => element.classList.remove('hidden'))
}


// For a specific user, display how their step goal compares to the average step goal amongst all users (this display should not be hard-coded)
