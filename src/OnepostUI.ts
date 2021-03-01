const queryString = require('query-string');

export class OnepostUI {
  readonly endpoint = "https://api.getonepost.com/post_intents/new";

  public target: HTMLElement;
  public publicKey: string;
  public authorizedPageIds: Array<number>;
  public iframe: HTMLElement;

  constructor(target: HTMLElement, publicKey: string, authorizedPageIds: Array<number>) {
    this.target = target;
    this.publicKey = publicKey;
    this.authorizedPageIds = authorizedPageIds;
  }

  attach() {
    this.iframe = this.constructIframe();
    this.target.appendChild(this.iframe);
  }

  private constructIframe() {
    let iframe = document.createElement('iframe');
    iframe.src = this.endpointWithParams();

    return iframe;
  }

  private endpointWithParams() {
    return `${this.endpoint}&${this.encodedParams()}`;
  }

  private encodedParams() {
    let params = {
      "public_key": this.publicKey,
      "authorized_page_ids[]": this.authorizedPageIds
    }

    return queryString.stringify(params);
  }
}
