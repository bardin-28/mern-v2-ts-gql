const users: Array<any> = [{
    id: 1,
    first_name: 'Vladyslav',
    last_name: 'Tsyvinda',
    email: 'bardindeveloper@gmail.com'
}];

const usersQueries = {
    getAllUsers() {
        return users;
    }
}

export default usersQueries
