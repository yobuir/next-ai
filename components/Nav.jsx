"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useEffect,useState } from 'react'
import {signIn,signOut,useSession,getProviders}  from 'next-auth/react'
const Nav = () => { 
    const isUserLoggedIn=true;
    const {data: session}=useSession();

    const [providers, setProviders] = useState(null); 
    const [toggleDropdown, settoggleDropdown] = useState(false);


    useEffect(()=>{
        const setUpProvider = async () => {
            const response = await getProviders();
            setProviders(response);
        } 
        setUpProvider();
    },[])

  return (
   
    <nav className='flex-between w-full mb-16 pt-3'>
        <div className="flex gap-3"> 
            <Link href='/' className='flex gap-2 flex-center'>
                <Image src={'/assets/images/logo.svg'}
                alt='yobu'
                width={30}
                height={30}
                className='object-contain'/>
            </Link>
            <p className='logo_text'>Yobu</p>
        </div>
       
            {/* desktop navigation */}
            <div className='sm:flex hidden'>
                {session?.user? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href={'/create-prompt'} className='black_btn'>
                            Create post
                        </Link>
                        <button type="button" className='outline_btn'>Sign out</button>
                        <Link href={'/profile'}>
                            <Image src={session?.user?.image}
                                width={30}
                                height={30}
                                alt={session?.user?.name}
                                className='object-contain'/>
                        </Link>
                    </div>
                ):(<>
                    {providers&&
                        Object.values(providers).map((provider)=>(
                            <button type='button'
                                key={provider.name}
                                onClick={()=>signIn(provider.id)}
                                className='black_btn'>
                                    Sign in

                            </button>
                        ))}
                </>)}
            </div>


        {/* mobile navigation */}
         <div className='sm:hidden flex relative'>
            {session?.user? (
                <div className='flex'>
                    <Image src={'/assets/images/logo.svg'}
                    alt='yobu'
                    width={37}
                    height={37}
                    className='object-contain'
                    onClick={()=>settoggleDropdown((prev)=>!prev)}/>
                    {toggleDropdown&&(
                        <div className='dropdown'>
                            <Link href={'/profile'} 
                            onClick={()=>settoggleDropdown(false)}>My profile</Link>
                              <Link href={'/create-prompt'} 
                            onClick={()=>settoggleDropdown(false)}>Create prompt</Link>
                            <button type="button" onClick={()=>{settoggleDropdown(false);
                            signOut()}}
                            className='mt-5 w-full black_btn'>
                                Sign out
                            </button>
                        </div>
                    )}
                </div>
            ):(
              <>
                {providers&&
                    Object.values(providers).map((provider)=>(
                        <button type='button'
                            key={provider.name}
                            onClick={()=>signIn(provider.id)}
                            className='black_btn'>
                                Sign in

                        </button>
                    ))}
            </>  
            )}
         </div>

    </nav>
  )
}

export default Nav