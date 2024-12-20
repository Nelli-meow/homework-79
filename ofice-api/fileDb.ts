import {promises as fs} from 'fs';
import crypto from 'node:crypto';
import {ThingWithoutId, AllItemsInfo, CategoryWithoutId, PlaceWithoutId} from './types';

const fileName = './db.json';
let data: AllItemsInfo = {
    categories: [],
    places: [],
    things: [],
};

const fileDb = {
    async fileExists() {
        try {
            const fileContent = await fs.readFile(fileName);
            const parsedData = JSON.parse(fileContent.toString());

            if (!parsedData.categories || !parsedData.places || !parsedData.things) {
                console.error();
            }

            data = parsedData;
        } catch (err) {
            data = {categories: [], places: [], things: []};
            await this.save();
        }
    },

    async init() {
        await this.fileExists();
    },

    async getThings() {
        return data.things;
    },
    async addThing(thing: ThingWithoutId) {
        await this.fileExists();

        const id = crypto.randomUUID();
        const date = new Date().toString();
        const newThing = {id, ...thing, date};

        data.things.push(newThing);

        await this.save();
        return newThing;
    },

    async getThingById(id: string) {
        return data.things.find(thing => thing.id === id);
    },

    async deleteThing(id: string) {
        const index = data.things.findIndex(thing => thing.id === id);
        if (index !== -1) {
            data.things.splice(index, 1);
            await this.save();
            return true;
        }
        return false;
    },
    async updateThingById(id: string, newThingData: object) {
        const thingIndex = data.things.findIndex(thing => thing.id === id);

        if (!thingIndex) {
            throw new Error('thing not found');
        }

        data.things[thingIndex] = {
            ...data.things[thingIndex],
            ...newThingData,
        };

        await this.save();
        return data.things[thingIndex];
    },

    async getCategories() {
        return data.categories;
    },

    async addCategory(category: CategoryWithoutId) {
        await this.fileExists();

        const id = crypto.randomUUID();
        const newCategory = {id, ...category};

        data.categories.push(newCategory);

        console.log(newCategory);

        await this.save();
        return newCategory;
    },
    async getCategoryById(id: string) {
        return data.categories.find(category => category.id === id);
    },
    async updateCategoryById(id: string, newCategoryData: object) {
        const categoryIndex = data.categories.findIndex(category => category.id === id);

        if (!categoryIndex) {
            throw new Error('Category not found');
        }

        data.categories[categoryIndex] = {
            ...data.categories[categoryIndex],
            ...newCategoryData,
        };


        await this.save();
        return data.categories[categoryIndex];
    },
    async deleteCategory(id: string) {
        const index = data.categories.findIndex(category => category.id === id);
        if (index !== -1) {
            data.categories.splice(index, 1);
            await this.save();
            return true;
        }
        return false;
    },

    async getPlaces() {
        return data.places;
    },

    async addPlace(place: PlaceWithoutId) {
        await this.fileExists();

        const id = crypto.randomUUID();
        const newPlace = {id, ...place};

        data.places.push(newPlace);

        await this.save();
        return newPlace;
    },
    async getPLaceById(id: string) {
        return data.places.find(place => place.id === id);
    },

    async deletePlace(id: string) {
        const index = data.places.findIndex(place => place.id === id);
        if (index !== -1) {
            data.places.splice(index, 1);
            await this.save();
            return true;
        }
        return false;
    },

    async updatePlaceById(id: string, newPlaceData: object) {
        const placeIndex = data.places.findIndex(place => place.id === id);

        if (!placeIndex) {
            throw new Error('place not found');
        }

        data.places[placeIndex] = {
            ...data.places[placeIndex],
            ...newPlaceData,
        };

        await this.save();
        return data.places[placeIndex];
    },

    async save() {
        return await fs.writeFile(fileName, JSON.stringify(data));
    }
};

export default fileDb;
