declare enum IconNavigation {
    up = "icon-arrow-up",
    down = "icon-arrow-down",
    right = "icon-arrow-right",
    left = "icon-arrow-left",
    upward = "icon-upward",
    forward = "icon-forward",
    downward = "icon-downward",
    back = "icon-back",
    caret = "icon-caret",
    menu = "icon-menu",
    apps = "icon-apps",
    hMore = "icon-more-horiz",
    vMore = "icon-more-vert"
}
declare enum IconAction {
    hResize = "icon-resize-horiz",
    vResize = "icon-resize-vert",
    plus = "icon-plus",
    minus = "icon-minus",
    cross = "icon-cross",
    check = "icon-check",
    stop = "icon-stop",
    shutdown = "icon-shutdown",
    refresh = "icon-refresh",
    search = "icon-search",
    flag = "icon-flag",
    bookmark = "icon-bookmark",
    edit = "icon-edit",
    delete = "icon-delete",
    share = "icon-share",
    download = "icon-download",
    upload = "icon-upload"
}
declare enum IconObject {
    mail = "icon-mail",
    people = "icon-people",
    message = "icon-message",
    photo = "icon-photo",
    time = "icon-time",
    location = "icon-location",
    link = "icon-link",
    emoji = "icon-emoji"
}
declare const Icons: {
    hResize: IconAction.hResize;
    vResize: IconAction.vResize;
    plus: IconAction.plus;
    minus: IconAction.minus;
    cross: IconAction.cross;
    check: IconAction.check;
    stop: IconAction.stop;
    shutdown: IconAction.shutdown;
    refresh: IconAction.refresh;
    search: IconAction.search;
    flag: IconAction.flag;
    bookmark: IconAction.bookmark;
    edit: IconAction.edit;
    delete: IconAction.delete;
    share: IconAction.share;
    download: IconAction.download;
    upload: IconAction.upload;
    mail: IconObject.mail;
    people: IconObject.people;
    message: IconObject.message;
    photo: IconObject.photo;
    time: IconObject.time;
    location: IconObject.location;
    link: IconObject.link;
    emoji: IconObject.emoji;
    up: IconNavigation.up;
    down: IconNavigation.down;
    right: IconNavigation.right;
    left: IconNavigation.left;
    upward: IconNavigation.upward;
    forward: IconNavigation.forward;
    downward: IconNavigation.downward;
    back: IconNavigation.back;
    caret: IconNavigation.caret;
    menu: IconNavigation.menu;
    apps: IconNavigation.apps;
    hMore: IconNavigation.hMore;
    vMore: IconNavigation.vMore;
};
export declare type IconType = keyof typeof Icons;
export { IconNavigation, IconAction, IconObject, Icons };
