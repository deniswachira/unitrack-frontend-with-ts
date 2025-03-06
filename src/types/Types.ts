export type UserRegisterFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    county: string;
    userName: string;
    password: string;
};

export type UserLoginFormValues = {    
  userName: string;
    password: string;
};

export type BookingFormValues = {
    booking_date: string;
    returning_date: string;
    location: string;
    notes: string;
};

export type UserState ={
    user: {
        _id: string;
        full_name: string;
        email: string;
        address: string;
        phone_numbere: string;
    } | null;
    isAuthenticated: boolean;

    loading: boolean;
    error: string | null;
}


export interface TUser {
    msg: any;
    _id: number;
    full_name: string;
    email: string;
    address: string;
    phone_number: string;
    role: string;
}

export interface AdminState {
  token: null;
  adminInfo: | UserLoginFormValues | any;
  isAuthenticated: boolean;
}

export interface createBookingResponse {
    booking_id: number;
    booking_date: string;
    returning_date: string;
    booking_status: string;
    location: string;
    total_amount: number;
    checkout_status: string;
    notes: string;
    msg: string;
};
export interface AddVehiclePayload {
  vehicleSpec_id: number;
  rental_rate: string;
  availability: string;
}


export interface AddSpecsFormValues {
    vehicle_name: string;
    vehicle_model: string;
    vehicle_year: string;
    fuel_type: string;
    seating_capacity: number;
    color: string;
    engine_type: string;
    features: string;
    vehicle_description: string;
    image1_url: string;
    image2_url: string;
    image3_url: string;
}
export interface AuthState {
    user: null | UserRegisterFormValues | UserLoginFormValues | any;
    token: string | null;
    isAuthenticated: boolean;
}


export interface ToastContextProps {
     showToast: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
}
// Interface for VehicleSpec
export interface VehicleSpec {
  vehicleSpec_id: number;
  vehicle_name: string;
  vehicle_model: string;
  vehicle_year: string;
  fuel_type: string;
  seating_capacity: number;
  color: string;
  engine_type: string;
  features: string;
  vehicle_description: string;
  image1_url: string;
  image2_url: string;
  image3_url: string;
  created_at: string;
  updated_at: string;
}

// Interface for Car
export interface Car {
  vehicle_id: number;
  vehicleSpec_id: number;
  rental_rate: string;
  availability: string;
  created_at: string;
  updated_at: string;
  vehicleSpec: VehicleSpec;
}

export interface FetchCarsWithSpecsResponse {
  cars: Car[];
  loading: boolean;
  error: string | null;
}

// Admin Dashboard
export interface Booking {
  date: string;
  count: number;
}

export interface Revenue {
  month: string;
  amount: number;
}

export interface BookingStatus {
  status: string;
  count: number;
}

export interface vehicleUpdatePayload {
  vehicle_id: number;
  vehicleSpec_id: number;
  rental_rate: string;
  availability: string;
}