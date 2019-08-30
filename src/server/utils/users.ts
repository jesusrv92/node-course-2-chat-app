export type User = { id: string, name: string, room: string }
export class Users {
    users: User[] = [];
    addUser(id: string, name: string, room: string) {
        const user: User = { id, name, room };
        this.users.push(user);
        return user;
    };
    removeUser(id: string) {
        const user = this.getUser(id);
        if(user){
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    };
    getUser(id: string) {
        return this.users.filter((user) => user.id === id)[0];
    };
    getUserList(room: string) {
        const users = this.users.filter((user) => user.room === room);
        const namesArray = users.map((user) => user.name);
        return namesArray;
    };
}