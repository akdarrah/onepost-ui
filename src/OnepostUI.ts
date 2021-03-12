const queryString = require('query-string');

interface OnepostUIOptions {
  onSuccess?: (data) => void
  onFailure?: (error) => void
  imageIds?: Array<number>
  token?: string
}

export class OnepostUI {
  readonly endpoint = "https://api.getonepost.com/post_intents/new";
  readonly iframeResizerSrc = "https://unpkg.com/iframe-resizer@4.3.1/js/iframeResizer.min.js";

  public target: HTMLElement;
  public publicKey: string;
  public authorizedPageIds: Array<number>;
  public imageIds: Array<number>;
  public token: string;
  public iframe: HTMLElement;
  public options: OnepostUIOptions;
  public onSuccess: Function;
  public onFailure: Function;
  public windowMessageCallback: any;

  constructor(target: HTMLElement, publicKey: string, authorizedPageIds: Array<number>, options: OnepostUIOptions = {}) {
    this.target = target;
    this.publicKey = publicKey;
    this.authorizedPageIds = authorizedPageIds;

    this.options = options;
    this.onSuccess = (typeof(options['onSuccess']) === 'function' ? options['onSuccess'] : ((data) => {}));
    this.onFailure = (typeof(options['onFailure']) === 'function' ? options['onFailure'] : ((error) => {}));
    this.imageIds  = (typeof(options['imageIds']) === 'object' ? options['imageIds'] : []);
    this.token     = (typeof(options['token']) === 'string' ? options['token'] : null);
  }

  attach() {
    this.loadIframeResizerJS(() => {
      this.iframe = this.constructIframe();
      this.target.appendChild(this.iframe);

      this.iframe.addEventListener("load", () => {
        window['iFrameResize'](this.iframe);
      });
    });

    this.windowMessageCallback = (event: any) => {
      switch(event.data.message) {
        case "onepost.post_intent.success": {
          this.onSuccess(event.data.value);
          break;
        }
        case "onepost.post_intent.failure": {
          this.onFailure(event.data.value);
          break;
        }
      }
    }

    window.addEventListener("message", this.windowMessageCallback, false);
  }

  detach() {
    // https://github.com/davidjbradshaw/iframe-resizer/issues/534
    // this.iframe.iframeResizer.close();

    this.iframe.remove();
    window.removeEventListener("message", this.windowMessageCallback);
  }

  private constructIframe() {
    let iframe = document.createElement('iframe');
    iframe.src = this.endpointWithParams();

    return iframe;
  }

  private endpointWithParams() {
    return `${this.endpoint}?${this.encodedParams()}`;
  }

  private encodedParams() {
    let params = {
      "public_key": this.publicKey,
      "authorized_page_ids[]": this.authorizedPageIds,
      "image_upload_ids[]": this.imageIds
    }

    if(this.token && this.token.length > 0){
      params["token"] = this.token;
    }

    return queryString.stringify(params);
  }

  private loadIframeResizerJS(callback: any) {
    let script = document.createElement('script');

    script.src = this.iframeResizerSrc;
    script.onload = callback;

    document.head.appendChild(script);
  }
}
