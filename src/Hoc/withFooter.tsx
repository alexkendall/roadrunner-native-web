import SocialFooter from "../Components/Common/Footer"
import { View } from 'react-native'
import { ReactNode } from "react"
import Theme from "../Config/Theme"
import { useSelector } from "react-redux"
import { windowSelector } from "../Redux/Selectors/windowSelector"

export default (Component: ReactNode) => {
    return () => {
        const windowDimensions = useSelector(windowSelector)
        return (
            <View style={{ flex: 1, alignItems: "center", backgroundColor: Theme.primary }}>
                <View style={{ flex: 1, width: windowDimensions.content_width, display: "flex", flexDirection: "column" }}>
                    <Component />
                </View>
                <SocialFooter />
            </View>
        )
    }
}