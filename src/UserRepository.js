class UserRepository {
  constructor(userData) {
    this.data = userData;
    this.avgUserStepGoal = null;
  }

  findUserData(id) {
    return this.data[(id - 1)]
  }

  findAverageUserGoal() {
    const rawStepGoal = this.data.map(user => user.dailyStepGoal);
    const stepGoalSum = rawStepGoal.reduce((acc, currentValue) => {
      return acc + currentValue
    }, 0);
    this.avgUserStepGoal = Math.round(stepGoalSum / rawStepGoal.length);
    return this.avgUserStepGoal
  }
}

export default UserRepository;
