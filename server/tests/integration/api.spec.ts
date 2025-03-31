import server from 'supertest';
import TestAgent from 'supertest/lib/agent';
import serverApp from "../../app";
import { Storage } from '../../store/store.model';

describe('Api tests', () => {
  let request: TestAgent;
  let appStore: Storage;
  beforeAll(async () => {
    const { app, store } = await serverApp();
    request = server(app);
    appStore = store;
  });

  beforeEach(async () => {
    await appStore.removeGames();
  });


  it('should do a POST request to "/v1/game" and throw 401 no authorized', () => {
    return request
      .post('/api/v1/games')
      .send({
        gameName: 'test',
        gameKey: 'test-key',
      })
      .expect(401)
      .then((response) => {
        expect(response.body).toEqual({
          message: 'Needs authorization',
        });
      });
  });

  it.only('should do a POST request to "/v1/game" create a game 201', () => {
    return request
      .post('/api/v1/games')
      .send({
        gameName: 'test',
        gameKey: 'test-key',
        topics: ['test'],
      })
      .set({
        authorization: 'Bearer test-token',
      })
      .expect(201)
      .then(async (response) => {
        expect(response.body).toEqual({
          success: true,
        });
        const games = await appStore.getGames();
        expect(games).toHaveLength(1);
        const game = games[0];
        expect(game).toEqual({
          key: 'test-key',
          name: 'test',
          ready: false,
          users: [],
          board: expect.any(Array),
        });
      });
    });
});
