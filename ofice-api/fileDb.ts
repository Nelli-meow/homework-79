import { promises as fs } from 'fs';
import crypto from 'node:crypto';
import {ThingWithoutId, AllThingsInfo} from './types';

const fileName = './db.json';
let data: AllThingsInfo = {
    categories: [],
    places: [],
    things: [],
};

const fileDb = {
    async init() {
        try {
            const fileContent = await fs.readFile(fileName);
            data = JSON.parse(fileContent.toString());
        } catch (err) {
            console.error(err);
            return data;
        }
    },

    async getThings() {
        return data.things;
    },
    async addThing(thing: ThingWithoutId) {
        const id = crypto.randomUUID();
        const date = new Date().toString();
        const newThing = { id, ...thing, date };

        console.log(newThing);

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

    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    }
};

export default fileDb;
