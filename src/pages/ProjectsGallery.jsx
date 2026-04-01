import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, X, ChevronLeft, ChevronRight, Grid3X3, Loader2, ImageOff, Home, User, Briefcase, Wrench, Mail } from 'lucide-react';

// Import all project images from different folders
const allProjectImages = [
  // Business Branding (20 items)
  { src: '/projects/Buisness flyers/BAZEL2.jpg', category: 'Business Branding', title: 'BAZEL Design' },
  { src: '/projects/Buisness flyers/Dress Avenue male.jpg', category: 'Business Branding', title: 'Dress Avenue Male' },
  { src: '/projects/Buisness flyers/FIP.png', category: 'Business Branding', title: 'FIP' },
  { src: '/projects/Buisness flyers/MAMA.jpg', category: 'Business Branding', title: 'MAMA' },
  { src: '/projects/Buisness flyers/NIKE AIR.jpg', category: 'Business Branding', title: 'Nike Air' },
  { src: '/projects/Buisness flyers/SG.jpg', category: 'Business Branding', title: 'SG Design' },
  { src: '/projects/Buisness flyers/SG2.jpg', category: 'Business Branding', title: 'SG Design 2' },
  { src: '/projects/Buisness flyers/burger queen.png', category: 'Business Branding', title: 'Burger Queen' },
  { src: '/projects/Buisness flyers/car.png', category: 'Business Branding', title: 'Car Design' },
  { src: '/projects/Buisness flyers/cater.jpg', category: 'Business Branding', title: 'Catering' },
  { src: '/projects/Buisness flyers/dress avenue.jpg', category: 'Business Branding', title: 'Dress Avenue' },
  { src: '/projects/Buisness flyers/fip courtesy.jpg', category: 'Business Branding', title: 'FIP Courtesy' },
  { src: '/projects/Buisness flyers/fip1.png', category: 'Business Branding', title: 'FIP 1' },
  { src: '/projects/Buisness flyers/fiplogo2.png', category: 'Business Branding', title: 'FIP Logo' },
  { src: '/projects/Buisness flyers/gecho12.jpg', category: 'Business Branding', title: 'Gecho' },
  { src: '/projects/Buisness flyers/mama femo.jpg', category: 'Business Branding', title: 'Mama Femo' },
  { src: '/projects/Buisness flyers/naillab.png', category: 'Business Branding', title: 'Nail Lab' },
  { src: '/projects/Buisness flyers/recreated.jpg', category: 'Business Branding', title: 'Recreated' },
  { src: '/projects/Buisness flyers/sg jeans.jpg', category: 'Business Branding', title: 'SG Jeans' },
  { src: '/projects/Buisness flyers/swiftbowl.jpg', category: 'Business Branding', title: 'Swift Bowl' },
  
  // Church Events Design (30 items)
  { src: '/projects/Church designs/ANOINTING service.jpg', category: 'Church Events Design', title: 'Anointing Service' },
  { src: '/projects/Church designs/Bible study.jpg', category: 'Church Events Design', title: 'Bible Study' },
  { src: '/projects/Church designs/CALL upon the lord.jpg', category: 'Church Events Design', title: 'Call Upon The Lord' },
  { src: '/projects/Church designs/CROSS-OVER.jpg', category: 'Church Events Design', title: 'Cross Over' },
  { src: '/projects/Church designs/Call upon the lord2.jpg', category: 'Church Events Design', title: 'Call Upon The Lord 2' },
  { src: '/projects/Church designs/DIGGING DEEP.jpg', category: 'Church Events Design', title: 'Digging Deep' },
  { src: '/projects/Church designs/Faith clinic.jpg', category: 'Church Events Design', title: 'Faith Clinic' },
  { src: '/projects/Church designs/HOG Thanksgiving.jpg', category: 'Church Events Design', title: 'HOG Thanksgiving' },
  { src: '/projects/Church designs/HOG(1).jpg', category: 'Church Events Design', title: 'HOG 1' },
  { src: '/projects/Church designs/HOG.jpg', category: 'Church Events Design', title: 'HOG' },
  { src: '/projects/Church designs/PRAYER CONFERENCE  anointing service February.jpg', category: 'Church Events Design', title: 'Prayer Conference February' },
  { src: '/projects/Church designs/SOD.jpg', category: 'Church Events Design', title: 'SOD' },
  { src: '/projects/Church designs/SOUNDS.jpg', category: 'Church Events Design', title: 'Sounds' },
  { src: '/projects/Church designs/SPECIAL CAMP MEETING ( SCM ).jpg', category: 'Church Events Design', title: 'Special Camp Meeting' },
  { src: '/projects/Church designs/Xmas.jpg', category: 'Church Events Design', title: 'Christmas' },
  { src: '/projects/Church designs/backdrop.jpg', category: 'Church Events Design', title: 'Backdrop' },
  { src: '/projects/Church designs/blank.jpg', category: 'Church Events Design', title: 'Blank Template' },
  { src: '/projects/Church designs/call upon the lord(1).jpg', category: 'Church Events Design', title: 'Call Upon The Lord Alt' },
  { src: '/projects/Church designs/church banner.jpg', category: 'Church Events Design', title: 'Church Banner' },
  { src: '/projects/Church designs/deliverance service2.jpg', category: 'Church Events Design', title: 'Deliverance Service' },
  { src: '/projects/Church designs/power night1.jpg', category: 'Church Events Design', title: 'Power Night' },
  { src: '/projects/Church designs/prayer conference 2.png', category: 'Church Events Design', title: 'Prayer Conference 2' },
  { src: '/projects/Church designs/prayer conference November edition.jpg', category: 'Church Events Design', title: 'Prayer Conference November' },
  { src: '/projects/Church designs/prayer conference feb.jpg', category: 'Church Events Design', title: 'Prayer Conference Feb' },
  { src: '/projects/Church designs/prayer conference october1.jpg', category: 'Church Events Design', title: 'Prayer Conference October' },
  { src: '/projects/Church designs/prayer conference2.jpg', category: 'Church Events Design', title: 'Prayer Conference 2 Alt' },
  { src: '/projects/Church designs/rcftry.jpg', category: 'Church Events Design', title: 'RCF Try' },
  { src: '/projects/Church designs/recreate.jpg', category: 'Church Events Design', title: 'Recreate' },
  { src: '/projects/Church designs/rememeber.jpg', category: 'Church Events Design', title: 'Remember' },
  { src: '/projects/Church designs/sunday.jpg', category: 'Church Events Design', title: 'Sunday Service' },
  
  // Sports Graphics (9 items)
  { src: '/projects/Football designs/9ja match.jpg', category: 'Sports Graphics', title: '9ja Match' },
  { src: '/projects/Football designs/F1.jpg', category: 'Sports Graphics', title: 'F1 Racing' },
  { src: '/projects/Football designs/RASHIDI.jpg', category: 'Sports Graphics', title: 'Rashidi' },
  { src: '/projects/Football designs/RIA.jpg', category: 'Sports Graphics', title: 'RIA' },
  { src: '/projects/Football designs/barcalineup.png', category: 'Sports Graphics', title: 'Barca Lineup' },
  { src: '/projects/Football designs/barcalineup2.jpg', category: 'Sports Graphics', title: 'Barca Lineup 2' },
  { src: '/projects/Football designs/lionel messi.jpg', category: 'Sports Graphics', title: 'Lionel Messi' },
  { src: '/projects/Football designs/lol.jpg', category: 'Sports Graphics', title: 'LOL Sports' },
  { src: '/projects/Football designs/match2.png', category: 'Sports Graphics', title: 'Match 2' },
  
  // New Month Designs (16 items)
  { src: '/projects/New month/AUG.jpg', category: 'New Month Designs', title: 'August' },
  { src: '/projects/New month/FEBRUARY.jpg', category: 'New Month Designs', title: 'February' },
  { src: '/projects/New month/February COJ.jpg', category: 'New Month Designs', title: 'February COJ' },
  { src: '/projects/New month/January COJ.jpg', category: 'New Month Designs', title: 'January COJ' },
  { src: '/projects/New month/NOVEMBER coj.jpg', category: 'New Month Designs', title: 'November COJ' },
  { src: '/projects/New month/Nov.jpg', category: 'New Month Designs', title: 'November' },
  { src: '/projects/New month/SALVATION ATTORNEYS.jpg', category: 'New Month Designs', title: 'Salvation Attorneys' },
  { src: '/projects/New month/coj sept.jpg', category: 'New Month Designs', title: 'September COJ' },
  { src: '/projects/New month/july.jpg', category: 'New Month Designs', title: 'July' },
  { src: '/projects/New month/julycoj.jpg', category: 'New Month Designs', title: 'July COJ' },
  { src: '/projects/New month/julyfip.jpg', category: 'New Month Designs', title: 'July FIP' },
  { src: '/projects/New month/new month church.png', category: 'New Month Designs', title: 'New Month Church' },
  { src: '/projects/New month/new month.png', category: 'New Month Designs', title: 'New Month' },
  { src: '/projects/New month/november fip.jpg', category: 'New Month Designs', title: 'November FIP' },
  { src: '/projects/New month/october.jpg', category: 'New Month Designs', title: 'October' },
  { src: '/projects/New month/sept.jpg', category: 'New Month Designs', title: 'September' },
  
  // YouTube Channel Assets (6 items)
  { src: '/projects/Youtube (banners,Thumbnails & Dp)/BANNER.jpg', category: 'YouTube Channel Assets', title: 'YouTube Banner' },
  { src: '/projects/Youtube (banners,Thumbnails & Dp)/HOG.jpg', category: 'YouTube Channel Assets', title: 'HOG Thumbnail' },
  { src: '/projects/Youtube (banners,Thumbnails & Dp)/call upon the lord.jpg', category: 'YouTube Channel Assets', title: 'Call Upon The Lord Thumb' },
  { src: '/projects/Youtube (banners,Thumbnails & Dp)/daddy g.o2.jpg', category: 'YouTube Channel Assets', title: 'Daddy GO' },
  { src: '/projects/Youtube (banners,Thumbnails & Dp)/new months.jpg', category: 'YouTube Channel Assets', title: 'New Months Thumb' },
  { src: '/projects/Youtube (banners,Thumbnails & Dp)/utube banner.jpg', category: 'YouTube Channel Assets', title: 'YouTube Banner Alt' },
  
  // Event Flyers (14 items)
  { src: '/projects/birthdays flyers & others/BIRTHDAY3.png', category: 'Event Flyers', title: 'Birthday 3' },
  { src: '/projects/birthdays flyers & others/FROM The Sogbolas.png', category: 'Event Flyers', title: 'From The Sogbolas' },
  { src: '/projects/birthdays flyers & others/MUMMYCHAMPION.jpg', category: 'Event Flyers', title: 'Mummy Champion' },
  { src: '/projects/birthdays flyers & others/anniversery2.jpg', category: 'Event Flyers', title: 'Anniversary' },
  { src: '/projects/birthdays flyers & others/aso-ebi.jpg', category: 'Event Flyers', title: 'Aso Ebi' },
  { src: '/projects/birthdays flyers & others/bro timi.jpg', category: 'Event Flyers', title: 'Bro Timi' },
  { src: '/projects/birthdays flyers & others/burial.jpg', category: 'Event Flyers', title: 'Burial' },
  { src: '/projects/birthdays flyers & others/concept.png', category: 'Event Flyers', title: 'Concept' },
  { src: '/projects/birthdays flyers & others/engagement.jpg', category: 'Event Flyers', title: 'Engagement' },
  { src: '/projects/birthdays flyers & others/fathers.jpg', category: 'Event Flyers', title: 'Fathers Day' },
  { src: '/projects/birthdays flyers & others/gift.jpg', category: 'Event Flyers', title: 'Gift' },
  { src: '/projects/birthdays flyers & others/wed.jpg', category: 'Event Flyers', title: 'Wedding' },
  { src: '/projects/birthdays flyers & others/wedding.jpg', category: 'Event Flyers', title: 'Wedding Design' },
  { src: '/projects/birthdays flyers & others/weddingp.jpg', category: 'Event Flyers', title: 'Wedding P' },
  
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
    <div className="fixed inset-0 z-[200] bg-black flex flex-col">
      {/* Top Bar with Close Button */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 bg-black/50 backdrop-blur-sm z-[210]">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">{currentIndex + 1} / {total}</span>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all shadow-lg active:scale-95"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Area */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden p-4">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-gray-600 border-t-primary rounded-full animate-spin" />
          </div>
        )}
        
        <img
          src={image.src}
          alt={image.title}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
          className={`max-w-full max-h-[calc(100vh-180px)] object-contain transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>

      {/* Bottom Bar with Navigation and Info */}
      <div className="bg-black/50 backdrop-blur-sm px-4 py-3 sm:px-6 sm:py-4 z-[210]">
        <div className="flex items-center justify-between">
          {/* Previous Button */}
          <button
            onClick={onPrev}
            disabled={currentIndex === 0}
            className="w-12 h-12 bg-white/20 hover:bg-white/30 disabled:bg-white/5 rounded-full flex items-center justify-center text-white transition-all shadow-lg active:scale-95 disabled:opacity-30"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image Info */}
          <div className="text-center flex-1 px-4">
            <h3 className="text-white text-sm sm:text-lg font-semibold truncate">{image.title}</h3>
            <span className="inline-block px-2 py-0.5 sm:px-3 sm:py-1 mt-1 bg-primary/30 text-primary text-xs rounded-full border border-primary/50">
              {image.category}
            </span>
          </div>

          {/* Next Button */}
          <button
            onClick={onNext}
            disabled={currentIndex === total - 1}
            className="w-12 h-12 bg-white/20 hover:bg-white/30 disabled:bg-white/5 rounded-full flex items-center justify-center text-white transition-all shadow-lg active:scale-95 disabled:opacity-30"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectsGallery() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('Business Branding');
  const [isLoading, setIsLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(24);

  const categories = [...new Set(allProjectImages.map(img => img.category))];

  // Read category from URL query params on mount
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setFilter(categoryFromUrl);
    }
  }, [searchParams, categories]);

  const filteredImages = allProjectImages.filter(img => img.category === filter);

  const visibleImages = filteredImages.slice(0, displayCount);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleImageClick = (image) => {
    // Find the actual index in filteredImages (not visibleImages subset)
    const actualIndex = filteredImages.findIndex(img => img.src === image.src);
    setSelectedImage({ image, index: actualIndex });
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
      {/* Header with Navigation - Mobile optimized */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <button
              onClick={() => navigate('/#projects')}
              className="flex items-center gap-1 sm:gap-2 text-gray-400 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-medium text-sm sm:text-base hidden sm:inline">Back</span>
            </button>

            {/* Title */}
            <h1 className="text-lg sm:text-xl font-bold text-white flex items-center gap-1 sm:gap-2">
              <Grid3X3 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <span className="hidden sm:inline">All Projects</span>
              <span className="sm:hidden">Gallery</span>
              <span className="text-xs sm:text-sm text-gray-400">({allProjectImages.length})</span>
            </h1>

            {/* Navigation Links - Desktop */}
            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors">
                <Home className="w-4 h-4" />
                <span className="text-sm">Home</span>
              </button>
              <button onClick={() => navigate('/#about')} className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors">
                <User className="w-4 h-4" />
                <span className="text-sm">About</span>
              </button>
              <button onClick={() => navigate('/#skills')} className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors">
                <Wrench className="w-4 h-4" />
                <span className="text-sm">Skills</span>
              </button>
              <button onClick={() => navigate('/#connect')} className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                <span className="text-sm">Contact</span>
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden w-10" />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center justify-center gap-4 mt-3 pt-3 border-t border-gray-800">
            <button onClick={() => navigate('/')} className="text-gray-400 hover:text-primary transition-colors">
              <Home className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('/#about')} className="text-gray-400 hover:text-primary transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('/#skills')} className="text-gray-400 hover:text-primary transition-colors">
              <Wrench className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('/#connect')} className="text-gray-400 hover:text-primary transition-colors">
              <Mail className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Buttons - Mobile optimized */}
      <div className="pt-28 sm:pt-24 pb-3 sm:pb-4 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setDisplayCount(24);
                  // Update URL to reflect the filter change
                  navigate(`/projects?category=${encodeURIComponent(cat)}`, { replace: true });
                }}
                className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  filter === cat
                    ? 'bg-primary text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <span className="sm:hidden">{cat.slice(0, 4)}{cat.length > 4 ? '..' : ''}</span>
                <span className="hidden sm:inline">{cat}</span>
                <span className="ml-1 sm:ml-2 text-xs opacity-70">
                  {allProjectImages.filter(img => img.category === cat).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count - Mobile optimized */}
      <div className="px-3 sm:px-4 pb-3 sm:pb-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-xs sm:text-sm">
            {visibleImages.length} of {filteredImages.length} projects
          </p>
        </div>
      </div>

      {/* YouTube-Style Grid - Mobile optimized spacing */}
      <div className="px-2 sm:px-4 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
            {visibleImages.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                onClick={() => handleImageClick(image)}
                className="group cursor-pointer"
              >
                <LazyImage
                  src={image.src}
                  alt={image.title}
                  onClick={() => handleImageClick(image)}
                  aspectRatio="aspect-auto"
                  objectFit="object-contain"
                  className="rounded-lg"
                />
                {/* Title below thumbnail - Mobile optimized */}
                <div className="mt-1 sm:mt-2">
                  <h3 className="text-white text-xs sm:text-sm font-medium line-clamp-1 sm:line-clamp-2 group-hover:text-primary transition-colors">
                    {image.title}
                  </h3>
                  <p className="text-gray-500 text-xs mt-0.5 hidden sm:block">{image.category}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button - Mobile optimized */}
          {displayCount < filteredImages.length && (
            <div className="mt-8 sm:mt-12 text-center">
              <button
                onClick={loadMore}
                className="px-6 py-2.5 sm:px-8 sm:py-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/50 rounded-full font-medium text-sm sm:text-base transition-all"
              >
                <span className="sm:hidden">Load More ({filteredImages.length - displayCount})</span>
                <span className="hidden sm:inline">Load More ({filteredImages.length - displayCount} remaining)</span>
              </button>
            </div>
          )}

          {/* End of Results */}
          {displayCount >= filteredImages.length && filteredImages.length > 0 && (
            <div className="mt-8 sm:mt-12 text-center">
              <p className="text-gray-500 text-xs sm:text-sm">
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
