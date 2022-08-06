import { IndexableType } from 'dexie';
import { FileDTO } from './FileDTO';
import { FileSearchItemDTO } from './FileSearchItemDTO';
import { ID } from './ID';
import { LocationDTO } from './LocationDTO';
import { SearchCriteria } from './SearchCriteriaDTO';
import { TagDTO } from './TagDTO';

export interface IDataStorage {
  fetchTags: () => Promise<TagDTO[]>;
  fetchFiles: (order: FileOrder, fileOrder: OrderDirection) => Promise<FileDTO[]>;
  fetchFilesByID: (ids: ID[]) => Promise<FileDTO[]>;
  fetchFilesByKey: (key: keyof FileDTO, value: IndexableType) => Promise<FileDTO[]>;
  fetchLocations: (order: keyof LocationDTO, fileOrder: OrderDirection) => Promise<LocationDTO[]>;
  fetchSearches: () => Promise<FileSearchItemDTO[]>;
  searchFiles: (
    criteria: SearchCriteria<FileDTO> | [SearchCriteria<FileDTO>],
    order: FileOrder,
    fileOrder: OrderDirection,
    matchAny?: boolean,
  ) => Promise<FileDTO[]>;
  createTag: (tag: TagDTO) => Promise<void>;
  createFile: (file: FileDTO) => Promise<void>;
  createLocation: (location: LocationDTO) => Promise<void>;
  createSearch: (search: FileSearchItemDTO) => Promise<void>;
  saveTag: (tag: TagDTO) => Promise<void>;
  saveFiles: (files: FileDTO[]) => Promise<void>;
  saveLocation: (location: LocationDTO) => Promise<void>;
  saveSearch: (search: FileSearchItemDTO) => Promise<void>;
  removeTags: (tags: ID[]) => Promise<void>;
  mergeTags: (tagToBeRemoved: ID, tagToMergeWith: ID) => Promise<void>;
  removeFiles: (files: ID[]) => Promise<void>;
  removeLocation: (location: ID) => Promise<void>;
  removeSearch: (search: ID) => Promise<void>;
  countFiles: () => Promise<[fileCount: number, untaggedFileCount: number]>;
  createFilesFromPath: (path: string, files: FileDTO[]) => Promise<void>;
  clear: () => Promise<void>;
  backupDatabaseToFile: (path: string) => Promise<void>;
  restoreDatabaseFromFile: (path: string) => Promise<void>;
  peekDatabaseFile: (path: string) => Promise<{ numTags: number; numFiles: number }>;
}

export type SearchOrder<T> = keyof T | 'random';

export type FileOrder = SearchOrder<FileDTO>;

export const enum OrderDirection {
  Asc,
  Desc,
}
