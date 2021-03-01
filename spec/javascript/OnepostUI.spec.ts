import { OnepostUI } from '../../src/OnepostUI';

describe('OnepostUI#constructor', () => {
  it('can be initialized', () => {
    let element = document.body;
    let onepost = new OnepostUI(element, "pk-12345", [1,2,3]);

    expect(onepost.target).toBe(element);
    expect(onepost.publicKey).toBe("pk-12345");
    expect(onepost.authorizedPageIds).toEqual([1,2,3]);
  })
})

describe('OnepostUI#endpointWithParams', () => {
  it('returns encoded params', () => {
    let element = document.body;
    let onepost = new OnepostUI(element, "pk-12345", [1]);

    expect(onepost['endpointWithParams']()).toBe("authorized_page_ids%5B%5D=1&public_key=pk-12345");
  })
})
