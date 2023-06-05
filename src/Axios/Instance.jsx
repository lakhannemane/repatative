import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/", // Set your base URL
  timeout: 5000, // Set your desired timeout
});

let activeRequests = 0;

const showLoader = () => {
  // Show your loader here (e.g., set a loading state)
  return <span>loadin-1....</span>;
};

const hideLoader = () => {
  // Hide your loader here (e.g., reset the loading state)
  return <span>loading-2....</span>;
};

axiosInstance.interceptors.request.use(
  (config) => {
    if (activeRequests === 0) {
      showLoader();
    }
    activeRequests++;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    activeRequests--;
    if (activeRequests === 0) {
      hideLoader();
    }
    return response;
  },
  (error) => {
    activeRequests--;
    if (activeRequests === 0) {
      hideLoader();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
