declare module '*.JPG' {
  const src: import('next/dist/shared/lib/get-img-props').StaticImport;
  export default src;
}

declare module '*.PNG' {
  const src: import('next/dist/shared/lib/get-img-props').StaticImport;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

