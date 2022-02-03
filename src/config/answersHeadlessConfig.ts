import { AnswersHeadlessProvider } from '@yext/answers-headless-react';

type HeadlessProviderProps = Parameters<typeof AnswersHeadlessProvider>[0];

export const answersHeadlessConfig: HeadlessProviderProps = {
  apiKey: '06812f79aa06d16a1c6b83d76b5b4350',
  experienceKey: 'national-parks',
  locale: 'en',
  sessionTrackingEnabled: true
};