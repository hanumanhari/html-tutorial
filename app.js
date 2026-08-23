/**
 * ============================================================================
 * தமிழ் வேத ஜோதிட ஜாதக கணிப்பான் - Application Engine (app.js)
 * Tamil Vedic Astrology Engine with High Precision Ephemeris,
 * Lahiri Ayanamsa, South Indian Chart Renderer, Vimshottari Dasa, & Predictions
 * ============================================================================
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. ASTRONOMICAL & ASTROLOGICAL CONSTANTS & REFERENCE TABLES
  // ==========================================================================

  const RASIS = [
    { id: 0, nameTa: 'மேஷம்', nameEn: 'Mesham (Aries)', lord: 'Mars', lordTa: 'செவ்வாய்', element: 'நெருப்பு (Fire)', nature: 'சரம் (Chara)' },
    { id: 1, nameTa: 'ரிஷபம்', nameEn: 'Rishabham (Taurus)', lord: 'Venus', lordTa: 'சுக்கிரன்', element: 'நிலம் (Earth)', nature: 'ஸ்திரம் (Sthira)' },
    { id: 2, nameTa: 'மிதுனம்', nameEn: 'Mithunam (Gemini)', lord: 'Mercury', lordTa: 'புதன்', element: 'காற்று (Air)', nature: 'உபயம் (Ubhaya)' },
    { id: 3, nameTa: 'கடகம்', nameEn: 'Kadagam (Cancer)', lord: 'Moon', lordTa: 'சந்திரன்', element: 'நீர் (Water)', nature: 'சரம் (Chara)' },
    { id: 4, nameTa: 'சிம்மம்', nameEn: 'Simmam (Leo)', lord: 'Sun', lordTa: 'சூரியன்', element: 'நெருப்பு (Fire)', nature: 'ஸ்திரம் (Sthira)' },
    { id: 5, nameTa: 'கன்னி', nameEn: 'Kanni (Virgo)', lord: 'Mercury', lordTa: 'புதன்', element: 'நிலம் (Earth)', nature: 'உபயம் (Ubhaya)' },
    { id: 6, nameTa: 'துலாம்', nameEn: 'Thulam (Libra)', lord: 'Venus', lordTa: 'சுக்கிரன்', element: 'காற்று (Air)', nature: 'சரம் (Chara)' },
    { id: 7, nameTa: 'விருச்சிகம்', nameEn: 'Viruchigam (Scorpio)', lord: 'Mars', lordTa: 'செவ்வாய்', element: 'நீர் (Water)', nature: 'ஸ்திரம் (Sthira)' },
    { id: 8, nameTa: 'தனுசு', nameEn: 'Dhanusu (Sagittarius)', lord: 'Jupiter', lordTa: 'குரு', element: 'நெருப்பு (Fire)', nature: 'உபயம் (Ubhaya)' },
    { id: 9, nameTa: 'மகரம்', nameEn: 'Magaram (Capricorn)', lord: 'Saturn', lordTa: 'சனி', element: 'நிலம் (Earth)', nature: 'சரம் (Chara)' },
    { id: 10, nameTa: 'கும்பம்', nameEn: 'Kumbam (Aquarius)', lord: 'Saturn', lordTa: 'சனி', element: 'காற்று (Air)', nature: 'ஸ்திரம் (Sthira)' },
    { id: 11, nameTa: 'மீனம்', nameEn: 'Meenam (Pisces)', lord: 'Jupiter', lordTa: 'குரு', element: 'நீர் (Water)', nature: 'உபயம் (Ubhaya)' }
  ];

  const NAKSHATRAS = [
    { id: 0, nameTa: 'அசுவினி', nameEn: 'Ashwini', lord: 'Ketu', lordTa: 'கேது' },
    { id: 1, nameTa: 'பரணி', nameEn: 'Bharani', lord: 'Venus', lordTa: 'சுக்கிரன்' },
    { id: 2, nameTa: 'கார்த்திகை', nameEn: 'Krittika', lord: 'Sun', lordTa: 'சூரியன்' },
    { id: 3, nameTa: 'ரோகிணி', nameEn: 'Rohini', lord: 'Moon', lordTa: 'சந்திரன்' },
    { id: 4, nameTa: 'மிருகசீரிஷம்', nameEn: 'Mrigashira', lord: 'Mars', lordTa: 'செவ்வாய்' },
    { id: 5, nameTa: 'திருவாதிரை', nameEn: 'Ardra', lord: 'Rahu', lordTa: 'ராகு' },
    { id: 6, nameTa: 'புனர்பூசம்', nameEn: 'Punarvasu', lord: 'Jupiter', lordTa: 'குரு' },
    { id: 7, nameTa: 'பூசம்', nameEn: 'Pushya', lord: 'Saturn', lordTa: 'சனி' },
    { id: 8, nameTa: 'ஆயில்யம்', nameEn: 'Ashlesha', lord: 'Mercury', lordTa: 'புதன்' },
    { id: 9, nameTa: 'மகம்', nameEn: 'Magha', lord: 'Ketu', lordTa: 'கேது' },
    { id: 10, nameTa: 'பூரம்', nameEn: 'Purva Phalguni', lord: 'Venus', lordTa: 'சுக்கிரன்' },
    { id: 11, nameTa: 'உத்திரம்', nameEn: 'Uttara Phalguni', lord: 'Sun', lordTa: 'சூரியன்' },
    { id: 12, nameTa: 'அஸ்தம்', nameEn: 'Hasta', lord: 'Moon', lordTa: 'சந்திரன்' },
    { id: 13, nameTa: 'சித்திரை', nameEn: 'Chitra', lord: 'Mars', lordTa: 'செவ்வாய்' },
    { id: 14, nameTa: 'சுவாதி', nameEn: 'Swati', lord: 'Rahu', lordTa: 'ராகு' },
    { id: 15, nameTa: 'விசாகம்', nameEn: 'Vishakha', lord: 'Jupiter', lordTa: 'குரு' },
    { id: 16, nameTa: 'அனுஷம்', nameEn: 'Anuradha', lord: 'Saturn', lordTa: 'சனி' },
    { id: 17, nameTa: 'கேட்டை', nameEn: 'Jyeshtha', lord: 'Mercury', lordTa: 'புதன்' },
    { id: 18, nameTa: 'மூலம்', nameEn: 'Mula', lord: 'Ketu', lordTa: 'கேது' },
    { id: 19, nameTa: 'பூராடம்', nameEn: 'Purva Ashadha', lord: 'Venus', lordTa: 'சுக்கிரன்' },
    { id: 20, nameTa: 'உத்திராடம்', nameEn: 'Uttara Ashadha', lord: 'Sun', lordTa: 'சூரியன்' },
    { id: 21, nameTa: 'திருவோணம்', nameEn: 'Shravana', lord: 'Moon', lordTa: 'சந்திரன்' },
    { id: 22, nameTa: 'அவிட்டம்', nameEn: 'Dhanishta', lord: 'Mars', lordTa: 'செவ்வாய்' },
    { id: 23, nameTa: 'சதயம்', nameEn: 'Shatabhisha', lord: 'Rahu', lordTa: 'ராகு' },
    { id: 24, nameTa: 'பூரட்டாதி', nameEn: 'Purva Bhadrapada', lord: 'Jupiter', lordTa: 'குரு' },
    { id: 25, nameTa: 'உத்திரட்டாதி', nameEn: 'Uttara Bhadrapada', lord: 'Saturn', lordTa: 'சனி' },
    { id: 26, nameTa: 'ரேவதி', nameEn: 'Revati', lord: 'Mercury', lordTa: 'புதன்' }
  ];

  const PLANET_CONFIG = {
    Sun: { key: 'Sun', nameTa: 'சூரியன்', shortTa: 'சூ', class: 'sun', exaltRasi: 0, debilitateRasi: 6, ownRasis: [4] },
    Moon: { key: 'Moon', nameTa: 'சந்திரன்', shortTa: 'சந்', class: 'moon', exaltRasi: 1, debilitateRasi: 7, ownRasis: [3] },
    Mars: { key: 'Mars', nameTa: 'செவ்வாய்', shortTa: 'செவ்', class: 'mars', exaltRasi: 9, debilitateRasi: 3, ownRasis: [0, 7] },
    Mercury: { key: 'Mercury', nameTa: 'புதன்', shortTa: 'புத', class: 'mercury', exaltRasi: 5, debilitateRasi: 11, ownRasis: [2, 5] },
    Jupiter: { key: 'Jupiter', nameTa: 'குரு', shortTa: 'குரு', class: 'jupiter', exaltRasi: 3, debilitateRasi: 9, ownRasis: [8, 11] },
    Venus: { key: 'Venus', nameTa: 'சுக்கிரன்', shortTa: 'சுக்', class: 'venus', exaltRasi: 11, debilitateRasi: 5, ownRasis: [1, 6] },
    Saturn: { key: 'Saturn', nameTa: 'சனி', shortTa: 'சனி', class: 'saturn', exaltRasi: 6, debilitateRasi: 0, ownRasis: [9, 10] },
    Rahu: { key: 'Rahu', nameTa: 'ராகு', shortTa: 'ராகு', class: 'rahu', exaltRasi: 1, debilitateRasi: 7, ownRasis: [10] },
    Ketu: { key: 'Ketu', nameTa: 'கேது', shortTa: 'கேது', class: 'ketu', exaltRasi: 7, debilitateRasi: 1, ownRasis: [8] },
    Lagna: { key: 'Lagna', nameTa: 'லக்னம்', shortTa: 'லக்', class: 'lagna' },
    Mandi: { key: 'Mandi', nameTa: 'மாந்தி (குளிகன்)', shortTa: 'மாந்', class: 'mandi' }
  };

  const DASA_YEARS = {
    Ketu: 7, Venus: 20, Sun: 6, Moon: 10, Mars: 7, Rahu: 18, Jupiter: 16, Saturn: 19, Mercury: 17
  };

  const DASA_ORDER = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];

  const DASA_NAMES_TA = {
    Ketu: 'கேது தசை', Venus: 'சுக்கிர தசை', Sun: 'சூரிய தசை', Moon: 'சந்திர தசை',
    Mars: 'செவ்வாய் தசை', Rahu: 'ராகு தசை', Jupiter: 'குரு தசை', Saturn: 'சனி தசை', Mercury: 'புதன் தசை'
  };

  const YOGAS_27 = [
    'விஷ்கம்பம்', 'ப்ரீதி', 'ஆயுஷ்மான்', 'சௌபாக்யம்', 'சோபனம்', 'அதிகண்டம்', 'சுகர்மம்', 'த்ருதி',
    'சூலம்', 'கண்டம்', 'வ்ருத்தி', 'த்ருவம்', 'வ்யாகாதம்', 'ஹர்ஷணம்', 'வஜ்ரம்', 'சித்தி',
    'வியதீபாதம்', 'வரியான்', 'பரிகம்', 'சிவம்', 'சித்தம்', 'சாத்தியம்', 'சுபம்', 'சுப்ரம்',
    'பிராமியம்', 'ஐந்திரம்', 'வைதிருதி'
  ];

  const KARANAS_11 = [
    'பவ', 'பாலவ', 'கௌலவ', 'தைதுலை', 'கரசை', 'வணிசை', 'பத்திரை (விஷ்டி)',
    'சகுனி', 'சதுஷ்பாதம்', 'நாகவம்', 'கிம்துக்கினம்'
  ];

  const THITHI_NAMES = [
    'பிரதமை', 'துவிதியை', 'திருதியை', 'சதுர்த்தி', 'பஞ்சமி', 'சஷ்டி', 'சப்தமி',
    'அஷ்டமி', 'நவமி', 'தசமி', 'ஏகாதசி', 'துவாதசி', 'திரயோதசி', 'சதுர்த்தசி', 'பௌர்ணமி / அமாவாசை'
  ];

  const TAMIL_WEEKDAYS = ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'];

  // South Indian Chart Grid Mapping
  // Matrix layout: Row 0..3, Col 0..3 (12 outer cells, 4 center cells)
  const SOUTH_GRID_CELLS = [
    { row: 1, col: 1, rasiIndex: 11, name: 'மீனம்' },
    { row: 1, col: 2, rasiIndex: 0,  name: 'மேஷம்' },
    { row: 1, col: 3, rasiIndex: 1,  name: 'ரிஷபம்' },
    { row: 1, col: 4, rasiIndex: 2,  name: 'மிதுனம்' },

    { row: 2, col: 1, rasiIndex: 10, name: 'கும்பம்' },
    // Center occupies row 2, col 2-3 & row 3, col 2-3
    { row: 2, col: 4, rasiIndex: 3,  name: 'கடகம்' },

    { row: 3, col: 1, rasiIndex: 9,  name: 'மகரம்' },
    { row: 3, col: 4, rasiIndex: 4,  name: 'சிம்மம்' },

    { row: 4, col: 1, rasiIndex: 8,  name: 'தனுசு' },
    { row: 4, col: 2, rasiIndex: 7,  name: 'விருச்சிகம்' },
    { row: 4, col: 3, rasiIndex: 6,  name: 'துலாம்' },
    { row: 4, col: 4, rasiIndex: 5,  name: 'கன்னி' }
  ];

  // City Database with exact Coordinates & Timezone
  const CITIES_DB = [
    // Tamil Nadu Major Cities
    { group: 'தமிழ்நாடு (Tamil Nadu)', name: 'சென்னை (Chennai)', lat: 13.0827, lng: 80.2707, tz: 5.5 },
    { group: 'தமிழ்நாடு (Tamil Nadu)', name: 'மதுரை (Madurai)', lat: 9.9252, lng: 78.1198, tz: 5.5 },
    { group: 'தமிழ்நாடு (Tamil Nadu)', name: 'கோயம்புத்தூர் (Coimbatore)', lat: 11.0168, lng: 76.9558, tz: 5.5 },
    { group: 'தமிழ்நாடு (Tamil Nadu)', name: 'திருச்சிராப்பள்ளி (Tiruchirappalli)', lat: 10.7905, lng: 78.7047, tz: 5.5 },
    { group: 'தமிழ்நாடு (Tamil Nadu)', name: 'சேலம் (Salem)', lat: 11.6643, lng: 78.1460, tz: 5.5 },
    { group: 'தமிழ்நாடு (Tamil Nadu)', name: 'திருநெல்வேலி (Tirunelveli)', lat: 8.7139, lng: 77.7567, tz: 5.5 },
    { group: 'தமிழ்நாடு (Tamil Nadu)', name: 'ஈரோடு (Erode)', lat: 11.3410, lng: 77.7172, tz: 5.5 },
    { group: 'தமிழ்நாடு (Tamil Nadu)', name: 'வேலூர் (Vellore)', lat: 12.9165, lng: 79.1325, tz: 5.5 },
    { group: 'தமிழ்நாடு (Tamil Nadu)', name: 'தஞ்சாவூர் (Thanjavur)', lat: 10.7870, lng: 79.1378, tz: 5.5 },
    { group: 'தமிழ்நாடு (Tamil Nadu)', name: 'திண்டுக்கல் (Dindigul)', lat: 10.3673, lng: 77.9803, tz: 5.5 },
    { group: 'தமிழ்நாடு (Tamil Nadu)', name: 'நாகர்கோவில் / குமரி (Nagercoil)', lat: 8.1833, lng: 77.4119, tz: 5.5 },
    { group: 'தமிழ்நாடு (Tamil Nadu)', name: 'காஞ்சிபுரம் (Kanchipuram)', lat: 12.8342, lng: 79.7036, tz: 5.5 },
    { group: 'தமிழ்நாடு (Tamil Nadu)', name: 'கும்பகோணம் (Kumbakonam)', lat: 10.9602, lng: 79.3845, tz: 5.5 },
    { group: 'தமிழ்நாடு (Tamil Nadu)', name: 'திருவண்ணாமலை (Tiruvannamalai)', lat: 12.2253, lng: 79.0747, tz: 5.5 },
    { group: 'தமிழ்நாடு (Tamil Nadu)', name: 'தூத்துக்குடி (Tuticorin)', lat: 8.7642, lng: 78.1348, tz: 5.5 },
    { group: 'தமிழ்நாடு (Tamil Nadu)', name: 'கரூர் (Karur)', lat: 10.9601, lng: 78.0766, tz: 5.5 },
    { group: 'தமிழ்நாடு (Tamil Nadu)', name: 'இராமநாதபுரம் (Ramanathapuram)', lat: 9.3639, lng: 78.8395, tz: 5.5 },
    { group: 'தமிழ்நாடு (Tamil Nadu)', name: 'சிவகங்கை / காரைக்குடி (Karaikudi)', lat: 10.0667, lng: 78.7833, tz: 5.5 },
    { group: 'தமிழ்நாடு (Tamil Nadu)', name: 'புதுச்சேரி (Puducherry)', lat: 11.9416, lng: 79.8083, tz: 5.5 },

    // India Major Cities
    { group: 'இந்தியா (Other India)', name: 'பெங்களூரு (Bengaluru)', lat: 12.9716, lng: 77.5946, tz: 5.5 },
    { group: 'இந்தியா (Other India)', name: 'ஹைதராபாத் (Hyderabad)', lat: 17.3850, lng: 78.4867, tz: 5.5 },
    { group: 'இந்தியா (Other India)', name: 'மும்பை (Mumbai)', lat: 19.0760, lng: 72.8777, tz: 5.5 },
    { group: 'இந்தியா (Other India)', name: 'புது தில்லி (New Delhi)', lat: 28.6139, lng: 77.2090, tz: 5.5 },
    { group: 'இந்தியா (Other India)', name: 'கொல்கத்தா (Kolkata)', lat: 22.5726, lng: 88.3639, tz: 5.5 },
    { group: 'இந்தியா (Other India)', name: 'திருவனந்தபுரம் (Trivandrum)', lat: 8.5241, lng: 76.9366, tz: 5.5 },
    { group: 'இந்தியா (Other India)', name: 'கொச்சி (Kochi)', lat: 9.9312, lng: 76.2673, tz: 5.5 },

    // International Cities
    { group: 'சர்வதேசம் (International)', name: 'கொழும்பு (Colombo, Sri Lanka)', lat: 6.9271, lng: 79.8612, tz: 5.5 },
    { group: 'சர்வதேசம் (International)', name: 'யாழ்ப்பாணம் (Jaffna, Sri Lanka)', lat: 9.6615, lng: 80.0255, tz: 5.5 },
    { group: 'சர்வதேசம் (International)', name: 'சிங்கப்பூர் (Singapore)', lat: 1.3521, lng: 103.8198, tz: 8.0 },
    { group: 'சர்வதேசம் (International)', name: 'கோலாலம்பூர் (Kuala Lumpur, Malaysia)', lat: 3.1390, lng: 101.6869, tz: 8.0 },
    { group: 'சர்வதேசம் (International)', name: 'துபாய் (Dubai, UAE)', lat: 25.2048, lng: 55.2708, tz: 4.0 },
    { group: 'சர்வதேசம் (International)', name: 'லண்டன் (London, UK)', lat: 51.5074, lng: -0.1278, tz: 0.0 },
    { group: 'சர்வதேசம் (International)', name: 'நியூயார்க் (New York, USA)', lat: 40.7128, lng: -74.0060, tz: -5.0 },
    { group: 'சர்வதேசம் (International)', name: 'টরன்டோ (Toronto, Canada)', lat: 43.6532, lng: -79.3832, tz: -5.0 },
    { group: 'சர்வதேசம் (International)', name: 'சிட்னி (Sydney, Australia)', lat: -33.8688, lng: 151.2093, tz: 10.0 }
  ];

  // Sample Preset Profiles
  const SAMPLE_PRESETS = {
    abdul_kalam: {
      name: 'டாக்டர் ஏ.பி.ஜே அப்துல் கலாம்',
      date: '1931-10-15',
      hour: '01',
      minute: '15',
      ampm: 'AM',
      gender: 'male',
      city: 'இராமநாதபுரம் (Ramanathapuram)'
    },
    vivekananda: {
      name: 'சுவாமி விவேகானந்தர்',
      date: '1863-01-12',
      hour: '06',
      minute: '33',
      ampm: 'AM',
      gender: 'male',
      city: 'கொல்கத்தா (Kolkata)'
    },
    sample_today: {
      name: 'இன்று பிறந்த குழந்தை',
      date: new Date().toISOString().split('T')[0],
      hour: '10',
      minute: '30',
      ampm: 'AM',
      gender: 'male',
      city: 'சென்னை (Chennai)'
    }
  };

  // ==========================================================================
  // 2. MATHEMATICAL & EPHEMERIS ENGINE (ASTRONOMICAL ALGORITHMS)
  // ==========================================================================

  const DEG2RAD = Math.PI / 180.0;
  const RAD2DEG = 180.0 / Math.PI;

  function norm360(deg) {
    let d = deg % 360.0;
    if (d < 0) d += 360.0;
    return d;
  }

  function degToDMS(deg) {
    const d = Math.floor(deg);
    const mTotal = (deg - d) * 60;
    const m = Math.floor(mTotal);
    const s = Math.round((mTotal - m) * 60);
    return {
      d, m, s,
      formatted: `${d}° ${m < 10 ? '0' : ''}${m}' ${s < 10 ? '0' : ''}${s}"`
    };
  }

  function getJulianDay(year, month, day, utHours) {
    let y = year;
    let m = month;
    if (m <= 2) {
      y -= 1;
      m += 12;
    }
    const A = Math.floor(y / 100);
    const B = 2 - A + Math.floor(A / 4);
    const dayFraction = day + (utHours / 24.0);
    const JD = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + dayFraction + B - 1524.5;
    return JD;
  }

  function getLahiriAyanamsa(JD, ayanamsaType = 'lahiri') {
    const T = (JD - 2451545.0) / 36525.0;
    // Standard Lahiri Ayanamsa: 23° 51' 25.53" at J2000.0 (23.85709167°) + precession
    let ayan = 23.85709167 + 1.3968878 * T + 0.0003086 * T * T;
    if (ayanamsaType === 'raman') {
      ayan = 22.46 + 1.396 * T;
    } else if (ayanamsaType === 'krishnamurti') {
      ayan = 23.75 + 1.396 * T;
    }
    return ayan;
  }

  function calculateSun(T) {
    const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
    const M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
    const Mrad = M * DEG2RAD;
    const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mrad)
            + (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad)
            + 0.000289 * Math.sin(3 * Mrad);
    const sunTrueLong = norm360(L0 + C);
    return {
      longitude: sunTrueLong,
      meanAnomaly: norm360(M)
    };
  }

  function calculateMoon(T) {
    const Lprime = 218.3164477 + 481267.88128 * T - 0.0015786 * T * T;
    const D = 297.8501921 + 445267.11140 * T - 0.0018819 * T * T;
    const M = 357.5291092 + 35999.05029 * T - 0.0001537 * T * T;
    const Mprime = 134.9633964 + 477198.86750 * T + 0.0087414 * T * T;
    const F = 93.2720950 + 483202.01752 * T - 0.0036539 * T * T;

    const Drad = D * DEG2RAD;
    const Mrad = M * DEG2RAD;
    const Mprad = Mprime * DEG2RAD;
    const Frad = F * DEG2RAD;

    // Truncated Meeus Lunar Periodic terms for high arcminute accuracy
    let sumL = 0;
    sumL += 6.288774 * Math.sin(Mprad);
    sumL += 1.274027 * Math.sin(2 * Drad - Mprad);
    sumL += 0.658314 * Math.sin(2 * Drad);
    sumL += 0.213618 * Math.sin(2 * Mprad);
    sumL -= 0.185116 * Math.sin(Mrad);
    sumL -= 0.114332 * Math.sin(2 * Frad);
    sumL += 0.058793 * Math.sin(2 * Drad - 2 * Mprad);
    sumL += 0.057066 * Math.sin(2 * Drad - Mrad - Mprad);
    sumL += 0.053322 * Math.sin(2 * Drad + Mprad);
    sumL += 0.046100 * Math.sin(2 * Drad - Mrad);
    sumL += 0.034728 * Math.sin(2 * Drad - Mprad + Mrad);
    sumL -= 0.030771 * Math.sin(Mprad + Mrad);
    sumL += 0.015327 * Math.sin(2 * Drad - 2 * Frad);
    sumL -= 0.012528 * Math.sin(Mprad + 2 * Frad);
    sumL -= 0.010980 * Math.sin(Mprad - 2 * Frad);
    sumL += 0.010675 * Math.sin(4 * Drad - Mprad);
    sumL += 0.010034 * Math.sin(2 * Mprad - Mrad);

    const moonTrueLong = norm360(Lprime + sumL);
    return {
      longitude: moonTrueLong,
      meanAnomaly: norm360(Mprime)
    };
  }

  function calculatePlanet(T, orbitalElements, sunLong, sunMeanAnomaly) {
    const { L0, L1, a, e0, e1, i0, i1, N0, N1, w0, w1 } = orbitalElements;

    const L = norm360(L0 + L1 * T);
    const e = e0 + e1 * T;
    const w = norm360(w0 + w1 * T);
    const M = norm360(L - w);
    const Mrad = M * DEG2RAD;

    // Equation of Center approximation
    const C = (2 * e - (e * e * e) / 4) * Math.sin(Mrad)
            + (5 / 4 * e * e) * Math.sin(2 * Mrad)
            + (13 / 12 * e * e * e) * Math.sin(3 * Mrad);
    const v = norm360(M + C * RAD2DEG);
    const helioLong = norm360(v + w);
    const r = a * (1 - e * e) / (1 + e * Math.cos(v * DEG2RAD));

    // Geocentric projection (Sun distance ~ 1.000000 AU)
    const sunR = 1.00014 - 0.01671 * Math.cos(sunMeanAnomaly * DEG2RAD);
    const sunGeocentricX = sunR * Math.cos(sunLong * DEG2RAD);
    const sunGeocentricY = sunR * Math.sin(sunLong * DEG2RAD);

    const helioX = r * Math.cos(helioLong * DEG2RAD);
    const helioY = r * Math.sin(helioLong * DEG2RAD);

    const geoX = helioX + sunGeocentricX;
    const geoY = helioY + sunGeocentricY;

    const geoLong = norm360(Math.atan2(geoY, geoX) * RAD2DEG);
    return geoLong;
  }

  const PLANET_ORBITS = {
    Mercury: {
      L0: 252.2509, L1: 149472.6746, a: 0.387098,
      e0: 0.20563069, e1: 0.00002527,
      i0: 7.004979, i1: -0.0059474,
      N0: 48.330765, N1: -0.1253408,
      w0: 77.45645, w1: 0.160476
    },
    Venus: {
      L0: 181.9798, L1: 58517.8156, a: 0.723332,
      e0: 0.00677323, e1: -0.00004938,
      i0: 3.394676, i1: -0.0007889,
      N0: 76.679842, N1: -0.2776941,
      w0: 131.5637, w1: 0.002683
    },
    Mars: {
      L0: 355.4330, L1: 19140.2993, a: 1.523679,
      e0: 0.09340062, e1: 0.00009206,
      i0: 1.849726, i1: -0.0006011,
      N0: 49.559538, N1: -0.2925734,
      w0: 336.0602, w1: 0.444410
    },
    Jupiter: {
      L0: 34.3515, L1: 3034.9057, a: 5.20260,
      e0: 0.04849485, e1: 0.00016324,
      i0: 1.303270, i1: -0.0001557,
      N0: 100.464441, N1: 0.2055529,
      w0: 14.7285, w1: 0.212526
    },
    Saturn: {
      L0: 50.0774, L1: 1222.1138, a: 9.55491,
      e0: 0.05550862, e1: -0.00034681,
      i0: 2.488878, i1: 0.0002551,
      N0: 113.665524, N1: -0.2566708,
      w0: 92.5989, w1: -0.418972
    }
  };

  function calculateRahuKetu(T) {
    // Mean North Node (Rahu)
    let node = 125.04452 - 1934.136261 * T + 0.0020708 * T * T;
    // Periodic true oscillation
    const D = 297.8501921 + 445267.11140 * T;
    const F = 93.2720950 + 483202.01752 * T;
    node -= 0.28 * Math.sin(2 * (F - D) * DEG2RAD);
    const rahu = norm360(node);
    const ketu = norm360(rahu + 180.0);
    return { rahu, ketu };
  }

  function calculateLagna(JD, lat, lng) {
    const T = (JD - 2451545.0) / 36525.0;
    // Greenwich Mean Sidereal Time (degrees)
    const GMST0 = 280.46061837 + 360.98564736629 * (JD - 2451545.0) + 0.000387933 * T * T - (T * T * T) / 38710000.0;
    const LST = norm360(GMST0 + lng); // Local Sidereal Time in degrees
    const eps = 23.439291 - 0.0130042 * T; // Obliquity of Ecliptic

    const ramcRad = LST * DEG2RAD;
    const epsRad = eps * DEG2RAD;
    const latRad = lat * DEG2RAD;

    // Ascendant (Tropical / Sayana)
    const y = -Math.cos(ramcRad);
    const x = Math.sin(ramcRad) * Math.cos(epsRad) + Math.tan(latRad) * Math.sin(epsRad);
    let sayanaAsc = Math.atan2(y, x) * RAD2DEG;
    sayanaAsc = norm360(sayanaAsc);

    return { sayanaAsc, lstHours: LST / 15.0 };
  }

  // ==========================================================================
  // 3. VEDIC ASTROLOGY ENGINE & PLACEMENTS
  // ==========================================================================

  function getSiderealInfo(longitude) {
    const norm = norm360(longitude);
    const rasiIndex = Math.floor(norm / 30.0);
    const degInRasi = norm - (rasiIndex * 30.0);

    const totalMinutes = norm * 60.0;
    const nakshatraIndex = Math.min(26, Math.floor(totalMinutes / 800.0)); // 13°20' = 800'
    const remainderMinutes = totalMinutes - (nakshatraIndex * 800.0);
    const pada = Math.min(4, Math.floor(remainderMinutes / 200.0) + 1); // 3°20' = 200'

    // Navamsha (D9) calculation: 108 padas total
    const padaTotal = Math.floor(totalMinutes / 200.0);
    const navamshaRasiIndex = padaTotal % 12;

    return {
      nirayanaLong: norm,
      rasiIndex,
      rasi: RASIS[rasiIndex],
      degInRasi,
      dms: degToDMS(degInRasi),
      nakshatraIndex,
      nakshatra: NAKSHATRAS[nakshatraIndex],
      pada,
      navamshaRasiIndex,
      navamshaRasi: RASIS[navamshaRasiIndex]
    };
  }

  function getPlanetDignity(planetKey, rasiIndex, sunLong, planetLong, isRetrograde) {
    const config = PLANET_CONFIG[planetKey];
    if (!config) return { code: 'neutral', labelTa: 'சமம்', tagClass: 'state-friend' };

    // Check combustion with Sun (except Sun, Rahu, Ketu)
    if (planetKey !== 'Sun' && planetKey !== 'Rahu' && planetKey !== 'Ketu' && planetKey !== 'Lagna' && planetKey !== 'Mandi') {
      let diffSun = Math.abs(planetLong - sunLong);
      if (diffSun > 180) diffSun = 360 - diffSun;
      if (diffSun < 6.5) {
        return { code: 'combust', labelTa: 'அஸ்தமனம்', tagClass: 'state-combust' };
      }
    }

    if (isRetrograde && planetKey !== 'Rahu' && planetKey !== 'Ketu' && planetKey !== 'Sun' && planetKey !== 'Moon') {
      return { code: 'retro', labelTa: 'வக்ரம்', tagClass: 'state-retro' };
    }

    if (config.exaltRasi === rasiIndex) {
      return { code: 'exalt', labelTa: 'உச்சம்', tagClass: 'state-exalt' };
    }
    if (config.debilitateRasi === rasiIndex) {
      return { code: 'debilitate', labelTa: 'நீசம்', tagClass: 'state-debilitate' };
    }
    if (config.ownRasis && config.ownRasis.includes(rasiIndex)) {
      return { code: 'own', labelTa: 'ஆட்சி', tagClass: 'state-own' };
    }

    // Friendly / Neutral / Enemy rough dignity
    const rasiLord = RASIS[rasiIndex].lord;
    const friendlyMap = {
      Sun: ['Moon', 'Mars', 'Jupiter'],
      Moon: ['Sun', 'Mercury'],
      Mars: ['Sun', 'Moon', 'Jupiter'],
      Mercury: ['Sun', 'Venus'],
      Jupiter: ['Sun', 'Moon', 'Mars'],
      Venus: ['Mercury', 'Saturn'],
      Saturn: ['Mercury', 'Venus'],
      Rahu: ['Mercury', 'Venus', 'Saturn'],
      Ketu: ['Mars', 'Jupiter']
    };

    if (friendlyMap[planetKey] && friendlyMap[planetKey].includes(rasiLord)) {
      return { code: 'friend', labelTa: 'நட்பு', tagClass: 'state-friend' };
    }

    return { code: 'neutral', labelTa: 'சமம் / பார்வை', tagClass: 'state-friend' };
  }

  // Calculate Mandi / Gulikan
  function calculateMandi(dayOfWeek, birthHour, birthMinute, sunriseHour = 6.0, sunsetHour = 18.0, lagnaLong = 0) {
    // Gulika duration portion table for day (1 to 7 weekdays: Sun to Sat)
    const gulikaGhatisDay = [26, 22, 18, 14, 10, 6, 2]; // 1 ghati = 24 mins
    const ghati = gulikaGhatisDay[dayOfWeek] || 14;
    const offsetHours = (ghati * 24) / 60.0;
    const mandiDeg = norm360(lagnaLong + (offsetHours * 15.0));
    return mandiDeg;
  }

  // ==========================================================================
  // 4. VIMSHOTTARI DASHA - BHUKTI ENGINE
  // ==========================================================================

  function calculateVimshottari(moonSiderealLong, birthDateObj) {
    const totalMinutes = moonSiderealLong * 60.0;
    const nakshatraIndex = Math.min(26, Math.floor(totalMinutes / 800.0));
    const star = NAKSHATRAS[nakshatraIndex];
    const lord = star.lord;

    const startMinutes = nakshatraIndex * 800.0;
    const elapsedMinutes = totalMinutes - startMinutes;
    const fractionElapsed = elapsedMinutes / 800.0;
    const fractionBalance = 1.0 - fractionElapsed;

    const totalYears = DASA_YEARS[lord];
    const balanceYearsTotal = fractionBalance * totalYears;

    const bYears = Math.floor(balanceYearsTotal);
    const mTotal = (balanceYearsTotal - bYears) * 12.0;
    const bMonths = Math.floor(mTotal);
    const bDays = Math.round((mTotal - bMonths) * 30.0);

    const dasaBalance = {
      lord,
      lordTa: star.lordTa,
      dasaNameTa: DASA_NAMES_TA[lord],
      years: bYears,
      months: bMonths,
      days: bDays,
      totalFractionYears: balanceYearsTotal,
      formatted: `${bYears} வருடம், ${bMonths} மாதம், ${bDays} நாள்`
    };

    // Generate Full Lifetime Dasa List
    const startIndex = DASA_ORDER.indexOf(lord);
    let currentDate = new Date(birthDateObj.getTime());
    
    // First Dasa end date
    const firstEndMs = currentDate.getTime() + (balanceYearsTotal * 365.25 * 24 * 3600 * 1000);
    const firstEndDate = new Date(firstEndMs);

    const lifetimeDasas = [];

    // 1st Dasa (Partial balance)
    lifetimeDasas.push({
      lord,
      lordTa: star.lordTa,
      dasaNameTa: DASA_NAMES_TA[lord],
      totalYears: totalYears,
      effectiveYears: balanceYearsTotal,
      startDate: new Date(currentDate.getTime()),
      endDate: firstEndDate,
      isBalance: true,
      bhuktis: generateBhuktis(lord, currentDate, firstEndDate, fractionElapsed)
    });

    currentDate = new Date(firstEndDate.getTime());

    // Subsequent 8 Dasas (Full 120 year cycle)
    for (let i = 1; i < 9; i++) {
      const nextLord = DASA_ORDER[(startIndex + i) % 9];
      const yrs = DASA_YEARS[nextLord];
      const nextEndMs = currentDate.getTime() + (yrs * 365.25 * 24 * 3600 * 1000);
      const nextEndDate = new Date(nextEndMs);

      lifetimeDasas.push({
        lord: nextLord,
        lordTa: DASA_NAMES_TA[nextLord].replace(' தசை', ''),
        dasaNameTa: DASA_NAMES_TA[nextLord],
        totalYears: yrs,
        effectiveYears: yrs,
        startDate: new Date(currentDate.getTime()),
        endDate: nextEndDate,
        isBalance: false,
        bhuktis: generateBhuktis(nextLord, currentDate, nextEndDate, 0)
      });

      currentDate = new Date(nextEndDate.getTime());
    }

    return { dasaBalance, lifetimeDasas };
  }

  function generateBhuktis(majorLord, startDate, endDate, skipFraction = 0) {
    const totalMajorYears = DASA_YEARS[majorLord];
    const startIndex = DASA_ORDER.indexOf(majorLord);
    const bhuktis = [];

    let currentStart = new Date(startDate.getTime());

    for (let i = 0; i < 9; i++) {
      const subLord = DASA_ORDER[(startIndex + i) % 9];
      const subYears = (totalMajorYears * DASA_YEARS[subLord]) / 120.0;
      const subMs = subYears * 365.25 * 24 * 3600 * 1000;
      const subEnd = new Date(currentStart.getTime() + subMs);

      bhuktis.push({
        majorLord,
        subLord,
        subLordTa: DASA_NAMES_TA[subLord].replace(' தசை', ''),
        startDate: new Date(currentStart.getTime()),
        endDate: subEnd,
        years: subYears
      });

      currentStart = new Date(subEnd.getTime());
    }

    return bhuktis;
  }

  // ==========================================================================
  // 5. DOSHAS, YOGAS & ASTROLOGICAL READINGS
  // ==========================================================================

  function analyzeDoshasAndYogas(planetsMap, lagnaRasiIndex, moonRasiIndex) {
    const mars = planetsMap.Mars;
    const jupiter = planetsMap.Jupiter;
    const moon = planetsMap.Moon;
    const sun = planetsMap.Sun;
    const mercury = planetsMap.Mercury;
    const venus = planetsMap.Venus;
    const saturn = planetsMap.Saturn;
    const rahu = planetsMap.Rahu;
    const ketu = planetsMap.Ketu;

    const lagnaHouse = lagnaRasiIndex;

    // Helper: House number from reference (1 to 12)
    function houseFrom(refRasi, planetRasi) {
      return ((planetRasi - refRasi + 12) % 12) + 1;
    }

    // 1. செவ்வாய் தோஷம் (Kuja / Mars Dosha)
    const marsHouseLagna = houseFrom(lagnaHouse, mars.rasiIndex);
    const marsHouseMoon = houseFrom(moonRasiIndex, mars.rasiIndex);
    const marsHouseVenus = houseFrom(venus.rasiIndex, mars.rasiIndex);

    const doshaHouses = [2, 4, 7, 8, 12];
    const hasMarsDoshaRaw = doshaHouses.includes(marsHouseLagna) ||
                            doshaHouses.includes(marsHouseMoon) ||
                            doshaHouses.includes(marsHouseVenus);

    // Exceptions
    let marsDoshaCancelled = false;
    let marsCancelReason = '';
    if (mars.rasiIndex === 0 || mars.rasiIndex === 7) {
      marsDoshaCancelled = true;
      marsCancelReason = 'செவ்வாய் தனது சொந்த வீட்டில் (மேஷம்/விருச்சிகம்) ஆட்சி பெற்றுள்ளதால் தோஷ நிவர்த்தி.';
    } else if (mars.rasiIndex === 9) {
      marsDoshaCancelled = true;
      marsCancelReason = 'செவ்வாய் மகரத்தில் உச்சம் பெற்றுள்ளதால் தோஷ நிவர்த்தி.';
    } else if (mars.rasiIndex === jupiter.rasiIndex || houseFrom(mars.rasiIndex, jupiter.rasiIndex) === 7) {
      marsDoshaCancelled = true;
      marsCancelReason = 'செவ்வாய் குருவுடன் சேர்ந்தோ அல்லது குருவின் பார்வை பெற்றிருப்பதாலோ தோஷம் நீங்கியுள்ளது.';
    } else if (marsHouseLagna === 2 && (mars.rasiIndex === 2 || mars.rasiIndex === 5)) {
      marsDoshaCancelled = true;
      marsCancelReason = 'மிதுனம்/கன்னியில் 2-ல் செவ்வாய் அமைந்ததால் தோஷ விலக்கு.';
    }

    const marsDosha = {
      present: hasMarsDoshaRaw && !marsDoshaCancelled,
      rawPresent: hasMarsDoshaRaw,
      cancelled: marsDoshaCancelled,
      cancelReason: marsCancelReason,
      marsHouseLagna
    };

    // 2. ராகு-கேது சர்ப்ப தோஷம் (Kala Sarpa Dosha Check)
    // Check if all 7 planets fall within one side of Rahu-Ketu axis
    const rahuR = rahu.rasiIndex;
    const ketuR = ketu.rasiIndex;
    let sideA = 0;
    let sideB = 0;
    const physPlanets = [sun, moon, mars, mercury, jupiter, venus, saturn];

    physPlanets.forEach(p => {
      const r = p.rasiIndex;
      // Distance from Rahu forward to planet
      const dist = (r - rahuR + 12) % 12;
      if (dist > 0 && dist < 6) sideA++;
      else if (dist > 6) sideB++;
    });

    const isKalaSarpa = (sideA === 7 || sideB === 7);

    // 3. சுப யோகங்கள் (Auspicious Yogas)
    const yogasList = [];

    // Gajakesari Yoga: Jupiter in 1, 4, 7, 10 from Moon
    const jupFromMoon = houseFrom(moonRasiIndex, jupiter.rasiIndex);
    if ([1, 4, 7, 10].includes(jupFromMoon)) {
      yogasList.push({
        name: 'கஜகேசரி யோகம் (Gaja Kesari Yoga)',
        desc: 'சந்திரனுக்கு கேந்திரத்தில் (1, 4, 7, 10) தேவகுரு வியாழன் அமர்ந்துள்ளார். இது நிறைந்த புகழ், ஞானம், சொல்வாக்கு, தலைமைப் பண்பு மற்றும் நிலையான செல்வத்தை அருளும் மிக உன்னதமான யோகமாகும்.'
      });
    }

    // Budhaditya Yoga: Sun & Mercury in same house
    if (sun.rasiIndex === mercury.rasiIndex) {
      yogasList.push({
        name: 'புதாதித்ய யோகம் (Budhaditya Yoga)',
        desc: 'சூரியனும் புதனும் ஒரே ராசியில் இணைந்துள்ளனர். இது கூர்மையான புத்தி கூர்மை, சிறந்த கல்வி, கணிதத் திறன் மற்றும் அரச/நிர்வாகத் துறைகளில் உயர்ந்த பதவிகளைப் பெற்றுத்தரும் யோகம்.'
      });
    }

    // Guru Mangala Yoga: Jupiter & Mars together or mutual aspect
    if (jupiter.rasiIndex === mars.rasiIndex || houseFrom(jupiter.rasiIndex, mars.rasiIndex) === 7) {
      yogasList.push({
        name: 'குரு மங்கள யோகம் (Guru Mangala Yoga)',
        desc: 'குருவும் செவ்வாயும் இணைந்தோ அல்லது சமசப்தம பார்வையைப் பெற்றோ உள்ளனர். இது நிலபுலன்கள், வீடு-வாகனம், அசையா சொத்துக்கள் மற்றும் சமுதாயத்தில் உயர்ந்த கௌரவத்தை வழங்கும்.'
      });
    }

    // Dharma Karmadhipati Yoga: 9th & 10th lords together or mutual aspect
    const lord9 = RASIS[(lagnaHouse + 8) % 12].lord;
    const lord10 = RASIS[(lagnaHouse + 9) % 12].lord;
    if (lord9 && lord10 && lord9 !== lord10) {
      const p9 = planetsMap[lord9];
      const p10 = planetsMap[lord10];
      if (p9 && p10 && (p9.rasiIndex === p10.rasiIndex || houseFrom(p9.rasiIndex, p10.rasiIndex) === 7)) {
        yogasList.push({
          name: 'தர்ம கர்மாதிபதி ராஜயோகம் (Dharma Karmadhipati Yoga)',
          desc: 'பாக்கியாதிபதியும் (9) ஜீவனாதிபதியும் (10) இணைந்த அதிஉன்னத ராஜயோகம். இது உயர் பதவி, சமுதாய மரியாதை மற்றும் தொட்டதெல்லாம் துலங்கும் அதிர்ஷ்டத்தை அளிக்கும்.'
        });
      }
    }

    // Viparita Raja Yoga: 6th, 8th, 12th lords in 6, 8, 12
    const lord6 = RASIS[(lagnaHouse + 5) % 12].lord;
    const lord8 = RASIS[(lagnaHouse + 7) % 12].lord;
    const lord12 = RASIS[(lagnaHouse + 11) % 12].lord;
    const p6 = planetsMap[lord6];
    const p8 = planetsMap[lord8];
    const p12 = planetsMap[lord12];
    const dusthanas = [(lagnaHouse + 5) % 12, (lagnaHouse + 7) % 12, (lagnaHouse + 11) % 12];

    if ((p6 && dusthanas.includes(p6.rasiIndex)) || (p8 && dusthanas.includes(p8.rasiIndex)) || (p12 && dusthanas.includes(p12.rasiIndex))) {
      yogasList.push({
        name: 'விபரீத ராஜயோகம் (Viparita Raja Yoga)',
        desc: 'மறைவு ஸ்தான அதிபதிகள் மறைவு வீடுகளிலேயே ஆட்சி பெற்றிருப்பதால், எதிர்பாராத திடீர் தனலாபம், எதிரிகளை வெல்லும் ஆற்றல் மற்றும் கடின உழைப்பிற்குப் பின் மாபெரும் வெற்றி கிடைக்கும்.'
      });
    }

    // Default Good Placement if no special yogas
    if (yogasList.length === 0) {
      yogasList.push({
        name: 'சுப கேந்திர பலம் (Kendra Bala)',
        desc: 'ஜாதகத்தில் கிரகங்கள் சமச்சீர் பலத்துடன் அமைந்துள்ளன. விடாமுயற்சியும் நேர்மையான அணுகுமுறையும் எப்போதும் சிறப்பான வாழ்வை அளிக்கும்.'
      });
    }

    return { marsDosha, isKalaSarpa, yogasList };
  }

  // ==========================================================================
  // 6. TAMIL PREDICTIONS TEXT DICTIONARY
  // ==========================================================================

  const LAGNA_PREDICTIONS = [
    { name: 'மேஷம்', text: 'மேஷ லக்னத்தில் பிறந்த நீங்கள் இயல்பாகவே தைரியமும், தன்னம்பிக்கையும், தலைமை தாங்கும் குணமும் கொண்டவர். எதையும் உடனே செய்து முடிக்கும் சுறுசுறுப்பும், புதிய முயற்சிகளில் துணிச்சலுடன் இறங்கும் ஆற்றலும் உங்களிடம் எப்போதும் உண்டு. கோபத்தை சற்று கட்டுப்படுத்தி நிதானத்தைக் கையாள்வது கூடுதல் வெற்றிகளைத் தரும்.' },
    { name: 'ரிஷபம்', text: 'ரிஷப லக்னத்தில் பிறந்த நீங்கள் பொறுமை, விடாமுயற்சி, கலை ஆர்வம் மற்றும் சாந்த குணம் கொண்டவர். ஆடம்பரமான பொருட்களையும், இனிமையான உணவுகளையும் விரும்புவீர்கள். ஒரு காரியத்தை தொடங்குவதற்கு முன் தீர ஆலோசித்து, உறுதியுடன் செய்து முடிப்பீர்கள். உங்கள் நாணயம் மற்றும் நம்பகத்தன்மை உங்களுக்கு நற்பெயரை பெற்றுத்தரும்.' },
    { name: 'மிதுனம்', text: 'மிதுன லக்னத்தில் பிறந்த நீங்கள் கூர்மையான அறிவுத்திறன், சிறந்த பேச்சுத்திறன், நகைச்சுவை உணர்வு மற்றும் விரைந்து சிந்திக்கும் ஆற்றல் கொண்டவர். தகவல் தொடர்பு, வியாபாரம், எழுத்து மற்றும் புதிய விஷயங்களைக் கற்றுக்கொள்வதில் வல்லவர். பல துறைகளில் ஒரே நேரத்தில் திறமையுடன் செயல்படக்கூடியவர்.' },
    { name: 'கடகம்', text: 'கடக லக்னத்தில் பிறந்த நீங்கள் மிகுந்த அன்பும், இரக்க குணமும், குடும்பப் பற்றும், உணர்ச்சிவசப்படும் இயல்பும் கொண்டவர். உங்கள் நினைவாற்றல் மிகவும் அபாரமானது. மற்றவர்களின் உணர்வுகளை எளிதில் புரிந்து கொண்டு உதவும் மனம் படைத்தவர். தாய் மீதும், பிறந்த மண் மீதும் அளவற்ற பற்று கொண்டிருப்பீர்கள்.' },
    { name: 'சிம்மம்', text: 'சிம்ம லக்னத்தில் பிறந்த நீங்கள் கம்பீரமான தோற்றம், சுயமரியாதை, தாராள குணம் மற்றும் ஆளுமைத் திறன் கொண்டவர். யாருக்கும் அஞ்சாமல் நேர்வழியில் நடப்பீர்கள். சமூகத்தில் உயர்ந்த கௌரவமும், பிறரை வழிநடத்தும் ஆற்றலும் உங்களுக்கு இயற்கையிலேயே அமையும்.' },
    { name: 'கன்னி', text: 'கன்னி லக்னத்தில் பிறந்த நீங்கள் நுணுக்கமான அறிவு, திட்டமிட்டு செயல்படும் திறன், நேர்த்தி மற்றும் அடக்க குணம் கொண்டவர். கணக்கு வழக்குகள், நிர்வாகம், ஆலோசனை வழங்குவதில் வல்லவர். எந்தவொரு செயலிலும் உள்ள குறைகளை உடனே கண்டறிந்து அதை முழுமையாக்கும் வல்லமை உங்களிடம் உண்டு.' },
    { name: 'துலாம்', text: 'துலா லக்னத்தில் பிறந்த நீங்கள் நியாயம், சமத்துவம், அமைதி மற்றும் கவர்ச்சியான ஆளுமை கொண்டவர். அனைவரிடமும் இனிமையாகப் பேசி நட்பை வளர்த்துக்கொள்வீர்கள். கலை, இசை, அலங்காரம் மற்றும் பொதுவாழ்வில் ஈடுபாடு அதிகம் இருக்கும். நியாயத் தீர்ப்பு வழங்குவதில் வல்லவர்.' },
    { name: 'விருச்சிகம்', text: 'விருச்சிக லக்னத்தில் பிறந்த நீங்கள் ஆழமான சிந்தனை, அசைக்க முடியாத மன உறுதி, உள்ளுணர்வு மற்றும் எதையும் எளிதில் வெளிக்காட்டாத ரகசிய குணம் கொண்டவர். எதிர்ப்புகளை துணிச்சலுடன் எதிர்கொண்டு வெல்வீர்கள். ஆராய்ச்சிகள், தொழில் நுட்பம் மற்றும் சவாலான பணிகளில் பிரகாசிப்பீர்கள்.' },
    { name: 'தனுசு', text: 'தனுசு லக்னத்தில் பிறந்த நீங்கள் ஆன்மீக நாட்டம், நீதி நேர்மை, பரந்த மனப்பான்மை மற்றும் பிறருக்கு வழிகாட்டும் ஆசான் குணம் கொண்டவர். எப்போதும் உண்மையை பேசுவீர்கள். பயணம் செய்வதிலும், தத்துவ ஆராய்ச்சிகளிலும் ஆர்வம் அதிகம் இருக்கும்.' },
    { name: 'மகரம்', text: 'மகர லக்னத்தில் பிறந்த நீங்கள் அயராத உழைப்பு, பொறுப்புணர்ச்சி, சிக்கனம் மற்றும் நடைமுறை யதார்த்தம் கொண்டவர். ஆரம்பத்தில் சிரமங்களை எதிர்கொண்டாலும், படிப்படியாக உழைப்பால் உயர்ந்து நிலையான வெற்றியை அடைவீர்கள். ஒழுக்கமும் கடமை உணர்வும் உங்கள் பலம்.' },
    { name: 'கும்பம்', text: 'கும்ப லக்னத்தில் பிறந்த நீங்கள் மனிதநேயம், புதுமை சிந்தனை, சமுதாய அக்கறை மற்றும் விஞ்ஞானப் பார்வை கொண்டவர். வழக்கமான பாதையை விடுத்து புதிய வழிகளை உருவாக்குவீர்கள். நண்பர்கள் வட்டாரம் பெரிதாக இருக்கும்; பொதுநலப் பணிகளில் ஆர்வம் காட்டுவீர்கள்.' },
    { name: 'மீனம்', text: 'மீன லக்னத்தில் பிறந்த நீங்கள் சாதுரியம், ஆன்மீக ஈடுபாடு, தியாக மனப்பான்மை மற்றும் கலை நயம் கொண்டவர். மற்றவர்களுக்கு உதவும் கருணை உள்ளம் படைத்தவர். கற்பனை வளமும் உள்ளுணர்வும் மிக அதிகம்.' }
  ];

  const RASI_STAR_PREDICTIONS = {
    careerByLagna: [
      'ராணுவம், காவல் துறை, ரியல் எஸ்டேட், மருத்துவம், பொறியியல், விளையாட்டு மற்றும் தலைமை நிர்வாகம்.',
      'வங்கித் துறை, நிதி நிறுவனம், உணவு மற்றும் விடுதித் தொழில், ஜவுளி, அழகு சாதனங்கள் மற்றும் கலைத்துறை.',
      'தகவல் தொழில்நுட்பம் (IT), பத்திரிகை, ஊடகம், கணக்கு தணிக்கை (Auditing), கல்வி மற்றும் வர்த்தகம்.',
      'மருத்துவம், பால் பண்ணை, நீர் சார்ந்த தொழில்கள், அரசுப் பணி, ஆசிரியர் பணி மற்றும் உளவியல் துறை.',
      'அரசாங்க உயர் பதவி, அரசியல், நிர்வாக மேலாண்மை, தங்கம்/நகைத் தொழில் மற்றும் தலைமைப் பொறுப்புகள்.',
      'கணக்கியல், மென்பொருள், அறிவியல் ஆராய்ச்சி, புள்ளியியல், சட்டம் மற்றும் ஆலோசனை மையங்கள்.',
      'நீதித்துறை, சட்டம், திரைப்படத்துறை, ஆடை வடிவமைப்பு, சர்வதேச வர்த்தகம் மற்றும் மக்கள் தொடர்பு.',
      'மருத்துவ அறுவை சிகிச்சை, மருந்து தயாரிப்பு, ஆராய்ச்சித் துறை, பாதுகாப்புத் துறை மற்றும் இயந்திரவியல்.',
      'நீதிபதி, பேராசிரியர், வங்கி மேலாளர், தத்துவப் பிரச்சாரம், அறக்கட்டளை மற்றும் ஆலோசனைத் துறை.',
      'கட்டுமானத் துறை, சுரங்கம், எண்ணெய்-எரிவாயு, உற்பத்தி ஆலைகள், விவசாயம் மற்றும் அரசு நிர்வாகம்.',
      'ஆராய்ச்சி, விண்வெளி அறிவியல், மின்னணுவியல், சமூக சேவை நிறுவனங்கள் மற்றும் புதிய கண்டுபிடிப்புகள்.',
      'ஆன்மீகம், கல்வி நிறுவனங்கள், மருத்துவப் பணிகள், கடல்சார் வாணிபம் மற்றும் கலைத் துறைகள்.'
    ],
    luckyByRasi: [
      { gem: 'பவளம் (Red Coral)', color: 'சிவப்பு, மஞ்சள்', num: '9, 1, 3', dir: 'கிழக்கு', deity: 'முருகப் பெருமான்' },
      { gem: 'வைரம் / வெள்ளிக் குருவிக்கல் (Diamond / White Sapphire)', color: 'வெள்ளை, வெளிர் நீலம்', num: '6, 5, 8', dir: 'தென்கிழக்கு', deity: 'மகாலட்சுமி' },
      { gem: 'மரகதம் (Emerald)', color: 'பச்சை, சாம்பல்', num: '5, 6, 1', dir: 'வடக்கு', deity: 'மகாவிஷ்ணு' },
      { gem: 'முத்து (Pearl)', color: 'வெள்ளை, வெள்ளி', num: '2, 9, 3', dir: 'வடமேற்கு', deity: 'அம்பிகை / பார்வதி' },
      { gem: 'மாணிக்கம் (Ruby)', color: 'சிவப்பு, பொன்னிறம்', num: '1, 5, 9', dir: 'கிழக்கு', deity: 'சூரிய பகவான் / சிவன்' },
      { gem: 'மரகதம் (Emerald)', color: 'பச்சை, மஞ்சள்', num: '5, 6, 2', dir: 'தெற்கு', deity: 'ஸ்ரீ வெங்கடாசலபதி' },
      { gem: 'வைரம் (Diamond)', color: 'வெள்ளை, ரோஸ்', num: '6, 7, 8', dir: 'மேற்கு', deity: 'ஸ்ரீ லலிதாம்பிகை' },
      { gem: 'பவளம் (Red Coral)', color: 'சிவப்பு, காவி', num: '9, 3, 1', dir: 'வடக்கு', deity: 'திருச்செந்தூர் முருகன்' },
      { gem: 'புஷ்பராகம் (Yellow Sapphire)', color: 'மஞ்சள், பொன் நிறம்', num: '3, 9, 1', dir: 'வடகிழக்கு', deity: 'தட்சிணாமூர்த்தி / குரு' },
      { gem: 'நீலக்கல் (Blue Sapphire)', color: 'நீலம், கருநீலம்', num: '8, 6, 5', dir: 'தெற்கு', deity: 'சனீஸ்வரர் / அனுமன்' },
      { gem: 'நீலக்கல் (Blue Sapphire)', color: 'நீலம், மஞ்சள்', num: '8, 5, 3', dir: 'மேற்கு', deity: 'சிவபெருமான்' },
      { gem: 'புஷ்பராகம் (Yellow Sapphire)', color: 'மஞ்சள், சந்தன நிறம்', num: '3, 2, 9', dir: 'வடகிழக்கு', deity: 'ஸ்ரீ ரங்கநாதர்' }
    ]
  };

  // ==========================================================================
  // 7. CHART RENDERER (SOUTH INDIAN 4x4 GRID)
  // ==========================================================================

  function renderSouthIndianChart(containerId, centerTitle, centerSub, planetsPlacement, lagnaRasiIndex, isNavamsha = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    // Create 12 outer boxes
    SOUTH_GRID_CELLS.forEach(cell => {
      const cellDiv = document.createElement('div');
      cellDiv.className = 'chart-cell';
      cellDiv.style.gridRow = cell.row;
      cellDiv.style.gridColumn = cell.col;
      cellDiv.dataset.rasi = cell.rasiIndex;

      // Calculate Bhava Number from Lagna
      const bhavaNum = ((cell.rasiIndex - lagnaRasiIndex + 12) % 12) + 1;

      // Cell Header
      const headerDiv = document.createElement('div');
      headerDiv.className = 'cell-header';
      headerDiv.innerHTML = `
        <span class="rasi-name-tamil">${cell.name}</span>
        <span class="bhava-num" title="லக்னத்தில் இருந்து ${bhavaNum} ஆம் பாவம்">${bhavaNum}</span>
      `;
      cellDiv.appendChild(headerDiv);

      // Planets List in this Rasi
      const listDiv = document.createElement('div');
      listDiv.className = 'cell-planets-list';

      const occupants = planetsPlacement[cell.rasiIndex] || [];
      occupants.forEach(p => {
        const pill = document.createElement('span');
        pill.className = `planet-pill ${p.class}`;
        let statusBadge = '';
        if (p.statusBadge) {
          statusBadge = `<span class="status-badge">(${p.statusBadge})</span>`;
        }
        pill.innerHTML = `${p.shortTa}${statusBadge}`;
        pill.title = `${p.nameTa} - ${p.formattedDeg || ''} ${p.statusLabel || ''}`;
        listDiv.appendChild(pill);
      });

      cellDiv.appendChild(listDiv);

      // Click event to show Bhava Info Modal
      cellDiv.addEventListener('click', () => {
        openBhavaModal(cell.rasiIndex, bhavaNum, occupants, isNavamsha);
      });

      container.appendChild(cellDiv);
    });

    // Create Center Box
    const centerDiv = document.createElement('div');
    centerDiv.className = 'chart-center-box';
    centerDiv.innerHTML = `
      <div class="center-om-logo">ௐ</div>
      <div class="center-chart-title">${centerTitle}</div>
      <div class="center-chart-sub">${centerSub}</div>
      <div style="font-size: 10px; color: var(--text-gold); margin-top: 4px;">தென்னிந்திய முறை</div>
    `;
    container.appendChild(centerDiv);
  }

  // ==========================================================================
  // 8. FULL HOROSCOPE CALCULATION & CONTROLLER
  // ==========================================================================

  function calculateHoroscope(birthData) {
    const { name, dateStr, hour, minute, ampm, lat, lng, tz, ayanamsaType } = birthData;

    // Parse Date & Time
    const dateParts = dateStr.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const day = parseInt(dateParts[2], 10);

    let h24 = parseInt(hour, 10);
    if (ampm === 'PM' && h24 < 12) h24 += 12;
    if (ampm === 'AM' && h24 === 12) h24 = 0;
    const m = parseInt(minute, 10);

    // UT Time
    const localHours = h24 + (m / 60.0);
    let utHours = localHours - tz;
    let jdDay = day;
    let jdMonth = month;
    let jdYear = year;

    if (utHours < 0) {
      utHours += 24.0;
      jdDay -= 1;
    } else if (utHours >= 24.0) {
      utHours -= 24.0;
      jdDay += 1;
    }

    const JD = getJulianDay(jdYear, jdMonth, jdDay, utHours);
    const T = (JD - 2451545.0) / 36525.0;

    // Lahiri Ayanamsa
    const ayanamsa = getLahiriAyanamsa(JD, ayanamsaType);

    // 1. Sun & Moon
    const sunCalc = calculateSun(T);
    const moonCalc = calculateMoon(T);

    const sunSayana = sunCalc.longitude;
    const moonSayana = moonCalc.longitude;

    const sunNirayana = norm360(sunSayana - ayanamsa);
    const moonNirayana = norm360(moonSayana - ayanamsa);

    // 2. Planets
    const planetsRaw = {};
    Object.keys(PLANET_ORBITS).forEach(pKey => {
      const sayanaLong = calculatePlanet(T, PLANET_ORBITS[pKey], sunSayana, sunCalc.meanAnomaly);
      planetsRaw[pKey] = norm360(sayanaLong - ayanamsa);
    });

    // Check retrogrades using small offset derivative (0.01 day)
    const T_delta = ((JD + 0.01) - 2451545.0) / 36525.0;
    const isRetrogradeMap = {};
    Object.keys(PLANET_ORBITS).forEach(pKey => {
      const sayanaLongNext = calculatePlanet(T_delta, PLANET_ORBITS[pKey], calculateSun(T_delta).longitude, calculateSun(T_delta).meanAnomaly);
      const diff = norm360(sayanaLongNext - ayanamsa) - planetsRaw[pKey];
      isRetrogradeMap[pKey] = (diff < 0 && Math.abs(diff) < 180) || (diff > 180);
    });

    // 3. Rahu & Ketu
    const nodes = calculateRahuKetu(T);
    const rahuNirayana = norm360(nodes.rahu - ayanamsa);
    const ketuNirayana = norm360(nodes.ketu - ayanamsa);

    // 4. Lagna (Ascendant)
    const lagnaObj = calculateLagna(JD, lat, lng);
    const lagnaNirayana = norm360(lagnaObj.sayanaAsc - ayanamsa);

    // 5. Mandi (Gulikan)
    const birthDateObj = new Date(year, month - 1, day, h24, m);
    const dayOfWeek = birthDateObj.getDay();
    const mandiNirayana = calculateMandi(dayOfWeek, h24, m, 6.0, 18.0, lagnaNirayana);

    // Package all bodies into detailed sidereal representations
    const rawBodies = [
      { key: 'Lagna', long: lagnaNirayana, isRetro: false },
      { key: 'Sun', long: sunNirayana, isRetro: false },
      { key: 'Moon', long: moonNirayana, isRetro: false },
      { key: 'Mars', long: planetsRaw.Mars, isRetro: isRetrogradeMap.Mars },
      { key: 'Mercury', long: planetsRaw.Mercury, isRetro: isRetrogradeMap.Mercury },
      { key: 'Jupiter', long: planetsRaw.Jupiter, isRetro: isRetrogradeMap.Jupiter },
      { key: 'Venus', long: planetsRaw.Venus, isRetro: isRetrogradeMap.Venus },
      { key: 'Saturn', long: planetsRaw.Saturn, isRetro: isRetrogradeMap.Saturn },
      { key: 'Rahu', long: rahuNirayana, isRetro: true },
      { key: 'Ketu', long: ketuNirayana, isRetro: true },
      { key: 'Mandi', long: mandiNirayana, isRetro: false }
    ];

    const planetsMap = {};
    const rasiPlacements = {};
    const navamshaPlacements = {};

    for (let i = 0; i < 12; i++) {
      rasiPlacements[i] = [];
      navamshaPlacements[i] = [];
    }

    rawBodies.forEach(b => {
      const sid = getSiderealInfo(b.long);
      const dignity = getPlanetDignity(b.key, sid.rasiIndex, sunNirayana, b.long, b.isRetro);
      
      let badge = '';
      if (b.key === 'Lagna') badge = 'லக்';
      else if (dignity.code === 'own') badge = 'ஆ';
      else if (dignity.code === 'exalt') badge = 'உ';
      else if (dignity.code === 'debilitate') badge = 'நீ';
      else if (dignity.code === 'retro') badge = 'வ';
      else if (dignity.code === 'combust') badge = 'அ';

      const planetItem = {
        key: b.key,
        nameTa: PLANET_CONFIG[b.key].nameTa,
        shortTa: PLANET_CONFIG[b.key].shortTa,
        class: PLANET_CONFIG[b.key].class,
        long: b.long,
        formattedDeg: sid.dms.formatted,
        degInRasi: sid.degInRasi,
        rasiIndex: sid.rasiIndex,
        rasi: sid.rasi,
        nakshatraIndex: sid.nakshatraIndex,
        nakshatra: sid.nakshatra,
        pada: sid.pada,
        navamshaRasiIndex: sid.navamshaRasiIndex,
        navamshaRasi: sid.navamshaRasi,
        dignity,
        statusBadge: badge,
        statusLabel: dignity.labelTa,
        isRetrograde: b.isRetro
      };

      planetsMap[b.key] = planetItem;

      // Add to Rasi Placement
      rasiPlacements[sid.rasiIndex].push(planetItem);

      // Add to Navamsha Placement
      navamshaPlacements[sid.navamshaRasiIndex].push(planetItem);
    });

    // 6. Panchangam Calculations
    const moonSunDiff = norm360(moonNirayana - sunNirayana);
    const thithiIndex = Math.floor(moonSunDiff / 12.0); // 0 to 29
    const paksham = thithiIndex < 15 ? 'சுக்ல பக்ஷம் (வளர்பிறை)' : 'கிருஷ்ண பக்ஷம் (தேய்பிறை)';
    const thithiName = THITHI_NAMES[thithiIndex % 15];

    const sunMoonSum = norm360(sunNirayana + moonNirayana);
    const yogaIndex = Math.min(26, Math.floor((sunMoonSum * 60.0) / 800.0));
    const yogaName = YOGAS_27[yogaIndex];

    const karanaIndex = Math.min(10, Math.floor(moonSunDiff / 6.0) % 11);
    const karanaName = KARANAS_11[karanaIndex];

    const panchangam = {
      weekday: TAMIL_WEEKDAYS[dayOfWeek],
      thithi: `${paksham} - ${thithiName}`,
      paksham,
      thithiName,
      star: planetsMap.Moon.nakshatra.nameTa,
      pada: planetsMap.Moon.pada,
      yoga: yogaName,
      karana: karanaName,
      ayanamsaFormatted: degToDMS(ayanamsa).formatted
    };

    // 7. Vimshottari Dasa Calculation
    const vimshottari = calculateVimshottari(moonNirayana, birthDateObj);

    // 8. Doshas & Yogas
    const analysis = analyzeDoshasAndYogas(planetsMap, planetsMap.Lagna.rasiIndex, planetsMap.Moon.rasiIndex);

    return {
      personName: name,
      birthDateObj,
      rawInputs: birthData,
      planetsMap,
      rasiPlacements,
      navamshaPlacements,
      panchangam,
      vimshottari,
      analysis
    };
  }

  // ==========================================================================
  // 9. UI RENDERING & DOM UPDATES
  // ==========================================================================

  let currentHoroscopeData = null;

  function updateDashboardUI(data) {
    currentHoroscopeData = data;
    const { planetsMap, panchangam, vimshottari, analysis, rasiPlacements, navamshaPlacements } = data;

    // 1. Update Quick Summary Banner
    document.getElementById('sumLagna').textContent = `${planetsMap.Lagna.rasi.nameTa} (${planetsMap.Lagna.degInRasi.toFixed(1)}°)`;
    document.getElementById('sumLagnaPada').textContent = `${planetsMap.Lagna.nakshatra.nameTa} - பாதம் ${planetsMap.Lagna.pada}`;

    document.getElementById('sumRasi').textContent = planetsMap.Moon.rasi.nameTa;
    document.getElementById('sumRasiLord').textContent = `ராசி அதிபதி: ${planetsMap.Moon.rasi.lordTa}`;

    document.getElementById('sumStar').textContent = planetsMap.Moon.nakshatra.nameTa;
    document.getElementById('sumStarPada').textContent = `பாதம்: ${planetsMap.Moon.pada}`;

    document.getElementById('sumThithi').textContent = panchangam.thithiName;
    document.getElementById('sumPaksham').textContent = panchangam.paksham;

    document.getElementById('sumYoga').textContent = `யோகம்: ${panchangam.yoga}`;
    document.getElementById('sumKarana').textContent = `கரணம்: ${panchangam.karana}`;

    document.getElementById('sumDasaBalance').textContent = vimshottari.dasaBalance.formatted;
    document.getElementById('sumDasaLord').textContent = vimshottari.dasaBalance.dasaNameTa;

    // 2. Render Rasi & Navamsha Charts
    const nameStr = data.personName ? ` - ${data.personName}` : '';
    renderSouthIndianChart('rasiChartContainer', 'ராசி கட்டம் (D1)', `லக்னம்: ${planetsMap.Lagna.rasi.nameTa}`, rasiPlacements, planetsMap.Lagna.rasiIndex, false);
    renderSouthIndianChart('navamshaChartContainer', 'நவாம்சம் (D9)', `நவாம்ச லக்னம்: ${planetsMap.Lagna.navamshaRasi.nameTa}`, navamshaPlacements, planetsMap.Lagna.navamshaRasiIndex, true);

    // 3. Render 12 Bhavas Summary
    const bhavaGrid = document.getElementById('bhavaSummaryGrid');
    bhavaGrid.innerHTML = '';
    const bhavaKarakatvas = [
      '1. லக்ன பாவம் (உடல், குணம், ஆயுள், கௌரவம்)',
      '2. தன பாவம் (குடும்பம், வாக்கு, தன வரவு, நேத்திரம்)',
      '3. தைரிய பாவம் (இளைய சகோதரம், வீரியம், முயற்சி, தகவல் தொடர்பு)',
      '4. சுக பாவம் (தாய், வீடு, வாகனம், ஆரம்பக் கல்வி, மன அமைதி)',
      '5. பூர்வ புண்ணிய பாவம் (புத்திர பாக்கியம், அறிவு, குலதெய்வம், கலை)',
      '6. சத்ரு பாவம் (ரோகம், கடன், வழக்கு, எதிர்ப்பு, சேவை)',
      '7. களத்திர பாவம் (திருமணம், மனைவி/கணவன், கூட்டுத்தொழில், நற்பெயர்)',
      '8. ஆயுள் பாவம் (அஷ்டமம், விபத்து, திடீர் தனலாபம், மறைபொருள்)',
      '9. பாக்கிய பாவம் (தந்தை, குரு, வெளிநாட்டுப் பயணம், தர்மம், அதிர்ஷ்டம்)',
      '10. ஜீவன பாவம் (தொழில், வேலைவாய்ப்பு, அதிகாரம், கீர்த்தி)',
      '11. லாப பாவம் (மூத்த சகோதரம், ஆசை நிறைவேறல், தொழில் லாபம்)',
      '12. விரய பாவம் (சுப விரயம், மோட்சம், தூக்கம், வெளிநாட்டு வாசம்)'
    ];

    for (let h = 1; h <= 12; h++) {
      const rIndex = (planetsMap.Lagna.rasiIndex + h - 1) % 12;
      const rasiObj = RASIS[rIndex];
      const occupants = rasiPlacements[rIndex] || [];
      const occStr = occupants.length > 0 ? occupants.map(o => `${o.nameTa}`).join(', ') : 'கிரகங்கள் இல்லை (சுத்த வீடு)';

      const card = document.createElement('div');
      card.style.background = 'rgba(0, 0, 0, 0.3)';
      card.style.border = '1px solid var(--border-dark)';
      card.style.borderRadius = 'var(--radius-md)';
      card.style.padding = '10px 12px';

      card.innerHTML = `
        <div style="font-weight: 700; color: var(--text-gold-light); font-size: 12.5px; margin-bottom: 2px;">
          ${bhavaKarakatvas[h - 1]}
        </div>
        <div style="font-size: 11.5px; color: var(--text-secondary);">
          ராசி: <strong style="color: #fff;">${rasiObj.nameTa}</strong> (${rasiObj.lordTa})
        </div>
        <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">
          நின்ற கிரகங்கள்: <span style="color: var(--text-gold);">${occStr}</span>
        </div>
      `;
      bhavaGrid.appendChild(card);
    }

    // 4. Render Planetary Table
    const tableBody = document.getElementById('planetsTableBody');
    tableBody.innerHTML = '';
    const tableKeys = ['Lagna', 'Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu', 'Mandi'];

    tableKeys.forEach(k => {
      const p = planetsMap[k];
      if (!p) return;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong style="color: #fff;">${p.nameTa}</strong> ${p.isRetrograde ? '<span style="color: #f472b6; font-size: 10px;">[வக்ரம்]</span>' : ''}</td>
        <td><code>${p.formattedDeg}</code></td>
        <td>${p.rasi.nameTa}</td>
        <td>${p.rasi.lordTa}</td>
        <td>${p.nakshatra.nameTa}</td>
        <td><span style="font-weight: 700;">${p.pada}</span></td>
        <td>${p.navamshaRasi.nameTa}</td>
        <td><span class="state-tag ${p.dignity.tagClass}">${p.dignity.labelTa}</span></td>
      `;
      tableBody.appendChild(tr);
    });

    // 5. Render Aspects (பார்வைகள்)
    const aspectsDiv = document.getElementById('aspectsContainer');
    aspectsDiv.innerHTML = '';
    const aspectPlanets = [
      { name: 'சூரியன்', aspects: ['7-ஆம் பார்வை'] },
      { name: 'சந்திரன்', aspects: ['7-ஆம் பார்வை'] },
      { name: 'செவ்வாய்', aspects: ['4, 7, 8-ஆம் விசேஷ பார்வைகள்'] },
      { name: 'புதன்', aspects: ['7-ஆம் பார்வை'] },
      { name: 'குரு', aspects: ['5, 7, 9-ஆம் விசேஷ பார்வைகள்'] },
      { name: 'சுக்கிரன்', aspects: ['7-ஆம் பார்வை'] },
      { name: 'சனி', aspects: ['3, 7, 10-ஆம் விசேஷ பார்வைகள்'] },
      { name: 'ராகு / கேது', aspects: ['5, 7, 9-ஆம் சமசப்தம பார்வைகள்'] }
    ];

    aspectPlanets.forEach(ap => {
      const c = document.createElement('div');
      c.style.background = 'rgba(0,0,0,0.25)';
      c.style.padding = '10px';
      c.style.borderRadius = 'var(--radius-md)';
      c.style.border = '1px solid var(--border-dark)';
      c.innerHTML = `
        <div style="font-weight: 700; color: var(--text-gold-light); font-size: 13px;">${ap.name}</div>
        <div style="font-size: 12px; color: var(--text-secondary); margin-top: 3px;">${ap.aspects.join(', ')}</div>
      `;
      aspectsDiv.appendChild(c);
    });

    // 6. Render Panchangam Details Tab
    document.getElementById('panchangamDetailsBody').innerHTML = `
      <p><strong>வாரம் (கிழமை):</strong> ${panchangam.weekday}</p>
      <p><strong>பக்ஷம்:</strong> ${panchangam.paksham}</p>
      <p><strong>திதி:</strong> ${panchangam.thithiName}</p>
      <p><strong>நட்சத்திரம்:</strong> ${panchangam.star} (பாதம் ${panchangam.pada})</p>
      <p><strong>நித்திய யோகம்:</strong> ${panchangam.yoga}</p>
      <p><strong>கரணம்:</strong> ${panchangam.karana}</p>
    `;

    document.getElementById('astronomyDetailsBody').innerHTML = `
      <p><strong>பிறந்த இடம்:</strong> ${data.rawInputs.cityName || 'Custom GPS'} (அட்சரேகை: ${data.rawInputs.lat}°, தீர்க்கரேகை: ${data.rawInputs.lng}°)</p>
      <p><strong>நேர மண்டலம் (Timezone):</strong> UTC +${data.rawInputs.tz} hrs</p>
      <p><strong>லஹிரி அயனாம்சம்:</strong> ${panchangam.ayanamsaFormatted}</p>
      <p><strong>நிரயண லக்ன பாகை:</strong> ${planetsMap.Lagna.formattedDeg}</p>
      <p><strong>நிரயண சந்திர பாகை:</strong> ${planetsMap.Moon.formattedDeg}</p>
      <p><strong>நிரயண சூரிய பாகை:</strong> ${planetsMap.Sun.formattedDeg}</p>
    `;

    // 7. Render Dasa-Bhukti Tab
    const dasaBalBox = document.getElementById('dasaBalanceContainer');
    dasaBalBox.innerHTML = `
      <div>
        <div style="font-size: 12px; color: var(--text-muted);">பிறந்த நேரத்தில் தசா இருப்பு (Dasa Balance at Birth):</div>
        <div style="font-size: 18px; font-weight: 800; color: var(--text-gold-light); margin-top: 2px;">
          ${vimshottari.dasaBalance.dasaNameTa} - ${vimshottari.dasaBalance.formatted}
        </div>
      </div>
      <div style="font-size: 12px; color: var(--text-secondary);">
        சந்திரன் நின்ற நட்சத்திர அதிபதி: <strong style="color: var(--text-gold);">${vimshottari.dasaBalance.lordTa}</strong>
      </div>
    `;

    // Current Running Dasa Identification
    const now = new Date();
    let runningDasa = null;
    let runningBhukti = null;

    vimshottari.lifetimeDasas.forEach(d => {
      if (now >= d.startDate && now <= d.endDate) {
        runningDasa = d;
        d.bhuktis.forEach(b => {
          if (now >= b.startDate && now <= b.endDate) {
            runningBhukti = b;
          }
        });
      }
    });

    const currentDasaDiv = document.getElementById('currentDasaContainer');
    if (runningDasa) {
      currentDasaDiv.style.display = 'block';
      currentDasaDiv.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <div>
            <span class="chart-badge" style="background: rgba(16,185,129,0.2); color: #34d399; border-color: #059669;">
              தற்போது நடைபெறும் தசா-புத்தி (Current Active Period)
            </span>
            <h4 style="font-size: 17px; color: var(--text-gold-light); margin-top: 6px;">
              ${runningDasa.dasaNameTa} / ${runningBhukti ? runningBhukti.subLordTa + ' புத்தி' : ''}
            </h4>
          </div>
          <div style="font-size: 12px; color: var(--text-muted); text-align: right;">
            <div>தசா காலம்: ${runningDasa.startDate.toLocaleDateString('ta-IN')} முதல் ${runningDasa.endDate.toLocaleDateString('ta-IN')} வரை</div>
            ${runningBhukti ? `<div style="color: var(--text-gold);">புத்தி காலம்: ${runningBhukti.startDate.toLocaleDateString('ta-IN')} - ${runningBhukti.endDate.toLocaleDateString('ta-IN')}</div>` : ''}
          </div>
        </div>
      `;
    } else {
      currentDasaDiv.style.display = 'none';
    }

    // Lifetime Dasa List
    const lifetimeList = document.getElementById('lifetimeDasaList');
    lifetimeList.innerHTML = '';

    vimshottari.lifetimeDasas.forEach((d, idx) => {
      const isCurrent = runningDasa && runningDasa.lord === d.lord;
      const item = document.createElement('div');
      item.className = `dasa-item ${isCurrent ? 'active-dasa' : ''}`;
      item.style.flexDirection = 'column';
      item.style.alignItems = 'stretch';

      const headerRow = document.createElement('div');
      headerRow.style.display = 'flex';
      headerRow.style.justifyContent = 'space-between';
      headerRow.style.alignItems = 'center';
      headerRow.style.width = '100%';

      headerRow.innerHTML = `
        <div class="dasa-lord-info">
          <div class="dasa-lord-circle">${idx + 1}</div>
          <div>
            <div style="font-weight: 700; color: #fff; font-size: 14px;">${d.dasaNameTa} ${d.isBalance ? '(இருப்பு காலம்)' : `(${d.totalYears} வருடங்கள்)`}</div>
            <div style="font-size: 11.5px; color: var(--text-muted);">${d.isBalance ? `${d.effectiveYears.toFixed(2)} வருடங்கள்` : ''}</div>
          </div>
        </div>
        <div class="dasa-date-range">
          ${d.startDate.toLocaleDateString('ta-IN')} &nbsp;➔&nbsp; ${d.endDate.toLocaleDateString('ta-IN')}
        </div>
      `;
      item.appendChild(headerRow);

      // Sub-Bhuktis Chips
      const subGrid = document.createElement('div');
      subGrid.className = 'dasa-sub-timeline';
      d.bhuktis.forEach(b => {
        const isBCurrent = runningBhukti && runningBhukti.majorLord === b.majorLord && runningBhukti.subLord === b.subLord;
        const chip = document.createElement('div');
        chip.className = `bhukti-chip ${isBCurrent ? 'current' : ''}`;
        chip.innerHTML = `
          <div><strong>${b.subLordTa} புத்தி</strong></div>
          <div style="font-size: 9.5px; opacity: 0.8; margin-top: 1px;">முடிவு: ${b.endDate.toLocaleDateString('ta-IN', { month: 'short', year: 'numeric' })}</div>
        `;
        subGrid.appendChild(chip);
      });
      item.appendChild(subGrid);

      lifetimeList.appendChild(item);
    });

    // 8. Render Predictions Tab
    const lagnaIdx = planetsMap.Lagna.rasiIndex;
    const moonIdx = planetsMap.Moon.rasiIndex;

    document.getElementById('predLagnaTitle').textContent = `${planetsMap.Lagna.rasi.nameTa} லக்னப் பொதுப் பலன்கள்`;
    document.getElementById('predLagnaBody').innerHTML = `
      <p>${LAGNA_PREDICTIONS[lagnaIdx].text}</p>
      <p style="margin-top: 8px;"><strong>லக்னாதிபதி:</strong> ${planetsMap.Lagna.rasi.lordTa} அவர்கள் நின்ற வீட்டின் பலத்தால் ஜாதகரின் நற்பெயர் மற்றும் கௌரவம் மேம்படும்.</p>
    `;

    document.getElementById('predRasiTitle').textContent = `${planetsMap.Moon.rasi.nameTa} ராசி - ${planetsMap.Moon.nakshatra.nameTa} நட்சத்திரப் பலன்`;
    document.getElementById('predRasiBody').innerHTML = `
      <p>சந்திரன் ${planetsMap.Moon.rasi.nameTa} ராசியில், ${planetsMap.Moon.nakshatra.nameTa} நட்சத்திரம் ${planetsMap.Moon.pada}-ஆம் பாதத்தில் அமர்ந்துள்ளார்.</p>
      <p>இயல்பாகவே நுண்ணிய ரசனை, எதையும் உணர்ந்து செயல்படும் விவேகம், சுற்றத்தாருடன் இணக்கமான உறவு ஆகியவற்றைக் கொண்டிருப்பீர்கள். வாக்கு சாதுரியமும், மற்றவர்களுக்கு உதவும் தயாள குணமும் உங்கள் அடையாளமாகும்.</p>
    `;

    // Yogas
    const yogasContainer = document.getElementById('predYogasBody');
    yogasContainer.innerHTML = '';
    analysis.yogasList.forEach(y => {
      const yDiv = document.createElement('div');
      yDiv.style.marginBottom = '12px';
      yDiv.style.paddingBottom = '10px';
      yDiv.style.borderBottom = '1px dashed var(--border-dark)';
      yDiv.innerHTML = `
        <div style="font-weight: 700; color: var(--text-gold-light); font-size: 14.5px; margin-bottom: 3px;">
          ✨ ${y.name}
        </div>
        <div style="font-size: 13.5px; color: var(--text-secondary); line-height: 1.6;">
          ${y.desc}
        </div>
      `;
      yogasContainer.appendChild(yDiv);
    });

    // Doshas
    const doshasContainer = document.getElementById('predDoshasBody');
    doshasContainer.innerHTML = '';

    // Mars Dosha
    const mDosha = analysis.marsDosha;
    const mTag = mDosha.present ? '<span class="dosha-tag present"><i class="fa-solid fa-triangle-exclamation"></i> செவ்வாய் தோஷம் உள்ளது</span>'
               : (mDosha.cancelled ? '<span class="dosha-tag neutral"><i class="fa-solid fa-circle-check"></i> செவ்வாய் தோஷ நிவர்த்தி பெற்றுள்ளது</span>'
               : '<span class="dosha-tag absent"><i class="fa-solid fa-check"></i> செவ்வாய் தோஷம் இல்லை</span>');

    const mText = mDosha.present
      ? `லக்னத்திற்கு ${mDosha.marsHouseLagna}-ஆம் வீட்டில் செவ்வாய் அமர்ந்துள்ளார். செவ்வாய் தோஷம் உள்ள வரனைத் தேர்ந்தெடுத்து திருமணம் செய்வது குடும்ப வாழ்வில் அமைதியையும் சுபிட்சத்தையும் தரும்.`
      : (mDosha.cancelled
      ? `செவ்வாய் அமைப்பால் ஆரம்பத்தில் தோஷம் தெரிந்தாலும், <strong>${mDosha.cancelReason}</strong> இதனால் எவ்வித பாதிப்பும் இன்றி நற்பலன்கள் உண்டாகும்.`
      : `செவ்வாய் சுப ஸ்தானத்தில் அமர்ந்துள்ளதால் செவ்வாய் தோஷ பாதிப்புகள் எதுவுமில்லை.`);

    const mDiv = document.createElement('div');
    mDiv.style.marginBottom = '14px';
    mDiv.innerHTML = `
      <div>${mTag}</div>
      <p style="margin-top: 4px;">${mText}</p>
    `;
    doshasContainer.appendChild(mDiv);

    // Rahu Ketu Sarpa Dosha
    const rkTag = analysis.isKalaSarpa
      ? '<span class="dosha-tag present"><i class="fa-solid fa-triangle-exclamation"></i> கால சர்ப்ப தோஷம் அமைந்துள்ளது</span>'
      : '<span class="dosha-tag absent"><i class="fa-solid fa-check"></i> சர்ப்ப தோஷம் இல்லை</span>';

    const rkText = analysis.isKalaSarpa
      ? 'கிரகங்கள் அனைத்தும் ராகு-கேதுவின் பிடியில் அமைந்திருப்பதால், 32 வயது வரை வாழ்க்கையில் சில தடைகளும் சவால்களும் வரலாம். நவகிரக வழிபாடு மற்றும் திருநாகேஸ்வரம்/காளஹஸ்தி தரிசனம் அற்புத மாற்றங்களை உண்டாக்கும்.'
      : 'கிரகங்கள் சமச்சீரான பரவலில் அமைந்துள்ளதால் சர்ப்ப தோஷ பாதிப்புகள் ஏதுமில்லை.';

    const rkDiv = document.createElement('div');
    rkDiv.innerHTML = `
      <div>${rkTag}</div>
      <p style="margin-top: 4px;">${rkText}</p>
    `;
    doshasContainer.appendChild(rkDiv);

    // Career
    document.getElementById('predCareerBody').innerHTML = `
      <p>உங்கள் லக்னம் மற்றும் 10-ஆம் பாவக பலத்தின்படி கீழ்க்கண்ட துறைகளில் முன்னேற்றமும் உயர்ந்த தனலாபமும் அமையும்:</p>
      <p style="color: var(--text-gold-light); font-weight: 600; margin-top: 6px;">
        ${RASI_STAR_PREDICTIONS.careerByLagna[lagnaIdx]}
      </p>
    `;

    // Marriage
    document.getElementById('predMarriageBody').innerHTML = `
      <p>களத்திர ஸ்தானாதிபதி மற்றும் சுக்கிரனின் நிலைப்படி, அன்பான, பொறுப்புமிக்க வாழ்க்கைத்துணை அமையும். ஒருவருக்கொருவர் விட்டுக் கொடுத்து நடப்பது குடும்பத்தில் நிம்மதியையும் பொருளாதார ஏற்றத்தையும் நிலைநிறுத்தும்.</p>
    `;

    // Health
    document.getElementById('predHealthBody').innerHTML = `
      <p>லக்னாதிபதியும் சூரியனும் தரும் ஆற்றலால் நல்ல உடல் வலிமை உண்டு. இருப்பினும் தகுந்த நேரத்தில் உணவருந்துதல், போதுமான தூக்கம் மற்றும் யோகா/தியானப் பயிற்சிகளை மேற்கொள்வது வாழ்நாள் முழுவதும் ஆரோக்கியத்தைக் காக்கும்.</p>
    `;

    // 9. Render Remedies & Lucky Factors Tab
    const luckyObj = RASI_STAR_PREDICTIONS.luckyByRasi[moonIdx];
    const luckyGrid = document.getElementById('luckyFactorsGrid');
    luckyGrid.innerHTML = `
      <div class="lucky-card">
        <div class="lucky-title">அதிர்ஷ்ட ரத்தினக் கல்</div>
        <div class="lucky-val">${luckyObj.gem}</div>
      </div>
      <div class="lucky-card">
        <div class="lucky-title">அதிர்ஷ்ட நிறங்கள்</div>
        <div class="lucky-val">${luckyObj.color}</div>
      </div>
      <div class="lucky-card">
        <div class="lucky-title">அதிர்ஷ்ட எண்கள்</div>
        <div class="lucky-val">${luckyObj.num}</div>
      </div>
      <div class="lucky-card">
        <div class="lucky-title">அதிர்ஷ்ட திசை</div>
        <div class="lucky-val">${luckyObj.dir}</div>
      </div>
      <div class="lucky-card">
        <div class="lucky-title">வழிபட வேண்டிய தெய்வம்</div>
        <div class="lucky-val">${luckyObj.deity}</div>
      </div>
    `;

    document.getElementById('remediesBody').innerHTML = `
      <p>1. <strong>தினசரி வழிபாடு:</strong> தினமும் காலையில் குளித்து முடித்து உங்கள் இஷ்ட தெய்வமான <strong>${luckyObj.deity}</strong>-ஐ வணங்கி, தீபமேற்றி வழிபடுவது மன அமைதியையும் காரிய சித்தியையும் தரும்.</p>
      <p>2. <strong>தானம் & தர்மம்:</strong> ஏழை எளியவர்களுக்கும், ஆதரவற்றோருக்கும் அன்னதானம் அல்லது கல்வி உதவி செய்வது ஜாதகத்தில் உள்ள கிரக தோஷங்களை அகற்றி பூர்வ புண்ணிய பலத்தை அதிகரிக்கும்.</p>
      <p>3. <strong>சுய ஒழுக்கம்:</strong> தாய், தந்தை மற்றும் பெரியோர்களின் ஆசிகளைப் பெறுவது எப்போதும் அனைத்து கிரகங்களின் சுப பார்வையை ஈர்க்கும் எளிய வழியாகும்.</p>
    `;

    // Scroll smoothly to summary on mobile
    if (window.innerWidth < 1024) {
      document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
    }
  }

  function openBhavaModal(rasiIndex, bhavaNum, occupants, isNavamsha) {
    const modal = document.getElementById('bhavaModal');
    const modalBody = document.getElementById('modalBody');
    const rasi = RASIS[rasiIndex];

    const occHtml = occupants.length > 0
      ? occupants.map(o => `
        <div style="background: rgba(0,0,0,0.3); padding: 8px 12px; border-radius: var(--radius-sm); margin-bottom: 6px; display: flex; justify-content: space-between;">
          <strong>${o.nameTa} (${o.shortTa})</strong>
          <span>${o.formattedDeg} • ${o.statusLabel}</span>
        </div>
      `).join('')
      : '<p style="color: var(--text-muted);">இந்த வீட்டில் கிரகங்கள் ஏதுமில்லை (சுத்த பாவம்).</p>';

    modalBody.innerHTML = `
      <h3 style="color: var(--text-gold-light); font-size: 18px; margin-bottom: 8px;">
        ${rasi.nameTa} ராசி - ${bhavaNum} ஆம் பாவம் ${isNavamsha ? '(நவாம்சம்)' : ''}
      </h3>
      <p style="color: var(--text-secondary); margin-bottom: 12px;">
        <strong>ராசி அதிபதி:</strong> ${rasi.lordTa} (${rasi.lord}) | <strong>தத்துவம்:</strong> ${rasi.element} | <strong>இயல்பு:</strong> ${rasi.nature}
      </p>
      <h4 style="color: var(--text-gold); font-size: 14px; margin-bottom: 6px;">நின்ற கிரகங்கள்:</h4>
      <div>${occHtml}</div>
    `;

    modal.classList.add('active');
  }

  // ==========================================================================
  // 10. INITIALIZATION & EVENT LISTENERS
  // ==========================================================================

  function initApp() {
    // Populate Time Selectors
    const hourSelect = document.getElementById('birthHour');
    for (let h = 1; h <= 12; h++) {
      const opt = document.createElement('option');
      const val = h < 10 ? `0${h}` : `${h}`;
      opt.value = val;
      opt.textContent = `${val} மணி`;
      if (h === 10) opt.selected = true;
      hourSelect.appendChild(opt);
    }

    const minSelect = document.getElementById('birthMinute');
    for (let m = 0; m < 60; m++) {
      const opt = document.createElement('option');
      const val = m < 10 ? `0${m}` : `${m}`;
      opt.value = val;
      opt.textContent = `${val} நிமிடம்`;
      if (m === 30) opt.selected = true;
      minSelect.appendChild(opt);
    }

    // Set Today's Date as default
    const birthDateInput = document.getElementById('birthDate');
    const todayStr = new Date().toISOString().split('T')[0];
    birthDateInput.value = '1998-04-14';

    // Populate City Select
    const citySelect = document.getElementById('birthCity');
    const groups = {};
    CITIES_DB.forEach(c => {
      if (!groups[c.group]) groups[c.group] = [];
      groups[c.group].push(c);
    });

    Object.keys(groups).forEach(gName => {
      const optGroup = document.createElement('optgroup');
      optGroup.label = gName;
      groups[gName].forEach(city => {
        const opt = document.createElement('option');
        opt.value = city.name;
        opt.textContent = city.name;
        opt.dataset.lat = city.lat;
        opt.dataset.lng = city.lng;
        opt.dataset.tz = city.tz;
        if (city.name.includes('Chennai')) opt.selected = true;
        optGroup.appendChild(opt);
      });
      citySelect.appendChild(optGroup);
    });

    // City Change Listener
    citySelect.addEventListener('change', () => {
      const selected = citySelect.options[citySelect.selectedIndex];
      if (selected.dataset.lat) {
        document.getElementById('customLat').value = selected.dataset.lat;
        document.getElementById('customLng').value = selected.dataset.lng;
        document.getElementById('customTz').value = selected.dataset.tz;
      }
    });

    // Toggle Custom Coordinates
    const toggleCoordsBtn = document.getElementById('toggleCoordsBtn');
    const coordsBox = document.getElementById('customCoordsBox');
    toggleCoordsBtn.addEventListener('click', () => {
      coordsBox.classList.toggle('active');
    });

    // Geolocation API
    const currentGeoBtn = document.getElementById('currentGeoBtn');
    currentGeoBtn.addEventListener('click', () => {
      if (!navigator.geolocation) {
        alert('உங்கள் உலாவியில் GPS இருப்பிட வசதி இல்லை.');
        return;
      }
      currentGeoBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> கண்டறிகிறது...';
      navigator.geolocation.getCurrentPosition(
        pos => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const tz = -new Date().getTimezoneOffset() / 60.0;
          document.getElementById('customLat').value = lat.toFixed(4);
          document.getElementById('customLng').value = lng.toFixed(4);
          document.getElementById('customTz').value = tz;
          coordsBox.classList.add('active');
          currentGeoBtn.innerHTML = '<i class="fa-solid fa-check"></i> இருப்பிடம் பெறப்பட்டது!';
          setTimeout(() => {
            currentGeoBtn.innerHTML = '<i class="fa-solid fa-crosshairs"></i> எனது இருப்பிடம் (GPS)';
          }, 3000);
        },
        err => {
          alert('இருப்பிடத்தைப் பெற முடியவில்லை: ' + err.message);
          currentGeoBtn.innerHTML = '<i class="fa-solid fa-crosshairs"></i> எனது இருப்பிடம் (GPS)';
        }
      );
    });

    // Preset Buttons
    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const presetKey = btn.dataset.preset;
        const p = SAMPLE_PRESETS[presetKey];
        if (!p) return;

        document.getElementById('personName').value = p.name;
        document.getElementById('birthDate').value = p.date;
        document.getElementById('birthHour').value = p.hour;
        document.getElementById('birthMinute').value = p.minute;
        document.getElementById('birthAmPm').value = p.ampm;
        document.getElementById('gender').value = p.gender;

        // Select City
        for (let i = 0; i < citySelect.options.length; i++) {
          if (citySelect.options[i].value === p.city) {
            citySelect.selectedIndex = i;
            citySelect.dispatchEvent(new Event('change'));
            break;
          }
        }

        // Trigger Calculation
        document.getElementById('horoscopeForm').dispatchEvent(new Event('submit'));
      });
    });

    // Form Submit Listener
    const form = document.getElementById('horoscopeForm');
    form.addEventListener('submit', e => {
      e.preventDefault();

      const name = document.getElementById('personName').value.trim() || 'அன்பர்';
      const dateStr = document.getElementById('birthDate').value;
      const hour = document.getElementById('birthHour').value;
      const minute = document.getElementById('birthMinute').value;
      const ampm = document.getElementById('birthAmPm').value;
      const lat = parseFloat(document.getElementById('customLat').value);
      const lng = parseFloat(document.getElementById('customLng').value);
      const tz = parseFloat(document.getElementById('customTz').value);
      const ayanamsaType = document.getElementById('ayanamsaType').value;
      const cityName = citySelect.options[citySelect.selectedIndex]?.value || '';

      if (!dateStr) {
        alert('தயவுசெய்து பிறந்த தேதியை உள்ளிடவும்.');
        return;
      }

      const birthData = {
        name,
        dateStr,
        hour,
        minute,
        ampm,
        lat,
        lng,
        tz,
        ayanamsaType,
        cityName
      };

      const result = calculateHoroscope(birthData);
      updateDashboardUI(result);
    });

    // Tabs Navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetId = btn.dataset.tab;
        const targetPane = document.getElementById(targetId);
        if (targetPane) targetPane.classList.add('active');
      });
    });

    // Modal Close
    document.getElementById('closeModalBtn').addEventListener('click', () => {
      document.getElementById('bhavaModal').classList.remove('active');
    });

    document.getElementById('bhavaModal').addEventListener('click', e => {
      if (e.target.id === 'bhavaModal') {
        document.getElementById('bhavaModal').classList.remove('active');
      }
    });

    // Theme Toggle
    const themeBtn = document.getElementById('themeToggleBtn');
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      document.getElementById('themeText').textContent = isLight ? 'பகல் பார்வை' : 'இரவுப் பார்வை';
      themeBtn.querySelector('i').className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    });

    // Print Button
    document.getElementById('printBtn').addEventListener('click', () => {
      window.print();
    });

    // Now / Transit Button
    document.getElementById('nowTransitBtn').addEventListener('click', () => {
      const now = new Date();
      const yr = now.getFullYear();
      const mo = String(now.getMonth() + 1).padStart(2, '0');
      const dy = String(now.getDate()).padStart(2, '0');
      let hr = now.getHours();
      const mn = String(now.getMinutes()).padStart(2, '0');
      const ampm = hr >= 12 ? 'PM' : 'AM';
      if (hr > 12) hr -= 12;
      if (hr === 0) hr = 12;
      const hrStr = String(hr).padStart(2, '0');

      document.getElementById('personName').value = 'இன்றைய கோள் நிலை (Transit)';
      document.getElementById('birthDate').value = `${yr}-${mo}-${dy}`;
      document.getElementById('birthHour').value = hrStr;
      document.getElementById('birthMinute').value = mn;
      document.getElementById('birthAmPm').value = ampm;

      form.dispatchEvent(new Event('submit'));
    });

    // Initial Calculation Trigger on Load
    form.dispatchEvent(new Event('submit'));
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
