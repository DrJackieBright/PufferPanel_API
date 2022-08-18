import fetch from "node-fetch";
import EventEmitter from "events"
import * as models from "./models"

export default class PufferPanelClient extends EventEmitter{
	host: string
	#id: string
	#secret: string
	#oauth!: models.oauth2TokenResponse
	
	constructor(host:string, id:string, secret:string) {
		super();
		this.host = host;
		this.#id = id;
		this.#secret = secret;
		this.getOAuth().then(()=> {
			this.emit("READY");
			// console.log(this.#oauth);
		});
	}
	
	async getOAuth(): Promise<Boolean> {
		return new Promise((resolve) => {
			let form = new URLSearchParams();
			form.append("grant_type", "client_credentials");
			form.append("client_id", this.#id);
			form.append("client_secret", this.#secret);
			
			fetch(`${this.host}/oauth2/token`, {
				method: "POST",
				body: form,
				headers: {"Content-Type": "application/x-www-form-urlencoded"}
			}).then((response) => {
				// console.log(response.status, response.statusText);
				response.text().then(text => {
					this.#oauth = JSON.parse(text);
					resolve(true);
				});
			});
		});
	}
	
	async authenticatedRequest(url:string, method?:"GET"|"POST"|"PUT"|"DELETE", payload?:Object): Promise<any> {
		// console.debug(url)
		return new Promise((resolve, reject) => {
			fetch(this.host + url, {method: method, body: JSON.stringify(payload), headers: {Authorization: `Bearer ${this.#oauth.access_token}`}}).then((response) => {
				// console.log(response.status, response.statusText);
				switch(response.status) {
					case 200: // OK
					response.text().then((text) => {
						try {
							resolve(JSON.parse(text));
						} catch (error) {
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
						reject({reason: response.status + " " + response.statusText, response: response, body: body});
					}) 
				}
			});
		});
	}
	
	//#region NODES ------------ web/api/nodes.go
	async getAllNodes(): Promise<models.NodeView[]> {
		return this.authenticatedRequest(`/api/nodes`);
	}
	
	async createNode(data: models.NodeView): Promise<models.NodeView> {
		return this.authenticatedRequest(`/api/nodes`, "POST", data);
	}

	async getNode(id: string): Promise<models.NodeView> {
		return this.authenticatedRequest(`/api/nodes/${id}`);
	}

	async updateNode(id: string, data: models.NodeView): Promise<models.Empty> {
		return this.authenticatedRequest(`/api/nodes/${id}`, "PUT", data);
	}
	
	async deleteNode(id: string): Promise<models.Empty> {
		return this.authenticatedRequest(`/api/nodes/${id}`, "DELETE");
	}
	
	async deployNode(id: string): Promise<models.Deployment> {
		return this.authenticatedRequest(`/api/nodes/${id}/deployment`);
	}
	//#endregion
	
	//#region SERVERS ---------- web/api/servers.go //TODO: createServer
	async searchServers(): Promise<models.ServerSearchResponse> {
		return this.authenticatedRequest(`/api/servers`);
	}

	/** @deprecated Not yet implemented*/
	async createServer(serverData: models.ServerCreation) {
		return new Promise((_resolve, reject) => reject("Unimplemented function"));
	} //TODO: figure this part out

	async getServer(id: string): Promise<models.GetServerResponse> {
		return this.authenticatedRequest(`/api/servers/${id}`);
	}

	async deleteServer(id: string): Promise<models.Empty> {
		return this.authenticatedRequest(`/api/servers/${id}`, "DELETE");
	}

	async renameServer(id: string, name:string) {
		return this.authenticatedRequest(`/api/servers/${id}/name/${name}`, "PUT");
	}

	async getServerUsers(id: string, email?: string): Promise<[models.PermissionView]> {
		return this.authenticatedRequest(`/api/servers/${id}/user/${email}`);
	}

	async editServerUser(id: string, email: string, data: models.PermissionView): Promise<models.Empty> {
		return this.authenticatedRequest(`/api/servers/${id}/user/${email}`, "PUT", data);
	}
	async removeServerUser(id: string, email: string): Promise<models.Empty> {
		return this.authenticatedRequest(`/api/servers/${id}/user/${email}`, "DELETE");
	}

	async getOAuth2Clients(id: string): Promise<[models.Client]> {
		return this.authenticatedRequest(`/api/servers/${id}/oauth2`);
	}

	async createOAuth2Clients(id: string, data: models.Client): Promise<models.CreatedClient> {
		return this.authenticatedRequest(`/api/servers/${id}/oauth2`, "POST", data);
	}

	async deleteOAuth2Client(id: string, clientId: string): Promise<models.Empty> {
		return this.authenticatedRequest(`/api/servers/${id}/oauth2/${clientId}`, "DELETE");
	}
	
	//#endregion
	
	//#region USERS ------------ web/api/users.go
	async searchUsers(): Promise<models.UserSearchResponse> {
		return this.authenticatedRequest(`/api/users`);
	}

	async createUser(data: models.UserView): Promise<models.UserView> {
		return this.authenticatedRequest(`/api/users`, "POST", data);
	}
	
	async getUser(id: string): Promise<models.UserView> {
		return this.authenticatedRequest(`/api/users/${id}`);
	}

	async updateUser(id: string, data: models.UserView) {
		return this.authenticatedRequest(`/api/users/${id}`, "POST", data);
	}

	async deleteUser(id: string): Promise<models.Empty> {
		return this.authenticatedRequest(`/api/users/${id}`, "DELETE");
	}
	
	async getUserPerms(id: string): Promise<models.PermissionView> {
		return this.authenticatedRequest(`/api/users/${id}/perms`);
	}

	async setUserPerms(id: string, data: models.PermissionView): Promise<models.Empty> {
		return this.authenticatedRequest(`/api/users/${id}/perms`, "PUT", data);
	}
	//#endregion
	
	//#region TEMPLATES -------- web/api/templates.go
	async getAllTemplates(): Promise<[models.Template]> {
		return this.authenticatedRequest(`/api/templates`);
	}

	async getImportableTemplates(): Promise<[string]> {
		return this.authenticatedRequest(`/api/templates/import`, "POST");
	} 

	async importTemplate(name: string): Promise<models.Empty> {
		return this.authenticatedRequest(`/api/templates/import/${name}`, "POST")
	}

	async getTemplate(name: string): Promise<models.Server> {
		return this.authenticatedRequest(`/api/templates/${name}`)
	}

	async deleteTemplate(name: string): Promise<models.Empty> {
		return this.authenticatedRequest(`/api/templates/${name}`, "DELETE");
	}

	async putTemplate(name: string, data: models.Server) {
		return this.authenticatedRequest(`/api/templates/${name}`, "PUT", data);
	}
	//#endregion
	
	//#region SELF ------------- web/api/self.go
	async getSelf(): Promise<models.UserView> {
		return this.authenticatedRequest(`/api/self`);
	}
	
	async updateSelf(data: models.User):  Promise<models.Empty>{
		return this.authenticatedRequest(`/api/self`, "PUT", data);
	}

	async getOtpStatus():  Promise<boolean>{
		return this.authenticatedRequest(`/api/self/otp`);
	}

	async startOtpEnroll():  Promise<boolean>{
		return this.authenticatedRequest(`/api/self/otp`, "POST");
	}

	async validateOtpEnroll(token: models.ValidateOtpRequest):  Promise<boolean>{
		return this.authenticatedRequest(`/api/self/otp`, "PUT", token);
	}

	async disableOtp(token: string):  Promise<boolean>{
		return this.authenticatedRequest(`/api/self/otp/${token}`, "DELETE");
	}

	async getPersonalOAuth2Clients(): Promise<models.Client[]> {
		return this.authenticatedRequest(`/api/self/oauth2`);
	}

	async createPersonalOAuth2Client(client: models.Client): Promise<models.CreatedClient> {
		return this.authenticatedRequest(`/api/self/oauth2`, "POST", client);
	}

	async deletePersonalOAuth2Client(id: string): Promise<models.Empty> {
		return this.authenticatedRequest(`/api/self/oauth2/${id}`, "DELETE");
	}

	//#endregion
	
	//#region SETTINGS --------- web/api/settings.go
	async getSetting(key: string): Promise<models.SettingResponse> {
		return this.authenticatedRequest(`/api/settings/${key}`);
	}

	async setSetting(key: string, setting: models.ChangeSetting): Promise<models.Empty> {
		return this.authenticatedRequest(`/api/settings/${key}`, "PUT", setting);
	}
	//#endregion

	//#region User Settings ---- web/api/usersettings.go
	async getUserSettings(): Promise<[models.UserSettingView]> {
		return this.authenticatedRequest(`/api/userSettings`);
	}

	async setUserSetting(key: string, set: models.ChangeUserSetting) {
		return this.authenticatedRequest(`/api/userSettings/${key}`, "PUT", set)
	}
	//#endregion

	//#region Daemon ----------- web/daemon/root.go
	async getDaemonStatus() {
		return this.authenticatedRequest(`/daemon`);
	}
	//#endregion
	
	//#region Daemon Server ---- web/daemon/server.go //TODO: editServerData, putFile, archive, extract
	async getServerAdmin(id: string) {
		return this.authenticatedRequest(`/daemon/server/${id}`);
	}

	async editServerAdmin(id: string, data: models.Server) {
		return this.authenticatedRequest(`/daemon/server/${id}`, "POST", data);
	}

	async getServerData(id: string) {
		return this.authenticatedRequest(`/daemon/server/${id}/data`);
	}

	/** @deprecated not yet implemented */
	async editServerData(id: string, data: any) {
		return new Promise((_resolve, reject) => reject("Unimplemented function"));
	} //TODO: implement

	async reloadServer(id: string): Promise<models.Empty> {
		return this.authenticatedRequest(`/daemon/server/${id}/reload`, "POST");
	}

	async startServer(id: string, wait: boolean): Promise<models.Empty> {
		return this.authenticatedRequest(`/daemon/server/${id}/start?wait=${wait}`, "POST");
	}

	async stopServer(id: string, wait: boolean): Promise<models.Empty> {
		return this.authenticatedRequest(`/daemon/server/${id}/stop?wait=${wait}`, "POST");
	}

	async killServer(id: string): Promise<models.Empty> {
		return this.authenticatedRequest(`/daemon/server/${id}/kill`, "POST");
	}

	async installServer(id: string, wait: boolean): Promise<models.Empty> {
		return this.authenticatedRequest(`/daemon/server/${id}/install?wait=${wait}`, "POST");
	}

	async getFile(id: string, filename: string = ""): Promise<models.FileList | string> {
		return this.authenticatedRequest(`/daemon/server/${id}/file/${filename}`, "GET");
	}
	/** @deprecated not yet implemented */
	async putFile(id: string, filename: string, isFolder: boolean = false, file?: unknown) {
		return new Promise((_resolve, reject) => reject("Unimplemented function"));
		return this.authenticatedRequest(`/daemon/server/${id}/file/${filename}?folder=${isFolder}`, "PUT");
	} //TODO: implement

	async deleteFile(id: string, filename: string = "") {
		return this.authenticatedRequest(`/daemon/server/${id}/file/${filename}`, "DELETE");
	}

	async getServerLogs(id: string): Promise<models.ServerLogs> {
		return this.authenticatedRequest(`/daemon/server/${id}/console`);
	}

	async postConsole(id: string, commands: string): Promise<models.Empty> {
		return this.authenticatedRequest(`/daemon/server/${id}/console`, "POST", commands);
	}

	async getStats(id: string) {
		return this.authenticatedRequest(`/daemon/server/${id}/stats`);
	}
	
	async getStatus(id: string) {
		return this.authenticatedRequest(`/daemon/server/${id}/status`);
	}

	/** @deprecated not yet implemented */
	async archive() {
		return new Promise((_resolve, reject) => reject("Unimplemented function"));
	} //TODO: implement
	/** @deprecated not yet implemented */
	async extract() {
		return new Promise((_resolve, reject) => reject("Unimplemented function"));
	} //TODO: implement
	//#endregion
	
	//#region Daemon Websocket - web/daemon/websocket.go
	
	//#endregion
}