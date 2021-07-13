import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import './css/styles.css';
import './images/turing-logo.png'


const homeBtn = document.getElementById('headerDate');
const userInfoBtn = document.getElementById('headerMessage');
const homePage = document.getElementById('homePage');
const userInfoPage = document.getElementById('userInfo');

function generateRandomNum(list){
  return Math.round(Math.random() * list.length);
}

const newUserID = Math.floor(Math.random() * (50 - 1 + 1)) + 1;

fetchData('users/userData')
  .then(userData => {
    const userRepo = new UserRepo(userData.userData);
    const user = new User(userRepo.returnUserData(uniqueUserID));
}

//displayUserName()

//compareStepGoal()

function hide(elements) {
  elements.forEach(element => element.classList.add('hidden'));
}

function show(elements) {
  elements.forEach(element => element.classList.remove('hidden'))
}








// For a specific user, display how their step goal compares to the average step goal amongst all users (this display should not be hard-coded)
