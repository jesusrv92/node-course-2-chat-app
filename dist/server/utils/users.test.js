"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expect_1 = __importDefault(require("expect"));
const users_1 = require("./users");
describe('Users', () => {
    let users;
    beforeEach(() => {
        users = new users_1.Users();
        users.users = [{
                id: '1',
                name: 'Mike',
                room: 'Node Course'
            }, {
                id: '2',
                name: 'Jen',
                room: 'React Course'
            }, {
                id: '3',
                name: 'Julie',
                room: 'Node Course'
            }];
    });
    it('should add a new user', (done) => {
        const user = {
            id: '123',
            name: 'Andrew',
            room: 'The office fans'
        };
        const resUser = users.addUser(user.id, user.name, user.room);
        expect_1.default(users.users[3]).toEqual(user);
        done();
    });
    it('should return names for node course', (done) => {
        const userList = users.getUserList('Node Course');
        expect_1.default(userList).toEqual(['Mike', 'Julie']);
        done();
    });
    it('should return names for react course', (done) => {
        const userList = users.getUserList('React Course');
        expect_1.default(userList).toEqual(['Jen']);
        done();
    });
    it('should find a user', (done) => {
        const userId = '2';
        const user = users.getUser(userId);
        expect_1.default(user.id).toBe(userId);
        done();
    });
    it('should not find user', (done) => {
        const userId = 'a';
        const user = users.getUser(userId);
        expect_1.default(user).toBeUndefined();
        done();
    });
    it('should remove a user', (done) => {
        const userId = '2';
        const user = users.removeUser(userId);
        expect_1.default(user.id).toBe(userId);
        expect_1.default(users.users.length).toBe(2);
        done();
    });
    it('should not remove user', (done) => {
        const userId = 'b';
        const user = users.removeUser(userId);
        expect_1.default(user).toBeUndefined();
        expect_1.default(users.users.length).toBe(3);
        done();
    });
});
//# sourceMappingURL=users.test.js.map