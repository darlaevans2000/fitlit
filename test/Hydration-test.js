import { expect } from 'chai';
// import User from '../src/User';
import Hydration from '../src/Hydration';
const hydrationTestData = require('../src/data/hydrationTestData');

describe('Hydration', () => {
  let hydration


  beforeEach(() => {
    hydration = new Hydration(hydrationTestData[0]);
  });

  it('Should be a function', () => {
    expect(Hydration).to.be.a('function')
  });

  it('should create an instance of hydration', () => {
    expect(hydration).to.be.an.instanceof(Hydration)
  });

  it('Should have a userID', () => {
    expect(hydration.userID).to.equal(1);
  });

  it('Should have a date', () => {
    expect(hydration.date).to.equal("2019/06/14");
  });

  it('Should have number of ounces drank', () => {
    expect(hydration.numOunces).to.equal(100);
  });
});
