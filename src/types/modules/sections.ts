import type { StaticImageData } from "next/image";
import React from "react";

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  rating: number;
  stories: number;
  bestSeason: string;
  image: StaticImageData;
  badges: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  country: string;
  avatar: string;
  rating: number;
  storyTitle: string;
  review: string;
  travelType: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  highlights: string[];
  infoText: string;
  buttonLink: string;
}
