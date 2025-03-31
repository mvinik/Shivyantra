import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Anup Khatua",
      image:
        "https://as1.ftcdn.net/v2/jpg/03/77/30/16/1000_F_377301660_ClhyVNc3ThqShLjkfk7zq0SeCenc4xb7.jpg",
      test: `"Brahma Gems has an impressive quality & variety of stones to choose from online & offline. The best part is winning the customers' hearts by focusing on customer relationships."`,
      place: "Chennai",
    },
    {
      name: "Priya Sharma",
      image:
        "https://randomuser.me/api/portraits/women/44.jpg",
      test: `"Amazing service! The quality of Rudraksha is beyond expectations. Highly recommend Brahma Gems!"`,
      place: "Mumbai",
    },
    {
      name: "Rahul Verma",
      image:
        "https://randomuser.me/api/portraits/men/46.jpg",
      test: `"I was skeptical at first, but after receiving my gemstone, I am beyond satisfied. Great authenticity!"`,
      place: "Delhi",
    },
  ];

  return (
    <div className="my-10 ">
       <h2 class="flex flex-row flex-nowrap items-center ">
          <span class="flex-grow block border-t border-red"></span>
          <span class="flex-none block mx-4 px-4 py-2.5  lg:text-xl rounded leading-none uppercase font-bold bg-red text-yellow">
             Testimonials
          </span>
          <span class="flex-grow block border-t border-red"></span>
      </h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        // navigation
        // pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        // breakpoints={{
        //   640: { slidesPerView: 1 },
        //   768: { slidesPerView: 2 },
        //   1024: { slidesPerView: 3 },
        // }}
        className="w-full max-w-6xl mx-auto"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <section className="my-8 ">
              <div className="container flex flex-col items-center p-4 mx-auto space-y-6 md:p-8" bis_skin_checked="1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-16 h-16 dark:text-violet-600">
                  <polygon points="328.375 384 332.073 458.999 256.211 406.28 179.924 459.049 183.625 384 151.586 384 146.064 496 182.756 496 256.169 445.22 329.242 496 365.936 496 360.414 384 328.375 384"></polygon>
                  <path d="M415.409,154.914l-2.194-48.054L372.7,80.933,346.768,40.414l-48.055-2.2L256,16.093,213.287,38.219l-48.055,2.2L139.3,80.933,98.785,106.86l-2.194,48.054L74.464,197.628l22.127,42.715,2.2,48.053L139.3,314.323l25.928,40.52,48.055,2.195L256,379.164l42.713-22.126,48.055-2.195,25.928-40.52L413.214,288.4l2.195-48.053,22.127-42.715Zm-31.646,76.949L382,270.377l-32.475,20.78-20.78,32.475-38.515,1.76L256,343.125l-34.234-17.733-38.515-1.76-20.78-32.475L130,270.377l-1.759-38.514L110.5,197.628,128.237,163.4,130,124.88,162.471,104.1l20.78-32.474,38.515-1.76L256,52.132l34.234,17.733,38.515,1.76,20.78,32.474L382,124.88l1.759,38.515L401.5,197.628Z"></path>
                </svg>
                <p className="px-6 py-2 text-2xl font-semibold text-center sm:font-bold sm:text-3xl md:text-4xl lg:max-w-2xl xl:max-w-4xl ">{testimonial.test}</p>
                <div className="flex justify-center space-x-3" bis_skin_checked="1">
                  <img src={testimonial.image} alt="" className="w-10 h-10 bg-center bg-cover rounded-md" />
                  <div bis_skin_checked="1">
                    <p className="leading-tight">{testimonial.name}</p>
                    <p className="text-sm leading-tight ">{testimonial.place}</p>
                    
                  </div>
                </div>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
