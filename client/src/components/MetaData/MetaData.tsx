import React, { memo } from 'react';

import { Helmet } from 'react-helmet-async';

interface MetaDataProps {
  title: string;
  description: string;
  image?: string;
  canonicalUrl?: string;
}

const MetaData = memo(
  ({ title, description, image, canonicalUrl }: MetaDataProps) => (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {image && <meta property="og:image" itemProp="image" content={image} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Helmet>
  )
);

MetaData.displayName = 'MetaData';

export default MetaData;
