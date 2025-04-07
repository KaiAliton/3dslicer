export const calculatePrint = async (formData) => {
    const response = await fetch('http://localhost:5665/calculate', {
      method: 'POST',
      body: formData,
    });
    return response;
  };