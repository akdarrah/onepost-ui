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
    OnepostUI.prototype.endpointWithParams = function () {
        var params = {
            "public_key": this.publicKey,
            "authorized_page_ids[]": this.authorizedPageIds
        };
        return queryString.stringify(params);
    };
    return OnepostUI;
}());
exports.OnepostUI = OnepostUI;
