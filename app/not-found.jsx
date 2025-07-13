import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import NotFoundImage from './not-found-tempo-image.png'

export default function NotFound() {
  return (
    <main className='text-center'>
        <h2 className='text-3xl'>There was a problem :(</h2>
        <p className='p-4'>We could not found your page.</p>
        <p className='p-4'>please click this link below to comeback to our main page <Link href="/" >Dashbord</Link>.</p>
        <Image
            className='mx-auto'
            src={NotFoundImage}
            alt='Not found image'
            width={500}
            placeholder='blur'
            quality={100}
        />
    </main>
  )
}
