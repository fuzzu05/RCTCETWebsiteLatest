import React from 'react';

const Anantya = () => {
  return (
    <>
      <div className="w-full flex justify-center pb-20 bg-transparent relative z-20 overflow-hidden">
        <div className="relative w-full overflow-hidden pt-8 lg:pt-16">

          {/* Centered Content with Glassmorphism */}
          <div className="relative z-10 flex flex-col md:flex-row h-full p-6 lg:px-24 justify-center items-center gap-12 max-w-7xl mx-auto">

            {/* Text Side - Glass Card */}
            <div className="flex-grow md:w-1/2 p-8 md:p-10 rounded-3xl bg-white/70 dark:bg-black/20 backdrop-blur-md border border-stone-200/50 dark:border-white/10 shadow-sm transition-transform hover:-translate-y-1 duration-500 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-secondary transform -translate-x-1 group-hover:translate-x-0 transition-transform duration-500" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-[2.2rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50 dark:from-white dark:to-white/40 tracking-tighter drop-shadow-sm select-none uppercase mb-6 xl:whitespace-nowrap">ROTARACT CLUB OF TCET</h2>
              <p className="text-foreground text-lg leading-relaxed mb-6 font-medium">
                At Rotaract Club of TCET, wellbeing is at the forefront of what we're
                working together towards. Our programs and activities are designed to
                be a catalyst that helps community members reach their goals and fulfill
                their potential. Learn more about the positive impact we have and join us in bringing about positive change.
              </p>
              <p className="text-sm font-semibold tracking-wider text-primary uppercase">
                Chartered on 15th September 2017
              </p>
            </div>

            {/* Video Side with Premium Float Effect */}
            <div className="lg:w-1/2 md:w-full w-full">
              <div className="w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl shadow-black/30 border border-white/20 dark:border-white/5 relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <video autoPlay muted loop playsInline
                  src="https://res.cloudinary.com/dtc2xaeaf/video/upload/v1787043270/landing_intro_dsw7cj.mp4"
                  type="video/mp4"
                  className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out">
                </video>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Meraki: Infinite By Souls Section */}
      <div className="relative w-full bg-transparent py-16 pb-28 overflow-hidden">

        <div className="relative z-20 flex flex-col md:flex-row items-center max-w-7xl mx-auto px-6 md:px-12 mt-10">
          <div className="md:w-5/12 flex items-center justify-center relative group perspective-1000">
            <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full transform group-hover:scale-110 transition-transform duration-700" />
            <img
              src='https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_800,c_limit/v1787043285/Meraki_kvjeog.png'
              alt="Meraki"
              className="w-full h-auto object-cover transform group-hover:rotate-y-12 group-hover:scale-105 transition-all duration-700 drop-shadow-2xl z-10 relative"
              loading={"lazy"}
            />
          </div>
          <div className="md:w-7/12 md:pl-16 mt-12 md:mt-0">
            <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] leading-none font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50 dark:from-white dark:to-white/40 tracking-tighter drop-shadow-sm select-none uppercase mb-8">
              MERAKI: <span className="bg-gradient-to-b from-primary to-primary/60 bg-clip-text text-transparent">INFINITE BY SOUL</span>
            </h2>
            <div className="text-muted space-y-6 text-lg leading-relaxed">
              <p>
                <strong className="text-primary font-bold">Meraki</strong>, meaning to do something with soul, creativity, and love, reflects the belief that everything becomes meaningful when a part of ourselves is poured into it. <strong className="text-foreground font-semibold">“Infinite by Soul”</strong> celebrates the people, connections, and efforts that make every Rotaract journey truly unforgettable.
              </p>
              <p>
                It reminds us that what we create is not measured only by its outcome, but by the hearts behind it—the friendships we build, the lives we touch, and the moments we leave behind. Every act of service, every bond, and every shared experience carries a piece of the souls that shaped it.
              </p>
              <p className="font-medium text-foreground italic border-l-4 border-primary pl-4 py-1">
                Because when something is created with soul, its impact does not end with the moment. It lives on through the people it touches, making our journey infinite.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Anantya;