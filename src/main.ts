import { Plugin, PluginSettings } from '@typora-community-plugin/core';
import { PluginCommand } from './core/command';
import { DEFAULT_SETTINGS, PluginOptions, PluginSettingTab } from './core/setting';

export default class GitPushPlugin extends Plugin<PluginOptions> {
  onload() {
    this.registerSettings(new PluginSettings(this.app, this.manifest, { version: 1 }));
    this.settings.setDefault(DEFAULT_SETTINGS);
    this.addChild(new PluginCommand(this));
    this.registerSettingTab(new PluginSettingTab(this));
  }

  onunload() {
    // dispose resources, like events, processes...
  }
}
