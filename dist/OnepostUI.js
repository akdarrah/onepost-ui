var OnepostUI = /** @class */ (function () {
    function OnepostUI(message) {
        this.greeting = message;
    }
    OnepostUI.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return OnepostUI;
}());
