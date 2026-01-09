import { useEffect, useMemo, useState } from 'react'

type UsePaginationParams<T> = {
  items: T[]
  itemsPerPage?: number
  initialPage?: number
  filterFn?: ((item: T) => boolean) | null
}

export type UsePaginationResult<T> = {
  currentPage: number
  totalPages: number
  filteredItemCount: number
  currentPageItems: T[]
  filteredItems: T[]
  goToNextPage: () => void
  goToPreviousPage: () => void
  goToPage: (page: number) => void
  resetPages: () => void
}

export const usePagination = <T>({
  items,
  itemsPerPage = 6,
  initialPage = 1,
  filterFn,
}: UsePaginationParams<T>): UsePaginationResult<T> => {
  const filteredItems = useMemo(() => {
    if (!filterFn) {
      return items
    }

    return items.filter(filterFn)
  }, [items, filterFn])

  const filteredItemCount = filteredItems.length
  const safeItemsPerPage = Math.max(1, itemsPerPage)
  const actualTotalPages = Math.ceil(filteredItemCount / safeItemsPerPage)
  const normalizedTotalPages = Math.max(1, actualTotalPages)

  const [currentPage, setCurrentPage] = useState(() => Math.min(initialPage, normalizedTotalPages))

  useEffect(() => {
    if (currentPage > normalizedTotalPages) {
      setCurrentPage(normalizedTotalPages)
    }
  }, [currentPage, normalizedTotalPages])

  useEffect(() => {
    setCurrentPage(Math.min(initialPage, normalizedTotalPages))
  }, [filteredItemCount, itemsPerPage, initialPage, normalizedTotalPages])

  const currentPageItems = useMemo(() => {
    if (!filteredItemCount) {
      return []
    }

    const startIndex = (currentPage - 1) * safeItemsPerPage
    const endIndex = startIndex + safeItemsPerPage
    return filteredItems.slice(startIndex, endIndex)
  }, [filteredItems, filteredItemCount, currentPage, itemsPerPage])

  const goToPage = (page: number) => {
    const nextPage = Math.max(1, Math.min(normalizedTotalPages, page))
    setCurrentPage(nextPage)
  }

  const goToNextPage = () => {
    goToPage(currentPage + 1)
  }

  const goToPreviousPage = () => {
    goToPage(currentPage - 1)
  }

  const resetPages = () => {
    setCurrentPage(Math.min(initialPage, normalizedTotalPages))
  }

  return {
    currentPage,
    totalPages: actualTotalPages,
    filteredItemCount,
    currentPageItems,
    filteredItems,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    resetPages,
  }
}
