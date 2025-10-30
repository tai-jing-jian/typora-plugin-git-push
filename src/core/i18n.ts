import { I18n } from '@typora-community-plugin/core';

export const R = new I18n({
  resources: {
    en: {
      commandTitle: 'Git push',
      commandMessage: 'Saving, please wait...',
      commandFinish: 'Save finished',
      noticeTimeOut: 'Notification timeout (ms)',
      repoPath: 'Git repository path',
      commitInfo: 'Git commit info',
    },
    'zh-cn': {
      commandTitle: 'Git 推送',
      commandMessage: '保存中，请稍等...',
      commandFinish: '保存成功',
      noticeTimeOut: '通知超时时间（ms）',
      repoPath: '仓库地址',
      commitInfo: '提交信息',
    },
  },
}).t;
