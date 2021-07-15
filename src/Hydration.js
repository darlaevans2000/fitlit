class Hydration {
  constructor(data) {
    this.userID = data.userID;
    this.date = data.date;
    this.numOunces = data.numOunces;
  }
}



export default Hydration;




// Iteration 3 - Hydration
// Data
// Create classes and methods that can calculate:
//
// For a user (identified by their userID - this is the same for all methods requiring a specific user’s data), the average fluid ounces consumed per day for all time
// For a user, how many fluid ounces they consumed for a specific day (identified by a date)
// For a user, how many fluid ounces of water consumed each day over the course of a week (7 days) - return the amount for each day
// You have to decide which classes should contain each method. Think about whose responsibility it is to own the method.
//
// Dashboard
// For your user (or any user you choose), add:
//
// A display to show how much water they have consumed today (these displays are often called “widgets” in the FE tech world)
// A display to show much water they have consumed each day over the course of the latest week