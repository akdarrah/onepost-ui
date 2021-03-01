"use strict";
exports.__esModule = true;
exports.OnepostUI = void 0;
var OnepostUI = /** @class */ (function () {
    function OnepostUI(target, publicKey, authorizedPageIds) {
        this.endpoint = "https://api.getonepost.com/post_intents/new";
        this.target = target;
        this.publicKey = publicKey;
        this.authorizedPageIds = authorizedPageIds;
    }
    return OnepostUI;
}());
exports.OnepostUI = OnepostUI;
