import { Pressable, StyleSheet, Text, View } from 'react-native'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  maxButtons?: number
}

const BUTTON_SPACING = 4

export const Pagination = ({ currentPage, totalPages, onPageChange, maxButtons = 5 }: PaginationProps) => {
  if (totalPages <= 1) {
    return null
  }

  const visibleButtons = Math.min(maxButtons, totalPages)
  const halfRange = Math.floor(visibleButtons / 2)

  let startPage = Math.max(1, currentPage - halfRange)
  let endPage = startPage + visibleButtons - 1

  if (endPage > totalPages) {
    endPage = totalPages
    startPage = Math.max(1, endPage - visibleButtons + 1)
  }

  const pages: number[] = []
  for (let page = startPage; page <= endPage; page += 1) {
    pages.push(page)
  }

  const handlePageChange = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) {
      return
    }
    onPageChange(page)
  }

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={() => handlePageChange(currentPage - 1)}
        style={({ pressed }) => [
          styles.control,
          currentPage <= 1 && styles.disabled,
          pressed && currentPage > 1 && styles.pressed,
        ]}
      >
        <Text style={styles.controlText}>Prev</Text>
      </Pressable>

      <View style={styles.pages}>
        {pages.map((page) => (
          <Pressable
            key={`page-${page}`}
            onPress={() => handlePageChange(page)}
            style={({ pressed }) => [
              styles.control,
              { marginHorizontal: BUTTON_SPACING },
              page === currentPage && styles.active,
              pressed && styles.pressed,
            ]}
          >
            <Text style={[styles.controlText, page === currentPage && styles.activeText]}>{page}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={() => handlePageChange(currentPage + 1)}
        style={({ pressed }) => [
          styles.control,
          currentPage >= totalPages && styles.disabled,
          pressed && currentPage < totalPages && styles.pressed,
        ]}
      >
        <Text style={styles.controlText}>Next</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  pages: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  control: {
    borderWidth: 1,
    borderColor: '#555',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: '#f2f2f2',
  },
  controlText: {
    color: '#111',
    fontSize: 14,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.35,
  },
  pressed: {
    opacity: 0.65,
  },
  active: {
    backgroundColor: '#111',
  },
  activeText: {
    color: '#fff',
  },
})
