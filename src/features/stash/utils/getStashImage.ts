import images from '../../../common/assets/images';

const STASH_DEFAULT_IMAGES: Record<string, number> = {
  stashImage01: images.stashImage01,
  stashImage02: images.stashImage02,
  stashImage03: images.stashImage03,
  stashImage04: images.stashImage04,
  stashImage05: images.stashImage05,
  stashImage06: images.stashImage06,
  stashImage07: images.stashImage07,
  stashImage08: images.stashImage08,
  stashImage09: images.stashImage09,
  stashImage10: images.stashImage10,
  stashImage11: images.stashImage11,
  stashImage12: images.stashImage12,
};

export const LIST_STASH_IMAGES = Object.values(STASH_DEFAULT_IMAGES);

export const getStashImage = (uri: string | undefined | null) => {
  if (!uri) {
    return images.stashImageDefault;
  }
  if (uri.startsWith('https://')) {
    return { uri };
  }
  if (STASH_DEFAULT_IMAGES[uri]) {
    return STASH_DEFAULT_IMAGES[uri];
  }
  throw new Error(`Invalid stash image uri: ${uri}`);
};
