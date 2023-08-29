import React, { useCallback, useEffect, useRef } from "react";
import { ConsentBanner, ConsentProvider } from "react-hook-consent";
import 'react-hook-consent/dist/styles/style.css';
const dayjs = require('dayjs')
const timezone = require('dayjs/plugin/timezone')
import { EUROPE_TIMEZONES } from "../constants/EuropeTimezones";

export const ConsentHandler = () => {
  const isConsentRequired = useCallback(
    () => {
      dayjs.extend(timezone);

      return EUROPE_TIMEZONES.includes(dayjs.tz.guess());
    },
    []
  )

  const consentRequiredRef = useRef(isConsentRequired());

  const enableCookies = useCallback(
    () => {
      (adsbygoogle=window.adsbygoogle||[]).pauseAdRequests=0;
    },
    []
  )

  useEffect(() => {
    window.enableCookies = enableCookies

    if (!consentRequiredRef.current) {
      // enableCookies()
    }
  }, [enableCookies]);

  // if (!consentRequiredRef.current) {
  if (true) {
    return null;
  }

  return (
      <ConsentProvider
        options={{
          services: [
            {
              id: 'analytics_and_ads',
              name: 'Analytics & Ads',
              scripts: [
                { id: 'enable-cookies', code: 'window.enableCookies()' },
              ],
              cookies: [],
              mandatory: false,
            },
          ],
          theme: 'light',
        }}
      >
        <ConsentBanner
          settings={{ hidden: false, label: 'More', modal: { title: 'Cookie settings' } }}
          decline={{ hidden: true }}
          approve={{ label: 'Accept' }}
        >
          obfuscator.io uses cookies according to the <a href="/docs/cookie-policy.docx">cookie policy</a>
        </ConsentBanner>
      </ConsentProvider>
    );
}
