import * as bcrypt from 'bcrypt';

/**
 * 
 * @param data
 * The data to be encrypted. 
 * @param saltOrRounds
 * The salt to be used in encryption. If specified as a number then a salt will be generated with the specified number of rounds and used
 * @returns 
 * A promise to be either resolved with the encrypted data salt or rejected with an Error
 */
export async function hashPassword(data: string, saltOrRounds: number): Promise<string> {
    return await bcrypt.hash(data, saltOrRounds);
}

/**
 * 
 * @param data
 * The data to be encrypted.
 * @param passwordHash
 * The data to be compared against.
 * @returns A promise to be either resolved with the comparison result salt or rejected with an Error
 */
export async function comparePassword(data: string, passwordHash: string): Promise<boolean> {
    return await bcrypt.compare(data, passwordHash);
}