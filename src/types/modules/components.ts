import type { Story, PageType, FilterState } from "@/types/shared";

export interface ExploreCardProps {
  story: Story;
  page: PageType;
}

export interface ExploreFiltersProps {
  filters: FilterState;
  onChange: (updated: Partial<FilterState>) => void;
}

export interface ExplorePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface ExploreDeleteBtnProps {
  storyId: string;
  storyTitle: string;
  page: PageType;
  userId?: string;
}

export interface GoogleSignInBtnProps {
  redirectTo?: string;
}
