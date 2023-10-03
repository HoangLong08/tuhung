'use client';
import React, { useEffect } from 'react';
import IntroPage from '../../components/IntroductionPage/index';
import { useParams } from 'next/navigation';

const AboutUsPage = () => {
  const params = useParams();
  return <IntroPage slug={params.slug as string} />;
};

export default AboutUsPage;
