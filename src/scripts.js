import UserRepository from './UserRepository';
import User from './User';
import {
  Chart,
  registerables
} from 'chart.js';
Chart.register(...registerables);
import './css/styles.css';
import apiCalls from './data/apiCalls'
const currentDate = '2019/09/21';
const startDate = '2019/09/15';
let userWeeklyWater, userWeeklySleepHrs, userWeeklySleepQual, userWeeklySteps;
let userWeeklyMinActive, userWeeklyFlightsOfStairs;
let userRepo, currentUser, userData, activityData, sleepData, hydrationData;

//HOME PAGE QS
const homeBtn = document.getElementById('homeButton');
const homePage = document.getElementById('homePage');
const headerMessage = document.getElementById('headerMessage');
const headerDate = document.getElementById('headerDate');
const userStepGoal = document.getElementById('userStepGoal');
//HYDRATION PAGE QS
const hydrationBtn = document.getElementById('hydrationButton');
const hydrationPage = document.getElementById('hydrationPage');
const dailyWater = document.getElementById('userDailyWater');
const weeklyHydrationChart = document.getElementById('userWeeklyWaterChart');
//SLEEP PAGE QS
const sleepPage = document.getElementById('sleepPage');
const userHoursSlept = document.getElementById('userHoursSlept');
const userSleepQuality = document.getElementById('userSleepQuality');
const userAvgSleepQuality = document.getElementById('avgSleepQuality');
const userAvgHoursSlept = document.getElementById('avgHoursSlept');
const sleepBtn = document.getElementById('sleepButton');
const weeklySleepHrsChart = document.getElementById('userWeeklySleepHrsChart');
const weeklySleepQualChart = document.getElementById('userWeeklySleepQualChart');
//ACTIVITY PAGE QS
const activityPage = document.getElementById('activityPage');
const activityBtn = document.getElementById('activityButton');
const userDailyStepCount = document.getElementById('userDailyStepCount');
const userDailyDistance = document.getElementById('userDailyDistance');
const userDailyFlightCount = document.getElementById('userDailyFlightCount');
const userDailyMinActive = document.getElementById('userDailyMinActive');
const compareUserDailyActivity = document.getElementById('compareUserDailyActivity');
const weeklyStepsChart = document.getElementById('weeklyStepsChart');
const weeklyMinActiveChart = document.getElementById('weeklyMinActiveChart');
const weeklyFlightsChart = document.getElementById('weeklyFlightsChart');
const userAvgStepGoal = document.getElementById('avgStepGoal');
//USER INFO QS
const userInfoBtn = document.getElementById('userButton');
const userInfoPage = document.getElementById('userInfo');
const userInfoBox = document.getElementById('userInfoBox');

window.addEventListener("load", setData);
userInfoBtn.addEventListener("click", displayUserPage);
homeBtn.addEventListener("click", viewHome);
hydrationBtn.addEventListener("click", viewHydration);
sleepBtn.addEventListener("click", viewSleep);
activityBtn.addEventListener("click", viewActivity);

// GET RANDOM
function getRandomIndex(array) {
  const index = Math.floor(Math.random() * array.length);
  return index;
}

//SET DATA, LOAD PAGE, HOME, USER INFO PG
function setData() {
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

function getPrettyDate(currDate) {
  var date = new Date(currDate);
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

// CHARTS
function displayWeekHydrationChart() {
  if (userWeeklyWater !== undefined) {
    userWeeklyWater.destroy();
  }
  userWeeklyWater = new Chart(weeklyHydrationChart, {
    type: 'bar',
    data: {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'TODAY'],
      datasets: [{
        label: 'Ounces of Water',
        backgroundColor: '#4d65f0',
        data: currentUser.getWeeklyOunces(startDate, hydrationData),
      }],
    },
    options: {
      legend: {
        display: true
      },
    }
  });
}

function displayWeeklySleepHoursChart() {
  if (userWeeklySleepHrs !== undefined) {
    userWeeklySleepHrs.destroy();
  }
  userWeeklySleepHrs = new Chart(weeklySleepHrsChart, {
    type: 'bar',
    data: {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'TODAY'],
      datasets: [{
        label: 'Hours of Sleep',
        backgroundColor: '#728cb5',
        data: currentUser.getSleepDataByWeek(sleepData, startDate, 'hoursSlept'),
      }],
    },
    options: {
      legend: {
        display: true
      },
    }
  });
}

function displayWeeklySleepQualChart() {
  if (userWeeklySleepQual !== undefined) {
    userWeeklySleepQual.destroy();
  }
  userWeeklySleepQual = new Chart(weeklySleepQualChart, {
    type: 'bar',
    data: {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'TODAY'],
      datasets: [{
        label: 'Sleep Quality',
        backgroundColor: '#a172b5',
        data: currentUser.getSleepDataByWeek(sleepData, startDate, 'sleepQuality'),
      }],
    },
    options: {
      legend: {
        display: true
      },
    }
  });
}

function displayWeeklyStepsChart() {
  if (userWeeklySteps !== undefined) {
    userWeeklySteps.destroy();
  }
  userWeeklySteps = new Chart(weeklyStepsChart, {
    type: 'bar',
    data: {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'TODAY'],
      datasets: [{
        label: 'Steps',
        backgroundColor: '#ad1136',
        data: currentUser.getActivityDataByWeek(activityData, startDate, 'numSteps'),
      }],
    },
    options: {
      legend: {
        display: true
      },
    }
  });
}

function displayWeeklyMinActiveChart() {
  if (userWeeklyMinActive !== undefined) {
    userWeeklyMinActive.destroy();
  }
  userWeeklyMinActive = new Chart(weeklyMinActiveChart, {
    type: 'bar',
    data: {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'TODAY'],
      datasets: [{
        label: 'Minutes Active',
        backgroundColor: 'pink',
        data: currentUser.getActivityDataByWeek(activityData, startDate, 'minutesActive'),
      }],
    },
    options: {
      legend: {
        display: true
      },
    }
  });
}

function displayWeeklyFlightsChart() {
  if (userWeeklyFlightsOfStairs !== undefined) {
    userWeeklyFlightsOfStairs.destroy();
  }
  userWeeklyFlightsOfStairs = new Chart(weeklyFlightsChart, {
    type: 'bar',
    data: {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'TODAY'],
      datasets: [{
        label: 'Flights of Stairs',
        backgroundColor: '#2cb088',
        data: currentUser.getActivityDataByWeek(activityData, startDate, 'flightsOfStairs'),
      }],
    },
    options: {
      legend: {
        display: true
      },
    }
  });
}

//HYDRATION PAGE
function viewHydration() {
  hydrationPage.classList.remove('hidden')
  hide([sleepPage, activityPage, userInfoPage, homePage])
  const dailyOz = currentUser.getDailyOunces(currentDate, hydrationData);
  dailyWater.innerText = `${dailyOz} oz`;
  displayWeekHydrationChart()
}

// SLEEP PAGE
function displaySleepData() {
  displayCurrentSleepData()
  displayAvgSleepData()
  displayWeeklySleepHoursChart()
  displayWeeklySleepQualChart()
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
  displaySleepData()
}

// ACTIVITY PAGE
function displayActivityData() {
  displayDailySteps()
  displayMinutesActive()
  displayActivityStatComparison()
  displayWeeklyStepsChart()
  displayWeeklyMinActiveChart()
  displayWeeklyFlightsChart()
}

function displayDailySteps() {
  const userDailySteps = currentUser.getActivityDataByDate(activityData, currentDate, 'numSteps');
  const userDistance = currentUser.getDailyMilesWalked(activityData, currentDate);
  const userFlights = currentUser.getActivityDataByDate(activityData, currentDate, 'flightsOfStairs');
  userDailyStepCount.innerText = `${userDailySteps}`;
  userDailyDistance.innerText = `${userDistance}`;
  userDailyFlightCount.innerText = `${userFlights}`;
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

//HIDE
function hide(elements) {
  elements.forEach(element => element.classList.add('hidden'));
}
