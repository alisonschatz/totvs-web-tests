const { faker } = require('@faker-js/faker');

function buildUser() {
  const firstName = faker.person.firstName();
  const lastName  = faker.person.lastName();

  return {
    name:      `${firstName} ${lastName}`,
    email:     faker.internet.email({ firstName, lastName, provider: 'testmail.dev' }),
    password:  faker.internet.password({ length: 12, memorable: false }),
    firstName,
    lastName,
    company:   faker.company.name(),
    address:   faker.location.streetAddress(),
    country:   'United States',
    state:     faker.location.state(),
    city:      faker.location.city(),
    zipcode:   faker.location.zipCode('#####'),
    phone:     faker.phone.number({ style: 'national' }),
  };
}

module.exports = { buildUser };
