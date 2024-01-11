export interface AppoinmentRes {
    success: boolean;
    message: string;
    data:    AppoinmentData;
}

export interface AppoinmentData {
    appointments: Appointment[];
    name:         string;
}

export interface Appointment {
    _id:         string;
    id:          string;
    name:        string;
    slug:        string;
    images:      Images;
    description: null;
}

export interface Images {
    logo:   null;
    banner: null | string;
}
