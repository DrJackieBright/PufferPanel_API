/// <reference types="node" />
import EventEmitter from "events";
import * as models from "./models";
export default class PufferPanelClient extends EventEmitter {
    #private;
    host: string;
    constructor(host: string, id: string, secret: string);
    getOAuth(): Promise<Boolean>;
    authenticatedRequest(url: string, method?: "GET" | "POST" | "PUT" | "DELETE", payload?: Object): Promise<any>;
    getAllNodes(): Promise<models.NodeView[]>;
    createNode(data: models.NodeView): Promise<models.NodeView>;
    getNode(id: string): Promise<models.NodeView>;
    updateNode(id: string, data: models.NodeView): Promise<models.Empty>;
    deleteNode(id: string): Promise<models.Empty>;
    deployNode(id: string): Promise<models.Deployment>;
    searchServers(): Promise<models.ServerSearchResponse>;
    /** @deprecated Not yet implemented*/
    createServer(serverData: models.ServerCreation): Promise<unknown>;
    getServer(id: string): Promise<models.GetServerResponse>;
    deleteServer(id: string): Promise<models.Empty>;
    renameServer(id: string, name: string): Promise<any>;
    getServerUsers(id: string, email?: string): Promise<[models.PermissionView]>;
    editServerUser(id: string, email: string, data: models.PermissionView): Promise<models.Empty>;
    removeServerUser(id: string, email: string): Promise<models.Empty>;
    getOAuth2Clients(id: string): Promise<[models.Client]>;
    createOAuth2Clients(id: string, data: models.Client): Promise<models.CreatedClient>;
    deleteOAuth2Client(id: string, clientId: string): Promise<models.Empty>;
    searchUsers(): Promise<models.UserSearchResponse>;
    createUser(data: models.UserView): Promise<models.UserView>;
    getUser(id: string): Promise<models.UserView>;
    updateUser(id: string, data: models.UserView): Promise<any>;
    deleteUser(id: string): Promise<models.Empty>;
    getUserPerms(id: string): Promise<models.PermissionView>;
    setUserPerms(id: string, data: models.PermissionView): Promise<models.Empty>;
    getAllTemplates(): Promise<[models.Template]>;
    getImportableTemplates(): Promise<[string]>;
    importTemplate(name: string): Promise<models.Empty>;
    getTemplate(name: string): Promise<models.Server>;
    deleteTemplate(name: string): Promise<models.Empty>;
    putTemplate(name: string, data: models.Server): Promise<any>;
    getSelf(): Promise<models.UserView>;
    updateSelf(data: models.User): Promise<models.Empty>;
    getOtpStatus(): Promise<boolean>;
    startOtpEnroll(): Promise<boolean>;
    validateOtpEnroll(token: models.ValidateOtpRequest): Promise<boolean>;
    disableOtp(token: string): Promise<boolean>;
    getPersonalOAuth2Clients(): Promise<models.Client[]>;
    createPersonalOAuth2Client(client: models.Client): Promise<models.CreatedClient>;
    deletePersonalOAuth2Client(id: string): Promise<models.Empty>;
    getSetting(key: string): Promise<models.SettingResponse>;
    setSetting(key: string, setting: models.ChangeSetting): Promise<models.Empty>;
    getUserSettings(): Promise<[models.UserSettingView]>;
    setUserSetting(key: string, set: models.ChangeUserSetting): Promise<any>;
    getDaemonStatus(): Promise<any>;
    getServerAdmin(id: string): Promise<any>;
    editServerAdmin(id: string, data: models.Server): Promise<any>;
    getServerData(id: string): Promise<any>;
    /** @deprecated not yet implemented */
    editServerData(id: string, data: any): Promise<unknown>;
    reloadServer(id: string): Promise<models.Empty>;
    startServer(id: string, wait: boolean): Promise<models.Empty>;
    stopServer(id: string, wait: boolean): Promise<models.Empty>;
    killServer(id: string): Promise<models.Empty>;
    installServer(id: string, wait: boolean): Promise<models.Empty>;
    getFile(id: string, filename?: string): Promise<models.FileList | string>;
    /** @deprecated not yet implemented */
    putFile(id: string, filename: string, isFolder?: boolean, file?: unknown): Promise<any>;
    deleteFile(id: string, filename?: string): Promise<any>;
    getServerLogs(id: string): Promise<models.ServerLogs>;
    postConsole(id: string, commands: string): Promise<models.Empty>;
    getStats(id: string): Promise<any>;
    getStatus(id: string): Promise<any>;
    /** @deprecated not yet implemented */
    archive(): Promise<unknown>;
    /** @deprecated not yet implemented */
    extract(): Promise<unknown>;
}
//# sourceMappingURL=index.d.ts.map