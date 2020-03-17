import UserModel from '../models/user';
import { User } from 'discord.js';
import { database as logger } from '../../logger';

function generateCode() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export async function Register(user: User) {
    try {
        let code = generateCode();
        // @ts-ignore
        await UserModel.create({
            discord_id: user.id,
            validation_code: code
        });

        return `Please enter the following code in the 'Verification' tab of your League Client's settings: \`${code}\`.`;
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            logger.warn('That user already exists.');
        }
    }
}