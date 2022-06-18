"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const graphql_1 = __importDefault(require("./graphql"));
const app = express();
(0, graphql_1.default)(app);
// pool.connect();
