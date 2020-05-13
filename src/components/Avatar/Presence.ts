export enum Presences {
  online = 'online',
  busy = 'busy',
  away = 'away',
  offline = 'offline',
}

export type Presence = keyof typeof Presences;
