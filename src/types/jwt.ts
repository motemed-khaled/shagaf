export interface IjwtPayload {
    id: string;
  }
  
export interface Ipagination {
    limit: number;
    skip: number;
    page: number;
    filter: any;
  }