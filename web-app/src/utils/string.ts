export const getUserIntials = (fullName: string) => {
  // const initials = name.match(/\b\w/g) || [];
  // return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  return (
    fullName.includes(' ')
      ? fullName.split(' ')
      : fullName.split('').slice(0, 2)
  )
    ?.map((item: any) => item?.substring(0, 1))
    .join('')
    .substring(0, 2).toUpperCase();
}
