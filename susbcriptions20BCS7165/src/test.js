let schedule = {
  Monday: {
    start: "9:00",
    end: "5:00",
  },
};
function ticketer(assignedAt, completedAt) {
  assignedAt = assignedAt * 1000;
  completedAt = completedAt * 1000;
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let assignedatB = new Date(assignedAt * 1000);
  let completedAtB = new Date(completedAt * 1000);
  const assignedOnDay = assignedatB.getDay();
  const completedOnDay = completedAtB.getDay();
  const assignedOnHour = assignedatB.getHours();
  const completedOnHour = completedAtB.getHours();
  console.log(completedOnHour);
}
ticketer(1693224000, 1693233000);
