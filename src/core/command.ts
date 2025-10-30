import { Component, Notice } from '@typora-community-plugin/core';
import { File, getMarkdown } from 'typora';
import type GitPushPlugin from 'src/main';
import { R } from './i18n';
import { exec, execSync } from 'child_process';

export class PluginCommand extends Component {

  constructor(private plugin: GitPushPlugin) {
    super();
  }

  onload(): void {
    this.plugin.registerCommand({
      id: 'git-push',
      title: R.commandTitle,
      scope: 'editor',
      hotkey: 'Ctrl+Alt+p',
      callback: () => this.onCommandCallback(),
    });
  }

  private async onCommandCallback(): Promise<void> {
    let timeOut = this.plugin.settings.get('noticeTimeOut');
    try {
      let n1 = new Notice(R.commandMessage, 0);
      n1.show();
      let info = execSync('echo ' + this.plugin.settings.get('commitInfo')).toString().trim();
      let cd = 'cd /d ' + this.plugin.settings.get('repoPath')
      exec(`${cd} && git add . && git commit -m "${info}"`, (error: any, stdout: any, stderr: any) => {
        let m2 = 'commit: ' + (stdout.includes('nothing to commit') ? 'nothing to commit' : stdout.split('\n').slice(-2)[0].trim());
        let n2 = new Notice(m2, 0);
        n2.show();

        exec(`${cd} && git pull`, (error: any, stdout: any, stderr: any) => {
          let m3 = 'pull: ' + (stdout.includes('Already up to date') ? 'Already up to date' : stdout.split('\n').slice(-2)[0].trim());
          let n3 = new Notice(m3, 0);
          n3.show();

          exec(`${cd} && git push`, (error: any, stdout: any, stderr: any) => {
            let m4 = 'push: ' + (stderr.includes('Everything up-to-date') ? 'Everything up-to-date' : stderr.split('\n').slice(-2)[0].trim());
            let n4 = new Notice(m4, 0);
            n4.show();

            let n5 = new Notice(R.commandFinish, 0);
            n5.show();

            setTimeout(() => { n1.close(); n2.close(); n3.close(); n4.close(); n5.close(); }, timeOut);
          });
        });
      });
    } catch (e) {
      console.error(e);
      new Notice(String(e), timeOut).show();
    }
  }
}
