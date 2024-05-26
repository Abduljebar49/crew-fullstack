import bcrypt from 'bcrypt';

export async function validatePassword(password:string, hashed:string){
    return bcrypt.compareSync(password, hashed);
}