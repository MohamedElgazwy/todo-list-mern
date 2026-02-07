const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiRequest = async (endpoint, method = "GET", body, token ) => {
  const request = await fetch(`${BASE_URL}${endpoint}`, {
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