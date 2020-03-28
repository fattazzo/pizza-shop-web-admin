export enum Theme {

  LUNA_AMBER = 'luna-amber',
  LUNA_BLUE = 'luna-blue',
  LUNA_GREEN = 'luna-green',
  LUNA_PINK = 'luna-pink',
  NOVA_COLORED = 'nova-colored',
  NOVA_DARK = 'nova-dark',
  NOVA_LIGHT = 'nova-light',
  RHEA = 'rhea'
}

export namespace Theme {

  export function getByValue(enumValue: string): Theme {
    let keys = Object.keys(Theme).filter(x => Theme[x] == enumValue);
    return keys.length > 0 ? Theme[keys[0]] : null;
  }
}
