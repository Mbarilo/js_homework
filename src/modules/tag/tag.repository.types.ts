import { Tag } from "./tag.types";

export interface ITagRepository {
  getAll(skip?: number, take?: number): Promise<Tag[]>;
  getById(id: number): Promise<Tag | null>;
}