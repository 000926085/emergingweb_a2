export interface Item {
  item_id: number;
  name: string;
}

export interface Department {
  department_id: number;
  name: string;
}

export interface LoanRequest {
  date: Date,
  requestedBy: string,
  department: number,
  item_requested: number,
  reason: string,
  needed_from: string,
  needed_until: string,
  status: string,
  picked?: string,
  returned?: string,
  notes?: string
}