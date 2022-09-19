import React from 'react';

import { useMutation } from '@apollo/client';
import cn from 'classnames';

import DELETE_LINK from '../queries/deleteLink.graphql';

import GET_USER_LINKS from 'pages/Dashboard/queries/getUserLinks.graphql';

import styles from './LinksRow.module.scss';

const LinksRow = ({ link, heading }: any) => {
  const [deleteLink, { error }] = useMutation(DELETE_LINK, {
    refetchQueries: [{ query: GET_USER_LINKS }],
  });

  if (heading) {
    return (
      <li className={cn(styles['row'], styles['heading'])}>
        <div className={styles['item']}>From</div>
        <div className={styles['item']}>To</div>
        <div className={styles['item']}>Code</div>
        <div className={styles['item']}>Clicks</div>
        <div className={cn(styles['item'], styles['actions'])}></div>
      </li>
    );
  }

  return (
    <li className={styles['row']}>
      <div className={cn(styles['item'], styles['link'])}>
        <a
          href={link.original}
          title={link.original}
          target={'_blank'}
          rel="noreferrer">
          {link.original}
        </a>
      </div>
      <div className={cn(styles['item'], styles['link'])}>
        <a
          href={link.short}
          title={link.short}
          target={'_blank'}
          rel="noreferrer">
          {link.short}
        </a>
      </div>
      <div className={styles['item']}>{link.code}</div>
      <div className={styles['item']}>{link.clicks}</div>
      <div className={cn(styles['item'], styles['actions'])}>
        <div onClick={() => deleteLink({ variables: { id: link.id } })}>
          upd
        </div>
        <div onClick={() => deleteLink({ variables: { id: link.id } })}>
          del
        </div>
      </div>
    </li>
  );
};

export default LinksRow;
