import type { StyleProp, TextStyle } from 'react-native';
import { MONEY_HELP_CENTRE_LINK } from '../../support/constants/supportLinks';

export type TextBlock = {
  text: string;
  type?: 'text' | 'link';
  url?: string;
  fontWeight?: 'semi-bold';
  extraStyles?: StyleProp<TextStyle>;
};

export type ContentItem = {
  text: string;
  textLink?: string;
  boldText?: string;
  fontWeight?: 'semi-bold';
  type?: 'text' | 'link' | 'table';
  url?: string;
  textBlocks?: TextBlock[];
  leftIndentationLevel?: 1 | 2 | 3;
  extraStyles?: StyleProp<TextStyle>;

  // List item
  showListItemSymbol?: boolean;
  listItemIndentationLevel?: 1 | 2 | 3;

  // For table only
  columns?: string[];
  rows?: string[][];
  preHeaderRow?: string[];
};

export const rebrandPrivacyPolicyContent: ContentItem[] = [
  {
    text: 'By clicking "Accept", you acknowledge our ',
    type: 'text',
    url: 'https://employmenthero.com/legals/privacy-policy/',
    textLink: 'Privacy Policy.',
  },
];

export const rebrandTermsAndConditionsContent: ContentItem[] = [
  {
    text: 'By clicking "Accept", you acknowledge our ',
    type: 'text',
    url: 'https://employmenthero.com/legals/swag-spend-account-au/',
    textLink: 'Spend Account Terms and Conditions.',
  },
];

export const privacyPolicyContent: ContentItem[] = [
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '01. Overview',
    type: 'text',
  },
  {
    text: 'Welcome to Employment Hero! We value the trust you place in us when providing us with your Personal Information, and we aim to protect your information to the highest of standards as we provide our products and services to you.',
    type: 'text',
  },
  {
    text: 'It is important for users of the Swag app to know that ‘Swag’ is a brand created by Employment Hero, and this Privacy Policy also applies to the Personal Information you provide to us when using the Swag app.',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '02. Scope',
    type: 'text',
  },
  {
    text: '',
    type: 'text',
    textBlocks: [
      {
        text: 'At Employment Hero, we are committed to safeguarding the privacy of our customers and end-users (“',
        type: 'text',
      },
      {
        text: 'you',
        fontWeight: 'semi-bold',
        type: 'text',
      },
      {
        text: '” or “',
        type: 'text',
      },
      {
        text: 'your',
        fontWeight: 'semi-bold',
        type: 'text',
      },
      {
        text: '”) who visit our websites, use our Services (including any financial services products and any other apps or services we may offer), or engage with us in any way including participating in any of our events or promotions.',
        type: 'text',
      },
    ],
  },
  {
    text: 'This Privacy Policy applies to all Personal Information that we collect, use, or disclose when providing the websites, platforms, apps, products, and services owned or operated by us, including in relation to the following:',
    type: 'text',
  },
  {
    text: 'Swag app',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: '',
    textBlocks: [
      {
        text: 'Employment Hero HR and Payroll Platform and its app (',
        type: 'text',
      },
      {
        text: 'Employment Hero Platform',
        fontWeight: 'semi-bold',
        type: 'text',
      },
      {
        text: ')',
        type: 'text',
      },
    ],
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: '',
    textBlocks: [
      {
        text: 'Applicant Tracking System (',
        type: 'text',
      },
      {
        text: 'ATS',
        fontWeight: 'semi-bold',
        type: 'text',
      },
      {
        text: ') (also known as the Career Pillar in the Swag app)',
        type: 'text',
      },
    ],
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'Global Teams employer of record services',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'Hero Passport',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: '',
    textBlocks: [
      {
        text: '(together, known as the “',
        type: 'text',
      },
      {
        text: 'Services',
        fontWeight: 'semi-bold',
        type: 'text',
      },
      {
        text: '”)',
        type: 'text',
      },
    ],
    type: 'text',
  },
  {
    text: 'By providing Personal Information to us, or using our Services, you consent to our collection, use and disclosure of your Personal Information in accordance with this Privacy Policy and any collection notices provided to you from time to time.',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '03. Privacy Policy Amendment',
    type: 'text',
  },
  {
    text: 'We may change our Privacy Policy from time to time by publishing changes to it on our website. These changes will apply to your use of our Services from the date of publication. We encourage you to check our website periodically to ensure that you are aware of our current Privacy Policy.',
    type: 'text',
  },
  {
    text: 'If the changes to our Privacy Policy is significant and you have an account with us, we will let you know through your account or by email.',
    type: 'text',
  },
  {
    text: 'View archived versions here',
    url: 'https://employmenthero.com/legals/privacy-policy/archived/',
    type: 'link',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '04. Who are we?',
    type: 'text',
  },
  {
    text: '',
    textBlocks: [
      {
        text: 'In this policy, “',
        type: 'text',
      },
      {
        text: 'Employment Hero',
        fontWeight: 'semi-bold',
        type: 'text',
      },
      {
        text: ', “',
        type: 'text',
      },
      {
        text: 'we',
        fontWeight: 'semi-bold',
        type: 'text',
      },
      {
        text: '”, “',
        type: 'text',
      },
      {
        text: 'us',
        fontWeight: 'semi-bold',
        type: 'text',
      },
      {
        text: '” or “',
        type: 'text',
      },
      {
        text: 'our',
        fontWeight: 'semi-bold',
        type: 'text',
      },
      {
        text: '” means ',
        type: 'text',
      },
      {
        text: 'Employment Hero Pty Ltd',
        fontWeight: 'semi-bold',
        type: 'text',
      },
      {
        text: '. If you want to know who we are, please see our list of Employment Hero affiliates ',
        type: 'text',
      },
    ],
    type: 'text',
    url: 'https://employmenthero.com/legals/data-processing/affiliates/',
    textLink: 'here.',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '05. What is Personal Information?',
    type: 'text',
  },
  {
    text: 'The term “Personal Information” means any information, opinion, or data that we collect about an individual where that individual is identified or where that individual is reasonably identifiable. It also includes “personal data”, or similar terms as defined in any applicable privacy or data protection laws.',
    type: 'text',
  },
  {
    text: '“Personal Information” is information or opinions about you which:',
    type: 'text',
  },
  {
    text: 'can be used to identify, contact, or locate you; or',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'can be combined with other information that is linked to you.',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: `If you can't be identified (for example, when Personal Information has been aggregated and anonymised) then this notice doesn't apply.`,
    type: 'text',
  },
  {
    text: `A subset of Personal Information is “Sensitive Information”. Sensitive information includes information or an opinion about a person's race, gender diversity, sexual orientation, disability, ethnic origin, political opinions, membership of a political association, membership of a professional or trade association, heath, religious or philosophical beliefs, and criminal history.`,
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '06. What Personal Information do we collect?',
    type: 'text',
  },
  {
    text: 'The types of Personal Information we may collect, and hold will vary depending on your dealings with us through your use of our Services.',
    type: 'text',
  },
  {
    text: `We may collect, use, or disclose Sensitive Information with your consent when providing our Services to you. We may also process your 'Sensitive Information' held in the documents uploaded to our platforms or apps by or on behalf of you.`,
    type: 'text',
  },
  {
    text: 'By providing Personal Information including Sensitive Information to us or consenting to a third party providing such information to us, you consent to our collection and use of that information as set out in this Privacy Policy.',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: 'a) Personal Information we collect when you use our Services',
    type: 'text',
  },
  {
    text: 'We may collect Personal Information from you as a customer or end-user of our Services. Personal Information we collect when you use these Services may include, but is not limited to, the following:',
    type: 'text',
  },
  {
    text: 'including name, date of birth, age, gender, sex, marital status, and profile photo;',
    type: 'text',
    boldText: 'individual information ',
    fontWeight: 'semi-bold',
    showListItemSymbol: true,
  },
  {
    text: 'including company or business name, and other information regarding your business and/or employees that can be used to identify an individual;',
    type: 'text',
    boldText: 'business information ',
    fontWeight: 'semi-bold',
    showListItemSymbol: true,
  },
  {
    text: 'including residential and/or postal address, email address, telephone number, and social media handles;',
    type: 'text',
    boldText: 'contact information ',
    fontWeight: 'semi-bold',
    showListItemSymbol: true,
  },
  {
    text: 'including occupation or job title, information relating to your current employer, information relating to your former employer and role, key dates relating to your current role and/or past roles, superannuation information, salary and/or pension details including documents such as payslips and payment summaries, timesheets, performance reviews and workplace engagement information, citizenship and visa status for work eligibility purposes, emergency contact information, and tax information;',
    type: 'text',
    boldText: 'current and past employment related information ',
    fontWeight: 'semi-bold',
    showListItemSymbol: true,
  },
  {
    text: '',
    textBlocks: [
      {
        text: 'including CV, cover letter, profile photo, work preferences, salary expectations, education history, work history, qualifications, languages, references (if you are applying for a role with Employment Hero or our affiliates, please refer to our ',
        type: 'text',
      },
      {
        text: 'Applicant Privacy Policy',
        url: 'https://employmenthero.com/legals/privacy-policy/applicant-policy/',
        type: 'link',
      },
      {
        text: ');',
        type: 'text',
      },
    ],
    type: 'text',
    boldText: 'job application related information ',
    fontWeight: 'semi-bold',
    showListItemSymbol: true,
  },
  {
    text: 'including job vacancy details, profile photo, company details relevant to the job posting such as work location and contact emails, and the name and contact details of any personnel involved in the recruitment process;',
    type: 'text',
    boldText: 'recruitment related information ',
    fontWeight: 'semi-bold',
    showListItemSymbol: true,
  },
  {
    text: 'including payment details such as banking, or debit/credit card details; and',
    type: 'text',
    boldText: 'billing information ',
    fontWeight: 'semi-bold',
    showListItemSymbol: true,
  },
  {
    text: 'including health or disability information, biometric information, immigration information, criminal history and background checks, and any diversity related information such as racial and/or ethnic origin.',
    type: 'text',
    boldText: 'Sensitive Information ',
    fontWeight: 'semi-bold',
    showListItemSymbol: true,
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText:
      'b) Personal Information we may collect when providing additional products and services through our Services may further include, without limitation:',
    type: 'text',
  },
  {
    text: 'group certificates, payslips, and other income or earnings information;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'proof of identity documentation, such as passports, drivers licence, Medicare number and birth certificates;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'financial information, including but not limited to, home loans, credit cards, vehicle loans and personal loans;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'utility bills including internet services;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'health and life insurance policy statements;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'information relevant to your lifestyle options including but not limited to, health and fitness information, entertainment services and mobile services;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'information relevant to your financial needs and objectives;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'information relevant to your assets and liabilities, income, and expenses; and',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'information relevant to your investment preferences and attitude or tolerance to risk.',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: 'c) Personal Information we collect from your other interactions with us',
    type: 'text',
  },
  {
    text: 'We collect Personal Information when you interact with us, such as when you use our websites, communicate with us via email, telephone, social media or chatbots, make enquiries regarding demos, or when we collect feedback from you on the Services we provide. The Personal Information we may collect in these circumstances include individual or business name, address, email, phone number, company/employer, job function, team size, the date, time, and reason for contacting us, survey and research responses, social media information, and call recordings.',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: 'd) Personal Information we collect from you automatically',
    type: 'text',
  },
  {
    text: 'We automatically collect usage information when you browse our websites or use our Services to improve our Services and enhance your user experience. This information includes digital interactions data, i.e., how you use our digital properties (including our websites, third-party websites, social media sites, apps and electronic communications), metadata (collected on an anonymous basis), consumer analytic data (collected on an anonymous basis but which can be attributed to you based on other information we have about you), log file information, information about the type of device and operating system used by you, location information, computer IP addresses, and marketing and cookie preferences, including any consent you have given us.',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: 'e) Personal Information we collect from you about third parties',
    type: 'text',
  },
  {
    text: 'From time to time, you may provide us, and we may collect from you, Personal Information of or about a third party (for example, information you put into our platforms and apps as an employer on behalf of your employees). When you provide the Personal Information of a third party, it is your responsibility to ensure that the necessary consent has been acquired or other lawful basis is relied on, and that those individuals are aware of this Privacy Policy, and that they understand it and agree to accept it.',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '07. How is your Personal Information collected?',
    type: 'text',
  },
  {
    text: 'We only collect the Personal Information that you give us when you use our Services, and through your other interactions with us. We may also collect your Personal Information from third parties where it is necessary for the purposes of providing our Services to you.',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: 'a) Collection of Personal Information directly from you',
    type: 'text',
  },
  {
    text: 'We collect Personal Information directly from you:',
    type: 'text',
  },
  {
    text: 'when you use our Services, and/or interact with our websites, platforms, and apps, such as when you input your details or upload documents into your account through use of our platforms and apps;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'by dealing with you in person or over the phone, for example when asking for contact details from you so you can sign up to a free trial, or request support;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'virtually through electronic communications including emails, SMS, or video conference, or through our, platforms, apps, social media platforms, and websites, including through the use of sign-up features and chatbots; and',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'when you fill out and submit registration forms, and customer feedback or survey forms.',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: 'b) Collection of Personal Information from third parties',
    type: 'text',
  },
  {
    text: 'We may collect Personal Information about you from third parties in the process of providing our Services to you in the following ways:',
    type: 'text',
  },
  {
    text: 'if you are an individual employed through our Global Teams employer of record services, we may collect Personal Information from the party that has engaged us as a Global Teams employer of record services customer;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'if you have subscribed to our ATS services, we may collect Personal Information about you from the job poster or the job applicant (depending on which role you represent), through third-party job application platforms which are integrated with the ATS service, or through in-app communications; and',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'we may receive Personal Information about you from your superannuation fund when verifying your membership with them and providing our Superannuation services to you.',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'We may also collect your Personal Information from third parties where you have provided consent, or where such Personal Information is provided under a legal basis. This includes, but is not limited to, circumstances where an employer provides information about employees through our platforms or apps. This also includes where Personal Information is collected through third-party APIs, or by third party service providers including social media sites who are permitted to disclose that information to us to support our delivery of Services or direct marketing activities.',
    type: 'text',
  },
  {
    text: 'We may also collect Personal Information about you through our Related Bodies Corporate or affiliates.',
    type: 'text',
  },
  {
    text: 'If someone has entered your Personal Information onto our platforms or apps on your behalf, you’ll need to contact that user for any questions you have about your Personal Information (including when you want to access, correct, amend, the information, or request that the user delete your Personal Information).',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '08. How we use your Personal Information',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: 'a) How your Personal Information is used in the general provision of our Services',
    type: 'text',
  },
  {
    text: 'The primary purpose for which we collect Personal Information about you is to enable us to perform our business activities and provide our Services to you. We collect, hold, use, and disclose your Personal Information for the following purposes:',
    type: 'text',
  },
  {
    text: 'to provide our Services to you, including our Employment Hero Platform, Hero Passport, ATS services, and Global Teams employer of record services;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'to manage and enhance our Services, to personalise and customise your experience with our Services, and to provide you with any necessary support to receive our Services;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'to provide you with information about our existing and new products and services (including for direct marketing purposes as described below);',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'to verify your identity and enable us to monitor suspicious or fraudulent activity;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'to investigate any complaints made by you, or made about you;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'to investigate any suspected breach of any of our terms and conditions or unlawful activity engaged in by you;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'for any other purpose we reveal to you at the time of collection; and',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'to meet our obligations and exercise our rights under applicable laws.',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'We may use Personal Information for the purpose of allowing third parties to provide additional products and services to you where you made such a request or have given us consent to do so.',
    type: 'text',
  },
  {
    text: 'If you do not provide us with the Personal Information described in this policy:',
    type: 'text',
  },
  {
    text: 'we may not be able to provide you with information about our Services that you requested;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'we may not be able to provide you with a subscription and access to our Services that you requested; and',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'we may not be unable to tailor the content of our Services to your preferences and your experience of our Services may not meet your desired needs.',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: 'b) How your Personal Information is used in providing Superannuation services',
    type: 'text',
  },
  {
    text: 'Where we have a relationship with your superannuation fund, we make the services of superannuation funds accessible to you through the Employment Hero Platform (Superannuation services). We make no representations or warranties in relation to the privacy practices of any superannuation fund. Superannuation fund websites are responsible for informing you about their own privacy practices and policies. Our Superannuation services will include providing you with a link to connect with, and access, the services of your superannuation fund.',
    type: 'text',
  },
  {
    text: 'Where you have subscribed to our Superannuation services, we may collect, hold, use, and disclose your Personal Information to allow our partner superannuation funds to check your membership with them. If your membership with a partner superannuation fund is verified, then we will only continue to use your Personal Information to provide you with access to the services of your chosen superannuation fund and provide other related products and services to you.',
    type: 'text',
  },
  {
    text: 'You can opt out of receiving access to these Superannuation services at any time by unsubscribing from the service through the Employment Hero Platform, or our related apps.',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '09. How can we share your Personal Information',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: 'a) Sharing of Personal Information when providing our Services',
    type: 'text',
  },
  {
    text: 'We may share your Personal information with our affiliates and with other third parties from time to time for the purposes and means described in this Privacy Policy. In delivering our Services, we may disclose your Personal Information to:',
    type: 'text',
  },
  {
    text: 'our employees, Related Bodies Corporate (see list of affiliates page), contractors for the purposes of the delivery and operation of our Services, and fulfilling requests by you;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'our Related Bodies Corporate for the purposes of the delivery of their services to you where you have subscribed to their services, or where they integrate with us to provide our Services;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'our existing or potential agents, business partners or joint venture entities or partners to enable us to perform our business activities and provide our products and services to you;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'relevant authorities and institutions including the tax authorities, payroll providers, banks, financial institutions and superannuation providers in connection with the provision of our Services or if required by law;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'relevant third parties in connection with or contemplation of (including as part of due diligence process) any merger, acquisition, reorganisation, financing, sale of assets or insolvency event involving us or our affiliates;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'your employer, if you use our Services in connection with your employment and your employer has established an account on your behalf;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'sharing aggregated data or data that has been stripped of personally identifying characteristics with third parties; and',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'the police, any relevant authority or enforcement body, or your Internet Service Provider or network administrator if required by law or we consider it necessary for the protection of our systems or for the prevention or detection of illegal activity.',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: 'b) Sharing of Personal Information specific to our Applicant Tracking System (ATS)',
    type: 'text',
  },
  {
    text: 'To provide our ATS services, we facilitate the connection between job posters and job applicants to assist in the recruitment process and help businesses attract talent. In providing this service, we share your Personal Information with job posters where you are an applicant under this service, or to applicants where you are a job poster under this service.',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: 'c) Sharing of Personal Information specific to our Global Teams employer of record services',
    type: 'text',
  },
  {
    text: 'To provide our Global Teams employer of record services, we act as the employer of record for employees who offer their skills and services to our customer. To provide this service and facilitate the relationship between our customer and the employee, we may share Personal Information of each party with the other. This means that if you are a customer under this service, we may share your Personal Information with the employee, and if you are an employee under this service, we may share your Personal Information with the customer.',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: 'd) Sharing your Personal Information with third parties',
    type: 'text',
  },
  {
    text: 'We may disclose your Personal Information to specific third-party service providers who facilitate the delivery of our Services and operation of our business activities. We disclose your Personal Information to such third parties as doing so may be necessary to adequately provide our Services to you, or to assist us in analysing how our Services are used and ensure they are provided to you at the highest quality. These third parties are given access to your Personal Information only to perform these tasks on our behalf or for our benefit and are required not to disclose or use it for any other purpose.',
    type: 'text',
  },
  {
    text: '',
    textBlocks: [
      {
        text: 'We share your Personal Information with our payments partner, Hay Ltd (',
        type: 'text',
      },
      {
        text: 'Hay',
        fontWeight: 'semi-bold',
        type: 'text',
      },
      {
        text: '), so that you can apply for non-cash payment products that they issue. If we, or Hay, share your information with third party organisations (including those based in the US and UK) for the purpose of providing risk assessments and transaction monitoring (PEP and sanctions checking), it will only be related to the provision of the product provided by us via the Swag app that contains the spend account and Swag debit card (',
        type: 'text',
      },
      {
        text: 'Swag Spend',
        fontWeight: 'semi-bold',
        type: 'text',
      },
      {
        text: '). We also share your Personal Information with third parties to verify your identity for the purposes of providing you with Swag Spend.',
        type: 'text',
      },
    ],
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText:
      'e) Sharing of Personal Information with Superannuation funds (when providing our Superannuation services)',
    type: 'text',
  },
  {
    text: 'We provide Personal Information and Sensitive Information to Employment Hero Financial Services Pty Ltd to provide users of our platforms and apps with the ability to choose, retain or engage with superannuation funds.',
    type: 'text',
  },
  {
    text: 'If you have subscribed to our Superannuation services, we may provide your Personal Information to our partner superannuation funds to check your membership with them (provided that you have given us consent to disclose your Personal Information to the superannuation funds). Upon your verification as a member of a superannuation fund, we will continue sharing your Personal Information with your chosen superannuation fund (including changes to your personal details, employment changes, life event information and other matters) only in connection with providing you access to their services.',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '10. Overseas disclosure of Personal Information',
    type: 'text',
  },
  {
    text: 'We may disclose your Personal Information to recipients located outside Australia, including our affiliates located in New Zealand, Singapore, United Kingdom, Malaysia, the Philippines, and Vietnam, and third-party service providers located globally, where it is deemed reasonably necessary for us to make such disclosure. Where we disclose Personal Information to overseas parties, we will ensure that the overseas recipient complies with the APP guidelines when dealing with the Personal Information, and we put safeguards in place to ensure your Personal Information remains protected.',
    type: 'text',
  },
  {
    text: 'When we disclose Personal Information overseas, we take measures to ensure your information is treated in accordance with at least the standards that apply in the country whose privacy or data protection laws apply to that Personal Information (other than when compelled to make disclosure under local laws).',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '11. Do we use your Personal Information for Direct Marketing?',
    type: 'text',
  },
  {
    text: 'We may use Personal Information for direct marketing reasons by providing you news or information about our Services that you either request from us, or we believe may interest you. These communications may be sent in various forms, including mail, social media, SMS, or email.',
    type: 'text',
  },
  {
    text: 'Where you have subscribed to our Superannuation services, we may use your Personal information to directly market the products and services of your superannuation fund which we believe may be of interest to you.',
    type: 'text',
  },
  {
    text: 'You can opt out of receiving our direct marketing communications at any time by using any of our unsubscribe or opt-out mechanisms provided within our method of communication to you, or by contacting ',
    type: 'text',
  },
  {
    text: 'privacy@employmenthero.com',
    type: 'link',
  },
  {
    text: 'We may still send you transactional or administrative communications related to our Services even after you have opted out of receiving marketing communications.',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '12. Storage & Security of Personal Information',
    type: 'text',
  },
  {
    text: 'Personal information held by us will be stored and managed by our third-party suppliers who store data on secure data centres. Further details on our third-party storage provider’s location and security can be found ',
    type: 'text',
    url: 'https://aws.amazon.com/security/',
    textLink: 'here',
  },
  {
    text: 'While we take all reasonable steps to ensure the security of our system, we cannot provide any guarantee regarding security of the Personal Information and other data transmitted to the Services and we will not be held responsible for events arising from unauthorised access of your Personal Information.',
    type: 'text',
  },
  {
    text: 'You can also play an important role in keeping your Personal Information secure, by maintaining the confidentiality of any password and accounts used on the Services. Please notify us immediately if there is any unauthorised use of your account by any other Internet user, or any other breach of security relating to your account via email at',
    type: 'text',
  },
  {
    text: 'privacy@employmenthero.com',
    type: 'link',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '13. GDPR Compliance',
    type: 'text',
  },
  {
    text: 'Our processing of your Personal Information may at times be covered by the General Data Protection Regulation of the European Union (EU GDPR) and/or the General Data Protection Regulation of the United Kingdom (UK GDPR). Where our processing of Personal Information is covered by the EU GDPR and/or the UK GDPR, please refer to the following privacy policy:',
    type: 'text',
  },
  {
    text: 'EU/UK Privacy Policy',
    url: 'https://employmenthero.com/legals/privacy-policy/eu/',
    type: 'link',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '14. Cookies and statistical analysis',
    type: 'text',
  },
  {
    text: 'The Services we provide use cookies which are small text files containing a string of alphanumeric characters which are sent to your computer that uniquely identifies your browser and lets us enhance your experience when using our Services such as helping you with logging in more efficiently, enhancing your navigation through our Services, and generally improving the user experience. Cookies also convey information to us about how you use our Services. When you use our Services, certain information may be recorded for statistical purposes. The information that may be recorded includes information regarding your:',
    type: 'text',
  },
  {
    text: 'server address;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'domain name;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'date and time of visit;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'previous websites visited; and',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'browser type.',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'You can also read our  ',
    type: 'text',
  },
  {
    text: 'Cookie Policy',
    url: "https://employmenthero.com/legals/cookie-policy/#:~:text=Manage%20my%20cookies-,What%20are%20Cookies%3F,on%20your%20computer's%20hard%20drive.",
    type: 'link',
  },
  {
    text: 'to further understand how cookies may be used to collect and use your Personal Information.',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '15. Third-Party Links',
    type: 'text',
  },
  {
    text: 'The Services may contain links to other websites operated by third parties. We make no representations or warranties in relation to the privacy practices of any third-party website. Third-party websites are responsible for informing you about their own privacy practices and policies.',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '16. Google API policies',
    type: 'text',
  },
  {
    text: 'Our use of information received from Google APIs will adhere to the ',
    type: 'text',
  },
  {
    text: 'Google API Services User Data Policy, ',
    url: 'https://developers.google.com/terms/api-services-user-data-policy',
    type: 'link',
  },
  {
    text: 'including the Limited Use requirements.',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '17. Access to, and correction or deletion of your Personal Information',
    type: 'text',
  },
  {
    text: 'We will endeavour at all times to maintain an accurate record of your Personal information. To assist us in keeping our records up to date, you should ensure all Personal Information provided to us is accurate and up to date, and to notify us of changes where appropriate.',
    type: 'text',
  },
  {
    text: 'You have the right to access the Personal Information which we hold about you and for corrections to be made to this information. If you wish to verify or correct any of the details you have submitted to us, you may do so by contacting us via email at ',
    type: 'text',
  },
  {
    text: 'privacy@employmenthero.com',
    type: 'link',
  },
  {
    text: 'There are some circumstances in which we are not required to give you access to your Personal Information.',
    type: 'text',
  },
  {
    text: 'Contact us via email at',
    type: 'text',
  },
  {
    text: 'privacy@employmenthero.com',
    type: 'link',
  },
  {
    text: 'to request deletion of your user account and/or data. As soon as practicable after your request, we will take reasonable steps to delete your information from our systems and will provide your request to any relevant sub-processors. These steps will not include deleting any information stored in our system backups.',
    type: 'text',
  },
  {
    text: 'If you are an employee whose Personal Information has been uploaded to our platforms or apps by your employer, you may need to ask your employer to delete the Personal Information on your behalf. Your employer will then request us to delete it from our systems.',
    type: 'text',
  },
  {
    text: 'Our security procedures mean that we may request proof of identity before we reveal Personal Information. This proof of identity will take the form of your e-mail address and password submitted upon registration. You must therefore keep this information safe as you will be responsible for any action which we take in response to a request from someone using your email and password.',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '18. Retention',
    type: 'text',
  },
  {
    text: 'The length of time we keep your Personal Information depends on what it is and whether we have an ongoing business need to retain it (for example, to provide you with a service you’ve requested or to comply with applicable legal, tax or accounting requirements).',
    type: 'text',
  },
  {
    text: 'We’ll retain your Personal Information for as long as we have a relationship with you and for a period of time afterwards where we have an ongoing business need to retain it, in accordance with our data retention policy and practices. Following that period, we’ll make sure it’s deleted or anonymised.',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '19. Enforcement and complaints',
    type: 'text',
  },
  {
    text: 'We regularly review our compliance with this Privacy Policy as well as under applicable privacy laws. If you have a complaint regarding this Privacy Policy or any breach of applicable privacy laws, please contact us via email at',
    type: 'text',
  },
  {
    text: 'privacy@employmenthero.com',
    type: 'link',
  },
  {
    text: 'Once we receive a complaint, we will commence an investigation as soon as practicable. We may contact you during the process to seek any further clarification if necessary. We will also contact you to inform you of the outcome of the investigation and if appropriate to confirm how we will comply with our obligations under the Privacy laws in relation to a notifiable data breach.',
    type: 'text',
  },
  {
    text: 'We will aim to ensure that all questions and concerns are resolved in a timely and appropriate manner. If you are not satisfied with the outcome of your complaint, or require further information on privacy, you are entitled to contact your local data protection supervisory authority.',
    type: 'text',
  },
  {
    text: 'The supervisory authority that applies to customers and users in Australia is set out below:',
    type: 'text',
  },
  {
    text: 'Australia - Office of the Australian Information Commissioner',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'www.oaic.gov.au',
    type: 'link',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '20. Contact us',
    type: 'text',
  },
  {
    text: 'Any questions or concerns that you have regarding our Privacy Policy or a breach of any applicable privacy or data protection laws should be directed to ',
    type: 'text',
  },
  {
    text: 'privacy@employmenthero.com',
    type: 'link',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '21. Our other Privacy Policies',
    type: 'text',
  },
  {
    text: 'Applicant Privacy Policy',
    url: 'https://employmenthero.com/legals/privacy-policy/applicant-policy/',
    type: 'link',
  },
  {
    text: 'Data Processing Agreement',
    url: 'https://employmenthero.com/legals/data-processing/',
    type: 'link',
  },
];

export const termsAndConditionsContent: ContentItem[] = [
  {
    text: '',
    type: 'text',
    boldText: '01. About',
    fontWeight: 'semi-bold',
  },
  {
    text: 'These Terms and Conditions (Terms) are our agreement with you about the use of your Swag Visa Debit Card and Swag Account. If you commence using the Swag Visa Debit Card and Swag Account you will be deemed to have read, understood, and accept these terms in relation to and Swag Visa Debit Card and Swag Account. It is called acceptance by conduct. It does not require your signature to be binding.',
    type: 'text',
  },
  {
    text: 'It is important that you understand these Terms because they set out our agreement on what will happen with things like how we use your information, security, fees and charges and limits.',
    type: 'text',
  },
  {
    text: 'Please also carefully read the Product Disclosure Statement (PDS) you were provided with when you applied for the Swag Visa Debit Card and Swag Account as these Terms form part of the PDS and together form our agreement with you for use of the Swag Visa Debit Card and Swag Account. You can find the PDS here:',
    type: 'text',
  },
  {
    text: 'https://employmenthero.com/legals/swag-spend-account/pds/',
    type: 'link',
  },
  {
    text: `Please contact the Swag Spend Support Team if you don't understand anything in this document and we can explain things further for you.`,
    type: 'text',
  },
  {
    text: '',
    type: 'text',
    boldText: 'Swag Spend Support Team:',
    fontWeight: 'semi-bold',
  },
  {
    text: '',
    type: 'text',
    boldText: '9am - 5pm, Monday to Friday',
    fontWeight: 'semi-bold',
  },
  {
    text: '',
    type: 'text',
    showListItemSymbol: true,
    boldText: 'Email: swagspendhelp@employmenthero.com',
    fontWeight: 'semi-bold',
  },
  {
    text: '',
    showListItemSymbol: true,
    boldText: 'App: Swag App > Money > Support > Visit our Help Centre',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: '',
    showListItemSymbol: true,
    boldText: 'Website: ',
    fontWeight: 'semi-bold',
    textLink: 'http://www.swagapp.com/money',
    type: 'text',
  },
  {
    text: '',
    type: 'text',
    boldText: '02. Meaning of words',
    fontWeight: 'semi-bold',
  },
  {
    text: 'In these Terms, words that commence with a capital letter have the following meaning:',
    type: 'text',
  },
  {
    text: ' means the symbols Visa uses at merchants and ATMs to inform Cardholders their Card can be used to make purchases or cash withdrawals.',
    boldText: 'Acceptance Brand',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: ' means the person in whose name a virtual Swag Account is held by Hay.',
    boldText: 'Account holder',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: ' means any day other than a Saturday, Sunday or public holiday, national and or in Sydney, NSW, Australia, and the 27th and 31st December each year.',
    boldText: 'Business Day',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: ' means the person to whom a Swag Visa Debit Card is issued by Hay.',
    boldText: 'Cardholder',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: ' means any equipment (electronic or otherwise) or artifact designed to be used to access your account.',
    boldText: 'Device',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: ' means an action initiated by us or by a Cardholder that results in all transactions on the Swag Account and Swag Visa Debit Card being suspended pending investigation and or instructions to Enable.',
    boldText: 'Disable',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: ' means Employment Hero Financial Services Pty Ltd ACN 606 879 663 of Level 2/439-441 Kent Street, Sydney NSW 2000 as the authorised corporate representative (authorised representative number 001234046).',
    boldText: 'Employment Hero',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: ' means the releasing of the Disable either at a conclusion of an investigation by us or on instructions of the Cardholder.',
    boldText: 'Enable',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: ' means Hay Limited ABN 34 629 037 403 Australian Financial Services Licence No. 515459 (also referred to as we or us).',
    boldText: 'Hay',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: ' means Hay Limited ABN 34 629 037 403 Australian Financial Services Licence No. 515459 as the Issuer of both the Swag Visa Debit Card and Swag Account.',
    boldText: 'Issuer',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: ' means authorised vendors who are able to accept and process a Visa Debit card.',
    boldText: 'Merchant',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: ' means the 6-digit code you nominate to protect access to the Swag App.',
    boldText: 'Passcode',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: ` means a payment from your Swag Account to another person's account with an Australian Financial Institution by using the BSB and account number of the person to whom you are making the payment.`,
    boldText: 'Pay Anyone',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: ' means personal identification number and the set of digits used to protect access to your Swag Visa Debit Card which is created by you when signing up to Swag Account.',
    boldText: 'PIN',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: ' means a purchase transaction of goods and or services using the Swag Visa Debit Card at a Merchant.',
    boldText: 'Purchase Transaction',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: ' means the digital (virtual) account held by Hay to which the Accountholder can deposit funds and to which the Swag Visa Debit Card is linked to.',
    boldText: 'Swag Spend account',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: ' means the mobile application Employment Hero has developed to support the Swag Spend offer.',
    boldText: 'Swag App',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: ' means the dollar value (in AUD) that is available in your Swag Account at a particular point in time which you can view by using the Swag App and which you can utilise by using the Swag Visa Debit Card.',
    boldText: 'Spend Balance',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: ' means the product offered by Employment Hero that contains the Swag Visa Debit Card and Swag Account that consumers can open and operate.',
    boldText: 'Swag Spend',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: ' means a physical Visa debit card that is issued by Hay, and which is linked to the Swag Account.',
    boldText: 'Swag Visa Debit Card',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: ' means the detail and rules that apply to the opening, fulfillment and use the Swag Visa Debit Card and Swag Account. They are an essential part of a contract between the Cardholder and Hay Limited as the Visa Debit card Issuer.',
    boldText: 'Terms and Conditions',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: ` means a transaction which you haven't authorised and without your knowledge and consent.`,
    boldText: 'Unauthorised Transactions',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: ' means Visa Worldwide PTE Ltd.',
    boldText: 'Visa',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: ' means authorised physical or digital cards with the Visa Acceptance Brand or markings.',
    boldText: 'Visa Debit',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: '',
    boldText: '03. The Swag Visa Debit Card and Swag Spend account',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: 'When you are issued with a Swag Visa Debit Card you will receive a physical card which is linked to your Swag Account, and which can be viewed using the Swag App. Once you deposit funds into your Swag Account, you can access these funds to conduct a Purchase Transaction, Pay Anyone, or a cash withdrawal by using the Swag Visa Debit Card anywhere in the world where Visa Debit cards are accepted.',
    type: 'text',
  },
  {
    text: 'You can view your Spend Balance at any time by using the Swag App. The Swag Account is not a bank account.',
    type: 'text',
  },
  {
    text: 'You can use the Swag Visa Debit Card to withdraw cash at ATMs (note there is a daily limit that applies (see clause 7.2). Your Swag Visa Debit Card is linked to your Swag Account and can access the Spend Balance. You can make Pay Anyone transactions from your Swag Account via the Swag App.',
    type: 'text',
  },
  {
    text: 'You can only access the Spend Balance. Hay does not offer a credit facility and overdrawing the Spend Balance in the Swag Account is strictly prohibited. We reserve to decline any transaction request the result of which will exceed the Spend Balance in the Swag Account.',
    type: 'text',
  },
  {
    text: '',
    boldText: '04. Eligibility',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: 'You will need to satisfy specific eligibility criteria to maintain this product. To qualify, you must:',
    type: 'text',
  },
  {
    text: 'Be an individual person; and',
    showListItemSymbol: true,
    type: 'text',
  },
  {
    text: 'Be aged 16 years or older; and',
    showListItemSymbol: true,
    type: 'text',
  },
  {
    text: 'Have a valid Australian residential address.',
    showListItemSymbol: true,
    type: 'text',
  },
  {
    text: '',
    boldText: '05. Anti-Money Laundering and Counter-Terrorist Financing',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: 'As an issuer of the Swag Account and Swag Visa Debit Card, we must comply with the Anti-money Laundering and Counter-terrorism Financing Act 2006 (Cth) (AML Act) and its related Regulations. There are several obligations under the AML Act which we must comply with including know your customer and certain reporting obligations.',
    type: 'text',
  },
  {
    text: `Accordingly, as part of the application process we will require evidence of who you are and where you live. As part of our legal obligations, we need to verify this information and accordingly, we check the information you provide against records maintained by credit reporting and fraud prevention agencies/ organisations. However, we don't perform a credit check on you and the searches we perform are only for verifying your identity.`,
    type: 'text',
  },
  {
    text: 'You must let us know as soon as possible when any of your details change.',
    type: 'text',
  },
  {
    text: 'We may need to block, delay, Disable or refuse transactions or suspend or close your Swag Account where we reasonably consider that a transaction is fraudulent or in breach of the AML Act or where we have concerns regarding your money laundering or terrorism financing risk. We must block the Swag Account and Swag Visa Debit Card until we verify your identity. We are not responsible for any loss that arises where this occurs. Where we can, we will let you know why we have stopped the transaction or Disabled the Swag Account. However, in some cases our legal obligations will stop us from being able to tell you and failing to inform you of the reasons is not a breach by us of these Terms.',
    type: 'text',
  },
  {
    text: '',
    boldText: '06. Activating your Swag Visa Debit Card',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: 'Once we have approved your application for a Swag Visa Debit Card and Swag Account, we will post you the Swag Visa Debit Card. Before you use your Swag Visa Debit Card for the first time you will need to Enable it in the Money section of your Swag App, under Card.',
    type: 'text',
  },
  {
    text: '',
    boldText: '07. Using your Swag Visa Debit Card',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: '',
    boldText: '07.01 Depositing value to your Swag Account',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: 'At any time you or someone on your behalf can deposit funds to your Swag Account through the mechanism we specify from time to time. Predominantly, these deposits will occur through transferring funds electronically from another account you or someone on your behalf is holding with another financial institution.',
    type: 'text',
  },
  {
    text: 'You can find instructions for how you can deposit funds to your Swag Account in the Swag App.',
    type: 'text',
  },
  {
    text: 'We may also add new ways to deposit funds into your Swag Account in the future and we will publish these ways in the Swag App. We encourage you to check the Swag App from time to time for this and other important information.',
    type: 'text',
  },
  {
    text: 'Payments to your Swag Account will be credited to your Spend Balance when they have cleared.',
    type: 'text',
  },
  {
    text: 'Once deposits have cleared and are showing in your Swag Account as clear funds, you can use the Swag Visa Debit Card to access these funds by transacting through Merchants, Pay Anyone and or cash withdrawals at businesses that accept Visa.',
    type: 'text',
  },
  {
    text: '',
    boldText: '07.02 Limits',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: 'There are default limits that apply to the Swag Visa Debit Card and Swag Account for:',
    type: 'text',
  },
  {
    text: 'Maximum balance: $50,000',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'Minimum balance: $0 (no overdraft facility)',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'Maximum deposit per day: $25,000',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'Maximum ATM cash out per day: $500',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'Maximum Direct Debit per day: $2,000',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'Maximum single Pay Anyone transaction: $5,000',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'Maximum single Visa Debit card transaction: $10,000',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'Maximum Visa Debit card transaction per day: $10,000',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'Total daily transaction limit: available Spend Balance',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'At any time, we can adjust the limits to protect your interests or ours and if we decide to adjust the limits, we will inform you of these changes via the Swag App. Unless it is for security or financial integrity reasons, we will inform you of any changes to the daily limits in advance no less than 10 Business Days before the changes take place.',
    type: 'text',
  },
  {
    text: 'You can find the actual limits that apply to your Swag Visa Debit Card and Swag Account within the Swag App.',
    type: 'text',
  },
  {
    text: 'We will let you know via the Swag App if your limits are adjusted.',
    type: 'text',
  },
  {
    text: '',
    boldText: '07.03 ATM withdrawals',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: 'You can withdraw cash from your Spend Balance using your Swag Visa Debit Card at any ATM up to the limit that applies for ATM transactions.',
    type: 'text',
  },
  {
    text: 'There are no Hay fees for using ATMs. However, you may be charged fees by other financial institutions or ATM providers when using some ATMs.',
    type: 'text',
  },
  {
    text: '',
    boldText: '07.04 Swag Visa Debit Card transactions',
    fontWeight: 'semi-bold',
    type: 'text',
  },
  {
    text: 'You can use your Swag Visa Debit Card to make payments anywhere that Visa Debit cards are accepted.',
    type: 'text',
  },
  {
    text: 'Within Australia you can make contactless transactions under $100 without using your PIN. Contactless limits may vary in different countries. Like with any transaction, please make sure you check the amount is correct on the terminal before authorising a contactless transaction.',
    type: 'text',
  },
  {
    text: `We will deduct the amount of any transaction using your Swag Visa Debit Card from your Spend Balance. You can't stop payment on a transaction after it has been completed. For mistaken or disputed payments please refer to clause 10.`,
    type: 'text',
  },
  {
    text: 'We do not allow negative balances in your Swag Account. If you do not have sufficient balance in your Swag Account, all transactions will be denied. It is your obligation to ensure that you have sufficient Spend Balance to complete a transaction.',
    type: 'text',
  },
  {
    text: 'Sometimes a transaction cannot be processed due to reasons outside of our control, like where there are network issues which may affect the relevant payment terminal. We are not responsible when a transaction authorisation is declined for any reason.',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '07.05 Swag Account transactions',
    type: 'text',
  },
  {
    text: 'You can make Pay Anyone payments from your Swag Account using the Swag App. It is solely your responsibility to ensure that you enter the correct BSB and account information when authorising internet payments from your Swag Account. Where you enter the wrong information:',
    type: 'text',
  },
  {
    text: 'funds may be credited to the account of an unintended recipient if the BSB number and/ or identifier do not belong to the person you name as the recipient; and',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'it may not be possible to recover funds from an unintended recipient.',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '07.06 Using your Swag Visa Debit Card for foreign currency transactions',
    type: 'text',
  },
  {
    text: 'All transactions in foreign currencies will be converted into Australian dollars.',
    type: 'text',
  },
  {
    text: 'All foreign currency transactions will be processed using the foreign exchange rate determined by Visa at the time of settlement. We do not charge fees, margins, or spreads for foreign exchange payments.',
    type: 'text',
  },
  {
    text: 'The actual foreign exchange rate that has been applied will be shown in your Swag App on settlement.',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '07.07 Restrictions on use',
    type: 'text',
  },
  {
    text: 'You must not use your Swag Visa Debit Card and or the Swag Account for any illegal purpose including purchasing anything that is illegal under Australian law.',
    type: 'text',
  },
  {
    text: 'If we suspect that the Swag Account and or Swag Visa Debit Card are being used for illegal activity, we will disable the Swag Account and Swag Visa Debit Card without notice to you.',
    type: 'text',
  },
  {
    text: 'You must not allow any other person to use your Swag Account or Swag Visa Debit Card. Doing so is a breach of these Terms and entitles us to Disable your Swag Account and Swag Visa Debit Card. You will also not be able to reclaim any unauthorised transactions because you allowed someone else to use your Swag Account and Swag Visa Debit Card. You can only have one Swag Visa Debit Card at a time.',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '08. Fees',
    type: 'text',
  },
  {
    text: 'Current fees and charges that apply to your Swag Visa Debit Card and Swag Account can be found ',
    type: 'text',
    url: 'https://employmenthero.com/legals/swag-spend-account/pds/',
    textLink: 'here',
  },
  {
    text: 'We will debit your Spend Balance for any fees that are payable to us.',
    type: 'text',
  },
  {
    text: `We will let you know at least 30 days before a change takes effect through the Swag App of any fee changes so that you can stop using the Swag Visa Debit Card if you don't like our new fees.`,
    type: 'text',
  },
  {
    text: 'Merchants and financial institutions may also impose fees or surcharges which are separate to the fees and charges we charge as Issuers. We have no control over these third-party fees and cannot challenge these once a transaction is approved by you.',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '09. Security',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '09.01 Protecting your Swag Visa Debit Card information and PIN',
    type: 'text',
  },
  {
    text: 'It is important that you keep your Swag App and Swag Visa Debit Card information, PIN and Passcode secure. This means that you must not write down the PIN or the Passcode either on the Swag Visa Debit Card or on something you carry with the Swag Visa Debit Card or share your PIN or Passcode with any other person.',
    type: 'text',
  },
  {
    text: 'You must not, without proper cause, disclose the card number to any person.',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '09.02 What to do when you suspect your Swag Visa Debit Card is compromised or lost',
    type: 'text',
  },
  {
    text: `If you believe your Swag Visa Debit Card is lost (and there's a chance you'll find it) or the security of your Swag Account or Swag Visa Debit Card has been compromised, you can simply Disable your Swag Account and Swag Visa Debit Card on the Swag App. If you Disable the Swag Visa Debit Card, it will remain Disabled until you Enable it and you will not be able to use it. While the physical card is Disabled you can continue to make payments from your Swag Account.`,
    type: 'text',
  },
  {
    text: 'After you have Disabled your Swag Visa Debit Card, you will not be able to use your Swag Visa Debit Card until you Enable it.',
    type: 'text',
  },
  {
    text: 'If you believe your Swag Visa Debit Card has been lost, damaged or compromised (not just temporarily lost) then you must immediately report your Swag Visa Debit Card lost or stolen within the Swag App and request a new Swag Visa Debit Card.',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '10. Responsibility for mistaken or Unauthorised Transactions',
    type: 'text',
  },
  {
    text: 'Where you think a transaction is an Unauthorised Transaction or is otherwise incorrect, please get in touch with us immediately via the Swag App and provide as much information as you can about the relevant transaction so we can investigate further.',
    type: 'text',
  },
  {
    text: 'There are specific circumstances and time frames where we can claim a refund in connection with a disputed transaction. This means that our ability to investigate a disputed transaction is limited to the time frames imposed by payment service providers and card schemes (like Visa) that we deal with, so it is important to let us know as soon as possible after you become aware of a disputed transaction.',
    type: 'text',
  },
  {
    text: 'If you suspect that the security of your Swag Account and or Swag Visa Debit Card has been compromised, you may want to Disable your Swag Account and Swag Visa Debit Card to avoid continued unauthorised use.',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '10.01 Mistaken payment',
    type: 'text',
  },
  {
    text: `Where you make a mistake when making a payment, you must inform us as soon as you realise that a mistaken payment was made. You must provide us with sufficient details of the transaction, so we can try and trace it. We will try to reverse the transaction and retrieve your funds. However, if we can't reverse the transaction, we are not responsible, and you will be liable for the mistaken payment.`,
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '10.02 Incorrect payments/issues with a purchase',
    type: 'text',
  },
  {
    text: 'If you have a problem with a purchase made with your Swag Visa Debit Card or a disputed transaction, the first step is to get in touch with the merchant you made the purchase from.',
    type: 'text',
  },
  {
    text: 'If you cannot resolve the matter with the merchant, contact us about the disputed transaction via the Swag App.',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '11. Lost, stolen Swag Visa Debit Card or compromised PIN',
    type: 'text',
  },
  {
    text: 'You will not be responsible for Unauthorised Transactions:',
    type: 'text',
  },
  {
    text: 'that occur before your Swag Visa Debit Card is issued to you;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'that occur after you have Disabled or cancelled your Swag Visa Debit Card and while it remains Disabled; or',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: `where you didn't contribute to the Unauthorised Transaction.`,
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'We may consider that you have contributed to an Unauthorised Transaction where:',
    type: 'text',
  },
  {
    text: 'you have not kept your Swag Visa Debit Card, PIN or Passcode reasonably secured; or',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'there was an unreasonable delay in Disabling or cancelling your Swag Visa Debit Card where you believed it was lost, stolen or otherwise compromised; or',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'there was an unreasonable delay in reporting any unauthorised or mistaken payments.',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '12. Transaction history',
    type: 'text',
  },
  {
    text: 'You can view your transaction history on the Swag App at any time. We take security very seriously but please regularly check it to make sure there is nothing unusual such as:',
    type: 'text',
  },
  {
    text: `transactions you don't recognise;`,
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: `transactions you didn't authorise;`,
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'transactions where you never received the relevant goods or services;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'transactions where the purchase price differs to the purchase amount; or',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'you think a transaction may have been duplicated.',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '13. Swag Visa Debit Card cancellation',
    type: 'text',
  },
  {
    text: 'We may Disable or cancel your Swag Visa Debit Card where we have concerns about its security and or for the purpose of protecting your Spend Balance where we suspect the Swag Visa Debit Card has been compromised.',
    type: 'text',
  },
  {
    text: `If we become aware that you haven't done what you've agreed to do as set out in these Terms we may Disable or cancel your Swag Account. If this happens, we will let you know as soon as possible and refund your Spend Balance to your nominated account.`,
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '14. Swag Visa Debit Card expiry',
    type: 'text',
  },
  {
    text: 'The expiry date is shown on your Swag Visa Debit Card. We will contact you prior to the expiry to let you know the next steps for continuing to use your Hay products after the expiry date.',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '15. How to close your Swag Account',
    type: 'text',
  },
  {
    text: 'You can close your Swag Account via the Swag App. We cannot close the Swag Account immediately as we need to wait for all payments and transactions undertaken by you to be settled before your Swag Account can be closed. As soon as you notify us that you wish to close the Swag Account, you will no longer be able to use your Swag Visa Debit Card.',
    type: 'text',
  },
  {
    text: 'You will remain liable for any transactions that were not processed, or that occur, on your Swag Account (including, but not limited to, outstanding merchant purchases) at the time the Swag Account is closed.',
    type: 'text',
  },
  {
    text: 'You must also pay us all unpaid fees and charges prior to closing the Swag Account.',
    type: 'text',
  },
  {
    text: 'Once the Swag Account is closed and we are satisfied that all outstanding transactions have been presented and settled, we will refund you the Spend Balance in your Swag Account.',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '16. How we can communicate with each other (notices)',
    type: 'text',
  },
  {
    text: 'You can contact us via the Swag App or the Swag website.',
    type: 'text',
  },
  {
    text: 'We may give you any information, notices or other documents related to the Swag Visa Debit Card or Swag Account by:',
    type: 'text',
  },
  {
    text: 'notification (including a push notification) or message sent to you or your device through the Swag App;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'by email to the email address recorded for you in the Swag App;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'by letter to the address recorded for you in the Swag App.',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '17. Privacy',
    type: 'text',
  },
  {
    text: 'Employment Hero will collect, handle and use your personal information in accordance with Swag Spend privacy policy available at:',
    type: 'text',
  },
  {
    text: 'http://www.swagapp.com/legal/privacy-policy',
    type: 'link',
  },
  {
    text: 'Employment Hero privacy policy contains important information about the purposes for which Employment Hero collect personal information, the entities to which Employment Hero may disclose the information Employment Hero collect (including any overseas disclosures that we may make), how you can access and seek correction of the personal information we hold about you or how you can make a complaint about our handling of your personal information.',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '18. Limits and responsibility',
    type: 'text',
  },
  {
    text: 'We are responsible for things that occur that are our fault. This includes things like your Spend Balance being incorrectly debited due to our error or our fraud.',
    type: 'text',
  },
  {
    text: 'We are not responsible for things outside of our control like;',
    type: 'text',
  },
  {
    text: 'where a merchant does not accept your Swag Visa Debit Card;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'delays or interruptions not caused by us;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'transactions not being able to be processed, despite us taking reasonable precautions;',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'a dispute between you and the supplier of goods or services purchased with the Swag Visa Debit Card; or',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'Subject to any provisions in the Australian Consumer Law to the contrary, where we are responsible, to the extent permitted by law and Visa scheme rules, the most we are responsible for is the value of a transaction processed due to our error or, for other things that we may be responsible for, the amount of your Spend Balance.',
    type: 'text',
  },
  {
    text: 'Subject to any provisions in the Australian Consumer Law to the contrary, our liability for a breach of such guarantee, warranty or conditions will be limited to:',
    type: 'text',
  },
  {
    text: 'supplying the services again; or',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: 'the payment of the cost of having the services supplied again.',
    type: 'text',
    showListItemSymbol: true,
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '19. Complaints',
    type: 'text',
  },
  {
    text: 'You can find our complaints process here',
    type: 'text',
  },
  {
    text: MONEY_HELP_CENTRE_LINK,
    type: 'link',
  },
  {
    text: 'which sets out what you can do if you have any complaint or dispute relating to your Swag Visa Debit Card or Swag Account.',
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '20. Changes to these terms',
    type: 'text',
  },
  {
    text: 'We can change these Terms and any information in the PDS relating to these Terms at any time by uploading the new Terms or PDS to our website and letting you know about the changes via the Swag App. If you keep using your Swag Visa Debit Card or Swag Account after the notice of change is posted and the change becomes effective, you will be bound by the amended Terms.',
    type: 'text',
  },
  {
    text: `Where we decide to charge new fees or increase our fees or any other changes are made which are not in your favour, we will give you at least 30 days' notice before the change to enable you sufficient time to decide whether you wish to continue to use your Swag Visa Debit Card or Swag Account.`,
    type: 'text',
  },
  {
    text: '',
    fontWeight: 'semi-bold',
    boldText: '21. Governing law',
    type: 'text',
  },
  {
    text: 'The laws of New South Wales will govern the Swag Visa Debit Card and Swag Account, and any legal questions concerning this agreement.',
    type: 'text',
  },
];
