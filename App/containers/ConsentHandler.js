import React, { useCallback, useEffect, useRef, useState } from "react";
import { ConsentBanner, ConsentProvider } from "react-hook-consent";
import 'react-hook-consent/dist/styles/style.css';
const dayjs = require('dayjs')
const timezone = require('dayjs/plugin/timezone')
import { EUROPE_TIMEZONES } from "../constants/EuropeTimezones";
import { ConsentOverlay } from "./ConsentOverlay";

const consentId = 'analytics_and_ads'

export const ConsentHandler = ({children}) => {
  const isConsentRequired = useCallback(
    () => {
      dayjs.extend(timezone);

      return EUROPE_TIMEZONES.includes(dayjs.tz.guess());
    },
    []
  )

  const consentRequiredRef = useRef(isConsentRequired());
  const [consentAccepted, setConsentAccepted] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  const acceptConsent = useCallback(
    () => {
      setConsentAccepted(true)
    },
    [setConsentAccepted]
  )

  if (!window.acceptConsent) {
    window.acceptConsent = acceptConsent
  }

  useEffect(() => {
    if (!consentRequiredRef.current) {
      acceptConsent()
    }
  }, [acceptConsent]);

  useEffect(() => {
    setIsInitialized(true)
  }, [setIsInitialized]);

  return (
    <>
      {children({consentAccepted})}

      {!!consentRequiredRef.current && (
        <ConsentProvider
          options={{
            services: [
              {
                id: consentId,
                name: 'Analytics & Ads',
                scripts: [
                  { id: 'enable-consent', code: 'window.acceptConsent()' },
                ],
                cookies: [],
                mandatory: false,
              },
            ],
            theme: 'light',
          }}
        >
          {isInitialized && !consentAccepted && (
            <ConsentOverlay />
          )}

          <ConsentBanner
            settings={{ hidden: true, label: 'More', modal: { title: 'Cookie settings' } }}
            decline={{ hidden: true }}
            approve={{ label: 'Accept' }}
          >
            obfuscator.io uses cookies according to the <a href="/docs/cookie-policy.docx">cookie policy</a>
          </ConsentBanner>
        </ConsentProvider>
      )}
    </>
  );
}
