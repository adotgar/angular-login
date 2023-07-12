export interface Territory {
    id: number;
    name: string;
    parent: number | null;
    children?: Territory[];
    expanded?: boolean;
}