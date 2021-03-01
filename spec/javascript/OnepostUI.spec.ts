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

describe('OnepostUI#attach', () => {
  it('adds the iframe to the target', () => {
    let element = document.body;
    expect(element.innerHTML).toBe("");

    let onepost = new OnepostUI(element, "pk-12345", [1]);
    onepost.attach();

    expect(element.innerHTML).not.toBe("");
  })
})

describe('OnepostUI#encodedParams', () => {
  it('returns encoded params', () => {
    let element = document.body;
    let onepost = new OnepostUI(element, "pk-12345", [1]);

    expect(onepost['encodedParams']()).toBe("authorized_page_ids%5B%5D=1&public_key=pk-12345");
  })
})

describe('OnepostUI#endpointWithParams', () => {
  it('returns endpoint with encoded params', () => {
    let element = document.body;
    let onepost = new OnepostUI(element, "pk-12345", [1]);

    expect(onepost['endpointWithParams']()).toBe("https://api.getonepost.com/post_intents/new?authorized_page_ids%5B%5D=1&public_key=pk-12345");
  })
})

describe('OnepostUI#constructIframe', () => {
  it('creates a new iframe element', () => {
    let element = document.body;
    let onepost = new OnepostUI(element, "pk-12345", [1]);
    let iframe = onepost['constructIframe']();

    expect(iframe.src).toBe("https://api.getonepost.com/post_intents/new?authorized_page_ids%5B%5D=1&public_key=pk-12345");
  })
})
