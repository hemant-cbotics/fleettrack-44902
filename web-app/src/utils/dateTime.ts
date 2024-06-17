import { format as dateFNSFormat } from "date-fns";

// Format date time to a specific format
// Reference: https://date-fns.org/v3.6.0/docs/format
export const formattedDateTime = (date: string, format: string = 'default') => {
  switch(format) {
    case 'default':
    default:
      return dateFNSFormat(date, "LLLL dd, yyyy h:mmaaa (z)") // "MM/dd/yyyy h:mmaaa (z)"
  }
}