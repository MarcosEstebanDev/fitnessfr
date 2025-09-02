export type FitnessUser = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
};

export type FitnessSession = {
  user: FitnessUser;
  token?: string | null;
  // agrega campos extra si tu app los usa
};