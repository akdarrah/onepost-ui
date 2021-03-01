export class OnepostUI {
  public publicKey: string;
  public authorizedPageIds: Array<number>;

  constructor(publicKey: string, authorizedPageIds: Array<number>) {
    this.publicKey = publicKey;
    this.authorizedPageIds = authorizedPageIds;
  }
}
