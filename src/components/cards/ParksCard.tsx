import {
  CompositionMethod,
  useComposedCssClasses,
} from "../../hooks/useComposedCssClasses";
import { CardProps } from "../../models/cardComponent";
import heart from "react-useanimations/lib/heart";
import UseAnimations from "react-useanimations";
import { useState } from "react";

export interface ParksCardConfig {
  showOrdinal?: boolean
}

export interface ParksCardProps extends CardProps {
  configuration: ParksCardConfig;
  customCssClasses?: ParksCardCssClasses;
  cssCompositionMethod?: CompositionMethod;
}

export interface ParksCardCssClasses {
  container?: string;
  header?: string;
  body?: string;
  descriptionContainer?: string;
  ctaContainer?: string;
  cta1?: string;
  cta2?: string;
  ordinal?: string;
  title?: string;
}

export interface ImageData {
  height?: number,
  width?: number,
  url: string
}
export interface Image {
  image: ImageData
}
export interface ParkData {
  photoGallery?: Image[]
}

const builtInCssClasses: ParksCardCssClasses = {
  container:
    "flex flex-col justify-between border rounded-lg shadow-sm hover:shadow-lg",
  header: "flex text-gray-800 mt-3 p-4",
  body: "flex justify-end pt-0 p-4",
  descriptionContainer: "w-full text-base",
  ctaContainer: "flex flex-col justify-end ml-4",
  cta1: "min-w-max bg-blue-600 text-white font-medium rounded-lg py-2 px-5 shadow",
  cta2: "min-w-max bg-white text-blue-600 font-medium rounded-lg py-2 px-5 mt-2 shadow",
  ordinal: "mr-1.5 text-lg font-medium",
  title: "text-lg font-medium",
};

interface CtaData {
  label: string;
  link: string;
  linkType: string;
}

function isCtaData(data: unknown): data is CtaData {
  if (typeof data !== "object" || data === null) {
    return false;
  }
  const expectedKeys = ["label", "link", "linkType"];
  return expectedKeys.every((key) => {
    return key in data;
  });
}

/**
 * This Component renders the base result card.
 *
 * @param props - An object containing the result itself.
 */
export function ParksCard(props: ParksCardProps): JSX.Element {
  const { configuration, result, customCssClasses, cssCompositionMethod } =
    props;
  const cssClasses = useComposedCssClasses(
    builtInCssClasses,
    customCssClasses,
    cssCompositionMethod
  );

  const park = result.rawData as unknown as ParkData;
  //for <3
  const [checked, setChecked] = useState(true);

  const cta1 = isCtaData(result.rawData.c_primaryCTA)
    ? result.rawData.c_primaryCTA
    : undefined;
  const cta2 = isCtaData(result.rawData.c_secondaryCTA)
    ? result.rawData.c_secondaryCTA
    : undefined;

  // TODO (cea2aj) We need to handle the various linkType so these CTAs are clickable
  function renderCTAs(cta1?: CtaData, cta2?: CtaData) {
    return (
      <>
        {(cta1 ?? cta2) && (
          <div className={cssClasses.ctaContainer}>
            {cta1 && <button className={cssClasses.cta1}>{cta1.label}</button>}
            {cta2 && <button className={cssClasses.cta2}>{cta2.label}</button>}
          </div>
        )}
      </>
    );
  }

  // TODO (cea2aj) Update this to render the ordinal once we get mocks from UX
  function renderOrdinal(index: number) {
    // return (
    //   <div className={cssClasses.ordinal}>{index}</div>
    // );
    return null;
  }

  function renderTitle(title: string) {
    return <div className={cssClasses.title}>{title}</div>;
  }

  return (
    <div className={cssClasses.container}>
      <div className="min-w-full max-h-60 overflow-hidden rounded-t-lg">
        {park.photoGallery ? (
          <img src={park.photoGallery?.[0].image?.url}></img>
        ) : (
          <img src="https://www.treehugger.com/thmb/QolJfOYFmxwIH6Sxv5SBqY8Kq-M=/1885x1414/smart/filters:no_upscale()/GettyImages-1273584292-cbcd5f85f4c646d58f7a7fa158dcaaeb.jpg"></img>
        )}
      </div>
      <div className={cssClasses.header}>
        {configuration.showOrdinal &&
          result.index &&
          renderOrdinal(result.index)}
        {result.name && renderTitle(result.name)}
        <div className="ml-1 cursor-pointer">
          <UseAnimations
            animation={heart}
            onClick={() => {
              setChecked(checked);
            }}
            reverse={!checked}
          />
        </div>
      </div>
      {(result.description ?? cta1 ?? cta2) && (
        <div className={cssClasses.body}>
          {result.description && (
            <div className={cssClasses.descriptionContainer}>
              <span>{result.description}</span>
            </div>
          )}
          {renderCTAs(cta1, cta2)}
        </div>
      )}
    </div>
  );
}
