export enum ACTION {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
  Export = 'export',
  Import = 'import',
}


export enum ROLE {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum JobStatus {
  OPEN = 'OPEN',
  RUNNING = 'RUNNING',
  PENDING = 'PENDING',
  STOP = 'STOP',
  REOPEN = 'REOPEN'
}

export const TOOL_AIRDROP = {
  TOOL_OKX: 'TOOL_OKX',
  TOOL_MOON_BIX: 'TOOL_MOON_BIX'
}

export const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/