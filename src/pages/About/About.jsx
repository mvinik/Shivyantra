import React from 'react'
import './About.css'
const About = () => {
  return (
    <>

      <section >
        <div
          className="relative w-full bg-cover  bg-center aspect-[16/5]"
          style={{ backgroundImage: "url('https://rudralife.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbanner.6dc5124a.jpg&w=1920&q=75')" }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 flex  m-10 justify-start ">
            <h1 className="text-white text-3xl md:text-4xl text-start mt-60  font-bold">
              About Us
            </h1>
          </div>
        </div>

        <div className='text-black text-md leading-7 m-10'>
          <ul>
            <li>
              An organization was established 18 years ago, to educate, promote and supply the best quality of Nepal Rudraksha. It went on to establish a grand global presence by becoming the world's leading organization in this field. Rudralife is an authority in the field of Rudraksha. Slowly but surely they became the most discussed organization in print and electronic media. They are recognized as a leading brand with 4 registered trademark products. All the Rudraksha supplied by them are genuine and are subjected to the best quality checks in the market. They are certified by an ISO 9001:2015 accredited laboratory, that adheres to total quality management principles to achieve a zero defect approach while supplying Rudraksha.
            </li>
            <br/>
            <li>
              Rudraksha is an ancient bead of divine mysticism and Rudralife is the only organization that has actively involved scientific research on this bead. Wearing a Rudraksha requires the right knowledge and expert advice which Rudralife incorporates in its strategy while recommending this bead to its innumerous customers. This has resulted in positive outcome that has translated into positive testimonials that are innumerable. This abundantly available bead has provided excellent results to people from various walks of life. Professional - industrialists, sports persons, actors, politicians and spiritual personalities have derived tremendous benefits from wearing or worshiping it.
            </li>
            <br/>
            <li>
              The individual approach in the process of recommendation that Rudralife emphasizes on has been extremely beneficial to all these individuals and they in turn reverted with positive feedbacks. Rudralife combines divine wisdom with accurate individual analysis and formulates unique combinations of Rudraksha, irrespective of whether it is a common man or a celebrity. This is the reason people at large have benefitted by purchasing and wearing Rudraksha recommended by the panel of experts at Rudralife.
            </li>
            <br/>
            <li>
              In order to maintain the literary heritage of ancient times, Rudralife provides writings in relevant scriptures that reveal the properties and benefits of the mystic Rudraksha.
            </li>
          </ul>
        </div>


      </section>
      {/* Mission Section */}
      <div className="m-10">
      <h4 className="md:text-2xl font-bold text-red py-2 mb-4 uppercase text-start">
        Mission
      </h4>

      <ul className="list-disc list-inside text-base leading-8  text-black  mb-4 custom-list">
        <li>Our Aim Is To Make People Aware Of The Genuine Rudraksha Bead.</li>
        <li>
          To Take Utmost Care In Maintaining The Quality And Sanctity Of The Bead. Support and empower
          skilled artisans by providing them with meaningful opportunities to showcase their craft.
        </li>
        <li>
          To Promote Further Research And Analysis On Rudraksha, So That The Results Obtained May Be
          Used For The Benefit Of All.
        </li>
        <li>
          To Educate People On Rudraksha So That They Can Use Them To Heal And Empower Themselves
          According To The Knowledge Presented In Our Religious Texts And New Scientific Research.
        </li>
      </ul>

      {/* Custom CSS for Tailwind */}
      <style>
        {`
          .custom-list li::marker {
            font-size: 1.5rem; /* Increases bullet size */
            color: #993d00; /* Changes bullet color */
          }
        `}
      </style>
    </div>
    </>
  )
}

export default About