export interface singleTask {
  _id: string;
  name: string;
  description: string;
  isDone: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
export interface store {
  tasks: {
    loading: Boolean;
    tasks: singleTask[];
    error: string;
  };
  user: {
    loading: Boolean;
    userData: authResponse;
    error: string;
  };
}
export interface registerRequest {
  username: string;
  email: string;
  password: string;
}
export interface loginRequest {
  email: string;
  password: string;
}

export interface authResponse {
  token: string;
  user: { username: string };
}
