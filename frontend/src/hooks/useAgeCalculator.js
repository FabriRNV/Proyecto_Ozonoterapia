export const useAgeCalculator = () => {
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleBirthDateChange = (birthDate, setData) => {
    const age = calculateAge(birthDate);
    setData(prevData => ({ 
      ...prevData, 
      fecha_nacimiento: birthDate,
      edad: age
    }));
  };

  return { calculateAge, handleBirthDateChange };
}; 