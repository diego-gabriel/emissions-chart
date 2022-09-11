export interface Position {
    x: number;
    y: number;
}

export type EmissionsData = Readonly<Array<{ emissions: number; year: number }>>;
