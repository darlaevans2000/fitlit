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

//hydration
  getDailyOunces(date, hydrationData) {
    const entry = hydrationData.find(entry => { 
      entry.date === date
      if ((entry.date === date) && (entry.userID === this.id)) {
        return entry.numOunces;
      }
    })
    
    return entry.numOunces;
  }

  calculateAvgDailyWater(hydrationData) {
    const dailyOunces = hydrationData.map(entry => entry.numOunces);
    const totalOunces = dailyOunces.reduce((sumOz, numOz) => {
      return sumOz + numOz;
    });
  
    return Math.round(totalOunces / hydrationData.length);
  }

  getWeeklyOunces(startDate, hydrationData) {
    const index = hydrationData.findIndex(entry => entry.date === startDate);
    const weekLog = hydrationData.slice(index, index + 7);

    return weekLog.map(entry => entry.numOunces);
  }

  //sleep

  getSleepDataByDate(sleepData, date, property) {
    // used for sleep quality AND sleep hrs
    const entry = sleepData.find(entry => entry.date === date)
    
    return entry[property];
  }

  getAvgSleepData(sleepData, property) {
    // this can be used for hrs and sleep quality average
    const usersData = sleepData.filter(entry => entry.userID === this.id)
    const dailySum = usersData.map(entry => entry[property]);
    const totalSum = dailySum.reduce((sum, num) => {
      return sum + num;
    });
    const avgAmount = totalSum / dailySum.length;

    return parseFloat(avgAmount.toFixed(1));
  }

  getSleepDataByWeek(sleepData, startDate, property) {
    // works for sleep hrs and sleep qual 
    const index = sleepData.findIndex(entry => entry.date === startDate);
    const weekLog = sleepData.slice(index, index + 7);

    return weekLog.map(entry => entry[property]);
  }

  //activity
    getDailyMilesWalked(activityData, date) {
    const usersData = activityData.filter(entry => entry.userID === this.id)
    const dateStats = usersData.find(entry => entry.date === date);
    const feetWalked = dateStats.numSteps * this.strideLength;
    const milesWalked = feetWalked / 5280;

    return parseFloat(milesWalked.toFixed(1));
  }

}

export default User;