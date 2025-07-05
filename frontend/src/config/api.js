import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  logout: () => api.post("/auth/logout"),
  getCurrentUser: () => api.get("/auth/me"),
  updateProfile: (userData) => api.put("/auth/profile", userData),
};

export const restaurantAPI = {
  getAll: () => api.get("/restaurants"),
  getById: (id) => api.get(`/restaurants/${id}`),
  create: (restaurantData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return api.post("/restaurants", restaurantData, config);
  },
  update: (id, restaurantData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return api.put(`/restaurants/${id}`, restaurantData, config);
  },
  delete: (id) => api.delete(`/restaurants/${id}`),
};

export const menuAPI = {
  getMenuItems: (restaurantId) => api.get(`/menu/${restaurantId}`),
  addMenuItem: (restaurantId, menuItem) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return api.post(`/menu/${restaurantId}`, menuItem, config);
  },
  updateMenuItem: (restaurantId, itemId, updates) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return api.put(`/menu/${restaurantId}/${itemId}`, updates, config);
  },
  deleteMenuItem: (restaurantId, itemId) =>
    api.delete(`/menu/${restaurantId}/${itemId}`),
};

export const orderAPI = {
  getUserOrders: () => api.get("/orders/user"),
  getById: (id) => api.get(`/orders/${id}`),
  create: (orderData) => api.post("/orders", orderData),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
  getRestaurantOrders: (restaurantId) =>
    api.get(`/orders/restaurant/${restaurantId}`),
};

export const creditCardAPI = {
  getAll: () => api.get("/credit-cards"),
  add: (cardData) => api.post("/credit-cards", cardData),
  delete: (cardId) => api.delete(`/credit-cards/${cardId}`),
  setDefault: (cardId) => api.patch(`/credit-cards/${cardId}/set-default`),
};

export const reviewAPI = {
  create: (reviewData) => api.post("/reviews", reviewData),
  getByRestaurant: (restaurantId) =>
    api.get(`/reviews/restaurant/${restaurantId}`),
};

export const feedbackAPI = {
  create: async (data) => {
    const response = await fetch(`${API_URL}/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to submit feedback");
    }

    return response.json();
  },
};

export default api;
