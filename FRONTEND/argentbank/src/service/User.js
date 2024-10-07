class User {
    constructor(createdAt, email, firstname, id, lastname, updatedAt) {
        this.createdAt = createdAt;
        this.email = email;
        this.firstname = firstname;
        this.id = id;
        this.lastname = lastname;
        this.updatedAt = updatedAt;
    }

    toJSON() {
        return {
          createdAt: this.createdAt,
          email: this.email,
          firstname: this.firstname,
          id: this.id,
          lastname: this.lastname,
          updatedAt: this.updatedAt,
        };
      }
}

export default User;