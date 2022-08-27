import React, { memo } from 'react';

const CreateLink = memo(() => {
  console.log('create');
  return (
    <div>
      Create
      <h1>asd</h1>
    </div>
  );
});

CreateLink.displayName = 'CreateLink';

export default CreateLink;
