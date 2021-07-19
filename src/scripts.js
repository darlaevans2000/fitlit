import UserRepository from './UserRepository';
import User from './User';
import Hydration from './Hydration';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import './css/styles.css';
// import './images/turing-logo.png'
import apiCalls from './data/apiCalls'
const currentDate = '2019/09/22';
const startDate = '2019/09/15';

let userRepo, currentUser, userData, activityData, sleepData, hydrationData;

const homeBtn = document.getElementById('homeButton');

const hydrationBtn = document.getElementById('hydrationButton');
const hydrationPage = document.getElementById('hydrationPage');
const dailyWater = document.getElementById('userDailyWater');

const userHoursSlept = document.getElementById('userHoursSlept');
const userSleepQuality = document.getElementById('userSleepQuality');
const userAvgSleepQuality = document.getElementById('avgSleepQuality');
const userAvgHoursSlept = document.getElementById('avgHoursSlept');
const sleepBtn = document.getElementById('sleepButton');

const activityBtn = document.getElementById('activityButton');
const userDailyStepCount = document.getElementById('userDailyStepCount');
const userDailyDistance = document.getElementById('userDailyDistance');
const userDailyMinActive = document.getElementById('userDailyMinActive');
const compareUserDailyActivity = document.getElementById('compareUserDailyActivity');




const userInfoBtn = document.getElementById('userButton');
const homePage = document.getElementById('homePage');
const sleepPage = document.getElementById('sleepPage');
const activityPage = document.getElementById('activityPage');
const userInfoPage = document.getElementById('userInfo');
const userInfoBox = document.getElementById('userInfoBox');
const headerMessage = document.getElementById('headerMessage');
const headerDate = document.getElementById('headerDate')
const userAvgStepGoal = document.getElementById('avgStepGoal');
const ctx = document.getElementById('myChart');

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
  dailyWater.innerText = `${dailyOz} oz`;
  // displayWeekHydrationChart() ON LN 117
}

  // function displayWeekHydrationChart(){

  // }

function displaySleepData() {
  displayCurrentSleepData()
  displayAvgSleepData()
  // displayWeeklySleepChart()
}

function displayCurrentSleepData() {
  const dailyHoursSlept = currentUser.getSleepDataByDate(sleepData, currentDate, 'hoursSlept');
  const dailySleepQuality = currentUser.getSleepDataByDate(sleepData, currentDate, 'sleepQuality');
  userHoursSlept.innerText = `${dailyHoursSlept}`;
  userSleepQuality.innerText = `${dailySleepQuality}`;
}

function displayAvgSleepData() {
  const avgHoursSlept = currentUser.getAvgSleepData(sleepData, 'hoursSlept');
  const avgSleepQuality = currentUser.getAvgSleepData(sleepData, 'sleepQuality');
  userAvgHoursSlept.innerText = `${avgHoursSlept}`;
  userAvgSleepQuality.innerText = `${avgSleepQuality}`;
}


function viewSleep() {
  sleepPage.classList.remove('hidden')
  hide([activityPage, userInfoPage, homePage, hydrationPage])
  viewSleepChart();
  displaySleepData()
}

function displayActivityData() {
  displayDailySteps()
  displayMinutesActive()
  displayActivityStatComparison()
  // displayActivityChart()
}

function displayDailySteps() {
  const userDailySteps = currentUser.getActivityDataByDate(activityData, currentDate, 'numSteps');
  const userDistance = currentUser.getDailyMilesWalked(activityData, currentDate);
  userDailyStepCount.innerText = `${userDailySteps}`;
  userDailyDistance.innerText = `${userDistance}`;
}

function displayMinutesActive() {
  const userMinActive = currentUser.getActivityDataByDate(activityData, currentDate, 'minutesActive');
  userDailyMinActive.innerText = `${userMinActive}`;
}

function displayActivityStatComparison() {
  const usersDailySteps = currentUser.getActivityDataByDate(activityData, currentDate, 'numSteps');
  const usersDailyMinActive = currentUser.getActivityDataByDate(activityData, currentDate, 'minutesActive');
  const usersDailyStairs = currentUser.getActivityDataByDate(activityData, currentDate, 'flightsOfStairs');

  const userWideDailySteps = userRepo.getAllUsersAvgByDate(currentDate, 'numSteps', activityData);
  const userWideDailyMinActive = userRepo.getAllUsersAvgByDate(currentDate, 'minutesActive', activityData);
  const userWideDailyStairs = userRepo.getAllUsersAvgByDate(currentDate, 'flightsOfStairs', activityData);

  const stepComparison = Math.round((usersDailySteps / userWideDailySteps) * 100);
  const minComparison = Math.round((usersDailyMinActive / userWideDailyMinActive) * 100);
  const stairComparison = Math.round((usersDailyStairs / userWideDailyStairs) * 100);

  compareUserDailyActivity.innerText = `
      Steps: ${stepComparison}%
      Min: ${minComparison}%
      Stairs: ${stairComparison}%`;
}


function viewActivity() {
  activityPage.classList.remove('hidden')
  hide([userInfoPage, homePage, hydrationPage, sleepPage])
  displayActivityData()
}


function hide(elements) {
  elements.forEach(element => element.classList.add('hidden'));
}

function show(elements) {
  elements.forEach(element => element.classList.remove('hidden'))
}

function viewSleepChart() {
  const sleepChart = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(sleepChart, {
    type: 'bar',
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [{
            label: '# of Hours',
            data: [6, 7, 8, 8, 6, 6],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
};


// For a specific user, display how their step goal compares to the average step goal amongst all users (this display should not be hard-coded)
