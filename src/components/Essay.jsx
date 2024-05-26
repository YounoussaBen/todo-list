

const Essay = () => {
  const date1 = new Date("01/16/2024");
  const date2 = new Date("01/16/2024");

  // Calculating the time difference of two dates
  const Difference_In_Time = date2.getTime() - date1.getTime();

  // Calculating the number of days between two dates
  const Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));

  return (
    <div>
      <h2>Date Difference Calculator</h2>
      <p>Total number of days between dates:</p>
      {/* <p>{date1.toDateString()} and {date2.toDateString()}</p> */}
      <p>is: {Difference_In_Days} days</p>
    </div>
  );
};

export default Essay;
