export type IUser = {
  id: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "admin" | "user";
  token: string;
};

export type AuthContextType = {
  session: IUser | undefined;
  isAuthenticated: boolean;
  saveSession: (session: IUser) => void;
  removeSession: () => void;
};

export type RegisterType = {
  customerName: string;
  email: string;
  password: string;
  phone: string;
};

export type LoginType = {
  email: string;
  password: string;
};

