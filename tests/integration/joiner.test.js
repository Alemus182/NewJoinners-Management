const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { Joiner } = require('../../src/models');
const { joinerOne, joinerTwo, joinerThree, insertJoiner } = require('../fixtures/joiner.fixture');
const { stacks, roles, domainexperience, englishlevel } = require("../../src/config/parametric")
setupTestDB();

describe('Joiner routes', () => {

    describe('POST /v1/joiner', () => {
      let newJoiner;

      beforeEach(() => {
        newJoiner = {
          name: faker.name.firstName().toUpperCase(),
          last_name:faker.name.lastName().toUpperCase(),
          identification_number:faker.datatype.number({ min: 3000000 }), 
          role:faker.helpers.randomize(roles),
          stack:faker.helpers.randomize(stacks),
          english_level:faker.helpers.randomize(englishlevel),  
          domain_experience:faker.helpers.randomize(domainexperience)
        };
      });

      test('should return 201 and successfully create new joiner if data is ok', async () => {
          await insertJoiner([joinerOne]);

          const res = await request(app)
            .post('/v1/joiner')
            // .set('Authorization', `Bearer ${adminAccessToken}`)
            .send(newJoiner)
            .expect(httpStatus.CREATED);

          expect(res.body).toEqual({
            id: expect.anything(),
            name: newJoiner.name,
            last_name: newJoiner.last_name,
            role: newJoiner.role,
            stack: newJoiner.stack,
            english_level: newJoiner.english_level,
            domain_experience: newJoiner.domain_experience,
            identification_number: newJoiner.identification_number
          });

          const dbJoiner = await Joiner.findById(res.body.id);
          expect(dbJoiner).toBeDefined();
          expect(dbJoiner).toMatchObject
            ({
              id: expect.anything(),
              name: newJoiner.name,
              last_name: newJoiner.last_name,
              role: newJoiner.role,
              domain_experience: newJoiner.domain_experience,
              english_level: newJoiner.english_level,
              stack: newJoiner.stack,
              identification_number: newJoiner.identification_number
            });
      });

      test('should return 400 error if identification is invalid', async () => {
        await insertJoiner([joinerOne]);
        newJoiner.identification_number = '32432ewds';

        await request(app)
          .post('/v1/joiner')
          .send(newJoiner)
          .expect(httpStatus.BAD_REQUEST);
      });

      test('should return 400 error if identification is already used', async () => {
        await insertJoiner([joinerTwo]);
        newJoiner.identification_number = joinerTwo.identification_number;

        await request(app)
          .post('/v1/joiner')
          .send(newJoiner)
          .expect(httpStatus.BAD_REQUEST);
      });

    });

    describe('GET /v1/joiner/:joinerId', () => {

        test('should return 200 and the joiner object if data is ok', async () => {
          await insertJoiner([joinerThree]);

          const res = await request(app)
            .get(`/v1/joiner/${joinerThree._id}`)
            .send()
            .expect(httpStatus.OK);

          expect(res.body).toEqual({
            id: joinerThree._id.toHexString(),
            name: joinerThree.name.toUpperCase(),
            last_name: joinerThree.last_name.toUpperCase(),
            role: joinerThree.role,
            stack: joinerThree.stack,
            english_level: joinerThree.english_level,
            domain_experience: joinerThree.domain_experience,
            identification_number: joinerThree.identification_number
          });
        });

        test('should return 400 error if joinerId is not a valid mongo id', async () => {
          await insertJoiner([joinerOne]);

          await request(app)
            .get('/v1/joiner/invalidId')
            .send()
            .expect(httpStatus.BAD_REQUEST);
        });

        test('should return 404 error if joiner is not found', async () => {
          await insertJoiner([joinerOne]);

          await request(app)
            .get(`/v1/joiner/${joinerTwo._id}`)
            .send()
            .expect(httpStatus.NOT_FOUND);
        });

    });

    describe('PUT /v1/joiner/:joinerId', () => {

      test('should return 200 and successfully update joiner if data is ok', async () => {
        await insertJoiner([joinerOne]);
        const updateBody = {
          name:faker.name.findName().toUpperCase(),
          last_name:faker.name.lastName().toUpperCase(),
          role:faker.helpers.rclsandomize(roles),
          stack:faker.helpers.randomize(stacks),
          english_level:faker.helpers.randomize(englishlevel),  
          domain_experience:faker.helpers.randomize(domainexperience)
        };

        const res = await request(app)
          .put(`/v1/joiner/${joinerOne._id}`)
          .send(updateBody)
          .expect(httpStatus.OK);

        expect(res.body).toEqual({
          id: joinerOne._id.toHexString(),
          name: updateBody.name,
          last_name: updateBody.last_name,
          role: updateBody.role,
          english_level: updateBody.english_level,  
          domain_experience: updateBody.domain_experience,
          stack: updateBody.stack,
          identification_number: expect.anything()
        });

        const dbJoiner = await Joiner.findById(joinerOne._id);
        expect(dbJoiner).toBeDefined();
        expect(dbJoiner).toMatchObject({ 
          name: updateBody.name,
          last_name:updateBody.last_name,
          identification_number:expect.anything(),
          role:updateBody.role,
          english_level:updateBody.english_level,  
          domain_experience:updateBody.domain_experience,
          stack:updateBody.stack
        });
      });

      test('should return 400 error if joinerId is not a valid mongo id', async () => {
        await insertJoiner([joinerThree]);
        const updateBody = { name: faker.name.findName() };

        await request(app)
          .put(`/v1/joiner/invalidId`)
          .send(updateBody)
          .expect(httpStatus.BAD_REQUEST);
      });

      test('should return 400 if identification_number is invalid', async () => {
        await insertJoiner([joinerOne]);
        const updateBody = { identification_number: '231321sda' };

        await request(app)
          .put(`/v1/joiner/${joinerOne._id}`)
          .send(updateBody)
          .expect(httpStatus.BAD_REQUEST);
      });

      test('should return 400 if identification_number is already taken', async () => {
        await insertJoiner([joinerOne, joinerTwo]);
        const updateBody = { identification_number: joinerTwo.identification_number };

        await request(app)
          .put(`/v1/joiner/${joinerOne._id}`)
          .send(updateBody)
          .expect(httpStatus.BAD_REQUEST);
      });

    });

});
