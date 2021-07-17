import { expect } from 'chai';
import User from '../src/User';
const userTestData = require('../src/data/userTestData')
const hydrationTestData = require('../src/data/hydrationTestData')

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
})
