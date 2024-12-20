import { promises as fs } from 'fs';
import crypto from 'node:crypto';
import {ThingWithoutId, AllItemsInfo, CategoryWithoutId, PlaceWithoutId} from './types';

const fileName = './db.json';
let data: AllItemsInfo = {
    categories: [],
    places: [],
    things: [],
};

const fileDb = {
    async ensureFileExists() {
        try {
            const fileContent = await fs.readFile(fileName);
            const parsedData = JSON.parse(fileContent.toString());

            if (!parsedData.categories || !parsedData.places || !parsedData.things) {
                console.error();
            }

            data = parsedData;
        } catch (err) {
            data = { categories: [], places: [], things: [] };
            await this.save();
        }
    },

    async init() {
        await this.ensureFileExists();
    },

    async getThings() {
        return data.things;
    },
    async addThing(thing: ThingWithoutId) {
        await this.ensureFileExists();

        const id = crypto.randomUUID();
        const date = new Date().toString();
        const newThing = { id, ...thing, date };

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

    async getCategories() {
        return data.categories;
    },

    async addCategory(category: CategoryWithoutId) {
        await this.ensureFileExists();

        const id = crypto.randomUUID();
        const newCategory = { id, ...category };

        data.categories.push(newCategory);

        console.log(newCategory);

        await this.save();
        return newCategory;
    },

    async getPlaces() {
        return data.places;
    },

    async addPlace(place: PlaceWithoutId) {
        await this.ensureFileExists();

        const id = crypto.randomUUID();
        const newPlace = { id, ...place };

        data.places.push(newPlace);

        await this.save();
        return newPlace;
    },

    async save() {
        return await fs.writeFile(fileName, JSON.stringify(data));
    }
};

export default fileDb;
