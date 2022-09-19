import React from 'react';

import cn from 'classnames';

import styles from './LinksRow.module.scss';

const LinksRow = ({ link, heading }: any) => {
  console.log(link, 'link');

  if (heading) {
    return (
      <li className={cn(styles['row'], styles['heading'])}>
        <div className={styles['item']}>From</div>
        <div className={styles['item']}>To</div>
        <div className={styles['item']}>Code</div>
        <div className={cn(styles['item'], styles['actions'])}></div>
      </li>
    );
  }

  return (
    <li className={styles['row']}>
      <div className={cn(styles['item'], styles['link'])}>
        <a
          href={link.from}
          title={link.from}
          target={'_blank'}
          rel="noreferrer">
          {link.from}
        </a>
      </div>
      <div className={cn(styles['item'], styles['link'])}>
        <a href={link.to} title={link.to} target={'_blank'} rel="noreferrer">
          {link.to}
        </a>
      </div>
      <div className={styles['item']}>{link.code}</div>
      <div className={cn(styles['item'], styles['actions'])}>delete</div>
    </li>
  );
};

export default LinksRow;
