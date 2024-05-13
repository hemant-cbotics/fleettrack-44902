export type ListingResponse<T> = {
  count: number;
  next: string;
  previous: string;
  results: T;
}