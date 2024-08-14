"use client"
import logo from '/public/assets/images/logo.svg'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import profile from '/public/assets/images/logo.svg' 
import { useState,useEffect } from 'react';
import {signIn,signOut,useSession,getProviders} from  'next-auth/react'
import Provider from './Provider';
const Nav = () => {
const isuserloggedin = true;

const [Providers,setproviders] = useState(null)
const [toggle,settoggle] =useState(false)
useEffect(()=>{
  const setProviders = async ()=>{
    const response = await getProviders()
    setProviders(response)
  }
  setProviders()
})

  return (
    <nav className=' flex-between w-full mb-16 pt-3'>
      <Link href="/" className=' flex gap-2 flex-center'>
       <Image src={logo}width={30} height={30} alt='Promptopia logo' />
       <p className='logo_text'> Promptopia</p>
      </Link>
      {/*Desktop navigation */}
      <div className='sm:flex hidden'>
   {isuserloggedin ? (
   <div className='flex gap-3 md:gap-5'>
    <Link href='/create-prompt' className='black_btn'>
    Create post
    </Link>
    <button type='button' onClick={()=>{}} className='outline_btn'>
      Sign out
    </button>
    <Link href='/profile'>
    <Image src={profile} alt='profile' width={37} height={37} className='rounded-full'/>
    </Link>

   </div>
   ):(
    <>
    {Providers &&Object.values(Providers).map((Provider)=>(
      <button key={Provider.name} onClick={()=> signIn(Provider.id)} className='black_btn'>
        Sign In
         </button>
    ))}

    </>
   )}
      </div>
     {/* Mobile navigation */}
    <div className='sm:hidden flex relative'>
      {isuserloggedin? (
      <div>
        <Image
        src={logo}
        width={37}
        height={37}
        className='rounded-full'
        alt='profile'
        onClick={()=>settoggle((prev)=> !prev)}
        />
        {
          toggle &&(
            <div className='dropdown'>
   <Link href='/profile' className='dropdown_link' onClick={()=>settoggle (false)} >
   My profile
   </Link>
   <Link href='/create-prompt' className='dropdown_link' onClick={()=>settoggle (false)} >
  Create prompt
   </Link>
   <button type='button' onClick={()=>settoggle(false)} className='mt-5 w-full black_btn'> Sign out</button>

            </div>
          )
        }
      </div>
      ):(
        <>
           {Providers &&Object.values(Providers).map((Provider)=>(
      <button key={Provider.name} onClick={()=> signIn(Provider.id)} className='black_btn'>
        Sign In
         </button>
    ))}
        </>
      )}
    </div>
    </nav>
  
  )
}

export default Nav
