"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolvers_1 = __importDefault(require("./resolvers"));
const index_1 = __importDefault(require("./typedefs/index"));
const user_1 = __importDefault(require("./typedefs/user"));
const schema = {
    typeDefs: [index_1.default, user_1.default],
    resolvers: resolvers_1.default,
};
exports.default = schema;
