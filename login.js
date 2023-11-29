import { makeTheme } from "./theme.js";
import { makeStateManager } from "./helpers/state.js";

//const appState = makeStateManager()
//const theme = makeTheme(appState)
function login(){
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    fetch('', {

    }).then

    return false
};