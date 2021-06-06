import { v4 as uuid } from 'uuid'

export type SignInRequestData = {
    email: string;
    password: string;
}

type SignInResponse = {
    token: string,
    user: User
}

export type User = {
    name:  string,
    email: string,
    avatar_url: string
}

const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount))

export async function signInRequest(data: SignInRequestData): Promise<SignInResponse>{
    await delay();

    return {
        token: uuid(),
        user: {
            name: 'Vinicius Alexandre',
            email: 'mac.aoliveira199@gmail.com',
            avatar_url: 'https://github.com/vinialexandre.png'
        }
    }
}

export async function recoverUserInformation() {
    await delay()

    return {
        user: {
            name: 'Vinicius Alexandre',
            email: 'mac.aoliveira199@gmail.com',
            avatar_url: 'https://github.com/vinialexandre.png'
        }
    }
}

