import { View, Image, ScrollView, Text, StyleSheet, Pressable } from 'react-native'
import { FirebaseAssetContentType } from '../Types/FirebaseAssetContentType'
import { useEffect, useMemo, useState } from 'react'
import { fetchAssetImagesFromFirebase } from '../Services/FetchAssetImagesFromFirebase'
import { LoadingIndicator } from '../Components/Common/LoadingIndicator'
import { Pagination } from '../Components/Common/Pagination'
import { usePagination } from '../Hooks/usePagination'

const MS_PER_DAY = 1000 * 60 * 60 * 24
const DateFilterOptions = [
    { label: 'All content', days: null },
    { label: 'Last 30 days', days: 30 },
    { label: 'Last 90 days', days: 90 },
    { label: 'Last 12 months', days: 365 },
] as const

type DateFilterOption = (typeof DateFilterOptions)[number]

export const Content = () => {
    const [dialogueContent, setDialogueContent] = useState<FirebaseAssetContentType[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedFilter, setSelectedFilter] = useState<DateFilterOption>(DateFilterOptions[0])

    useEffect(() => {
        const loadImages = async () => {
            try {
                setLoading(true)
                setError(null)
                const images = await fetchAssetImagesFromFirebase('Dialogue-Content')
                setDialogueContent(images)
            } catch (err) {
                console.error('Failed to load dialogue content images:', err)
                setError('Failed to load images. Please try again later.')
            } finally {
                setLoading(false)
            }
        }

        loadImages()
    }, [])

    const filterFn = useMemo(() => {
        if (!selectedFilter.days) {
            return null
        }
        const threshold = Date.now() - selectedFilter.days * MS_PER_DAY
        return (item: FirebaseAssetContentType) => item.timeCreated >= threshold
    }, [selectedFilter.days])

    const {
        currentPageItems,
        currentPage,
        totalPages,
        goToPage,
    } = usePagination({
        items: dialogueContent,
        itemsPerPage: 6,
        filterFn,
    })

    const renderContent = (item: FirebaseAssetContentType, index: number) => (
        <View key={`${item.image}-${index}`} style={styles.imageWrapper}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.imageDate}>{new Date(item.timeCreated).toLocaleDateString()}</Text>
        </View>
    )

    if (loading) {
        return <LoadingIndicator message="Loading content..." />
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        )
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.filterHeading}>Filter by date:</Text>
            <View style={styles.filterRow}>
                {DateFilterOptions.map((filter) => (
                    <Pressable
                        key={filter.label}
                        onPress={() => setSelectedFilter(filter)}
                        style={[
                            styles.filterButton,
                            selectedFilter.label === filter.label && styles.filterButtonActive,
                        ]}
                    >
                        <Text
                            style={[
                                styles.filterLabel,
                                selectedFilter.label === filter.label && styles.filterLabelActive,
                            ]}
                        >
                            {filter.label}
                        </Text>
                    </Pressable>
                ))}
            </View>

            <View style={styles.grid}>
                {currentPageItems.length === 0 ? (
                    <Text style={styles.emptyText}>No content matches this date range yet.</Text>
                ) : (
                    currentPageItems.map((item, index) => renderContent(item, index))
                )}
            </View>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: 'stretch',
    },
    filterHeading: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#111',
    },
    filterRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 14,
    },
    filterButton: {
        borderWidth: 1,
        borderColor: '#222',
        borderRadius: 999,
        paddingVertical: 6,
        paddingHorizontal: 14,
        backgroundColor: '#fff',
        marginRight: 8,
        marginBottom: 8,
    },
    filterButtonActive: {
        backgroundColor: '#222',
    },
    filterLabel: {
        color: '#111',
        fontSize: 12,
        fontWeight: '500',
    },
    filterLabelActive: {
        color: '#fff',
    },
    grid: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    imageWrapper: {
        margin: 10,
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 6,
    },
    imageDate: {
        marginTop: 6,
        fontSize: 12,
        color: '#555',
    },
    emptyText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        padding: 12,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
})


