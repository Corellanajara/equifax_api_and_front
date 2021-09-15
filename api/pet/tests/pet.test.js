const request = require('supertest')
const app = require('../../index');
const validObject = {
  name: 'test pet',
  age: 1,
  owner: 'test owner'
}
const invalidObject= {
  id: 1,
  owner: 'test owner'
}
describe('with invalid params', () => {
  it('post new pet', async () => {
    const res = await request(app)
      .get('/pet')
      .send(invalidObject)
    expect(res.statusCode).toEqual(403);
  })
  it('get list of pets', async () => {
    const res = await request(app)
      .get('/pet')
      .send()
    expect(res.statusCode).toEqual(403);
  })
  it('patch a pet', async () => {
    const res = await request(app)
      .patch('/pet/'+invalidObject.id)
      .send(invalidObject)
    expect(res.statusCode).toEqual(403);
  })
  it('get one pet', async () => {
    const res = await request(app)
      .get('/pet/'+invalidObject.id)
      .send(invalidObject)
    expect(res.statusCode).toEqual(403);
  })
})

describe('with valid params', () => {
  /*
  it('post new pet', async () => {
    const res = await request(app)
      .post('/pet')
      .send(validObject)
      .set('token', 'abc123')
    expect(res.statusCode).toEqual(201);
    expect(res.body.id).toBeTruthy();
  })
  */
  it('get list of pets', async () => {
    const res = await request(app)
      .get('/pet')
      .send()
      .set('token', 'abc123')
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  })
  it('update pet', async () => {
    const res = await request(app)
      .get('/pet')
      .send()
      .set('token', 'abc123')
    const pets = res.body;
    if(pets && pets[0]){
      const pet = pets[0];
      pet.age = 105;
      await request(app)
      .patch('/pet/'+pet.id)
      .send(pet)
      .set('token', 'abc123');
      const getone = await request(app)
      .get('/pet/'+pet.id)
      .send(pet)
      .set('token', 'abc123')
      expect(getone.statusCode).toEqual(200);
      expect(getone.body.age).toEqual(105);
    }
  })
  it('get first pet', async () => {
    const res = await request(app)
      .get('/pet')
      .send()
      .set('token', 'abc123')
    const pets = res.body;
    if(pets && pets[0]){
      const pet = pets[0];
      const getone = await request(app)
      .get('/pet/'+pet.id)
      .send(pet)
      .set('token', 'abc123')
      expect(getone.statusCode).toEqual(200);
      expect(getone.body).toBeTruthy();
    }
  })

})
