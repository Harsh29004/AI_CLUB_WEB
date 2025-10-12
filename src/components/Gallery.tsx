import { useEffect, useState } from 'react';
import Image from 'next/image';

const RandomGallery: React.FC = () => {
  const [galleryImages, setGalleryImages] = useState<Array<{ url: string; description: string }>>([]);

  useEffect(() => {
    const galleryFolderPath = '/galleryImages';
    const numImagesToSelect = 6;

    const getRandomImages = (folderPath: string, count: number) => {
      const imageFiles: Array<{ url: string; description: string }> = [];
      while (imageFiles.length < count) {
        const randomIndex = Math.floor(Math.random() * 20) + 1;
        const imageUrl = `${folderPath}/image${randomIndex}.jpg`;
        if (!imageFiles.some((img) => img.url === imageUrl)) {
          imageFiles.push({ url: imageUrl, description: `Event ${randomIndex}` });
        }
      }
      setGalleryImages(imageFiles);
    };

    getRandomImages(galleryFolderPath, numImagesToSelect);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {galleryImages.map((image, index) => (
          <div key={index} className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-sm ring-1 ring-black/5">
            <Image
              src={image.url}
              alt={image.description}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomGallery;
