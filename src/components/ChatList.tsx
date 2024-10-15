import React from 'react'
import { LogOut } from 'lucide-react';
import { Search } from 'lucide-react';
import { User } from 'lucide-react';
import '../components/css/scrollbar.css';

function ChatList() {
  return (
    <div className=' border border-gray-500 h-screen overflow-y-scroll scrollbar-thin' >
        <div className='sticky top-0 z-10 bg-gray-700 pb-2 p-4'>
            <div className='flex justify-between'>
                <p className='text-2xl font-bold text-white'>Chats</p>
                <LogOut color='#bbb'/>
            </div>  

            <div className='mt-6 w-full h-9 bg-gray-500 p-1 pl-4 pr-4 rounded-xl'>
                <Search size={20} stroke='#bbb' className='inline-block absolute mt-1'/>
                <input type="text" className='ml-12 h-7 rounded-md bg-gray-500 relative outline-none' placeholder='Search'/>
            </div>

            <div className='flex justify-start mt-3 gap-3'>
                <button className=' p-1 pl-2 pr-2 bg-gray-600 rounded-xl text-[#bbb] hover:bg-gray-500/55'>All</button>
                <button className=' p-1 pl-2 pr-2 bg-gray-600 rounded-xl text-[#bbb] hover:bg-gray-500/55'>Unread</button>
                <button className=' p-1 pl-2 pr-2 bg-gray-600 rounded-xl text-[#bbb] hover:bg-gray-500/55'>Groups</button>
            </div>

        </div>

        

        <div className=''>
            <div className='flex justify-start p-3 gap-3 hover:bg-gray-500'>
                <User size={48} strokeWidth={1} color='#bbb' className='rounded-full bg-gray-500 cursor-pointer mt-1'/>
                <div>
                    <p className='text-white text-xl'>John</p>
                    <p className='text-white text-sm'>Hello jogn hw are you?</p>
                </div>
            </div>
            <hr className=" ml-14 border-gray-600 border-t" />
            <div className='flex justify-start p-3 gap-3 hover:bg-gray-500'>
                <User size={48} strokeWidth={1} color='#bbb' className='rounded-full bg-gray-500 cursor-pointer mt-1'/>
                <div>
                    <p className='text-white text-xl'>John</p>
                    <p className='text-white text-sm'>Hello jogn hw are you?</p>
                </div>
            </div>
            <hr className=" ml-14 border-gray-600 border-t" />
            <div className='flex justify-start p-3 gap-3 hover:bg-gray-500'>
                <User size={48} strokeWidth={1} color='#bbb' className='rounded-full bg-gray-500 cursor-pointer mt-1'/>
                <div>
                    <p className='text-white text-xl font-normal'>John</p>
                    <p className='text-white text-sm font-normal'>Hello jogn hw are you?</p>
                </div>
            </div>
            <hr className=" ml-14 border-gray-600 border-t" />
            <div className='flex justify-start p-3 gap-3 hover:bg-gray-500'>
                <User size={48} strokeWidth={1} color='#bbb' className='rounded-full bg-gray-500 cursor-pointer mt-1'/>
                <div>
                    <p className='text-white text-xl'>John</p>
                    <p className='text-white text-sm'>Hello jogn hw are you?</p>
                </div>
            </div>
            <hr className=" ml-14 border-gray-600 border-t" />
            <div className='flex justify-start p-3 gap-3 hover:bg-gray-500'>
                <User size={48} strokeWidth={1} color='#bbb' className='rounded-full bg-gray-500 cursor-pointer mt-1'/>
                <div>
                    <p className='text-white text-xl'>John</p>
                    <p className='text-white text-sm'>Hello jogn hw are you?</p>
                </div>
            </div>
            <hr className=" ml-14 border-gray-600 border-t" />
            <div className='flex justify-start p-3 gap-3 hover:bg-gray-500'>
                <User size={48} strokeWidth={1} color='#bbb' className='rounded-full bg-gray-500 cursor-pointer mt-1'/>
                <div>
                    <p className='text-white text-xl'>John</p>
                    <p className='text-white text-sm'>Hello jogn hw are you?</p>
                </div>
            </div>
            <hr className=" ml-14 border-gray-600 border-t" />
            <div className='flex justify-start p-3 gap-3 hover:bg-gray-500'>
                <User size={48} strokeWidth={1} color='#bbb' className='rounded-full bg-gray-500 cursor-pointer mt-1'/>
                <div>
                    <p className='text-white text-xl'>John</p>
                    <p className='text-white text-sm'>Hello jogn hw are you?</p>
                </div>
            </div>
            
            
        </div>
        
    </div>
  )
}

export default ChatList