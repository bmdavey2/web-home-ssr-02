import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { gql } from 'graphql-request';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  JSON: any;
  JSONObject: any;
  Long: any;
};

export type Achievement = {
  __typename?: 'Achievement';
  Aggregates?: Maybe<FeedItemAggregates>;
  Categories?: Maybe<Array<Maybe<Category>>>;
  CategoryIDs?: Maybe<Array<Scalars['String']>>;
  Media?: Maybe<Array<Maybe<Media>>>;
  Member?: Maybe<Member>;
  MemberID?: Maybe<Scalars['String']>;
  UserID?: Maybe<Scalars['String']>;
  collaboratedWith?: Maybe<Scalars['String']>;
  completionTimeInSeconds?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Int']>;
  dateAccomplished?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  summary?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Int']>;
};

export type AdditionalInformation = {
  __typename?: 'AdditionalInformation';
  FileURL?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  fileSize?: Maybe<Scalars['Float']>;
  fileType?: Maybe<Scalars['String']>;
  objectID?: Maybe<Scalars['String']>;
  objectType?: Maybe<Scalars['String']>;
};

export type Article = {
  __typename?: 'Article';
  Aggregates?: Maybe<FeedItemAggregates>;
  Business?: Maybe<Business>;
  BusinessID?: Maybe<Scalars['String']>;
  Categories?: Maybe<Array<Maybe<Category>>>;
  CategoryIDs?: Maybe<Array<Scalars['String']>>;
  FeedItem?: Maybe<FeedItem>;
  Member?: Maybe<Member>;
  MemberID?: Maybe<Scalars['String']>;
  UserID?: Maybe<Scalars['String']>;
  actor?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  coverCaption?: Maybe<Scalars['String']>;
  coverPhotoID?: Maybe<Scalars['String']>;
  coverPhotoURL?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Long']>;
  excerpt?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  isCreatedByMentor?: Maybe<Scalars['Boolean']>;
  publishedAt?: Maybe<Scalars['Long']>;
  slug?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Long']>;
};


export type ArticleContentArgs = {
  raw?: InputMaybe<Scalars['Boolean']>;
};


export type ArticleCoverPhotoUrlArgs = {
  type?: InputMaybe<Scalars['String']>;
};

export type Articles = {
  __typename?: 'Articles';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<Article>>;
  next?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type Business = {
  __typename?: 'Business';
  Activities: FeedItemGroup;
  Aggregates?: Maybe<ProfileAggregates>;
  Categories?: Maybe<Array<Category>>;
  CategoryIDs?: Maybe<Array<Scalars['String']>>;
  Followers?: Maybe<Array<Maybe<SocialProfile>>>;
  Follows?: Maybe<Array<Maybe<SocialProfile>>>;
  Gallery: Gallery;
  Medals: NftMedals;
  Partners?: Maybe<Array<Maybe<SocialProfile>>>;
  Reviews?: Maybe<Reviews>;
  Saves?: Maybe<FeedItemGroup>;
  UserIDs?: Maybe<Array<Scalars['String']>>;
  UserRoles?: Maybe<Array<BusinessUserRole>>;
  ap5BestKnownFor?: Maybe<Scalars['String']>;
  ap5FavoriteEvents?: Maybe<Scalars['String']>;
  ap5InspiredBy?: Maybe<Scalars['String']>;
  ap5PassionateAbout?: Maybe<Scalars['String']>;
  ap5ProudestThing?: Maybe<Scalars['String']>;
  badge?: Maybe<Scalars['String']>;
  birthDate?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  coverPhotoID?: Maybe<Scalars['String']>;
  coverPhotoURL?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Long']>;
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  isFollowed?: Maybe<Scalars['Boolean']>;
  isPartner?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  nonProfitBusiness?: Maybe<Scalars['Boolean']>;
  partners?: Maybe<Array<Scalars['String']>>;
  personalStatus?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  plan?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  profilePhotoID?: Maybe<Scalars['String']>;
  profilePhotoURL?: Maybe<Scalars['String']>;
  profileType?: Maybe<Scalars['String']>;
  serviceProvided?: Maybe<Array<Scalars['String']>>;
  signUpNumber?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
  statement?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Long']>;
  website?: Maybe<Scalars['String']>;
};


export type BusinessActivitiesArgs = {
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
  objectType?: InputMaybe<Scalars['String']>;
};


export type BusinessFollowersArgs = {
  count?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Scalars['String']>;
};


export type BusinessFollowsArgs = {
  count?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Scalars['String']>;
};


export type BusinessGalleryArgs = {
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
};


export type BusinessMedalsArgs = {
  count?: InputMaybe<Scalars['Int']>;
  next?: InputMaybe<Scalars['String']>;
};


export type BusinessReviewsArgs = {
  count?: InputMaybe<Scalars['Int']>;
  next?: InputMaybe<Scalars['Int']>;
  rating?: InputMaybe<Scalars['Int']>;
};


export type BusinessSavesArgs = {
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
};


export type BusinessCoverPhotoUrlArgs = {
  type?: InputMaybe<Scalars['String']>;
};


export type BusinessProfilePhotoUrlArgs = {
  type?: InputMaybe<Scalars['String']>;
};

export type BusinessSubscriptionFeatures = {
  __typename?: 'BusinessSubscriptionFeatures';
  addLinksInContent: Scalars['Boolean'];
  additionalTeamMembers: Scalars['Int'];
  followLimits: Scalars['Int'];
  prioritySupport: Scalars['Boolean'];
  recommendProfile: Scalars['Boolean'];
};

export type BusinessSubscriptionPlan = {
  __typename?: 'BusinessSubscriptionPlan';
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  prices: Array<BusinessSubscriptionPlanPrice>;
  type: Scalars['String'];
};

export type BusinessSubscriptionPlanPrice = {
  __typename?: 'BusinessSubscriptionPlanPrice';
  amount: Scalars['String'];
  currency: Scalars['String'];
  discounted: Scalars['Boolean'];
  id: Scalars['ID'];
  interval: Scalars['String'];
};

export type BusinessTeamMember = {
  __typename?: 'BusinessTeamMember';
  Business?: Maybe<Business>;
  BusinessID?: Maybe<Scalars['String']>;
  Member?: Maybe<Member>;
  UserID?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Long']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  inactiveReason?: Maybe<Scalars['String']>;
  invitedBy?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Long']>;
};

export type BusinessTeamMembers = {
  __typename?: 'BusinessTeamMembers';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<BusinessTeamMember>>;
  next?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type BusinessUserRole = {
  __typename?: 'BusinessUserRole';
  UserID?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Long']>;
  role?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Long']>;
};

export type Category = {
  __typename?: 'Category';
  PhotoID?: Maybe<Scalars['String']>;
  PhotoURL?: Maybe<Scalars['String']>;
  archived?: Maybe<Scalars['Boolean']>;
  communityInterest?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['Long']>;
  iconName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['String']>;
  productCategory?: Maybe<Scalars['Boolean']>;
  summary?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Long']>;
};


export type CategoryPhotoUrlArgs = {
  type?: InputMaybe<Scalars['String']>;
};

export type Comment = {
  __typename?: 'Comment';
  Aggregates?: Maybe<CommentAggregates>;
  Business?: Maybe<Business>;
  Member?: Maybe<Member>;
  actor?: Maybe<Scalars['String']>;
  actorID?: Maybe<Scalars['String']>;
  actorType?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  isHighFived: Scalars['Boolean'];
  /** @deprecated Use isHighFived instead. */
  isLiked: Scalars['Boolean'];
  object?: Maybe<Scalars['String']>;
  objectActor?: Maybe<Scalars['String']>;
  objectID?: Maybe<Scalars['String']>;
  objectType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Date']>;
  /** @deprecated Use time instead. */
  timestamp?: Maybe<Scalars['Long']>;
};

export type CommentAggregates = {
  __typename?: 'CommentAggregates';
  highFives?: Maybe<Scalars['Int']>;
  likes?: Maybe<Scalars['Int']>;
};

export type Content = {
  __typename?: 'Content';
  Achievement?: Maybe<Achievement>;
  Article?: Maybe<Article>;
  Comment?: Maybe<Comment>;
  Product?: Maybe<Product>;
  Update?: Maybe<Update>;
  VideoFeed?: Maybe<VideoFeed>;
  object?: Maybe<Scalars['ID']>;
  objectID?: Maybe<Scalars['String']>;
  objectType?: Maybe<Scalars['String']>;
};

export type FeedItem = {
  __typename?: 'FeedItem';
  Achievement?: Maybe<Achievement>;
  Aggregates: FeedItemAggregates;
  Article?: Maybe<Article>;
  Business?: Maybe<Business>;
  Categories?: Maybe<Array<Category>>;
  CategoryIDs?: Maybe<Array<Scalars['String']>>;
  Comments: FeedItemComments;
  HighFives: FeedItemLikes;
  /** @deprecated Use HighFives instead. */
  Likes: FeedItemLikes;
  Member?: Maybe<Member>;
  Update?: Maybe<Update>;
  VideoFeed?: Maybe<VideoFeed>;
  actor?: Maybe<Scalars['String']>;
  actorID?: Maybe<Scalars['String']>;
  actorType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  isHighFived?: Maybe<Scalars['Boolean']>;
  /** @deprecated Use isHighFived instead. */
  isLiked?: Maybe<Scalars['Boolean']>;
  isSaved?: Maybe<Scalars['Boolean']>;
  object?: Maybe<Scalars['String']>;
  objectID?: Maybe<Scalars['String']>;
  objectType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Date']>;
  timestamp?: Maybe<Scalars['Long']>;
};


export type FeedItemCommentsArgs = {
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
};


export type FeedItemHighFivesArgs = {
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
};


export type FeedItemLikesArgs = {
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
};

export type FeedItemAggregates = {
  __typename?: 'FeedItemAggregates';
  comments?: Maybe<Scalars['Int']>;
  highFives?: Maybe<Scalars['Int']>;
  likes?: Maybe<Scalars['Int']>;
  saves?: Maybe<Scalars['Int']>;
  views?: Maybe<Scalars['Int']>;
};

export type FeedItemComments = {
  __typename?: 'FeedItemComments';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<Comment>>;
  next?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type FeedItemGroup = {
  __typename?: 'FeedItemGroup';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<FeedItem>>;
  next?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type FeedItemLikes = {
  __typename?: 'FeedItemLikes';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<SocialProfile>>;
  next?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type Followers = {
  __typename?: 'Followers';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<SocialProfile>>;
  next?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type Follows = {
  __typename?: 'Follows';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<SocialProfile>>;
  next?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type Gallery = {
  __typename?: 'Gallery';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<GalleryItem>>;
  next?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type GalleryItem = {
  __typename?: 'GalleryItem';
  FeedItem?: Maybe<FeedItem>;
  PhotoURL?: Maybe<Scalars['String']>;
  VideoURL?: Maybe<Scalars['String']>;
  objectID?: Maybe<Scalars['String']>;
  objectType?: Maybe<Scalars['String']>;
};


export type GalleryItemPhotoUrlArgs = {
  type?: InputMaybe<Scalars['String']>;
};


export type GalleryItemVideoUrlArgs = {
  type?: InputMaybe<Scalars['String']>;
};

export type IdentifiedUserMembers = {
  __typename?: 'IdentifiedUserMembers';
  Member?: Maybe<Member>;
  email?: Maybe<Scalars['String']>;
  facebookUID?: Maybe<Scalars['String']>;
  googleUID?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type InputAchievement = {
  CategoryIDs?: InputMaybe<Array<Scalars['String']>>;
  Media?: InputMaybe<Array<InputMedia>>;
  collaboratedWith?: InputMaybe<Scalars['String']>;
  completionTimeInSeconds?: InputMaybe<Scalars['Int']>;
  content?: InputMaybe<Scalars['String']>;
  dateAccomplished?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  summary?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type InputAdditionalInformation = {
  fileName: Scalars['String'];
  fileSize: Scalars['Float'];
  fileType: Scalars['String'];
  objectID: Scalars['String'];
  objectType: Scalars['String'];
};

export type InputArticle = {
  CategoryIDs?: InputMaybe<Array<Scalars['String']>>;
  content?: InputMaybe<Scalars['String']>;
  coverCaption?: InputMaybe<Scalars['String']>;
  coverPhotoID?: InputMaybe<Scalars['String']>;
  excerpt?: InputMaybe<Scalars['String']>;
  subtitle?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type InputBusiness = {
  CategoryIDs?: InputMaybe<Array<Scalars['String']>>;
  ap5BestKnownFor?: InputMaybe<Scalars['String']>;
  ap5FavoriteEvents?: InputMaybe<Scalars['String']>;
  ap5InspiredBy?: InputMaybe<Scalars['String']>;
  ap5PassionateAbout?: InputMaybe<Scalars['String']>;
  ap5ProudestThing?: InputMaybe<Scalars['String']>;
  badge?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  coverPhotoID?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  nonProfitBusiness?: InputMaybe<Scalars['Boolean']>;
  partners?: InputMaybe<Array<Scalars['String']>>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  postalCode?: InputMaybe<Scalars['String']>;
  profilePhotoID?: InputMaybe<Scalars['String']>;
  profileType?: InputMaybe<Scalars['String']>;
  serviceProvided?: InputMaybe<Array<Scalars['String']>>;
  statement?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

export type InputBusinessPlanPreRegistration = {
  businessName: Scalars['String'];
  emailAddress: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  memberID?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

export type InputBusinessReview = {
  BusinessID: Scalars['String'];
  content: Scalars['String'];
  rating: Scalars['Int'];
};

export type InputContentReport = {
  GetStreamActivityID: Scalars['String'];
  blockActor: Scalars['Boolean'];
  objectID: Scalars['String'];
  objectType: Scalars['String'];
  reason: Scalars['String'];
  unfollowActor: Scalars['Boolean'];
};

export type InputInquiry = {
  businessName?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type InputMedia = {
  objectID: Scalars['String'];
  objectType: Scalars['String'];
};

export type InputMentorApplication = {
  brands?: InputMaybe<Scalars['String']>;
  experience?: InputMaybe<Scalars['String']>;
  expertise?: InputMaybe<Scalars['String']>;
  introduction?: InputMaybe<Scalars['String']>;
  links?: InputMaybe<Scalars['String']>;
  qualifications?: InputMaybe<Scalars['String']>;
  results?: InputMaybe<Scalars['String']>;
  socialHandles?: InputMaybe<Scalars['String']>;
};

export type InputProduct = {
  AdditionalInformation?: InputMaybe<Array<InputAdditionalInformation>>;
  BusinessID?: InputMaybe<Scalars['String']>;
  CategoryIDs?: InputMaybe<Array<Scalars['String']>>;
  Media?: InputMaybe<Array<InputMedia>>;
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  coverPhotoID?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['String']>;
  endTime?: InputMaybe<Scalars['String']>;
  eventDistance?: InputMaybe<Scalars['Float']>;
  eventDistanceUnit?: InputMaybe<Scalars['String']>;
  externalURL?: InputMaybe<Scalars['String']>;
  inquiryType?: InputMaybe<Scalars['String']>;
  parentID?: InputMaybe<Scalars['String']>;
  postcode?: InputMaybe<Scalars['String']>;
  priceAmount?: InputMaybe<Scalars['Float']>;
  priceAmountMax?: InputMaybe<Scalars['Float']>;
  pricing?: InputMaybe<Scalars['String']>;
  repeats?: InputMaybe<Scalars['Boolean']>;
  startDate?: InputMaybe<Scalars['String']>;
  startTime?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  suburb?: InputMaybe<Scalars['String']>;
  timezone?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  virtual?: InputMaybe<Scalars['Boolean']>;
};

export type InputProductContactForm = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  message: Scalars['String'];
  phoneNumber: Scalars['String'];
  productID: Scalars['String'];
  targetBusinessID: Scalars['String'];
};

export type InputProfile = {
  CategoryIDs?: InputMaybe<Array<Scalars['String']>>;
  ap5FavoriteEvents?: InputMaybe<Scalars['String']>;
  ap5InspiredBy?: InputMaybe<Scalars['String']>;
  ap5PassionateAbout?: InputMaybe<Scalars['String']>;
  ap5ToughestThing?: InputMaybe<Scalars['String']>;
  ap5TrainingWith?: InputMaybe<Scalars['String']>;
  backgroundColor?: InputMaybe<Scalars['String']>;
  biography?: InputMaybe<Scalars['String']>;
  birthDate?: InputMaybe<Scalars['String']>;
  claimed?: InputMaybe<Scalars['Boolean']>;
  country?: InputMaybe<Scalars['String']>;
  coverPhotoID?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  followMentors?: InputMaybe<Scalars['Boolean']>;
  gender?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  partners?: InputMaybe<Array<Scalars['String']>>;
  personalStatus?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  postalCode?: InputMaybe<Scalars['String']>;
  profilePhotoID?: InputMaybe<Scalars['String']>;
  quotes?: InputMaybe<Scalars['String']>;
};

export type InputTag = {
  objectID: Scalars['String'];
  objectType: Scalars['String'];
  xCoordinate: Scalars['String'];
  yCoordinate: Scalars['String'];
};

export type InputUpdate = {
  CategoryIDs?: InputMaybe<Array<Scalars['String']>>;
  Media?: InputMaybe<Array<InputMedia>>;
  content?: InputMaybe<Scalars['String']>;
};

export type InputUserIdentifier = {
  email?: InputMaybe<Scalars['String']>;
  facebookUID?: InputMaybe<Scalars['String']>;
  googleUID?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type InputVideoFeed = {
  CategoryIDs?: InputMaybe<Array<Scalars['String']>>;
  Media?: InputMaybe<Array<InputMedia>>;
  description?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Me = {
  __typename?: 'Me';
  Articles?: Maybe<MyArticles>;
  BusinessRoles?: Maybe<Array<Maybe<MyBusinessRole>>>;
  Notifications?: Maybe<MyNotifications>;
  Owner?: Maybe<Member>;
  Profile?: Maybe<MyProfile>;
  RecommendedBusinesses?: Maybe<Array<RecommendedBusiness>>;
  RecommendedFollows?: Maybe<Array<RecommendedFollow>>;
  RecommendedMembers?: Maybe<Array<RecommendedMember>>;
  Timeline?: Maybe<FeedItemGroup>;
};


export type MeNotificationsArgs = {
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
};


export type MeRecommendedBusinessesArgs = {
  count?: InputMaybe<Scalars['Int']>;
};


export type MeRecommendedFollowsArgs = {
  count?: InputMaybe<Scalars['Int']>;
};


export type MeRecommendedMembersArgs = {
  count?: InputMaybe<Scalars['Int']>;
};


export type MeTimelineArgs = {
  CategoryID?: InputMaybe<Scalars['String']>;
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
};

export type Media = {
  __typename?: 'Media';
  FileURL?: Maybe<Scalars['String']>;
  MedalURL?: Maybe<Scalars['String']>;
  PhotoURL?: Maybe<Scalars['String']>;
  Pin?: Maybe<Pin>;
  VideoThumbnail?: Maybe<Scalars['String']>;
  VideoURL?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  isNFTMedal?: Maybe<Scalars['Boolean']>;
  objectID?: Maybe<Scalars['String']>;
  objectType?: Maybe<Scalars['String']>;
  orientation?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};


export type MediaPhotoUrlArgs = {
  type?: InputMaybe<Scalars['String']>;
};


export type MediaVideoUrlArgs = {
  type?: InputMaybe<Scalars['String']>;
};

export type MediaDimension = {
  __typename?: 'MediaDimension';
  duration?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['String']>;
};

export type Member = {
  __typename?: 'Member';
  Achievements?: Maybe<Array<Maybe<Achievement>>>;
  Activities: FeedItemGroup;
  Aggregates?: Maybe<ProfileAggregates>;
  Categories: Array<Category>;
  CategoryIDs?: Maybe<Array<Scalars['String']>>;
  Followers?: Maybe<Array<Maybe<SocialProfile>>>;
  Follows?: Maybe<Array<Maybe<SocialProfile>>>;
  Gallery?: Maybe<Gallery>;
  Medals: NftUserMedals;
  Mentor?: Maybe<Mentor>;
  Partners?: Maybe<Array<Maybe<SocialProfile>>>;
  Saves?: Maybe<FeedItemGroup>;
  ap5FavoriteEvents?: Maybe<Scalars['String']>;
  ap5InspiredBy?: Maybe<Scalars['String']>;
  ap5PassionateAbout?: Maybe<Scalars['String']>;
  ap5ToughestThing?: Maybe<Scalars['String']>;
  ap5TrainingWith?: Maybe<Scalars['String']>;
  backgroundColor?: Maybe<Scalars['String']>;
  biography?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  claimed?: Maybe<Scalars['Boolean']>;
  country?: Maybe<Scalars['String']>;
  coverPhotoID?: Maybe<Scalars['String']>;
  coverPhotoURL?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Long']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  isFollowed?: Maybe<Scalars['Boolean']>;
  isPublished?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  partners?: Maybe<Array<Scalars['String']>>;
  personalStatus?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  profilePhotoID?: Maybe<Scalars['String']>;
  profilePhotoURL?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['Long']>;
  quotes?: Maybe<Scalars['String']>;
  signUpNumber?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  suburb?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Long']>;
};


export type MemberActivitiesArgs = {
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
  objectType?: InputMaybe<Scalars['String']>;
};


export type MemberFollowersArgs = {
  count?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Scalars['String']>;
};


export type MemberFollowsArgs = {
  count?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Scalars['String']>;
};


export type MemberGalleryArgs = {
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
};


export type MemberMedalsArgs = {
  count?: InputMaybe<Scalars['Int']>;
  next?: InputMaybe<Scalars['String']>;
};


export type MemberSavesArgs = {
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
};


export type MemberCoverPhotoUrlArgs = {
  type?: InputMaybe<Scalars['String']>;
};


export type MemberProfilePhotoUrlArgs = {
  type?: InputMaybe<Scalars['String']>;
};

export type Mentor = {
  __typename?: 'Mentor';
  MentorApplicationID?: Maybe<Scalars['String']>;
  UserID?: Maybe<Scalars['String']>;
  badge?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Long']>;
  id?: Maybe<Scalars['ID']>;
  updatedAt?: Maybe<Scalars['Long']>;
};

export type MentorApplication = {
  __typename?: 'MentorApplication';
  User?: Maybe<User>;
  UserID: Scalars['String'];
  createdAt: Scalars['Long'];
  id?: Maybe<Scalars['ID']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  NFTClaimMemberProfile: MutationResult;
  addComment: MutationResult;
  addInterestCategory: MutationResult;
  addPin: MutationResult;
  addReaction: MutationResult;
  block: MutationResult;
  changeBusinessSubscription: MutationResult;
  createAchievement: MutationResult;
  createArticle: MutationResult;
  createBusiness: MutationResult;
  /** @deprecated Use createFormEntry with type 'BusinessPlanPreRegistration' instead */
  createBusinessPlanPreRegistration: MutationResult;
  createBusinessReview: MutationResult;
  /** @deprecated Use createFormEntry with type 'ContentReport' instead */
  createContentReport: MutationResult;
  createFormEntry: MutationResult;
  /** @deprecated Use createFormEntry with type 'Inquiry' instead */
  createInquiry: MutationResult;
  /** @deprecated Use createFormEntry with type 'MentorApplication' instead */
  createMentorApplication: MutationResult;
  createProduct: MutationResult;
  /** @deprecated Use createFormEntry with type 'ProductInquiry' instead */
  createProductContactForm: MutationResult;
  createProfile: MutationResult;
  createStripeCheckoutSession: MutationResult;
  createStripeCustomerPortalSession: MutationResult;
  createUpdate: MutationResult;
  createVideoFeed: MutationResult;
  decodeMemberClaim: MutationResult;
  deleteAchievement: MutationResult;
  deleteArticle: MutationResult;
  /** @deprecated Use removeComment instead. */
  deleteComment: MutationResult;
  deleteProduct: MutationResult;
  deleteProducts: MutationResult;
  deleteUpdate: MutationResult;
  deleteVideoFeed: MutationResult;
  downloadFile: MutationResult;
  downloadMedal: MutationResult;
  editAchievement: MutationResult;
  editArticle: MutationResult;
  editBusiness: MutationResult;
  editBusinessReview: MutationResult;
  editBusinessTeamMember: MutationResult;
  editComment: MutationResult;
  editPin: MutationResult;
  editProduct: MutationResult;
  editProfile: MutationResult;
  editUpdate: MutationResult;
  editVideoFeed: MutationResult;
  follow: MutationResult;
  followMany: MutationResult;
  hide: MutationResult;
  /** @deprecated Use addReaction instead. */
  highFive: MutationResult;
  highFiveNFTMedal: MutationResult;
  highFiveNFTUserMedal: MutationResult;
  /** @deprecated Use createFormEntry with type 'InviteTeamMember' instead */
  inviteTeamMember: MutationResult;
  /** @deprecated Use highFive or addReaction instead. */
  like: MutationResult;
  linkMemberToBusiness: MutationResult;
  markNotificationsRead: MutationResult;
  markNotificationsSeen: MutationResult;
  publishArticle: MutationResult;
  publishProducts: MutationResult;
  removeComment: MutationResult;
  removeInterestCategory: MutationResult;
  removeReaction: MutationResult;
  save: MutationResult;
  saveProduct: MutationResult;
  /** @deprecated Use createFormEntry with type 'CategorySuggestion' instead */
  suggestInterestCategory: MutationResult;
  unblock: MutationResult;
  unfollow: MutationResult;
  unhide: MutationResult;
  /** @deprecated Use removeReaction with type of 'highFive' instead. */
  unhighFive: MutationResult;
  unhighFiveNFTMedal: MutationResult;
  unhighFiveNFTUserMedal: MutationResult;
  /** @deprecated Use removeReaction with type of 'highFive' instead. */
  unlike: MutationResult;
  unpublishArticle: MutationResult;
  unpublishProducts: MutationResult;
  /** @deprecated Use removeReaction with type of 'save' instead. */
  unsave: MutationResult;
  unsaveProduct: MutationResult;
  /** @deprecated Use viewArticleByID or viewArticleBySlug instead. */
  viewArticle: MutationResult;
  viewArticleByID: Article;
  viewArticleBySlug: Article;
  /** @deprecated Use viewProductByID or viewProductBySlug instead. */
  viewProduct: MutationResult;
  viewProductByID: Product;
  viewProductBySlug: Product;
};


export type MutationNftClaimMemberProfileArgs = {
  userMedalID?: InputMaybe<Scalars['String']>;
};


export type MutationAddCommentArgs = {
  content: Scalars['String'];
  objectID?: InputMaybe<Scalars['String']>;
  objectType?: InputMaybe<Scalars['String']>;
  targetGetStreamActivityID?: InputMaybe<Scalars['String']>;
};


export type MutationAddInterestCategoryArgs = {
  CategoryID: Scalars['String'];
};


export type MutationAddPinArgs = {
  Tags: Array<InputTag>;
  photoID: Scalars['String'];
};


export type MutationAddReactionArgs = {
  contentID: Scalars['String'];
  contentType: Scalars['String'];
  type: Scalars['String'];
};


export type MutationBlockArgs = {
  targetBusinessID?: InputMaybe<Scalars['String']>;
  targetID?: InputMaybe<Scalars['String']>;
  targetMemberID?: InputMaybe<Scalars['String']>;
  targetType?: InputMaybe<Scalars['String']>;
};


export type MutationChangeBusinessSubscriptionArgs = {
  PriceID?: InputMaybe<Scalars['String']>;
};


export type MutationCreateAchievementArgs = {
  input: InputAchievement;
};


export type MutationCreateArticleArgs = {
  BusinessID?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<InputArticle>;
};


export type MutationCreateBusinessArgs = {
  input: InputBusiness;
};


export type MutationCreateBusinessPlanPreRegistrationArgs = {
  input: InputBusinessPlanPreRegistration;
};


export type MutationCreateBusinessReviewArgs = {
  input: InputBusinessReview;
};


export type MutationCreateContentReportArgs = {
  input: InputContentReport;
};


export type MutationCreateFormEntryArgs = {
  data?: InputMaybe<Scalars['JSON']>;
  type: Scalars['String'];
};


export type MutationCreateInquiryArgs = {
  input: InputInquiry;
};


export type MutationCreateMentorApplicationArgs = {
  input: InputMentorApplication;
};


export type MutationCreateProductArgs = {
  BusinessID: Scalars['String'];
  input: InputProduct;
};


export type MutationCreateProductContactFormArgs = {
  input: InputProductContactForm;
};


export type MutationCreateProfileArgs = {
  input: InputProfile;
};


export type MutationCreateStripeCheckoutSessionArgs = {
  PriceID: Scalars['String'];
};


export type MutationCreateUpdateArgs = {
  BusinessID?: InputMaybe<Scalars['String']>;
  input: InputUpdate;
};


export type MutationCreateVideoFeedArgs = {
  input: InputVideoFeed;
};


export type MutationDecodeMemberClaimArgs = {
  challenge: Scalars['String'];
};


export type MutationDeleteAchievementArgs = {
  id: Scalars['String'];
};


export type MutationDeleteArticleArgs = {
  id: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  GetStreamReactionID?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteProductArgs = {
  id: Scalars['String'];
};


export type MutationDeleteProductsArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationDeleteUpdateArgs = {
  id: Scalars['String'];
};


export type MutationDeleteVideoFeedArgs = {
  id: Scalars['String'];
};


export type MutationDownloadFileArgs = {
  objectID: Scalars['String'];
  objectType: Scalars['String'];
};


export type MutationDownloadMedalArgs = {
  objectID: Scalars['String'];
  objectType: Scalars['String'];
};


export type MutationEditAchievementArgs = {
  id: Scalars['String'];
  input: InputAchievement;
};


export type MutationEditArticleArgs = {
  id: Scalars['String'];
  input: InputArticle;
  patch?: InputMaybe<Scalars['Boolean']>;
};


export type MutationEditBusinessArgs = {
  id: Scalars['String'];
  input: InputBusiness;
  patch?: InputMaybe<Scalars['Boolean']>;
};


export type MutationEditBusinessReviewArgs = {
  id: Scalars['String'];
  input: InputBusinessReview;
};


export type MutationEditBusinessTeamMemberArgs = {
  action: Scalars['String'];
  id: Scalars['String'];
  inactiveReason?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};


export type MutationEditCommentArgs = {
  GetStreamReactionID?: InputMaybe<Scalars['String']>;
  content: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
};


export type MutationEditPinArgs = {
  Tags: Array<InputTag>;
  photoID: Scalars['String'];
};


export type MutationEditProductArgs = {
  BusinessID: Scalars['String'];
  id: Scalars['String'];
  input: InputProduct;
};


export type MutationEditProfileArgs = {
  input: InputProfile;
  set?: InputMaybe<Scalars['Boolean']>;
};


export type MutationEditUpdateArgs = {
  id: Scalars['String'];
  input: InputUpdate;
  patch?: InputMaybe<Scalars['Boolean']>;
};


export type MutationEditVideoFeedArgs = {
  id: Scalars['String'];
  input: InputVideoFeed;
  patch?: InputMaybe<Scalars['Boolean']>;
};


export type MutationFollowArgs = {
  targetBusinessID?: InputMaybe<Scalars['String']>;
  targetID?: InputMaybe<Scalars['String']>;
  targetMemberID?: InputMaybe<Scalars['String']>;
  targetType?: InputMaybe<Scalars['String']>;
};


export type MutationFollowManyArgs = {
  profiles: Array<Scalars['String']>;
};


export type MutationHideArgs = {
  targetBusinessID?: InputMaybe<Scalars['String']>;
  targetID?: InputMaybe<Scalars['String']>;
  targetMemberID?: InputMaybe<Scalars['String']>;
  targetType?: InputMaybe<Scalars['String']>;
};


export type MutationHighFiveArgs = {
  contentID: Scalars['String'];
  contentType: Scalars['String'];
};


export type MutationHighFiveNftMedalArgs = {
  id: Scalars['String'];
};


export type MutationHighFiveNftUserMedalArgs = {
  id: Scalars['String'];
};


export type MutationInviteTeamMemberArgs = {
  emails: Array<Scalars['String']>;
  slugs: Array<Scalars['String']>;
};


export type MutationLikeArgs = {
  CommentID?: InputMaybe<Scalars['String']>;
  FeedItemID?: InputMaybe<Scalars['String']>;
  contentID?: InputMaybe<Scalars['String']>;
  contentType?: InputMaybe<Scalars['String']>;
  targetGetStreamActivityID?: InputMaybe<Scalars['String']>;
  targetGetStreamReactionID?: InputMaybe<Scalars['String']>;
};


export type MutationLinkMemberToBusinessArgs = {
  challenge: Scalars['String'];
};


export type MutationMarkNotificationsReadArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type MutationPublishArticleArgs = {
  BusinessID?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
};


export type MutationPublishProductsArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationRemoveCommentArgs = {
  id: Scalars['String'];
};


export type MutationRemoveInterestCategoryArgs = {
  CategoryID: Scalars['String'];
};


export type MutationRemoveReactionArgs = {
  contentID: Scalars['String'];
  contentType: Scalars['String'];
  type: Scalars['String'];
};


export type MutationSaveArgs = {
  FeedItemID?: InputMaybe<Scalars['String']>;
  contentID?: InputMaybe<Scalars['String']>;
  contentType?: InputMaybe<Scalars['String']>;
  targetGetStreamActivityID?: InputMaybe<Scalars['String']>;
};


export type MutationSaveProductArgs = {
  id: Scalars['String'];
};


export type MutationSuggestInterestCategoryArgs = {
  name: Scalars['String'];
};


export type MutationUnblockArgs = {
  targetBusinessID?: InputMaybe<Scalars['String']>;
  targetID?: InputMaybe<Scalars['String']>;
  targetMemberID?: InputMaybe<Scalars['String']>;
  targetType?: InputMaybe<Scalars['String']>;
};


export type MutationUnfollowArgs = {
  targetBusinessID?: InputMaybe<Scalars['String']>;
  targetID?: InputMaybe<Scalars['String']>;
  targetMemberID?: InputMaybe<Scalars['String']>;
  targetType?: InputMaybe<Scalars['String']>;
};


export type MutationUnhideArgs = {
  targetBusinessID?: InputMaybe<Scalars['String']>;
  targetID?: InputMaybe<Scalars['String']>;
  targetMemberID?: InputMaybe<Scalars['String']>;
  targetType?: InputMaybe<Scalars['String']>;
};


export type MutationUnhighFiveArgs = {
  contentID: Scalars['String'];
  contentType: Scalars['String'];
};


export type MutationUnhighFiveNftMedalArgs = {
  id: Scalars['String'];
};


export type MutationUnhighFiveNftUserMedalArgs = {
  id: Scalars['String'];
};


export type MutationUnlikeArgs = {
  CommentID?: InputMaybe<Scalars['String']>;
  FeedItemID?: InputMaybe<Scalars['String']>;
  contentID?: InputMaybe<Scalars['String']>;
  contentType?: InputMaybe<Scalars['String']>;
  targetGetStreamActivityID?: InputMaybe<Scalars['String']>;
  targetGetStreamReactionID?: InputMaybe<Scalars['String']>;
};


export type MutationUnpublishArticleArgs = {
  id: Scalars['String'];
};


export type MutationUnpublishProductsArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationUnsaveArgs = {
  FeedItemID?: InputMaybe<Scalars['String']>;
  contentID?: InputMaybe<Scalars['String']>;
  contentType?: InputMaybe<Scalars['String']>;
  targetGetStreamActivityID?: InputMaybe<Scalars['String']>;
};


export type MutationUnsaveProductArgs = {
  id: Scalars['String'];
};


export type MutationViewArticleArgs = {
  id: Scalars['String'];
};


export type MutationViewArticleByIdArgs = {
  id: Scalars['String'];
};


export type MutationViewArticleBySlugArgs = {
  slug: Scalars['String'];
};


export type MutationViewProductArgs = {
  id: Scalars['String'];
};


export type MutationViewProductByIdArgs = {
  id: Scalars['String'];
};


export type MutationViewProductBySlugArgs = {
  slug: Scalars['String'];
};

export type MutationResult = {
  __typename?: 'MutationResult';
  objectID?: Maybe<Scalars['String']>;
  objectType?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  timestamp?: Maybe<Scalars['Long']>;
};

export type MyArticleAggregates = {
  __typename?: 'MyArticleAggregates';
  comments?: Maybe<Scalars['Int']>;
  drafts?: Maybe<Scalars['Int']>;
  likes?: Maybe<Scalars['Int']>;
  published?: Maybe<Scalars['Int']>;
  saves?: Maybe<Scalars['Int']>;
  shares?: Maybe<Scalars['Int']>;
  views?: Maybe<Scalars['Int']>;
};

export type MyArticles = {
  __typename?: 'MyArticles';
  AccountProfiles?: Maybe<Array<SocialProfile>>;
  Aggregates?: Maybe<MyArticleAggregates>;
  Drafts?: Maybe<Array<Article>>;
  Published?: Maybe<Array<Article>>;
};

export type MyBusinessRole = {
  __typename?: 'MyBusinessRole';
  Business?: Maybe<Business>;
  BusinessID?: Maybe<Scalars['String']>;
  UserID?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Long']>;
  role?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Long']>;
};

export type MyBusinessSubscription = {
  __typename?: 'MyBusinessSubscription';
  canceled?: Maybe<Scalars['Boolean']>;
  creationTime?: Maybe<Scalars['DateTime']>;
  features: BusinessSubscriptionFeatures;
  interval?: Maybe<Scalars['String']>;
  isPaid: Scalars['Boolean'];
  periodEndTime?: Maybe<Scalars['DateTime']>;
  periodStartTime?: Maybe<Scalars['DateTime']>;
  type: Scalars['String'];
};

export type MyMemberProfile = {
  __typename?: 'MyMemberProfile';
  Achievements?: Maybe<Array<Maybe<Achievement>>>;
  Activities: FeedItemGroup;
  Aggregates?: Maybe<ProfileAggregates>;
  Categories: Array<Category>;
  CategoryIDs?: Maybe<Array<Scalars['String']>>;
  Followers?: Maybe<Array<Maybe<SocialProfile>>>;
  Follows?: Maybe<Array<Maybe<SocialProfile>>>;
  Gallery?: Maybe<Gallery>;
  Mentor?: Maybe<Mentor>;
  Partners?: Maybe<Array<Maybe<SocialProfile>>>;
  Saves?: Maybe<FeedItemGroup>;
  UserID?: Maybe<Scalars['String']>;
  ap5FavoriteEvents?: Maybe<Scalars['String']>;
  ap5InspiredBy?: Maybe<Scalars['String']>;
  ap5PassionateAbout?: Maybe<Scalars['String']>;
  ap5ToughestThing?: Maybe<Scalars['String']>;
  ap5TrainingWith?: Maybe<Scalars['String']>;
  backgroundColor?: Maybe<Scalars['String']>;
  biography?: Maybe<Scalars['String']>;
  birthDate?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  coverPhotoID?: Maybe<Scalars['String']>;
  coverPhotoURL?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Long']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  followMentors?: Maybe<Scalars['Boolean']>;
  gender?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  isFollowed?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  partners?: Maybe<Array<Scalars['String']>>;
  personalStatus?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  preRegistered?: Maybe<Scalars['Boolean']>;
  profilePhotoID?: Maybe<Scalars['String']>;
  profilePhotoURL?: Maybe<Scalars['String']>;
  quotes?: Maybe<Scalars['String']>;
  signUpNumber?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Long']>;
};


export type MyMemberProfileActivitiesArgs = {
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
  objectType?: InputMaybe<Scalars['String']>;
};


export type MyMemberProfileFollowersArgs = {
  count?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Scalars['String']>;
};


export type MyMemberProfileFollowsArgs = {
  count?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Scalars['String']>;
};


export type MyMemberProfileGalleryArgs = {
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
};


export type MyMemberProfileSavesArgs = {
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
};


export type MyMemberProfileCoverPhotoUrlArgs = {
  type?: InputMaybe<Scalars['String']>;
};


export type MyMemberProfileProfilePhotoUrlArgs = {
  type?: InputMaybe<Scalars['String']>;
};

export type MyNotifications = {
  __typename?: 'MyNotifications';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<MyNotificationsItem>>;
  next?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type MyNotificationsItem = {
  __typename?: 'MyNotificationsItem';
  Achievement?: Maybe<Achievement>;
  Article?: Maybe<Article>;
  Business?: Maybe<Business>;
  Comment?: Maybe<Comment>;
  Member?: Maybe<Member>;
  Profiles?: Maybe<Array<SocialProfile>>;
  Reaction?: Maybe<Reaction>;
  ReactionID?: Maybe<Scalars['String']>;
  Update?: Maybe<Update>;
  actorCount?: Maybe<Scalars['Int']>;
  date?: Maybe<Scalars['String']>;
  group?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isRead?: Maybe<Scalars['Boolean']>;
  isSeen?: Maybe<Scalars['Boolean']>;
  kind?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  objectID?: Maybe<Scalars['String']>;
  objectType?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Long']>;
};

export type MyProductAggregate = {
  __typename?: 'MyProductAggregate';
  activeProgram?: Maybe<Scalars['Int']>;
  draft?: Maybe<Scalars['Int']>;
  event?: Maybe<Scalars['Int']>;
  experience?: Maybe<Scalars['Int']>;
  expired?: Maybe<Scalars['Int']>;
  published?: Maybe<Scalars['Int']>;
  publishedExpired?: Maybe<Scalars['Int']>;
  unpublished?: Maybe<Scalars['Int']>;
};

export type MyProfile = {
  __typename?: 'MyProfile';
  Business?: Maybe<Business>;
  Member?: Maybe<MyMemberProfile>;
  objectID?: Maybe<Scalars['String']>;
  objectType?: Maybe<Scalars['String']>;
};

export type NftMedal = {
  __typename?: 'NFTMedal';
  Media?: Maybe<Array<Media>>;
  Product?: Maybe<Product>;
  Racer?: Maybe<NftUserMedals>;
  createdAt?: Maybe<Scalars['Float']>;
  highFives?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  isFinished?: Maybe<Scalars['Boolean']>;
  isHighFived?: Maybe<Scalars['Boolean']>;
  medalDescription?: Maybe<Scalars['String']>;
  medalPhotoID?: Maybe<Scalars['String']>;
  productID?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Float']>;
};

export type NftMedals = {
  __typename?: 'NFTMedals';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<NftMedal>>;
  next?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type NftPostEventMedal = {
  __typename?: 'NFTPostEventMedal';
  Media?: Maybe<Array<Media>>;
  Product?: Maybe<Product>;
  Racer?: Maybe<NftUserMedals>;
  Top3Female?: Maybe<Array<Maybe<NftPostEventMedalTop>>>;
  Top3Male?: Maybe<Array<Maybe<NftPostEventMedalTop>>>;
  averageFinishTime?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Float']>;
  distances?: Maybe<Array<Maybe<Scalars['String']>>>;
  highFives?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  isFinished?: Maybe<Scalars['Boolean']>;
  isHighFived?: Maybe<Scalars['Boolean']>;
  medalDescription?: Maybe<Scalars['String']>;
  peopleParticipated?: Maybe<Scalars['Int']>;
  productID?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Float']>;
};


export type NftPostEventMedalMediaArgs = {
  distance: Scalars['Float'];
  distanceType?: InputMaybe<Scalars['String']>;
  distanceUnit: Scalars['String'];
};


export type NftPostEventMedalTop3FemaleArgs = {
  distance: Scalars['Float'];
  distanceType?: InputMaybe<Scalars['String']>;
  distanceUnit: Scalars['String'];
};


export type NftPostEventMedalTop3MaleArgs = {
  distance: Scalars['Float'];
  distanceType?: InputMaybe<Scalars['String']>;
  distanceUnit: Scalars['String'];
};


export type NftPostEventMedalAverageFinishTimeArgs = {
  distance: Scalars['Float'];
  distanceType?: InputMaybe<Scalars['String']>;
  distanceUnit: Scalars['String'];
};


export type NftPostEventMedalPeopleParticipatedArgs = {
  distance: Scalars['Float'];
  distanceType?: InputMaybe<Scalars['String']>;
  distanceUnit: Scalars['String'];
};

export type NftPostEventMedalTop = {
  __typename?: 'NFTPostEventMedalTop';
  actor?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  isClaimed?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  place?: Maybe<Scalars['String']>;
  profilePhotoURL?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['String']>;
};


export type NftPostEventMedalTopProfilePhotoUrlArgs = {
  type?: InputMaybe<Scalars['String']>;
};

export type NftUserMedal = {
  __typename?: 'NFTUserMedal';
  Business?: Maybe<Business>;
  Medal?: Maybe<NftMedal>;
  Media?: Maybe<Array<Media>>;
  Member?: Maybe<Member>;
  Product?: Maybe<Product>;
  actor?: Maybe<Scalars['String']>;
  ageGroupFinish?: Maybe<Scalars['String']>;
  bib?: Maybe<Scalars['String']>;
  blockchainHash?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Float']>;
  distance?: Maybe<Scalars['Float']>;
  distanceType?: Maybe<Scalars['String']>;
  distanceUnit?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  highFives?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  isClaimed?: Maybe<Scalars['Boolean']>;
  isHighFived?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  medalID?: Maybe<Scalars['String']>;
  overallFinish?: Maybe<Scalars['String']>;
  peopleParticipated?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  place?: Maybe<Scalars['String']>;
  productID?: Maybe<Scalars['String']>;
  profilePhotoURL?: Maybe<Scalars['String']>;
  signUpNumber?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Float']>;
  userSlug?: Maybe<Scalars['String']>;
};


export type NftUserMedalProfilePhotoUrlArgs = {
  type?: InputMaybe<Scalars['String']>;
};

export type NftUserMedals = {
  __typename?: 'NFTUserMedals';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<NftUserMedal>>;
  next?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type PagedContents = {
  __typename?: 'PagedContents';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<Content>>;
  next?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type Pin = {
  __typename?: 'Pin';
  Tags?: Maybe<Array<Tag>>;
  createdAt?: Maybe<Scalars['Long']>;
  photoID?: Maybe<Scalars['String']>;
};

export type Product = {
  __typename?: 'Product';
  AdditionalInformation?: Maybe<Array<AdditionalInformation>>;
  Business?: Maybe<Business>;
  Categories?: Maybe<Array<Category>>;
  CategoryIDs?: Maybe<Array<Scalars['String']>>;
  Distance?: Maybe<Array<ProductDistance>>;
  Media?: Maybe<Array<Media>>;
  NFTMedals?: Maybe<Array<Maybe<NftMedals>>>;
  ProductTheme?: Maybe<ProductTheme>;
  Sponsors?: Maybe<Array<ProductSponsor>>;
  UserID?: Maybe<Scalars['String']>;
  actorID?: Maybe<Scalars['String']>;
  actorType?: Maybe<Scalars['String']>;
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  businessPaidPlan?: Maybe<Scalars['Int']>;
  certifiedBusiness?: Maybe<Scalars['Int']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  coverPhotoID?: Maybe<Scalars['String']>;
  coverPhotoURL?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Float']>;
  currency?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['String']>;
  externalURL?: Maybe<Scalars['String']>;
  hibernation?: Maybe<Scalars['Boolean']>;
  hidden?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
  inquiryType?: Maybe<Scalars['String']>;
  isFavorite?: Maybe<Scalars['Boolean']>;
  isNFTMedal?: Maybe<Scalars['Boolean']>;
  isSaved?: Maybe<Scalars['Boolean']>;
  parentID?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  priceAmount?: Maybe<Scalars['Float']>;
  priceAmountMax?: Maybe<Scalars['Float']>;
  pricing?: Maybe<Scalars['String']>;
  recommendsCount?: Maybe<Scalars['Int']>;
  repeats?: Maybe<Scalars['Boolean']>;
  savesCount?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
  sponsorIDs?: Maybe<Array<Scalars['String']>>;
  startDate?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  suburb?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Float']>;
  viewerCurrency?: Maybe<Scalars['String']>;
  viewerPrice?: Maybe<Scalars['Float']>;
  viewerPriceMax?: Maybe<Scalars['Float']>;
  viewsCount?: Maybe<Scalars['Int']>;
  virtual?: Maybe<Scalars['Boolean']>;
};


export type ProductCoverPhotoUrlArgs = {
  type?: InputMaybe<Scalars['String']>;
};


export type ProductViewerCurrencyArgs = {
  preferredCurrency?: InputMaybe<Scalars['String']>;
};


export type ProductViewerPriceArgs = {
  preferredCurrency?: InputMaybe<Scalars['String']>;
};


export type ProductViewerPriceMaxArgs = {
  preferredCurrency?: InputMaybe<Scalars['String']>;
};

export type ProductDistance = {
  __typename?: 'ProductDistance';
  distance?: Maybe<Scalars['Float']>;
  distanceType?: Maybe<Scalars['String']>;
  distanceUnit?: Maybe<Scalars['String']>;
  hasMedal?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
};

export type ProductPriceRange = {
  __typename?: 'ProductPriceRange';
  priceMax?: Maybe<Scalars['Float']>;
  priceMin?: Maybe<Scalars['Float']>;
};

export type ProductProfileReaction = {
  __typename?: 'ProductProfileReaction';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<Product>>;
  next?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type ProductReaction = {
  __typename?: 'ProductReaction';
  Saved?: Maybe<ProductProfileReaction>;
};


export type ProductReactionSavedArgs = {
  count?: InputMaybe<Scalars['Int']>;
};

export type ProductSponsor = {
  __typename?: 'ProductSponsor';
  PhotoURL?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Long']>;
  externalURL?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  photoExtension?: Maybe<Scalars['String']>;
  photoID?: Maybe<Scalars['String']>;
};

export type ProductTheme = {
  __typename?: 'ProductTheme';
  backgroundColor?: Maybe<Scalars['String']>;
  buttonColor?: Maybe<Scalars['String']>;
  circleColor?: Maybe<Scalars['String']>;
  fontColor?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
};

export type ProductsPage = {
  __typename?: 'ProductsPage';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<Product>>;
  next?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type ProfileAggregates = {
  __typename?: 'ProfileAggregates';
  achievements?: Maybe<Scalars['Int']>;
  acticlesViewsAcquired?: Maybe<Scalars['Int']>;
  articles?: Maybe<Scalars['Int']>;
  articlesCommentReceived?: Maybe<Scalars['Int']>;
  articlesCommentsReceived?: Maybe<Scalars['Int']>;
  articlesDrafted?: Maybe<Scalars['Int']>;
  articlesHighFivesReceived?: Maybe<Scalars['Int']>;
  /** @deprecated Use articlesHighFives instead. */
  articlesLikesReceived?: Maybe<Scalars['Int']>;
  articlesPublished?: Maybe<Scalars['Int']>;
  articlesSavesAcquired?: Maybe<Scalars['Int']>;
  articlesShared?: Maybe<Scalars['Int']>;
  articlesViewsAcquired?: Maybe<Scalars['Int']>;
  blocks?: Maybe<Scalars['Int']>;
  blocksAcquired?: Maybe<Scalars['Int']>;
  comments?: Maybe<Scalars['Int']>;
  commentsReceived?: Maybe<Scalars['Int']>;
  followers?: Maybe<Scalars['Int']>;
  follows?: Maybe<Scalars['Int']>;
  hides?: Maybe<Scalars['Int']>;
  hidesAcquired?: Maybe<Scalars['Int']>;
  highFives?: Maybe<Scalars['Int']>;
  highFivesReceived?: Maybe<Scalars['Int']>;
  /** @deprecated Use highFives instead. */
  likes?: Maybe<Scalars['Int']>;
  /** @deprecated Use highFivesReceived instead. */
  likesReceived?: Maybe<Scalars['Int']>;
  productSaves?: Maybe<Scalars['Int']>;
  productSavesAcquired?: Maybe<Scalars['Int']>;
  productViews?: Maybe<Scalars['Int']>;
  productViewsAcquired?: Maybe<Scalars['Int']>;
  products?: Maybe<Scalars['Int']>;
  rating?: Maybe<Scalars['Float']>;
  reviews?: Maybe<Scalars['Int']>;
  saves?: Maybe<Scalars['Int']>;
  savesAcquired?: Maybe<Scalars['Int']>;
  totalRates?: Maybe<Scalars['Int']>;
  updates?: Maybe<Scalars['Int']>;
  videoFeeds?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  /** @deprecated Use findAchievementByID. */
  Achievement?: Maybe<Achievement>;
  /** @deprecated Use either findArticleByID or findArticleBySlug. */
  Article?: Maybe<Article>;
  /** @deprecated Use getDiscoveryArticles instead. */
  Articles: Articles;
  /** @deprecated Use either findBusinessByID or findBusinessBySlug */
  Business?: Maybe<Business>;
  /** @deprecated Use getFeed with type: 'Business'. */
  BusinessFeed: FeedItemGroup;
  /** @deprecated Use getActiveCategories instead. */
  Categories: Array<Category>;
  /** @deprecated Use getActiveCategories with 'hasProductsOnly: true' instead. */
  CategoriesWithProducts: Array<Category>;
  /** @deprecated Use findCategory. */
  Category?: Maybe<Category>;
  /** @deprecated Use getFeed with type: 'Category'. */
  CategoryFeed: FeedItemGroup;
  /** @deprecated Use getter for objects directly. */
  FeedItem?: Maybe<FeedItem>;
  /** @deprecated Use getFileURL. */
  FileURL?: Maybe<Scalars['String']>;
  /** @deprecated Use getters with getMy- prefixes instead. */
  Me: Me;
  /** @deprecated Use either findMemberByID, findMemberBySlug, or findMemberByUserID instead. */
  Member?: Maybe<Member>;
  /** @deprecated Use getFeed with type: 'Member'. */
  MemberFeed: FeedItemGroup;
  MentorAndBusinessSuggestions: Array<SocialMentionSuggestion>;
  /** @deprecated Use getMyProductsAggregates instead. */
  MyProductsAggregates: MyProductAggregate;
  /** @deprecated Use getPhotoURL. */
  PhotoURL: Scalars['String'];
  /** @deprecated Use either findProductByID or findProductrBySlug instead. */
  Product?: Maybe<Product>;
  /** @deprecated Use getMarketplaceProductPriceRange instead. */
  ProductPriceRange: ProductPriceRange;
  /** @deprecated Use getContentsReactedTo with reactionType 'save' and contentType 'Product' instead. */
  ProductReactions: ProductReaction;
  ProductSuggestions: Array<SocialSearchSuggestion>;
  /** @deprecated Use getMarketplaceProducts instead. */
  Products: ProductsPage;
  /** @deprecated Use getPopularBusinesses instead. */
  RecommendedBusinesses: Array<Business>;
  /** @deprecated Use getPopularMembers instead. */
  RecommendedMembers: Array<Member>;
  /** @deprecated Use getSimilarProducts instead. */
  RecommendedProducts: Array<Product>;
  SocialMentionSuggestions: Array<SocialMentionSuggestion>;
  /** @deprecated Use getSocialSearchResult instead. */
  SocialSearchResult: SocialSearchResult;
  /** @deprecated Use getSocialSearchSuggestions instead. */
  SocialSearchSuggestions: Array<SocialSearchSuggestion>;
  /** @deprecated Use either findUpdateByID or findUpdateBySlug. */
  Update?: Maybe<Update>;
  /** @deprecated Use either findVideoFeedByID or findVideoFeedBySlug. */
  VideoFeed?: Maybe<VideoFeed>;
  VideoURL: Scalars['String'];
  findAchievementByID?: Maybe<Achievement>;
  findArticleByID?: Maybe<Article>;
  findArticleBySlug?: Maybe<Article>;
  findBusinessByID?: Maybe<Business>;
  findBusinessBySlug?: Maybe<Business>;
  findCategory?: Maybe<Category>;
  findMemberByID?: Maybe<Member>;
  findMemberBySlug?: Maybe<Member>;
  findMemberByUserID?: Maybe<Member>;
  findMembersFromIdentifiers?: Maybe<Array<IdentifiedUserMembers>>;
  findProductByID?: Maybe<Product>;
  findProductBySlug?: Maybe<Product>;
  findUpdateByID?: Maybe<Update>;
  findUpdateBySlug?: Maybe<Update>;
  findVideoFeedByID?: Maybe<VideoFeed>;
  findVideoFeedBySlug?: Maybe<VideoFeed>;
  getActiveCategories: Array<Category>;
  getAllUpcomingMedals?: Maybe<NftMedals>;
  getBusinessSubscriptionPlans: Array<BusinessSubscriptionPlan>;
  getContentsReactedTo?: Maybe<PagedContents>;
  getDiscoveryArticles: Articles;
  getFeed: FeedItemGroup;
  /** @deprecated Use getter for objects directly. */
  getFeedItem?: Maybe<FeedItem>;
  getFileURL?: Maybe<Scalars['String']>;
  getHomepagePopularAndUpcomingProduct: Product;
  getHomepageProductCountries?: Maybe<Array<Scalars['String']>>;
  getMarketplaceProductCountries?: Maybe<Array<Scalars['String']>>;
  getMarketplaceProductPriceRange: ProductPriceRange;
  getMarketplaceProducts: ProductsPage;
  getMyActiveBusinessProfile?: Maybe<Business>;
  getMyArticles: MyArticles;
  getMyBusinessRoles: Array<MyBusinessRole>;
  getMyBusinessSubscription?: Maybe<MyBusinessSubscription>;
  getMyFeed: FeedItemGroup;
  getMyMemberProfile?: Maybe<MyMemberProfile>;
  getMyNotifications: MyNotifications;
  getMyProductsAggregates: MyProductAggregate;
  getMyProfile?: Maybe<MyProfile>;
  getNFTMedal?: Maybe<NftMedal>;
  getNFTPostEventMedal?: Maybe<NftPostEventMedal>;
  getNFTUserMedal?: Maybe<NftUserMedal>;
  getOriginalURLFromCode?: Maybe<Scalars['String']>;
  getPhotoURL: Scalars['String'];
  getPin?: Maybe<Pin>;
  getPopularBusinesses: Array<Business>;
  getPopularMembers: Array<Member>;
  getRecommendedBusinesses?: Maybe<Array<Business>>;
  getRecommendedMembers?: Maybe<Array<Member>>;
  getRecommendedProfiles?: Maybe<Array<SocialProfile>>;
  getSimilarProducts: Array<Product>;
  /** @deprecated Use getSocialMentionSuggestions instead. */
  getSocialMentionSuggestions: Array<SocialMentionSuggestion>;
  getSocialSearchResult: SocialSearchResult;
  getSocialSearchSuggestions: Array<SocialSearchSuggestion>;
  getStripeSession?: Maybe<StripeSession>;
  getTeamMembers: BusinessTeamMembers;
  getVideoDimension?: Maybe<MediaDimension>;
  getVideoURL: Scalars['String'];
  isExistingMemberEmail?: Maybe<Scalars['Boolean']>;
  isUniqueBusinessEmail?: Maybe<Scalars['Boolean']>;
};


export type QueryAchievementArgs = {
  id: Scalars['String'];
};


export type QueryArticleArgs = {
  id?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryArticlesArgs = {
  categories?: InputMaybe<Scalars['String']>;
  categoryParent?: InputMaybe<Scalars['String']>;
  count?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<Scalars['String']>;
};


export type QueryBusinessArgs = {
  id?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryBusinessFeedArgs = {
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  objectType?: InputMaybe<Scalars['String']>;
};


export type QueryCategoryArgs = {
  id: Scalars['String'];
};


export type QueryCategoryFeedArgs = {
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  objectType?: InputMaybe<Scalars['String']>;
};


export type QueryFeedItemArgs = {
  AchievementID?: InputMaybe<Scalars['String']>;
  ArticleID?: InputMaybe<Scalars['String']>;
  ArticleSlug?: InputMaybe<Scalars['String']>;
  GetStreamActivityID?: InputMaybe<Scalars['String']>;
  UpdateID?: InputMaybe<Scalars['String']>;
  UpdateSlug?: InputMaybe<Scalars['String']>;
  VideoFeedID?: InputMaybe<Scalars['String']>;
  VideoFeedSlug?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};


export type QueryFileUrlArgs = {
  id: Scalars['String'];
  type?: InputMaybe<Scalars['String']>;
};


export type QueryMemberArgs = {
  UserID?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryMemberFeedArgs = {
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  objectType?: InputMaybe<Scalars['String']>;
};


export type QueryMentorAndBusinessSuggestionsArgs = {
  count?: InputMaybe<Scalars['Int']>;
  text: Scalars['String'];
};


export type QueryMyProductsAggregatesArgs = {
  actorID?: InputMaybe<Scalars['String']>;
  actorType?: InputMaybe<Scalars['String']>;
};


export type QueryPhotoUrlArgs = {
  id: Scalars['String'];
  type?: InputMaybe<Scalars['String']>;
};


export type QueryProductArgs = {
  id?: InputMaybe<Scalars['String']>;
  preferredCurrency?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryProductPriceRangeArgs = {
  preferredCurrency?: InputMaybe<Scalars['String']>;
};


export type QueryProductReactionsArgs = {
  actorID: Scalars['String'];
  actorType: Scalars['String'];
  count?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  verb?: InputMaybe<Scalars['String']>;
};


export type QueryProductSuggestionsArgs = {
  count?: InputMaybe<Scalars['Int']>;
  text?: InputMaybe<Scalars['String']>;
};


export type QueryProductsArgs = {
  businessID?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  count?: InputMaybe<Scalars['Int']>;
  dateFrom?: InputMaybe<Scalars['String']>;
  dateTo?: InputMaybe<Scalars['String']>;
  filterType?: InputMaybe<Scalars['String']>;
  hidden?: InputMaybe<Scalars['Boolean']>;
  locationCountry?: InputMaybe<Scalars['String']>;
  locationState?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  preferredCurrency?: InputMaybe<Scalars['String']>;
  priceFrom?: InputMaybe<Scalars['Int']>;
  priceTo?: InputMaybe<Scalars['Int']>;
  priceType?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  virtual?: InputMaybe<Scalars['Boolean']>;
};


export type QueryRecommendedBusinessesArgs = {
  count?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type QueryRecommendedMembersArgs = {
  count?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type QueryRecommendedProductsArgs = {
  count?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['String']>;
};


export type QuerySocialMentionSuggestionsArgs = {
  count?: InputMaybe<Scalars['Int']>;
  text: Scalars['String'];
};


export type QuerySocialSearchResultArgs = {
  count?: InputMaybe<Scalars['Int']>;
  objectTypes?: InputMaybe<Array<Scalars['String']>>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  text: Scalars['String'];
};


export type QuerySocialSearchSuggestionsArgs = {
  count?: InputMaybe<Scalars['Int']>;
  text: Scalars['String'];
};


export type QueryUpdateArgs = {
  id?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryVideoFeedArgs = {
  id?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryVideoUrlArgs = {
  id: Scalars['String'];
  type?: InputMaybe<Scalars['String']>;
};


export type QueryFindAchievementByIdArgs = {
  id: Scalars['String'];
};


export type QueryFindArticleByIdArgs = {
  id: Scalars['String'];
};


export type QueryFindArticleBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryFindBusinessByIdArgs = {
  id: Scalars['String'];
};


export type QueryFindBusinessBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryFindCategoryArgs = {
  id: Scalars['String'];
};


export type QueryFindMemberByIdArgs = {
  id: Scalars['String'];
};


export type QueryFindMemberBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryFindMemberByUserIdArgs = {
  id: Scalars['String'];
};


export type QueryFindMembersFromIdentifiersArgs = {
  list: Array<InputUserIdentifier>;
};


export type QueryFindProductByIdArgs = {
  id: Scalars['String'];
};


export type QueryFindProductBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryFindUpdateByIdArgs = {
  id: Scalars['String'];
};


export type QueryFindUpdateBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryFindVideoFeedByIdArgs = {
  id: Scalars['String'];
};


export type QueryFindVideoFeedBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryGetActiveCategoriesArgs = {
  hasProductsOnly?: InputMaybe<Scalars['Boolean']>;
};


export type QueryGetAllUpcomingMedalsArgs = {
  businessID?: InputMaybe<Scalars['String']>;
  businessSlug?: InputMaybe<Scalars['String']>;
};


export type QueryGetContentsReactedToArgs = {
  actorID: Scalars['String'];
  actorType: Scalars['String'];
  contentType?: InputMaybe<Scalars['String']>;
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
  reactionType: Scalars['String'];
};


export type QueryGetDiscoveryArticlesArgs = {
  categories?: InputMaybe<Scalars['String']>;
  categoryParent?: InputMaybe<Scalars['String']>;
  count?: InputMaybe<Scalars['Int']>;
  noCache?: InputMaybe<Scalars['Boolean']>;
  offset?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<Scalars['String']>;
};


export type QueryGetFeedArgs = {
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  objectType?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
};


export type QueryGetFeedItemArgs = {
  AchievementID?: InputMaybe<Scalars['String']>;
  ArticleID?: InputMaybe<Scalars['String']>;
  ArticleSlug?: InputMaybe<Scalars['String']>;
  GetStreamActivityID?: InputMaybe<Scalars['String']>;
  UpdateID?: InputMaybe<Scalars['String']>;
  UpdateSlug?: InputMaybe<Scalars['String']>;
  VideoFeedID?: InputMaybe<Scalars['String']>;
  VideoFeedSlug?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};


export type QueryGetFileUrlArgs = {
  id: Scalars['String'];
  type?: InputMaybe<Scalars['String']>;
};


export type QueryGetHomepageProductCountriesArgs = {
  text?: InputMaybe<Scalars['String']>;
};


export type QueryGetMarketplaceProductPriceRangeArgs = {
  preferredCurrency?: InputMaybe<Scalars['String']>;
};


export type QueryGetMarketplaceProductsArgs = {
  businessID?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  count?: InputMaybe<Scalars['Int']>;
  dateFrom?: InputMaybe<Scalars['String']>;
  dateTo?: InputMaybe<Scalars['String']>;
  filterType?: InputMaybe<Scalars['String']>;
  hidden?: InputMaybe<Scalars['Boolean']>;
  locationCountry?: InputMaybe<Scalars['String']>;
  locationState?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  preferredCurrency?: InputMaybe<Scalars['String']>;
  priceFrom?: InputMaybe<Scalars['Int']>;
  priceTo?: InputMaybe<Scalars['Int']>;
  priceType?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  virtual?: InputMaybe<Scalars['Boolean']>;
};


export type QueryGetMyFeedArgs = {
  CategoryID?: InputMaybe<Scalars['String']>;
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
};


export type QueryGetMyNotificationsArgs = {
  count?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
};


export type QueryGetMyProductsAggregatesArgs = {
  actorID?: InputMaybe<Scalars['String']>;
  actorType?: InputMaybe<Scalars['String']>;
};


export type QueryGetNftMedalArgs = {
  id?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryGetNftPostEventMedalArgs = {
  id?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryGetNftUserMedalArgs = {
  id?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryGetOriginalUrlFromCodeArgs = {
  code: Scalars['String'];
};


export type QueryGetPhotoUrlArgs = {
  id: Scalars['String'];
  type?: InputMaybe<Scalars['String']>;
};


export type QueryGetPinArgs = {
  photoID: Scalars['String'];
};


export type QueryGetPopularBusinessesArgs = {
  count?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type QueryGetPopularMembersArgs = {
  count?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type QueryGetRecommendedBusinessesArgs = {
  count?: InputMaybe<Scalars['Int']>;
};


export type QueryGetRecommendedMembersArgs = {
  count?: InputMaybe<Scalars['Int']>;
};


export type QueryGetRecommendedProfilesArgs = {
  count?: InputMaybe<Scalars['Int']>;
};


export type QueryGetSimilarProductsArgs = {
  count?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['String']>;
};


export type QueryGetSocialMentionSuggestionsArgs = {
  count?: InputMaybe<Scalars['Int']>;
  text: Scalars['String'];
};


export type QueryGetSocialSearchResultArgs = {
  count?: InputMaybe<Scalars['Int']>;
  objectTypes?: InputMaybe<Array<Scalars['String']>>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  text: Scalars['String'];
};


export type QueryGetSocialSearchSuggestionsArgs = {
  count?: InputMaybe<Scalars['Int']>;
  text: Scalars['String'];
};


export type QueryGetStripeSessionArgs = {
  session_id: Scalars['String'];
};


export type QueryGetTeamMembersArgs = {
  businessID?: InputMaybe<Scalars['String']>;
  count?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
};


export type QueryGetVideoDimensionArgs = {
  url: Scalars['String'];
};


export type QueryGetVideoUrlArgs = {
  id: Scalars['String'];
  type?: InputMaybe<Scalars['String']>;
};


export type QueryIsExistingMemberEmailArgs = {
  email: Scalars['String'];
};


export type QueryIsUniqueBusinessEmailArgs = {
  email: Scalars['String'];
};

export type Reaction = {
  __typename?: 'Reaction';
  Achievement?: Maybe<Achievement>;
  Article?: Maybe<Article>;
  Business?: Maybe<Business>;
  Comment?: Maybe<Comment>;
  Member?: Maybe<Member>;
  Update?: Maybe<Update>;
  actor?: Maybe<Scalars['String']>;
  actorID?: Maybe<Scalars['String']>;
  actorType?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['JSON']>;
  id?: Maybe<Scalars['ID']>;
  object?: Maybe<Scalars['String']>;
  objectActor?: Maybe<Scalars['String']>;
  objectID?: Maybe<Scalars['String']>;
  objectType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Date']>;
};

export type RecommendedBusiness = {
  __typename?: 'RecommendedBusiness';
  Business?: Maybe<Business>;
  objectID?: Maybe<Scalars['String']>;
  objectType?: Maybe<Scalars['String']>;
};

export type RecommendedFollow = {
  __typename?: 'RecommendedFollow';
  Business?: Maybe<Business>;
  Member?: Maybe<Member>;
  objectID?: Maybe<Scalars['String']>;
  objectType?: Maybe<Scalars['String']>;
};

export type RecommendedMember = {
  __typename?: 'RecommendedMember';
  Member?: Maybe<Member>;
  objectID?: Maybe<Scalars['String']>;
  objectType?: Maybe<Scalars['String']>;
};

export type Review = {
  __typename?: 'Review';
  Member?: Maybe<Member>;
  TargetBusiness?: Maybe<Business>;
  actorID?: Maybe<Scalars['String']>;
  actorType?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Long']>;
  id?: Maybe<Scalars['ID']>;
  rating?: Maybe<Scalars['Int']>;
  targetID?: Maybe<Scalars['String']>;
  targetType?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Long']>;
};

export type Reviews = {
  __typename?: 'Reviews';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<Review>>;
  next?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type Saves = {
  __typename?: 'Saves';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<SocialActivity>>;
  next?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type SocialActivity = {
  __typename?: 'SocialActivity';
  Achievement?: Maybe<Achievement>;
  Article?: Maybe<Article>;
  Update?: Maybe<Update>;
  VideoFeed?: Maybe<VideoFeed>;
  objectID?: Maybe<Scalars['String']>;
  objectType?: Maybe<Scalars['String']>;
};

export type SocialMentionSuggestion = {
  __typename?: 'SocialMentionSuggestion';
  Article?: Maybe<Article>;
  Business?: Maybe<Business>;
  Member?: Maybe<Member>;
  objectID?: Maybe<Scalars['String']>;
  objectType?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Float']>;
};

export type SocialProfile = {
  __typename?: 'SocialProfile';
  Business?: Maybe<Business>;
  Member?: Maybe<Member>;
  objectID?: Maybe<Scalars['String']>;
  objectType?: Maybe<Scalars['String']>;
};

export type SocialSearchResult = {
  __typename?: 'SocialSearchResult';
  items?: Maybe<Array<SocialSearchResultItem>>;
  objectTypes?: Maybe<Array<Scalars['String']>>;
  text?: Maybe<Scalars['String']>;
};

export type SocialSearchResultItem = {
  __typename?: 'SocialSearchResultItem';
  Article?: Maybe<Article>;
  Business?: Maybe<Business>;
  Member?: Maybe<Member>;
  Product?: Maybe<Product>;
  objectID?: Maybe<Scalars['String']>;
  objectType?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type SocialSearchSuggestion = {
  __typename?: 'SocialSearchSuggestion';
  Article?: Maybe<Article>;
  Business?: Maybe<Business>;
  Member?: Maybe<Member>;
  Product?: Maybe<Product>;
  objectID?: Maybe<Scalars['String']>;
  objectType?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Float']>;
};

export type StripeSession = {
  __typename?: 'StripeSession';
  amount_total?: Maybe<Scalars['Float']>;
  amount_total_converted?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
};

export type Tag = {
  __typename?: 'Tag';
  Business?: Maybe<Business>;
  Member?: Maybe<Member>;
  Product?: Maybe<Product>;
  createdAt?: Maybe<Scalars['Long']>;
  objectID?: Maybe<Scalars['String']>;
  objectType?: Maybe<Scalars['String']>;
  xCoordinate?: Maybe<Scalars['String']>;
  yCoordinate?: Maybe<Scalars['String']>;
};

export type Update = {
  __typename?: 'Update';
  Aggregates?: Maybe<FeedItemAggregates>;
  Business?: Maybe<Business>;
  BusinessID?: Maybe<Scalars['String']>;
  Categories?: Maybe<Array<Category>>;
  CategoryIDs?: Maybe<Array<Scalars['String']>>;
  Media?: Maybe<Array<Media>>;
  Member?: Maybe<Member>;
  MemberID?: Maybe<Scalars['String']>;
  ProductTheme?: Maybe<ProductTheme>;
  UserID?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Long']>;
  id?: Maybe<Scalars['ID']>;
  isNFTMedal?: Maybe<Scalars['Boolean']>;
  productID?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['Long']>;
  slug?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Long']>;
};

export type Updates = {
  __typename?: 'Updates';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<Update>>;
  next?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  MentorID?: Maybe<Scalars['String']>;
  UserProfileID?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Long']>;
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Long']>;
};

export type VideoFeed = {
  __typename?: 'VideoFeed';
  Business?: Maybe<Business>;
  BusinessID?: Maybe<Scalars['String']>;
  Categories?: Maybe<Array<Category>>;
  CategoryIDs?: Maybe<Array<Scalars['String']>>;
  Media?: Maybe<Array<Media>>;
  Member?: Maybe<Member>;
  MemberID?: Maybe<Scalars['String']>;
  UserID?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Long']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  publishedAt?: Maybe<Scalars['Long']>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Long']>;
};

export type VideoFeeds = {
  __typename?: 'VideoFeeds';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<VideoFeed>>;
  next?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type ArticleContentsFragment = { __typename?: 'Article', id?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, publishedAt?: any | null | undefined, title?: string | null | undefined, subtitle?: string | null | undefined, coverCaption?: string | null | undefined, coverPhotoID?: string | null | undefined, excerpt?: string | null | undefined, slug?: string | null | undefined, CategoryIDs?: Array<string> | null | undefined, actor?: string | null | undefined, MemberID?: string | null | undefined, BusinessID?: string | null | undefined, UserID?: string | null | undefined, content?: string | null | undefined, coverPhotoURL?: string | null | undefined, Aggregates?: { __typename?: 'FeedItemAggregates', comments?: number | null | undefined, highFives?: number | null | undefined, views?: number | null | undefined, saves?: number | null | undefined, likes?: number | null | undefined } | null | undefined, Categories?: Array<{ __typename?: 'Category', id?: string | null | undefined, name?: string | null | undefined, iconName?: string | null | undefined, parent?: string | null | undefined, PhotoURL?: string | null | undefined } | null | undefined> | null | undefined, Member?: { __typename?: 'Member', id?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, slug?: string | null | undefined, email?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, signUpNumber?: number | null | undefined, profilePhotoID?: string | null | undefined, coverPhotoID?: string | null | undefined, backgroundColor?: string | null | undefined, gender?: string | null | undefined, country?: string | null | undefined, postalCode?: string | null | undefined, suburb?: string | null | undefined, city?: string | null | undefined, state?: string | null | undefined, CategoryIDs?: Array<string> | null | undefined, personalStatus?: string | null | undefined, biography?: string | null | undefined, quotes?: string | null | undefined, ap5FavoriteEvents?: string | null | undefined, ap5InspiredBy?: string | null | undefined, ap5PassionateAbout?: string | null | undefined, ap5ToughestThing?: string | null | undefined, ap5TrainingWith?: string | null | undefined, claimed?: boolean | null | undefined, partners?: Array<string> | null | undefined, name?: string | null | undefined, profilePhotoURL?: string | null | undefined, coverPhotoURL?: string | null | undefined, isFollowed?: boolean | null | undefined, Activities: { __typename?: 'FeedItemGroup', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'FeedItem', id?: string | null | undefined, timestamp?: any | null | undefined, actorType?: string | null | undefined, actorID?: string | null | undefined, objectType?: string | null | undefined, objectID?: string | null | undefined, CategoryIDs?: Array<string> | null | undefined, isLiked?: boolean | null | undefined, isSaved?: boolean | null | undefined, Categories?: Array<{ __typename?: 'Category', id?: string | null | undefined, name?: string | null | undefined }> | null | undefined, Member?: { __typename?: 'Member', id?: string | null | undefined, name?: string | null | undefined, slug?: string | null | undefined, profilePhotoURL?: string | null | undefined, isFollowed?: boolean | null | undefined, Categories: Array<{ __typename?: 'Category', name?: string | null | undefined }> } | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, name?: string | null | undefined, slug?: string | null | undefined, profilePhotoURL?: string | null | undefined, isFollowed?: boolean | null | undefined, plan?: string | null | undefined, Categories?: Array<{ __typename?: 'Category', name?: string | null | undefined }> | null | undefined } | null | undefined, Update?: { __typename?: 'Update', id?: string | null | undefined, slug?: string | null | undefined, content?: string | null | undefined, isNFTMedal?: boolean | null | undefined, productID?: string | null | undefined, Media?: Array<{ __typename?: 'Media', objectID?: string | null | undefined, objectType?: string | null | undefined, fileName?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, orientation?: string | null | undefined, Pin?: { __typename?: 'Pin', photoID?: string | null | undefined, Tags?: Array<{ __typename?: 'Tag', xCoordinate?: string | null | undefined, yCoordinate?: string | null | undefined, Product?: { __typename?: 'Product', title?: string | null | undefined, slug?: string | null | undefined, coverPhotoURL?: string | null | undefined, type?: string | null | undefined, startDate?: string | null | undefined, Categories?: Array<{ __typename?: 'Category', PhotoURL?: string | null | undefined }> | null | undefined } | null | undefined }> | null | undefined } | null | undefined }> | null | undefined, ProductTheme?: { __typename?: 'ProductTheme', id?: string | null | undefined, backgroundColor?: string | null | undefined, fontColor?: string | null | undefined, buttonColor?: string | null | undefined, circleColor?: string | null | undefined } | null | undefined } | null | undefined, Article?: { __typename?: 'Article', id?: string | null | undefined, slug?: string | null | undefined, title?: string | null | undefined, excerpt?: string | null | undefined, coverPhotoURL?: string | null | undefined, content?: string | null | undefined } | null | undefined, Aggregates: { __typename?: 'FeedItemAggregates', likes?: number | null | undefined, comments?: number | null | undefined }, Comments: { __typename?: 'FeedItemComments', next?: string | null | undefined, items?: Array<{ __typename?: 'Comment', id?: string | null | undefined, timestamp?: any | null | undefined, actorType?: string | null | undefined, content?: string | null | undefined, isLiked: boolean, Member?: { __typename?: 'Member', name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Aggregates?: { __typename?: 'CommentAggregates', likes?: number | null | undefined } | null | undefined }> | null | undefined } }> | null | undefined }, Categories: Array<{ __typename?: 'Category', id?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, name?: string | null | undefined, iconName?: string | null | undefined, summary?: string | null | undefined, PhotoID?: string | null | undefined, parent?: string | null | undefined, archived?: boolean | null | undefined, productCategory?: boolean | null | undefined, communityInterest?: boolean | null | undefined, PhotoURL?: string | null | undefined }>, Follows?: Array<{ __typename?: 'SocialProfile', objectID?: string | null | undefined, objectType?: string | null | undefined, Member?: { __typename?: 'Member', id?: string | null | undefined, slug?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, slug?: string | null | undefined, name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined, Followers?: Array<{ __typename?: 'SocialProfile', objectID?: string | null | undefined, objectType?: string | null | undefined, Member?: { __typename?: 'Member', id?: string | null | undefined, slug?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, slug?: string | null | undefined, name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined, Saves?: { __typename?: 'FeedItemGroup', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'FeedItem', id?: string | null | undefined, timestamp?: any | null | undefined, actorType?: string | null | undefined, actorID?: string | null | undefined, objectType?: string | null | undefined, objectID?: string | null | undefined, CategoryIDs?: Array<string> | null | undefined, isLiked?: boolean | null | undefined, isSaved?: boolean | null | undefined, Categories?: Array<{ __typename?: 'Category', id?: string | null | undefined, name?: string | null | undefined }> | null | undefined, Member?: { __typename?: 'Member', id?: string | null | undefined, name?: string | null | undefined, slug?: string | null | undefined, profilePhotoURL?: string | null | undefined, isFollowed?: boolean | null | undefined, Categories: Array<{ __typename?: 'Category', name?: string | null | undefined }> } | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, name?: string | null | undefined, slug?: string | null | undefined, profilePhotoURL?: string | null | undefined, isFollowed?: boolean | null | undefined, plan?: string | null | undefined, Categories?: Array<{ __typename?: 'Category', name?: string | null | undefined }> | null | undefined } | null | undefined, Update?: { __typename?: 'Update', id?: string | null | undefined, slug?: string | null | undefined, content?: string | null | undefined, isNFTMedal?: boolean | null | undefined, productID?: string | null | undefined, Media?: Array<{ __typename?: 'Media', objectID?: string | null | undefined, objectType?: string | null | undefined, fileName?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, orientation?: string | null | undefined, Pin?: { __typename?: 'Pin', photoID?: string | null | undefined, Tags?: Array<{ __typename?: 'Tag', xCoordinate?: string | null | undefined, yCoordinate?: string | null | undefined, Product?: { __typename?: 'Product', title?: string | null | undefined, slug?: string | null | undefined, coverPhotoURL?: string | null | undefined, type?: string | null | undefined, startDate?: string | null | undefined, Categories?: Array<{ __typename?: 'Category', PhotoURL?: string | null | undefined }> | null | undefined } | null | undefined }> | null | undefined } | null | undefined }> | null | undefined, ProductTheme?: { __typename?: 'ProductTheme', id?: string | null | undefined, backgroundColor?: string | null | undefined, fontColor?: string | null | undefined, buttonColor?: string | null | undefined, circleColor?: string | null | undefined } | null | undefined } | null | undefined, Article?: { __typename?: 'Article', id?: string | null | undefined, slug?: string | null | undefined, title?: string | null | undefined, excerpt?: string | null | undefined, coverPhotoURL?: string | null | undefined, content?: string | null | undefined } | null | undefined, Aggregates: { __typename?: 'FeedItemAggregates', likes?: number | null | undefined, comments?: number | null | undefined }, Comments: { __typename?: 'FeedItemComments', next?: string | null | undefined, items?: Array<{ __typename?: 'Comment', id?: string | null | undefined, timestamp?: any | null | undefined, actorType?: string | null | undefined, content?: string | null | undefined, isLiked: boolean, Member?: { __typename?: 'Member', name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Aggregates?: { __typename?: 'CommentAggregates', likes?: number | null | undefined } | null | undefined }> | null | undefined } }> | null | undefined } | null | undefined, Gallery?: { __typename?: 'Gallery', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'GalleryItem', objectID?: string | null | undefined, objectType?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined }> | null | undefined } | null | undefined, Partners?: Array<{ __typename?: 'SocialProfile', objectID?: string | null | undefined, objectType?: string | null | undefined, Member?: { __typename?: 'Member', id?: string | null | undefined, slug?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, slug?: string | null | undefined, name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined, Medals: { __typename?: 'NFTUserMedals', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'NFTUserMedal', id?: string | null | undefined, slug?: string | null | undefined, blockchainHash?: string | null | undefined, place?: string | null | undefined, time?: string | null | undefined, distance?: number | null | undefined, distanceUnit?: string | null | undefined, distanceType?: string | null | undefined, overallFinish?: string | null | undefined, ageGroupFinish?: string | null | undefined, userSlug?: string | null | undefined, Medal?: { __typename?: 'NFTMedal', Media?: Array<{ __typename?: 'Media', PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, VideoThumbnail?: string | null | undefined, objectType?: string | null | undefined, orientation?: string | null | undefined }> | null | undefined } | null | undefined, Product?: { __typename?: 'Product', title?: string | null | undefined, slug?: string | null | undefined } | null | undefined }> | null | undefined } } | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined } | null | undefined, FeedItem?: { __typename?: 'FeedItem', id?: string | null | undefined } | null | undefined };

export type BusinessContentsFragment = { __typename?: 'Business', id?: string | null | undefined, createdAt?: any | null | undefined, slug?: string | null | undefined, name?: string | null | undefined, profilePhotoURL?: string | null | undefined, website?: string | null | undefined };

export type CategoriesContentsFragment = { __typename?: 'Category', id?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, name?: string | null | undefined, iconName?: string | null | undefined, summary?: string | null | undefined, PhotoID?: string | null | undefined, parent?: string | null | undefined, archived?: boolean | null | undefined, productCategory?: boolean | null | undefined, communityInterest?: boolean | null | undefined, PhotoURL?: string | null | undefined };

export type GalleryContentsFragment = { __typename?: 'Gallery', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'GalleryItem', objectID?: string | null | undefined, objectType?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined }> | null | undefined };

export type MediaContentsFragment = { __typename?: 'Media', objectID?: string | null | undefined, objectType?: string | null | undefined, url?: string | null | undefined, isNFTMedal?: boolean | null | undefined, fileName?: string | null | undefined, FileURL?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, VideoThumbnail?: string | null | undefined, MedalURL?: string | null | undefined, orientation?: string | null | undefined, Pin?: { __typename?: 'Pin', createdAt?: any | null | undefined, photoID?: string | null | undefined, Tags?: Array<{ __typename?: 'Tag', objectID?: string | null | undefined, objectType?: string | null | undefined, xCoordinate?: string | null | undefined, yCoordinate?: string | null | undefined, Member?: { __typename?: 'Member', slug?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', slug?: string | null | undefined } | null | undefined, Product?: { __typename?: 'Product', slug?: string | null | undefined } | null | undefined }> | null | undefined } | null | undefined };

export type MemberContentsFragment = { __typename?: 'Member', id?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, slug?: string | null | undefined, email?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, signUpNumber?: number | null | undefined, profilePhotoID?: string | null | undefined, coverPhotoID?: string | null | undefined, backgroundColor?: string | null | undefined, gender?: string | null | undefined, country?: string | null | undefined, postalCode?: string | null | undefined, suburb?: string | null | undefined, city?: string | null | undefined, state?: string | null | undefined, CategoryIDs?: Array<string> | null | undefined, personalStatus?: string | null | undefined, biography?: string | null | undefined, quotes?: string | null | undefined, ap5FavoriteEvents?: string | null | undefined, ap5InspiredBy?: string | null | undefined, ap5PassionateAbout?: string | null | undefined, ap5ToughestThing?: string | null | undefined, ap5TrainingWith?: string | null | undefined, claimed?: boolean | null | undefined, partners?: Array<string> | null | undefined, name?: string | null | undefined, profilePhotoURL?: string | null | undefined, coverPhotoURL?: string | null | undefined, isFollowed?: boolean | null | undefined, Activities: { __typename?: 'FeedItemGroup', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'FeedItem', id?: string | null | undefined, timestamp?: any | null | undefined, actorType?: string | null | undefined, actorID?: string | null | undefined, objectType?: string | null | undefined, objectID?: string | null | undefined, CategoryIDs?: Array<string> | null | undefined, isLiked?: boolean | null | undefined, isSaved?: boolean | null | undefined, Categories?: Array<{ __typename?: 'Category', id?: string | null | undefined, name?: string | null | undefined }> | null | undefined, Member?: { __typename?: 'Member', id?: string | null | undefined, name?: string | null | undefined, slug?: string | null | undefined, profilePhotoURL?: string | null | undefined, isFollowed?: boolean | null | undefined, Categories: Array<{ __typename?: 'Category', name?: string | null | undefined }> } | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, name?: string | null | undefined, slug?: string | null | undefined, profilePhotoURL?: string | null | undefined, isFollowed?: boolean | null | undefined, plan?: string | null | undefined, Categories?: Array<{ __typename?: 'Category', name?: string | null | undefined }> | null | undefined } | null | undefined, Update?: { __typename?: 'Update', id?: string | null | undefined, slug?: string | null | undefined, content?: string | null | undefined, isNFTMedal?: boolean | null | undefined, productID?: string | null | undefined, Media?: Array<{ __typename?: 'Media', objectID?: string | null | undefined, objectType?: string | null | undefined, fileName?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, orientation?: string | null | undefined, Pin?: { __typename?: 'Pin', photoID?: string | null | undefined, Tags?: Array<{ __typename?: 'Tag', xCoordinate?: string | null | undefined, yCoordinate?: string | null | undefined, Product?: { __typename?: 'Product', title?: string | null | undefined, slug?: string | null | undefined, coverPhotoURL?: string | null | undefined, type?: string | null | undefined, startDate?: string | null | undefined, Categories?: Array<{ __typename?: 'Category', PhotoURL?: string | null | undefined }> | null | undefined } | null | undefined }> | null | undefined } | null | undefined }> | null | undefined, ProductTheme?: { __typename?: 'ProductTheme', id?: string | null | undefined, backgroundColor?: string | null | undefined, fontColor?: string | null | undefined, buttonColor?: string | null | undefined, circleColor?: string | null | undefined } | null | undefined } | null | undefined, Article?: { __typename?: 'Article', id?: string | null | undefined, slug?: string | null | undefined, title?: string | null | undefined, excerpt?: string | null | undefined, coverPhotoURL?: string | null | undefined, content?: string | null | undefined } | null | undefined, Aggregates: { __typename?: 'FeedItemAggregates', likes?: number | null | undefined, comments?: number | null | undefined }, Comments: { __typename?: 'FeedItemComments', next?: string | null | undefined, items?: Array<{ __typename?: 'Comment', id?: string | null | undefined, timestamp?: any | null | undefined, actorType?: string | null | undefined, content?: string | null | undefined, isLiked: boolean, Member?: { __typename?: 'Member', name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Aggregates?: { __typename?: 'CommentAggregates', likes?: number | null | undefined } | null | undefined }> | null | undefined } }> | null | undefined }, Categories: Array<{ __typename?: 'Category', id?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, name?: string | null | undefined, iconName?: string | null | undefined, summary?: string | null | undefined, PhotoID?: string | null | undefined, parent?: string | null | undefined, archived?: boolean | null | undefined, productCategory?: boolean | null | undefined, communityInterest?: boolean | null | undefined, PhotoURL?: string | null | undefined }>, Follows?: Array<{ __typename?: 'SocialProfile', objectID?: string | null | undefined, objectType?: string | null | undefined, Member?: { __typename?: 'Member', id?: string | null | undefined, slug?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, slug?: string | null | undefined, name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined, Followers?: Array<{ __typename?: 'SocialProfile', objectID?: string | null | undefined, objectType?: string | null | undefined, Member?: { __typename?: 'Member', id?: string | null | undefined, slug?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, slug?: string | null | undefined, name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined, Saves?: { __typename?: 'FeedItemGroup', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'FeedItem', id?: string | null | undefined, timestamp?: any | null | undefined, actorType?: string | null | undefined, actorID?: string | null | undefined, objectType?: string | null | undefined, objectID?: string | null | undefined, CategoryIDs?: Array<string> | null | undefined, isLiked?: boolean | null | undefined, isSaved?: boolean | null | undefined, Categories?: Array<{ __typename?: 'Category', id?: string | null | undefined, name?: string | null | undefined }> | null | undefined, Member?: { __typename?: 'Member', id?: string | null | undefined, name?: string | null | undefined, slug?: string | null | undefined, profilePhotoURL?: string | null | undefined, isFollowed?: boolean | null | undefined, Categories: Array<{ __typename?: 'Category', name?: string | null | undefined }> } | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, name?: string | null | undefined, slug?: string | null | undefined, profilePhotoURL?: string | null | undefined, isFollowed?: boolean | null | undefined, plan?: string | null | undefined, Categories?: Array<{ __typename?: 'Category', name?: string | null | undefined }> | null | undefined } | null | undefined, Update?: { __typename?: 'Update', id?: string | null | undefined, slug?: string | null | undefined, content?: string | null | undefined, isNFTMedal?: boolean | null | undefined, productID?: string | null | undefined, Media?: Array<{ __typename?: 'Media', objectID?: string | null | undefined, objectType?: string | null | undefined, fileName?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, orientation?: string | null | undefined, Pin?: { __typename?: 'Pin', photoID?: string | null | undefined, Tags?: Array<{ __typename?: 'Tag', xCoordinate?: string | null | undefined, yCoordinate?: string | null | undefined, Product?: { __typename?: 'Product', title?: string | null | undefined, slug?: string | null | undefined, coverPhotoURL?: string | null | undefined, type?: string | null | undefined, startDate?: string | null | undefined, Categories?: Array<{ __typename?: 'Category', PhotoURL?: string | null | undefined }> | null | undefined } | null | undefined }> | null | undefined } | null | undefined }> | null | undefined, ProductTheme?: { __typename?: 'ProductTheme', id?: string | null | undefined, backgroundColor?: string | null | undefined, fontColor?: string | null | undefined, buttonColor?: string | null | undefined, circleColor?: string | null | undefined } | null | undefined } | null | undefined, Article?: { __typename?: 'Article', id?: string | null | undefined, slug?: string | null | undefined, title?: string | null | undefined, excerpt?: string | null | undefined, coverPhotoURL?: string | null | undefined, content?: string | null | undefined } | null | undefined, Aggregates: { __typename?: 'FeedItemAggregates', likes?: number | null | undefined, comments?: number | null | undefined }, Comments: { __typename?: 'FeedItemComments', next?: string | null | undefined, items?: Array<{ __typename?: 'Comment', id?: string | null | undefined, timestamp?: any | null | undefined, actorType?: string | null | undefined, content?: string | null | undefined, isLiked: boolean, Member?: { __typename?: 'Member', name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Aggregates?: { __typename?: 'CommentAggregates', likes?: number | null | undefined } | null | undefined }> | null | undefined } }> | null | undefined } | null | undefined, Gallery?: { __typename?: 'Gallery', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'GalleryItem', objectID?: string | null | undefined, objectType?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined }> | null | undefined } | null | undefined, Partners?: Array<{ __typename?: 'SocialProfile', objectID?: string | null | undefined, objectType?: string | null | undefined, Member?: { __typename?: 'Member', id?: string | null | undefined, slug?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, slug?: string | null | undefined, name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined, Medals: { __typename?: 'NFTUserMedals', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'NFTUserMedal', id?: string | null | undefined, slug?: string | null | undefined, blockchainHash?: string | null | undefined, place?: string | null | undefined, time?: string | null | undefined, distance?: number | null | undefined, distanceUnit?: string | null | undefined, distanceType?: string | null | undefined, overallFinish?: string | null | undefined, ageGroupFinish?: string | null | undefined, userSlug?: string | null | undefined, Medal?: { __typename?: 'NFTMedal', Media?: Array<{ __typename?: 'Media', PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, VideoThumbnail?: string | null | undefined, objectType?: string | null | undefined, orientation?: string | null | undefined }> | null | undefined } | null | undefined, Product?: { __typename?: 'Product', title?: string | null | undefined, slug?: string | null | undefined } | null | undefined }> | null | undefined } };

export type NftUserMedalContentsFragment = { __typename?: 'NFTUserMedal', id?: string | null | undefined, slug?: string | null | undefined, blockchainHash?: string | null | undefined, place?: string | null | undefined, time?: string | null | undefined, distance?: number | null | undefined, distanceUnit?: string | null | undefined, distanceType?: string | null | undefined, overallFinish?: string | null | undefined, ageGroupFinish?: string | null | undefined, userSlug?: string | null | undefined, Medal?: { __typename?: 'NFTMedal', Media?: Array<{ __typename?: 'Media', PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, VideoThumbnail?: string | null | undefined, objectType?: string | null | undefined, orientation?: string | null | undefined }> | null | undefined } | null | undefined, Product?: { __typename?: 'Product', title?: string | null | undefined, slug?: string | null | undefined } | null | undefined };

export type ProductContentsFragment = { __typename?: 'Product', id?: string | null | undefined, createdAt?: number | null | undefined, slug?: string | null | undefined, type?: string | null | undefined, title?: string | null | undefined, coverPhotoID?: string | null | undefined, description?: string | null | undefined, UserID?: string | null | undefined, actorID?: string | null | undefined, actorType?: string | null | undefined, CategoryIDs?: Array<string> | null | undefined, parentID?: string | null | undefined, repeats?: boolean | null | undefined, hibernation?: boolean | null | undefined, status?: string | null | undefined, hidden?: boolean | null | undefined, inquiryType?: string | null | undefined, externalURL?: string | null | undefined, startDate?: string | null | undefined, endDate?: string | null | undefined, startTime?: string | null | undefined, endTime?: string | null | undefined, timezone?: string | null | undefined, virtual?: boolean | null | undefined, address1?: string | null | undefined, city?: string | null | undefined, state?: string | null | undefined, country?: string | null | undefined, postcode?: string | null | undefined, suburb?: string | null | undefined, pricing?: string | null | undefined, priceAmount?: number | null | undefined, priceAmountMax?: number | null | undefined, currency?: string | null | undefined, isFavorite?: boolean | null | undefined, recommendsCount?: number | null | undefined, viewsCount?: number | null | undefined, savesCount?: number | null | undefined, viewerCurrency?: string | null | undefined, viewerPrice?: number | null | undefined, viewerPriceMax?: number | null | undefined, businessPaidPlan?: number | null | undefined, sponsorIDs?: Array<string> | null | undefined, isNFTMedal?: boolean | null | undefined, isSaved?: boolean | null | undefined, coverPhotoURL?: string | null | undefined, Distance?: Array<{ __typename?: 'ProductDistance', id?: string | null | undefined, distance?: number | null | undefined, distanceUnit?: string | null | undefined, distanceType?: string | null | undefined, hasMedal?: boolean | null | undefined }> | null | undefined, Media?: Array<{ __typename?: 'Media', objectID?: string | null | undefined, objectType?: string | null | undefined, url?: string | null | undefined, isNFTMedal?: boolean | null | undefined, fileName?: string | null | undefined, FileURL?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, VideoThumbnail?: string | null | undefined, MedalURL?: string | null | undefined, orientation?: string | null | undefined, Pin?: { __typename?: 'Pin', createdAt?: any | null | undefined, photoID?: string | null | undefined, Tags?: Array<{ __typename?: 'Tag', objectID?: string | null | undefined, objectType?: string | null | undefined, xCoordinate?: string | null | undefined, yCoordinate?: string | null | undefined, Member?: { __typename?: 'Member', slug?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', slug?: string | null | undefined } | null | undefined, Product?: { __typename?: 'Product', slug?: string | null | undefined } | null | undefined }> | null | undefined } | null | undefined }> | null | undefined, AdditionalInformation?: Array<{ __typename?: 'AdditionalInformation', objectID?: string | null | undefined, objectType?: string | null | undefined, fileName?: string | null | undefined, fileSize?: number | null | undefined, fileType?: string | null | undefined, FileURL?: string | null | undefined }> | null | undefined, Categories?: Array<{ __typename?: 'Category', id?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, name?: string | null | undefined, iconName?: string | null | undefined, summary?: string | null | undefined, PhotoID?: string | null | undefined, parent?: string | null | undefined, archived?: boolean | null | undefined, productCategory?: boolean | null | undefined, communityInterest?: boolean | null | undefined, PhotoURL?: string | null | undefined }> | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, createdAt?: any | null | undefined, slug?: string | null | undefined, name?: string | null | undefined, profilePhotoURL?: string | null | undefined, website?: string | null | undefined } | null | undefined, Sponsors?: Array<{ __typename?: 'ProductSponsor', id?: string | null | undefined, name?: string | null | undefined, PhotoURL?: string | null | undefined, externalURL?: string | null | undefined }> | null | undefined, NFTMedals?: Array<{ __typename?: 'NFTMedals', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'NFTMedal', id?: string | null | undefined, createdAt?: number | null | undefined, medalDescription?: string | null | undefined, productID?: string | null | undefined, slug?: string | null | undefined, highFives?: number | null | undefined, isHighFived?: boolean | null | undefined, Media?: Array<{ __typename?: 'Media', objectID?: string | null | undefined, objectType?: string | null | undefined, url?: string | null | undefined, isNFTMedal?: boolean | null | undefined, fileName?: string | null | undefined, FileURL?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, VideoThumbnail?: string | null | undefined, MedalURL?: string | null | undefined, orientation?: string | null | undefined, Pin?: { __typename?: 'Pin', createdAt?: any | null | undefined, photoID?: string | null | undefined, Tags?: Array<{ __typename?: 'Tag', objectID?: string | null | undefined, objectType?: string | null | undefined, xCoordinate?: string | null | undefined, yCoordinate?: string | null | undefined, Member?: { __typename?: 'Member', slug?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', slug?: string | null | undefined } | null | undefined, Product?: { __typename?: 'Product', slug?: string | null | undefined } | null | undefined }> | null | undefined } | null | undefined }> | null | undefined, Racer?: { __typename?: 'NFTUserMedals', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'NFTUserMedal', id?: string | null | undefined }> | null | undefined } | null | undefined }> | null | undefined } | null | undefined> | null | undefined, ProductTheme?: { __typename?: 'ProductTheme', id?: string | null | undefined, backgroundColor?: string | null | undefined, fontColor?: string | null | undefined, buttonColor?: string | null | undefined, circleColor?: string | null | undefined } | null | undefined };

export type ProfileAggregatesContentsFragment = { __typename?: 'ProfileAggregates', articles?: number | null | undefined, updates?: number | null | undefined, followers?: number | null | undefined, follows?: number | null | undefined, comments?: number | null | undefined, commentsReceived?: number | null | undefined, highFivesReceived?: number | null | undefined, highFives?: number | null | undefined, saves?: number | null | undefined, savesAcquired?: number | null | undefined, blocks?: number | null | undefined, blocksAcquired?: number | null | undefined, hides?: number | null | undefined, hidesAcquired?: number | null | undefined, rating?: number | null | undefined, reviews?: number | null | undefined, totalRates?: number | null | undefined, acticlesViewsAcquired?: number | null | undefined, articlesCommentReceived?: number | null | undefined, articlesSavesAcquired?: number | null | undefined, articlesHighFivesReceived?: number | null | undefined, articlesDrafted?: number | null | undefined, articlesPublished?: number | null | undefined, articlesShared?: number | null | undefined, videoFeeds?: number | null | undefined, products?: number | null | undefined, productViews?: number | null | undefined, productViewsAcquired?: number | null | undefined, productSaves?: number | null | undefined, productSavesAcquired?: number | null | undefined };

export type SocialProfileContentsFragment = { __typename?: 'SocialProfile', objectID?: string | null | undefined, objectType?: string | null | undefined, Member?: { __typename?: 'Member', id?: string | null | undefined, slug?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, slug?: string | null | undefined, name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined };

export type FeedItemContentsFragment = { __typename?: 'FeedItemGroup', items?: Array<{ __typename?: 'FeedItem', id?: string | null | undefined, timestamp?: any | null | undefined, actorType?: string | null | undefined, actorID?: string | null | undefined, objectType?: string | null | undefined, objectID?: string | null | undefined, CategoryIDs?: Array<string> | null | undefined, isLiked?: boolean | null | undefined, isSaved?: boolean | null | undefined, Categories?: Array<{ __typename?: 'Category', id?: string | null | undefined, name?: string | null | undefined }> | null | undefined, Member?: { __typename?: 'Member', id?: string | null | undefined, name?: string | null | undefined, slug?: string | null | undefined, profilePhotoURL?: string | null | undefined, isFollowed?: boolean | null | undefined, Categories: Array<{ __typename?: 'Category', name?: string | null | undefined }> } | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, name?: string | null | undefined, slug?: string | null | undefined, profilePhotoURL?: string | null | undefined, isFollowed?: boolean | null | undefined, plan?: string | null | undefined, Categories?: Array<{ __typename?: 'Category', name?: string | null | undefined }> | null | undefined } | null | undefined, Update?: { __typename?: 'Update', id?: string | null | undefined, slug?: string | null | undefined, content?: string | null | undefined, isNFTMedal?: boolean | null | undefined, productID?: string | null | undefined, Media?: Array<{ __typename?: 'Media', objectID?: string | null | undefined, objectType?: string | null | undefined, fileName?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, orientation?: string | null | undefined, Pin?: { __typename?: 'Pin', photoID?: string | null | undefined, Tags?: Array<{ __typename?: 'Tag', xCoordinate?: string | null | undefined, yCoordinate?: string | null | undefined, Product?: { __typename?: 'Product', title?: string | null | undefined, slug?: string | null | undefined, coverPhotoURL?: string | null | undefined, type?: string | null | undefined, startDate?: string | null | undefined, Categories?: Array<{ __typename?: 'Category', PhotoURL?: string | null | undefined }> | null | undefined } | null | undefined }> | null | undefined } | null | undefined }> | null | undefined, ProductTheme?: { __typename?: 'ProductTheme', id?: string | null | undefined, backgroundColor?: string | null | undefined, fontColor?: string | null | undefined, buttonColor?: string | null | undefined, circleColor?: string | null | undefined } | null | undefined } | null | undefined, Article?: { __typename?: 'Article', id?: string | null | undefined, slug?: string | null | undefined, title?: string | null | undefined, excerpt?: string | null | undefined, coverPhotoURL?: string | null | undefined, content?: string | null | undefined } | null | undefined, Aggregates: { __typename?: 'FeedItemAggregates', likes?: number | null | undefined, comments?: number | null | undefined }, Comments: { __typename?: 'FeedItemComments', next?: string | null | undefined, items?: Array<{ __typename?: 'Comment', id?: string | null | undefined, timestamp?: any | null | undefined, actorType?: string | null | undefined, content?: string | null | undefined, isLiked: boolean, Member?: { __typename?: 'Member', name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Aggregates?: { __typename?: 'CommentAggregates', likes?: number | null | undefined } | null | undefined }> | null | undefined } }> | null | undefined };

export type GalleryContentFragment = { __typename?: 'Gallery', items?: Array<{ __typename?: 'GalleryItem', PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, FeedItem?: { __typename?: 'FeedItem', objectType?: string | null | undefined, Update?: { __typename?: 'Update', slug?: string | null | undefined } | null | undefined, Article?: { __typename?: 'Article', slug?: string | null | undefined } | null | undefined } | null | undefined }> | null | undefined };

export type ProfileProductContentsFragment = { __typename?: 'ProductsPage', items?: Array<{ __typename?: 'Product', id?: string | null | undefined, createdAt?: number | null | undefined, slug?: string | null | undefined, type?: string | null | undefined, title?: string | null | undefined, coverPhotoURL?: string | null | undefined, description?: string | null | undefined, UserID?: string | null | undefined, actorType?: string | null | undefined, parentID?: string | null | undefined, repeats?: boolean | null | undefined, hibernation?: boolean | null | undefined, status?: string | null | undefined, hidden?: boolean | null | undefined, inquiryType?: string | null | undefined, externalURL?: string | null | undefined, startDate?: string | null | undefined, endDate?: string | null | undefined, startTime?: string | null | undefined, endTime?: string | null | undefined, timezone?: string | null | undefined, virtual?: boolean | null | undefined, address1?: string | null | undefined, address2?: string | null | undefined, city?: string | null | undefined, state?: string | null | undefined, country?: string | null | undefined, postcode?: string | null | undefined, pricing?: string | null | undefined, priceAmount?: number | null | undefined, viewerPrice?: number | null | undefined, viewerPriceMax?: number | null | undefined, viewerCurrency?: string | null | undefined, currency?: string | null | undefined, recommendsCount?: number | null | undefined, viewsCount?: number | null | undefined, savesCount?: number | null | undefined, businessPaidPlan?: number | null | undefined, isSaved?: boolean | null | undefined, isNFTMedal?: boolean | null | undefined, Categories?: Array<{ __typename?: 'Category', id?: string | null | undefined, name?: string | null | undefined, PhotoURL?: string | null | undefined }> | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, name?: string | null | undefined, slug?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, AdditionalInformation?: Array<{ __typename?: 'AdditionalInformation', objectType?: string | null | undefined, objectID?: string | null | undefined, fileName?: string | null | undefined, fileSize?: number | null | undefined, fileType?: string | null | undefined }> | null | undefined, Media?: Array<{ __typename?: 'Media', PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, FileURL?: string | null | undefined, objectType?: string | null | undefined, fileName?: string | null | undefined }> | null | undefined }> | null | undefined };

export type SocialProfileCardListFragment = { __typename?: 'SocialProfile', objectType?: string | null | undefined, Member?: { __typename?: 'Member', id?: string | null | undefined, name?: string | null | undefined, slug?: string | null | undefined, profilePhotoURL?: string | null | undefined, isFollowed?: boolean | null | undefined, Categories: Array<{ __typename?: 'Category', id?: string | null | undefined, name?: string | null | undefined }>, Aggregates?: { __typename?: 'ProfileAggregates', articlesPublished?: number | null | undefined, updates?: number | null | undefined, likesReceived?: number | null | undefined } | null | undefined } | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, name?: string | null | undefined, slug?: string | null | undefined, profilePhotoURL?: string | null | undefined, isFollowed?: boolean | null | undefined, Categories?: Array<{ __typename?: 'Category', id?: string | null | undefined, name?: string | null | undefined }> | null | undefined, Aggregates?: { __typename?: 'ProfileAggregates', articlesPublished?: number | null | undefined, updates?: number | null | undefined, likesReceived?: number | null | undefined } | null | undefined } | null | undefined };

export type NftClaimMemberProfileMutationVariables = Exact<{
  userMedalID?: Maybe<Scalars['String']>;
}>;


export type NftClaimMemberProfileMutation = { __typename?: 'Mutation', NFTClaimMemberProfile: { __typename?: 'MutationResult', timestamp?: any | null | undefined, success?: boolean | null | undefined, objectID?: string | null | undefined, objectType?: string | null | undefined } };

export type CreateFormEntryMutationVariables = Exact<{
  type: Scalars['String'];
  data?: Maybe<Scalars['JSON']>;
}>;


export type CreateFormEntryMutation = { __typename?: 'Mutation', createFormEntry: { __typename?: 'MutationResult', timestamp?: any | null | undefined, success?: boolean | null | undefined, objectID?: string | null | undefined, objectType?: string | null | undefined } };

export type CreateProfileMutationVariables = Exact<{
  input: InputProfile;
}>;


export type CreateProfileMutation = { __typename?: 'Mutation', createProfile: { __typename?: 'MutationResult', timestamp?: any | null | undefined, success?: boolean | null | undefined, objectID?: string | null | undefined, objectType?: string | null | undefined } };

export type DownloadFileMutationVariables = Exact<{
  objectID: Scalars['String'];
  objectType: Scalars['String'];
}>;


export type DownloadFileMutation = { __typename?: 'Mutation', downloadFile: { __typename?: 'MutationResult', success?: boolean | null | undefined, objectID?: string | null | undefined, objectType?: string | null | undefined, timestamp?: any | null | undefined } };

export type DownloadMedalMutationVariables = Exact<{
  objectID: Scalars['String'];
  objectType: Scalars['String'];
}>;


export type DownloadMedalMutation = { __typename?: 'Mutation', downloadMedal: { __typename?: 'MutationResult', timestamp?: any | null | undefined, success?: boolean | null | undefined, objectID?: string | null | undefined, objectType?: string | null | undefined } };

export type FollowMutationVariables = Exact<{
  MemberID?: Maybe<Scalars['String']>;
  BusinessID?: Maybe<Scalars['String']>;
}>;


export type FollowMutation = { __typename?: 'Mutation', follow: { __typename?: 'MutationResult', timestamp?: any | null | undefined, success?: boolean | null | undefined, objectID?: string | null | undefined, objectType?: string | null | undefined } };

export type HighFiveNftUserMedalMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type HighFiveNftUserMedalMutation = { __typename?: 'Mutation', highFiveNFTUserMedal: { __typename?: 'MutationResult', timestamp?: any | null | undefined, success?: boolean | null | undefined, objectID?: string | null | undefined, objectType?: string | null | undefined } };

export type HighFiveNftMedalMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type HighFiveNftMedalMutation = { __typename?: 'Mutation', highFiveNFTMedal: { __typename?: 'MutationResult', timestamp?: any | null | undefined, success?: boolean | null | undefined, objectID?: string | null | undefined, objectType?: string | null | undefined } };

export type LikeMutationVariables = Exact<{
  CommentID?: Maybe<Scalars['String']>;
}>;


export type LikeMutation = { __typename?: 'Mutation', like: { __typename?: 'MutationResult', timestamp?: any | null | undefined, success?: boolean | null | undefined, objectID?: string | null | undefined, objectType?: string | null | undefined } };

export type MarkNotificationsReadMutationVariables = Exact<{
  id?: Maybe<Scalars['String']>;
}>;


export type MarkNotificationsReadMutation = { __typename?: 'Mutation', markNotificationsRead: { __typename?: 'MutationResult', timestamp?: any | null | undefined, success?: boolean | null | undefined, objectID?: string | null | undefined, objectType?: string | null | undefined } };

export type SaveMutationVariables = Exact<{
  targetGetStreamActivityID?: Maybe<Scalars['String']>;
}>;


export type SaveMutation = { __typename?: 'Mutation', save: { __typename?: 'MutationResult', timestamp?: any | null | undefined, success?: boolean | null | undefined, objectID?: string | null | undefined, objectType?: string | null | undefined } };

export type SaveProductMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type SaveProductMutation = { __typename?: 'Mutation', saveProduct: { __typename?: 'MutationResult', timestamp?: any | null | undefined, success?: boolean | null | undefined, objectID?: string | null | undefined, objectType?: string | null | undefined } };

export type UnfollowMutationVariables = Exact<{
  MemberID?: Maybe<Scalars['String']>;
  BusinessID?: Maybe<Scalars['String']>;
}>;


export type UnfollowMutation = { __typename?: 'Mutation', unfollow: { __typename?: 'MutationResult', timestamp?: any | null | undefined, success?: boolean | null | undefined, objectID?: string | null | undefined, objectType?: string | null | undefined } };

export type UnhighFiveNftMedalMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type UnhighFiveNftMedalMutation = { __typename?: 'Mutation', unhighFiveNFTMedal: { __typename?: 'MutationResult', timestamp?: any | null | undefined, success?: boolean | null | undefined, objectID?: string | null | undefined, objectType?: string | null | undefined } };

export type UnhighFiveNftUserMedalMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type UnhighFiveNftUserMedalMutation = { __typename?: 'Mutation', unhighFiveNFTUserMedal: { __typename?: 'MutationResult', timestamp?: any | null | undefined, success?: boolean | null | undefined, objectID?: string | null | undefined, objectType?: string | null | undefined } };

export type UnlikeMutationVariables = Exact<{
  CommentID: Scalars['String'];
}>;


export type UnlikeMutation = { __typename?: 'Mutation', unlike: { __typename?: 'MutationResult', timestamp?: any | null | undefined, success?: boolean | null | undefined, objectID?: string | null | undefined, objectType?: string | null | undefined } };

export type UnsaveMutationVariables = Exact<{
  targetGetStreamActivityID: Scalars['String'];
}>;


export type UnsaveMutation = { __typename?: 'Mutation', unsave: { __typename?: 'MutationResult', timestamp?: any | null | undefined, success?: boolean | null | undefined, objectID?: string | null | undefined, objectType?: string | null | undefined } };

export type UnsaveProductMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type UnsaveProductMutation = { __typename?: 'Mutation', unsaveProduct: { __typename?: 'MutationResult', timestamp?: any | null | undefined, success?: boolean | null | undefined, objectID?: string | null | undefined, objectType?: string | null | undefined } };

export type GetAllUpcomingMedalsQueryVariables = Exact<{
  businessID?: Maybe<Scalars['String']>;
  businessSlug?: Maybe<Scalars['String']>;
  coverPhotoSize?: Maybe<Scalars['String']>;
}>;


export type GetAllUpcomingMedalsQuery = { __typename?: 'Query', getAllUpcomingMedals?: { __typename?: 'NFTMedals', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'NFTMedal', id?: string | null | undefined, Media?: Array<{ __typename?: 'Media', objectID?: string | null | undefined, objectType?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, VideoThumbnail?: string | null | undefined, orientation?: string | null | undefined }> | null | undefined, Product?: { __typename?: 'Product', id?: string | null | undefined, createdAt?: number | null | undefined, slug?: string | null | undefined, type?: string | null | undefined, title?: string | null | undefined, coverPhotoID?: string | null | undefined, description?: string | null | undefined, UserID?: string | null | undefined, actorID?: string | null | undefined, actorType?: string | null | undefined, CategoryIDs?: Array<string> | null | undefined, parentID?: string | null | undefined, repeats?: boolean | null | undefined, hibernation?: boolean | null | undefined, status?: string | null | undefined, hidden?: boolean | null | undefined, inquiryType?: string | null | undefined, externalURL?: string | null | undefined, startDate?: string | null | undefined, endDate?: string | null | undefined, startTime?: string | null | undefined, endTime?: string | null | undefined, timezone?: string | null | undefined, virtual?: boolean | null | undefined, address1?: string | null | undefined, city?: string | null | undefined, state?: string | null | undefined, country?: string | null | undefined, postcode?: string | null | undefined, suburb?: string | null | undefined, pricing?: string | null | undefined, priceAmount?: number | null | undefined, priceAmountMax?: number | null | undefined, currency?: string | null | undefined, isFavorite?: boolean | null | undefined, recommendsCount?: number | null | undefined, viewsCount?: number | null | undefined, savesCount?: number | null | undefined, viewerCurrency?: string | null | undefined, viewerPrice?: number | null | undefined, viewerPriceMax?: number | null | undefined, businessPaidPlan?: number | null | undefined, sponsorIDs?: Array<string> | null | undefined, isNFTMedal?: boolean | null | undefined, isSaved?: boolean | null | undefined, coverPhotoURL?: string | null | undefined, Distance?: Array<{ __typename?: 'ProductDistance', id?: string | null | undefined, distance?: number | null | undefined, distanceUnit?: string | null | undefined, distanceType?: string | null | undefined, hasMedal?: boolean | null | undefined }> | null | undefined, Media?: Array<{ __typename?: 'Media', objectID?: string | null | undefined, objectType?: string | null | undefined, url?: string | null | undefined, isNFTMedal?: boolean | null | undefined, fileName?: string | null | undefined, FileURL?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, VideoThumbnail?: string | null | undefined, MedalURL?: string | null | undefined, orientation?: string | null | undefined, Pin?: { __typename?: 'Pin', createdAt?: any | null | undefined, photoID?: string | null | undefined, Tags?: Array<{ __typename?: 'Tag', objectID?: string | null | undefined, objectType?: string | null | undefined, xCoordinate?: string | null | undefined, yCoordinate?: string | null | undefined, Member?: { __typename?: 'Member', slug?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', slug?: string | null | undefined } | null | undefined, Product?: { __typename?: 'Product', slug?: string | null | undefined } | null | undefined }> | null | undefined } | null | undefined }> | null | undefined, AdditionalInformation?: Array<{ __typename?: 'AdditionalInformation', objectID?: string | null | undefined, objectType?: string | null | undefined, fileName?: string | null | undefined, fileSize?: number | null | undefined, fileType?: string | null | undefined, FileURL?: string | null | undefined }> | null | undefined, Categories?: Array<{ __typename?: 'Category', id?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, name?: string | null | undefined, iconName?: string | null | undefined, summary?: string | null | undefined, PhotoID?: string | null | undefined, parent?: string | null | undefined, archived?: boolean | null | undefined, productCategory?: boolean | null | undefined, communityInterest?: boolean | null | undefined, PhotoURL?: string | null | undefined }> | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, createdAt?: any | null | undefined, slug?: string | null | undefined, name?: string | null | undefined, profilePhotoURL?: string | null | undefined, website?: string | null | undefined } | null | undefined, Sponsors?: Array<{ __typename?: 'ProductSponsor', id?: string | null | undefined, name?: string | null | undefined, PhotoURL?: string | null | undefined, externalURL?: string | null | undefined }> | null | undefined, NFTMedals?: Array<{ __typename?: 'NFTMedals', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'NFTMedal', id?: string | null | undefined, createdAt?: number | null | undefined, medalDescription?: string | null | undefined, productID?: string | null | undefined, slug?: string | null | undefined, highFives?: number | null | undefined, isHighFived?: boolean | null | undefined, Media?: Array<{ __typename?: 'Media', objectID?: string | null | undefined, objectType?: string | null | undefined, url?: string | null | undefined, isNFTMedal?: boolean | null | undefined, fileName?: string | null | undefined, FileURL?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, VideoThumbnail?: string | null | undefined, MedalURL?: string | null | undefined, orientation?: string | null | undefined, Pin?: { __typename?: 'Pin', createdAt?: any | null | undefined, photoID?: string | null | undefined, Tags?: Array<{ __typename?: 'Tag', objectID?: string | null | undefined, objectType?: string | null | undefined, xCoordinate?: string | null | undefined, yCoordinate?: string | null | undefined, Member?: { __typename?: 'Member', slug?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', slug?: string | null | undefined } | null | undefined, Product?: { __typename?: 'Product', slug?: string | null | undefined } | null | undefined }> | null | undefined } | null | undefined }> | null | undefined, Racer?: { __typename?: 'NFTUserMedals', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'NFTUserMedal', id?: string | null | undefined }> | null | undefined } | null | undefined }> | null | undefined } | null | undefined> | null | undefined, ProductTheme?: { __typename?: 'ProductTheme', id?: string | null | undefined, backgroundColor?: string | null | undefined, fontColor?: string | null | undefined, buttonColor?: string | null | undefined, circleColor?: string | null | undefined } | null | undefined } | null | undefined }> | null | undefined } | null | undefined };

export type GetArticlesQueryVariables = Exact<{
  offset?: Maybe<Scalars['Int']>;
  count?: Maybe<Scalars['Int']>;
  sortBy?: Maybe<Scalars['String']>;
  categories?: Maybe<Scalars['String']>;
  coverPhotoSize?: Maybe<Scalars['String']>;
  profilePhotoSize?: Maybe<Scalars['String']>;
}>;


export type GetArticlesQuery = { __typename?: 'Query', Articles: { __typename?: 'Articles', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'Article', id?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, publishedAt?: any | null | undefined, title?: string | null | undefined, subtitle?: string | null | undefined, coverCaption?: string | null | undefined, coverPhotoID?: string | null | undefined, excerpt?: string | null | undefined, slug?: string | null | undefined, CategoryIDs?: Array<string> | null | undefined, actor?: string | null | undefined, MemberID?: string | null | undefined, BusinessID?: string | null | undefined, UserID?: string | null | undefined, content?: string | null | undefined, coverPhotoURL?: string | null | undefined, Aggregates?: { __typename?: 'FeedItemAggregates', comments?: number | null | undefined, highFives?: number | null | undefined, views?: number | null | undefined, saves?: number | null | undefined, likes?: number | null | undefined } | null | undefined, Categories?: Array<{ __typename?: 'Category', id?: string | null | undefined, name?: string | null | undefined, iconName?: string | null | undefined, parent?: string | null | undefined, PhotoURL?: string | null | undefined } | null | undefined> | null | undefined, Member?: { __typename?: 'Member', id?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, slug?: string | null | undefined, email?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, signUpNumber?: number | null | undefined, profilePhotoID?: string | null | undefined, coverPhotoID?: string | null | undefined, backgroundColor?: string | null | undefined, gender?: string | null | undefined, country?: string | null | undefined, postalCode?: string | null | undefined, suburb?: string | null | undefined, city?: string | null | undefined, state?: string | null | undefined, CategoryIDs?: Array<string> | null | undefined, personalStatus?: string | null | undefined, biography?: string | null | undefined, quotes?: string | null | undefined, ap5FavoriteEvents?: string | null | undefined, ap5InspiredBy?: string | null | undefined, ap5PassionateAbout?: string | null | undefined, ap5ToughestThing?: string | null | undefined, ap5TrainingWith?: string | null | undefined, claimed?: boolean | null | undefined, partners?: Array<string> | null | undefined, name?: string | null | undefined, profilePhotoURL?: string | null | undefined, coverPhotoURL?: string | null | undefined, isFollowed?: boolean | null | undefined, Activities: { __typename?: 'FeedItemGroup', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'FeedItem', id?: string | null | undefined, timestamp?: any | null | undefined, actorType?: string | null | undefined, actorID?: string | null | undefined, objectType?: string | null | undefined, objectID?: string | null | undefined, CategoryIDs?: Array<string> | null | undefined, isLiked?: boolean | null | undefined, isSaved?: boolean | null | undefined, Categories?: Array<{ __typename?: 'Category', id?: string | null | undefined, name?: string | null | undefined }> | null | undefined, Member?: { __typename?: 'Member', id?: string | null | undefined, name?: string | null | undefined, slug?: string | null | undefined, profilePhotoURL?: string | null | undefined, isFollowed?: boolean | null | undefined, Categories: Array<{ __typename?: 'Category', name?: string | null | undefined }> } | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, name?: string | null | undefined, slug?: string | null | undefined, profilePhotoURL?: string | null | undefined, isFollowed?: boolean | null | undefined, plan?: string | null | undefined, Categories?: Array<{ __typename?: 'Category', name?: string | null | undefined }> | null | undefined } | null | undefined, Update?: { __typename?: 'Update', id?: string | null | undefined, slug?: string | null | undefined, content?: string | null | undefined, isNFTMedal?: boolean | null | undefined, productID?: string | null | undefined, Media?: Array<{ __typename?: 'Media', objectID?: string | null | undefined, objectType?: string | null | undefined, fileName?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, orientation?: string | null | undefined, Pin?: { __typename?: 'Pin', photoID?: string | null | undefined, Tags?: Array<{ __typename?: 'Tag', xCoordinate?: string | null | undefined, yCoordinate?: string | null | undefined, Product?: { __typename?: 'Product', title?: string | null | undefined, slug?: string | null | undefined, coverPhotoURL?: string | null | undefined, type?: string | null | undefined, startDate?: string | null | undefined, Categories?: Array<{ __typename?: 'Category', PhotoURL?: string | null | undefined }> | null | undefined } | null | undefined }> | null | undefined } | null | undefined }> | null | undefined, ProductTheme?: { __typename?: 'ProductTheme', id?: string | null | undefined, backgroundColor?: string | null | undefined, fontColor?: string | null | undefined, buttonColor?: string | null | undefined, circleColor?: string | null | undefined } | null | undefined } | null | undefined, Article?: { __typename?: 'Article', id?: string | null | undefined, slug?: string | null | undefined, title?: string | null | undefined, excerpt?: string | null | undefined, coverPhotoURL?: string | null | undefined, content?: string | null | undefined } | null | undefined, Aggregates: { __typename?: 'FeedItemAggregates', likes?: number | null | undefined, comments?: number | null | undefined }, Comments: { __typename?: 'FeedItemComments', next?: string | null | undefined, items?: Array<{ __typename?: 'Comment', id?: string | null | undefined, timestamp?: any | null | undefined, actorType?: string | null | undefined, content?: string | null | undefined, isLiked: boolean, Member?: { __typename?: 'Member', name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Aggregates?: { __typename?: 'CommentAggregates', likes?: number | null | undefined } | null | undefined }> | null | undefined } }> | null | undefined }, Categories: Array<{ __typename?: 'Category', id?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, name?: string | null | undefined, iconName?: string | null | undefined, summary?: string | null | undefined, PhotoID?: string | null | undefined, parent?: string | null | undefined, archived?: boolean | null | undefined, productCategory?: boolean | null | undefined, communityInterest?: boolean | null | undefined, PhotoURL?: string | null | undefined }>, Follows?: Array<{ __typename?: 'SocialProfile', objectID?: string | null | undefined, objectType?: string | null | undefined, Member?: { __typename?: 'Member', id?: string | null | undefined, slug?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, slug?: string | null | undefined, name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined, Followers?: Array<{ __typename?: 'SocialProfile', objectID?: string | null | undefined, objectType?: string | null | undefined, Member?: { __typename?: 'Member', id?: string | null | undefined, slug?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, slug?: string | null | undefined, name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined, Saves?: { __typename?: 'FeedItemGroup', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'FeedItem', id?: string | null | undefined, timestamp?: any | null | undefined, actorType?: string | null | undefined, actorID?: string | null | undefined, objectType?: string | null | undefined, objectID?: string | null | undefined, CategoryIDs?: Array<string> | null | undefined, isLiked?: boolean | null | undefined, isSaved?: boolean | null | undefined, Categories?: Array<{ __typename?: 'Category', id?: string | null | undefined, name?: string | null | undefined }> | null | undefined, Member?: { __typename?: 'Member', id?: string | null | undefined, name?: string | null | undefined, slug?: string | null | undefined, profilePhotoURL?: string | null | undefined, isFollowed?: boolean | null | undefined, Categories: Array<{ __typename?: 'Category', name?: string | null | undefined }> } | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, name?: string | null | undefined, slug?: string | null | undefined, profilePhotoURL?: string | null | undefined, isFollowed?: boolean | null | undefined, plan?: string | null | undefined, Categories?: Array<{ __typename?: 'Category', name?: string | null | undefined }> | null | undefined } | null | undefined, Update?: { __typename?: 'Update', id?: string | null | undefined, slug?: string | null | undefined, content?: string | null | undefined, isNFTMedal?: boolean | null | undefined, productID?: string | null | undefined, Media?: Array<{ __typename?: 'Media', objectID?: string | null | undefined, objectType?: string | null | undefined, fileName?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, orientation?: string | null | undefined, Pin?: { __typename?: 'Pin', photoID?: string | null | undefined, Tags?: Array<{ __typename?: 'Tag', xCoordinate?: string | null | undefined, yCoordinate?: string | null | undefined, Product?: { __typename?: 'Product', title?: string | null | undefined, slug?: string | null | undefined, coverPhotoURL?: string | null | undefined, type?: string | null | undefined, startDate?: string | null | undefined, Categories?: Array<{ __typename?: 'Category', PhotoURL?: string | null | undefined }> | null | undefined } | null | undefined }> | null | undefined } | null | undefined }> | null | undefined, ProductTheme?: { __typename?: 'ProductTheme', id?: string | null | undefined, backgroundColor?: string | null | undefined, fontColor?: string | null | undefined, buttonColor?: string | null | undefined, circleColor?: string | null | undefined } | null | undefined } | null | undefined, Article?: { __typename?: 'Article', id?: string | null | undefined, slug?: string | null | undefined, title?: string | null | undefined, excerpt?: string | null | undefined, coverPhotoURL?: string | null | undefined, content?: string | null | undefined } | null | undefined, Aggregates: { __typename?: 'FeedItemAggregates', likes?: number | null | undefined, comments?: number | null | undefined }, Comments: { __typename?: 'FeedItemComments', next?: string | null | undefined, items?: Array<{ __typename?: 'Comment', id?: string | null | undefined, timestamp?: any | null | undefined, actorType?: string | null | undefined, content?: string | null | undefined, isLiked: boolean, Member?: { __typename?: 'Member', name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Aggregates?: { __typename?: 'CommentAggregates', likes?: number | null | undefined } | null | undefined }> | null | undefined } }> | null | undefined } | null | undefined, Gallery?: { __typename?: 'Gallery', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'GalleryItem', objectID?: string | null | undefined, objectType?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined }> | null | undefined } | null | undefined, Partners?: Array<{ __typename?: 'SocialProfile', objectID?: string | null | undefined, objectType?: string | null | undefined, Member?: { __typename?: 'Member', id?: string | null | undefined, slug?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, slug?: string | null | undefined, name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined, Medals: { __typename?: 'NFTUserMedals', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'NFTUserMedal', id?: string | null | undefined, slug?: string | null | undefined, blockchainHash?: string | null | undefined, place?: string | null | undefined, time?: string | null | undefined, distance?: number | null | undefined, distanceUnit?: string | null | undefined, distanceType?: string | null | undefined, overallFinish?: string | null | undefined, ageGroupFinish?: string | null | undefined, userSlug?: string | null | undefined, Medal?: { __typename?: 'NFTMedal', Media?: Array<{ __typename?: 'Media', PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, VideoThumbnail?: string | null | undefined, objectType?: string | null | undefined, orientation?: string | null | undefined }> | null | undefined } | null | undefined, Product?: { __typename?: 'Product', title?: string | null | undefined, slug?: string | null | undefined } | null | undefined }> | null | undefined } } | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined } | null | undefined, FeedItem?: { __typename?: 'FeedItem', id?: string | null | undefined } | null | undefined }> | null | undefined } };

export type GetBusinessMedalsQueryVariables = Exact<{
  slug?: Maybe<Scalars['String']>;
  preferredCurrency?: Maybe<Scalars['String']>;
  count?: Maybe<Scalars['Int']>;
  next?: Maybe<Scalars['String']>;
}>;


export type GetBusinessMedalsQuery = { __typename?: 'Query', Business?: { __typename?: 'Business', Medals: { __typename?: 'NFTMedals', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'NFTMedal', id?: string | null | undefined, isFinished?: boolean | null | undefined, Media?: Array<{ __typename?: 'Media', PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, VideoThumbnail?: string | null | undefined, objectType?: string | null | undefined, orientation?: string | null | undefined }> | null | undefined, Product?: { __typename?: 'Product', id?: string | null | undefined, slug?: string | null | undefined, title?: string | null | undefined, startDate?: string | null | undefined, startTime?: string | null | undefined, city?: string | null | undefined, state?: string | null | undefined, country?: string | null | undefined, pricing?: string | null | undefined, priceAmount?: number | null | undefined, viewerCurrency?: string | null | undefined, Business?: { __typename?: 'Business', name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined } | null | undefined }> | null | undefined } } | null | undefined };

export type GetBusinessProfileQueryVariables = Exact<{
  id?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
}>;


export type GetBusinessProfileQuery = { __typename?: 'Query', Business?: { __typename?: 'Business', id?: string | null | undefined, createdAt?: any | null | undefined, slug?: string | null | undefined, name?: string | null | undefined, profilePhotoURL?: string | null | undefined, website?: string | null | undefined } | null | undefined };

export type GetBusinessSubscriptionPlansQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBusinessSubscriptionPlansQuery = { __typename?: 'Query', getBusinessSubscriptionPlans: Array<{ __typename?: 'BusinessSubscriptionPlan', id: string, name: string, type: string, description: string, prices: Array<{ __typename?: 'BusinessSubscriptionPlanPrice', id: string, interval: string, discounted: boolean, currency: string, amount: string }> }> };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', Categories: Array<{ __typename?: 'Category', id?: string | null | undefined, name?: string | null | undefined, PhotoURL?: string | null | undefined, parent?: string | null | undefined }> };

export type GetHomepagePopularAndUpcomingProductQueryVariables = Exact<{
  coverPhotoSize?: Maybe<Scalars['String']>;
}>;


export type GetHomepagePopularAndUpcomingProductQuery = { __typename?: 'Query', getHomepagePopularAndUpcomingProduct: { __typename?: 'Product', id?: string | null | undefined, createdAt?: number | null | undefined, slug?: string | null | undefined, type?: string | null | undefined, title?: string | null | undefined, coverPhotoID?: string | null | undefined, description?: string | null | undefined, UserID?: string | null | undefined, actorID?: string | null | undefined, actorType?: string | null | undefined, CategoryIDs?: Array<string> | null | undefined, parentID?: string | null | undefined, repeats?: boolean | null | undefined, hibernation?: boolean | null | undefined, status?: string | null | undefined, hidden?: boolean | null | undefined, inquiryType?: string | null | undefined, externalURL?: string | null | undefined, startDate?: string | null | undefined, endDate?: string | null | undefined, startTime?: string | null | undefined, endTime?: string | null | undefined, timezone?: string | null | undefined, virtual?: boolean | null | undefined, address1?: string | null | undefined, city?: string | null | undefined, state?: string | null | undefined, country?: string | null | undefined, postcode?: string | null | undefined, suburb?: string | null | undefined, pricing?: string | null | undefined, priceAmount?: number | null | undefined, priceAmountMax?: number | null | undefined, currency?: string | null | undefined, isFavorite?: boolean | null | undefined, recommendsCount?: number | null | undefined, viewsCount?: number | null | undefined, savesCount?: number | null | undefined, viewerCurrency?: string | null | undefined, viewerPrice?: number | null | undefined, viewerPriceMax?: number | null | undefined, businessPaidPlan?: number | null | undefined, sponsorIDs?: Array<string> | null | undefined, isNFTMedal?: boolean | null | undefined, isSaved?: boolean | null | undefined, coverPhotoURL?: string | null | undefined, Distance?: Array<{ __typename?: 'ProductDistance', id?: string | null | undefined, distance?: number | null | undefined, distanceUnit?: string | null | undefined, distanceType?: string | null | undefined, hasMedal?: boolean | null | undefined }> | null | undefined, Media?: Array<{ __typename?: 'Media', objectID?: string | null | undefined, objectType?: string | null | undefined, url?: string | null | undefined, isNFTMedal?: boolean | null | undefined, fileName?: string | null | undefined, FileURL?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, VideoThumbnail?: string | null | undefined, MedalURL?: string | null | undefined, orientation?: string | null | undefined, Pin?: { __typename?: 'Pin', createdAt?: any | null | undefined, photoID?: string | null | undefined, Tags?: Array<{ __typename?: 'Tag', objectID?: string | null | undefined, objectType?: string | null | undefined, xCoordinate?: string | null | undefined, yCoordinate?: string | null | undefined, Member?: { __typename?: 'Member', slug?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', slug?: string | null | undefined } | null | undefined, Product?: { __typename?: 'Product', slug?: string | null | undefined } | null | undefined }> | null | undefined } | null | undefined }> | null | undefined, AdditionalInformation?: Array<{ __typename?: 'AdditionalInformation', objectID?: string | null | undefined, objectType?: string | null | undefined, fileName?: string | null | undefined, fileSize?: number | null | undefined, fileType?: string | null | undefined, FileURL?: string | null | undefined }> | null | undefined, Categories?: Array<{ __typename?: 'Category', id?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, name?: string | null | undefined, iconName?: string | null | undefined, summary?: string | null | undefined, PhotoID?: string | null | undefined, parent?: string | null | undefined, archived?: boolean | null | undefined, productCategory?: boolean | null | undefined, communityInterest?: boolean | null | undefined, PhotoURL?: string | null | undefined }> | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, createdAt?: any | null | undefined, slug?: string | null | undefined, name?: string | null | undefined, profilePhotoURL?: string | null | undefined, website?: string | null | undefined } | null | undefined, Sponsors?: Array<{ __typename?: 'ProductSponsor', id?: string | null | undefined, name?: string | null | undefined, PhotoURL?: string | null | undefined, externalURL?: string | null | undefined }> | null | undefined, NFTMedals?: Array<{ __typename?: 'NFTMedals', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'NFTMedal', id?: string | null | undefined, createdAt?: number | null | undefined, medalDescription?: string | null | undefined, productID?: string | null | undefined, slug?: string | null | undefined, highFives?: number | null | undefined, isHighFived?: boolean | null | undefined, Media?: Array<{ __typename?: 'Media', objectID?: string | null | undefined, objectType?: string | null | undefined, url?: string | null | undefined, isNFTMedal?: boolean | null | undefined, fileName?: string | null | undefined, FileURL?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, VideoThumbnail?: string | null | undefined, MedalURL?: string | null | undefined, orientation?: string | null | undefined, Pin?: { __typename?: 'Pin', createdAt?: any | null | undefined, photoID?: string | null | undefined, Tags?: Array<{ __typename?: 'Tag', objectID?: string | null | undefined, objectType?: string | null | undefined, xCoordinate?: string | null | undefined, yCoordinate?: string | null | undefined, Member?: { __typename?: 'Member', slug?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', slug?: string | null | undefined } | null | undefined, Product?: { __typename?: 'Product', slug?: string | null | undefined } | null | undefined }> | null | undefined } | null | undefined }> | null | undefined, Racer?: { __typename?: 'NFTUserMedals', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'NFTUserMedal', id?: string | null | undefined }> | null | undefined } | null | undefined }> | null | undefined } | null | undefined> | null | undefined, ProductTheme?: { __typename?: 'ProductTheme', id?: string | null | undefined, backgroundColor?: string | null | undefined, fontColor?: string | null | undefined, buttonColor?: string | null | undefined, circleColor?: string | null | undefined } | null | undefined } };

export type GetHomepageProductCountriesQueryVariables = Exact<{
  text?: Maybe<Scalars['String']>;
}>;


export type GetHomepageProductCountriesQuery = { __typename?: 'Query', getHomepageProductCountries?: Array<string> | null | undefined };

export type GetMemberMedalsQueryVariables = Exact<{
  slug?: Maybe<Scalars['String']>;
  count?: Maybe<Scalars['Int']>;
  next?: Maybe<Scalars['String']>;
}>;


export type GetMemberMedalsQuery = { __typename?: 'Query', Member?: { __typename?: 'Member', Medals: { __typename?: 'NFTUserMedals', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'NFTUserMedal', id?: string | null | undefined, slug?: string | null | undefined, blockchainHash?: string | null | undefined, place?: string | null | undefined, time?: string | null | undefined, distance?: number | null | undefined, distanceUnit?: string | null | undefined, distanceType?: string | null | undefined, overallFinish?: string | null | undefined, ageGroupFinish?: string | null | undefined, userSlug?: string | null | undefined, Medal?: { __typename?: 'NFTMedal', Media?: Array<{ __typename?: 'Media', PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, VideoThumbnail?: string | null | undefined, objectType?: string | null | undefined, orientation?: string | null | undefined }> | null | undefined } | null | undefined, Product?: { __typename?: 'Product', title?: string | null | undefined, slug?: string | null | undefined } | null | undefined }> | null | undefined } } | null | undefined };

export type GetMemberProfileQueryVariables = Exact<{
  id?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  UserID?: Maybe<Scalars['String']>;
  profilePhotoSize?: Maybe<Scalars['String']>;
}>;


export type GetMemberProfileQuery = { __typename?: 'Query', Member?: { __typename?: 'Member', id?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, slug?: string | null | undefined, email?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, signUpNumber?: number | null | undefined, profilePhotoID?: string | null | undefined, coverPhotoID?: string | null | undefined, backgroundColor?: string | null | undefined, gender?: string | null | undefined, country?: string | null | undefined, postalCode?: string | null | undefined, suburb?: string | null | undefined, city?: string | null | undefined, state?: string | null | undefined, CategoryIDs?: Array<string> | null | undefined, personalStatus?: string | null | undefined, biography?: string | null | undefined, quotes?: string | null | undefined, ap5FavoriteEvents?: string | null | undefined, ap5InspiredBy?: string | null | undefined, ap5PassionateAbout?: string | null | undefined, ap5ToughestThing?: string | null | undefined, ap5TrainingWith?: string | null | undefined, claimed?: boolean | null | undefined, partners?: Array<string> | null | undefined, name?: string | null | undefined, profilePhotoURL?: string | null | undefined, coverPhotoURL?: string | null | undefined, isFollowed?: boolean | null | undefined, Activities: { __typename?: 'FeedItemGroup', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'FeedItem', id?: string | null | undefined, timestamp?: any | null | undefined, actorType?: string | null | undefined, actorID?: string | null | undefined, objectType?: string | null | undefined, objectID?: string | null | undefined, CategoryIDs?: Array<string> | null | undefined, isLiked?: boolean | null | undefined, isSaved?: boolean | null | undefined, Categories?: Array<{ __typename?: 'Category', id?: string | null | undefined, name?: string | null | undefined }> | null | undefined, Member?: { __typename?: 'Member', id?: string | null | undefined, name?: string | null | undefined, slug?: string | null | undefined, profilePhotoURL?: string | null | undefined, isFollowed?: boolean | null | undefined, Categories: Array<{ __typename?: 'Category', name?: string | null | undefined }> } | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, name?: string | null | undefined, slug?: string | null | undefined, profilePhotoURL?: string | null | undefined, isFollowed?: boolean | null | undefined, plan?: string | null | undefined, Categories?: Array<{ __typename?: 'Category', name?: string | null | undefined }> | null | undefined } | null | undefined, Update?: { __typename?: 'Update', id?: string | null | undefined, slug?: string | null | undefined, content?: string | null | undefined, isNFTMedal?: boolean | null | undefined, productID?: string | null | undefined, Media?: Array<{ __typename?: 'Media', objectID?: string | null | undefined, objectType?: string | null | undefined, fileName?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, orientation?: string | null | undefined, Pin?: { __typename?: 'Pin', photoID?: string | null | undefined, Tags?: Array<{ __typename?: 'Tag', xCoordinate?: string | null | undefined, yCoordinate?: string | null | undefined, Product?: { __typename?: 'Product', title?: string | null | undefined, slug?: string | null | undefined, coverPhotoURL?: string | null | undefined, type?: string | null | undefined, startDate?: string | null | undefined, Categories?: Array<{ __typename?: 'Category', PhotoURL?: string | null | undefined }> | null | undefined } | null | undefined }> | null | undefined } | null | undefined }> | null | undefined, ProductTheme?: { __typename?: 'ProductTheme', id?: string | null | undefined, backgroundColor?: string | null | undefined, fontColor?: string | null | undefined, buttonColor?: string | null | undefined, circleColor?: string | null | undefined } | null | undefined } | null | undefined, Article?: { __typename?: 'Article', id?: string | null | undefined, slug?: string | null | undefined, title?: string | null | undefined, excerpt?: string | null | undefined, coverPhotoURL?: string | null | undefined, content?: string | null | undefined } | null | undefined, Aggregates: { __typename?: 'FeedItemAggregates', likes?: number | null | undefined, comments?: number | null | undefined }, Comments: { __typename?: 'FeedItemComments', next?: string | null | undefined, items?: Array<{ __typename?: 'Comment', id?: string | null | undefined, timestamp?: any | null | undefined, actorType?: string | null | undefined, content?: string | null | undefined, isLiked: boolean, Member?: { __typename?: 'Member', name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Aggregates?: { __typename?: 'CommentAggregates', likes?: number | null | undefined } | null | undefined }> | null | undefined } }> | null | undefined }, Categories: Array<{ __typename?: 'Category', id?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, name?: string | null | undefined, iconName?: string | null | undefined, summary?: string | null | undefined, PhotoID?: string | null | undefined, parent?: string | null | undefined, archived?: boolean | null | undefined, productCategory?: boolean | null | undefined, communityInterest?: boolean | null | undefined, PhotoURL?: string | null | undefined }>, Follows?: Array<{ __typename?: 'SocialProfile', objectID?: string | null | undefined, objectType?: string | null | undefined, Member?: { __typename?: 'Member', id?: string | null | undefined, slug?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, slug?: string | null | undefined, name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined, Followers?: Array<{ __typename?: 'SocialProfile', objectID?: string | null | undefined, objectType?: string | null | undefined, Member?: { __typename?: 'Member', id?: string | null | undefined, slug?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, slug?: string | null | undefined, name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined, Saves?: { __typename?: 'FeedItemGroup', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'FeedItem', id?: string | null | undefined, timestamp?: any | null | undefined, actorType?: string | null | undefined, actorID?: string | null | undefined, objectType?: string | null | undefined, objectID?: string | null | undefined, CategoryIDs?: Array<string> | null | undefined, isLiked?: boolean | null | undefined, isSaved?: boolean | null | undefined, Categories?: Array<{ __typename?: 'Category', id?: string | null | undefined, name?: string | null | undefined }> | null | undefined, Member?: { __typename?: 'Member', id?: string | null | undefined, name?: string | null | undefined, slug?: string | null | undefined, profilePhotoURL?: string | null | undefined, isFollowed?: boolean | null | undefined, Categories: Array<{ __typename?: 'Category', name?: string | null | undefined }> } | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, name?: string | null | undefined, slug?: string | null | undefined, profilePhotoURL?: string | null | undefined, isFollowed?: boolean | null | undefined, plan?: string | null | undefined, Categories?: Array<{ __typename?: 'Category', name?: string | null | undefined }> | null | undefined } | null | undefined, Update?: { __typename?: 'Update', id?: string | null | undefined, slug?: string | null | undefined, content?: string | null | undefined, isNFTMedal?: boolean | null | undefined, productID?: string | null | undefined, Media?: Array<{ __typename?: 'Media', objectID?: string | null | undefined, objectType?: string | null | undefined, fileName?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, orientation?: string | null | undefined, Pin?: { __typename?: 'Pin', photoID?: string | null | undefined, Tags?: Array<{ __typename?: 'Tag', xCoordinate?: string | null | undefined, yCoordinate?: string | null | undefined, Product?: { __typename?: 'Product', title?: string | null | undefined, slug?: string | null | undefined, coverPhotoURL?: string | null | undefined, type?: string | null | undefined, startDate?: string | null | undefined, Categories?: Array<{ __typename?: 'Category', PhotoURL?: string | null | undefined }> | null | undefined } | null | undefined }> | null | undefined } | null | undefined }> | null | undefined, ProductTheme?: { __typename?: 'ProductTheme', id?: string | null | undefined, backgroundColor?: string | null | undefined, fontColor?: string | null | undefined, buttonColor?: string | null | undefined, circleColor?: string | null | undefined } | null | undefined } | null | undefined, Article?: { __typename?: 'Article', id?: string | null | undefined, slug?: string | null | undefined, title?: string | null | undefined, excerpt?: string | null | undefined, coverPhotoURL?: string | null | undefined, content?: string | null | undefined } | null | undefined, Aggregates: { __typename?: 'FeedItemAggregates', likes?: number | null | undefined, comments?: number | null | undefined }, Comments: { __typename?: 'FeedItemComments', next?: string | null | undefined, items?: Array<{ __typename?: 'Comment', id?: string | null | undefined, timestamp?: any | null | undefined, actorType?: string | null | undefined, content?: string | null | undefined, isLiked: boolean, Member?: { __typename?: 'Member', name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Aggregates?: { __typename?: 'CommentAggregates', likes?: number | null | undefined } | null | undefined }> | null | undefined } }> | null | undefined } | null | undefined, Gallery?: { __typename?: 'Gallery', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'GalleryItem', objectID?: string | null | undefined, objectType?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined }> | null | undefined } | null | undefined, Partners?: Array<{ __typename?: 'SocialProfile', objectID?: string | null | undefined, objectType?: string | null | undefined, Member?: { __typename?: 'Member', id?: string | null | undefined, slug?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, slug?: string | null | undefined, name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined, Medals: { __typename?: 'NFTUserMedals', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'NFTUserMedal', id?: string | null | undefined, slug?: string | null | undefined, blockchainHash?: string | null | undefined, place?: string | null | undefined, time?: string | null | undefined, distance?: number | null | undefined, distanceUnit?: string | null | undefined, distanceType?: string | null | undefined, overallFinish?: string | null | undefined, ageGroupFinish?: string | null | undefined, userSlug?: string | null | undefined, Medal?: { __typename?: 'NFTMedal', Media?: Array<{ __typename?: 'Media', PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, VideoThumbnail?: string | null | undefined, objectType?: string | null | undefined, orientation?: string | null | undefined }> | null | undefined } | null | undefined, Product?: { __typename?: 'Product', title?: string | null | undefined, slug?: string | null | undefined } | null | undefined }> | null | undefined } } | null | undefined };

export type GetMentorAndBusinessSuggestionsQueryVariables = Exact<{
  text: Scalars['String'];
}>;


export type GetMentorAndBusinessSuggestionsQuery = { __typename?: 'Query', MentorAndBusinessSuggestions: Array<{ __typename?: 'SocialMentionSuggestion', objectID?: string | null | undefined, objectType?: string | null | undefined, Business?: { __typename?: 'Business', name?: string | null | undefined, slug?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Member?: { __typename?: 'Member', name?: string | null | undefined, slug?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined }> };

export type GetMyBusinessSubscriptionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyBusinessSubscriptionQuery = { __typename?: 'Query', getMyBusinessSubscription?: { __typename?: 'MyBusinessSubscription', type: string, isPaid: boolean } | null | undefined };

export type GetMyDisplayProfileBusinessQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetMyDisplayProfileBusinessQuery = { __typename?: 'Query', result?: { __typename?: 'Business', id?: string | null | undefined, slug?: string | null | undefined, name?: string | null | undefined, profilePhotoURL?: string | null | undefined, plan?: string | null | undefined } | null | undefined };

export type GetMyDisplayProfileMemberQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyDisplayProfileMemberQuery = { __typename?: 'Query', result: { __typename?: 'Me', Profile?: { __typename?: 'MyProfile', Member?: { __typename?: 'MyMemberProfile', id?: string | null | undefined, slug?: string | null | undefined, name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined } | null | undefined } };

export type GetMyFeedQueryVariables = Exact<{
  CategoryID?: Maybe<Scalars['String']>;
  cursor?: Maybe<Scalars['String']>;
  count?: Maybe<Scalars['Int']>;
}>;


export type GetMyFeedQuery = { __typename?: 'Query', Me: { __typename?: 'Me', Timeline?: { __typename?: 'FeedItemGroup', count?: number | null | undefined, next?: string | null | undefined, items?: Array<{ __typename?: 'FeedItem', id?: string | null | undefined, timestamp?: any | null | undefined, actorType?: string | null | undefined, actorID?: string | null | undefined, objectType?: string | null | undefined, objectID?: string | null | undefined, CategoryIDs?: Array<string> | null | undefined, isLiked?: boolean | null | undefined, isSaved?: boolean | null | undefined, Categories?: Array<{ __typename?: 'Category', id?: string | null | undefined, name?: string | null | undefined }> | null | undefined, Member?: { __typename?: 'Member', id?: string | null | undefined, name?: string | null | undefined, slug?: string | null | undefined, profilePhotoURL?: string | null | undefined, isFollowed?: boolean | null | undefined, Categories: Array<{ __typename?: 'Category', name?: string | null | undefined }> } | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, name?: string | null | undefined, slug?: string | null | undefined, profilePhotoURL?: string | null | undefined, isFollowed?: boolean | null | undefined, plan?: string | null | undefined, Categories?: Array<{ __typename?: 'Category', name?: string | null | undefined }> | null | undefined } | null | undefined, Update?: { __typename?: 'Update', id?: string | null | undefined, slug?: string | null | undefined, content?: string | null | undefined, isNFTMedal?: boolean | null | undefined, productID?: string | null | undefined, Media?: Array<{ __typename?: 'Media', objectID?: string | null | undefined, objectType?: string | null | undefined, fileName?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, orientation?: string | null | undefined, Pin?: { __typename?: 'Pin', photoID?: string | null | undefined, Tags?: Array<{ __typename?: 'Tag', xCoordinate?: string | null | undefined, yCoordinate?: string | null | undefined, Product?: { __typename?: 'Product', title?: string | null | undefined, slug?: string | null | undefined, coverPhotoURL?: string | null | undefined, type?: string | null | undefined, startDate?: string | null | undefined, Categories?: Array<{ __typename?: 'Category', PhotoURL?: string | null | undefined }> | null | undefined } | null | undefined }> | null | undefined } | null | undefined }> | null | undefined, ProductTheme?: { __typename?: 'ProductTheme', id?: string | null | undefined, backgroundColor?: string | null | undefined, fontColor?: string | null | undefined, buttonColor?: string | null | undefined, circleColor?: string | null | undefined } | null | undefined } | null | undefined, Article?: { __typename?: 'Article', id?: string | null | undefined, slug?: string | null | undefined, title?: string | null | undefined, excerpt?: string | null | undefined, coverPhotoURL?: string | null | undefined, content?: string | null | undefined } | null | undefined, Aggregates: { __typename?: 'FeedItemAggregates', likes?: number | null | undefined, comments?: number | null | undefined }, Comments: { __typename?: 'FeedItemComments', next?: string | null | undefined, items?: Array<{ __typename?: 'Comment', id?: string | null | undefined, timestamp?: any | null | undefined, actorType?: string | null | undefined, content?: string | null | undefined, isLiked: boolean, Member?: { __typename?: 'Member', name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', name?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined, Aggregates?: { __typename?: 'CommentAggregates', likes?: number | null | undefined } | null | undefined }> | null | undefined } }> | null | undefined } | null | undefined } };

export type GetMyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyProfileQuery = { __typename?: 'Query', Me: { __typename?: 'Me', Owner?: { __typename?: 'Member', id?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, name?: string | null | undefined, slug?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined } };

export type GetNftMedalQueryVariables = Exact<{
  id?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  coverPhotoSize?: Maybe<Scalars['String']>;
}>;


export type GetNftMedalQuery = { __typename?: 'Query', getNFTMedal?: { __typename?: 'NFTMedal', id?: string | null | undefined, createdAt?: number | null | undefined, medalDescription?: string | null | undefined, productID?: string | null | undefined, slug?: string | null | undefined, isFinished?: boolean | null | undefined, highFives?: number | null | undefined, isHighFived?: boolean | null | undefined, Media?: Array<{ __typename?: 'Media', PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, VideoThumbnail?: string | null | undefined, objectID?: string | null | undefined, objectType?: string | null | undefined, isNFTMedal?: boolean | null | undefined, orientation?: string | null | undefined }> | null | undefined, Product?: { __typename?: 'Product', id?: string | null | undefined, createdAt?: number | null | undefined, slug?: string | null | undefined, type?: string | null | undefined, title?: string | null | undefined, coverPhotoID?: string | null | undefined, description?: string | null | undefined, UserID?: string | null | undefined, actorID?: string | null | undefined, actorType?: string | null | undefined, CategoryIDs?: Array<string> | null | undefined, parentID?: string | null | undefined, repeats?: boolean | null | undefined, hibernation?: boolean | null | undefined, status?: string | null | undefined, hidden?: boolean | null | undefined, inquiryType?: string | null | undefined, externalURL?: string | null | undefined, startDate?: string | null | undefined, endDate?: string | null | undefined, startTime?: string | null | undefined, endTime?: string | null | undefined, timezone?: string | null | undefined, virtual?: boolean | null | undefined, address1?: string | null | undefined, city?: string | null | undefined, state?: string | null | undefined, country?: string | null | undefined, postcode?: string | null | undefined, suburb?: string | null | undefined, pricing?: string | null | undefined, priceAmount?: number | null | undefined, priceAmountMax?: number | null | undefined, currency?: string | null | undefined, isFavorite?: boolean | null | undefined, recommendsCount?: number | null | undefined, viewsCount?: number | null | undefined, savesCount?: number | null | undefined, viewerCurrency?: string | null | undefined, viewerPrice?: number | null | undefined, viewerPriceMax?: number | null | undefined, businessPaidPlan?: number | null | undefined, sponsorIDs?: Array<string> | null | undefined, isNFTMedal?: boolean | null | undefined, isSaved?: boolean | null | undefined, coverPhotoURL?: string | null | undefined, Distance?: Array<{ __typename?: 'ProductDistance', id?: string | null | undefined, distance?: number | null | undefined, distanceUnit?: string | null | undefined, distanceType?: string | null | undefined, hasMedal?: boolean | null | undefined }> | null | undefined, Media?: Array<{ __typename?: 'Media', objectID?: string | null | undefined, objectType?: string | null | undefined, url?: string | null | undefined, isNFTMedal?: boolean | null | undefined, fileName?: string | null | undefined, FileURL?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, VideoThumbnail?: string | null | undefined, MedalURL?: string | null | undefined, orientation?: string | null | undefined, Pin?: { __typename?: 'Pin', createdAt?: any | null | undefined, photoID?: string | null | undefined, Tags?: Array<{ __typename?: 'Tag', objectID?: string | null | undefined, objectType?: string | null | undefined, xCoordinate?: string | null | undefined, yCoordinate?: string | null | undefined, Member?: { __typename?: 'Member', slug?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', slug?: string | null | undefined } | null | undefined, Product?: { __typename?: 'Product', slug?: string | null | undefined } | null | undefined }> | null | undefined } | null | undefined }> | null | undefined, AdditionalInformation?: Array<{ __typename?: 'AdditionalInformation', objectID?: string | null | undefined, objectType?: string | null | undefined, fileName?: string | null | undefined, fileSize?: number | null | undefined, fileType?: string | null | undefined, FileURL?: string | null | undefined }> | null | undefined, Categories?: Array<{ __typename?: 'Category', id?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, name?: string | null | undefined, iconName?: string | null | undefined, summary?: string | null | undefined, PhotoID?: string | null | undefined, parent?: string | null | undefined, archived?: boolean | null | undefined, productCategory?: boolean | null | undefined, communityInterest?: boolean | null | undefined, PhotoURL?: string | null | undefined }> | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, createdAt?: any | null | undefined, slug?: string | null | undefined, name?: string | null | undefined, profilePhotoURL?: string | null | undefined, website?: string | null | undefined } | null | undefined, Sponsors?: Array<{ __typename?: 'ProductSponsor', id?: string | null | undefined, name?: string | null | undefined, PhotoURL?: string | null | undefined, externalURL?: string | null | undefined }> | null | undefined, NFTMedals?: Array<{ __typename?: 'NFTMedals', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'NFTMedal', id?: string | null | undefined, createdAt?: number | null | undefined, medalDescription?: string | null | undefined, productID?: string | null | undefined, slug?: string | null | undefined, highFives?: number | null | undefined, isHighFived?: boolean | null | undefined, Media?: Array<{ __typename?: 'Media', objectID?: string | null | undefined, objectType?: string | null | undefined, url?: string | null | undefined, isNFTMedal?: boolean | null | undefined, fileName?: string | null | undefined, FileURL?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, VideoThumbnail?: string | null | undefined, MedalURL?: string | null | undefined, orientation?: string | null | undefined, Pin?: { __typename?: 'Pin', createdAt?: any | null | undefined, photoID?: string | null | undefined, Tags?: Array<{ __typename?: 'Tag', objectID?: string | null | undefined, objectType?: string | null | undefined, xCoordinate?: string | null | undefined, yCoordinate?: string | null | undefined, Member?: { __typename?: 'Member', slug?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', slug?: string | null | undefined } | null | undefined, Product?: { __typename?: 'Product', slug?: string | null | undefined } | null | undefined }> | null | undefined } | null | undefined }> | null | undefined, Racer?: { __typename?: 'NFTUserMedals', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'NFTUserMedal', id?: string | null | undefined }> | null | undefined } | null | undefined }> | null | undefined } | null | undefined> | null | undefined, ProductTheme?: { __typename?: 'ProductTheme', id?: string | null | undefined, backgroundColor?: string | null | undefined, fontColor?: string | null | undefined, buttonColor?: string | null | undefined, circleColor?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined };

export type GetNftPostEventMedalQueryVariables = Exact<{
  id?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  coverPhotoSize?: Maybe<Scalars['String']>;
  distance: Scalars['Float'];
  distanceUnit: Scalars['String'];
  distanceType?: Maybe<Scalars['String']>;
}>;


export type GetNftPostEventMedalQuery = { __typename?: 'Query', getNFTPostEventMedal?: { __typename?: 'NFTPostEventMedal', id?: string | null | undefined, createdAt?: number | null | undefined, productID?: string | null | undefined, slug?: string | null | undefined, isFinished?: boolean | null | undefined, highFives?: number | null | undefined, isHighFived?: boolean | null | undefined, distances?: Array<string | null | undefined> | null | undefined, peopleParticipated?: number | null | undefined, averageFinishTime?: string | null | undefined, Media?: Array<{ __typename?: 'Media', objectID?: string | null | undefined, objectType?: string | null | undefined, url?: string | null | undefined, orientation?: string | null | undefined, isNFTMedal?: boolean | null | undefined, fileName?: string | null | undefined, FileURL?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, VideoThumbnail?: string | null | undefined, MedalURL?: string | null | undefined }> | null | undefined, Product?: { __typename?: 'Product', id?: string | null | undefined, createdAt?: number | null | undefined, slug?: string | null | undefined, type?: string | null | undefined, title?: string | null | undefined, coverPhotoID?: string | null | undefined, description?: string | null | undefined, UserID?: string | null | undefined, actorID?: string | null | undefined, actorType?: string | null | undefined, CategoryIDs?: Array<string> | null | undefined, parentID?: string | null | undefined, repeats?: boolean | null | undefined, hibernation?: boolean | null | undefined, status?: string | null | undefined, hidden?: boolean | null | undefined, inquiryType?: string | null | undefined, externalURL?: string | null | undefined, startDate?: string | null | undefined, endDate?: string | null | undefined, startTime?: string | null | undefined, endTime?: string | null | undefined, timezone?: string | null | undefined, virtual?: boolean | null | undefined, address1?: string | null | undefined, city?: string | null | undefined, state?: string | null | undefined, country?: string | null | undefined, postcode?: string | null | undefined, suburb?: string | null | undefined, pricing?: string | null | undefined, priceAmount?: number | null | undefined, priceAmountMax?: number | null | undefined, currency?: string | null | undefined, isFavorite?: boolean | null | undefined, recommendsCount?: number | null | undefined, viewsCount?: number | null | undefined, savesCount?: number | null | undefined, viewerCurrency?: string | null | undefined, viewerPrice?: number | null | undefined, viewerPriceMax?: number | null | undefined, businessPaidPlan?: number | null | undefined, sponsorIDs?: Array<string> | null | undefined, isNFTMedal?: boolean | null | undefined, isSaved?: boolean | null | undefined, coverPhotoURL?: string | null | undefined, Distance?: Array<{ __typename?: 'ProductDistance', id?: string | null | undefined, distance?: number | null | undefined, distanceUnit?: string | null | undefined, distanceType?: string | null | undefined, hasMedal?: boolean | null | undefined }> | null | undefined, Media?: Array<{ __typename?: 'Media', objectID?: string | null | undefined, objectType?: string | null | undefined, url?: string | null | undefined, isNFTMedal?: boolean | null | undefined, fileName?: string | null | undefined, FileURL?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, VideoThumbnail?: string | null | undefined, MedalURL?: string | null | undefined, orientation?: string | null | undefined, Pin?: { __typename?: 'Pin', createdAt?: any | null | undefined, photoID?: string | null | undefined, Tags?: Array<{ __typename?: 'Tag', objectID?: string | null | undefined, objectType?: string | null | undefined, xCoordinate?: string | null | undefined, yCoordinate?: string | null | undefined, Member?: { __typename?: 'Member', slug?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', slug?: string | null | undefined } | null | undefined, Product?: { __typename?: 'Product', slug?: string | null | undefined } | null | undefined }> | null | undefined } | null | undefined }> | null | undefined, AdditionalInformation?: Array<{ __typename?: 'AdditionalInformation', objectID?: string | null | undefined, objectType?: string | null | undefined, fileName?: string | null | undefined, fileSize?: number | null | undefined, fileType?: string | null | undefined, FileURL?: string | null | undefined }> | null | undefined, Categories?: Array<{ __typename?: 'Category', id?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, name?: string | null | undefined, iconName?: string | null | undefined, summary?: string | null | undefined, PhotoID?: string | null | undefined, parent?: string | null | undefined, archived?: boolean | null | undefined, productCategory?: boolean | null | undefined, communityInterest?: boolean | null | undefined, PhotoURL?: string | null | undefined }> | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, createdAt?: any | null | undefined, slug?: string | null | undefined, name?: string | null | undefined, profilePhotoURL?: string | null | undefined, website?: string | null | undefined } | null | undefined, Sponsors?: Array<{ __typename?: 'ProductSponsor', id?: string | null | undefined, name?: string | null | undefined, PhotoURL?: string | null | undefined, externalURL?: string | null | undefined }> | null | undefined, NFTMedals?: Array<{ __typename?: 'NFTMedals', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'NFTMedal', id?: string | null | undefined, createdAt?: number | null | undefined, medalDescription?: string | null | undefined, productID?: string | null | undefined, slug?: string | null | undefined, highFives?: number | null | undefined, isHighFived?: boolean | null | undefined, Media?: Array<{ __typename?: 'Media', objectID?: string | null | undefined, objectType?: string | null | undefined, url?: string | null | undefined, isNFTMedal?: boolean | null | undefined, fileName?: string | null | undefined, FileURL?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, VideoThumbnail?: string | null | undefined, MedalURL?: string | null | undefined, orientation?: string | null | undefined, Pin?: { __typename?: 'Pin', createdAt?: any | null | undefined, photoID?: string | null | undefined, Tags?: Array<{ __typename?: 'Tag', objectID?: string | null | undefined, objectType?: string | null | undefined, xCoordinate?: string | null | undefined, yCoordinate?: string | null | undefined, Member?: { __typename?: 'Member', slug?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', slug?: string | null | undefined } | null | undefined, Product?: { __typename?: 'Product', slug?: string | null | undefined } | null | undefined }> | null | undefined } | null | undefined }> | null | undefined, Racer?: { __typename?: 'NFTUserMedals', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'NFTUserMedal', id?: string | null | undefined }> | null | undefined } | null | undefined }> | null | undefined } | null | undefined> | null | undefined, ProductTheme?: { __typename?: 'ProductTheme', id?: string | null | undefined, backgroundColor?: string | null | undefined, fontColor?: string | null | undefined, buttonColor?: string | null | undefined, circleColor?: string | null | undefined } | null | undefined } | null | undefined, Top3Male?: Array<{ __typename?: 'NFTPostEventMedalTop', place?: string | null | undefined, name?: string | null | undefined, time?: string | null | undefined, actor?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined> | null | undefined, Top3Female?: Array<{ __typename?: 'NFTPostEventMedalTop', place?: string | null | undefined, name?: string | null | undefined, time?: string | null | undefined, actor?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, profilePhotoURL?: string | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type GetNftUserMedalQueryVariables = Exact<{
  id?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  profilePhotSize?: Maybe<Scalars['String']>;
  coverPhotoSize?: Maybe<Scalars['String']>;
}>;


export type GetNftUserMedalQuery = { __typename?: 'Query', getNFTUserMedal?: { __typename?: 'NFTUserMedal', id?: string | null | undefined, createdAt?: number | null | undefined, updatedAt?: number | null | undefined, actor?: string | null | undefined, productID?: string | null | undefined, medalID?: string | null | undefined, blockchainHash?: string | null | undefined, place?: string | null | undefined, time?: string | null | undefined, distance?: number | null | undefined, distanceUnit?: string | null | undefined, distanceType?: string | null | undefined, ageGroupFinish?: string | null | undefined, slug?: string | null | undefined, bib?: string | null | undefined, phoneNumber?: string | null | undefined, userSlug?: string | null | undefined, isClaimed?: boolean | null | undefined, overallFinish?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, gender?: string | null | undefined, country?: string | null | undefined, profilePhotoURL?: string | null | undefined, signUpNumber?: number | null | undefined, highFives?: number | null | undefined, isHighFived?: boolean | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, slug?: string | null | undefined, name?: string | null | undefined } | null | undefined, Product?: { __typename?: 'Product', id?: string | null | undefined, createdAt?: number | null | undefined, slug?: string | null | undefined, type?: string | null | undefined, title?: string | null | undefined, coverPhotoID?: string | null | undefined, description?: string | null | undefined, UserID?: string | null | undefined, actorID?: string | null | undefined, actorType?: string | null | undefined, CategoryIDs?: Array<string> | null | undefined, parentID?: string | null | undefined, repeats?: boolean | null | undefined, hibernation?: boolean | null | undefined, status?: string | null | undefined, hidden?: boolean | null | undefined, inquiryType?: string | null | undefined, externalURL?: string | null | undefined, startDate?: string | null | undefined, endDate?: string | null | undefined, startTime?: string | null | undefined, endTime?: string | null | undefined, timezone?: string | null | undefined, virtual?: boolean | null | undefined, address1?: string | null | undefined, city?: string | null | undefined, state?: string | null | undefined, country?: string | null | undefined, postcode?: string | null | undefined, suburb?: string | null | undefined, pricing?: string | null | undefined, priceAmount?: number | null | undefined, priceAmountMax?: number | null | undefined, currency?: string | null | undefined, isFavorite?: boolean | null | undefined, recommendsCount?: number | null | undefined, viewsCount?: number | null | undefined, savesCount?: number | null | undefined, viewerCurrency?: string | null | undefined, viewerPrice?: number | null | undefined, viewerPriceMax?: number | null | undefined, businessPaidPlan?: number | null | undefined, sponsorIDs?: Array<string> | null | undefined, isNFTMedal?: boolean | null | undefined, isSaved?: boolean | null | undefined, coverPhotoURL?: string | null | undefined, Distance?: Array<{ __typename?: 'ProductDistance', id?: string | null | undefined, distance?: number | null | undefined, distanceUnit?: string | null | undefined, distanceType?: string | null | undefined, hasMedal?: boolean | null | undefined }> | null | undefined, Media?: Array<{ __typename?: 'Media', objectID?: string | null | undefined, objectType?: string | null | undefined, url?: string | null | undefined, isNFTMedal?: boolean | null | undefined, fileName?: string | null | undefined, FileURL?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, VideoThumbnail?: string | null | undefined, MedalURL?: string | null | undefined, orientation?: string | null | undefined, Pin?: { __typename?: 'Pin', createdAt?: any | null | undefined, photoID?: string | null | undefined, Tags?: Array<{ __typename?: 'Tag', objectID?: string | null | undefined, objectType?: string | null | undefined, xCoordinate?: string | null | undefined, yCoordinate?: string | null | undefined, Member?: { __typename?: 'Member', slug?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', slug?: string | null | undefined } | null | undefined, Product?: { __typename?: 'Product', slug?: string | null | undefined } | null | undefined }> | null | undefined } | null | undefined }> | null | undefined, AdditionalInformation?: Array<{ __typename?: 'AdditionalInformation', objectID?: string | null | undefined, objectType?: string | null | undefined, fileName?: string | null | undefined, fileSize?: number | null | undefined, fileType?: string | null | undefined, FileURL?: string | null | undefined }> | null | undefined, Categories?: Array<{ __typename?: 'Category', id?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, name?: string | null | undefined, iconName?: string | null | undefined, summary?: string | null | undefined, PhotoID?: string | null | undefined, parent?: string | null | undefined, archived?: boolean | null | undefined, productCategory?: boolean | null | undefined, communityInterest?: boolean | null | undefined, PhotoURL?: string | null | undefined }> | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, createdAt?: any | null | undefined, slug?: string | null | undefined, name?: string | null | undefined, profilePhotoURL?: string | null | undefined, website?: string | null | undefined } | null | undefined, Sponsors?: Array<{ __typename?: 'ProductSponsor', id?: string | null | undefined, name?: string | null | undefined, PhotoURL?: string | null | undefined, externalURL?: string | null | undefined }> | null | undefined, NFTMedals?: Array<{ __typename?: 'NFTMedals', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'NFTMedal', id?: string | null | undefined, createdAt?: number | null | undefined, medalDescription?: string | null | undefined, productID?: string | null | undefined, slug?: string | null | undefined, highFives?: number | null | undefined, isHighFived?: boolean | null | undefined, Media?: Array<{ __typename?: 'Media', objectID?: string | null | undefined, objectType?: string | null | undefined, url?: string | null | undefined, isNFTMedal?: boolean | null | undefined, fileName?: string | null | undefined, FileURL?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, VideoThumbnail?: string | null | undefined, MedalURL?: string | null | undefined, orientation?: string | null | undefined, Pin?: { __typename?: 'Pin', createdAt?: any | null | undefined, photoID?: string | null | undefined, Tags?: Array<{ __typename?: 'Tag', objectID?: string | null | undefined, objectType?: string | null | undefined, xCoordinate?: string | null | undefined, yCoordinate?: string | null | undefined, Member?: { __typename?: 'Member', slug?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', slug?: string | null | undefined } | null | undefined, Product?: { __typename?: 'Product', slug?: string | null | undefined } | null | undefined }> | null | undefined } | null | undefined }> | null | undefined, Racer?: { __typename?: 'NFTUserMedals', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'NFTUserMedal', id?: string | null | undefined }> | null | undefined } | null | undefined }> | null | undefined } | null | undefined> | null | undefined, ProductTheme?: { __typename?: 'ProductTheme', id?: string | null | undefined, backgroundColor?: string | null | undefined, fontColor?: string | null | undefined, buttonColor?: string | null | undefined, circleColor?: string | null | undefined } | null | undefined } | null | undefined, Medal?: { __typename?: 'NFTMedal', id?: string | null | undefined, highFives?: number | null | undefined, isHighFived?: boolean | null | undefined, Media?: Array<{ __typename?: 'Media', objectID?: string | null | undefined, objectType?: string | null | undefined, url?: string | null | undefined, isNFTMedal?: boolean | null | undefined, fileName?: string | null | undefined, FileURL?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, VideoThumbnail?: string | null | undefined, orientation?: string | null | undefined }> | null | undefined } | null | undefined } | null | undefined };

export type GetOriginalUrlFromCodeQueryVariables = Exact<{
  code: Scalars['String'];
}>;


export type GetOriginalUrlFromCodeQuery = { __typename?: 'Query', getOriginalURLFromCode?: string | null | undefined };

export type GetPinQueryVariables = Exact<{
  photoID: Scalars['String'];
}>;


export type GetPinQuery = { __typename?: 'Query', getPin?: { __typename?: 'Pin', createdAt?: any | null | undefined, photoID?: string | null | undefined, Tags?: Array<{ __typename?: 'Tag', xCoordinate?: string | null | undefined, yCoordinate?: string | null | undefined, createdAt?: any | null | undefined, objectID?: string | null | undefined, objectType?: string | null | undefined, Product?: { __typename?: 'Product', title?: string | null | undefined, slug?: string | null | undefined, coverPhotoURL?: string | null | undefined, type?: string | null | undefined, startDate?: string | null | undefined, Categories?: Array<{ __typename?: 'Category', PhotoURL?: string | null | undefined }> | null | undefined } | null | undefined, Member?: { __typename?: 'Member', id?: string | null | undefined, slug?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, slug?: string | null | undefined } | null | undefined }> | null | undefined } | null | undefined };

export type GetProductQueryVariables = Exact<{
  id?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  preferredCurrency?: Maybe<Scalars['String']>;
  coverPhotoSize?: Maybe<Scalars['String']>;
}>;


export type GetProductQuery = { __typename?: 'Query', Product?: { __typename?: 'Product', id?: string | null | undefined, createdAt?: number | null | undefined, slug?: string | null | undefined, type?: string | null | undefined, title?: string | null | undefined, coverPhotoID?: string | null | undefined, description?: string | null | undefined, UserID?: string | null | undefined, actorID?: string | null | undefined, actorType?: string | null | undefined, CategoryIDs?: Array<string> | null | undefined, parentID?: string | null | undefined, repeats?: boolean | null | undefined, hibernation?: boolean | null | undefined, status?: string | null | undefined, hidden?: boolean | null | undefined, inquiryType?: string | null | undefined, externalURL?: string | null | undefined, startDate?: string | null | undefined, endDate?: string | null | undefined, startTime?: string | null | undefined, endTime?: string | null | undefined, timezone?: string | null | undefined, virtual?: boolean | null | undefined, address1?: string | null | undefined, city?: string | null | undefined, state?: string | null | undefined, country?: string | null | undefined, postcode?: string | null | undefined, suburb?: string | null | undefined, pricing?: string | null | undefined, priceAmount?: number | null | undefined, priceAmountMax?: number | null | undefined, currency?: string | null | undefined, isFavorite?: boolean | null | undefined, recommendsCount?: number | null | undefined, viewsCount?: number | null | undefined, savesCount?: number | null | undefined, viewerCurrency?: string | null | undefined, viewerPrice?: number | null | undefined, viewerPriceMax?: number | null | undefined, businessPaidPlan?: number | null | undefined, sponsorIDs?: Array<string> | null | undefined, isNFTMedal?: boolean | null | undefined, isSaved?: boolean | null | undefined, coverPhotoURL?: string | null | undefined, Distance?: Array<{ __typename?: 'ProductDistance', id?: string | null | undefined, distance?: number | null | undefined, distanceUnit?: string | null | undefined, distanceType?: string | null | undefined, hasMedal?: boolean | null | undefined }> | null | undefined, Media?: Array<{ __typename?: 'Media', objectID?: string | null | undefined, objectType?: string | null | undefined, url?: string | null | undefined, isNFTMedal?: boolean | null | undefined, fileName?: string | null | undefined, FileURL?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, VideoThumbnail?: string | null | undefined, MedalURL?: string | null | undefined, orientation?: string | null | undefined, Pin?: { __typename?: 'Pin', createdAt?: any | null | undefined, photoID?: string | null | undefined, Tags?: Array<{ __typename?: 'Tag', objectID?: string | null | undefined, objectType?: string | null | undefined, xCoordinate?: string | null | undefined, yCoordinate?: string | null | undefined, Member?: { __typename?: 'Member', slug?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', slug?: string | null | undefined } | null | undefined, Product?: { __typename?: 'Product', slug?: string | null | undefined } | null | undefined }> | null | undefined } | null | undefined }> | null | undefined, AdditionalInformation?: Array<{ __typename?: 'AdditionalInformation', objectID?: string | null | undefined, objectType?: string | null | undefined, fileName?: string | null | undefined, fileSize?: number | null | undefined, fileType?: string | null | undefined, FileURL?: string | null | undefined }> | null | undefined, Categories?: Array<{ __typename?: 'Category', id?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, name?: string | null | undefined, iconName?: string | null | undefined, summary?: string | null | undefined, PhotoID?: string | null | undefined, parent?: string | null | undefined, archived?: boolean | null | undefined, productCategory?: boolean | null | undefined, communityInterest?: boolean | null | undefined, PhotoURL?: string | null | undefined }> | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, createdAt?: any | null | undefined, slug?: string | null | undefined, name?: string | null | undefined, profilePhotoURL?: string | null | undefined, website?: string | null | undefined } | null | undefined, Sponsors?: Array<{ __typename?: 'ProductSponsor', id?: string | null | undefined, name?: string | null | undefined, PhotoURL?: string | null | undefined, externalURL?: string | null | undefined }> | null | undefined, NFTMedals?: Array<{ __typename?: 'NFTMedals', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'NFTMedal', id?: string | null | undefined, createdAt?: number | null | undefined, medalDescription?: string | null | undefined, productID?: string | null | undefined, slug?: string | null | undefined, highFives?: number | null | undefined, isHighFived?: boolean | null | undefined, Media?: Array<{ __typename?: 'Media', objectID?: string | null | undefined, objectType?: string | null | undefined, url?: string | null | undefined, isNFTMedal?: boolean | null | undefined, fileName?: string | null | undefined, FileURL?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, VideoThumbnail?: string | null | undefined, MedalURL?: string | null | undefined, orientation?: string | null | undefined, Pin?: { __typename?: 'Pin', createdAt?: any | null | undefined, photoID?: string | null | undefined, Tags?: Array<{ __typename?: 'Tag', objectID?: string | null | undefined, objectType?: string | null | undefined, xCoordinate?: string | null | undefined, yCoordinate?: string | null | undefined, Member?: { __typename?: 'Member', slug?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', slug?: string | null | undefined } | null | undefined, Product?: { __typename?: 'Product', slug?: string | null | undefined } | null | undefined }> | null | undefined } | null | undefined }> | null | undefined, Racer?: { __typename?: 'NFTUserMedals', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'NFTUserMedal', id?: string | null | undefined }> | null | undefined } | null | undefined }> | null | undefined } | null | undefined> | null | undefined, ProductTheme?: { __typename?: 'ProductTheme', id?: string | null | undefined, backgroundColor?: string | null | undefined, fontColor?: string | null | undefined, buttonColor?: string | null | undefined, circleColor?: string | null | undefined } | null | undefined } | null | undefined };

export type GetProductsQueryVariables = Exact<{
  type?: Maybe<Scalars['String']>;
  sortBy?: Maybe<Scalars['String']>;
  filterType?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  locationCountry?: Maybe<Scalars['String']>;
  coverPhotoSize?: Maybe<Scalars['String']>;
  count?: Maybe<Scalars['Int']>;
}>;


export type GetProductsQuery = { __typename?: 'Query', Products: { __typename?: 'ProductsPage', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'Product', id?: string | null | undefined, createdAt?: number | null | undefined, slug?: string | null | undefined, type?: string | null | undefined, title?: string | null | undefined, coverPhotoID?: string | null | undefined, description?: string | null | undefined, UserID?: string | null | undefined, actorID?: string | null | undefined, actorType?: string | null | undefined, CategoryIDs?: Array<string> | null | undefined, parentID?: string | null | undefined, repeats?: boolean | null | undefined, hibernation?: boolean | null | undefined, status?: string | null | undefined, hidden?: boolean | null | undefined, inquiryType?: string | null | undefined, externalURL?: string | null | undefined, startDate?: string | null | undefined, endDate?: string | null | undefined, startTime?: string | null | undefined, endTime?: string | null | undefined, timezone?: string | null | undefined, virtual?: boolean | null | undefined, address1?: string | null | undefined, city?: string | null | undefined, state?: string | null | undefined, country?: string | null | undefined, postcode?: string | null | undefined, suburb?: string | null | undefined, pricing?: string | null | undefined, priceAmount?: number | null | undefined, priceAmountMax?: number | null | undefined, currency?: string | null | undefined, isFavorite?: boolean | null | undefined, recommendsCount?: number | null | undefined, viewsCount?: number | null | undefined, savesCount?: number | null | undefined, viewerCurrency?: string | null | undefined, viewerPrice?: number | null | undefined, viewerPriceMax?: number | null | undefined, businessPaidPlan?: number | null | undefined, sponsorIDs?: Array<string> | null | undefined, isNFTMedal?: boolean | null | undefined, isSaved?: boolean | null | undefined, coverPhotoURL?: string | null | undefined, Distance?: Array<{ __typename?: 'ProductDistance', id?: string | null | undefined, distance?: number | null | undefined, distanceUnit?: string | null | undefined, distanceType?: string | null | undefined, hasMedal?: boolean | null | undefined }> | null | undefined, Media?: Array<{ __typename?: 'Media', objectID?: string | null | undefined, objectType?: string | null | undefined, url?: string | null | undefined, isNFTMedal?: boolean | null | undefined, fileName?: string | null | undefined, FileURL?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, VideoThumbnail?: string | null | undefined, MedalURL?: string | null | undefined, orientation?: string | null | undefined, Pin?: { __typename?: 'Pin', createdAt?: any | null | undefined, photoID?: string | null | undefined, Tags?: Array<{ __typename?: 'Tag', objectID?: string | null | undefined, objectType?: string | null | undefined, xCoordinate?: string | null | undefined, yCoordinate?: string | null | undefined, Member?: { __typename?: 'Member', slug?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', slug?: string | null | undefined } | null | undefined, Product?: { __typename?: 'Product', slug?: string | null | undefined } | null | undefined }> | null | undefined } | null | undefined }> | null | undefined, AdditionalInformation?: Array<{ __typename?: 'AdditionalInformation', objectID?: string | null | undefined, objectType?: string | null | undefined, fileName?: string | null | undefined, fileSize?: number | null | undefined, fileType?: string | null | undefined, FileURL?: string | null | undefined }> | null | undefined, Categories?: Array<{ __typename?: 'Category', id?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, name?: string | null | undefined, iconName?: string | null | undefined, summary?: string | null | undefined, PhotoID?: string | null | undefined, parent?: string | null | undefined, archived?: boolean | null | undefined, productCategory?: boolean | null | undefined, communityInterest?: boolean | null | undefined, PhotoURL?: string | null | undefined }> | null | undefined, Business?: { __typename?: 'Business', id?: string | null | undefined, createdAt?: any | null | undefined, slug?: string | null | undefined, name?: string | null | undefined, profilePhotoURL?: string | null | undefined, website?: string | null | undefined } | null | undefined, Sponsors?: Array<{ __typename?: 'ProductSponsor', id?: string | null | undefined, name?: string | null | undefined, PhotoURL?: string | null | undefined, externalURL?: string | null | undefined }> | null | undefined, NFTMedals?: Array<{ __typename?: 'NFTMedals', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'NFTMedal', id?: string | null | undefined, createdAt?: number | null | undefined, medalDescription?: string | null | undefined, productID?: string | null | undefined, slug?: string | null | undefined, highFives?: number | null | undefined, isHighFived?: boolean | null | undefined, Media?: Array<{ __typename?: 'Media', objectID?: string | null | undefined, objectType?: string | null | undefined, url?: string | null | undefined, isNFTMedal?: boolean | null | undefined, fileName?: string | null | undefined, FileURL?: string | null | undefined, PhotoURL?: string | null | undefined, VideoURL?: string | null | undefined, VideoThumbnail?: string | null | undefined, MedalURL?: string | null | undefined, orientation?: string | null | undefined, Pin?: { __typename?: 'Pin', createdAt?: any | null | undefined, photoID?: string | null | undefined, Tags?: Array<{ __typename?: 'Tag', objectID?: string | null | undefined, objectType?: string | null | undefined, xCoordinate?: string | null | undefined, yCoordinate?: string | null | undefined, Member?: { __typename?: 'Member', slug?: string | null | undefined } | null | undefined, Business?: { __typename?: 'Business', slug?: string | null | undefined } | null | undefined, Product?: { __typename?: 'Product', slug?: string | null | undefined } | null | undefined }> | null | undefined } | null | undefined }> | null | undefined, Racer?: { __typename?: 'NFTUserMedals', count?: number | null | undefined, next?: string | null | undefined, total?: number | null | undefined, items?: Array<{ __typename?: 'NFTUserMedal', id?: string | null | undefined }> | null | undefined } | null | undefined }> | null | undefined } | null | undefined> | null | undefined, ProductTheme?: { __typename?: 'ProductTheme', id?: string | null | undefined, backgroundColor?: string | null | undefined, fontColor?: string | null | undefined, buttonColor?: string | null | undefined, circleColor?: string | null | undefined } | null | undefined }> | null | undefined } };

export type GetVideoDimensionQueryVariables = Exact<{
  url: Scalars['String'];
}>;


export type GetVideoDimensionQuery = { __typename?: 'Query', getVideoDimension?: { __typename?: 'MediaDimension', width?: string | null | undefined, height?: string | null | undefined, duration?: string | null | undefined } | null | undefined };

export const FeedItemContentsFragmentDoc = gql`
    fragment FeedItemContents on FeedItemGroup {
  items {
    id
    timestamp
    actorType
    actorID
    objectType
    objectID
    Categories {
      id
      name
    }
    CategoryIDs
    Member {
      id
      name
      slug
      profilePhotoURL(type: "100")
      isFollowed
      Categories {
        name
      }
    }
    Business {
      id
      name
      slug
      profilePhotoURL
      isFollowed
      Categories {
        name
      }
      plan
    }
    Update {
      id
      slug
      content
      isNFTMedal
      Media {
        objectID
        objectType
        fileName
        PhotoURL(type: "500")
        VideoURL
        orientation
        Pin {
          photoID
          Tags {
            xCoordinate
            yCoordinate
            Product {
              title
              slug
              coverPhotoURL
              type
              startDate
              Categories {
                PhotoURL
              }
            }
          }
        }
      }
      productID
      ProductTheme {
        id
        backgroundColor
        fontColor
        buttonColor
        circleColor
      }
    }
    Article {
      id
      slug
      title
      excerpt
      coverPhotoURL(type: "500")
      content
    }
    Aggregates {
      likes
      comments
    }
    Comments {
      items {
        id
        timestamp
        actorType
        content
        Member {
          name
          profilePhotoURL
        }
        Business {
          name
          profilePhotoURL
        }
        Aggregates {
          likes
        }
        isLiked
      }
      next
    }
    isLiked
    isSaved
  }
}
    `;
export const SocialProfileContentsFragmentDoc = gql`
    fragment SocialProfileContents on SocialProfile {
  objectID
  objectType
  Member {
    id
    slug
    firstName
    lastName
    profilePhotoURL(type: "100")
  }
  Business {
    id
    slug
    name
    profilePhotoURL(type: "100")
  }
}
    `;
export const GalleryContentsFragmentDoc = gql`
    fragment GalleryContents on Gallery {
  items {
    objectID
    objectType
    PhotoURL
    VideoURL
  }
  count
  next
  total
}
    `;
export const NftUserMedalContentsFragmentDoc = gql`
    fragment NFTUserMedalContents on NFTUserMedal {
  id
  slug
  blockchainHash
  place
  time
  distance
  distanceUnit
  distanceType
  overallFinish
  ageGroupFinish
  userSlug
  Medal {
    Media {
      PhotoURL
      VideoURL
      VideoThumbnail
      objectType
      orientation
    }
  }
  Product {
    title
    slug
  }
}
    `;
export const MemberContentsFragmentDoc = gql`
    fragment MemberContents on Member {
  id
  createdAt
  updatedAt
  slug
  email
  firstName
  lastName
  signUpNumber
  profilePhotoID
  coverPhotoID
  backgroundColor
  gender
  country
  postalCode
  suburb
  city
  state
  CategoryIDs
  personalStatus
  biography
  quotes
  ap5FavoriteEvents
  ap5InspiredBy
  ap5PassionateAbout
  ap5ToughestThing
  ap5TrainingWith
  claimed
  partners
  name
  profilePhotoURL(type: $profilePhotoSize)
  coverPhotoURL
  isFollowed
  Activities {
    ...FeedItemContents
    count
    next
    total
  }
  Categories {
    id
    createdAt
    updatedAt
    name
    iconName
    summary
    PhotoID
    parent
    archived
    productCategory
    communityInterest
    PhotoURL
  }
  Follows {
    ...SocialProfileContents
  }
  Followers {
    ...SocialProfileContents
  }
  Saves {
    ...FeedItemContents
    count
    next
    total
  }
  Gallery {
    ...GalleryContents
  }
  Partners {
    ...SocialProfileContents
  }
  Medals {
    items {
      ...NFTUserMedalContents
    }
    count
    next
    total
  }
}
    ${FeedItemContentsFragmentDoc}
${SocialProfileContentsFragmentDoc}
${GalleryContentsFragmentDoc}
${NftUserMedalContentsFragmentDoc}`;
export const ArticleContentsFragmentDoc = gql`
    fragment ArticleContents on Article {
  id
  createdAt
  updatedAt
  publishedAt
  title
  subtitle
  coverCaption
  coverPhotoID
  excerpt
  slug
  CategoryIDs
  actor
  MemberID
  BusinessID
  UserID
  content
  Aggregates {
    comments
    highFives
    views
    saves
    likes
  }
  Categories {
    id
    name
    iconName
    parent
    PhotoURL
  }
  Member {
    ...MemberContents
  }
  Business {
    id
  }
  FeedItem {
    id
  }
  coverPhotoURL(type: $coverPhotoSize)
}
    ${MemberContentsFragmentDoc}`;
export const CategoriesContentsFragmentDoc = gql`
    fragment CategoriesContents on Category {
  id
  createdAt
  updatedAt
  name
  iconName
  summary
  PhotoID
  parent
  archived
  productCategory
  communityInterest
  PhotoURL
}
    `;
export const MediaContentsFragmentDoc = gql`
    fragment MediaContents on Media {
  objectID
  objectType
  url
  isNFTMedal
  fileName
  FileURL
  PhotoURL
  VideoURL
  VideoThumbnail
  MedalURL
  orientation
  Pin {
    createdAt
    photoID
    Tags {
      objectID
      objectType
      xCoordinate
      yCoordinate
      Member {
        slug
      }
      Business {
        slug
      }
      Product {
        slug
      }
    }
  }
}
    `;
export const BusinessContentsFragmentDoc = gql`
    fragment BusinessContents on Business {
  id
  createdAt
  slug
  name
  profilePhotoURL(type: "100")
  website
}
    `;
export const ProductContentsFragmentDoc = gql`
    fragment ProductContents on Product {
  id
  createdAt
  slug
  type
  title
  coverPhotoID
  description
  UserID
  actorID
  actorType
  CategoryIDs
  parentID
  repeats
  hibernation
  status
  hidden
  inquiryType
  externalURL
  startDate
  endDate
  startTime
  endTime
  timezone
  virtual
  address1
  city
  state
  country
  postcode
  suburb
  pricing
  priceAmount
  priceAmountMax
  currency
  isFavorite
  Distance {
    id
    distance
    distanceUnit
    distanceType
    hasMedal
  }
  recommendsCount
  viewsCount
  savesCount
  viewerCurrency
  viewerPrice
  viewerPriceMax
  businessPaidPlan
  Media {
    ...MediaContents
  }
  AdditionalInformation {
    objectID
    objectType
    fileName
    fileSize
    fileType
    FileURL
  }
  sponsorIDs
  isNFTMedal
  isSaved
  Categories {
    id
    createdAt
    updatedAt
    name
    iconName
    summary
    PhotoID
    parent
    archived
    productCategory
    communityInterest
    PhotoURL
  }
  Business {
    ...BusinessContents
  }
  coverPhotoURL(type: $coverPhotoSize)
  Sponsors {
    id
    name
    PhotoURL
    externalURL
  }
  NFTMedals {
    items {
      id
      createdAt
      medalDescription
      productID
      slug
      Media {
        ...MediaContents
      }
      highFives
      isHighFived
      Racer {
        items {
          id
        }
        count
        next
        total
      }
    }
    count
    next
    total
  }
  ProductTheme {
    id
    backgroundColor
    fontColor
    buttonColor
    circleColor
  }
}
    ${MediaContentsFragmentDoc}
${BusinessContentsFragmentDoc}`;
export const ProfileAggregatesContentsFragmentDoc = gql`
    fragment ProfileAggregatesContents on ProfileAggregates {
  articles
  updates
  followers
  follows
  comments
  commentsReceived
  highFivesReceived
  highFives
  saves
  savesAcquired
  blocks
  blocksAcquired
  hides
  hidesAcquired
  rating
  reviews
  totalRates
  acticlesViewsAcquired
  articlesCommentReceived
  articlesSavesAcquired
  articlesHighFivesReceived
  articlesDrafted
  articlesPublished
  articlesShared
  videoFeeds
  products
  productViews
  productViewsAcquired
  productSaves
  productSavesAcquired
}
    `;
export const GalleryContentFragmentDoc = gql`
    fragment GalleryContent on Gallery {
  items {
    FeedItem {
      objectType
      Update {
        slug
      }
      Article {
        slug
      }
    }
    PhotoURL(type: "512")
    VideoURL(type: "thumbnail")
  }
}
    `;
export const ProfileProductContentsFragmentDoc = gql`
    fragment ProfileProductContents on ProductsPage {
  items {
    id
    Categories {
      id
      name
      PhotoURL
    }
    Business {
      id
      name
      slug
      profilePhotoURL(type: "100")
    }
    createdAt
    slug
    type
    title
    coverPhotoURL(type: "700")
    description
    AdditionalInformation {
      objectType
      objectID
      fileName
      fileSize
      fileType
    }
    UserID
    actorType
    parentID
    repeats
    hibernation
    status
    hidden
    inquiryType
    externalURL
    startDate
    endDate
    startTime
    endTime
    timezone
    virtual
    address1
    address2
    city
    state
    country
    postcode
    pricing
    priceAmount
    viewerPrice(preferredCurrency: $preferredCurrency)
    viewerPriceMax(preferredCurrency: $preferredCurrency)
    viewerCurrency(preferredCurrency: $preferredCurrency)
    currency
    Media {
      PhotoURL
      VideoURL
      FileURL
      objectType
      fileName
    }
    recommendsCount
    viewsCount
    savesCount
    businessPaidPlan
    isSaved
    isNFTMedal
  }
}
    `;
export const SocialProfileCardListFragmentDoc = gql`
    fragment SocialProfileCardList on SocialProfile {
  objectType
  Member {
    id
    name
    slug
    profilePhotoURL
    isFollowed
    Categories {
      id
      name
    }
    Aggregates {
      articlesPublished
      updates
      likesReceived
    }
  }
  Business {
    id
    name
    slug
    profilePhotoURL
    isFollowed
    Categories {
      id
      name
    }
    Aggregates {
      articlesPublished
      updates
      likesReceived
    }
  }
}
    `;
export const NftClaimMemberProfileDocument = gql`
    mutation NFTClaimMemberProfile($userMedalID: String) {
  NFTClaimMemberProfile(userMedalID: $userMedalID) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const CreateFormEntryDocument = gql`
    mutation createFormEntry($type: String!, $data: JSON) {
  createFormEntry(type: $type, data: $data) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const CreateProfileDocument = gql`
    mutation createProfile($input: InputProfile!) {
  createProfile(input: $input) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const DownloadFileDocument = gql`
    mutation downloadFile($objectID: String!, $objectType: String!) {
  downloadFile(objectID: $objectID, objectType: $objectType) {
    success
    objectID
    objectType
    timestamp
  }
}
    `;
export const DownloadMedalDocument = gql`
    mutation downloadMedal($objectID: String!, $objectType: String!) {
  downloadMedal(objectID: $objectID, objectType: $objectType) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const FollowDocument = gql`
    mutation follow($MemberID: String, $BusinessID: String) {
  follow(targetMemberID: $MemberID, targetBusinessID: $BusinessID) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const HighFiveNftUserMedalDocument = gql`
    mutation highFiveNFTUserMedal($id: String!) {
  highFiveNFTUserMedal(id: $id) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const HighFiveNftMedalDocument = gql`
    mutation highFiveNFTMedal($id: String!) {
  highFiveNFTMedal(id: $id) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const LikeDocument = gql`
    mutation like($CommentID: String) {
  like(CommentID: $CommentID) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const MarkNotificationsReadDocument = gql`
    mutation markNotificationsRead($id: String) {
  markNotificationsRead(id: $id) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const SaveDocument = gql`
    mutation save($targetGetStreamActivityID: String) {
  save(targetGetStreamActivityID: $targetGetStreamActivityID) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const SaveProductDocument = gql`
    mutation saveProduct($id: String!) {
  saveProduct(id: $id) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const UnfollowDocument = gql`
    mutation unfollow($MemberID: String, $BusinessID: String) {
  unfollow(targetMemberID: $MemberID, targetBusinessID: $BusinessID) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const UnhighFiveNftMedalDocument = gql`
    mutation unhighFiveNFTMedal($id: String!) {
  unhighFiveNFTMedal(id: $id) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const UnhighFiveNftUserMedalDocument = gql`
    mutation unhighFiveNFTUserMedal($id: String!) {
  unhighFiveNFTUserMedal(id: $id) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const UnlikeDocument = gql`
    mutation unlike($CommentID: String!) {
  unlike(CommentID: $CommentID) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const UnsaveDocument = gql`
    mutation unsave($targetGetStreamActivityID: String!) {
  unsave(targetGetStreamActivityID: $targetGetStreamActivityID) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const UnsaveProductDocument = gql`
    mutation unsaveProduct($id: String!) {
  unsaveProduct(id: $id) {
    timestamp
    success
    objectID
    objectType
  }
}
    `;
export const GetAllUpcomingMedalsDocument = gql`
    query getAllUpcomingMedals($businessID: String, $businessSlug: String, $coverPhotoSize: String) {
  getAllUpcomingMedals(businessID: $businessID, businessSlug: $businessSlug) {
    items {
      id
      Media {
        objectID
        objectType
        PhotoURL
        VideoURL
        VideoThumbnail
        orientation
      }
      Product {
        ...ProductContents
      }
    }
    count
    next
    total
  }
}
    ${ProductContentsFragmentDoc}`;
export const GetArticlesDocument = gql`
    query getArticles($offset: Int, $count: Int, $sortBy: String, $categories: String, $coverPhotoSize: String, $profilePhotoSize: String) {
  Articles(
    offset: $offset
    count: $count
    sortBy: $sortBy
    categories: $categories
  ) {
    items {
      ...ArticleContents
    }
    count
    next
    total
  }
}
    ${ArticleContentsFragmentDoc}`;
export const GetBusinessMedalsDocument = gql`
    query getBusinessMedals($slug: String, $preferredCurrency: String, $count: Int, $next: String) {
  Business(slug: $slug) {
    Medals(count: $count, next: $next) {
      items {
        id
        isFinished
        Media {
          PhotoURL
          VideoURL
          VideoThumbnail
          objectType
          orientation
        }
        Product {
          id
          slug
          title
          startDate
          startTime
          city
          state
          country
          pricing
          priceAmount
          viewerCurrency(preferredCurrency: $preferredCurrency)
          Business {
            name
            profilePhotoURL
          }
        }
      }
      count
      next
      total
    }
  }
}
    `;
export const GetBusinessProfileDocument = gql`
    query getBusinessProfile($id: String, $slug: String) {
  Business(id: $id, slug: $slug) {
    ...BusinessContents
  }
}
    ${BusinessContentsFragmentDoc}`;
export const GetBusinessSubscriptionPlansDocument = gql`
    query getBusinessSubscriptionPlans {
  getBusinessSubscriptionPlans {
    id
    name
    type
    description
    prices {
      id
      interval
      discounted
      currency
      amount
    }
  }
}
    `;
export const GetCategoriesDocument = gql`
    query getCategories {
  Categories {
    id
    name
    PhotoURL
    parent
  }
}
    `;
export const GetHomepagePopularAndUpcomingProductDocument = gql`
    query getHomepagePopularAndUpcomingProduct($coverPhotoSize: String) {
  getHomepagePopularAndUpcomingProduct {
    ...ProductContents
  }
}
    ${ProductContentsFragmentDoc}`;
export const GetHomepageProductCountriesDocument = gql`
    query getHomepageProductCountries($text: String) {
  getHomepageProductCountries(text: $text)
}
    `;
export const GetMemberMedalsDocument = gql`
    query getMemberMedals($slug: String, $count: Int, $next: String) {
  Member(slug: $slug) {
    Medals(count: $count, next: $next) {
      items {
        ...NFTUserMedalContents
      }
      count
      next
      total
    }
  }
}
    ${NftUserMedalContentsFragmentDoc}`;
export const GetMemberProfileDocument = gql`
    query getMemberProfile($id: String, $slug: String, $UserID: String, $profilePhotoSize: String) {
  Member(id: $id, slug: $slug, UserID: $UserID) {
    ...MemberContents
  }
}
    ${MemberContentsFragmentDoc}`;
export const GetMentorAndBusinessSuggestionsDocument = gql`
    query getMentorAndBusinessSuggestions($text: String!) {
  MentorAndBusinessSuggestions(text: $text) {
    objectID
    objectType
    Business {
      name
      slug
      profilePhotoURL
    }
    Member {
      name
      slug
      profilePhotoURL
    }
  }
}
    `;
export const GetMyBusinessSubscriptionDocument = gql`
    query getMyBusinessSubscription {
  getMyBusinessSubscription {
    type
    isPaid
  }
}
    `;
export const GetMyDisplayProfileBusinessDocument = gql`
    query getMyDisplayProfileBusiness($id: String!) {
  result: Business(id: $id) {
    id
    slug
    name
    profilePhotoURL
    plan
  }
}
    `;
export const GetMyDisplayProfileMemberDocument = gql`
    query getMyDisplayProfileMember {
  result: Me {
    Profile {
      Member {
        id
        slug
        name
        profilePhotoURL
      }
    }
  }
}
    `;
export const GetMyFeedDocument = gql`
    query getMyFeed($CategoryID: String, $cursor: String, $count: Int) {
  Me {
    Timeline(CategoryID: $CategoryID, cursor: $cursor, count: $count) {
      ...FeedItemContents
      count
      next
    }
  }
}
    ${FeedItemContentsFragmentDoc}`;
export const GetMyProfileDocument = gql`
    query getMyProfile {
  Me {
    Owner {
      id
      firstName
      lastName
      name
      slug
      profilePhotoURL(type: "100")
    }
  }
}
    `;
export const GetNftMedalDocument = gql`
    query getNFTMedal($id: String, $slug: String, $coverPhotoSize: String) {
  getNFTMedal(id: $id, slug: $slug) {
    id
    createdAt
    medalDescription
    productID
    slug
    isFinished
    Media {
      PhotoURL
      VideoURL
      VideoThumbnail
      objectID
      objectType
      isNFTMedal
      orientation
    }
    Product {
      ...ProductContents
    }
    highFives
    isHighFived
  }
}
    ${ProductContentsFragmentDoc}`;
export const GetNftPostEventMedalDocument = gql`
    query getNFTPostEventMedal($id: String, $slug: String, $coverPhotoSize: String, $distance: Float!, $distanceUnit: String!, $distanceType: String) {
  getNFTPostEventMedal(id: $id, slug: $slug) {
    id
    createdAt
    productID
    slug
    isFinished
    Media(
      distance: $distance
      distanceUnit: $distanceUnit
      distanceType: $distanceType
    ) {
      objectID
      objectType
      url
      orientation
      isNFTMedal
      fileName
      FileURL
      PhotoURL
      VideoURL
      VideoThumbnail
      MedalURL
    }
    Product {
      ...ProductContents
    }
    highFives
    isHighFived
    distances
    peopleParticipated(
      distance: $distance
      distanceUnit: $distanceUnit
      distanceType: $distanceType
    )
    averageFinishTime(
      distance: $distance
      distanceUnit: $distanceUnit
      distanceType: $distanceType
    )
    Top3Male(
      distance: $distance
      distanceUnit: $distanceUnit
      distanceType: $distanceType
    ) {
      place
      name
      time
      actor
      firstName
      lastName
      profilePhotoURL(type: "100")
    }
    Top3Female(
      distance: $distance
      distanceUnit: $distanceUnit
      distanceType: $distanceType
    ) {
      place
      name
      time
      actor
      firstName
      lastName
      profilePhotoURL(type: "100")
    }
  }
}
    ${ProductContentsFragmentDoc}`;
export const GetNftUserMedalDocument = gql`
    query getNFTUserMedal($id: String, $slug: String, $profilePhotSize: String, $coverPhotoSize: String) {
  getNFTUserMedal(id: $id, slug: $slug) {
    id
    createdAt
    updatedAt
    actor
    productID
    medalID
    blockchainHash
    place
    time
    distance
    distanceUnit
    distanceType
    ageGroupFinish
    slug
    bib
    phoneNumber
    userSlug
    isClaimed
    overallFinish
    firstName
    lastName
    gender
    country
    profilePhotoURL(type: $profilePhotSize)
    signUpNumber
    Business {
      id
      slug
      name
    }
    Product {
      ...ProductContents
    }
    Medal {
      id
      highFives
      isHighFived
      Media {
        objectID
        objectType
        url
        isNFTMedal
        fileName
        FileURL
        PhotoURL
        VideoURL
        VideoThumbnail
        orientation
      }
    }
    highFives
    isHighFived
  }
}
    ${ProductContentsFragmentDoc}`;
export const GetOriginalUrlFromCodeDocument = gql`
    query getOriginalURLFromCode($code: String!) {
  getOriginalURLFromCode(code: $code)
}
    `;
export const GetPinDocument = gql`
    query getPin($photoID: String!) {
  getPin(photoID: $photoID) {
    createdAt
    photoID
    Tags {
      xCoordinate
      yCoordinate
      createdAt
      objectID
      objectType
      Product {
        title
        slug
        coverPhotoURL
        type
        startDate
        Categories {
          PhotoURL
        }
      }
      Member {
        id
        slug
      }
      Business {
        id
        slug
      }
    }
  }
}
    `;
export const GetProductDocument = gql`
    query getProduct($id: String, $slug: String, $preferredCurrency: String, $coverPhotoSize: String) {
  Product(id: $id, slug: $slug, preferredCurrency: $preferredCurrency) {
    ...ProductContents
  }
}
    ${ProductContentsFragmentDoc}`;
export const GetProductsDocument = gql`
    query getProducts($type: String, $sortBy: String, $filterType: String, $category: String, $locationCountry: String, $coverPhotoSize: String, $count: Int) {
  Products(
    type: $type
    category: $category
    count: $count
    preferredCurrency: "AUD"
    filterType: $filterType
    sortBy: $sortBy
    businessID: null
    offset: null
    locationState: null
    locationCountry: $locationCountry
    virtual: null
    dateFrom: null
    dateTo: null
    priceFrom: null
    priceTo: null
    status: null
    hidden: null
  ) {
    items {
      ...ProductContents
    }
    count
    next
    total
  }
}
    ${ProductContentsFragmentDoc}`;
export const GetVideoDimensionDocument = gql`
    query getVideoDimension($url: String!) {
  getVideoDimension(url: $url) {
    width
    height
    duration
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    NFTClaimMemberProfile(variables?: NftClaimMemberProfileMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<NftClaimMemberProfileMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<NftClaimMemberProfileMutation>(NftClaimMemberProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'NFTClaimMemberProfile');
    },
    createFormEntry(variables: CreateFormEntryMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateFormEntryMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateFormEntryMutation>(CreateFormEntryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createFormEntry');
    },
    createProfile(variables: CreateProfileMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateProfileMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateProfileMutation>(CreateProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createProfile');
    },
    downloadFile(variables: DownloadFileMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DownloadFileMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DownloadFileMutation>(DownloadFileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'downloadFile');
    },
    downloadMedal(variables: DownloadMedalMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DownloadMedalMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DownloadMedalMutation>(DownloadMedalDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'downloadMedal');
    },
    follow(variables?: FollowMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FollowMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<FollowMutation>(FollowDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'follow');
    },
    highFiveNFTUserMedal(variables: HighFiveNftUserMedalMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<HighFiveNftUserMedalMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<HighFiveNftUserMedalMutation>(HighFiveNftUserMedalDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'highFiveNFTUserMedal');
    },
    highFiveNFTMedal(variables: HighFiveNftMedalMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<HighFiveNftMedalMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<HighFiveNftMedalMutation>(HighFiveNftMedalDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'highFiveNFTMedal');
    },
    like(variables?: LikeMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LikeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LikeMutation>(LikeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'like');
    },
    markNotificationsRead(variables?: MarkNotificationsReadMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MarkNotificationsReadMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<MarkNotificationsReadMutation>(MarkNotificationsReadDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'markNotificationsRead');
    },
    save(variables?: SaveMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SaveMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SaveMutation>(SaveDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'save');
    },
    saveProduct(variables: SaveProductMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SaveProductMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SaveProductMutation>(SaveProductDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'saveProduct');
    },
    unfollow(variables?: UnfollowMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UnfollowMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UnfollowMutation>(UnfollowDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'unfollow');
    },
    unhighFiveNFTMedal(variables: UnhighFiveNftMedalMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UnhighFiveNftMedalMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UnhighFiveNftMedalMutation>(UnhighFiveNftMedalDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'unhighFiveNFTMedal');
    },
    unhighFiveNFTUserMedal(variables: UnhighFiveNftUserMedalMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UnhighFiveNftUserMedalMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UnhighFiveNftUserMedalMutation>(UnhighFiveNftUserMedalDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'unhighFiveNFTUserMedal');
    },
    unlike(variables: UnlikeMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UnlikeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UnlikeMutation>(UnlikeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'unlike');
    },
    unsave(variables: UnsaveMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UnsaveMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UnsaveMutation>(UnsaveDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'unsave');
    },
    unsaveProduct(variables: UnsaveProductMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UnsaveProductMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UnsaveProductMutation>(UnsaveProductDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'unsaveProduct');
    },
    getAllUpcomingMedals(variables?: GetAllUpcomingMedalsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAllUpcomingMedalsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllUpcomingMedalsQuery>(GetAllUpcomingMedalsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllUpcomingMedals');
    },
    getArticles(variables?: GetArticlesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetArticlesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetArticlesQuery>(GetArticlesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getArticles');
    },
    getBusinessMedals(variables?: GetBusinessMedalsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetBusinessMedalsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetBusinessMedalsQuery>(GetBusinessMedalsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getBusinessMedals');
    },
    getBusinessProfile(variables?: GetBusinessProfileQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetBusinessProfileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetBusinessProfileQuery>(GetBusinessProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getBusinessProfile');
    },
    getBusinessSubscriptionPlans(variables?: GetBusinessSubscriptionPlansQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetBusinessSubscriptionPlansQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetBusinessSubscriptionPlansQuery>(GetBusinessSubscriptionPlansDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getBusinessSubscriptionPlans');
    },
    getCategories(variables?: GetCategoriesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCategoriesQuery>(GetCategoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCategories');
    },
    getHomepagePopularAndUpcomingProduct(variables?: GetHomepagePopularAndUpcomingProductQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetHomepagePopularAndUpcomingProductQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetHomepagePopularAndUpcomingProductQuery>(GetHomepagePopularAndUpcomingProductDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getHomepagePopularAndUpcomingProduct');
    },
    getHomepageProductCountries(variables?: GetHomepageProductCountriesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetHomepageProductCountriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetHomepageProductCountriesQuery>(GetHomepageProductCountriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getHomepageProductCountries');
    },
    getMemberMedals(variables?: GetMemberMedalsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetMemberMedalsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMemberMedalsQuery>(GetMemberMedalsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMemberMedals');
    },
    getMemberProfile(variables?: GetMemberProfileQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetMemberProfileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMemberProfileQuery>(GetMemberProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMemberProfile');
    },
    getMentorAndBusinessSuggestions(variables: GetMentorAndBusinessSuggestionsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetMentorAndBusinessSuggestionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMentorAndBusinessSuggestionsQuery>(GetMentorAndBusinessSuggestionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMentorAndBusinessSuggestions');
    },
    getMyBusinessSubscription(variables?: GetMyBusinessSubscriptionQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetMyBusinessSubscriptionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMyBusinessSubscriptionQuery>(GetMyBusinessSubscriptionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMyBusinessSubscription');
    },
    getMyDisplayProfileBusiness(variables: GetMyDisplayProfileBusinessQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetMyDisplayProfileBusinessQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMyDisplayProfileBusinessQuery>(GetMyDisplayProfileBusinessDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMyDisplayProfileBusiness');
    },
    getMyDisplayProfileMember(variables?: GetMyDisplayProfileMemberQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetMyDisplayProfileMemberQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMyDisplayProfileMemberQuery>(GetMyDisplayProfileMemberDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMyDisplayProfileMember');
    },
    getMyFeed(variables?: GetMyFeedQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetMyFeedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMyFeedQuery>(GetMyFeedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMyFeed');
    },
    getMyProfile(variables?: GetMyProfileQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetMyProfileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMyProfileQuery>(GetMyProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMyProfile');
    },
    getNFTMedal(variables?: GetNftMedalQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetNftMedalQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetNftMedalQuery>(GetNftMedalDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getNFTMedal');
    },
    getNFTPostEventMedal(variables: GetNftPostEventMedalQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetNftPostEventMedalQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetNftPostEventMedalQuery>(GetNftPostEventMedalDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getNFTPostEventMedal');
    },
    getNFTUserMedal(variables?: GetNftUserMedalQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetNftUserMedalQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetNftUserMedalQuery>(GetNftUserMedalDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getNFTUserMedal');
    },
    getOriginalURLFromCode(variables: GetOriginalUrlFromCodeQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetOriginalUrlFromCodeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetOriginalUrlFromCodeQuery>(GetOriginalUrlFromCodeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getOriginalURLFromCode');
    },
    getPin(variables: GetPinQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPinQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPinQuery>(GetPinDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPin');
    },
    getProduct(variables?: GetProductQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetProductQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductQuery>(GetProductDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProduct');
    },
    getProducts(variables?: GetProductsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetProductsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductsQuery>(GetProductsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProducts');
    },
    getVideoDimension(variables: GetVideoDimensionQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetVideoDimensionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetVideoDimensionQuery>(GetVideoDimensionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getVideoDimension');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;