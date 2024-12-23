import './App.css';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './imageGallery/ImageGallery';
import LoadMore from './LoadMore/LoadMore';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import getPhotos from '../apiServices/photos';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import ImageModal from './ImageModal/ImageModal';
import { Image } from './imageGallery/ImageGallery.types';
import { ApiResponse } from './App.types';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};



function App() {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [errord, setError] = useState<boolean|null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image|null>(null);
  const perPage = 10;

  useEffect(() => {
    if (!query) return;

    const fetchImages = async ():Promise<void> => {
      setLoading(true);

      try {
        const { results, total }: ApiResponse = await getPhotos({ query, page, perPage });

        setImages(prevImages => [...prevImages, ...results]);
        setIsVisible(page * perPage < total);
        setIsEmpty(results.length === 0);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setError(true);
        setIsVisible(false);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [page, query]);

  const openModal = (image:Image):void=> {
    if (!modalIsOpen) {
      setSelectedImage(image);
      setIsOpen(true);
    }
  };

  const closeModal = ():void => {
    setIsOpen(false);
    setSelectedImage(null);
  };

  const handleSubmit = (value:string):void => {
    setQuery(value);
    setPage(1);
    setImages([]);
    setError(null);
    setIsEmpty(false);
    setIsVisible(false);
  };

  const handleLoad = ():void => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="container">
      <Toaster />
      <SearchBar onSubmit={handleSubmit} />
      {images.length === 0 && !loading && !query && (
        <div className="start">Let’s begin search 🔎</div>
      )}
      {isEmpty && query && !loading && (
        <div className="try">No images found. Try a different search.</div>
      )}
      {page === 1 && loading && <Loader />}
      {images.length > 0 ? (
        <>
          <ImageGallery images={images} openModal={openModal} />
          {loading && <Loader />}
          {isVisible && !loading && <LoadMore onLoad={handleLoad} />}
        </>
      ) : (
        <>{errord && <ErrorMessage />}</>
      )}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        />
      )}
    </div>
  );
}

export default App;
