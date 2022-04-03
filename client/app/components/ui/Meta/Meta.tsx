import { FC } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { getOnlyText, mergeTitle, siteName } from "@/helpers";

import { IMeta } from "./Meta.interface";

export const Meta: FC<IMeta> = (props) => {
  // **Props
  const { title, description, image, children } = props;
  const { asPath } = useRouter();

  const currentUrl = `${process.env.APP_URL}${asPath}`;

  return (
    <>
      <Head>
        <title itemProp="headline">{mergeTitle(title)}</title>
        {description && (
          <>
            <meta
              itemProp="description"
              name="description"
              content={getOnlyText(description, 152)}
            />

            <link rel="canonical" href={currentUrl} />

            <meta property="og:locale" content="en" />
            <meta property="og:title" content={mergeTitle(title)} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={siteName} />
            <meta
              property="og:description"
              content={getOnlyText(description, 197)}
            />
          </>
        )}
        {!description && <meta name="robots" content="noindex, nofollow" />}
      </Head>
      {children}
    </>
  );
};
