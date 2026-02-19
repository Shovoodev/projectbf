import Hero from "../components/common/Hero";

/**
 * Reusable Paragraph Component
 */
const Paragraph = ({ children, className = "" }) => (
  <p
    className={`text-black text-base leading-relaxed mb-6 mx-auto font-montserrat ${className}`}
  >
    {children}
  </p>
);

const PrivacyPolicy = () => {
  return (
    <div className="bg-white">
      {/* --- HERO SECTION --- */}
      <Hero title="Privacy Policy" subtitle="Privacy Policy" />

      <section className="max-w-6xl mx-auto px-6 py-16 lg:py-24 text-center">
        <section className="mb-12 border border-gray-200 p-6 rounded-lg">
          <h2 className="text-3xl font-body font-bold text-gray-900 mb-6">
            funera
          </h2>
          <h2 className="text-3xl font-body font-bold text-gray-900 mb-6">
            062-692
          </h2>
          <h2 className="text-3xl font-body font-bold text-gray-900 mb-6">
            7617 6113
          </h2>
        </section>
        {/* 1. Introduction */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
            1. Introduction
          </h2>

          <Paragraph>
            Funera is committed to treating the personal information we collect
            in accordance with the Australian Privacy Principles in the Privacy
            Act 1988 (Cth) (Privacy Act). This Privacy Policy explains how
            Funera handles personal information and does not cover personal
            information Funera collects that is exempt under the Privacy Act,
            such as Funera’s employee records. Funera may modify this Privacy
            Policy from time to time to reflect its current privacy practices.
            In this Privacy Policy, ‘Funera’, ‘we’, ‘us’ and ‘our’ mean the
            entities carrying on business under the names Funera and includes
            any corporate entity owned or controlled by these companies.
          </Paragraph>
        </section>

        <hr className="my-12 border-gray-100" />

        {/* 2. Personal Information We Collect */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
            2. Personal Information We Collect
          </h2>

          <Paragraph>
            The main types of personal information we collect include: Names,
            contact and address details. It may be necessary in some
            circumstances for Funera to collect sensitive information about you;
            for example, your professional memberships, ethnic origin, criminal
            record or health information. We will only collect sensitive
            information as permitted under the Privacy Act. It is generally not
            practical to remain anonymous or to use a pseudonym when dealing
            with Funera as usually we need to use your personal information to
            provide specific services to you, or which relate to or involve you.
          </Paragraph>
        </section>

        <hr className="my-12 border-gray-100" />

        {/* 3. Collection and Management */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
            3. How we collect and manage personal information
          </h2>

          <h3 className="text-xl font-bold mb-4">
            3.1. How we collect personal information
          </h3>

          <Paragraph>
            Generally we collect your personal information from you directly.
            For example, when we deal with you in person or over the phone, when
            you send us correspondence (including via email), when you complete
            a questionnaire, form or survey, or when you subscribe to our
            publications. Sometimes it may be necessary for us to collect your
            personal information from a third party. For example, we may collect
            your personal information from your personal representative or a
            publicly available record, amongst other sources. We may also
            collect personal information about you from your use of our websites
            and information you provide to us through contact mailboxes or
            through the registration process on our websites.
          </Paragraph>

          <h3 className="text-xl font-bold mt-10 mb-4">
            3.2. Where you provide us with personal information about someone
            else
          </h3>

          <Paragraph>
            If you provide us with someone else’s personal information, you
            should only do so if you have their authority or consent to provide
            us with their personal information. You should also take reasonable
            steps to inform them of the matters set out in this Privacy Policy
            or any Privacy Collection Statement we give you.
          </Paragraph>

          <h3 className="text-xl font-bold mt-10 mb-4">
            3.3. Holding personal information
          </h3>

          <Paragraph>
            Funera holds personal information in both hard copy and electronic
            formats.
          </Paragraph>

          <Paragraph>
            We take reasonable steps to protect personal information from
            misuse, loss, unauthorised access, modification and disclosure.
            Security measures include physical protections such as restricted
            office access and locked storage, and technological protections
            including firewalls, encryption, passwords and digital certificates.
          </Paragraph>

          <Paragraph>
            We also maintain document retention policies and processes.
          </Paragraph>

          <h3 className="text-xl font-bold mt-10 mb-4">
            3.4. Purpose for collecting, holding, using and disclosing personal
            information
          </h3>

          <Paragraph>
            Funera collects, holds and uses personal information for a number of
            purposes including:
          </Paragraph>

          <Paragraph>to provide professional services;</Paragraph>
          <Paragraph>to provide technology services and solutions;</Paragraph>
          <Paragraph>to respond to requests or queries;</Paragraph>
          <Paragraph>
            to maintain contact with our clients and other contacts (including
            alumni)
          </Paragraph>
          <Paragraph>
            to keep our clients and other contacts informed of our services,
            industry developments and to notify of seminars and other events
          </Paragraph>
          <Paragraph>
            for administrative purposesfor recruitment purposes
          </Paragraph>
          <Paragraph>for recruitment purposes</Paragraph>
          <Paragraph>
            for purposes related to the employment of our personnel, providing
            internal services to our partners and staff and for matters relating
            to our group
          </Paragraph>
          <Paragraph>
            for the engagement of service providers, contractors or suppliers
            relating to the operation of our business, or
          </Paragraph>
          <Paragraph>for other business related purposes.</Paragraph>

          <Paragraph>
            If you do not provide us with the personal information we have
            requested, we may not be able to complete or fulfil the purpose for
            which such information was collected, including providing our
            clients with the services we were engaged to perform.
          </Paragraph>

          <Paragraph>
            The types of third parties to whom we may disclose your personal
            information include:
          </Paragraph>

          <Paragraph>
            experts or other third parties contracted as part of an engagement;
          </Paragraph>
          <Paragraph>our service providers;</Paragraph>
          <Paragraph>our professional advisers;</Paragraph>
          <Paragraph>other Funera firms;</Paragraph>
          <Paragraph>
            if you are an employee, a contractor or supplier of services to a
            client, then we may disclose your personal information as part of
            providing services to that client
          </Paragraph>
          <Paragraph>
            as part of an actual (or proposed) acquisition, disposition, merger
            or de-merger of a business (including Funera’s business) or to enter
            into an alliance, joint venture or referral arrangement; or
            government or regulatory bodies or agencies, as part of an
            engagement or otherwise, (for example, the Australian Taxation
            Office).
          </Paragraph>

          <Paragraph>
            We do not disclose personal information to third parties for the
            purpose of allowing them to send marketing material to you. However,
            we may share non personal, de-identified or aggregated information
            to them for research or promotional purposes.
          </Paragraph>

          <h3 className="text-xl font-bold mt-10 mb-4">
            3.5 Disclosure of personal information overseas and sharing personal
            information amongst and within Funera.
          </h3>

          <Paragraph>
            We may transfer or process personal information overseas, including
            through third-party service providers. Overseas providers are
            commonly located in India and Vietnam.
          </Paragraph>
          <Paragraph>
            We may also process your personal information on servers that are
            located overseas (including through third party service providers).
            Overseas service providers are commonly located in India and
            Vietnam.
          </Paragraph>
        </section>

        <hr className="my-12 border-gray-100" />

        {/* 4. Direct Marketing */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
            4. Direct Marketing
          </h2>

          <Paragraph>
            Funera may use personal information to market its services. If you
            do not wish to receive marketing communications, you may contact us
            at enquiries@blacktulipfunerals.com.au
          </Paragraph>
        </section>

        <hr className="my-12 border-gray-100" />

        {/* 5. Website Privacy */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
            5. Privacy on Our Websites
          </h2>
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
            5.1 Cookies
          </h2>
          <Paragraph>
            “Cookies” (i.e. small text files placed on your computer when you
            first visit the site) are used on some Funera websites. Most
            browsers now recognise when a cookie is offered and permit you to
            refuse or accept it. If you are not sure whether your browser has
            this capability, you should check with the software manufacturer,
            your company’s technology help desk or your internet service
            provider.
          </Paragraph>

          <Paragraph>
            Cookies are primarily used to enhance your online experience. If you
            visit our websites to read or download information, such as news
            stories or articles, much of the information we do collect is
            statistical only (e.g., the domain from which you access the
            internet, the date and time you accessed our site, and the internet
            address of the website from which you linked directly to our site)
            and not personally identifiable. We use this information about the
            number of visitors and their use of the sites in aggregate form to
            make our sites more useful and attractive to you.
          </Paragraph>
        </section>

        <hr className="my-12 border-gray-100" />

        <section className="mb-12">
          <h3 className="text-xl font-bold mt-10 mb-4">5.2. Your choices</h3>

          <Paragraph>
            You have several choices regarding your use of Funera’s websites. In
            general, you are not required to provide personal information when
            you visit our websites. However, if you apply to receive information
            about our services, events and industry updates or wish to apply for
            a job, we may require you to provide certain personal information.
          </Paragraph>

          <h3 className="text-xl font-bold mt-10 mb-4">
            5.3. Links to third party websites
          </h3>

          <Paragraph>
            Funera websites may contain links to third parties’ websites,
            including sites maintained by other Funera firms. Those other
            websites are not subject to our privacy policies and procedures. You
            will need to review those websites directly to view a copy of their
            privacy policy.
          </Paragraph>

          <Paragraph>
            Funera does not endorse, approve or recommend the services or
            products provided on third party websites.
          </Paragraph>
        </section>

        {/* 6. Children */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
            6. Children
          </h2>

          <Paragraph>
            We understand the importance of protecting children’s privacy,
            especially in an online environment. In particular, our websites are
            not intentionally designed for or directed at children under the age
            of 13. It is our policy to never knowingly collect or maintain
            information about anyone under the age of 13, except as part of a
            specific engagement to provide professional services or for the
            purposes of ensuring compliance with our auditor independence
            policies.
          </Paragraph>
        </section>

        <hr className="my-12 border-gray-100" />

        {/* 7. Access */}
        {/* 7 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">
            7. Gaining access to personal information we hold
          </h2>

          <Paragraph>
            You can gain access to your personal information from Funera on
            request in writing, subject to some limited exceptions permitted or
            required by law. The factors that affect your right to access your
            personal information include whether:
          </Paragraph>

          <Paragraph>it is a frivolous or vexatious request;</Paragraph>
          <Paragraph>
            the information relates to a commercially sensitive decision making
            process;
          </Paragraph>
          <Paragraph>access would be unlawful;</Paragraph>
          <Paragraph>
            access would prejudice enforcement activities relating to criminal
            activities and other breaches of law; or
          </Paragraph>
          <Paragraph>
            denying access is required or authorised by or under law.
          </Paragraph>

          <Paragraph>
            If Funera denies you access, we will let you know the reason why
            access is denied.
          </Paragraph>

          <Paragraph>
            Funera may charge reasonable costs of providing you with access to
            your personal information.
          </Paragraph>
        </section>

        <hr className="my-12 border-gray-100" />

        {/* 8. Accuracy */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
            8. Keeping personal information current
          </h2>

          <Paragraph>
            If you believe that any personal information Funera has collected
            about you is inaccurate, incomplete, not up-to-date, irrelevant or
            misleading, please contact the Privacy Officer at Funera and we will
            take reasonable steps to correct it in accordance with the
            requirements of the Privacy Act.
          </Paragraph>
        </section>

        <hr className="my-12 border-gray-100" />

        {/* 9. Complaints */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
            9. Complaints
          </h2>

          <Paragraph>
            If you wish to make a complaint to Funera about our handling of your
            personal information, you can set out the details of your complaint
            in writing to the Privacy Officer at Funera. Funera will endeavour
            to respond to you within 30 days of receiving your complaint and,
            where appropriate, will advise you of the general reasons for the
            outcome of the complaint. In some circumstances, the Privacy Officer
            may decline to investigate the complaint, for example if the
            complaint relates to an act or practice that is not an interference
            of the privacy of the person making the complaint. If you are not
            satisfied with the outcome of your complaint, you can refer your
            complaint to the Office of the Australian Information Commissioner.
          </Paragraph>
        </section>

        <hr className="my-12 border-gray-100" />

        {/* 10. Contact */}
        {/* 10 */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8">10. How to contact us</h2>

          <Paragraph>If you:</Paragraph>

          <Paragraph>
            would like to access or correct your personal information;
          </Paragraph>
          <Paragraph>
            have a query in relation to this Privacy Policy;
          </Paragraph>
          <Paragraph>
            would like to make a complaint about Funera’s handling of your
            personal information; or
          </Paragraph>
          <Paragraph>
            would like to notify Funera that you no longer wish to receive
            marketing material from us please contact Funera as follows:
          </Paragraph>
        </section>
        <section className="mb-12 border border-gray-200 p-6 rounded-lg">
          <h2 className="text-2xl font-body font-bold text-gray-900 mb-6">
            Privacy Officer
          </h2>
          <h2 className="text-2xl font-body font-bold text-gray-900 mb-6">
            black Tulip Funeral
          </h2>
          <h2 className="text-2xl font-body font-bold text-gray-900 mb-6">
            New South Wales
          </h2>
          <h2 className="text-2xl font-body font-bold text-gray-900 mb-6">
            Phone: BTF Number , starts with 1300..
          </h2>
          <h2 className="text-2xl font-body font-bold text-gray-900 mb-6">
            Email: enquiries@blacktulipfunerals.com.au
          </h2>
        </section>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
