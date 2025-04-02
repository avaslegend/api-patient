export interface Patient {
    id: string;
    firstName: string;
    lastName: string;
    gender: 'male' | 'female' | 'other';
    birthDate: string; 
    email: string;
    phone: string;
    externalData: {
      country: string;
      address: string;
    };
    createdAt: string; 
    updatedAt: string;
  }
  