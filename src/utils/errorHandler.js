export const handleApiError = (error) => {
    console.error('API Error:', error.message);
    const errorDetails = {
      message: 'No se pudo conectar al backend',
      details: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: error.config,
    };
    console.log('Error details:', error.response?.data || error);
    console.log('Error config:', error.config); // Log the config used for the request
    console.log('Error code:', error.code); // Log the error code
    console.log('Error request:', error.request); // Log the request details if available
  
    // Print error to text
    const errorText = `
      Error fetching data: ${error.message}
      Error details: ${JSON.stringify(error.response?.data || error, null, 2)}
      Error config: ${JSON.stringify(error.config, null, 2)}
      Error code: ${error.code}
      Error request: ${JSON.stringify(error.request, null, 2)}
    `;
    console.log('Error Text:', errorText);
  
    return errorDetails;
  };
  