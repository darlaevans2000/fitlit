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
    const usersData = hydrationData.filter(entry => entry.userID === this.id)
    const index = usersData.findIndex(entry => entry.date === startDate);
    const weekLog = usersData.slice(index, index + 7);

    return weekLog.map(entry => entry.numOunces);
  }

  //sleep

  getSleepDataByDate(sleepData, date, property) {
   const usersData = sleepData.filter(entry => entry.userID === this.id)
    const entry = usersData.find(entry => entry.date === date)
    
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
    const usersData = sleepData.filter(entry => entry.userID === this.id)
    const index = usersData.findIndex(entry => entry.date === startDate);
    const weekLog = usersData.slice(index, index + 7);

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

  getActivityDataByDate(activityData, date, property) {
    const usersData = activityData.filter(entry => entry.userID === this.id)
    const dateRequested = usersData.find(entry => entry.date === date);

    return dateRequested[property];
  }

  getStepGoalResult(activityData, date) {
    const dailyInfo = activityData.find(entry => entry.date === date);
    const usersData = activityData.filter(entry => entry.userID === this.id)

    return dailyInfo.numSteps >= usersData.dailyStepGoal;
  }

  getActivityAvgByWeek(activityData, startDate, property) {
    const usersData = activityData.filter(entry => entry.userID === this.id)
    const index = usersData.findIndex(entry => entry.date === startDate);
    const weekLog = usersData.slice(index, index + 8);
    const weeklyStats = weekLog.map(entry => entry[property]);
    const total = weeklyStats.reduce((sum, num) => {
      return sum + num;
    });

    return Math.round(total / 7);
  }

  getDatesExceedingStepGoal(activityData) {
    const usersData = activityData.filter(entry => entry.userID === this.id)
    const dailyStepGoal = this.dailyStepGoal;
    const stepGoalExceededDays = usersData
      .filter(entry => entry.numSteps > dailyStepGoal);

    return stepGoalExceededDays.map(entry => entry.date);
  }

  getFlightsClimbedRecord(activityData) {
    const usersData = activityData.filter(entry => entry.userID === this.id)
    const sortedEntries = usersData.sort((a, b) => {
      return b.flightsOfStairs - a.flightsOfStairs;
    })
    const [ maxFlights ] = sortedEntries;

    return maxFlights.flightsOfStairs;
  }

  getActivityDataByWeek(activityData, startDate, property) {
    const usersData = activityData.filter(entry => entry.userID === this.id)
    const index = usersData.findIndex(entry => entry.date === startDate);
    const weekLog = usersData.slice(index, index + 7);

    return weekLog.map(entry => entry[property]);
  }

}

export default User;