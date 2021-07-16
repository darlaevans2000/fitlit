class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.address = user.address;
    this.email = user.email;
    this.strideLength = user.strideLength;
    this.dailyStepGoal = user.dailyStepGoal;
    this.friends = user.friends;
  }

  returnFirstName() {
    const firstName = this.name.split(' ')[0];
    return firstName;
  }

  getDailyOunces(date, hydrationData) {
    const entry = hydrationData.find(entry => { 
      entry.date === date
      if ((entry.date === date) && (entry.userID === this.id)) {
        return entry.numOunces;
      }
    })
    
    return entry.numOunces;
  }
}

export default User;