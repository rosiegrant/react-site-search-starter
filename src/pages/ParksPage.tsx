import ResultsCount from '../components/ResultsCount';
import AlternativeVerticals from '../components/AlternativeVerticals';
import AppliedFilters from '../components/AppliedFilters';
import DirectAnswer from '../components/DirectAnswer';
import VerticalResults from '../components/VerticalResults';
import SpellCheck from '../components/SpellCheck';
import LocationBias from '../components/LocationBias';
import { StandardCard } from '../components/cards/StandardCard';
import usePageSetupEffect from '../hooks/usePageSetupEffect';
import FilterDisplayManager from '../components/FilterDisplayManager';
import Facets from '../components/Facets';
import FilterSearch from '../components/FilterSearch';
import StaticFilters, { Divider } from '../components/StaticFilters';
import ViewFiltersButton from '../components/ViewFiltersButton';
import { useContext } from 'react';
import { PageView, PageViewContext } from '../context/PageViewContext';
import { ParksCard } from '../components/cards/ParksCard';
import Mapbox from '../components/Mapbox';
import { useAnswersState } from '@yext/answers-headless-react';
import { Result, Direction, SortType, VerticalResults as VR } from '@yext/answers-core';

const filterSearchFields = [{
  fieldApiName: 'name',
  entityType: 'location'
},
{
  fieldApiName: 'builtin.location',
  entityType: 'location'
}
  // , {
  //   fieldApiName: 'paymentOptions',
  //   entityType: 'location'
  // }, {
  //   fieldApiName: 'services',
  //   entityType: 'location'
  // }
];

interface GeoData {
  yextDisplayCoordinate: {
    latitude: number;
    longitude: number;
  };
}

export default function LocationsPage({ verticalKey }: {
  verticalKey: string
}) {
  const { pageView } = useContext(PageViewContext);
  usePageSetupEffect(verticalKey);

  const results = useAnswersState(state => state.vertical.results) || [];
  const allResultsForVertical = useAnswersState(state => state.vertical?.noResults?.allResultsForVertical.results) || [];

  function renderMap(): JSX.Element | null {
    if (results.length === 0 && allResultsForVertical.length === 0) return null;

    const resultsToDisplay = results.length === 0
      ? allResultsForVertical
      : results

    const geoResults = resultsToDisplay.map(r => r.rawData as unknown as GeoData)

    return (
      <div className="VerticalSearch-map pb-7">
        <Mapbox
          markers={geoResults.map((r, i) => ({
            coord: [r.yextDisplayCoordinate?.longitude || 0, r.yextDisplayCoordinate?.latitude || 0],
            url: resultsToDisplay[i].link,
          }))}
        />
      </div>
    )
  }


  return (
    <div className='flex'>
      {/* <FilterDisplayManager>
        <StaticFilters filterConfig={[
          {
            options: [
              {
                fieldId: "fullyVaccinatedStaff",
                value: true,
                label: "Vaccinated"
              },
              {
                fieldId: "fullyVaccinatedStaff",
                value: false,
                label: "Not Vaccinated"
              },
            ]
            ,
            title: "Vaccination Status"
          }
        ]}
        />
        <Divider />
        <Facets
          searchOnChange={true}
          searchable={true}
          collapsible={false}
          defaultExpanded={true}
          customCssClasses={{
            container: 'md:w-80'
          }}
        />
      </FilterDisplayManager> */}
      {(pageView === PageView.Desktop || pageView === PageView.FiltersHiddenMobile) &&
        <div className='flex-grow'>
          <FilterSearch
            label=''
            sectioned={true}
            searchFields={filterSearchFields}
            customCssClasses={{
              container: 'md:w-100',
              dropdownContainer: 'w-full absolute z-10 shadow-lg rounded-md border border-gray-300 bg-white pt-3 pb-1 px-4 mt-1'
            }} />
          <DirectAnswer />
          <SpellCheck />
          <div className='flex'>
            <ResultsCount />
            {pageView === PageView.FiltersHiddenMobile &&
              <ViewFiltersButton />}
          </div>
          <AppliedFilters
            hiddenFields={['builtin.entityType']}
          />
          {/* <AlternativeVerticals
            currentVerticalLabel='Locations'
            verticalsConfig={[
              { label: 'FAQs', verticalKey: 'faqs' },
              { label: 'Jobs', verticalKey: 'jobs' },
              { label: 'Events', verticalKey: 'events' }
            ]}
          /> */}
          {renderMap()}
          <VerticalResults
            CardComponent={ParksCard}
            displayAllOnNoResults={false}
          />
          <LocationBias />
        </div>
      }
    </div>
  )
}