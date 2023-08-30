import React, { useEffect, useRef } from "react";

export const CarbonAd = () => {
  const targetRef = useRef(null)

  useEffect(() => {
    if (!targetRef.current) {
      return
    }

    const script = document.createElement("script");

    script.id = '_carbonads_js'
    script.src = '//cdn.carbonads.com/carbon.js?serve=CWYDL237&placement=obfuscatorio\" id=\"_carbonads_js';
    script.async = true;

    targetRef.current.appendChild(script);
  }, [targetRef.current]);

  return (
    <div ref={targetRef} style={{ width: '100%', marginTop: '8px', marginBottom: '8px' }} />
  )
}