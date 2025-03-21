import React from 'react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import Card from '../../components/Card/Card'
import CategorySlider from '../../components/CategorySlider/CategorySlider'
import FactoryClips from '../../components/FactoryClips/FactoryClips'
import Footer from '../../components/Footer/Footer'
import Loading from '../../components/Loading/Loading'
import Navbar from '../../components/NavBar/Navbar'
import SectionWithSlider from '../../components/SectionWithSlider/SectionWithSlider'
import HomeSlider from '../../components/Slider/Slider'
import Testimonials from '../../components/Testimonials/Testimonials'
import api from '../../Utils/api'
import CartSideBar from '../AddToCart/CartSideBar'
import TechError from '../Error/TechError'

const Home = () => {

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Fetch Home Page Data
  const { data: Home, isError, isLoading } = useQuery('HomePage', async () => {
    const res = await api.get(`api/pages/1`);
    console.log(res.data.data,"Home")
    return res.data.data;
  });
 
  // Fetch Home Slider Data
  const { data: SliderData } = useQuery('Home-Slider', async () => {
    const res = await api.get(`api/pages/1?populate[0]=Slider&populate[1]=Slider.Image&populate[2]=Slider.MobileImage`);
    console.log(res.data.data,'sliderdata')
    return res.data.data;
  });


  // Fetch Category Data
  const { data: CategoryData } = useQuery('Home-Category', async () => {
    const res = await api.get(`api/pages/1?populate[0]=Category&populate[1]=Category.category&populate[2]=Category.category.Image`);
    console.log(res.data.data,'categorydata')
    return res.data.data;
  });

  // Fetch Section Data
  const { data: SectionData } = useQuery('Home-Section', async () => {
    const res = await api.get(`api/pages/1?populate[0]=Section&populate[1]=Section.products&populate[2]=Section.products.ProductImage`);
    console.log(res.data.data,'section')
    return res.data.data;
  });

    // Fetch FactoryClips Data
  const {data:Media } = useQuery('factoryClips', async()=>{
    const res = await api.get('/api/pages/1?populate[0]=FactoryClips&populate[1]=FactoryClips.Media')
    console.log(res.data.data,'media')
    return res.data.data;
  })

  const {data:Test } = useQuery('Test', async()=>{
    const res = await api.get('/api/testimonials?populate=*')
    console.log(res.data.data,'test')
    return res.data.data;
  })


  if (isLoading) return <Loading/>;
  if (isError) return <TechError/>;


  return (
    <>
    <div className=''>
      <HomeSlider sliderData={SliderData}/>
      <CategorySlider CategoryData={CategoryData} />
      <SectionWithSlider SectionData={SectionData?.attributes?.Section}/>
      <FactoryClips Media={Media?.attributes?.FactoryClips} isLoading={isLoading}/>
      {/* <Testimonials Test={Test} /> */}
      <CartSideBar isCartOpen={isCartOpen} onCartClose={()=>setIsCartOpen(false)} />
    </div>
    </>
  )
}

export default Home
