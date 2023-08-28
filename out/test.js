var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import PufferPanelClient from "./index.js";
import testKeys from "./testKeys.js";
import readline from "readline";
let client = new PufferPanelClient(testKeys.host, testKeys.id, testKeys.secret);
const lineRead = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
client.on("READY", () => __awaiter(void 0, void 0, void 0, function* () {
    //#region Nodes
    /*
    asyncDir(client.getAllNodes(), 'nodes').then(nodes => {
        asyncDir(client.getNode(nodes[0].id), 'node 0');
        asyncDir(client.deployNode(nodes[0].id), 'node 0 deploy data');
    });

    asyncDir(client.createNode({
        publicPort: 8080,
        privatePort: 8080,
        sftpPort: 5657,
        name: "Test_node",
        publicHost: "test.node",
        privateHost: "test.node"
    }), "create node").then(() => {
        asyncDir(client.updateNode('2', {
            publicPort: 8080,
            privatePort: 8080,
            sftpPort: 5657,
            name: "Test_node_edited",
            publicHost: "test.node.edited",
            privateHost: "test.node.edited"
        }), "edit node").then(() => {
            asyncDir(client.deleteNode('2'), "delete node").catch(()=>{});
        });
    });
    //#endregion */
    //#region servers
    /*
    asyncDir(client.searchServers(), 'servers');
    let serverID = "ba775bde";
    asyncDir(client.getServer(serverID), 'server');
    asyncDir(client.getServerData(serverID), 'server data');
    asyncDir(client.getOAuth2Clients(serverID), 'server OAuth clients');
    let users = await asyncDir(client.getServerUsers(serverID), 'original server users');
    users[0].viewServerStats = true
    await asyncDir(client.editServerUser(serverID, users[0].email, users[0]), 'edit server users');
    asyncDir(client.removeServerUser(serverID, users[0].email), "delete user")
    await asyncDir(client.getServerUsers(serverID), 'new server users');
    asyncDir(client.createOAuth2Clients(serverID, {name: "delete me", description: "a testing client"}), "create server oauth").then((OAuthClient) => {
        asyncDir(client.deleteOAuth2Client(serverID, OAuthClient.id), "delete client")
    });

    asyncDir(client.deleteServer("b8adb597"), "Delete Server");
    asyncDir(client.renameServer("a284d65c", "I have been renamed"), "rename server")
    //#endregion */
    //#region users 
    /*
    asyncDir(client.searchUsers(), 'users')
    let testuser = await asyncDir(client.createUser({
        email: "new@user.email",
        username: "testUser",
        password: "testUser"
    }), "Create user")
    asyncDir(client.getUser(testuser.id), 'get testuser');
    asyncDir(client.getUserPerms(testuser.id), 'get testuser perms');
    asyncDir(client.updateUser(testuser.id, {username: "editedTestUser"}), "edit test user")
    asyncDir(client.deleteUser(testuser.id), "delete user")
    //#endregion */
    //#region templates
    /*
    asyncDir(client.getAllTemplates(), 'templates');
    asyncDir(client.getImportableTemplates(), 'get importable templates');
    await asyncDir(client.importTemplate("tf2"), "import template");
    await asyncDir(client.getTemplate("tf2"), "get template");
    await asyncDir(client.putTemplate("tf2", {display: "TF3"}), "put template");
    asyncDir(client.deleteTemplate("tf2"), "delete template")
    //#endregion */
    //#region Self
    /*
    asyncDir(client.getSelf(), 'self');
    asyncDir(client.getOtpStatus(), "otp status")
    await asyncDir(client.startOtpEnroll(), "otp enroll")
    asyncDir(client.validateOtpEnroll({token: "448131"}), "otp validate")
    asyncDir(client.disableOtp("024745"), "otp disable")
    await asyncDir(client.getPersonalOAuth2Clients(), 'self OAuth clients');
    let newOAuth2Client = await asyncDir(client.createPersonalOAuth2Client({description: "", name: "node.testing"}), "create OAuth")
    await asyncDir(client.getPersonalOAuth2Clients(), 'self OAuth clients');
    await asyncDir(client.deletePersonalOAuth2Client(newOAuth2Client.id), "Delete OAuth Client");
    await asyncDir(client.getPersonalOAuth2Clients(), 'self OAuth clients');
    //#endregion */
    //#region Settings
    /*
    let name = await asyncDir(client.getSetting("panel.settings.companyname"), 'get company name');
    await asyncDir(client.setSetting("panel.settings.companyname", {value: "test"}), 'set company name');
    await asyncDir(client.getSetting("panel.settings.companyname"), 'get company name');
    await asyncDir(client.setSetting("panel.settings.companyname", {value: name.value}), 'set company name');
    //#endregion */
    //#region User Settings
    /*
    asyncDir(client.getUserSettings(), 'get user settings');
    asyncDir(client.setUserSetting("dark",{value: 'false'}), "set user setting")
    //#endregion */
    //#region Server Daemon
    /*
    let serverID = "ba775bde";
    asyncDir(client.postConsole(serverID, "hello world"), "write to console")
    asyncDir(client.getServerLogs(serverID), 'server logs');
    asyncDir(client.getServerAdmin(serverID), 'server data (admin)');
    asyncDir(client.getServerStatus(serverID), 'server status').then(status => {
        if (status.running)
            asyncDir(client.getServerStats(serverID), 'server stats');
    });
    let files = await asyncDir(client.getFile(serverID), "get files");
    asyncDir(client.getFile(serverID, "server.properties"), "get properties")
    asyncDir(client.getFile(serverID, "plugins"), "get plugins")
    asyncDir(client.putFile(serverID, "testfile", false), "put file")
    asyncDir(client.deleteFile(serverID, "testfile"), "get plugins")

    let testServer = await asyncDir(client.getServerAdmin("04e506a6"), 'server data (admin)');
    testServer.display = "edited test server"
    asyncDir(client.editServerAdmin(testServer.id, testServer), "edit server");
    asyncDir(client.reloadServer(testServer.id), "reload server from disk");
    await asyncDir(client.installServer(testServer.id, true), "install server");
    await asyncDir(client.startServer(testServer.id, true), "start server");
    await asyncDir(client.stopServer(testServer.id, true), "stop server");
    await asyncDir(client.killServer(testServer.id), "kill server");

    
    //#endregion */
    // asyncDir(client.getDaemonStatus(), "daemon status");
}));
function asyncDir(promise, label) {
    return __awaiter(this, void 0, void 0, function* () {
        promise.then(output => {
            console.log(label);
            console.dir(output);
        }).catch((err) => {
            console.log(label);
            console.error(err);
        });
        return promise.catch(() => { });
    });
}
setTimeout(() => { }, 5 * 60 * 1000); //keep alive for debugger
//# sourceMappingURL=test.js.map