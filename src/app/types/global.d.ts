declare module '*.css' {
  const styles: {
    [key: string]: string
  }
  export default styles
}

declare module '*.scss' {
  const styles: {
    [key: string]: string
  }
  export default styles
}

declare module '*.sass' {
  const styles: {
    [key: string]: string
  }
  export default styles
}
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.webp'
declare module '*.avif'

declare module '*.svg' {
  import type React from 'react'
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>
  export default SVG
}

declare const __IS_DEV__: boolean
