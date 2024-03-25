

const GenCon = "https://firebasestorage.googleapis.com/v0/b/roadrunner-native-web.appspot.com/o/Case-Studies%2F2020.gencon.logo.black.png?alt=media&token=9c87bc5c-0afa-4bcc-90d4-0a300278d02d"
const Ally = "https://firebasestorage.googleapis.com/v0/b/roadrunner-native-web.appspot.com/o/Case-Studies%2FAllyLogo.png?alt=media&token=11f4bdd4-a8bc-4edb-a267-5e8174732f99"
const HereNow = "https://firebasestorage.googleapis.com/v0/b/roadrunner-native-web.appspot.com/o/Case-Studies%2FHereNowAppLogo.png?alt=media&token=cea2eca1-ef63-4446-ae7f-10e0100657d3"
const Kabinet = "https://firebasestorage.googleapis.com/v0/b/roadrunner-native-web.appspot.com/o/Case-Studies%2FKabinetLogo.png?alt=media&token=fa95f654-7fed-4e58-84fa-7d9c61fb58be"
const ServicersWeb = "https://firebasestorage.googleapis.com/v0/b/roadrunner-native-web.appspot.com/o/Case-Studies%2Fservicers_web.png?alt=media&token=c2258855-6889-4128-8308-b11aabbb8fc7"
const Swoogo = "https://firebasestorage.googleapis.com/v0/b/roadrunner-native-web.appspot.com/o/Case-Studies%2Fswoogo.png?alt=media&token=3d425f8f-f60f-490e-9bdb-eb4016f53eb3"
const CareExchange = "https://firebasestorage.googleapis.com/v0/b/roadrunner-native-web.appspot.com/o/Case-Studies%2Fcareexchange.png?alt=media&token=014fe254-2d0c-42fa-938f-96e6c8c3ebef"
const Muze = "https://firebasestorage.googleapis.com/v0/b/roadrunner-native-web.appspot.com/o/Case-Studies%2FMuzeFrameAlpha.png?alt=media&token=e3216182-a132-4d3e-bc25-822e2ef3a1bd"

export interface CasesData {
    featured_graphic: string
    data: CasesDetailsDataType
}


export const CasesData: Array<CasesData> = [
    {
        featured_graphic: Ally,
        data: {
            client: "Ally",
            featured_graphic: "https://flim-1-0-2.s3.eu-central-1.amazonaws.com/full/6a551a3c6ce911eca69810ddb1aba44f.png",
            industry: "Healthcare",
            services: ["iOS Development", "Android Development"],
            challenge: "Ally, a healthcare services provider, faced challenges with stability and functionality in their mobile applications. Critical bugs needed immediate attention, and caregivers required offline functionality for clocking in and out of shifts and entering timesheets.",
            solutions: "As the lead developer, I addressed these challenges head-on. I implemented critical bug fixes swiftly and efficiently, ensuring a stable experience for users. To enable caregivers to work offline, I integrated offline sync functionality, allowing them to clock in and out of shifts seamlessly. Furthermore, I added a feature to enter timesheets directly through the caregiver application, streamlining the process.",
            delivery: "The improvements significantly enhanced the stability and functionality of Ally's healthcare mobile applications. Caregivers could now work more efficiently, even without an internet connection, improving overall productivity. Additionally, the implementation of code-push support for both staging and production environments ensured quick and reliable updates.",
        },
    },
    {
        featured_graphic: GenCon,
        data: {
            client: "GenCon",
            featured_graphic: "https://flim-1-0-2.s3.eu-central-1.amazonaws.com/full/d7b2eb62e91311eda47c0612238522d6.png",
            industry: "Healthcare",
            services: ["iOS Development", "Android Development"],
            challenge: "Ally, a healthcare services provider, faced challenges with stability and functionality in their mobile applications. Critical bugs needed immediate attention, and caregivers required offline functionality for clocking in and out of shifts and entering timesheets.",
            solutions: "As the lead developer, I addressed these challenges head-on. I implemented critical bug fixes swiftly and efficiently, ensuring a stable experience for users. To enable caregivers to work offline, I integrated offline sync functionality, allowing them to clock in and out of shifts seamlessly. Furthermore, I added a feature to enter timesheets directly through the caregiver application, streamlining the process.",
            delivery: "The improvements significantly enhanced the stability and functionality of Ally's healthcare mobile applications. Caregivers could now work more efficiently, even without an internet connection, improving overall productivity. Additionally, the implementation of code-push support for both staging and production environments ensured quick and reliable updates.",
        }
    },
    {
        featured_graphic: HereNow,
        data: {
            client: "HereNow",
            featured_graphic: "https://flim-1-0-2.s3.eu-central-1.amazonaws.com/full/f88c8638f7c111eca01710ddb1aba44f.png",
            industry: "Healthcare",
            services: ["iOS Development", "Android Development"],
            challenge: "Ally, a healthcare services provider, faced challenges with stability and functionality in their mobile applications. Critical bugs needed immediate attention, and caregivers required offline functionality for clocking in and out of shifts and entering timesheets.",
            solutions: "As the lead developer, I addressed these challenges head-on. I implemented critical bug fixes swiftly and efficiently, ensuring a stable experience for users. To enable caregivers to work offline, I integrated offline sync functionality, allowing them to clock in and out of shifts seamlessly. Furthermore, I added a feature to enter timesheets directly through the caregiver application, streamlining the process.",
            delivery: "The improvements significantly enhanced the stability and functionality of Ally's healthcare mobile applications. Caregivers could now work more efficiently, even without an internet connection, improving overall productivity. Additionally, the implementation of code-push support for both staging and production environments ensured quick and reliable updates.",
        },
    },
    {
        featured_graphic: Kabinet,
        data: {
            client: "Kabinet",
            featured_graphic: "https://flim-1-0-2.s3.eu-central-1.amazonaws.com/full/a331adc809e411eda91810ddb1aba44f.png",
            industry: "Housing",
            services: ["iOS Development", "Android Development"],
            challenge: "Ally, a healthcare services provider, faced challenges with stability and functionality in their mobile applications. Critical bugs needed immediate attention, and caregivers required offline functionality for clocking in and out of shifts and entering timesheets.",
            solutions: "As the lead developer, I addressed these challenges head-on. I implemented critical bug fixes swiftly and efficiently, ensuring a stable experience for users. To enable caregivers to work offline, I integrated offline sync functionality, allowing them to clock in and out of shifts seamlessly. Furthermore, I added a feature to enter timesheets directly through the caregiver application, streamlining the process.",
            delivery: "The improvements significantly enhanced the stability and functionality of Ally's healthcare mobile applications. Caregivers could now work more efficiently, even without an internet connection, improving overall productivity. Additionally, the implementation of code-push support for both staging and production environments ensured quick and reliable updates.",
        }
    },
    {
        featured_graphic: ServicersWeb,
        data: {
            client: "Servicers Web",
            featured_graphic: "https://flim-1-0-2.s3.eu-central-1.amazonaws.com/full/eacd7f528ba711eb9d8510ddb1aba44f.png",
            industry: "Healthcare",
            services: ["Mobile App Development"],
            challenge: "Ally, a healthcare services provider, faced challenges with stability and functionality in their mobile applications. Critical bugs needed immediate attention, and caregivers required offline functionality for clocking in and out of shifts and entering timesheets.",
            solutions: "As the lead developer, I addressed these challenges head-on. I implemented critical bug fixes swiftly and efficiently, ensuring a stable experience for users. To enable caregivers to work offline, I integrated offline sync functionality, allowing them to clock in and out of shifts seamlessly. Furthermore, I added a feature to enter timesheets directly through the caregiver application, streamlining the process.",
            delivery: "The improvements significantly enhanced the stability and functionality of Ally's healthcare mobile applications. Caregivers could now work more efficiently, even without an internet connection, improving overall productivity. Additionally, the implementation of code-push support for both staging and production environments ensured quick and reliable updates.",
        }
    },
    {
        featured_graphic: Swoogo,
        data: {
            client: "Swoogo",
            featured_graphic: "https://flim-1-0-2.s3.eu-central-1.amazonaws.com/full/24d0e3f6188a11ebb16110ddb1aba44f.png",
            industry: "Event Software",
            services: ["Mobile App Development"],
            challenge: "Ally, a healthcare services provider, faced challenges with stability and functionality in their mobile applications. Critical bugs needed immediate attention, and caregivers required offline functionality for clocking in and out of shifts and entering timesheets.",
            solutions: "As the lead developer, I addressed these challenges head-on. I implemented critical bug fixes swiftly and efficiently, ensuring a stable experience for users. To enable caregivers to work offline, I integrated offline sync functionality, allowing them to clock in and out of shifts seamlessly. Furthermore, I added a feature to enter timesheets directly through the caregiver application, streamlining the process.",
            delivery: "The improvements significantly enhanced the stability and functionality of Ally's healthcare mobile applications. Caregivers could now work more efficiently, even without an internet connection, improving overall productivity. Additionally, the implementation of code-push support for both staging and production environments ensured quick and reliable updates.",
        }
    },
    {
        featured_graphic: CareExchange,
        data: {
            client: "CareExchange",
            featured_graphic: "https://flim-1-0-2.s3.eu-central-1.amazonaws.com/full/f075f4b4900d11ec94cd10ddb1aba44f.png",
            industry: "Healthcare",
            services: ["Mobile App Development"],
            challenge: "Ally, a healthcare services provider, faced challenges with stability and functionality in their mobile applications. Critical bugs needed immediate attention, and caregivers required offline functionality for clocking in and out of shifts and entering timesheets.",
            solutions: "As the lead developer, I addressed these challenges head-on. I implemented critical bug fixes swiftly and efficiently, ensuring a stable experience for users. To enable caregivers to work offline, I integrated offline sync functionality, allowing them to clock in and out of shifts seamlessly. Furthermore, I added a feature to enter timesheets directly through the caregiver application, streamlining the process.",
            delivery: "The improvements significantly enhanced the stability and functionality of Ally's healthcare mobile applications. Caregivers could now work more efficiently, even without an internet connection, improving overall productivity. Additionally, the implementation of code-push support for both staging and production environments ensured quick and reliable updates.",
        }
    },
    {
        featured_graphic: Muze,
        data: {
            client: "Muze",
            featured_graphic: "https://flim-1-0-2.s3.eu-central-1.amazonaws.com/full/fb8fa494294b11edb46f10ddb1aba44f.png",
            industry: "Healthcare",
            services: ["Mobile App Development"],
            challenge: "Ally, a healthcare services provider, faced challenges with stability and functionality in their mobile applications. Critical bugs needed immediate attention, and caregivers required offline functionality for clocking in and out of shifts and entering timesheets.",
            solutions: "As the lead developer, I addressed these challenges head-on. I implemented critical bug fixes swiftly and efficiently, ensuring a stable experience for users. To enable caregivers to work offline, I integrated offline sync functionality, allowing them to clock in and out of shifts seamlessly. Furthermore, I added a feature to enter timesheets directly through the caregiver application, streamlining the process.",
            delivery: "The improvements significantly enhanced the stability and functionality of Ally's healthcare mobile applications. Caregivers could now work more efficiently, even without an internet connection, improving overall productivity. Additionally, the implementation of code-push support for both staging and production environments ensured quick and reliable updates.",
        }
    }
]

export interface CasesDetailsDataType {
    client: string
    industry: string
    featured_graphic: string
    services: Array<string>
    challenge: string
    solutions: string
    delivery: string
}
