import axios from "axios";
import userMock from "../mock/mockUsers";
import User from "./User";

export const fecthMockData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const formattedUser = userMock.map((user) => new User(user.firstName, user.lastName, user.email, user.password))
            resolve(formattedUser)
            console.log("test", formattedUser)
        }, 1000)
    })
}
