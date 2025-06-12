export type RootStackParamList = {
  Access: undefined;
  RegisterUser: undefined;
  Profile: {
    user: {
      id: string;
      name: string;
      role: string;
      email: string;
      isActive: boolean;
    };
  };
};
