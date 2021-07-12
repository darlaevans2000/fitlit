class UserRepository {
  constructor(userData) {
    this.data = userData;
    this.stepGoal = null;
  }

  findUserData(id){
    return this.data[(id -1)]
  };

  findAverageUserGoal() {
    const rawStepGoal = this.data.map(user => user.dailyStepGoal);
    const stepGoalSum = rawStepGoal.reduce((acc, currentValue) => {
      return acc + currentValue
    });
    this.stepGoal = Math.round(stepGoalSum/rawStepGoal.length);
    return this.stepGoal
  }
}

export default UserRepository;
