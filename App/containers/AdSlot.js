import React, { useEffect } from "react";

export const AdComponent  = ({client, slot}) => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

    return (
      <ins className='adsbygoogle'
       style={{ display: 'block' }}
       data-ad-client={client}
       data-ad-slot={slot}
       data-ad-format='auto' />
    )
}
