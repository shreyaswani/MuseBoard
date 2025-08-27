import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';
import imagesList from "../data/images"; 



export default function ImageMasonry() {
  const [images, setImages] = React.useState(imagesList);
  const backendBase = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

  React.useEffect(() => {
    async function loadCloudImages() {
      try {
        const res = await fetch(`${backendBase}/api/images?prefix=museboard&max=200`); // change prefix if needed
        if (!res.ok) throw new Error("Failed to load");
        const cloudImgs = await res.json();

        const cloudMapped = cloudImgs.map((c) => ({
          id: `cloud-${c.asset_id}`,
          src: c.secure_url,
          alt: c.public_id,
        }));

        // merge cloud images first, then static images; dedupe by src
        const all = [...cloudMapped, ...imagesList];
        const dedup = [];
        const seen = new Set();
        for (const img of all) {
          if (!seen.has(img.src)) {
            seen.add(img.src);
            dedup.push(img);
          }
        }
        setImages(dedup);
      } catch (err) {
        console.error("Error loading cloud images", err);
        // leave static images as fallback
      }
    }

    loadCloudImages();
    // run once on mount
  }, []);

  return (
    <Box className="w-full flex justify-center px-2">
      <Masonry columns={6} spacing={2}>
        {images.map((image) => (
          <div key={image.id}>
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="block w-full rounded-2xl max-h-[356px] object-cover"
            />
          </div>
        ))}
      </Masonry>
    </Box>
  );
}







// export default function ImageMasonry({ newImage }) {
//    const [images, setImages] = React.useState(imagesList);
//    const backendBase = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

//    React.useEffect(() => {
//     if (newImage) {
//       setImages((prev) => [
//         { id: prev.length + 1, src: newImage, alt: `Image ${prev.length + 1}` },
//         ...prev, 
//       ]);
//     }
//   }, [newImage]);
//   return (
//     <Box className="w-full flex justify-center px-2">
//       <Masonry columns={6} spacing={2}>
//         {images.map((image) => (
//           <div key={image.id}>
//             <img
//               src={image.src}
//               alt={image.alt}
//               loading="lazy"
//               className="block w-full rounded-2xl max-h-[356px] object-cover"
//             />
//           </div>
//         ))}
//       </Masonry>
//     </Box>
//   );
// }





// export default function ImageMasonry() {
//   return (
//     <Box className="w-full flex justify-center px-2">
//       <Masonry columns={6} spacing={2} >
    
//         {itemData.map((item, index) => (
//           <div key={index}>
//             <img
//               srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
//               src={`${item.img}?w=162&auto=format`}
//               alt={item.title}
//               loading="lazy"
//               className='block w-full rounded-2xl max-h-[356px] object-cover'
//             />
//           </div>
//         ))}
//        </Masonry>
//     </Box>
//   );
// }


// const itemData = [
//   {
//     img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
//     title: 'Fern',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f',
//     title: 'Snacks',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
//     title: 'Mushrooms',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383',
//     title: 'Tower',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
//     title: 'Sea star',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
//     title: 'Honey',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
//     title: 'Basketball',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//     title: 'Breakfast',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1627328715728-7bcc1b5db87d',
//     title: 'Tree',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
//     title: 'Burger',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
//     title: 'Camera',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
//     title: 'Coffee',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1627000086207-76eabf23aa2e',
//     title: 'Camping Car',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
//     title: 'Hats',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
//     title: 'Tomato basil',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1627328561499-a3584d4ee4f7',
//     title: 'Mountain',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
//     title: 'Bike',
//   },
// ];
