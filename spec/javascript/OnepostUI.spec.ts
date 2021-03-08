import { OnepostUI } from '../../src/OnepostUI';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('OnepostUI#constructor', () => {
  it('can be initialized', () => {
    let element = document.body;
    let onepost = new OnepostUI(element, "pk-12345", [1,2,3]);

    expect(onepost.target).toBe(element);
    expect(onepost.publicKey).toBe("pk-12345");
    expect(onepost.authorizedPageIds).toEqual([1,2,3]);
    expect(typeof(onepost.onSuccess)).toBe("function");
    expect(typeof(onepost.onFailure)).toBe("function");
  })

  it('can be initialized with an onSuccess callback', () => {
    let callback = (data) => {};
    let element = document.body;
    let onepost = new OnepostUI(element, "pk-12345", [1,2,3], {
      onSuccess: callback
    });

    expect(onepost.onSuccess).toBe(callback);
  })

  it('can be initialized with an onFailure callback', () => {
    let callback = (data) => {};
    let element = document.body;
    let onepost = new OnepostUI(element, "pk-12345", [1,2,3], {
      onFailure: callback
    });

    expect(onepost.onFailure).toBe(callback);
  })
})

describe('OnepostUI#attach', () => {
  it('adds the iframe to the target', () => {
    let element = document.body;
    expect(element.innerHTML).toBe("");

    const mockLoadIframeResizerJS = jest.fn((callback) => {
      callback();
    });

    let onepost = new OnepostUI(element, "pk-12345", [1]);
    onepost["loadIframeResizerJS"] = mockLoadIframeResizerJS;
    onepost.attach();

    expect(element.innerHTML).not.toBe("");
  })

  test("listens for onepost.post_intent.success event", async function() {
    let callback = jest.fn((data) => {});
    let element = document.body;
    let onepost = new OnepostUI(element, "pk-12345", [1], {
      onSuccess: callback
    });

    onepost.attach();
    window.postMessage({message: "onepost.post_intent.success", value: {}}, "*");
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(callback.mock.calls.length).toBe(1);
  })

  test("listens for onepost.post_intent.failure event", async function() {
    let callback = jest.fn((error) => {});
    let element = document.body;
    let onepost = new OnepostUI(element, "pk-12345", [1], {
      onFailure: callback
    });

    onepost.attach();
    window.postMessage({message: "onepost.post_intent.failure", value: {}}, "*");
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(callback.mock.calls.length).toBe(1);
  })
})

describe('OnepostUI#detach', () => {
  it('removes the iframe from the target', () => {
    let element = document.body;
    expect(element.innerHTML).toBe("");

    const mockLoadIframeResizerJS = jest.fn((callback) => {
      callback();
    });

    let onepost = new OnepostUI(element, "pk-12345", [1]);
    onepost["loadIframeResizerJS"] = mockLoadIframeResizerJS;

    onepost.attach();
    expect(element.innerHTML).not.toBe("");

    onepost.detach();
    expect(element.innerHTML).toBe("");
  })

  test("stops listening for onepost.post_intent.success event", async function() {
    let callback = jest.fn((data) => {});
    let element = document.body;
    expect(element.innerHTML).toBe("");

    const mockLoadIframeResizerJS = jest.fn((callback) => {
      callback();
    });

    let onepost = new OnepostUI(element, "pk-12345", [1], {
      onSuccess: callback
    });
    onepost["loadIframeResizerJS"] = mockLoadIframeResizerJS;

    onepost.attach();
    onepost.detach();

    window.postMessage({message: "onepost.post_intent.success", value: {}}, "*");
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(callback.mock.calls.length).toBe(0);
  })

  test("stops listening for onepost.post_intent.failure event", async function() {
    let callback = jest.fn((data) => {});
    let element = document.body;
    expect(element.innerHTML).toBe("");

    const mockLoadIframeResizerJS = jest.fn((callback) => {
      callback();
    });

    let onepost = new OnepostUI(element, "pk-12345", [1], {
      onSuccess: callback
    });
    onepost["loadIframeResizerJS"] = mockLoadIframeResizerJS;

    onepost.attach();
    onepost.detach();

    window.postMessage({message: "onepost.post_intent.failure", value: {}}, "*");
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(callback.mock.calls.length).toBe(0);
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
