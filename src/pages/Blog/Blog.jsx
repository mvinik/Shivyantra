import React from "react";
import { useQuery } from "react-query";
import api from "../../Utils/api";
import Loading from "../../components/Loading/Loading"
import { useNavigate } from "react-router-dom";
const baseUrl = api.defaults.baseURL;
const Blog = () => {
  const nav=useNavigate()

const getBlog = async() =>{
  const res = await api.get('/api/blogs?populate=*')
  return res.data.data;
}

const {data:blogData,isLoading} = useQuery('GetBlog', getBlog);

  if(isLoading)return <Loading/>;
  return (
    <>
      <section className=" ">
   
          <div
          className="relative w-full bg-cover  bg-center aspect-[16/5] mb-10"
          style={{ backgroundImage: "url('https://gemsmantra.com/cdn/shop/articles/How_to_Activate_Rudraksha_55d42cab-a147-437d-a5a6-21fa9b3fc4cd.jpg?v=1742551969&width=1200')" }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 flex  m-10 justify-start ">
            <h1 className="text-white text-3xl md:text-4xl text-start mt-60  font-bold">
             Our Blogs
            </h1>
          </div>
        </div>
           
          {/* <div  className="-mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  flex-wrap">
          {blogData?.map((blog,index)=>(
            <div key={index}>
              <BlogCard
                CardTitle={blog?.attributes?.Title}
                CardDescription={blog?.attributes?.Description || []}
                image={`${baseUrl}/${blog?.attributes?.Image?.data.attributes.url}`}
              />
              </div>
              ))}

            </div> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
       
            <div
              className=" m-5 flex flex-col justify-center items-start"
             onClick={()=>nav('/blogcontent')} >
              <div>
                <img className="w-50 h-70 object-cover "
                src='https://gemsmantra.com/cdn/shop/articles/How_to_wear_rudraksha..jpg?v=1741688891&width=1200' />
              </div>
              <h3 className="text-2xl m-2 font-semibold">How to Wear Rudraksha: Spiritual and Healing Benefits</h3>
              <p className="m-2">Rudraksha, the holy bead adored most in hinduism, has been associated with lord shiva all through its existence and is of great cultural importance. These beads are obtained from rudraksha trees an...</p>
              <button className="m-2 text-red">Read More</button>
              </div>
              <div
              className=" m-5 flex flex-col justify-center items-start"
             onClick={()=>nav('/blogcontent')} >
              <div>
                <img className="w-50 h-70 object-cover "
                src='https://gemsmantra.com/cdn/shop/articles/How_to_wear_rudraksha..jpg?v=1741688891&width=1200' />
              </div>
              <h3 className="text-2xl m-2 font-semibold">How to Wear Rudraksha: Spiritual and Healing Benefits</h3>
              <p className="m-2">Rudraksha, the holy bead adored most in hinduism, has been associated with lord shiva all through its existence and is of great cultural importance. These beads are obtained from rudraksha trees an...</p>
              <button className="m-2 text-red">Read More</button>
              </div>
              <div
              className=" m-5 flex flex-col justify-center items-start"
             onClick={()=>nav('/blogcontent')} >
              <div>
                <img className="w-50 h-70 object-cover "
                src='https://gemsmantra.com/cdn/shop/articles/How_to_wear_rudraksha..jpg?v=1741688891&width=1200' />
              </div>
              <h3 className="text-2xl m-2 font-semibold">How to Wear Rudraksha: Spiritual and Healing Benefits</h3>
              <p className="m-2">Rudraksha, the holy bead adored most in hinduism, has been associated with lord shiva all through its existence and is of great cultural importance. These beads are obtained from rudraksha trees an...</p>
              <button className="m-2 text-red">Read More</button>
              </div>
              <div
              className=" m-5 flex flex-col justify-center items-start"
             onClick={()=>nav('/blogcontent')} >
              <div>
                <img className="w-50 h-70 object-cover "
                src='https://gemsmantra.com/cdn/shop/articles/How_to_wear_rudraksha..jpg?v=1741688891&width=1200' />
              </div>
              <h3 className="text-2xl m-2 font-semibold">How to Wear Rudraksha: Spiritual and Healing Benefits</h3>
              <p className="m-2">Rudraksha, the holy bead adored most in hinduism, has been associated with lord shiva all through its existence and is of great cultural importance. These beads are obtained from rudraksha trees an...</p>
              <button className="m-2 text-red">Read More</button>
              </div>
              <div
              className=" m-5 flex flex-col justify-center items-start"
             onClick={()=>nav('/blogcontent')} >
              <div>
                <img className="w-50 h-70 object-cover "
                src='https://gemsmantra.com/cdn/shop/articles/How_to_wear_rudraksha..jpg?v=1741688891&width=1200' />
              </div>
              <h3 className="text-2xl m-2 font-semibold">How to Wear Rudraksha: Spiritual and Healing Benefits</h3>
              <p className="m-2">Rudraksha, the holy bead adored most in hinduism, has been associated with lord shiva all through its existence and is of great cultural importance. These beads are obtained from rudraksha trees an...</p>
              <button className="m-2 text-red">Read More</button>
              </div>
              <div
              className=" m-5 flex flex-col justify-center items-start"
             onClick={()=>nav('/blogcontent')} >
              <div>
                <img className="w-50 h-70 object-cover "
                src='https://gemsmantra.com/cdn/shop/articles/How_to_wear_rudraksha..jpg?v=1741688891&width=1200' />
              </div>
              <h3 className="text-2xl m-2 font-semibold">How to Wear Rudraksha: Spiritual and Healing Benefits</h3>
              <p className="m-2">Rudraksha, the holy bead adored most in hinduism, has been associated with lord shiva all through its existence and is of great cultural importance. These beads are obtained from rudraksha trees an...</p>
              <button className="m-2 text-red">Read More</button>
              </div>
              <div
              className=" m-5 flex flex-col justify-center items-start"
             onClick={()=>nav('/blogcontent')} >
              <div>
                <img className="w-50 h-70 object-cover "
                src='https://gemsmantra.com/cdn/shop/articles/How_to_wear_rudraksha..jpg?v=1741688891&width=1200' />
              </div>
              <h3 className="text-2xl m-2 font-semibold">How to Wear Rudraksha: Spiritual and Healing Benefits</h3>
              <p className="m-2">Rudraksha, the holy bead adored most in hinduism, has been associated with lord shiva all through its existence and is of great cultural importance. These beads are obtained from rudraksha trees an...</p>
              <button className="m-2 text-red">Read More</button>
              </div>
              <div
              className=" m-5 flex flex-col justify-center items-start"
             onClick={()=>nav('/blogcontent')} >
              <div>
                <img className="w-50 h-70 object-cover "
                src='https://gemsmantra.com/cdn/shop/articles/How_to_wear_rudraksha..jpg?v=1741688891&width=1200' />
              </div>
              <h3 className="text-2xl m-2 font-semibold">How to Wear Rudraksha: Spiritual and Healing Benefits</h3>
              <p className="m-2">Rudraksha, the holy bead adored most in hinduism, has been associated with lord shiva all through its existence and is of great cultural importance. These beads are obtained from rudraksha trees an...</p>
              <button className="m-2 text-red">Read More</button>
              </div>
              <div
              className=" m-5 flex flex-col justify-center items-start"
             onClick={()=>nav('/blogcontent')} >
              <div>
                <img className="w-50 h-70 object-cover "
                src='https://gemsmantra.com/cdn/shop/articles/How_to_wear_rudraksha..jpg?v=1741688891&width=1200' />
              </div>
              <h3 className="text-2xl m-2 font-semibold">How to Wear Rudraksha: Spiritual and Healing Benefits</h3>
              <p className="m-2">Rudraksha, the holy bead adored most in hinduism, has been associated with lord shiva all through its existence and is of great cultural importance. These beads are obtained from rudraksha trees an...</p>
              <button className="m-2 text-red">Read More</button>
              </div>
              <div
              className=" m-5 flex flex-col justify-center items-start"
             onClick={()=>nav('/blogcontent')} >
              <div>
                <img className="w-50 h-70 object-cover "
                src='https://gemsmantra.com/cdn/shop/articles/How_to_wear_rudraksha..jpg?v=1741688891&width=1200' />
              </div>
              <h3 className="text-2xl m-2 font-semibold">How to Wear Rudraksha: Spiritual and Healing Benefits</h3>
              <p className="m-2">Rudraksha, the holy bead adored most in hinduism, has been associated with lord shiva all through its existence and is of great cultural importance. These beads are obtained from rudraksha trees an...</p>
              <button className="m-2 text-red">Read More</button>
              </div>

             
            
            
            
            
            
            
            
            </div>
            
            

             
        
      </section>
    </>
  );
};

export default Blog;

const BlogCard = ({ image, CardTitle, CardDescription }) => {

  const extractText = (description) => {
    return description
      ?.map((paragraph) =>
        paragraph?.children?.map((child) => child?.text).join(" ")
      )
      .join("\n"); // Join paragraphs with a newline or space
  };

  return (
    <>
      <div className="w-full p-2 mx-2 ">
        <div className="mb-10 flex flex-row gap-2 w-full hover:shadow-xl shadow-md cursor-pointer rounded-md transition-all bg-white duration-300 p-4 hover:shadow-red">
          <div className=" overflow-hidden w-2/4 rounded">
            <img src={image} alt="" className="w-full h-72 object-cover" />
            <h3>
              <div
                className=" inline-block mb-2 h-24 shrink-0 text-md my-2 font-semibold text-[#545453] uppercase lg:text-xl  xl:text-2xl"
              >
                {CardTitle}
              </div>
            </h3>
          </div>
          <div className="w-2/4">
            <p className=" bg-gray rounded-md h-[26rem] bg3 text-white  shadow-md  p-2 overflow-y-auto" >
              {extractText(CardDescription)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
