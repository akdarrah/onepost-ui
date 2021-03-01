"use strict";
exports.__esModule = true;
exports.OnepostUI = void 0;
var queryString = require('query-string');
var OnepostUI = /** @class */ (function () {
    function OnepostUI(target, publicKey, authorizedPageIds) {
        this.endpoint = "https://api.getonepost.com/post_intents/new";
        this.target = target;
        this.publicKey = publicKey;
        this.authorizedPageIds = authorizedPageIds;
    }
    OnepostUI.prototype.attach = function () {
        this.iframe = this.constructIframe();
        this.target.appendChild(this.iframe);
    };
    OnepostUI.prototype.constructIframe = function () {
        var iframe = document.createElement('iframe');
        iframe.src = this.endpointWithParams();
        return iframe;
    };
    OnepostUI.prototype.endpointWithParams = function () {
        return this.endpoint + "&" + this.encodedParams();
    };
    OnepostUI.prototype.encodedParams = function () {
        var params = {
            "public_key": this.publicKey,
            "authorized_page_ids[]": this.authorizedPageIds
        };
        return queryString.stringify(params);
    };
    return OnepostUI;
}());
exports.OnepostUI = OnepostUI;
