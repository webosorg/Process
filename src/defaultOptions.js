import { generateRandomId } from './utils/generators.js';

const getDefaultOptions = _ => ({
    name: 'Unknown',
    autoTerminate: false,
    id: {
        _: generateRandomId()
    }
});

export { getDefaultOptions };
