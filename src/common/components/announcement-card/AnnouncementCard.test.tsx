import React from 'react';
import { AnnouncementCard } from './AnnouncementCard';
import images from '../../assets/images';
import { render } from '../../utils/testing';

describe('AdCard', () => {
  it('should display all given content', () => {
    const { getByText } = render(
      <AnnouncementCard image={images.instapayAd} title="title" description="description" subtitle="subtitle" />
    );

    getByText('title');
    getByText('description');
    getByText('subtitle');
  });
});
