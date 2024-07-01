const fs = require('fs').promises;
const path = require('path');

async function loadHotels() {
    try {
        const data = await fs.readFile(path.join(__dirname, 'mock/hotels.json'), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading hotels.json:', error);
        return [];
    }
}

async function saveHotels(hotels) {
    try {
        await fs.writeFile(path.join(__dirname, 'mock/hotels.json'), JSON.stringify(hotels, null, 2));
    } catch (error) {
        console.error('Error writing to hotels.json:', error);
    }
}


async function loadUsers() {
    try {
        const data = await fs.readFile(path.join(__dirname, 'mock/users.json'), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading users.json:', error);
        return [];
    }
}

module.exports = {
    loadHotels,
    saveHotels,
    loadUsers,
};