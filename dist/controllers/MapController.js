"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_decorators_1 = require("fastify-decorators");
const fluent_json_schema_1 = __importDefault(require("fluent-json-schema"));
const GetRoadRoute_1 = __importDefault(require("../routes/map/GetRoadRoute"));
const GetElectricStationsRoute_1 = __importDefault(require("../routes/map/GetElectricStationsRoute"));
let MapController = class MapController {
    constructor() {
        this.handlerGetRoad = (req, reply) => __awaiter(this, void 0, void 0, function* () { return new GetRoadRoute_1.default().run(req, reply); });
        this.handlerGetElectricStations = (req, reply) => __awaiter(this, void 0, void 0, function* () { return new GetElectricStationsRoute_1.default().run(req, reply); });
    }
};
__decorate([
    (0, fastify_decorators_1.GET)('/road', {
        schema: {
            querystring: fluent_json_schema_1.default.object()
                // Start will be an array with only 2 numbers, the lat and the lng [number, number]
                .prop('start', fluent_json_schema_1.default.string().required())
                // End will be an array with only 2 numbers, the lat and the lng [number, number]
                .prop('end', fluent_json_schema_1.default.string().required())
        }
    }),
    __metadata("design:type", Object)
], MapController.prototype, "handlerGetRoad", void 0);
__decorate([
    (0, fastify_decorators_1.POST)('/electric-stations', {
        schema: {
            body: fluent_json_schema_1.default.object()
                .prop('road', fluent_json_schema_1.default.array().items(fluent_json_schema_1.default.array().items(fluent_json_schema_1.default.number())).required())
        }
    }),
    __metadata("design:type", Object)
], MapController.prototype, "handlerGetElectricStations", void 0);
MapController = __decorate([
    (0, fastify_decorators_1.Controller)('/map')
], MapController);
exports.default = MapController;
