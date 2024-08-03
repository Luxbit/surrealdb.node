import { SurrealdbNodeEngine as Sne } from "../index.js";
import { ConnectionStatus, type EngineEvents, type RpcRequest, type RpcResponse } from "surrealdb.js";
export declare function surrealdbNodeEngines(opts?: ConnectionOptions): {
    mem: {
        new (context: {
            readonly emitter: import("surrealdb.js").Emitter<EngineEvents>;
            readonly encodeCbor: (value: unknown) => ArrayBuffer;
            readonly decodeCbor: (value: ArrayBufferLike) => any;
        }): {
            ready: Promise<void> | undefined;
            reader?: Promise<void>;
            db?: Sne;
            version(url: URL, timeout: number): Promise<string>;
            setStatus<T extends ConnectionStatus>(status: T, ...args: EngineEvents[T]): void;
            connect(url: URL): Promise<void>;
            disconnect(): Promise<void>;
            rpc<Method extends string, Params extends unknown[], Result>(request: RpcRequest<Method, Params>): Promise<RpcResponse<Result>>;
            readonly connected: boolean;
            readonly context: {
                readonly emitter: import("surrealdb.js").Emitter<EngineEvents>;
                readonly encodeCbor: (value: unknown) => ArrayBuffer;
                readonly decodeCbor: (value: ArrayBufferLike) => any;
            };
            status: ConnectionStatus;
            connection: {
                url: URL;
                namespace: string;
                database: string;
                token: string;
            };
            readonly emitter: import("surrealdb.js").Emitter<EngineEvents>;
            readonly encodeCbor: (value: unknown) => ArrayBuffer;
            readonly decodeCbor: (value: ArrayBufferLike) => any;
        };
    };
    surrealkv: {
        new (context: {
            readonly emitter: import("surrealdb.js").Emitter<EngineEvents>;
            readonly encodeCbor: (value: unknown) => ArrayBuffer;
            readonly decodeCbor: (value: ArrayBufferLike) => any;
        }): {
            ready: Promise<void> | undefined;
            reader?: Promise<void>;
            db?: Sne;
            version(url: URL, timeout: number): Promise<string>;
            setStatus<T extends ConnectionStatus>(status: T, ...args: EngineEvents[T]): void;
            connect(url: URL): Promise<void>;
            disconnect(): Promise<void>;
            rpc<Method extends string, Params extends unknown[], Result>(request: RpcRequest<Method, Params>): Promise<RpcResponse<Result>>;
            readonly connected: boolean;
            readonly context: {
                readonly emitter: import("surrealdb.js").Emitter<EngineEvents>;
                readonly encodeCbor: (value: unknown) => ArrayBuffer;
                readonly decodeCbor: (value: ArrayBufferLike) => any;
            };
            status: ConnectionStatus;
            connection: {
                url: URL;
                namespace: string;
                database: string;
                token: string;
            };
            readonly emitter: import("surrealdb.js").Emitter<EngineEvents>;
            readonly encodeCbor: (value: unknown) => ArrayBuffer;
            readonly decodeCbor: (value: ArrayBufferLike) => any;
        };
    };
};
export type CapabilitiesAllowDenyList = {
    allow?: boolean | string[];
    deny?: boolean | string[];
};
export type ConnectionOptions = {
    strict?: boolean;
    query_timeout?: number;
    transaction_timeout?: number;
    capabilities?: boolean | {
        guest_access?: boolean;
        functions?: boolean | string[] | CapabilitiesAllowDenyList;
        network_targets?: boolean | string[] | CapabilitiesAllowDenyList;
    };
};
