export enum AvatarPresences {
  online = 'online',
  busy = 'busy',
  away = 'away',
  offline = 'offline',
}

export type AvatarPresence = keyof typeof AvatarPresences;
