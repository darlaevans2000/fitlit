import { expect } from 'chai';
import User from '../src/User';
const userTestData = require('../src/data/userTestData')
const hydrationTestData = require('../src/data/hydrationTestData')
const sleepTestData = require('../src/data/sleepTestData')
const activityTestData = require('../src/data/activityTestData');

describe('User', () => {
  let user1

  beforeEach(() => {
    user1 = new User(userTestData[0]);
  });

  it('Should be a function', () => {
    expect(User).to.be.a('function')
  });

  it('Should be an instance of User', () => {
    expect(user1).to.be.an.instanceof(User);
  });

  it('Should have an id', () => {
    expect(user1.id).to.equal(1);
  });

  it('Should have an name', () => {
    expect(user1.name).to.equal('Herminia Witting');
  });

  it('Shoud have an address', () => {
    expect(user1.address).to.equal(
      '85823 Bosco Fork, East Oscarstad MI 85126-5660')
  });

  it('Should have an email', () => {
    expect(user1.email).to.equal('Elwin.Tromp@yahoo.com');
  });

  it('Should have a stride length', () => {
    expect(user1.strideLength).to.equal(4.4);
  });

  it('Should have a daily step goal', () => {
    expect(user1.dailyStepGoal).to.equal(8000);
  });

  it('Should have a list of friends', () => {
    expect(user1.friends).to.deep.equal([19, 11, 42, 33])
  });

  it('Should be able to return only users first name', () => {
    expect(user1.returnFirstName()).to.equal('Herminia');
  })

  //hydration
  it('should be able to retrieve the ounces consumed by a user on a specific date', function() {
    const numOunces = user1.getDailyOunces('2019/06/18', hydrationTestData);
    
    expect(numOunces).to.equal(80);
  });
  
  it('should calculate the average daily water intake for a user', function() {
    const avgDailyWater = user1.calculateAvgDailyWater(hydrationTestData);

    expect(avgDailyWater).to.equal(75);
  });

  it('should be able to retrieve the daily water intake for a user over the course of a week', function() {
    const ouncesOverWeek = user1.getWeeklyOunces('2019/06/15', hydrationTestData);

    expect(ouncesOverWeek).to.deep.equal([ 100, 50, 20, 80, 60, 90, 100 ]);
  });

  // sleep
  it('should be able to retrieve the hours slept by a user on a specific date', function() {
    const hoursSlept = user1.getSleepDataByDate(sleepTestData, '2019/06/17', 'hoursSlept');

    expect(hoursSlept).to.equal(10);
  });

  it('should be able to retrieve the sleep quality of a user on a specific date', function() {
    const sleepQuality = user1.getSleepDataByDate(sleepTestData, '2019/06/16', 'sleepQuality');

    expect(sleepQuality).to.equal(2);
  });

  it('should calculate a users average daily hours slept', function() {
    const avgHrsSlept = user1.getAvgSleepData(sleepTestData, 'hoursSlept');

    expect(avgHrsSlept).to.equal(7.6);
  });

  it('should calculate a users average daily sleep quality', function() {
    const avgSleepQuality = user1.getAvgSleepData(sleepTestData, 'sleepQuality');

    expect(avgSleepQuality).to.equal(3.4);
  });

  it('should be able to retrieve the hours slept data for a user throughout a given week', function() {
    const hoursSleptWeek = user1.getSleepDataByWeek(sleepTestData, '2019/06/15', 'hoursSlept');
    
    expect(hoursSleptWeek).to.deep.equal([ 6, 6, 10, 8, 5, 10, 8 ]);
  });

  it('should be able to retrieve the sleep quality data for a user throughout a given week', function() {
    const sleepQualityWeek = user1.getSleepDataByWeek(sleepTestData, '2019/06/15', 'sleepQuality');

    expect(sleepQualityWeek).to.deep.equal([ 3, 2, 4, 4, 2, 4, 5 ]);
  });

  // Activity 
  it('should be able to calculate the miles walked by a user on a specific date', function() {
    const userMiles = user1.getDailyMilesWalked(activityTestData, '2019/06/16');

    expect(userMiles).to.equal(2.7);
  });

  it('should retrieve the number of steps for a user on a given date', function() {
    const numSteps = user1.getActivityDataByDate(activityTestData, '2019/06/15', 'numSteps');

    expect(numSteps).to.equal(3517);
  });

  it('should retrieve minutes active for a user on a given date', function() {
    const minActive = user1.getActivityDataByDate(activityTestData, '2019/06/15', 'minutesActive');

    expect(minActive).to.equal(101);
  });

  it('should determine whether a user reached their step goal on a given date', function() {
    const userStepGoal = user1.getStepGoalResult(activityTestData, '2019/06/16');

    expect(userStepGoal).to.equal(false);
  });

  it('should calculate the average minutes active for a user during a given week', function() {
    const avgMinutes = user1.getActivityAvgByWeek(activityTestData, '2019/06/15', 'minutesActive');

    expect(avgMinutes).to.equal(154);
  });

  it('should identify dates when user exceeded step goal', function() {
    const userStepGoalDays = user1.getDatesExceedingStepGoal(activityTestData);

    expect(userStepGoalDays).to.deep.equal(['2019/06/17', '2019/06/18', '2019/06/20', '2019/06/21']);
  });

  it('should retrieve the most flights climbed record for a user', function () {
    const flightRecord = user1.getFlightsClimbedRecord(activityTestData);

    expect(flightRecord).to.equal(37);
  });
})
