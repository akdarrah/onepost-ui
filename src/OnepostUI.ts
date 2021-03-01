const queryString = require('query-string');

export class OnepostUI {
  readonly endpoint = "https://api.getonepost.com/post_intents/new";

  public target: HTMLElement;
  public publicKey: string;
  public authorizedPageIds: Array<number>;

  constructor(target: HTMLElement, publicKey: string, authorizedPageIds: Array<number>) {
    this.target = target;
    this.publicKey = publicKey;
    this.authorizedPageIds = authorizedPageIds;
  }

  private endpointWithParams() {
    let params = {
      "public_key": this.publicKey,
      "authorized_page_ids[]": this.authorizedPageIds
    }

    return queryString.stringify(params);
  }
}
