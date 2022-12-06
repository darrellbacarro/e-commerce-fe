export interface IProduct {
    id: string;
    name: string;
    amount: number;
    subCategory?: string[];
    subSubCategory?: string[];
    images: string[];
    details: string;
    variations?: string[];
    date_created: string;
}