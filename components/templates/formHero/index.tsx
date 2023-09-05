import Image from 'next/image';
import { ReactNode } from 'react';

export interface IFormHeroProps {
  children: ReactNode;
}

const FormHero = (props: IFormHeroProps) => {
  const { children } = props;

  return (
    <div className='flex flex-row-reverse min-h-screen flex-1'>
      <div className='flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96 space-y-10'>{children}</div>
      </div>
      <div className='relative hidden w-0 flex-1 lg:block'>
        <Image
          src='https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MTg1ODAxNw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080'
          alt='Hero image'
          fill={true}
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  );
};

export default FormHero;
