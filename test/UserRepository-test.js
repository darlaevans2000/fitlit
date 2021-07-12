import { expect } from 'chai';
import UserRepository from '../src/UserRepository';

const userData = require('../src/data/users');
describe('UserRepository', function() {
  let userRepository;
  beforeEach(() => {
    userRepository = new UserRepository(userData);
  });

  it('should be a function', function () {
    expect(UserRepository).to.be.a('function');
  });

    it('should have a parameter to take in data', function () {
      expect(this.data).to.equal(userData);
    });

      it('should have a method to determine user data based on users id', function () {
        expect(findUserData).to.be.a('function');
        expect(findUserData(2)).to.equal(userData[1]);
      })

      it('should have a method to determine average user step goal', function () {
        expect(findAverageUserGoal).to.be.a('function');
        expect(findAverageUserGoal()).to.equal(6667);
      })
});
