const faker = require('@faker-js/faker');

class SignUpData {
    static getSignUpData() {
        return {
            name: "jiyan17", //faker.name.firstName()
            email: "jiyan17123@gmail.com",// faker.internet.email()
            password : "test1234",
            firstname: "automation",
            lastname : "test",
            address : "mumbai",
            country : "United States",
            state : "gujarat",
            city: "gujarat",
            zipcode : 789654,
            mobileNumber : 9874563210
        };
    }
}

module.exports = SignUpData;