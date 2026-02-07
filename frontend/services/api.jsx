const API_URL = 'http://localhost:5000/api';

export const apiRequest = async (endpoint, method = "GET", body, token ) => {
  const request = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && {Authorization: `Bearer ${token}`}),
    },
    body: body ? JSON.stringify(body) : null,
  });

  const data = await request.json();

  if(!request.ok){
    throw new Error(data.message || 'Something went Wrong');
  }

  return data;
};