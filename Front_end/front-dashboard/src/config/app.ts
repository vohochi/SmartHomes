// Khai báo url để get api
export const url: string = 'http://localhost:3000/api/';

// Khai báo FeatchAPI --> trả về mảng JSON
export const fetchAPI = async (url: string, option?: any) => {
  const response = await fetch(url, option);
  return response.json();
};
