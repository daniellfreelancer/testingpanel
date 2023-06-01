import React from 'react'
import textLogoVM from '../assets/textLogoVM.png'
import GoBackToButton from './GoBackButton'

export default function HeaderLogo() {
  return (
    <div className='flex items-end w-full justify-between px-4 pt-4' >
        <img src={textLogoVM} className='lg:w-[400px] sm:w-[200px]  '  alt='vital-move-love' />
        <GoBackToButton />
    </div>
  )
}
