import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X, ChevronLeft, ChevronRight, Grid3X3, Loader2, ImageOff } from 'lucide-react';

// Import all project images from different folders
const allProjectImages = [
  // Business Flyers (20 items)
  { src: '/projects/Buisness flyers/BAZEL2.jpg', category: 'Business', title: 'BAZEL Design' },
  { src: '/projects/Buisness flyers/Dress Avenue male.jpg', category: 'Business', title: 'Dress Avenue Male' },
  { src: '/projects/Buisness flyers/FIP.png', category: 'Business', title: 'FIP' },
  { src: '/projects/Buisness flyers/MAMA.jpg', category: 'Business', title: 'MAMA' },
  { src: '/projects/Buisness flyers/NIKE AIR.jpg', category: 'Business', title: 'Nike Air' },
  { src: '/projects/Buisness flyers/SG.jpg', category: 'Business', title: 'SG Design' },
  { src: '/projects/Buisness flyers/SG2.jpg', category: 'Business', title: 'SG Design 2' },
  { src: '/projects/Buisness flyers/burger queen.png', category: 'Business', title: 'Burger Queen' },
  { src: '/projects/Buisness flyers/car.png', category: 'Business', title: 'Car Design' },
  { src: '/projects/Buisness flyers/cater.jpg', category: 'Business', title: 'Catering' },
  { src: '/projects/Buisness flyers/dress avenue.jpg', category: 'Business', title: 'Dress Avenue' },
  { src: '/projects/Buisness flyers/fip courtesy.jpg', category: 'Business', title: 'FIP Courtesy' },
  { src: '/projects/Buisness flyers/fip1.png', category: 'Business', title: 'FIP 1' },
  { src: '/projects/Buisness flyers/fiplogo2.png', category: 'Business', title: 'FIP Logo' },
  { src: '/projects/Buisness flyers/gecho12.jpg', category: 'Business', title: 'Gecho' },
  { src: '/projects/Buisness flyers/mama femo.jpg', category: 'Business', title: 'Mama Femo' },
  { src: '/projects/Buisness flyers/naillab.png', category: 'Business', title: 'Nail Lab' },
  { src: '/projects/Buisness flyers/recreated.jpg', category: 'Business', title: 'Recreated' },
  { src: '/projects/Buisness flyers/sg jeans.jpg', category: 'Business', title: 'SG Jeans' },
  { src: '/projects/Buisness flyers/swiftbowl.jpg', category: 'Business', title: 'Swift Bowl' },
  
  // Church Designs (30 items)
  { src: '/projects/Church designs/ANOINTING service.jpg', category: 'Church', title: 'Anointing Service' },
  { src: '/projects/Church designs/Bible study.jpg', category: 'Church', title: 'Bible Study' },
  { src: '/projects/Church designs/CALL upon the lord.jpg', category: 'Church', title: 'Call Upon The Lord' },
  { src: '/projects/Church designs/CROSS-OVER.jpg', category: 'Church', title: 'Cross Over' },
  { src: '/projects/Church designs/Call upon the lord2.jpg', category: 'Church', title: 'Call Upon The Lord 2' },
  { src: '/projects/Church designs/DIGGING DEEP.jpg', category: 'Church', title: 'Digging Deep' },
  { src: '/projects/Church designs/Faith clinic.jpg', category: 'Church', title: 'Faith Clinic' },
  { src: '/projects/Church designs/HOG Thanksgiving.jpg', category: 'Church', title: 'HOG Thanksgiving' },
  { src: '/projects/Church designs/HOG(1).jpg', category: 'Church', title: 'HOG 1' },
  { src: '/projects/Church designs/HOG.jpg', category: 'Church', title: 'HOG' },
  { src: '/projects/Church designs/PRAYER CONFERENCE  anointing service February.jpg', category: 'Church', title: 'Prayer Conference February' },
  { src: '/projects/Church designs/SOD.jpg', category: 'Church', title: 'SOD' },
  { src: '/projects/Church designs/SOUNDS.jpg', category: 'Church', title: 'Sounds' },
  { src: '/projects/Church designs/SPECIAL CAMP MEETING ( SCM ).jpg', category: 'Church', title: 'Special Camp Meeting' },
  { src: '/projects/Church designs/Xmas.jpg', category: 'Church', title: 'Christmas' },
  { src: '/projects/Church designs/backdrop.jpg', category: 'Church', title: 'Backdrop' },
  { src: '/projects/Church designs/blank.jpg', category: 'Church', title: 'Blank Template' },
  { src: '/projects/Church designs/call upon the lord(1).jpg', category: 'Church', title: 'Call Upon The Lord Alt' },
  { src: '/projects/Church designs/church banner.jpg', category: 'Church', title: 'Church Banner' },
  { src: '/projects/Church designs/deliverance service2.jpg', category: 'Church', title: 'Deliverance Service' },
  { src: '/projects/Church designs/power night1.jpg', category: 'Church', title: 'Power Night' },
  { src: '/projects/Church designs/prayer conference 2.png', category: 'Church', title: 'Prayer Conference 2' },
  { src: '/projects/Church designs/prayer conference November edition.jpg', category: 'Church', title: 'Prayer Conference November' },
  { src: '/projects/Church designs/prayer conference feb.jpg', category: 'Church', title: 'Prayer Conference Feb' },
  { src: '/projects/Church designs/prayer conference october1.jpg', category: 'Church', title: 'Prayer Conference October' },
  { src: '/projects/Church designs/prayer conference2.jpg', category: 'Church', title: 'Prayer Conference 2 Alt' },
  { src: '/projects/Church designs/rcftry.jpg', category: 'Church', title: 'RCF Try' },
  { src: '/projects/Church designs/recreate.jpg', category: 'Church', title: 'Recreate' },
  { src: '/projects/Church designs/rememeber.jpg', category: 'Church', title: 'Remember' },
  { src: '/projects/Church designs/sunday.jpg', category: 'Church', title: 'Sunday Service' },
  
  // Football Designs (9 items)
  { src: '/projects/Football designs/9ja match.jpg', category: 'Sports', title: '9ja Match' },
  { src: '/projects/Football designs/F1.jpg', category: 'Sports', title: 'F1 Racing' },
  { src: '/projects/Football designs/RASHIDI.jpg', category: 'Sports', title: 'Rashidi' },
  { src: '/projects/Football designs/RIA.jpg', category: 'Sports', title: 'RIA' },
  { src: '/projects/Football designs/barcalineup.png', category: 'Sports', title: 'Barca Lineup' },
  { src: '/projects/Football designs/barcalineup2.jpg', category: 'Sports', title: 'Barca Lineup 2' },
  { src: '/projects/Football designs/lionel messi.jpg', category: 'Sports', title: 'Lionel Messi' },
  { src: '/projects/Football designs/lol.jpg', category: 'Sports', title: 'LOL Sports' },
  { src: '/projects/Football designs/match2.png', category: 'Sports', title: 'Match 2' },
  
  // New Month (16 items)
  { src: '/projects/New month/AUG.jpg', category: 'Monthly', title: 'August' },
  { src: '/projects/New month/FEBRUARY.jpg', category: 'Monthly', title: 'February' },
  { src: '/projects/New month/February COJ.jpg', category: 'Monthly', title: 'February COJ' },
  { src: '/projects/New month/January COJ.jpg', category: 'Monthly', title: 'January COJ' },
  { src: '/projects/New month/NOVEMBER coj.jpg', category: 'Monthly', title: 'November COJ' },
  { src: '/projects/New month/Nov.jpg', category: 'Monthly', title: 'November' },
  { src: '/projects/New month/SALVATION ATTORNEYS.jpg', category: 'Monthly', title: 'Salvation Attorneys' },
  { src: '/projects/New month/coj sept.jpg', category: 'Monthly', title: 'September COJ' },
  { src: '/projects/New month/july.jpg', category: 'Monthly', title: 'July' },
  { src: '/projects/New month/julycoj.jpg', category: 'Monthly', title: 'July COJ' },
  { src: '/projects/New month/julyfip.jpg', category: 'Monthly', title: 'July FIP' },
  { src: '/projects/New month/new month church.png', category: 'Monthly', title: 'New Month Church' },
  { src: '/projects/New month/new month.png', category: 'Monthly', title: 'New Month' },
  { src: '/projects/New month/november fip.jpg', category: 'Monthly', title: 'November FIP' },
  { src: '/projects/New month/october.jpg', category: 'Monthly', title: 'October' },
  { src: '/projects/New month/sept.jpg', category: 'Monthly', title: 'September' },
  
  // YouTube (6 items)
  { src: '/projects/Youtube (banners,Thumbnails & Dp)/BANNER.jpg', category: 'YouTube', title: 'YouTube Banner' },
  { src: '/projects/Youtube (banners,Thumbnails & Dp)/HOG.jpg', category: 'YouTube', title: 'HOG Thumbnail' },
  { src: '/projects/Youtube (banners,Thumbnails & Dp)/call upon the lord.jpg', category: 'YouTube', title: 'Call Upon The Lord Thumb' },
  { src: '/projects/Youtube (banners,Thumbnails & Dp)/daddy g.o2.jpg', category: 'YouTube', title: 'Daddy GO' },
  { src: '/projects/Youtube (banners,Thumbnails & Dp)/new months.jpg', category: 'YouTube', title: 'New Months Thumb' },
  { src: '/projects/Youtube (banners,Thumbnails & Dp)/utube banner.jpg', category: 'YouTube', title: 'YouTube Banner Alt' },
  
  // Birthdays & Events (14 items)
  { src: '/projects/birthdays flyers & others/BIRTHDAY3.png', category: 'Events', title: 'Birthday 3' },
  { src: '/projects/birthdays flyers & others/FROM The Sogbolas.png', category: 'Events', title: 'From The Sogbolas' },
  { src: '/projects/birthdays flyers & others/MUMMYCHAMPION.jpg', category: 'Events', title: 'Mummy Champion' },
  { src: '/projects/birthdays flyers & others/anniversery2.jpg', category: 'Events', title: 'Anniversary' },
  { src: '/projects/birthdays flyers & others/aso-ebi.jpg', category: 'Events', title: 'Aso Ebi' },
  { src: '/projects/birthdays flyers & others/bro timi.jpg', category: 'Events', title: 'Bro Timi' },
  { src: '/projects/birthdays flyers & others/burial.jpg', category: 'Events', title: 'Burial' },
  { src: '/projects/birthdays flyers & others/concept.png', category: 'Events', title: 'Concept' },
  { src: '/projects/birthdays flyers & others/engagement.jpg', category: 'Events', title: 'Engagement' },
  { src: '/projects/birthdays flyers & others/fathers.jpg', category: 'Events', title: 'Fathers Day' },
  { src: '/projects/birthdays flyers & others/gift.jpg', category: 'Events', title: 'Gift' },
  { src: '/projects/birthdays flyers & others/wed.jpg', category: 'Events', title: 'Wedding' },
  { src: '/projects/birthdays flyers & others/wedding.jpg', category: 'Events', title: 'Wedding Design' },
  { src: '/projects/birthdays flyers & others/weddingp.jpg', category: 'Events', title: 'Wedding P' },
  
  // Others (15 items)
  { src: '/projects/Others/30 days rant.png', category: 'Other', title: '30 Days Rant' },
  { src: '/projects/Others/BUYNOW.jpg', category: 'Other', title: 'Buy Now' },
  { src: '/projects/Others/Busquet.jpg', category: 'Other', title: 'Busquet' },
  { src: '/projects/Others/IMG-20250526-WA0030.png', category: 'Other', title: 'Design Work' },
  { src: '/projects/Others/SELLNOW.jpg', category: 'Other', title: 'Sell Now' },
  { src: '/projects/Others/born to design.png', category: 'Other', title: 'Born To Design' },
  { src: '/projects/Others/carol 3.png', category: 'Other', title: 'Carol 3' },
  { src: '/projects/Others/lamine yamal.png', category: 'Other', title: 'Lamine Yamal' },
  { src: '/projects/Others/layout.jpg', category: 'Other', title: 'Layout' },
  { src: '/projects/Others/no more.jpg', category: 'Other', title: 'No More' },
  { src: '/projects/Others/pexels-trace-2834009.png', category: 'Other', title: 'Pexels Design' },
  { src: '/projects/Others/practice.jpg', category: 'Other', title: 'Practice' },
  { src: '/projects/Others/seyi billions.png', category: 'Other', title: 'Seyi Billions' },
  { src: '/projects/Others/sgi logo.png', category: 'Other', title: 'SGI Logo' },
  { src: '/projects/Others/vk.jpg', category: 'Other', title: 'VK' },
];

// Loading Spinner Component
function LoadingSpinner({ text = "Loading projects..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-700 border-t-primary rounded-full animate-spin" />
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-secondary rounded-full animate-spin" style={{ animationDuration: '1.5s' }} />
      </div>
      <p className="text-gray-400 mt-4 text-sm animate-pulse">{text}</p>
      <div className="mt-8 flex gap-2">
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}

// Image Skeleton Loader
function ImageSkeleton() {
  return (
    <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-700" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gray-600 animate-spin" />
      </div>
    </div>
  );
}

// Lazy Image Component with loading state
function LazyImage({ src, alt, onClick }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className="relative aspect-video rounded-lg overflow-hidden bg-gray-800">
      {isLoading && !hasError && <ImageSkeleton />}
      
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800">
          <ImageOff className="w-8 h-8 text-gray-600 mb-2" />
          <span className="text-gray-500 text-xs">Failed to load</span>
        </div>
      ) : (
        isVisible && (
          <img
            src={src}
            alt={alt}
            onClick={onClick}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
            className={`w-full h-full object-cover transition-all duration-500 cursor-pointer group-hover:scale-110 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            loading="lazy"
            decoding="async"
          />
        )
      )}
      
      {/* Hover Overlay */}
      {!hasError && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 bg-primary/90 rounded-full flex items-center justify-center">
              <Grid3X3 className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ImageModal({ image, onClose, onNext, onPrev, currentIndex, total }) {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all z-10"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation */}
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all disabled:opacity-30"
        disabled={currentIndex === 0}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all disabled:opacity-30"
        disabled={currentIndex === total - 1}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Loading Spinner for Modal Image */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gray-700 border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {/* Image Container */}
      <div className="max-w-[90vw] max-h-[85vh]">
        <img
          src={image.src}
          alt={image.title}
          onLoad={() => setIsLoading(false)}
          className={`max-w-full max-h-[85vh] object-contain transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>

      {/* Image Info */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <h3 className="text-white text-xl font-semibold mb-1">{image.title}</h3>
        <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full border border-primary/30">
          {image.category}
        </span>
        <p className="text-gray-400 text-sm mt-2">
          {currentIndex + 1} / {total}
        </p>
      </div>
    </div>
  );
}

function ProjectsGallery() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(24);

  const categories = ['All', ...new Set(allProjectImages.map(img => img.category))];

  const filteredImages = filter === 'All' 
    ? allProjectImages 
    : allProjectImages.filter(img => img.category === filter);

  const visibleImages = filteredImages.slice(0, displayCount);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleImageClick = (image, index) => {
    setSelectedImage({ image, index });
  };

  const handleNext = () => {
    const nextIndex = (selectedImage.index + 1) % filteredImages.length;
    setSelectedImage({ image: filteredImages[nextIndex], index: nextIndex });
  };

  const handlePrev = () => {
    const prevIndex = selectedImage.index === 0 
      ? filteredImages.length - 1 
      : selectedImage.index - 1;
    setSelectedImage({ image: filteredImages[prevIndex], index: prevIndex });
  };

  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + 24, filteredImages.length));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex flex-col">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-xl border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Home</span>
              </button>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <Grid3X3 className="w-6 h-6 text-primary" />
                All Projects
              </h1>
              <div className="w-24" />
            </div>
          </div>
        </div>

        <div className="pt-24 flex-1 flex items-center justify-center">
          <LoadingSpinner text={`Loading ${allProjectImages.length} projects...`} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </button>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Grid3X3 className="w-6 h-6 text-primary" />
              All Projects ({allProjectImages.length})
            </h1>
            <div className="w-24" />
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="pt-24 pb-4 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setDisplayCount(24);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat
                    ? 'bg-primary text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {cat}
                {cat !== 'All' && (
                  <span className="ml-2 text-xs opacity-70">
                    {allProjectImages.filter(img => img.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="px-4 pb-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            Showing {Math.min(visibleImages.length, filteredImages.length)} of {filteredImages.length} projects
          </p>
        </div>
      </div>

      {/* YouTube-Style Grid */}
      <div className="px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {visibleImages.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                onClick={() => handleImageClick(image, index)}
                className="group cursor-pointer"
              >
                <LazyImage
                  src={image.src}
                  alt={image.title}
                  onClick={() => handleImageClick(image, index)}
                />
                {/* Title below thumbnail */}
                <div className="mt-2">
                  <h3 className="text-white text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                    {image.title}
                  </h3>
                  <p className="text-gray-500 text-xs mt-0.5">{image.category}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {displayCount < filteredImages.length && (
            <div className="mt-12 text-center">
              <button
                onClick={loadMore}
                className="px-8 py-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/50 rounded-full font-medium transition-all"
              >
                Load More ({filteredImages.length - displayCount} remaining)
              </button>
            </div>
          )}

          {/* End of Results */}
          {displayCount >= filteredImages.length && filteredImages.length > 0 && (
            <div className="mt-12 text-center">
              <p className="text-gray-500 text-sm">
                You've reached the end of the gallery
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          image={selectedImage.image}
          currentIndex={selectedImage.index}
          total={filteredImages.length}
          onClose={() => setSelectedImage(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
}

export default ProjectsGallery;
