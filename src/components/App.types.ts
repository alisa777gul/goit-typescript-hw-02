import { Image } from "./imageGallery/ImageGallery.types";

 export type ApiResponse = {
  results: Image[];
  total: number;
};
