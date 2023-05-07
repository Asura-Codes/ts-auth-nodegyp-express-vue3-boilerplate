export const IsLoaded: () => Boolean; 

export const CppString: (...args: string[]) => string; 
export const CppNumber: (...args: number[]) => number; 
export const CppArray: () => Array<any>; 
export const CppObject: () => Object; 

export const SetBigInt: (v: BigInt) => Boolean | undefined;
export const SetBoolean: (v: Boolean) => Boolean | undefined;
export const SetDate: (v: Date) => Boolean | undefined;
export const SetInteger: (v: Integer) => Boolean | undefined;
export const SetNumber: (v: Number) => Boolean | undefined;
export const SetString: (v: String) => Boolean | undefined;