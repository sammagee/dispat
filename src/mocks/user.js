import faker from '@faker-js/faker'

export default function userMock() {
    return {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        avatar: faker.internet.avatar(),
    }
}
