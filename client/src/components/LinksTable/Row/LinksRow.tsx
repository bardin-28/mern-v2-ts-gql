import React from 'react';

import { useMutation } from '@apollo/client';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

import DELETE_LINK from '../queries/deleteLink.graphql';

import { EditIco } from 'assets/images/svg/edit';
import { TrashIco } from 'assets/images/svg/trash';
import UpdateIco from 'assets/images/svg/update';
import { ROUTES } from 'constants/constants';
import GET_USER_LINKS from 'pages/Dashboard/queries/getUserLinks.graphql';

import styles from './LinksRow.module.scss';

const LinksRow = ({ link, heading, update }: any) => {
  const navigate = useNavigate();

  const [deleteLink, { error }] = useMutation(DELETE_LINK, {
    refetchQueries: [{ query: GET_USER_LINKS }],
  });

  if (heading) {
    return (
      <li className={cn(styles['row'], styles['heading'])}>
        <div className={styles['item']}>Original</div>
        <div className={styles['item']}>Short</div>
        <div className={styles['item']}>Code</div>
        <div className={styles['item']}>Clicks</div>
        <div
          className={cn(styles['item'], styles['actions'])}
          onClick={() => update()}>
          <UpdateIco />
        </div>
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
        <div
          onClick={() => navigate(ROUTES.DETAIL.replace(':linkId', link.id))}>
          <EditIco />
        </div>
        <div onClick={() => deleteLink({ variables: { id: link.id } })}>
          <TrashIco />
        </div>
      </div>
    </li>
  );
};

export default LinksRow;
