import path from 'path'
import { RequiredDataFromCollectionSlug } from 'payload'

export type ProductDataType = RequiredDataFromCollectionSlug<'products'>

export const productsData: ProductDataType[] = [
  {
    name: 'Galaxy S24 Ultra',
    slug: 'galaxy-s24-ultra',
    description:
      'The Samsung Galaxy S24 Ultra features a 200MP camera, Snapdragon 8 Gen 3, and a 6.8-inch Dynamic AMOLED 2X display with 120Hz refresh rate.',

    brand: '',
    price: 79999,

    discount: {
      percentage: 36,
    },
    finalPrice: 51199.36,

    category: '',
    tags: [{ tag: 'Mobile' }],

    template: 'mobile',
    mobileFields: {
      keySpecifications: {
        processor: 'Snapdragon 8 Gen 3',
        display: '6.8 inch QHD+ AMOLED, 120Hz',
        rearCamera:
          '200MP (wide) + 12MP (ultrawide) + 10MP (telephoto) + 10MP (periscope)',
        frontCamera: '40MP',
        ramStorage: '12 GB',
        battery: '5000 mAh',
        network: '5G',
      },

      performance: {
        chipset: 'Qualcomm Snapdragon 8 Gen 3',
        cpu: 'Octa-core (1x3.36 GHz Cortex-X4 & 3x3.0 GHz Cortex-A720 & 2x2.0 GHz Cortex-A520)',
        ram: '12 GB',
        graphics: 'Adreno 750',
      },

      design: {
        height: '162.3 mm',
        width: '79.0 mm',
        thickness: '8.6 mm',
        weight: '232g',
        build: 'Armor Aluminum frame, Gorilla Glass Victus 2 front/back',
        colors: 'Black, Blue',
      },

      display: {
        type: 'Dynamic AMOLED 2X',
        size: '6.8 inches',
        resolution: '3200 x 1440 pixels',
        refreshRate: '120Hz',
        protection: 'Gorilla Glass Victus 2',
      },

      camera: {
        rearSpecs: '200MP + 12MP + 10MP + 10MP',
        frontSpecs: '40MP',
        cameraFeatures: 'Laser autofocus, OIS, 8K video recording',
        videoFeatures: '8K@30fps, 4K@60fps, 1080p@240fps',
      },

      battery: {
        capacity: '5000 mAh',
        type: 'Li-Ion',
      },

      storage: {
        internalMemory: '256 GB',
        expandable: 'No',
      },

      software: {
        os: 'Android 14',
        customUI: 'One UI 6.1',
      },

      connectivity: {
        wifi: 'Wi-Fi 6E',
        bluetooth: '5.3',
        nfc: 'yes',
        usb: 'USB Type-C 3.2',
        gps: 'A-GPS, GLONASS, BDS, GALILEO',
      },

      sensors: {
        fingerprint: 'Under-display ultrasonic',
        faceUnlock: 'yes',
        others: 'Accelerometer, gyro, proximity, compass, barometer',
      },
    },

    images: [],
    isFeatured: false,
    isNewArrival: true,
    isSpecialOffer: false,

    additionalInformationSections: [],
  },
]

export const productsImagesData = [
  {
    alt: 'galaxy-s24-ultra-1',
    imageURL: path.join(process.cwd(), '/public/images/seed/s24-1.png'),
    name: 'galaxy-s24-ultra',
  },
  {
    alt: 'galaxy-s24-ultra-2',
    imageURL: path.join(process.cwd(), '/public/images/seed/s24-2.png'),
    name: 'galaxy-s24-ultra',
  },
]
