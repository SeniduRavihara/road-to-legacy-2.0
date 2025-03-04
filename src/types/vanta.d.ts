declare module "vanta/dist/vanta.net.min" {
  export interface VantaEffect {
    destroy: () => void;
    setOptions: (options: Record<string, unknown>) => void;
  }

  export default function NET(options: {
    el: HTMLElement;
    color?: number;
    backgroundColor?: number;
  }): VantaEffect;
}
