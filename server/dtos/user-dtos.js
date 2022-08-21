export class UserDto{
    email;
    id;
    isActivated;
    firstName;
    lastName;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.firstName = model.firstName
        this.lastName = model.lastName
    }
}