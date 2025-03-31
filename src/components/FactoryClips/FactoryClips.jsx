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
  const blog = [{
    title: "How to Wear Rudraksha: Spiritual and Healing Benefits",
    discription:
      `Rudraksha, the holy bead adored most in hinduism, has been associated with lord shiva all through its existence and is of great cultural importance. These beads are obtained from rudraksha trees and are believed to aid in all aspects: physically, mentally and spiritually. As described in Indian ancient texts, it is believed that wearing rudraksha beads will help in repelling evil and bring forth peace by attracting positive energy. The beads, due to their structure and composition, are useful during chanting mantras or meditating.Venturing into the metaphysical territory, rudraksha beads have astrological and health promoting properties. It is believed that these beads can help in chakra balancing, emotional toggle and supervision of the body. Each bead has its own spiritual and astrological significance as it comes in various mukhis and corresponds to a particular need. They can be worn as malas or jewelry, they cross the borders of faiths and speak to anyone who wishes to heal and go deep within themselves.`
    ,
    image: 'https://gemsmantra.com/cdn/shop/articles/How_to_wear_rudraksha..jpg?v=1741688891&width=1200',

  },{
    title: "How to Wear Rudraksha: Spiritual and Healing Benefits",
    discription:
      `Rudraksha, the holy bead adored most in hinduism, has been associated with lord shiva all through its existence and is of great cultural importance. These beads are obtained from rudraksha trees and are believed to aid in all aspects: physically, mentally and spiritually. As described in Indian ancient texts, it is believed that wearing rudraksha beads will help in repelling evil and bring forth peace by attracting positive energy. The beads, due to their structure and composition, are useful during chanting mantras or meditating.Venturing into the metaphysical territory, rudraksha beads have astrological and health promoting properties. It is believed that these beads can help in chakra balancing, emotional toggle and supervision of the body. Each bead has its own spiritual and astrological significance as it comes in various mukhis and corresponds to a particular need. They can be worn as malas or jewelry, they cross the borders of faiths and speak to anyone who wishes to heal and go deep within themselves.`
    ,
    image: 'https://gemsmantra.com/cdn/shop/articles/How_to_wear_rudraksha..jpg?v=1741688891&width=1200',

  },{
    title: "How to Wear Rudraksha: Spiritual and Healing Benefits",
    discription:
      `Rudraksha, the holy bead adored most in hinduism, has been associated with lord shiva all through its existence and is of great cultural importance. These beads are obtained from rudraksha trees and are believed to aid in all aspects: physically, mentally and spiritually. As described in Indian ancient texts, it is believed that wearing rudraksha beads will help in repelling evil and bring forth peace by attracting positive energy. The beads, due to their structure and composition, are useful during chanting mantras or meditating.Venturing into the metaphysical territory, rudraksha beads have astrological and health promoting properties. It is believed that these beads can help in chakra balancing, emotional toggle and supervision of the body. Each bead has its own spiritual and astrological significance as it comes in various mukhis and corresponds to a particular need. They can be worn as malas or jewelry, they cross the borders of faiths and speak to anyone who wishes to heal and go deep within themselves.`
    ,
    image: 'https://gemsmantra.com/cdn/shop/articles/How_to_wear_rudraksha..jpg?v=1741688891&width=1200',

  },
  {
    title: "How to Wear Rudraksha: Spiritual and Healing Benefits",
    discription:
      `Rudraksha, the holy bead adored most in hinduism, has been associated with lord shiva all through its existence and is of great cultural importance. These beads are obtained from rudraksha trees and are believed to aid in all aspects: physically, mentally and spiritually. As described in Indian ancient texts, it is believed that wearing rudraksha beads will help in repelling evil and bring forth peace by attracting positive energy. The beads, due to their structure and composition, are useful during chanting mantras or meditating.Venturing into the metaphysical territory, rudraksha beads have astrological and health promoting properties. It is believed that these beads can help in chakra balancing, emotional toggle and supervision of the body. Each bead has its own spiritual and astrological significance as it comes in various mukhis and corresponds to a particular need. They can be worn as malas or jewelry, they cross the borders of faiths and speak to anyone who wishes to heal and go deep within themselves.`
    ,
    image: 'https://gemsmantra.com/cdn/shop/articles/How_to_wear_rudraksha..jpg?v=1741688891&width=1200',

  },{
    title: "How to Wear Rudraksha: Spiritual and Healing Benefits",
    discription:
      `Rudraksha, the holy bead adored most in hinduism, has been associated with lord shiva all through its existence and is of great cultural importance. These beads are obtained from rudraksha trees and are believed to aid in all aspects: physically, mentally and spiritually. As described in Indian ancient texts, it is believed that wearing rudraksha beads will help in repelling evil and bring forth peace by attracting positive energy. The beads, due to their structure and composition, are useful during chanting mantras or meditating.Venturing into the metaphysical territory, rudraksha beads have astrological and health promoting properties. It is believed that these beads can help in chakra balancing, emotional toggle and supervision of the body. Each bead has its own spiritual and astrological significance as it comes in various mukhis and corresponds to a particular need. They can be worn as malas or jewelry, they cross the borders of faiths and speak to anyone who wishes to heal and go deep within themselves.`
    ,
    image: 'https://gemsmantra.com/cdn/shop/articles/How_to_wear_rudraksha..jpg?v=1741688891&width=1200',

  }]
  const navigator=useNavigate()

  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const closeModal = () => {
    setOpenModal(false);
  };

  if (isLoading) return <Loading />;
  // if (!Media) return null;
  return (
<div className='mb-10 px-2'>

<h2 class="flex flex-row flex-nowrap items-center ">
          <span class="flex-grow block border-t border-red"></span>
          <span class="flex-none block mx-4 px-4 py-2.5  lg:text-xl rounded leading-none uppercase font-bold bg-red text-yellow">
              Our Blogs
          </span>
          <span class="flex-grow block border-t border-red"></span>
      </h2>

    <div className=' mt-10 mb-10'>
      <Marquee play={true} direction={'right'} pauseOnHover={true} loop={0}>
      {blog?.map((blog, index) => (
        <div className='sm:h-70 h-40 items-center justify-center' key={index}   
         onClick={() => navigator("/blogcontent")}>
     

          <img src={blog.image} alt="item" 
          onClick={()=>{
            setModalData(`{blog.image}`) 
          setOpenModal(true)
        }} className="mx-2 bg-red bg1 md:mx-5 md:w-96 h-full transition-all border-4 border-red rounded-md   duration-500 hover:scale-95 overflow-hidden object-cover" />
     
       
             {/* <h3 className="text-2xl m-2 text-red font-semibold">{blog.title}</h3>
                {console.log("Blog Discription:", blog.discription)
                }
                <p className="m-2">
                  {blog.discription?.length > 350 ? blog.discription.substring(0, 350) + "..." : blog.discription}
                </p>


                <button className="m-2 text-red">Read More</button> */}
        </div>
      ))}
       {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-50">
          {
            blog.map((blog, index) => (

              <div
                key={index}
                className=" m-5 flex flex-col justify-center items-start"
                onClick={() => navigator("/blogcontent")}>
                <div>
                  <img className=" object-cover w-0 h-40 p-2"
                    src={blog.image} />
                </div>
                <h3 className="text-2xl m-2 text-red font-semibold">{blog.title}</h3>
                {console.log("Blog Discription:", blog.discription)
                }
                <p className="m-2">
                  {blog.discription?.length > 350 ? blog.discription.substring(0, 350) + "..." : blog.discription}
                </p>


                <button className="m-2 text-red">Read More</button>
              </div>

            ))
          }
        </div> */}
    </Marquee>
    {/* <button className='rounded bg-red text-white p-2 m-2 flex justify-center mx-auto   '
    onClick={()=>navigator('/blog')}>View all</button> */}
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