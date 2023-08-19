
const getRandomItem = <T>(items: T[]) => items[Math.floor(Math.random() * items.length)];

export default getRandomItem;
