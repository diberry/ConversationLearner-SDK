"use strict";
var tslib_1 = require("tslib");
var builder = require("botbuilder");
var BlisDialog = (function (_super) {
    tslib_1.__extends(BlisDialog, _super);
    function BlisDialog(options) {
        var _this = _super.call(this) || this;
        _this.options = options;
        _this.recognizers = new builder.IntentRecognizerSet(options);
        return _this;
    }
    BlisDialog.prototype.replyReceived = function (session, recognizeResult) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var locale, context;
            return tslib_1.__generator(this, function (_a) {
                if (!recognizeResult) {
                    locale = session.preferredLocale();
                    context = session.toRecognizeContext();
                    context.dialogData = session.dialogData;
                    context.activeDialog = true;
                    this.recognize(context, function (error, result) {
                        var blisResult = result;
                        try {
                            if (!error) {
                                _this.invokeAnswer(session, blisResult);
                            }
                        }
                        catch (e) {
                            _this.emitError(session, e);
                        }
                    });
                }
                else {
                    this.invokeAnswer(session, recognizeResult);
                }
                return [2 /*return*/];
            });
        });
    };
    BlisDialog.prototype.recognize = function (context, cb) {
        this.recognizers.recognize(context, cb);
    };
    BlisDialog.prototype.recognizer = function (plugin) {
        // Append recognizer
        this.recognizers.recognizer(plugin);
        return this;
    };
    BlisDialog.prototype.invokeAnswer = function (session, recognizeResult) {
        // TODO: Consider adding threshold
        var blisResult = recognizeResult;
        if (blisResult.answer) {
            session.send(blisResult.answer);
        }
        if (blisResult.card) {
            var msg = new builder.Message(session).addAttachment(blisResult.card);
            session.send(msg);
        }
    };
    BlisDialog.prototype.emitError = function (session, err) {
        var m = err.toString();
        err = err instanceof Error ? err : new Error(m);
        session.error(err);
    };
    return BlisDialog;
}(builder.Dialog));
exports.BlisDialog = BlisDialog;
//# sourceMappingURL=BlisDialog.js.map