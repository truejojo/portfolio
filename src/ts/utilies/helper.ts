export const getRandomNumber = (num: number, startNum: number = 0): number =>
  Math.floor(Math.random() * num) + startNum;

export const compareStrings = (str1: string, str2: string): boolean =>
  str1 === str2 ? true : false;

export const shuffleArray = (array: any[]): any[] =>
  array.sort(() => 0.5 - Math.random());

export const duplicateArray = (array: any[]): any[] => [...array, ...array];
