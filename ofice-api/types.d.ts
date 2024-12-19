export interface Category {
    id: string;
    name: string;
    description: string;
}

export interface Place {
    id: string;
    name: string;
    description: string;
}

export interface Thing {
    id: string;
    name: string;
    categoryId: string;
    placeId: string;
    description: string;
    image: string | null;
    date: string;
}

export interface CategoryWithoutId {
    name: string;
    description: string;
}

export interface PlaceWithoutId {
    name: string;
    description: string;
}

export interface ThingWithoutId {
    name: string;
    categoryId: string;
    placeId: string;
    description: string;
    image: string | null;
    date: string;
}

export interface AllThingsInfo  {
    categories: Category[],
    places: Place[],
    things: Thing[]
}