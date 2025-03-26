import React, { useState } from 'react'
import Marquee from 'react-fast-marquee'
import Slider from 'react-slick';
import Modal from "react-modal";
import api from '../../Utils/api';
import Loading from '../Loading/Loading';
import './FactoryClips.css'
import { useNavigation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const baseUrl = api.defaults.baseURL;
const FactoryClips = ({Media,isLoading}) => {  
  const navigator=useNavigate()

  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const closeModal = () => {
    setOpenModal(false);
  };

  if (isLoading) return <Loading />;
  if (!Media) return null;
  return (
<div className='mb-10 px-2'>

<h2 class="flex flex-row flex-nowrap py-3 md:py-10 items-center ">
  
          <span class="flex-none block mx-4 px-4 py-2.5 lg:text-2xl rounded leading-none uppercase font-bold  text-red">
          our blog
          </span>
    
      </h2>

    <div className='md:mt-0 mt-3 mb-10'>
      <Marquee play={true} direction={'right'} pauseOnHover={true} loop={0}>
      {Media?.map((item, index) => (
        <div className={`md:h-56 h-44  relative `} key={index}>
          {item.Type ==='Image' && 
          // <a href={`${baseUrl}/${item?.Media?.data?.attributes?.url}`} target={'_blank'}>
          <img src={`${baseUrl}/${item?.Media?.data?.attributes?.url}`} alt="item" 
          onClick={()=>{
            setModalData(`${baseUrl}/${item?.Media?.data?.attributes?.url}`) 
          setOpenModal(true)
        }} className="mx-2 bg-red bg1 md:mx-5 md:w-96 h-full transition-all border-4 border-red rounded-md   duration-500 hover:scale-95 overflow-hidden object-cover" />
        // </a>
          }
            
        </div>
      ))}
    </Marquee>
    <button className='rounded bg-red text-white p-2 m-2 flex justify-center mx-auto   '
    onClick={()=>navigator('/blog')}>View all</button>
    </div>
    {/* <div className=''> 
      <Marquee play={true} direction={'left'} pauseOnHover={true} loop={0}>
      {Media.map((item, index) => (
        <div className={`md:h-72 relative   gap-5`} key={index}>
             {item.Type ==='Video' && 
         <div className="mx-2 md:mx-5 md:w-96 w-72 h-48 md:h-60 transition-all bg-red  bg1 border-4 border-red rounded-md duration-500 hover:scale-95 overflow-hidden">
         <iframe
            key ={item}
           width="100%"
           height="100%"
           src={`https://www.youtube.com/embed/${item.EmbedCode}`}
           title="YouTube video"
           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
           className="w-full h-full rounded-md "
           loading='lazy'
         ></iframe>
     </div>
            }
        </div>
      ))}
    </Marquee>
    <button onClick={()=>navigator('/blog')}>View More</button>
    </div> */}

    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      className="flex items-center focus:outline-none select-none justify-center lg:w-[60%] sm:w-[80%] w-[90%] bg-red p-1 overflow-y-hidden shadow-lg"
      overlayClassName="fixed inset-0 z-[9999] bg-red bg-opacity-70 flex items-center justify-center"
    >
      <img src={modalData} alt="Factory images" className=' rounded ' />
    </Modal>

</div>
  )
}

export default FactoryClips