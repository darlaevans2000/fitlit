class Activity {
  constructor(data) {
    this.userID = data.userID;
    this.date = data.date;
    this.numSteps = data.numSteps;
    this.minutesActive = data.minutesActive;
    this.flightsOfStairs = data.flightsOfStairs;
  }

  getAllUsersAvgByDate(date, property, activityData) {
    const dataLog = activityData.filter(entry => entry.date === date);
    const propertyLog = dataLog.map(entry => entry[property]);
    const total = propertyLog.reduce((sum, num) => {
      return sum + num;
    });

    return Math.round(total / dataLog.length);
  }
}

export default Activity;