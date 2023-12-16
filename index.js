const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Add preload script
            nodeIntegration: false, // Disable nodeIntegration
            contextIsolation: true, // Enable contextIsolation
            enableRemoteModule: false // Disable enableRemoteModule
        }
    });

    mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);
