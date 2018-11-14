type Type = keyof typeof Icons;

enum Navigation {
  up = 'icon-arrow-up',
  down = 'icon-arrow-down',
  right = 'icon-arrow-right',
  left = 'icon-arrow-left',

  upward = 'icon-upward',
  forward = 'icon-forward',
  downward = 'icon-downward',
  back = 'icon-back',

  caret = 'icon-caret',
  menu = 'icon-menu',
  apps = 'icon-apps',

  hMore = 'icon-more-horiz',
  vMore = 'icon-more-vert',
}

enum Action {
  hResize = 'icon-resize-horiz',
  vResize = 'icon-resize-vert',
  plus = 'icon-plus',
  minus = 'icon-minus',
  cross = 'icon-cross',
  check = 'icon-check',
  stop = 'icon-stop',
  shutdown = 'icon-shutdown',
  refresh = 'icon-refresh',
  search = 'icon-search',
  flag = 'icon-flag',
  bookmark = 'icon-bookmark',
  edit = 'icon-edit',
  delete = 'icon-delete',
  share = 'icon-share',
  download = 'icon-download',
  upload = 'icon-upload',
}

enum Objects {
  mail = 'icon-mail',
  people = 'icon-people',
  message = 'icon-message',
  photo = 'icon-photo',
  time = 'icon-time',
  location = 'icon-location',
  link = 'icon-link',
  emoji = 'icon-emoji',
}

const Icons = { ...Navigation, ...Objects, ...Action };

export {
  Type,
  Navigation,
  Action,
  Objects,
  Icons,
};
