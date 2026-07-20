"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsRouter = void 0;
const nestjs_trpc_1 = require("nestjs-trpc");
const zod_1 = __importDefault(require("zod"));
const schemas_1 = require("@repo/trpc/schemas");
const auth_trpc_middleware_1 = require("src/auth/auth-trpc.middleware");
let PostsRouter = (() => {
    let _classDecorators = [(0, nestjs_trpc_1.Router)(), (0, nestjs_trpc_1.UseMiddlewares)(auth_trpc_middleware_1.AuthTrpcMiddleware)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _create_decorators;
    let _finalAll_decorators;
    let _likePost_decorators;
    var PostsRouter = _classThis = class {
        constructor(postsService) {
            this.postsService = (__runInitializers(this, _instanceExtraInitializers), postsService);
        }
        async create(createPostDto, context) {
            return this.postsService.createPost(createPostDto, context.user.id);
        }
        async finalAll(context) {
            return this.postsService.getPosts(context.user.id);
        }
        async likePost(likePostDto, context) {
            return this.postsService.likePost(likePostDto.postId, context.user.id);
        }
    };
    __setFunctionName(_classThis, "PostsRouter");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _create_decorators = [(0, nestjs_trpc_1.Mutation)({
                input: schemas_1.createPostSchema,
            })];
        _finalAll_decorators = [(0, nestjs_trpc_1.Query)({
                output: zod_1.default.array(schemas_1.postSchema),
            })];
        _likePost_decorators = [(0, nestjs_trpc_1.Mutation)({
                input: schemas_1.likePostSchema,
            })];
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _finalAll_decorators, { kind: "method", name: "finalAll", static: false, private: false, access: { has: obj => "finalAll" in obj, get: obj => obj.finalAll }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _likePost_decorators, { kind: "method", name: "likePost", static: false, private: false, access: { has: obj => "likePost" in obj, get: obj => obj.likePost }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PostsRouter = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PostsRouter = _classThis;
})();
exports.PostsRouter = PostsRouter;
