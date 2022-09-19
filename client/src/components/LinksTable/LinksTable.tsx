import React from 'react';

import LinksRow from 'components/LinksTable/Row/LinksRow';

import styles from './LinksTable.module.scss';

const LinksTable = ({ links }: any) => {
  console.log(links);

  return (
    <>
      <ul className={styles.wrapper}>
        <LinksRow heading />
        {links?.map((item, index) => (
          <LinksRow key={index} link={item} />
        ))}
      </ul>
    </>
  );
};

export default LinksTable;
