import { OnepostUI } from '../../src/OnepostUI';

describe('OnepostUI#constructor', () => {
  it('can be initialized', () => {
    let onepost = new OnepostUI("pk-12345", [1,2,3]);

    expect(onepost.publicKey).toBe("pk-12345");
    expect(onepost.authorizedPageIds).toEqual([1,2,3]);
  })
})
