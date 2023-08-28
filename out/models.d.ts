export interface Client {
    client_id?: string;
    name: string;
    description: string;
}
export interface CreatedClient {
    id: string;
    secret: string;
}
export interface Node {
}
export interface Deployment {
    clientId: string;
    clientSecret: string;
    publicKey: string;
}
export interface NodeView {
    id?: number;
    name?: string;
    publicHost?: string;
    privateHost?: string;
    publicPort?: number;
    privatePort?: number;
    sftpPort?: number;
}
export interface Permissions {
}
export interface PermissionView {
    username?: string;
    email?: string;
    serverIdentifier?: string;
    editServerData?: boolean;
    editServerUsers?: boolean;
    installServer?: boolean;
    viewServerConsole?: boolean;
    sendServerConsole?: boolean;
    stopServer?: boolean;
    startServer?: boolean;
    viewServerStats?: boolean;
    viewServerFiles?: boolean;
    sftpServer?: boolean;
    putServerFiles?: boolean;
    admin?: boolean;
    viewServers?: boolean;
    createServers?: boolean;
    viewNodes?: boolean;
    editNodes?: boolean;
    deployNodes?: boolean;
    viewTemplates?: boolean;
    editTemplates?: boolean;
    editUsers?: boolean;
    viewUsers?: boolean;
    editServerAdmin?: boolean;
    deleteServers?: boolean;
    panelSettings?: boolean;
}
export interface Server {
}
export interface ServerCreation {
    node: number;
    users: string[];
    name: string;
}
export interface GetServerResponse {
    server?: ServerView;
    permissions?: PermissionView;
}
export interface CreateServerResponse {
    id: string;
}
export interface ServerSearchResponse {
    servers: (ServerView | undefined)[];
}
export interface ServerView {
    id?: string;
    name?: string;
    nodeId?: number;
    node?: NodeView;
    data?: any;
    users?: ServerUserView[];
    ip?: string;
    port?: number;
    type: string;
}
export interface ServerUserView {
    username: string;
    scopes: string[];
}
export interface ChangeSetting {
    value: any;
}
export interface SettingResponse {
    value: string;
}
export interface Template {
    name: string;
    readme?: string;
}
export interface User {
}
export interface UserSearch {
    Username: string;
    Email: string;
    PageLimit: number;
    Page: number;
}
export interface UserSearchResponse {
    users: (UserView | undefined)[];
}
export interface UserSetting {
    Key: string;
    UserID: number;
    Value: string;
}
export interface ChangeUserSetting {
    value: string;
}
export interface UserSettingView {
    key: string;
    value: string;
}
export interface UserView {
    id?: number;
    username?: string;
    email?: string;
    password?: string;
    newPassword?: string;
}
export interface Error {
    error?: Error;
}
export interface Metadata {
    paging?: Paging;
}
export interface Paging {
    page: number;
    pageSize: number;
    maxSize: number;
    total: number;
}
export interface Empty {
}
export interface Error {
    msg?: string;
    code?: string;
    metadata?: {
        [key: string]: any;
    };
}
export interface Server {
    data?: {
        [key: string]: Variable;
    };
    display?: string;
    environment?: any;
    supportedEnvironments?: any[];
    install?: any[];
    uninstall?: any[];
    id?: string;
    run?: Execution;
    tasks?: {
        [key: string]: Task;
    };
    requirements?: Requirements;
}
export interface Task {
    name?: string;
    cronSchedule?: string;
    operations?: any[];
}
export interface Variable {
    desc?: string;
    display?: string;
    internal?: boolean;
    required?: boolean;
    value?: any;
    userEdit?: boolean;
    options?: VariableOption[];
}
export interface VariableOption {
    value: any;
    display: string;
}
export interface Execution {
    command?: string;
    stop?: string;
    disabled?: boolean;
    autostart?: boolean;
    autorecover?: boolean;
    autorestart?: boolean;
    pre?: any[];
    post?: any[];
    stopCode?: number;
    environmentVars?: {
        [key: string]: string;
    };
    program?: string;
    arguments?: string[];
    workingDirectory?: string;
}
export interface Type {
    type: string;
}
export interface Requirements {
    binaries?: string[];
    os?: string;
    arch?: string;
}
export interface ServerIdResponse {
    id: string;
}
export interface ServerStats {
    cpu: number;
    memory: number;
}
export interface ServerLogs {
    epoch: number;
    logs: string;
}
export interface ServerRunning {
    running: boolean;
}
export interface ServerData {
    data: {
        [key: string]: Variable;
    };
}
export interface ServerTasks {
    tasks: {
        [key: string]: Task;
    };
}
export interface ServerDataAdmin {
}
export interface PufferdRunning {
    message: string;
}
export interface Features {
    features: string[];
}
export interface FileList {
    path: string;
    error?: string;
    url?: string;
    files?: FileDesc[];
    contents?: string;
    name?: string;
}
export interface FileDesc {
    name: string;
    modifyTime?: number;
    size?: number;
    isFile: boolean;
    extension?: string;
}
export interface oauth2TokenRequest {
    GrantType: string;
    ClientId: string;
    ClientSecret: string;
    Username: string;
    Password: string;
}
export interface oauth2TokenResponse {
    access_token?: string;
    token_type?: string;
    expires_in?: number;
    scope: string;
    error?: string;
    error_description?: string;
}
export interface ValidateOtpRequest {
    token: string;
}
//# sourceMappingURL=models.d.ts.map