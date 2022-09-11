export interface Position {
    x: number;
    y: number;
}

export type EmissionsData = Array<{ emissions: number; year: number }>;

export interface Comment {
    id: number;
    text: string;
    username: string;
    data_id: number;
    parent_id: number | null;
}
