import exp from "constants";

export interface Material {
  Name: string;
  Price: number;
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
  stlFile: File;
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
