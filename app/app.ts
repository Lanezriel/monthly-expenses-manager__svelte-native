/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first page.
*/

import { registerNativeViewElement } from 'svelte-native/dom'
import { svelteNativeNoFrame } from 'svelte-native'
import App from './App.svelte'

registerNativeViewElement("bottomNavigation", () => require("@nativescript-community/ui-material-bottom-navigation").BottomNavigation);
registerNativeViewElement("tabContentItem", () => require("@nativescript-community/ui-material-bottom-navigation").TabContentItem);
registerNativeViewElement("tabStrip", () => require("@nativescript-community/ui-material-bottom-navigation").TabStrip);
registerNativeViewElement("tabStripItem", () => require("@nativescript-community/ui-material-bottom-navigation").TabStripItem);

svelteNativeNoFrame(App, {})
