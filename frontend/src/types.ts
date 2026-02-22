// Define a estrutura de um Usuário, conforme o backend
export interface User {
  id: string;
  name: string;
  email: string;
}

// Define a estrutura de um Evento
export interface Event {
  id: string;
  description: string;
  type: string;
  date: string; // A API retorna como string no formato ISO
  startSales: string;
  endSales: string;
  price: number;
}

// Define a estrutura de uma Venda
export interface Sale {
  id: string;
  userId: string;
  eventId: string;
  saleDate: string;
  saleStatus: string;
}