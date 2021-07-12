import { expect } from 'chai';
import UserRepository from '../src/UserRepository';
const userTestData = require('../src/data/userTestData.js');
describe('User Repository', () => {

  let userRepo;

  beforeEach(() => {
    userRepo = new UserRepository(userTestData);
  });

  it('should be a function', () => {
    expect(UserRepository).to.be.a('function');
  });

  it('should be an instance of UserRepository', () => {
    expect(userRepo).to.be.an.instanceof(UserRepository);
  });

  it('should store all user data', () => {
    expect(userRepo.data).to.deep.equal(userTestData);
  });

  it('should be able to return user data by ID', () => {
    expect(userRepo.findUserData(1)).to.equal(userTestData[0]);
  });

  it('should be able to return the average step goal of all users', () => {
    expect(userRepo.findAverageUserGoal()).to.equal(10000);
  });
});
