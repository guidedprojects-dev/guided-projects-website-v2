import {
  createImageUrlBuilder,
  createPreviewSubscriptionHook,
} from "next-sanity";
import { sanityConfig } from "./sanity.server";

export const imageBuilder = createImageUrlBuilder(sanityConfig);

export function urlForImage(source) {
  return imageBuilder.image(source).auto("format").fit("max");
}

export const usePreviewSubscription = createPreviewSubscriptionHook(
  sanityConfig
);
