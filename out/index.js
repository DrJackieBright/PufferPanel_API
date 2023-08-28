var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PufferPanelClient_id, _PufferPanelClient_secret, _PufferPanelClient_oauth;
import fetch from "node-fetch";
import EventEmitter from "events";
export default class PufferPanelClient extends EventEmitter {
    constructor(host, id, secret) {
        super();
        _PufferPanelClient_id.set(this, void 0);
        _PufferPanelClient_secret.set(this, void 0);
        _PufferPanelClient_oauth.set(this, void 0);
        this.host = host;
        __classPrivateFieldSet(this, _PufferPanelClient_id, id, "f");
        __classPrivateFieldSet(this, _PufferPanelClient_secret, secret, "f");
        this.getOAuth().then(() => {
            this.emit("READY");
            // console.log(this.#oauth);
        });
    }
    getOAuth() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                let form = new URLSearchParams();
                form.append("grant_type", "client_credentials");
                form.append("client_id", __classPrivateFieldGet(this, _PufferPanelClient_id, "f"));
                form.append("client_secret", __classPrivateFieldGet(this, _PufferPanelClient_secret, "f"));
                fetch(`${this.host}/oauth2/token`, {
                    method: "POST",
                    body: form,
                    headers: { "Content-Type": "application/x-www-form-urlencoded" }
                }).then((response) => {
                    // console.log(response.status, response.statusText);
                    response.text().then(text => {
                        __classPrivateFieldSet(this, _PufferPanelClient_oauth, JSON.parse(text), "f");
                        resolve(true);
                    });
                });
            });
        });
    }
    authenticatedRequest(url, method, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.debug(url)
            return new Promise((resolve, reject) => {
                fetch(this.host + url, { method: method, body: JSON.stringify(payload), headers: { Authorization: `Bearer ${__classPrivateFieldGet(this, _PufferPanelClient_oauth, "f").access_token}` } }).then((response) => {
                    // console.log(response.status, response.statusText);
                    switch (response.status) {
                        case 200: // OK
                            response.text().then((text) => {
                                try {
                                    resolve(JSON.parse(text));
                                }
                                catch (error) {
                                    resolve(text);
                                }
                            });
                            break;
                        case 204: // No Content
                        case 202: // Accepted
                            resolve({});
                            break;
                        default:
                            response.text().then(body => {
                                reject({ reason: response.status + " " + response.statusText, response: response, body: body });
                            });
                    }
                });
            });
        });
    }
    //#region NODES ---------- web/api/nodes.go
    getAllNodes() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/nodes`);
        });
    }
    createNode(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/nodes`, "POST", data);
        });
    }
    getNode(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/nodes/${id}`);
        });
    }
    updateNode(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/nodes/${id}`, "PUT", data);
        });
    }
    deleteNode(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/nodes/${id}`, "DELETE");
        });
    }
    deployNode(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/nodes/${id}/deployment`);
        });
    }
    //#endregion
    //#region SERVERS -------- web/api/servers.go //TODO: createServer
    searchServers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/servers`);
        });
    }
    /** @deprecated Not yet implemented*/
    createServer(serverData) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((_resolve, reject) => reject("Unimplemented function"));
        });
    } //TODO: figure this part out
    getServer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/servers/${id}`);
        });
    }
    deleteServer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/servers/${id}`, "DELETE");
        });
    }
    renameServer(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/servers/${id}/name/${name}`, "PUT");
        });
    }
    getServerUsers(id, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/servers/${id}/user/${email}`);
        });
    }
    editServerUser(id, email, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/servers/${id}/user/${email}`, "PUT", data);
        });
    }
    removeServerUser(id, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/servers/${id}/user/${email}`, "DELETE");
        });
    }
    getOAuth2Clients(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/servers/${id}/oauth2`);
        });
    }
    createOAuth2Clients(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/servers/${id}/oauth2`, "POST", data);
        });
    }
    deleteOAuth2Client(id, clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/servers/${id}/oauth2/${clientId}`, "DELETE");
        });
    }
    //#endregion
    //#region USERS ---------- web/api/users.go
    searchUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/users`);
        });
    }
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/users`, "POST", data);
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/users/${id}`);
        });
    }
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/users/${id}`, "POST", data);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/users/${id}`, "DELETE");
        });
    }
    getUserPerms(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/users/${id}/perms`);
        });
    }
    setUserPerms(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/users/${id}/perms`, "PUT", data);
        });
    }
    //#endregion
    //#region TEMPLATES ------ web/api/templates.go
    getAllTemplates() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/templates`);
        });
    }
    getImportableTemplates() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/templates/import`, "POST");
        });
    }
    importTemplate(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/templates/import/${name}`, "POST");
        });
    }
    getTemplate(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/templates/${name}`);
        });
    }
    deleteTemplate(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/templates/${name}`, "DELETE");
        });
    }
    putTemplate(name, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/templates/${name}`, "PUT", data);
        });
    }
    //#endregion
    //#region SELF ----------- web/api/self.go
    getSelf() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/self`);
        });
    }
    updateSelf(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/self`, "PUT", data);
        });
    }
    getOtpStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/self/otp`);
        });
    }
    startOtpEnroll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/self/otp`, "POST");
        });
    }
    validateOtpEnroll(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/self/otp`, "PUT", token);
        });
    }
    disableOtp(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/self/otp/${token}`, "DELETE");
        });
    }
    getPersonalOAuth2Clients() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/self/oauth2`);
        });
    }
    createPersonalOAuth2Client(client) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/self/oauth2`, "POST", client);
        });
    }
    deletePersonalOAuth2Client(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/self/oauth2/${id}`, "DELETE");
        });
    }
    //#endregion
    //#region SETTINGS ------- web/api/settings.go
    getSetting(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/settings/${key}`);
        });
    }
    setSetting(key, setting) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/settings/${key}`, "PUT", setting);
        });
    }
    //#endregion
    //#region User Settings -- web/api/usersettings.go
    getUserSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/userSettings`);
        });
    }
    setUserSetting(key, set) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/api/userSettings/${key}`, "PUT", set);
        });
    }
    //#endregion
    //#region Daemon --------- web/daemon/root.go
    getDaemonStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/daemon`);
        });
    }
    //#endregion
    //#region Daemon Server -- web/daemon/server.go //TODO: editServerData, putFile, archive, extract
    getServerAdmin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/daemon/server/${id}`);
        });
    }
    editServerAdmin(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/daemon/server/${id}`, "POST", data);
        });
    }
    getServerData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/daemon/server/${id}/data`);
        });
    }
    /** @deprecated not yet implemented */
    editServerData(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((_resolve, reject) => reject("Unimplemented function"));
        });
    } //TODO: implement
    reloadServer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/daemon/server/${id}/reload`, "POST");
        });
    }
    startServer(id, wait) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/daemon/server/${id}/start?wait=${wait}`, "POST");
        });
    }
    stopServer(id, wait) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/daemon/server/${id}/stop?wait=${wait}`, "POST");
        });
    }
    killServer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/daemon/server/${id}/kill`, "POST");
        });
    }
    installServer(id, wait) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/daemon/server/${id}/install?wait=${wait}`, "POST");
        });
    }
    getFile(id, filename = "") {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/daemon/server/${id}/file/${filename}`, "GET");
        });
    }
    /** @deprecated not yet implemented */
    putFile(id, filename, isFolder = false, file) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((_resolve, reject) => reject("Unimplemented function"));
            return this.authenticatedRequest(`/daemon/server/${id}/file/${filename}?folder=${isFolder}`, "PUT");
        });
    } //TODO: implement
    deleteFile(id, filename = "") {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/daemon/server/${id}/file/${filename}`, "DELETE");
        });
    }
    getServerLogs(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/daemon/server/${id}/console`);
        });
    }
    postConsole(id, commands) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/daemon/server/${id}/console`, "POST", commands);
        });
    }
    getStats(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/daemon/server/${id}/stats`);
        });
    }
    getStatus(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticatedRequest(`/daemon/server/${id}/status`);
        });
    }
    /** @deprecated not yet implemented */
    archive() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((_resolve, reject) => reject("Unimplemented function"));
        });
    } //TODO: implement
    /** @deprecated not yet implemented */
    extract() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((_resolve, reject) => reject("Unimplemented function"));
        });
    } //TODO: implement
}
_PufferPanelClient_id = new WeakMap(), _PufferPanelClient_secret = new WeakMap(), _PufferPanelClient_oauth = new WeakMap();
//# sourceMappingURL=index.js.map