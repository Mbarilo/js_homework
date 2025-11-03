import tagRepository from "./tag.repository";

const tagService = {
  getAll(skip?: number, take?: number) {
    return tagRepository.getAll(skip, take);
  },
  
  getById(id: number) {
    return tagRepository.getById(id);
  },
};

export default tagService;