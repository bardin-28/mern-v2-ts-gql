declare module '*.module.scss' {
  const content: any;
  export default content;
}

declare module '*.svg?inline' {
  const content: any;
  export default content;
}

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
  const src: string;
  export default src;
}

declare module '*.graphql' {
  const content: any;
  export default content;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.webp';
