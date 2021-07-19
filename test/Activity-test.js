import { expect } from 'chai';
import Activity from '../src/Activity';
const activityTestData = require('../src/data/activityTestData');

describe('Activity', () => {

  let activity;

  beforeEach(() => {
    activity = new Activity(activityTestData[0]);
  });

  it('Should be a function', () => {
    expect(Activity).to.be.a('function');
  });

  it('Should be an instance of Activity', () => {
    expect(activity).to.be.an.instanceof(Activity);
  });

  it('Should hold a users ID', () => {
    expect(activity.userID).to.equal(1);
  });

  it('Should store a date', () => {
    expect(activity.date).to.equal("2019/06/15");
  });

  it('Should hold users number of steps', () => {
    expect(activity.numSteps).to.equal(3517);
  });

  it('Should hold users minutes active', () => {
    expect(activity.minutesActive).to.equal(101);
  });

  it('Should hold users flight of stairs', () => {
    expect(activity.flightsOfStairs).to.equal(19);
  });
});