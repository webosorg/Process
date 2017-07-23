/**
 * Default options.
 * Default options for new process/
 * @module defaultOptions.js
 * @author @SurenAt93
 */

import { generateRandomId } from './utils/generators.js';

const getDefaultOptions = _ => ({
    name: 'Unknown',
    autoTerminate: false,
    id: {
        _: generateRandomId()
    }
});

export { getDefaultOptions };
