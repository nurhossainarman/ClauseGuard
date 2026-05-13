-- Seed concerns table with 20 concerns

INSERT INTO "Concern" (name, description, keywords, category, severity) VALUES
('Data sharing with third parties', 'We share your data with advertisers, partners, service providers', '["share","third parties","advertisers","partners","service providers"]', 'Data Sharing & Third Parties', 'high'),
('Behavioral tracking for ads', 'We track your activity to show personalized ads', '["track","behavioral","personalized ads","activity","profiled"]', 'Data Sharing & Third Parties', 'high'),
('Data sold to brokers/marketers', 'We may sell or license your data to third parties', '["sell","data brokers","marketers","license","data sold"]', 'Data Sharing & Third Parties', 'critical'),
('Cross-border data transfers', 'Your data may be transferred to servers outside [country]', '["cross-border","transferred","outside","international","servers"]', 'Data Sharing & Third Parties', 'medium'),
('Long data retention', 'We retain your data indefinitely / for 5+ years after deletion', '["retain","retention","indefinitely","years after deletion","persistent"]', 'Data Retention & Deletion', 'high'),
('Data not deleted on account closure', 'Deleting account doesn''t delete your personal data', '["deletion","account closure","doesn''t delete","remains","preserved"]', 'Data Retention & Deletion', 'high'),
('Device fingerprinting', 'We may identify you via device/browser fingerprinting even without cookies', '["fingerprinting","device fingerprint","browser fingerprint","identify"]', 'Data Retention & Deletion', 'medium'),
('Weak security language', 'We use industry-standard security (vague, non-binding)', '["industry-standard security","security measures","security practices","vague"]', 'Security & Breaches', 'medium'),
('Delayed breach notification', 'We will notify you ''as soon as possible'' (undefined)', '["breach notification","as soon as possible","notify","delayed"]', 'Security & Breaches', 'high'),
('Unilateral terms changes', 'We may change these terms at any time without notice', '["change","terms change","without notice","unilateral","modify"]', 'Terms & Policy Changes', 'high'),
('Location tracking', 'We collect and store your precise location data', '["location","GPS","geolocation","location data","precise location"]', 'Biometric & Location Data', 'high'),
('Biometric data collection', 'We may collect facial recognition, fingerprint, voice data', '["biometric","facial recognition","fingerprint","voice","iris scan"]', 'Biometric & Location Data', 'critical'),
('Hard to opt-out of marketing', 'Unsubscribe buried in footer / requires login to manage preferences', '["unsubscribe","opt-out","marketing emails","preferences","manage"]', 'Marketing & Opt-Out', 'medium'),
('Tracking cookies default ON', 'Essential + tracking cookies enabled by default', '["cookies","tracking cookies","default","enabled","tracking"]', 'Marketing & Opt-Out', 'medium'),
('User content ownership unclear', 'We own all content you upload / can use it forever', '["own content","content ownership","upload","use forever","property"]', 'Content & Ownership', 'high'),
('Data used for AI/ML training', 'We use your data to train AI models and algorithms', '["AI","machine learning","training","algorithms","models"]', 'Content & Ownership', 'high'),
('Automatic subscription renewal', 'Your subscription will auto-renew unless you cancel', '["auto-renew","automatic renewal","subscription","unless you cancel"]', 'Financial & Billing', 'medium'),
('Hidden fees/charges', 'Additional charges may apply / subject to change', '["hidden fees","charges","additional","subject to change","fees"]', 'Financial & Billing', 'medium'),
('Service termination at will', 'We may terminate your account at any time for any reason', '["terminate","termination","account closure","ban","suspended"]', 'Legal & Disputes', 'high'),
('Forced arbitration clause', 'Any disputes must go to arbitration, no right to lawsuit', '["arbitration","disputes","arbitrate","no lawsuit","binding"]', 'Legal & Disputes', 'critical');
