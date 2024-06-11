const faker = require('@faker-js/faker');

class ContactUsData {
    static getcontactUsData() {
        return {
            name: "jiyan5", //faker.name.firstName()
            email: "jiyan5123@gmail.com",// faker.internet.email()
            subject : "test1234",
            message: "automation",
    };
}
}

module.exports = ContactUsData;