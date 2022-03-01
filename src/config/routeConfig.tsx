import UniversalSearchPage from '../pages/UniversalSearchPage';
import FAQsPage from '../pages/FAQsPage';
import EventsPage from '../pages/EventsPage';
import { universalResultsConfig } from './universalResultsConfig';
import JobsPage from '../pages/JobsPage';
import LocationsPage from '../pages/LocationsPage';
import ParksPage from '../pages/ParksPage';
import HomePage from '../pages/HomePage';

export const routeConfig = [
  {
    path: '/',
    exact: true,
    page: <ParksPage verticalKey='locations' />

  },
  {
    path: '/homepage',
    page: <HomePage />
  }
  // ,
  // {
  //   path: '/faqs',
  //   page: <FAQsPage verticalKey='faqs'/>
  // },
  // {
  //   path: '/events',
  //   page: <EventsPage verticalKey='events'/>
  // },
  // {
  //   path: '/locations',
  //   page: <LocationsPage verticalKey='locations' />
  // },
  // {
  //   path: '/jobs',
  //   page: <JobsPage verticalKey='jobs' />
  // }
];