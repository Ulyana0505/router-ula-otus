export type RouteStruct = {
  path: RoutePath;
  onEnter?: (p: RouteParam) => Promise<void>;
  onLeave?: (p: RouteParam) => Promise<void>;
  onBeforeEnter?: (p: RouteParam) => Promise<void>;
};

export type RoutePath = string | RegExp | ((path: string) => boolean);
export type RouteParam = { current: string; prev: string };

export type RouterStruct = {
  getRoutes(): RouteStruct[];
  on(path: RoutePath, onEnter: (p: RouteParam) => Promise<void>): void;
  add(data: RouteStruct): void;
  remove(data: RouteStruct): void;
  go(url: string): void;
};
