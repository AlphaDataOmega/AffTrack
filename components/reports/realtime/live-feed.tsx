"use client";

import { VisitsFeed } from "./live-feeds/visits-feed";
import { LeadsFeed } from "./live-feeds/leads-feed";
import { ClicksFeed } from "./live-feeds/clicks-feed";
import { TransfersFeed } from "./live-feeds/transfers-feed";
import { ConversionsFeed } from "./live-feeds/conversions-feed";
import type { FeedType } from "./types";

interface LiveFeedProps {
  type: FeedType;
  items: any[];
}

export function LiveFeed({ type, items }: LiveFeedProps) {
  switch (type) {
    case "visits":
      return <VisitsFeed items={items} />;
    case "leads":
      return <LeadsFeed items={items} />;
    case "clicks":
      return <ClicksFeed items={items} />;
    case "transfers":
      return <TransfersFeed items={items} />;
    case "conversions":
      return <ConversionsFeed items={items} />;
    default:
      return null;
  }
}