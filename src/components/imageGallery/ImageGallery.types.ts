
export type Image = {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
  user: { name: string };
  created_at: string;
  likes: number;
};

export type ImageGalleryProps = {
  images: Image[];
  openModal: (image: Image) => void;
};
