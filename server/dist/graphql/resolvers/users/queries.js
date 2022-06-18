"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = [{
        id: 1,
        first_name: 'Vladyslav',
        last_name: 'Tsyvinda',
        email: 'bardindeveloper@gmail.com'
    }];
const usersQueries = {
    getAllUsers() {
        return users;
    }
};
exports.default = usersQueries;
