

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
            "client": "Ally Healthcare",
            "featured_graphic": "https://flim-1-0-2.s3.eu-central-1.amazonaws.com/full/f075f4b4900d11ec94cd10ddb1aba44f.png",
            "industry": "Healthcare",
            "services": ["Mobile Application Development", "Bug Fixing", "Offline Functionality Integration", "Timesheet Management Integration", "Code-Push Support", "Office Application Development"],
            "challenge": "Improve stability and functionality of Ally's healthcare mobile applications.",
            "solutions": "Implemented critical bug fixes and pushed them to production. Integrated offline sync functionality for caregivers. Added timesheet entry feature in the caregiver application. Added code-push support for both staging and production environments. Developed a complementary office application for office users.",
            "delivery": "Roadrunner Creative led the development and delivery of these solutions."
          }          
    },
    {
        featured_graphic: GenCon,
        data: {
            "client": "GenCon",
            featured_graphic: "https://flim-1-0-2.s3.eu-central-1.amazonaws.com/full/d7b2eb62e91311eda47c0612238522d6.png",
            "industry": "Gaming",
            "services": [
              "Legacy App Refactoring",
              "Test Suite Development",
              "Deployment Management",
              "Electronic Ticketing Extension",
              "Web Socket Integration",
              "Event Organizer Support",
              "Code Coverage Improvement"
            ],
            "challenge": "Roadrunner Creative was tasked with refactoring the legacy GenCon react-native mobile application for the 2020 online convention. This included updating features such as Schedule, Maps, LookingGlass, and Events, and extending electronic ticketing functionality for online conventions.",
            "solutions": "Roadrunner Creative refactored the legacy GenCon app and developed and integrated test suites for comprehensive testing. The team deployed bi-weekly updates for both Android and iOS platforms. They also integrated an Event Messages Forum with web sockets support and implemented event organizer event management support.",
            "delivery": "The refactored GenCon mobile application was successfully deployed with enhanced functionality and stability. Roadrunner Creative achieved 80% code coverage with tests, ensuring a high-quality user experience for GenCon attendees."
          }
          
    },
    {
        featured_graphic: HereNow,
        data:
          {
            "client": "HereNowHelp",
            featured_graphic: "https://flim-1-0-2.s3.eu-central-1.amazonaws.com/full/f88c8638f7c111eca01710ddb1aba44f.png",
            "industry": "Healthcare",
            "services": [
              "API Development Consultation",
              "Mobile Application Development",
              "Communication Protocol Implementation"
            ],
            "challenge": "Roadrunner Creative provided consultation for API development for HereNowHelp's mobile applications. The goal was to create a mobile foundation in react-native that would allow provider and client applications to communicate effectively.",
            "solutions": "Roadrunner Creative worked closely with HereNowHelp to consult on API development, ensuring it served as a solid foundation for their mobile applications. This API enabled seamless communication between provider and client applications, ensuring a smooth user experience.",
            "delivery": "The consultation for API development for HereNowHelp's mobile applications was successfully delivered, laying the groundwork for empowering connections and improving healthcare services."
          }
          
          
    },
    {
        featured_graphic: Kabinet,
        data: {
            "client": "Kabinet Home",
            featured_graphic: "https://flim-1-0-2.s3.eu-central-1.amazonaws.com/full/a331adc809e411eda91810ddb1aba44f.png",
            "industry": "Real Estate",
            "services": [
              "Mobile Application Development",
              "In-App Purchase Integration",
              "Build Distribution"
            ],
            "challenge": "Roadrunner Creative took on the challenge of developing and delivering the Kabinet Home real estate react-native mobile application. The goal was to create a user-friendly app that seamlessly integrated monthly and yearly subscription in-app purchases for Kabinet Premium and Additional Property plans.",
            "solutions": "As the lead developer, Roadrunner Creative developed the Kabinet Home mobile application from specification. The team integrated monthly and yearly subscription in-app purchases for both Kabinet Premium and Additional Property plans, providing users with convenient access to premium features. Additionally, Roadrunner Creative distributed builds for internal testing through Test Flight and delivered the final version to the App Store, ensuring a smooth and reliable user experience.",
            "delivery": "The Kabinet Home mobile application was successfully developed and delivered, meeting the client's requirements. The integration of in-app purchases enhanced the application's revenue potential and user engagement. The app's user-friendly interface and seamless in-app purchase experience contributed to its success in the real estate market."
          }
          
          
    },
    {
        featured_graphic: ServicersWeb,
        data: {
            "client": "ServicersWeb",
            featured_graphic: "https://flim-1-0-2.s3.eu-central-1.amazonaws.com/full/eacd7f528ba711eb9d8510ddb1aba44f.png",
            "industry": "Service Management",
            "services": [
              "Front-end Development",
              "UI/UX Design Implementation",
              "Navigation Development",
              "Login Functionality Development",
              "Review Request Form Implementation",
              "Application Drawer Development"
            ],
            "challenge": "Roadrunner Creative was tasked with developing the front end of the ServicersWeb react-native mobile application based on mock-ups, including navigation, login, review request form, and application drawer.",
            "solutions": "Roadrunner Creative meticulously translated the mock-ups into a functional front end for the ServicersWeb application. This included developing intuitive navigation, a secure login system, a user-friendly review request form, and a convenient application drawer for easy access to app features.",
            "delivery": "The front end of the ServicersWeb react-native mobile application was successfully developed and delivered, providing users with a seamless and intuitive user experience."
          }
          
    },
    {
        featured_graphic: Swoogo,
        data: {
            "client": "Go Attend",
            featured_graphic: "https://flim-1-0-2.s3.eu-central-1.amazonaws.com/full/24d0e3f6188a11ebb16110ddb1aba44f.png",
            "industry": "Event Management",
            "services": [
              "Front-end Development",
              "Code Refactoring",
              "API Integration",
              "Build and Deployment Support",
              "Web Preview Development",
              "Team Mentoring"
            ],
            "challenge": "Roadrunner Creative led the development of the front end of the white-label Go Attend mobile event application. The challenge included refactoring code and state logic from MobX to Redux, integrating RTQ Query with a backend GraphQL API, and supporting the build and deployments of legacy Attendee Mobile and Swoogo Live applications.",
            "solutions": "Roadrunner Creative successfully refactored the code and state logic, integrating Redux and RTQ Query for efficient data management and API integration. They also built Go Attend Preview, a web preview of the mobile application, using react-native-web and webpack with a Yii-based PHP core application. Roadrunner Creative worked closely with product and engineering managers to develop application features to specification.",
            "delivery": "The front end of the Go Attend mobile event application was successfully developed and delivered, providing users with a seamless and efficient event management experience."
          }
          
    },
    {
        featured_graphic: CareExchange,
          data: {
            "client": "CareExchange",
            featured_graphic: "https://flim-1-0-2.s3.eu-central-1.amazonaws.com/full/f075f4b4900d11ec94cd10ddb1aba44f.png",
            "industry": "Healthcare",
            "services": [
              "Mobile Application Development",
              "UI/UX Design Integration",
              "State Management",
              "Feature Integration"
            ],
            "challenge": "Roadrunner Creative embarked on developing the CareExchange mobile application from scratch, aiming to integrate complex caregiver-facing features and design elements specified in Figma designs.",
            "solutions": "Roadrunner Creative meticulously translated the CareExchange specification into a fully functional mobile application. Using redux-toolkit and rtk-query, a middleware layer was created to manage application state and data flow efficiently. The team successfully integrated features such as visit creation, client activity logging, visit history viewing with filtering, access to tutorials and files, messaging, and file uploading, enhancing the caregiver's user experience.",
            "delivery": "The CareExchange mobile application was delivered successfully, providing caregivers with a comprehensive tool to manage client care efficiently."
          }
    },
    {
        featured_graphic: Muze,
        data: {
                "client": "Muze Frame",
                featured_graphic: "https://flim-1-0-2.s3.eu-central-1.amazonaws.com/full/fb8fa494294b11edb46f10ddb1aba44f.png",
                "industry": "Photography",
                "services": [
                  "Mobile Application Development",
                  "UI/UX Design Integration",
                  "Feature Integration",
                  "Continuous Delivery"
                ],
                "challenge": "Roadrunner Creative took on the challenge of enhancing the Muze Frame app with key updates and features to improve photo management and user experience.",
                "solutions": "Roadrunner Creative implemented a range of features to enhance the Muze Frame app, including the ability to generate, organize, and create photo galleries and groups. They integrated swipe and pan gestures for sorting photos and galleries, added support for multiple galleries per group, and enabled the transfer of galleries between separate groups. Additional features included slideshow auto-scroll settings, remote control between devices, and the ability to record audio over photos. Roadrunner Creative also mapped out and integrated feature requests from mock-ups, ensuring a user-centric approach.",
                "delivery": "The Muze Frame app received continuous updates and improvements, delivered through Test Flight and Google Play Internal Beta services, as well as production releases to both the Google Play and Apple app store, ensuring a seamless user experience."
              }
              
    },
]

export interface CasesDetailsDataType {
    client: string
    industry: string
    featured_graphic: string
    services: Array<string>
    challenge: string
    solutions: string
    delivery: string
    disable_modal?: boolean
}
