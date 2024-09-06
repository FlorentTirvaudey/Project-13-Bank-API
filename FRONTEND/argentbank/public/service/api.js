import axios from "axios";
import userMock from "../../src/mock/mockUsers";
import User from "./User";

export const fecthMockData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const formattedUser = userMock.map((user) => new User(user.firstName, user.lastName, user.email, user.password))
            resolve(formattedUser)
        }, 1000)
    })
}
