import React, { memo } from 'react';

import cn from 'classnames';

import styles from './Picture.module.scss';

interface PictureProps {
  alt?: string;
  src: string;
  webpSrc?: string;
  avifSrc?: string;
  className?: string;
  props?: any;
}

const Picture = memo(
  ({
    alt = 'image alt',
    src,
    webpSrc,
    avifSrc,
    className,
    ...props
  }: PictureProps) => (
    <picture className={cn(styles.wrapper, className)}>
      {avifSrc && <source srcSet={avifSrc} type="image/avif" />}
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      <img src={src} alt={alt} {...props} />
    </picture>
  )
);

Picture.displayName = 'Picture';

export default Picture;
