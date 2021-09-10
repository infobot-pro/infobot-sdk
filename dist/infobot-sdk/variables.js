"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const actions_1 = require("./actions");
const events_2 = require("./events");
class InfobotVariables extends events_1.default {
    constructor(call) {
        super();
        this.call = call;
        //id: string = uuid()
        this.vars = [];
        this.setMaxListeners(200);
        this.initEventHandlers();
    }
    initEventHandlers() {
        this.call.on(events_2.WS_CALL_EVENTS.VARIABLES_SET, (message) => {
            if (message.callID !== this.call.id)
                return;
            this.vars = message.params.variables;
            this.call.emit(events_2.APP_EVENTS.VARIABLES_SET, message);
        });
        this.call.on(events_2.WS_CALL_EVENTS.VARIABLES_GET, (message) => {
            if (message.callID !== this.call.id)
                return;
            this.vars = message.params.variables;
            this.call.emit(events_2.APP_EVENTS.VARIABLES_GET, message);
        });
        this.call.on(events_2.WS_CALL_EVENTS.VARIABLES_DELETE, (message) => {
            if (message.callID !== this.call.id)
                return;
            this.vars = message.params.variables;
            this.call.emit(events_2.APP_EVENTS.VARIABLES_DELETE, message);
        });
    }
    set(variables) {
        this.call.send(actions_1.variablesSet(variables));
    }
    delete(key) {
        this.call.send(actions_1.variablesDelete(key));
    }
    get() {
        this.call.send(actions_1.variablesGet());
    }
}
exports.default = InfobotVariables;
//# sourceMappingURL=variables.js.map