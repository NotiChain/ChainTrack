import * as React from 'react';

import { Snap } from '../types';
import { ActionCard } from './ActionCard';
import { MyButton } from './Button';

const phrases = [
  'Explore our comprehensive catalog of recurring transactions. Delve deeper to discover more.',
  'Browse our extensive collection of recurring transactions. See what suits your needs.',
  'Discover the variety in our recurring transactions catalog. Find the perfect fit for you.',
  'Dive into our curated list of recurring transactions. Tailored for your transactional needs.',
  'Unveil a world of options with our recurring transactions catalog. Step in and explore.',
  'Navigate through our detailed catalog of recurring transactions. Your next transaction awaits.',
  'Peruse our diverse range of recurring transactions. Every transaction tells a story.',
  'Step into our world of recurring transactions. A catalog designed with precision for you.',
  'Embark on a journey through our recurring transactions catalog. Excellence in every transaction.',
  'Experience the depth of our recurring transactions collection. Crafted for discerning users like you.',
];

const description = phrases[Math.floor(Math.random() * phrases.length)];

type ConnectActionCardProps = {
  installedSnap?: Snap;
  handleGoToCatalogClick: () => void;
};

export function CatalogActionCard({
  installedSnap,
  handleGoToCatalogClick,
}: ConnectActionCardProps) {
  const buttons = [
    <MyButton
      onClick={handleGoToCatalogClick}
      disabled={!installedSnap}
      key="catalog"
    >
      Catalog
    </MyButton>,
    <MyButton
      color="secondary"
      href="https://github.com/NasCorp/ChainTrack/issues"
      target="_blank"
      sx={{ marginLeft: '10px' }}
      disabled={!installedSnap}
      key="idea"
    >
      Have an Idea?
    </MyButton>,
  ];

  const content = {
    title: 'Catalog',
    description,
    buttons,
  };

  return <ActionCard content={content}></ActionCard>;
}
