import exp from "constants";

export interface Material {
  id : number;
  Name: string;
  Price: number;
  Density: number;
}

export interface customer {
  UserID: string;
  created_at: string;
  Fname: string;
  Lname: string;
  Org: string;
  Add1: string;
  Add2: string;
  Zip: string;
  MobileNumber: string;
  Email: string;

}


export interface purchase{
  id: string;
  created_at: string;
  STL: any;
  Price: number;
  Progress: string;
  Paid: boolean;
  Material: string;
  Finish: String;
  Weight: number;
  Email: string;
  Customer: string;
  Count: number;
  color: string;
}
export interface Finish {
  Name: string;
  Percentage: number;
}

export interface StlFileReaderProps {
  file: File;
  onData: (data: number[]) => void;
}

export interface Value {
  ValuePiece: ValuePiece | [ValuePiece, ValuePiece];
}

export interface ValuePiece {
  Date: Date | null;
}

export interface User {
  name: string;
      lastName: string;
      address: string;
      mobileNumber: string;
      city: string;
      Organization: string;
      zip: string;
      country: string;};
