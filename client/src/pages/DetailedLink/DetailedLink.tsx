import React, { memo } from 'react';

const DetailedLink = memo(() => {
  console.info('detailed');
  return (
    <div>
      <h1>Detailed</h1>
      <h1>page</h1>
    </div>
  );
});

DetailedLink.displayName = 'DetailedLink';

export default DetailedLink;
