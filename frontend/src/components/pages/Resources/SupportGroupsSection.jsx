import React from "react";
import { FaCircleCheck } from "react-icons/fa6";

const SupportGroupsSection = () => {
  const supportLinks = [
    { text: "Cancer Council", url: "http://www.cancer.org.au" },
    { text: "Canteen", url: "http://www.canteen.org.au/" },
    {
      text: "Finty - Money & Mental Health",
      url: "https://finty.com/resources/managing-money-pressures/#introduction",
    },
    { text: "Good Grief", url: "http://www.goodgrief.org.au/" },
    { text: "SANDS", url: "http://www.sands.org.au/" },
    { text: "The Heart Foundation", url: "http://www.heartfoundation.org.au/" },
    {
      text: "Australian Government – Department of Defence Service Records",
      url: "https://www.defence.gov.au/about/accessing-information",
    },
    { text: "Centrelink", url: "https://www.centrelink.gov.au/" },
    {
      text: "Medicare",
      url: "https://www.servicesaustralia.gov.au/organisations/health-professionals?utm_id=9",
    },
    {
      text: "Beyond Blue (Anxiety / Depression / Suicide)",
      url: "https://www.beyondblue.org.au/",
    },
    {
      text: "myCompass - Free online self-help program for people with mild to moderate depression, anxiety and stress",
      url: "http://www.mycompass.org.au/",
    },
    {
      text: "MindSpot - Online assessment, treatment for stress, anxiety and more.",
      url: "http://www.mindspot.org.au/",
    },
    {
      text: "MHMA - Multicultural mental health resources",
      url: "http://www.mhima.org.au/",
    },
    {
      text: "Men's Shed - 1300 550 009 - Men’s Sheds provide a safe and busy environment to support men's bodies and minds.",
      url: "http://www.mensshed.org/",
    },
    {
      text: "Blue Knot Foundation - 1300 657 380 Supporting adults affected by complex trauma and childhood trauma and those who support them.",
      url: "http://www.blueknot.org.au/",
    },
    {
      text: "eFriend - A free, virtual peer support service that proving non-clinical, peer-based mental health support.",
      url: "http://www.efriend.org.au/",
    },
    {
      text: "Gambling Help Online - 1800 858 858 - Free, confidential 24/7 telephone help service for anyone affected by gambling.",
      url: "http://www.gamblinghelponline.org.au/services-in-your-state/new-south-wales",
    },
    {
      text: "Open Arms - 1800 011 046 - 24/7 support for current and ex-serving ADF personnel and their families.",
      url: "http://www.openarms.gov.au/",
    },
    {
      text: "1800RESPECT - 1800 737 732 24/7 counselling, information and referrals for sexual assault, domestic and family violence.",
      url: "http://www.1800respect.org.au/",
    },
    {
      text: "Kids Helpline - 1800 55 1800 - 24/7 private and confidential phone and online counselling service for young people aged 5 to 25.",
      url: "http://www.kidshelpline.com.au/",
    },
    {
      text: "MensLine Australia - 1300 78 99 78 - 24/7 telephone and online support for men with emotional health and relationship concerns.",
      url: "http://www.mensline.org.au/",
    },
    {
      text: "Lifeline Service Finder - A directory of free or low cost health and community services available in Australia.",
      url: "http://www.lifeline.org.au/",
    },
    {
      text: "Head to Health - A directory of digital mental health resources.",
      url: "http://www.headtohealth.gov.au/",
    },
    {
      text: "Black Dog Institute - Research, information, facts and online resources for mental health and illnesses.",
      url: "http://www.blackdoginstitute.org.au/",
    },
    {
      text: "National Debt Helpline - (03) 9421 7640 9.30am to 4.30pm Monday to Friday . Free National Debt Helpline is a free service that helps people tackle their debt problems.",
      url: "http://www.ndh.org.au/",
    },
    {
      text: "Support After Suicide - (03) 9421 7640 Counselling, group support and an online community website for people bereaved by suicide.",
      url: "http://www.supportaftersuicide.org.au/",
    },
    {
      text: "StandBy - Support after Suicide. Postvention and support after suicide for individuals, families and communities.",
      url: "http://www.standbysupport.com.au/",
    },
    {
      text: "SANE Australia - Monday - Friday 10am-10pm Mental illness advice, referral and support via phone, webchat or email.",
      url: "https://www.sane.org/counselling-support",
    },
    {
      text: "Relationships Australia - Relationship support services for individuals, families and communities.",
      url: "http://relationships.org.au/",
    },
    {
      text: "ReachOut.com - Help with tough times for 14-25 year olds and their parents.",
      url: "http://www.au.reachout.com/",
    },
    {
      text: "QLife - 3pm - midnight, every day . Phone and online anonymous and free LGBTI peer support and referral for people in Australia wanting to talk about sexuality, identity, gender, bodies, feelings or relationships.",
      url: "http://www.qlife.org.au/",
    },
    {
      text: "PANDA - 1300 726 306 - 9am - 7:30pm weekdays AEST. Support for women, men and families affected by anxiety and depression during pregnancy and in the first year of parenthood.",
      url: "http://www.panda.org.au/",
    },
    {
      text: "Headspace - 1800 650 890 - Support and information for young people 12-25 for mental health and what's going on in their life.",
      url: "http://www.headspace.org.au/",
    },
    {
      text: "Griefline - 1300 845 745 Midday - 3am, every day. Telephone and online counselling service for people experiencing loss or grief.",
      url: "http://griefline.org.au/",
    },
    {
      text: "Butterfly Foundation - 1800 334 673. 8am - midnight, every day. Support for eating disorders and body image issues over the phone, web chat or email.",
      url: "http://www.thebutterflyfoundation.org.au/",
    },
    {
      text: "R U OK? inspire and empower everyone to meaningfully connect with the people around them and start a conversation with anyone who may be struggling with life.",
      url: "http://www.ruok.org.au/",
    },
  ];

  return (
    <section className="bg-white py-16 md:py-4">
      <div className="section-container">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 uppercase tracking-wide">
            Help & Support Groups
          </h2>
          <div className="w-24 h-1 bg-black mx-auto mt-4 opacity-20"></div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 border border-gray-200 rounded-lg p-6 shadow-sm   ">
          {supportLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="group flex items-start gap-3 p-2 rounded hover:bg-surface transition-colors duration-200"
            >
              <FaCircleCheck className="text-black flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
              <span className="text-lg text-gray-700 font-body group-hover:text-black group-hover:font-medium transition-colors leading-relaxed">
                {link.text}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportGroupsSection;
