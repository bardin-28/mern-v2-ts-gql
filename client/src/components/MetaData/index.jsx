import React from 'react';

import { Helmet } from 'react-helmet-async';

const MetaData = ({ title, description, image, canonicalUrl }) => (
  <Helmet>
    <title>{title ? title : ''}</title>
    <meta name="description" content={description ? description : ''} />
    {image && <meta property="og:image" itemProp="image" content={image} />}
    {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
  </Helmet>
);

export default MetaData;
