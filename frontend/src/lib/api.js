import API from "../config/apiClient";

export const register = async (data) => API.post("/auth/register", data);

export const login = async (data) => API.post("/auth/login", data);

export const logout = async () => API.post("/auth/logout");

export const getUser = async () => API.get("/user");

export const getTasks = async () => API.get("/user/tasks");

export const createTask = async (data) => API.post("/user/tasks", data);

export const markDone = async (id) => API.patch(`/user/task/${id}`);

export const deleteTask = async (id) => API.delete(`/user/task/${id}`);
