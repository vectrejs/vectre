declare enum Navigation {
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
declare enum Action {
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
declare enum Objects {
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
    hResize: Action.hResize;
    vResize: Action.vResize;
    plus: Action.plus;
    minus: Action.minus;
    cross: Action.cross;
    check: Action.check;
    stop: Action.stop;
    shutdown: Action.shutdown;
    refresh: Action.refresh;
    search: Action.search;
    flag: Action.flag;
    bookmark: Action.bookmark;
    edit: Action.edit;
    delete: Action.delete;
    share: Action.share;
    download: Action.download;
    upload: Action.upload;
    mail: Objects.mail;
    people: Objects.people;
    message: Objects.message;
    photo: Objects.photo;
    time: Objects.time;
    location: Objects.location;
    link: Objects.link;
    emoji: Objects.emoji;
    up: Navigation.up;
    down: Navigation.down;
    right: Navigation.right;
    left: Navigation.left;
    upward: Navigation.upward;
    forward: Navigation.forward;
    downward: Navigation.downward;
    back: Navigation.back;
    caret: Navigation.caret;
    menu: Navigation.menu;
    apps: Navigation.apps;
    hMore: Navigation.hMore;
    vMore: Navigation.vMore;
};
export declare type Type = keyof typeof Icons;
export { Navigation, Action, Objects, Icons };
