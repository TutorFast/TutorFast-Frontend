export default (wage: string): boolean => /^(([1-9]\d*(\.\d{0,2})?)|(0\.\d{0,2}))$/.test(wage);
