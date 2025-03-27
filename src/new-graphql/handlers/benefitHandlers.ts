import {mockGetBenefitsCategoriesQuery} from "../generated";


export const benefitHandlers = [
 mockGetBenefitsCategoriesQuery((_, res, ctx) => {
	 return res(ctx.delay(100),ctx.data({
		 me: {
			 benefits: {
				 categories: [
					 {
						 categoryCode: 'travel',
						 name: 'Travel',
						 imageUrl:
							 'https://pokitpal-images.s3-ap-southeast-2.amazonaws.com/stage/UploadFiles/OfferCategories/employment-hero/travel-and-holidays.svg',
					 },
					 {
						 categoryCode: 'fashion',
						 name: 'Fashion',
						 imageUrl:
							 'https://pokitpal-images.s3-ap-southeast-2.amazonaws.com/stage/UploadFiles/OfferCategories/employment-hero/fashion-and-clothing.svg',
					 },
					 {
						 categoryCode: 'retail',
						 name: 'Retail',
						 imageUrl:
							 'https://pokitpal-images.s3-ap-southeast-2.amazonaws.com/stage/UploadFiles/OfferCategories/employment-hero/retail-and-other.svg',
					 },
					 {
						 categoryCode: 'tech',
						 name: 'Tech',
						 imageUrl:
							 'https://pokitpal-images.s3-ap-southeast-2.amazonaws.com/stage/UploadFiles/OfferCategories/employment-hero/retail-and-other.svg',},
					 {
						 categoryCode: 'fitness',
						 name: 'Fitness',
						 imageUrl:
							 'https://pokitpal-images.s3-ap-southeast-2.amazonaws.com/stage/UploadFiles/OfferCategories/employment-hero/sports-and-fitness.svg',
					 },
					 {
						 categoryCode: 'wellness',
						 name: 'Wellness',
						 imageUrl:
							 'https://pokitpal-images.s3-ap-southeast-2.amazonaws.com/stage/UploadFiles/OfferCategories/employment-hero/health-and-beauty.svg',
					 },
					 {
						 categoryCode: 'experiences',
						 name: 'Experiences',
						 imageUrl:
							 'https://pokitpal-images.s3-ap-southeast-2.amazonaws.com/stage/UploadFiles/OfferCategories/employment-hero/retail-and-other.svg',},
					 {
						 categoryCode: 'dining',
						 name: 'Dining',
						 imageUrl:
							 'https://pokitpal-images.s3-ap-southeast-2.amazonaws.com/stage/UploadFiles/OfferCategories/employment-hero/food-and-drink.svg',
					 },
					 {
						 categoryCode: 'finances',
						 name: 'Finance',
						 imageUrl:
							 'https://pokitpal-images.s3-ap-southeast-2.amazonaws.com/stage/UploadFiles/OfferCategories/employment-hero/retail-and-other.svg',},
				 ]
			 }
		 }
	 }))
 })
]
