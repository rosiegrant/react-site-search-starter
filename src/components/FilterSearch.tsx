import { useRef, useState } from "react";
import { useAnswersActions, FilterSearchResponse, SearchParameterField, Filter, NearFilterValue, createNearMeFilter } from '@yext/answers-headless-react';
import InputDropdown, { InputDropdownCssClasses } from "./InputDropdown";
import DropdownSection, { DropdownSectionCssClasses, Option } from "./DropdownSection";
import { processTranslation } from "./utils/processTranslation";
import { useSynchronizedRequest } from "../hooks/useSynchronizedRequest";
import renderAutocompleteResult, { AutocompleteResultCssClasses } from "./utils/renderAutocompleteResult";
import { CompositionMethod, useComposedCssClasses } from "../hooks/useComposedCssClasses";
import { Loader } from '@googlemaps/js-api-loader';

const SCREENREADER_INSTRUCTIONS = 'When autocomplete results are available, use up and down arrows to review and enter to select.'

interface FilterSearchCssClasses extends InputDropdownCssClasses, DropdownSectionCssClasses, AutocompleteResultCssClasses {
  container?: string,
  label?: string
}

const builtInCssClasses: FilterSearchCssClasses = {
  container: 'mb-2',
  label: 'mb-4 text-sm font-medium text-gray-900',
  dropdownContainer: 'absolute z-10 shadow-lg rounded-md border border-gray-300 bg-white pt-3 pb-1 mt-1',
  inputElement: 'text-sm bg-white outline-none h-9 w-full p-2 rounded-md border border-gray-300 focus:border-green-900',
  sectionContainer: 'pb-2',
  sectionLabel: 'text-sm text-gray-700 font-semibold pb-2',
  focusedOption: 'bg-gray-100',
  option: 'text-sm text-gray-700 pb-1 cursor-pointer px-4',
  inputDropdownContainer: 'relative'
}

export interface FilterSearchProps {
  label: string,
  sectioned: boolean,
  searchFields: Omit<SearchParameterField, 'fetchEntities'>[],
  customCssClasses?: FilterSearchCssClasses,
  cssCompositionMethod?: CompositionMethod
}

export default function FilterSearch({
  label,
  sectioned,
  searchFields,
  customCssClasses,
  cssCompositionMethod
}: FilterSearchProps): JSX.Element {
  const answersActions = useAnswersActions();
  const [input, setInput] = useState('');
  const selectedFilterOptionRef = useRef<Filter | null>(null);
  const searchParamFields = searchFields.map((searchField) => {
    return { ...searchField, fetchEntities: false }
  });
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);

  const [filterSearchResponse, executeFilterSearch] = useSynchronizedRequest<string, FilterSearchResponse>(inputValue =>
    answersActions.executeFilterSearch(inputValue ?? '', sectioned, searchParamFields)
  );

  let sections: { results: Option[], label?: string }[] = [];
  if (filterSearchResponse) {
    sections = filterSearchResponse.sections.map(section => {
      return {
        results: section.results.map(result => {
          return {
            value: result.value,
            onSelect: () => {
              setInput(result.value);
              if (result?.filter) {
                if (selectedFilterOptionRef.current) {
                  answersActions.setFilterOption({ ...selectedFilterOptionRef.current, selected: false });
                }
                selectedFilterOptionRef.current = result.filter;
                answersActions.setFilterOption({ ...result.filter, selected: true });
                answersActions.executeVerticalQuery();
              }
            },
            display: renderAutocompleteResult(result, cssClasses)
          };
        }),
        label: section.label
      };
    });
  }

  sections = sections.filter(section => section.results.length > 0);

  let screenReaderText = processTranslation({
    phrase: `0 autocomplete option found.`,
    pluralForm: `0 autocomplete options found.`,
    count: 0
  });
  if (sections.length > 0) {
    const screenReaderPhrases = sections.map(section => {
      const optionInfo = section.label
        ? `${section.results.length} ${section.label}`
        : `${section.results.length}`;
      return processTranslation({
        phrase: `${optionInfo} autocomplete option found.`,
        pluralForm: `${optionInfo} autocomplete options found.`,
        count: section.results.length
      });
    });
    screenReaderText = screenReaderPhrases.join(' ');
  }





  function onSubmit() {
    console.log("submitting query")

    const loader = new Loader({
      apiKey: "AIzaSyAExrzRP6lmTEtrco-exBg2FT5Dxewb9kA"
    });

    loader
      .load()
      .then((google) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': input }, function (results: { geometry: { location: any; }; }[], status: any) {
          if (status == google.maps.GeocoderStatus.OK) {

            if (results.length == 0) {
              return; //no results

            }
            console.log(results[0])
            var googLat = results[0]?.geometry?.location?.lat();
            var googLong = results[0]?.geometry?.location?.lng();

            const nearFilter = createNearMeFilter({
              lat: googLat,
              lng: googLong,
              radius: 80467.2
            })
            answersActions.setState({
              ...answersActions.state,
              filters: {}
            });
            answersActions.setFilterOption({ ...nearFilter, selected: true });
            answersActions.executeVerticalQuery();

          }
        });


      })
      .catch(e => {
        console.log("hit a snag sry")
        console.log(e);
      });
  }

  return (
    <div className={cssClasses.container}>
      <h1 className={cssClasses.label}>{label}</h1>
      <InputDropdown
        inputValue={input}
        placeholder='Search here ...'
        screenReaderInstructions={SCREENREADER_INSTRUCTIONS}
        screenReaderText={screenReaderText}
        onlyAllowDropdownOptionSubmissions={false}
        onInputChange={newInput => {
          setInput(newInput);
        }}
        onInputFocus={(input) => {
          executeFilterSearch(input);
        }}
        cssClasses={cssClasses}
        firstOption={sections[0]?.results[0]}
        onSubmit={onSubmit}
      >
        {sections.map((section, sectionIndex) => {
          const sectionId = section.label ? `${section.label}-${sectionIndex}` : `${sectionIndex}`;
          return (
            <DropdownSection
              key={sectionId}
              options={section.results}
              optionIdPrefix={sectionId}
              onFocusChange={value => {
                setInput(value);
              }}
              label={section.label}
              cssClasses={cssClasses}
            />
          );
        })}
      </InputDropdown>
    </div>
  );
}