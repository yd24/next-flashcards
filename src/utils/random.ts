export const getRandom = (max: number): number => {
  max = Math.floor(max);
  return Math.floor(Math.random() * (max + 1));
}