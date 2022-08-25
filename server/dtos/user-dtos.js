export class UserDto{
    email;
    id;
    isActivated;
    firstName;
    lastName;

    constructor({email, _id, isActivated, firstName, lastName}) {
        this.email = email;
        this.id = _id;
        this.isActivated = isActivated;
        this.firstName = firstName
        this.lastName = lastName
    }
}