export interface Trip {
  id: string;
  userId: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget?: number | null;
  type?: string;
  photos: string[];
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface TripRequest {
  id: string;
  userId: string;
  tripId: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
  trip: Trip;
}

export interface TripResponse {
  data: TripRequest[];
}
