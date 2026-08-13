export const handleApiError = (error) => {
  if (error.response) {
    return {
      message: error.response.data?.message || 'Server error occurred',
      status: error.response.status,
      data: error.response.data,
    };
  } else if (error.request) {
    return {
      message: 'No response from server. Please check your connection.',
      status: 0,
    };
  } else {
    return {
      message: error.message || 'An unexpected error occurred',
      status: -1,
    };
  }
};