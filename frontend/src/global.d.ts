declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}

interface Window {
  ym: (
    counterId: number | string,
    methodName: string,
    eventName?: string | object,
    params?: object
  ) => void;
}
