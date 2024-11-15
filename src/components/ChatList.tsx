"use client"
import React from 'react'
import { LogOut } from 'lucide-react';
import { Search } from 'lucide-react';
import { User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootStateType } from '@/store/userStore';
import { useState, useEffect } from 'react';
import '../components/css/scrollbar.css';
import { IoClose, IoVideocam } from "react-icons/io5";
import { UserState } from '@/store/userSlice';
import formatDateString from '@/lib/formatDate';
import { useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { fetchChatListById } from '@/store/chatListSlice';
import { AppDispatch } from '@/store/userStore';
import { useDispatch } from 'react-redux';
import { IoCamera } from "react-icons/io5";
import { TiDocumentText } from "react-icons/ti";
import { CldImage } from 'next-cloudinary';

function ChatList() {
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const friends = useSelector((state: RootStateType) => state.friends)
    const users = useSelector((state: RootStateType) => state.user)
    const chatList = useSelector((state: RootStateType) => state.chatList)
    const [friendsList, setFriendsList] = useState<UserState[]>([])
    const [searchBtn, setSearchBtn] = useState<string>("")
    const [searchText, setSearchText] = useState<string>("")
    const [debouncedSearchText] = useDebounce(searchBtn, 800);

    useEffect(() => {
        dispatch(fetchChatListById(users._id))
    }, [users])

    useEffect(() => {
        setSearchText(debouncedSearchText.trim())
    }, [debouncedSearchText])

    useEffect(() => {
        setFriendsList(friends.friends)
    }, [friends.friends])

    useEffect(() => {
        const fetchFriends = friends.friends.filter((f) => f.username.toLowerCase().includes(searchText.toLowerCase()))
        if (searchText.trim() == "") {
            setFriendsList(friends.friends)
        } else {
            setFriendsList(fetchFriends)
        }
        console.log("fetch : ", fetchFriends)
    }, [searchText])

    return (
        <div className=' border border-gray-500 h-screen overflow-y-scroll scrollbar-thin' >
            <div className='sticky top-0 z-10 bg-gray-700 pb-2 p-4'>
                <div className='flex justify-between'>
                    <p className='text-2xl font-bold text-white'>Chats</p>
                    <LogOut color='#bbb' className='cursor-pointer select-bg-red-600' onClick={() => {
                        localStorage.removeItem('token')
                        router.push('/auth/signin')
                    }} />
                </div>

                <div className='mt-6 bg-gray-500 rounded-xl'>

                    <Search size={20} stroke='#bbb' className='inline-block absolute ml-4 mt-2' />
                    <input type="text" value={searchBtn} className='w-full h-9 bg-gray-500 p-1 px-14 rounded-xl outline-none' placeholder='Search' onChange={(e) => {
                        setSearchBtn(e.target.value)

                    }} />
                    {
                        searchBtn.trim() == ""
                            ? null
                            : <IoClose size={20} color='#bbb' className='absolute right-6 inline-block mt-2 cursor-pointer' onClick={() => {
                                setSearchBtn("")
                                console.log("searchBtn Cleared : ", searchBtn)
                            }} />
                    }

                </div>

                <div className='flex justify-start mt-3 gap-3'>
                    <button className=' p-1 pl-2 pr-2 bg-gray-600 rounded-xl text-[#bbb] hover:bg-gray-500/55'>All</button>
                    <button className=' p-1 pl-2 pr-2 bg-gray-600 rounded-xl text-[#bbb] hover:bg-gray-500/55'>Unread</button>
                    <button className=' p-1 pl-2 pr-2 bg-gray-600 rounded-xl text-[#bbb] hover:bg-gray-500/55'>Groups</button>
                </div>

            </div>

            {chatList.data.map((chat, index) => (
                <div key={index}>
                    {"friendId" in chat ? (
                        <div onClick={() => router.push(`/chat/${chat.friendId._id}`)}>
                            <div className='cursor-pointer flex justify-start p-3 gap-3 hover:bg-gray-500'>
                                {/* <User size={48} strokeWidth={1} color='#bbb' className='rounded-full bg-gray-500 cursor-pointer mt-1' /> */}
                                {
                                    chat.profileImage != null
                                    ? <CldImage src={chat.profileImage} alt="profile" width={48} height={48} className='w-[48px] h-[48px] rounded-full bg-gray-500 cursor-pointer object-cover' />
                                    : <User size={48} strokeWidth={1} color='#bbb' className='rounded-full bg-gray-500 cursor-pointer mt-1' />
                                }
                                <div className='w-5/6'>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-white text-xl'>{chat.friendId.username}</p>
                                        {
                                            chat.lastMessageTime == null
                                                ? null
                                                : <p className='text-white text-xs'>{formatDateString(chat.lastMessageTime)}</p>
                                        }
                                    </div>
                                    <div className='text-sm mt-1 text-[#ddd] flex justify-between w-full overflow-hidden'>
                                        {
                                            chat.lastMessageType?.includes("image")
                                                ? <div className='flex justify-start '><IoCamera size={19} color='#ddd' className='inline-block' /><pre> </pre> <p className='w-[21rem] truncate'>{chat.lastMessage == "" ? "Photo" : chat.lastMessage}</p></div>
                                                : chat.lastMessageType?.includes("video")
                                                    ? <div className='flex justify-start '><IoVideocam size={19} color='#ddd' className='inline-block mt-1' /><pre> </pre> <p className='w-[21rem] truncate'>{chat.lastMessage == "" ? "Video" : chat.lastMessage}</p></div>
                                                    : chat.lastMessageType?.includes("application")
                                                        ? <div className='flex justify-start'><TiDocumentText size={19} color='#ddd' className='inline-block mt-1' /><pre> </pre> <p className='w-[21rem] truncate'>{chat.lastMessage == "" ? "Document" : chat.lastMessage}</p></div>
                                                        : <p className=' w-full truncate'>{chat.lastMessage}</p>
                                        }
                                        {
                                            chat.unreadMessageCount > 0
                                                ? <p className='bg-[#005c4b] w-5 h-5 flex items-center justify-center rounded-full text-black text-sm'>{chat.unreadMessageCount}</p>
                                                : null
                                        }

                                    </div>
                                </div>
                            </div>
                            <hr className=" ml-14 border-gray-600 border-t" />
                        </div>
                    ) : "groupId" in chat ? (
                        <div onClick={() => router.push(`/chat/group/${chat.groupId._id}`)}>
                            <div className='flex justify-start p-3 gap-3 hover:bg-gray-500 cursor-pointer'>
                            <img className='w-[48px] h-[48px] rounded-full bg-gray-500 cursor-pointer object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6guKZXlKfEvr8YRdmNDP689aAylzmfk5Ukw&s" alt="" />
                            {/* <User size={48} strokeWidth={1} color='#bbb' className='rounded-full bg-gray-500 cursor-pointer mt-1' /> */}
                                <div className='w-5/6'>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-white text-xl'>{chat.groupId.name}</p>
                                        {
                                            chat.lastMessageTime == null
                                                ? null
                                                : <p className='text-white text-xs'>{formatDateString(chat.lastMessageTime)}</p>
                                        }
                                    </div>
                                <div className='w-2/3'>
                                <div className='flex justify-between overflow-hidden'>
                                    <div className='flex justify-start'>
                                        {
                                            chat.lastMessage == null
                                                ? null
                                                : chat.lastMessageSender == users.username
                                                    ? <p className='text-white text-sm inline-block'>You:</p>
                                                    : <p className='text-white text-sm inline-block'>{chat.lastMessageSender} : </p>
                                        }
                                        <p className='inline-block text-sm text-[#ddd] w-[88%] truncate overflow-hidden'>
                                            {
                                                chat.lastMessageType?.includes("image")
                                                    ? <div className='flex justify-start '><IoCamera size={19} color='#ddd' className='inline-block' /><pre> </pre> <p className='w-[21rem] truncate'>{chat.lastMessage == "" ? "Photo" : chat.lastMessage}</p></div>
                                                    : chat.lastMessageType?.includes("video")
                                                        ? <div className='flex justify-start '><IoVideocam size={19} color='#ddd' className='inline-block mt-1' /><pre> </pre> <p className='w-[22rem] truncate'>{chat.lastMessage == "" ? "Video" : chat.lastMessage}</p></div>
                                                        : chat.lastMessageType?.includes("application")
                                                    ? <div className='flex justify-start'><TiDocumentText size={19} color='#ddd' className='inline-block mt-1' /><pre> </pre> <p className='w-[22rem] truncate'>{chat.lastMessage == "" ? "Document" : chat.lastMessage}</p></div>
                                                    : <p className=''>{chat.lastMessage}</p>
                                            }
                                        </p>
                                    </div>
                                    {
                                        chat.unreadMessageCount > 0
                                            ? <p className='bg-[#005c4b] w-5 h-5 flex items-center justify-center rounded-full text-black text-sm'>{chat.unreadMessageCount}</p>
                                            : null
                                    }
                                    </div>
                                </div>

                                </div>
                            </div>
                            <hr className=" ml-14 border-gray-600 border-t" />
                        </div>
                    ) : null}
                </div>
            ))}

        </div>
    )
}

export default ChatList