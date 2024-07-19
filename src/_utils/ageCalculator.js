function calculateAge(dob) {
    // Convert the input date string to a Date object
    const birthDate = new Date(dob);
    const today = new Date();
  
    // Calculate the difference in years
    let age = today.getFullYear() - birthDate.getFullYear();
  
    // Adjust if the current date is before the birth date this year
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
  
    return age;
  }

  export default calculateAge