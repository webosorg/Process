/**
 * Utils - generators.
 * Helpful tools ::: generate random id (for client side), ...
 * @module utils/generators.js
 * @author @SurenAt93
 */

const generateRandomId = _ => Date.now() + Math.random();

export { generateRandomId };
