export interface Patient {
    id: string;
    firstName: string;
    lastName: string;
    gender: 'male' | 'female' | 'other';
    birthDate: string; // Formato: YYYY-MM-DD
    email: string;
    phone: string;
    externalData: {
      country: string;
      address: string;
    };
    createdAt: string; // ISO timestamp
    updatedAt: string; // ISO timestamp
  }
  