// all the constructs
export interface Material { // material object for table
  id : number;
  Name: string;
  Price: number;
  Density: number;
}

export interface customer {  // customer object for table
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

export interface purchase{ // purchase object for table
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
export interface Finish { // finish object for table
  Name: string;
  Percentage: number;
}

export interface StlFileReaderProps { // stl file reader props
  file: File;
  onData: (data: number[]) => void;
}




