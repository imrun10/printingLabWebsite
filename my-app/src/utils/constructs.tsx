import exp from "constants";

export interface Material {
  id : number;
  Name: string;
  Price: number;
  Density: number;
}

export interface Finish {
  Name: string;
  Percentage: number;
}

export interface StlFileReaderProps {
  file: File;
  onData: (data: number[]) => void;
}
export interface Purchase {
  Weight: number;
  Price: number;
  Color: string;
  SizeXYZ: number[];
  Finish: string;
  Service: string;
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
