import { SettingItem, SettingTab } from '@typora-community-plugin/core';
import type MdPaddingPlugin from 'src/main';
import { R } from './i18n';

export const DEFAULT_SETTINGS: PluginOptions = {
  noticeTimeOut: 2000,
  repoPath: 'D:\\note',
  commitInfo: 'save: %date:~0,10% %time:~0,8%',
};

export interface PluginOptions {
  noticeTimeOut: number;
  repoPath: string;
  commitInfo: string;
}

type Option = 'noticeTimeOut' | 'repoPath' | 'commitInfo';

export class PluginSettingTab extends SettingTab {
  private isInit: boolean = false;

  get name(): string {
    return 'Git Push';
  }

  constructor(private plugin: MdPaddingPlugin) {
    super();
  }

  show(): void {
    if (!this.isInit) {
      this.addPluginOption('noticeTimeOut');
      this.addPluginOption('repoPath');
      this.addPluginOption('commitInfo');
      this.isInit = true;
    }
    super.show();
  }

  private addPluginOption(option: Option): void {
    this.addSetting((setting: SettingItem) => {
      setting.addName(option);
      setting.addText((input: HTMLInputElement) => {
        const optionValue: number | string = this.plugin.settings.get(option);
        if (option === 'noticeTimeOut') {
          setting.addDescription(R.noticeTimeOut);
          this.addNumberSetting(input, optionValue, option);
        } else if (option === 'repoPath') {
          setting.addDescription(R.repoPath);
          input.placeholder = DEFAULT_SETTINGS.repoPath;
          this.addStringSetting(input, optionValue, option);
        } else if (option === 'commitInfo') {
          setting.addDescription(R.commitInfo);
          input.placeholder = DEFAULT_SETTINGS.commitInfo;
          this.addStringSetting(input, optionValue, option);
        }
      });
    });
  }

  private addNumberSetting(input: HTMLInputElement, optionValue: any, option: Option) {
    input.type = 'number';
    input.value = String(optionValue as number);
    input.oninput = () => this.plugin.settings.set(option, Number(input.value));
  }

  private addStringSetting(input: HTMLInputElement, optionValue: any, option: Option) {
    input.type = 'text';
    input.value = optionValue as string;
    input.oninput = () => this.plugin.settings.set(option, input.value);
  }
}
