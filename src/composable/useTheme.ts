import { computed } from "vue"
import { useGlobalConfig } from "vuestic-ui"

export const useTheme = () => {
    const theme = computed(() => {
        return useGlobalConfig().getGlobalConfig().colors
    })

    return { theme }
}