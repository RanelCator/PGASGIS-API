import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class SqlService implements OnModuleInit, OnModuleDestroy {
    private readonly config;
    private pool;
    private readonly logger;
    constructor(config: ConfigService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    GetUserID(username: string, password: string): Promise<any>;
}
