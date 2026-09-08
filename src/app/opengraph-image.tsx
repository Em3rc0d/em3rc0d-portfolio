import { ImageResponse } from 'next/og';
import { SocialCard } from '@/components/systems/social-card';
export const alt='Eduardo Merino — THE BUILD ROOM V2';
export const size={width:1200,height:630};
export const contentType='image/png';
export default function OpenGraphImage(){return new ImageResponse(<SocialCard/>,size);}
