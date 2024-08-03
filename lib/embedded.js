"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.surrealdbNodeEngines = void 0;
const index_js_1 = require("../index.js");
const surrealdb_js_1 = require("surrealdb.js");
function surrealdbNodeEngines(opts) {
    class NodeEmbeddedEngine extends surrealdb_js_1.AbstractEngine {
        ready = undefined;
        reader;
        db;
        async version(url, timeout) {
            return index_js_1.SurrealdbNodeEngine.version();
        }
        setStatus(status, ...args) {
            this.status = status;
            this.emitter.emit(status, args);
        }
        async connect(url) {
            this.connection.url = url;
            this.setStatus(surrealdb_js_1.ConnectionStatus.Connecting);
            const ready = (async (resolve, reject) => {
                const db = await index_js_1.SurrealdbNodeEngine.connect(url.toString(), opts).catch((e) => {
                    console.log(e);
                    const error = new surrealdb_js_1.UnexpectedConnectionError(typeof e === "string"
                        ? e
                        : "error" in e
                            ? e.error
                            : "An unexpected error occurred");
                    this.setStatus(surrealdb_js_1.ConnectionStatus.Error, error);
                    throw e;
                });
                this.db = db;
                this.setStatus(surrealdb_js_1.ConnectionStatus.Connected);
            })();
            this.ready = ready;
            return await ready;
        }
        async disconnect() {
            this.connection = {
                url: undefined,
                namespace: undefined,
                database: undefined,
                token: undefined,
            };
            await this.ready;
            this.ready = undefined;
            this.db?.free();
            this.db = undefined;
            await this.reader;
            this.reader = undefined;
            if (this.status !== surrealdb_js_1.ConnectionStatus.Disconnected) {
                this.setStatus(surrealdb_js_1.ConnectionStatus.Disconnected);
            }
        }
        async rpc(request) {
            await this.ready;
            if (!this.db)
                throw new surrealdb_js_1.ConnectionUnavailable();
            const id = (0, surrealdb_js_1.getIncrementalID)();
            const res = await this.db
                .execute(new Uint8Array(this.encodeCbor({ id, ...request })))
                .then((raw) => ({ result: this.decodeCbor(raw.buffer) }))
                .catch((message) => ({ error: { code: -1, message } }));
            if ("result" in res) {
                switch (request.method) {
                    case "use": {
                        this.connection.namespace = request
                            .params?.[0];
                        this.connection.database = request
                            .params?.[1];
                        break;
                    }
                    case "signin":
                    case "signup": {
                        this.connection.token = res.result;
                        break;
                    }
                    case "authenticate": {
                        this.connection.token = request.params?.[0];
                        break;
                    }
                    case "invalidate": {
                        this.connection.token = undefined;
                        break;
                    }
                }
            }
            return res;
        }
        get connected() {
            return !!this.db;
        }
    }
    return {
        mem: NodeEmbeddedEngine,
        surrealkv: NodeEmbeddedEngine,
    };
}
exports.surrealdbNodeEngines = surrealdbNodeEngines;
//# sourceMappingURL=embedded.js.map