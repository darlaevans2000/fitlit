import { expect } from 'chai';
import Sleep from '../src/Sleep';
const data = require('../src/data/sleepTestData');

describe('Sleep', () => {

  let sleep;

  beforeEach(() => {
    sleep = new Sleep(data[0]);
  });

  it('Should be a function', () => {
    expect(Sleep).to.be.a('function');
  });

  it('Should be an instance of Sleep', () => {
    expect(sleep).to.be.an.instanceof(Sleep);
  });

  it('Should hold a users ID', () => {
    expect(sleep.userID).to.equal(1);
  });

  it('Should store a date', () => {
    expect(sleep.date).to.equal("2019/06/15");
  });

  it('Should store the number of hours a user slept', () => {
    expect(sleep.hoursSlept).to.equal(6);
  });

  it('Should hold the users sleep quality for the night', () => {
    expect(sleep.sleepQuality).to.equal(3);
  });
});
