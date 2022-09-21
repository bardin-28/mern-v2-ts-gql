import React from 'react';

import { InView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

import CustomButton from 'components/CustomButton';
import LinksRow from 'components/LinksTable/Row/LinksRow';
import { ROUTES } from 'constants/constants';

import styles from './LinksTable.module.scss';

const LinksTable = ({ links, update, fetchMore, loading }: any) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles['scroll-wrapper']}>
        <ul className={styles.wrapper}>
          <LinksRow heading update={update} />
          {links?.map((item, index) => (
            <LinksRow key={index} link={item} />
          ))}
          {!loading && links?.length !== 0 && (
            <InView
              onChange={async (inView) => {
                const currentLength = links?.length || 0;
                if (inView) {
                  await fetchMore({
                    variables: {
                      offset: currentLength,
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev;
                      return {
                        ...prev,
                        getUserLinks: [
                          ...prev.getUserLinks,
                          ...fetchMoreResult.getUserLinks,
                        ],
                      };
                    },
                  });
                }
              }}
            />
          )}
          {links?.length === 0 && (
            <div className={styles['clear']}>
              You don't have links. <br />
              <CustomButton
                type={'button'}
                text={'Create link'}
                onClick={() => navigate(ROUTES.CREATE)}
              />
            </div>
          )}
        </ul>
      </div>
    </>
  );
};

export default LinksTable;
